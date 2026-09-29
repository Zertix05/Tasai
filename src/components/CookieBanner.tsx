import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { cookieDark, cookieLight, cookieMobile } from '../assets/images'
import { cn } from '../lib/utils'
import './CookieBanner.css'

const STORAGE_KEY = 'tasai-cookie-consent'

const KNOWN_ROUTES = new Set(['/', '/about_us', '/classes', '/tariffs', '/blog', '/privacy', '/cookies', '/terms'])

/** На этих страницах баннер не показываем — иначе перекрывает текст политики */
const LEGAL_ROUTES = new Set(['/privacy', '/cookies', '/terms'])

type Consent = 'accepted' | 'rejected'

function readConsent(): Consent | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    if (value === 'accepted' || value === 'rejected') return value
  } catch {
    /* private mode / blocked storage */
  }
  return null
}

function writeConsent(value: Consent) {
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    /* ignore */
  }
}

/**
 * Figma cookie — desktop 811:3826, mobile 812:3846
 */
export function CookieBanner() {
  const { pathname } = useLocation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!readConsent()) setVisible(true)
  }, [])

  const choose = (value: Consent) => {
    writeConsent(value)
    setVisible(false)
  }

  if (!KNOWN_ROUTES.has(pathname) || LEGAL_ROUTES.has(pathname) || !visible) return null

  return (
    <div
      className="fixed inset-0 z-[110] flex items-end justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-text"
    >
      <div className="absolute inset-0 bg-[rgba(38,33,30,0.94)]" aria-hidden />

      <div
        className={cn(
          'relative z-10 w-full overflow-hidden bg-[#3a3330]',
          'rounded-tl-[16px] rounded-tr-[16px]',
          'md:rounded-tl-[24px] md:rounded-tr-[24px]',
        )}
        data-node-id="811:3826"
        data-name="cookie"
      >
        {/* Контент и печеньки на холсте 1440 — не уезжают влево при широком окне */}
        <div className="relative mx-auto w-full max-w-[1440px] px-[14px] py-16 md:px-20 md:py-[72px]">
          {/* Mobile cookie watermark */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-[157px] top-[25px] size-[275px] md:hidden"
            data-node-id="812:3847"
          >
            <div className="-rotate-90 -scale-y-100">
              <img alt="" className="size-full max-w-none object-contain" src={cookieMobile} />
            </div>
          </div>

          {/* Desktop cookies */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-[23px] left-[calc(55.56%+42px)] hidden size-[531px] md:block"
            data-node-id="811:3827"
          >
            <div className="size-full rotate-[80deg] -scale-y-100">
              <img alt="" className="size-full max-w-none object-contain" src={cookieDark} />
            </div>
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute top-[102px] left-[calc(83.33%+3px)] hidden size-[188px] md:block"
            data-node-id="811:3836"
          >
            <img alt="" className="size-full max-w-none object-contain" src={cookieLight} />
          </div>

          <div className="relative flex w-full flex-col gap-8 md:w-[920px] md:gap-16">
            <div className="flex flex-col gap-4 text-[#dedddc]">
              <p
                id="cookie-banner-title"
                className="font-oswald text-[30px] font-medium uppercase leading-8 tracking-[-0.3px] md:text-[64px] md:leading-[72px] md:tracking-[-1.92px]"
              >
                Осс! Дисциплина и конфиденциальность
              </p>
              <p
                id="cookie-banner-text"
                className="font-['Inter'] text-[14px] font-normal leading-[18px] md:text-[20px] md:leading-6"
              >
                Мы используем файлы cookie, чтобы оттачивать мастерство работы сайта, анализировать трафик и
                наносить точные удары персонализированным контентом.{' '}
                <Link to="/cookies" className="text-[#ef6f2e] underline decoration-solid">
                  Подробнее
                </Link>
              </p>
            </div>

            {/* Mobile: accept then decline, full width */}
            <div className="flex w-full flex-col gap-1 md:hidden" data-node-id="812:3853">
              <button
                type="button"
                onClick={() => choose('accepted')}
                className="cookie-banner__btn cookie-banner__btn--accept cookie-banner__btn--sm"
              >
                принять
              </button>
              <button
                type="button"
                onClick={() => choose('rejected')}
                className="cookie-banner__btn cookie-banner__btn--decline cookie-banner__btn--sm"
              >
                отклонить
              </button>
            </div>

            {/* Desktop: decline then accept, side by side */}
            <div className="hidden gap-2 md:flex" data-node-id="811:3833">
              <button
                type="button"
                onClick={() => choose('rejected')}
                className="cookie-banner__btn cookie-banner__btn--decline cookie-banner__btn--lg"
              >
                отклонить
              </button>
              <button
                type="button"
                onClick={() => choose('accepted')}
                className="cookie-banner__btn cookie-banner__btn--accept cookie-banner__btn--lg"
              >
                принять
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
