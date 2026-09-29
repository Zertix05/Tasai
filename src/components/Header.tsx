import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState, type MouseEvent } from 'react'

import {
  imgIcBaselinePhone,
  imgTasaiLogo1,
  imgVector,
  imgVector1,
  imgVector2,
  imgVector3,
  imgVector4,
  imgVector5,
  imgVector6,
} from '../assets/images'
import { cn } from '../lib/utils'
import {
  NAV_ITEMS,
  PHONE,
  PHONE_HREF,
  ROUTE_NAV,
  SOCIAL_LINKS,
  type NavId,
} from '../lib/links'
import { CONTACT_ANCHORS, contactHref } from '../lib/contactAnchors'
import { CtaButton } from './CtaButton'

function BasilViberOutline({ className }: { className?: string }) {
  return (
    <div className={className || 'relative size-[28px]'} data-name="basil:viber-outline">
      <div className="absolute inset-[18.45%_20.06%_24.41%_19.22%]" data-name="Vector">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgVector} />
      </div>
      <div className="absolute inset-[25.59%_27.21%_52.98%_51.36%]" data-name="Vector">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgVector1} />
      </div>
      <div className="absolute inset-[36.31%_34.35%_52.98%_51.36%]" data-name="Vector">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgVector2} />
      </div>
      <div className="absolute inset-[4.17%_2.21%_-4.17%_1.36%]" data-name="Vector">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgVector3} />
      </div>
    </div>
  )
}

function getHashId(): NavId | null {
  const hash = window.location.hash.replace('#', '')
  return NAV_ITEMS.some((item) => item.id === hash) ? (hash as NavId) : null
}

type HeaderProps = {
  className?: string
}

