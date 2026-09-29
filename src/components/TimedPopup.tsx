import { useEffect, useState, type FormEvent } from 'react'

import { imgRiInstagramFill, popupOrnament } from '../assets/images'
import { submitLead } from '../lib/amocrm'
import { SOCIAL_LINKS } from '../lib/links'
import { normalizePhoneInput, PHONE_PREFIX, protectPhonePrefixCaret } from '../lib/phone'
import { cn } from '../lib/utils'
import { CtaButton } from './CtaButton'

/**
 * Desktop: Frame 3364430 / 362:4425 — 1243×782
 * Mobile: 810:3574 — 365×406
 * Появляется через 40 секунд после загрузки (?popup — через 300ms для теста).
 */
export function TimedPopup() {
  const [open, setOpen] = useState(false)
  const [phone, setPhone] = useState(PHONE_PREFIX)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.has('nopopup')) return
    const delay = params.has('popup') ? 300 : 40_000
    const timer = window.setTimeout(() => setOpen(true), delay)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (loading) return

    const trimmed = phone.trim()
    if (trimmed.replace(/\D/g, '').length < 11) {
      setError('Укажите корректный номер телефона')
      setSent(false)
      return
    }

    setError('')
    setLoading(true)
    const result = await submitLead({
      name: 'Заявка с попапа',
      phone: trimmed,
      source: 'timed_popup',
    })
    setLoading(false)

    if (!result.ok) {
      setSent(false)
      setError(result.error)
      return
    }

    setSent(true)
  }

  const renderPhoneField = (inputClassName: string) => (
    <input
      type="tel"
      name="phone"
      inputMode="numeric"
      autoComplete="tel"
      value={phone}
      disabled={loading}
      onChange={(event) => {
        setSent(false)
        setError('')
        setPhone(normalizePhoneInput(event.target.value))
      }}
      onKeyDown={(event) => {
        if (event.key === 'Backspace' || event.key === 'Delete') {
          protectPhonePrefixCaret(event.currentTarget, event.key)
          if (
            (event.currentTarget.selectionStart ?? 0) <= PHONE_PREFIX.length &&
            event.currentTarget.selectionStart === event.currentTarget.selectionEnd &&
            event.key === 'Backspace'
          ) {
            event.preventDefault()
          }
        }
      }}
      onClick={(event) => protectPhonePrefixCaret(event.currentTarget)}
      onSelect={(event) => protectPhonePrefixCaret(event.currentTarget)}
      onFocus={(event) => {
        const el = event.currentTarget
        requestAnimationFrame(() => {
          if ((el.selectionStart ?? 0) < PHONE_PREFIX.length) {
            el.setSelectionRange(PHONE_PREFIX.length, PHONE_PREFIX.length)
          }
        })
      }}
      placeholder={PHONE_PREFIX}
      className={cn(
        "w-full border-0 bg-transparent font-['Inter'] font-normal outline-none disabled:opacity-60",
        inputClassName,
      )}
    />
  )

  const renderSuccess = (opts: { textClassName: string; iconClassName: string }) => (
    <div className="flex flex-col items-center gap-3">
      <p
        className={cn(
          "text-center font-['Inter'] font-medium not-italic text-[#ef6f2e]",
          opts.textClassName,
        )}
      >
        Большое спасибо за заявку.
        <br />
        Перейдите в наш инстаграм
      </p>
      <a
        href={SOCIAL_LINKS.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className={cn(
          'group relative shrink-0 transition-opacity hover:opacity-80 active:opacity-80',
          opts.iconClassName,
        )}
      >
        <img
          alt=""
          className="absolute inset-0 block size-full max-w-none [filter:invert(48%)_sepia(72%)_saturate(1800%)_hue-rotate(346deg)_brightness(98%)_contrast(95%)]"
          src={imgRiInstagramFill}
        />
      </a>
    </div>
  )

  const renderNote = (textClassName: string, iconClassName = 'size-10') =>
    error ? (
      <p className={cn("text-center font-['Inter'] font-medium not-italic text-[#d9232f]", textClassName)}>
        {error}
      </p>
    ) : sent ? (
      renderSuccess({ textClassName, iconClassName })
    ) : (
      <p className={cn("text-center font-['Inter'] font-medium not-italic", textClassName)}>
        <span className="text-[#ef6f2e]">Отправляя заявку, вы соглашаетесь на </span>
        <a href="/privacy" className="text-[#ef6f2e] underline decoration-solid">
          обработку персональных данных
        </a>
      </p>
    )

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(38,33,30,0.94)] p-4 md:p-[24px]"
      role="dialog"
      aria-modal
      aria-labelledby="timed-popup-title"
      onClick={() => setOpen(false)}
    >
      {/* —— Mobile (Frame 3364436 / 810:3574) —— */}
      <div
        className={cn(
          'relative flex min-h-[406px] w-[calc(100vw-32px)] max-w-[365px] flex-col overflow-hidden rounded-[24px] bg-[#3a3330] md:hidden',
        )}
        data-node-id="810:3574"
        data-name="Frame 3364436"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Ornament — full card, as in Frame 3364436 */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-[24px]"
        >
          <img
            alt=""
            className="absolute left-0 top-1/2 h-[160%] w-auto max-w-none -translate-x-[58%] -translate-y-[45%] object-cover opacity-[0.55] [clip-path:inset(0_0_0_58%)]"
            src={popupOrnament}
          />
        </div>

        <div className="relative z-10 flex h-full flex-col items-center px-4 py-16">
          <p
            id="timed-popup-title"
            className="font-oswald w-full text-center text-[30px] font-semibold uppercase leading-8 tracking-[-1px] text-[#dedddc]"
          >
            укажите номер телефона
          </p>
          <p className="font-oswald mt-3 w-full max-w-[300px] text-center text-[20px] font-normal leading-[20px] text-[#dedddc] normal-case">
            и наш менеджер свяжется с вами в ближайшее время
          </p>

          <form onSubmit={onSubmit} className="mt-12 flex w-full shrink-0 flex-col items-center gap-3">
            <label className="flex h-12 w-full shrink-0 items-center rounded-[500px] bg-[#dedddc] px-4 py-2">
              <span className="sr-only">Номер телефона</span>
              {renderPhoneField(
                'text-[18px] leading-[22px] text-[#26211e] placeholder:text-[rgba(38,33,30,0.45)]',
              )}
            </label>

            <CtaButton
              type="submit"
              size="sm"
              label={loading ? 'отправка…' : 'оставить заявку'}
              className="h-12 w-full shrink-0"
              disabled={loading}
            />

            {error ? (
              <p className="text-center font-['Inter'] text-[12px] font-medium leading-4 text-[#d9232f]">
                {error}
              </p>
            ) : sent ? (
              renderSuccess({ textClassName: 'text-[12px] leading-4', iconClassName: 'size-9' })
            ) : (
              <p className="text-center font-['Inter'] text-[12px] font-medium leading-4 text-[#ef6f2e]">
                *Отправляя заявку, вы соглашаетесь на{' '}
                <a href="/privacy" className="underline decoration-solid">
                  обработку персональных данных
                </a>
              </p>
            )}
          </form>
        </div>
      </div>

      {/* —— Desktop (Figma 362:4425) — unchanged —— */}
      <div
        className={cn(
          'relative hidden h-[782px] w-[1243px] max-h-[calc(100vh-48px)] max-w-[calc(100vw-48px)] overflow-hidden rounded-[24px] bg-[#3a3330] md:block',
        )}
        data-node-id="362:4425"
        data-name="Frame 3364430"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Ornament — left half to center (desktop only) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-1/2 overflow-hidden rounded-l-[24px]"
          data-node-id="362:4426"
        >
          <img
            alt=""
            className="absolute inset-0 size-full max-w-none object-cover object-left opacity-[0.55]"
            src={popupOrnament}
          />
        </div>

        <button
          type="button"
          aria-label="Закрыть"
          onClick={() => setOpen(false)}
          className="absolute top-5 right-6 z-10 flex size-12 items-center justify-center rounded-full bg-[rgba(222,221,220,0.12)] text-[#dedddc] transition-colors hover:bg-[rgba(222,221,220,0.22)] active:bg-[rgba(222,221,220,0.22)]"
        >
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="size-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <p
          id="timed-popup-title-desktop"
          className="absolute top-[100px] left-1/2 w-full -translate-x-1/2 px-8 text-center font-['Oswald'] text-[clamp(36px,7.7vw,96px)] font-semibold uppercase leading-[1.05] tracking-[-0.01em] text-[#dedddc]"
          data-node-id="362:4547"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          укажите номер телефона
        </p>

        <p
          className="absolute top-[35.81%] left-1/2 w-[min(789px,calc(100%-80px))] -translate-x-1/2 text-center font-['Oswald'] text-[clamp(20px,3.2vw,40px)] font-normal leading-[1.2] tracking-[-0.01em] text-[#dedddc]"
          data-node-id="362:4546"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          и наш менеджер свяжется с вами в ближайшее время
        </p>

        <form
          onSubmit={onSubmit}
          className="absolute top-[413px] left-1/2 flex w-[min(806px,calc(100%-80px))] -translate-x-1/2 flex-col items-center gap-[32px]"
        >
          <label className="flex h-[75px] w-full items-center rounded-[500px] bg-[#26211e] px-[32px] py-[16px]" data-node-id="362:4541">
            <span className="sr-only">Номер телефона</span>
            {renderPhoneField(
              'text-[28px] leading-[32px] text-[#dedddc] placeholder:text-[rgba(222,221,220,0.55)]',
            )}
          </label>

          <div className="flex w-full flex-col items-center gap-[8px]" data-node-id="362:4543">
            <CtaButton
              type="submit"
              label={loading ? 'отправка…' : 'оставить заявку'}
              className="w-full"
              disabled={loading}
            />
            <div data-node-id="362:4545">
              {renderNote('text-[16px] leading-6', 'size-12')}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
