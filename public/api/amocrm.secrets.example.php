<?php
/**
 * Скопируйте в amocrm.secrets.php и заполните значения.
 * Файл amocrm.secrets.php не коммитится.
 */
return [
    // Поддомен аккаунта: xxx из xxx.amocrm.ru или xxx.kommo.com
    'subdomain' => 'ВАШ_ПОДДОМЕН',

    // Long-lived access token из интеграции amoCRM
    'access_token' => 'ВАШ_ТОКЕН',

    // amocrm.ru или kommo.com
    'base_domain' => 'amocrm.ru',

    // Опционально: ID поля телефона. Если пусто — используется field_code PHONE
    'phone_field_id' => '',

    // Опционально: воронка и статус
    'pipeline_id' => '',
    'status_id' => '',

    // Опционально: CORS (оставьте пустым, если фронт на том же домене)
    'allowed_origin' => '',
];