export function Header({ className }: HeaderProps) {
  const location = useLocation()
  const routeActive = ROUTE_NAV[location.pathname] ?? null
  const [activeId, setActiveId] = useState<NavId | null>(() =>
    typeof window !== 'undefined' ? routeActive ?? getHashId() : null,
  )
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return

    const scrollY = window.scrollY
    const prevBody = {
      cursor: document.body.style.cursor,
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      width: document.body.style.width,
    }
    const prevHtmlOverflow = document.documentElement.style.overflow

    document.body.style.cursor = 'none'
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.width = '100%'
    document.documentElement.style.overflow = 'hidden'

    return () => {
      document.body.style.cursor = prevBody.cursor
      document.body.style.overflow = prevBody.overflow
      document.body.style.position = prevBody.position
      document.body.style.top = prevBody.top
      document.body.style.left = prevBody.left
      document.body.style.right = prevBody.right
      document.body.style.width = prevBody.width
      document.documentElement.style.overflow = prevHtmlOverflow
      window.scrollTo(0, scrollY)
    }
  }, [menuOpen])

  useEffect(() => {
    if (routeActive) {
      setActiveId(routeActive)
      return
    }

    const syncFromHash = () => setActiveId(getHashId())
    syncFromHash()
    window.addEventListener('hashchange', syncFromHash)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) {
          setActiveId(visible.target.id as NavId)
        }
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: [0.1, 0.25, 0.5],
      },
    )

    for (const item of NAV_ITEMS) {
      if (ROUTE_NAV[`/${item.id}`] || (item.href.startsWith('/') && !item.href.includes('#'))) continue
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    }

    return () => {
      window.removeEventListener('hashchange', syncFromHash)
      observer.disconnect()
    }
  }, [routeActive, location.pathname, location.hash])

  const handleHomeSectionClick =
    (id: NavId) => (event: MouseEvent<HTMLAnchorElement>) => {
      if (location.pathname !== '/') return
      event.preventDefault()
      setActiveId(id)
      setMenuOpen(false)
      window.history.pushState(null, '', `/#${id}`)
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

  const handleHomeClick = (event: MouseEvent<HTMLAnchorElement>) => {
    setMenuOpen(false)
    setActiveId('top')
    if (location.pathname !== '/') return
    event.preventDefault()
    window.history.pushState(null, '', '/')
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  const headerContactHref = contactHref(CONTACT_ANCHORS.header, location.pathname)

  return (
    <>
      <header
        className={
          className ||
          'relative flex w-full content-stretch items-center justify-between bg-[rgba(38,33,30,0.55)] px-[14px] md:w-[1440px] md:px-[48px]'
        }
        data-node-id="362:2220"
      >
        {/* Mobile: burger */}
        <button
          type="button"
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="relative flex size-10 items-center justify-center border-0 bg-transparent p-0 md:hidden"
        >
          <span className="flex w-6 flex-col gap-[5px]">
            <span
              className={cn(
                'h-[2px] w-full rounded-full bg-[#dedddc] transition-transform',
                menuOpen && 'translate-y-[7px] rotate-45',
              )}
            />
            <span className={cn('h-[2px] w-full rounded-full bg-[#dedddc]', menuOpen && 'opacity-0')} />
            <span
              className={cn(
                'h-[2px] w-full rounded-full bg-[#dedddc] transition-transform',
                menuOpen && '-translate-y-[7px] -rotate-45',
              )}
            />
          </span>
        </button>

        {/* Desktop: logo */}
        <Link
          to="/"
          className="hidden flex-row items-center self-stretch md:flex"
          aria-label="Тасай — на главную"
          onClick={() => {
            setActiveId('top')
            if (location.pathname === '/') {
              window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
            }
          }}
        >
          <div className="relative aspect-[2486/2926] h-full shrink-0" data-name="tasai logo 1">
            <img
              alt="Тасай"
              className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
              src={imgTasaiLogo1}
            />
          </div>
        </Link>

        {/* Desktop: nav (no «Главная» — only in mobile menu) */}
        <nav className="relative hidden h-[80px] shrink-0 content-stretch items-center md:flex" data-name="nav">
          {NAV_ITEMS.filter((item) => item.id !== 'top').map((item) => {
            const active = activeId === item.id
            const isRoute = item.href.startsWith('/') && !item.href.includes('#')
            const itemClass = cn(
              'group relative flex h-[80px] shrink-0 flex-col content-stretch items-center justify-center px-[16px] active:border-b-2 active:border-solid active:border-[#dedddc]',
              active && 'border-b-2 border-solid border-[#ef6f2e]',
            )
            const label = (
              <span
                className={cn(
                  'relative flex w-full shrink-0 items-center justify-center font-oswald text-[20px] font-normal leading-6 tracking-[0.02em] whitespace-nowrap transition-colors',
                  active ? 'text-[#ef6f2e]' : 'text-[#dedddc] group-hover:text-[#ef6f2e] group-active:text-[#ef6f2e]',
                )}
              >
                {item.label}
              </span>
            )

            if (isRoute) {
              return (
                <Link key={item.id} to={item.href} className={itemClass} aria-current={active ? 'page' : undefined}>
                  {label}
                </Link>
              )
            }

            return (
              <Link
                key={item.id}
                to={item.href}
                onClick={handleHomeSectionClick(item.id)}
                className={itemClass}
                aria-current={active ? 'page' : undefined}
              >
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Desktop: split pill — phone | записаться */}
        <div className="relative hidden h-[48px] shrink-0 overflow-hidden rounded-[32px] md:flex">
          <a
            href={PHONE_HREF}
            aria-label={`Позвонить ${PHONE}`}
            className="flex h-full items-center gap-[12px] bg-[#dedddc] px-[20px] transition-opacity hover:opacity-90 active:opacity-90"
          >
            <div className="relative size-[24px] shrink-0" data-name="ic:baseline-phone">
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgIcBaselinePhone} />
            </div>
            <span className="whitespace-nowrap font-['Oswald:Medium'] text-[20px] font-medium leading-[24px] tracking-[0.8px] text-[#26211e]">
              {PHONE}
            </span>
          </a>
          <a
            href={headerContactHref}
            className="flex h-full items-center bg-[#ef6f2e] px-[20px] transition-opacity hover:opacity-90 active:opacity-90"
          >
            <span className="whitespace-nowrap font-['Oswald:Medium'] text-[20px] font-medium uppercase leading-[24px] tracking-[0.8px] text-[#dedddc]">
              Записаться бесплатно
            </span>
          </a>
        </div>

        {/* Desktop: socials */}
        <div className="relative hidden h-[80px] shrink-0 content-stretch items-center md:flex" data-name="contact">
          <a
            href={SOCIAL_LINKS.viber}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-[80px] shrink-0 content-stretch items-center px-[8px]"
            aria-label="Viber"
          >
            <BasilViberOutline className="relative size-[28px] shrink-0 transition-[filter] group-hover:[filter:invert(48%)_sepia(72%)_saturate(1800%)_hue-rotate(346deg)_brightness(98%)_contrast(95%)] group-active:[filter:invert(48%)_sepia(72%)_saturate(1800%)_hue-rotate(346deg)_brightness(98%)_contrast(95%)]" />
          </a>
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-[80px] shrink-0 content-stretch items-center px-[8px]"
            aria-label="Instagram"
          >
            <div className="relative size-[28px] shrink-0 overflow-clip transition-[filter] group-hover:[filter:invert(48%)_sepia(72%)_saturate(1800%)_hue-rotate(346deg)_brightness(98%)_contrast(95%)] group-active:[filter:invert(48%)_sepia(72%)_saturate(1800%)_hue-rotate(346deg)_brightness(98%)_contrast(95%)]" data-name="akar-icons:instagram-fill">
              <div className="absolute inset-[7.14%]" data-name="Vector">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgVector4} />
          </div>
        </div>
          </a>
          <a
            href={SOCIAL_LINKS.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-[80px] shrink-0 content-stretch items-center px-[8px]"
            aria-label="Telegram"
          >
            <div className="relative size-[28px] shrink-0 transition-[filter] group-hover:[filter:invert(48%)_sepia(72%)_saturate(1800%)_hue-rotate(346deg)_brightness(98%)_contrast(95%)] group-active:[filter:invert(48%)_sepia(72%)_saturate(1800%)_hue-rotate(346deg)_brightness(98%)_contrast(95%)]" data-name="stash:telegram">
              <div className="absolute top-[calc(50%+0.5px)] left-[calc(50%-0.5px)] h-[9px] w-[11px] -translate-x-1/2 -translate-y-1/2" data-name="Vector">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgVector5} />
          </div>
              <div className="absolute top-1/2 left-[calc(50%+0.5px)] size-[25px] -translate-x-1/2 -translate-y-1/2" data-name="Vector">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgVector6} />
      </div>
            </div>
          </a>
          </div>

        {/* Mobile: phone + CTA — Figma 659:4052 (176×40 at x:203) */}
        <div className="flex h-10 min-w-0 shrink-0 items-center gap-4 md:hidden">
          <a
            href={PHONE_HREF}
            aria-label={`Позвонить ${PHONE}`}
            className="relative flex size-10 shrink-0 items-center justify-center"
          >
            <span className="relative size-8 brightness-0 invert">
              <img alt="" className="absolute inset-0 size-full max-w-none" src={imgIcBaselinePhone} />
            </span>
          </a>
          <CtaButton
            size="sm"
            label="Записаться"
            href={headerContactHref}
            leadSource="header-cta"
            className="!h-10 !w-[120px] shrink-0 bg-[#dedddc] px-4 text-[14px] leading-5 tracking-normal text-[#26211e]"
          />
        </div>
      </header>

      {menuOpen ? (
        <div className="fixed inset-0 z-40 cursor-none select-none overscroll-none bg-[rgba(38,33,30,0.96)] pt-[58px] touch-none md:hidden">
          <nav className="flex cursor-none flex-col gap-2 overflow-y-auto overscroll-contain px-[14px] py-8">
            {NAV_ITEMS.map((item) => {
              const isHome = item.id === 'top'
              const isRoute = !isHome && item.href.startsWith('/') && !item.href.includes('#')
              const active = activeId === item.id
              return (
                <Link
                  key={item.id}
                  to={item.href}
                  onClick={
                    isHome
                      ? handleHomeClick
                      : isRoute
                        ? () => setMenuOpen(false)
                        : handleHomeSectionClick(item.id)
                  }
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'font-oswald cursor-none border-b border-[rgba(222,221,220,0.15)] py-4 text-[20px] font-normal leading-6 tracking-[0.02em]',
                    active ? 'text-[#ef6f2e]' : 'text-[#dedddc]',
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
      ) : null}
    </>
  )
}
