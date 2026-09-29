export type LeadSource = 'contact_form' | 'timed_popup'

export type SubmitLeadPayload = {
  name?: string
  phone: string
  source: LeadSource
  /** Какая кнопка привела к форме (из sessionStorage) */
  cta?: string
}

export type SubmitLeadResult =
  | { ok: true }
  | { ok: false; error: string }

const DEFAULT_ENDPOINT = '/api/amocrm.php'

function endpoint(): string {
  const fromEnv = import.meta.env.VITE_AMOCRM_ENDPOINT
  return typeof fromEnv === 'string' && fromEnv.trim() ? fromEnv.trim() : DEFAULT_ENDPOINT
}

export async function submitLead(payload: SubmitLeadPayload): Promise<SubmitLeadResult> {
  try {
    const response = await fetch(endpoint(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: payload.name?.trim() || undefined,
        phone: payload.phone.trim(),
        source: payload.source,
        cta: payload.cta?.trim() || undefined,
      }),
    })

    const contentType = response.headers.get('content-type') || ''
    let data: { ok?: boolean; error?: string } | null = null
    try {
      if (contentType.includes('application/json')) {
        data = (await response.json()) as { ok?: boolean; error?: string }
      } else {
        // Хостинг отдал HTML (часто index.html) вместо PHP — api не залит / не работает
        await response.text()
        console.error('[amocrm] API returned HTML instead of JSON — check /api/amocrm.php on hosting')
        return {
          ok: false,
          error: 'Не удалось отправить заявку. Попробуйте позже или свяжитесь с нами по телефону.',
        }
      }
    } catch {
      data = null
    }

    if (!response.ok || !data?.ok) {
      return {
        ok: false,
        error: data?.error || 'Не удалось отправить заявку. Попробуйте позже.',
      }
    }

    return { ok: true }
  } catch {
    return { ok: false, error: 'Нет связи с сервером. Проверьте интернет и попробуйте снова.' }
  }
}
