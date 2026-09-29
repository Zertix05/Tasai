import { useState, type MouseEvent, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { imgFrame3364164, imgFrame3364166 } from '../assets/images'
import { isContactHref } from '../lib/leadAttribution'
import { cn } from '../lib/utils'

type CtaButtonProps = {
  label: string
  className?: string
  href?: string
  /** SPA route — uses react-router Link */
  to?: string
  /** orange = #EF6F2E (default); dark = #26211E for trial blocks */
  variant?: 'orange' | 'dark'
  /** sm = compact pill (mobile Figma); md = Frame 3364241 with arrow */
  size?: 'md' | 'sm'
  type?: 'button' | 'submit'
  disabled?: boolean
  /** id для amoCRM, если кнопка ведёт к форме (#contact) */
  leadSource?: string
  onClick?: (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void
}

/**
 * Frame 3364241 — two pills (icon + label) with 8px gap.
 * Default: orange, arrow left. Hover and press: Variant2 gray + reverse.
 * size="sm" — compact pill without arrow (mobile).
 */
export function CtaButton({
  label,
  className,
  href,
  to,
  variant = 'orange',
  size = 'md',
  type = 'button',
  disabled = false,
  leadSource,
  onClick,
}: CtaButtonProps) {
  const contactAttrs =
    isContactHref(href) && leadSource
      ? { 'data-lead-source': leadSource, 'data-lead-label': label }
      : isContactHref(href)
        ? { 'data-lead-label': label }
        : {}
  const [holding, setHolding] = useState(false)
  const [hovered, setHovered] = useState(false)
  const gray = holding || hovered
  const reversed = gray || hovered

  const pressHandlers = {
    onMouseDown: () => {
      if (disabled) return
      setHolding(true)
    },
    onMouseUp: () => setHolding(false),
    onMouseEnter: () => {
      if (disabled) return
      setHovered(true)
    },
    onMouseLeave: () => {
      setHolding(false)
      setHovered(false)
    },
    onClick: disabled ? undefined : onClick,
  }

  if (size === 'sm') {
    const pill = gray
      ? 'bg-[#dedddc] text-[#292420]'
      : variant === 'dark'
        ? 'bg-[#26211e] text-[#ef6f2e]'
        : 'bg-[#ef6f2e] text-[#292420]'
    const smTypography = {
      fontFamily: "'Oswald', sans-serif",
      fontWeight: 500,
      fontSize: '16px',
      letterSpacing: '0.02em',
      lineHeight: '16px',
    } as const
    const shellClass = cn(
      'inline-flex h-12 w-auto max-w-full shrink-0 items-center justify-center rounded-[500px] px-4 font-oswald text-[16px] font-medium uppercase leading-none tracking-[0.02em] transition-colors',
      pill,
      disabled && 'pointer-events-none opacity-60',
      className,
    )
    if (to) {
      return (
        <Link
          to={to}
          className={shellClass}
          style={smTypography}
          data-name="Frame 3364241 sm"
          {...pressHandlers}
        >
          {label}
        </Link>
      )
    }
    if (href) {
      return (
        <a
          href={href}
          className={shellClass}
          style={smTypography}
          data-name="Frame 3364241 sm"
          {...contactAttrs}
          {...pressHandlers}
        >
          {label}
        </a>
      )
    }
    return (
      <button
        type={type}
        disabled={disabled}
        className={cn(shellClass, 'cursor-pointer border-0')}
        style={smTypography}
        data-name="Frame 3364241 sm"
        {...pressHandlers}
      >
        {label}
      </button>
    )
  }

  const pill = gray ? 'bg-[#dedddc]' : variant === 'dark' ? 'bg-[#26211e]' : 'bg-[#ef6f2e]'
  const labelColor = gray
    ? 'text-[#292420]'
    : variant === 'dark'
      ? 'text-[#ef6f2e]'
      : 'text-[#292420]'
  const arrowSrc = gray || variant === 'orange' ? imgFrame3364164 : imgFrame3364166

  const shellClass = cn(
    'relative flex h-[64px] w-full items-center',
    disabled && 'pointer-events-none opacity-60',
    className,
  )

  const children: ReactNode = (
    <>
      <span
        className={cn(
          'absolute top-0 z-10 flex size-[64px] shrink-0 items-center justify-center overflow-clip rounded-[100px] transition-[left,background-color] duration-300 ease-out',
          pill,
          reversed ? 'left-[calc(100%-64px)]' : 'left-0',
        )}
      >
        <span className="relative size-[32px] shrink-0">
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={arrowSrc} />
        </span>
      </span>

      <span
        className={cn(
          'flex h-full min-w-px flex-1 items-center justify-center overflow-clip rounded-[500px] px-[32px] py-[16px] transition-[margin,background-color] duration-300 ease-out',
          pill,
          reversed ? 'mr-[72px] ml-0' : 'ml-[72px] mr-0',
        )}
      >
        <span
          className={cn(
            "font-['Oswald'] text-[28px] font-medium leading-[32px] tracking-[0.02em] whitespace-nowrap uppercase transition-colors duration-300 ease-out",
            labelColor,
          )}
          style={{ fontFamily: 'Oswald, sans-serif' }}
        >
          {label}
        </span>
      </span>
    </>
  )

  if (to) {
    return (
      <Link to={to} className={shellClass} data-name="Frame 3364241" {...pressHandlers}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a
        href={href}
        className={shellClass}
        data-name="Frame 3364241"
        {...contactAttrs}
        {...pressHandlers}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(shellClass, 'cursor-pointer border-0 bg-transparent p-0')}
      data-name="Frame 3364241"
      {...pressHandlers}
    >
      {children}
    </button>
  )
}
