<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Accept');
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed'], JSON_UNESCAPED_UNICODE);
    exit;
}

/**
 * Load secrets from (first found):
 * 1) public/api/amocrm.secrets.php — return array
 * 2) getenv / $_ENV
 */
function amocrm_config(): array
{
    $secretsFile = __DIR__ . '/amocrm.secrets.php';
    if (is_file($secretsFile)) {
        $loaded = require $secretsFile;
        if (is_array($loaded)) {
            return $loaded;
        }
    }

    return [
        'subdomain' => getenv('AMOCRM_SUBDOMAIN') ?: ($_ENV['AMOCRM_SUBDOMAIN'] ?? ''),
        'access_token' => getenv('AMOCRM_ACCESS_TOKEN') ?: ($_ENV['AMOCRM_ACCESS_TOKEN'] ?? ''),
        'base_domain' => getenv('AMOCRM_BASE_DOMAIN') ?: ($_ENV['AMOCRM_BASE_DOMAIN'] ?? 'amocrm.ru'),
        'phone_field_id' => getenv('AMOCRM_PHONE_FIELD_ID') ?: ($_ENV['AMOCRM_PHONE_FIELD_ID'] ?? ''),
        'pipeline_id' => getenv('AMOCRM_PIPELINE_ID') ?: ($_ENV['AMOCRM_PIPELINE_ID'] ?? ''),
        'status_id' => getenv('AMOCRM_STATUS_ID') ?: ($_ENV['AMOCRM_STATUS_ID'] ?? ''),
        'allowed_origin' => getenv('AMOCRM_ALLOWED_ORIGIN') ?: ($_ENV['AMOCRM_ALLOWED_ORIGIN'] ?? ''),
    ];
}

function respond(int $code, array $payload): void
{
    http_response_code($code);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

function amocrm_request(string $method, string $url, string $token, ?array $body = null): array
{
    $ch = curl_init($url);
    if ($ch === false) {
        return ['http' => 0, 'body' => null, 'error' => 'curl_init failed'];
    }

    $headers = [
        'Authorization: Bearer ' . $token,
        'Content-Type: application/json',
        'Accept: application/json',
    ];

    $opts = [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CUSTOMREQUEST => $method,
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_TIMEOUT => 20,
    ];

    if ($body !== null) {
        $opts[CURLOPT_POSTFIELDS] = json_encode($body, JSON_UNESCAPED_UNICODE);
    }

    curl_setopt_array($ch, $opts);
    $raw = curl_exec($ch);
    $errno = curl_errno($ch);
    $error = curl_error($ch);
    $http = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($errno) {
        return ['http' => 0, 'body' => null, 'error' => $error ?: 'curl error'];
    }

    $decoded = null;
    if (is_string($raw) && $raw !== '') {
        $decoded = json_decode($raw, true);
    }

    return ['http' => $http, 'body' => $decoded, 'raw' => $raw, 'error' => null];
}

$config = amocrm_config();

$allowedOrigin = trim((string) ($config['allowed_origin'] ?? ''));
if ($allowedOrigin !== '') {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if ($origin === $allowedOrigin) {
        header('Access-Control-Allow-Origin: ' . $allowedOrigin);
        header('Vary: Origin');
    }
}

$subdomain = trim((string) ($config['subdomain'] ?? ''));
$token = trim((string) ($config['access_token'] ?? ''));
$baseDomain = trim((string) ($config['base_domain'] ?? 'amocrm.ru')) ?: 'amocrm.ru';

if ($subdomain === '' || $token === '') {
    respond(500, [
        'ok' => false,
        'error' => 'amoCRM не настроен на сервере (subdomain / access_token).',
    ]);
}

$rawInput = file_get_contents('php://input');
$input = is_string($rawInput) ? json_decode($rawInput, true) : null;
if (!is_array($input)) {
    respond(400, ['ok' => false, 'error' => 'Некорректное тело запроса.']);
}

$phone = trim((string) ($input['phone'] ?? ''));
$name = trim((string) ($input['name'] ?? ''));
$source = trim((string) ($input['source'] ?? ''));
$cta = trim((string) ($input['cta'] ?? ''));
$cta = preg_replace('/[\x00-\x1F\x7F]/u', '', $cta) ?? '';
if (mb_strlen($cta) > 200) {
    $cta = mb_substr($cta, 0, 200);
}

$digits = preg_replace('/\D+/', '', $phone) ?? '';
if (strlen($digits) < 11) {
    respond(400, ['ok' => false, 'error' => 'Укажите корректный номер телефона']);
}

$allowedSources = [
    'contact_form' => 'Форма обратной связи',
    'timed_popup' => 'Попап на сайте',
];

if (!isset($allowedSources[$source])) {
    respond(400, ['ok' => false, 'error' => 'Неизвестный источник заявки.']);
}

if ($name === '') {
    $name = $source === 'timed_popup' ? 'Заявка с попапа' : 'Заявка с сайта';
}

$sourceLabel = $allowedSources[$source];
if ($cta !== '') {
    $leadName = sprintf('Заявка с сайта — %s — %s (%s)', $sourceLabel, $cta, $phone);
} else {
    $leadName = sprintf('Заявка с сайта — %s (%s)', $sourceLabel, $phone);
}

$phoneField = [
    'values' => [
        [
            'value' => $phone,
            'enum_code' => 'WORK',
        ],
    ],
];

$phoneFieldId = trim((string) ($config['phone_field_id'] ?? ''));
if ($phoneFieldId !== '' && ctype_digit($phoneFieldId)) {
    $phoneField['field_id'] = (int) $phoneFieldId;
} else {
    $phoneField['field_code'] = 'PHONE';
}

$lead = [
    'name' => $leadName,
    '_embedded' => [
        'contacts' => [
            [
                'name' => $name,
                'custom_fields_values' => [$phoneField],
            ],
        ],
    ],
];

$pipelineId = trim((string) ($config['pipeline_id'] ?? ''));
$statusId = trim((string) ($config['status_id'] ?? ''));
if ($pipelineId !== '' && ctype_digit($pipelineId)) {
    $lead['pipeline_id'] = (int) $pipelineId;
}
if ($statusId !== '' && ctype_digit($statusId)) {
    $lead['status_id'] = (int) $statusId;
}

$apiBase = sprintf('https://%s.%s/api/v4', rawurlencode($subdomain), $baseDomain);
$result = amocrm_request('POST', $apiBase . '/leads/complex', $token, [$lead]);

if ($result['error']) {
    respond(502, ['ok' => false, 'error' => 'Ошибка соединения с amoCRM.']);
}

$http = (int) ($result['http'] ?? 0);
if ($http < 200 || $http >= 300) {
    $amoError = null;
    if (is_array($result['body'])) {
        $amoError = $result['body']['title']
            ?? $result['body']['detail']
            ?? $result['body']['validation-errors']
            ?? null;
    }
    respond(502, [
        'ok' => false,
        'error' => is_string($amoError)
            ? $amoError
            : 'amoCRM отклонил заявку. Проверьте токен и настройки.',
    ]);
}

respond(200, ['ok' => true]);
