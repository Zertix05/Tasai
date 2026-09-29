/** Belarussian phone prefix — always kept in the field. */
export const PHONE_PREFIX = '+375'

/** Max digits after +375 (BY mobile). */
const PHONE_LOCAL_MAX = 9

/** Normalize raw input to `+375` + digits only (prefix cannot be removed). */
export function normalizePhoneInput(value: string): string {
  const digits = value.replace(/\D/g, '')
  const local = (digits.startsWith('375') ? digits.slice(3) : digits).slice(0, PHONE_LOCAL_MAX)
  return `${PHONE_PREFIX}${local}`
}

/** Keep caret from moving into the locked prefix. */
export function protectPhonePrefixCaret(
  input: HTMLInputElement,
  key?: string,
): void {
  const min = PHONE_PREFIX.length
  const start = input.selectionStart ?? 0
  const end = input.selectionEnd ?? 0

  if (key === 'Backspace' && start <= min && start === end) {
    input.setSelectionRange(min, min)
    return
  }
  if (key === 'Delete' && start < min) {
    input.setSelectionRange(min, min)
    return
  }
  if (start < min || end < min) {
    input.setSelectionRange(Math.max(start, min), Math.max(end, min))
  }
}
