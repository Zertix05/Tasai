import { useState, type FormEvent } from 'react'

import { ornamentHorizont } from '../assets/images'
import { submitLead } from '../lib/amocrm'
import { clearLeadAttribution, getLeadAttribution } from '../lib/leadAttribution'
import { normalizePhoneInput, PHONE_PREFIX, protectPhonePrefixCaret } from '../lib/phone'
import { cn } from '../lib/utils'
import { CtaButton } from './CtaButton'
import './ContactForm.css'

export function ContactForm({ className }: { className?: string }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState(PHONE_PREFIX)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (loading) return

    const trimmedName = name.trim()
    const trimmedPhone = phone.trim()

    if (!trimmedName) {
      setError('Укажите имя')
      return
    }
    if (trimmedPhone.replace(/\D/g, '').length < 11) {
      setError('Укажите корректный номер телефона')
      return
    }

    setError('')
    setLoading(true)
    const result = await submitLead({
      name: trimmedName,
      phone: trimmedPhone,
      source: 'contact_form',
      cta:
        getLeadAttribution() ??
        (window.location.hash.startsWith('#contact')
          ? window.location.hash.slice(1)
          : undefined),
    })
    setLoading(false)

    if (!result.ok) {
      setSent(false)
      setError(result.error)
      return
    }

    clearLeadAttribution()
    setSent(true)
  }

  return (
    <div className={cn('contact-form', className)} data-node-id="427:4574">
      <div className="contact-form__decor" data-node-id="427:4575" aria-hidden>
        <img alt="" className="contact-form__decor-img" src={ornamentHorizont} />
      </div>

      <p className="contact-form__title">если У вас остались вопросы</p>
      <p className="contact-form__lead">
        Оставьте заявку на обратный звонок и наш менеджер свяжется с вами в ближайшее время
      </p>

      <form onSubmit={onSubmit} className="contact-form__form" data-node-id="427:4690">
        <div className="contact-form__fields" data-node-id="427:4691">
          <label className="contact-form__field" data-node-id="427:4692">
            <span className="contact-form__label">Ваше имя (родителя)</span>
            <span className="contact-form__control">
              <input
                type="text"
                name="name"
                autoComplete="name"
                value={name}
                disabled={loading}
                onChange={(event) => {
                  setSent(false)
                  setName(event.target.value)
                }}
                placeholder="ФИО"
                className="contact-form__input"
              />
            </span>
          </label>

          <label className="contact-form__field" data-node-id="427:4696">
            <span className="contact-form__label">Номер телефона для связи</span>
            <span className="contact-form__control">
              <input
                type="tel"
                name="phone"
                inputMode="numeric"
                autoComplete="tel"
                value={phone}
                disabled={loading}
                onChange={(event) => {
                  setSent(false)
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
                className="contact-form__input"
              />
            </span>
          </label>
        </div>

        <div className="contact-form__actions" data-node-id="427:4700">
          <CtaButton
            type="submit"
            label={loading ? 'отправка…' : 'оставить заявку'}
            size="sm"
            className="contact-form__submit w-full md:hidden"
            disabled={loading}
          />
          <CtaButton
            type="submit"
            label={loading ? 'отправка…' : 'оставить заявку'}
            className="contact-form__submit hidden md:flex"
            disabled={loading}
          />

          <p
            className={cn(
              'contact-form__note',
              sent && !error && 'contact-form__note--success',
            )}
          >
            {error ? (
              <span className="contact-form__note-text">{error}</span>
            ) : sent ? (
              <span className="contact-form__note-accent">
                Заявка принята. Мы свяжемся с вами в ближайшее время.
              </span>
            ) : (
              <>
                <span className="contact-form__note-accent">
                  *Отправляя заявку, вы соглашаетесь на{' '}
                </span>
                <a href="/privacy" className="contact-form__privacy">
                  обработку персональных данных
                </a>
              </>
            )}
          </p>
        </div>
      </form>
    </div>
  )
}
