import {
  imgBasilViberSolid,
  imgBxsMap,
  imgFrame,
  imgGroup,
  imgGroup1,
  imgGroup2,
  imgLogosTelegram,
  imgRiInstagramFill,
  imgRoentgenEnvelope,
} from '../assets/images'
import { Link } from 'react-router-dom'
import { EMAIL, EMAIL_HREF, SOCIAL_LINKS } from '../lib/links'
import { cn } from '../lib/utils'

const iconHoverOrange =
  'transition-[filter] group-hover:[filter:invert(48%)_sepia(72%)_saturate(1800%)_hue-rotate(346deg)_brightness(98%)_contrast(95%)] group-active:[filter:invert(48%)_sepia(72%)_saturate(1800%)_hue-rotate(346deg)_brightness(98%)_contrast(95%)]'

function FooterLogo({ className }: { className?: string }) {
  return (
    <div className={cn('absolute', className)}>
      <img alt="" className="absolute left-0 top-0 h-[274px] w-[274px] max-w-none" src={imgGroup} />
      <img alt="" className="absolute left-0 top-[295px] h-[48px] w-[274px] max-w-none" src={imgGroup2} />
      <img alt="" className="absolute left-0 top-[352px] h-[14px] w-[275px] max-w-none" src={imgGroup1} />
    </div>
  )
}

export function Footer({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'relative bg-[#26211e]',
        'h-[645px] w-full rounded-tl-[16px] rounded-tr-[16px] md:h-[845px] md:w-[1440px] md:rounded-tl-[24px] md:rounded-tr-[24px]',
        className,
      )}
      data-node-id="362:2091"
    >
      <div className="relative size-full overflow-clip rounded-[inherit]">
        {/* Background ornament + logo (logo nested like desktop/Figma so they align) */}
        <div
          className="pointer-events-none absolute left-[-36px] top-[143px] h-[647px] w-[647px] overflow-hidden md:bottom-0 md:left-[306px] md:top-[-215px] md:h-[1395px] md:w-[1394px] md:overflow-visible"
          data-name="Frame"
          aria-hidden
        >
          <img alt="" className="absolute inset-0 block size-full max-w-none md:hidden" src={imgFrame} />
          <img alt="" className="absolute inset-0 block size-full max-w-none md:hidden" src={imgFrame} />
          <img alt="" className="absolute inset-0 block size-full max-w-none md:hidden" src={imgFrame} />
          <img alt="" className="absolute inset-0 hidden size-full max-w-none md:block" src={imgFrame} />

          {/* Mobile logo — same relative offset to ornament as desktop */}
          <div className="absolute left-[261px] top-[215px] h-[167px] w-[125px] origin-top-left scale-[0.455] md:hidden">
            <FooterLogo className="left-0 top-0 h-[366px] w-[275px]" />
          </div>
        </div>

        {/* Contact column — mobile top 64px */}
        <div className="absolute left-[14px] top-16 z-10 w-[calc(100%-28px)] md:left-[48px] md:top-[172px] md:flex md:h-[376px] md:w-[749px] md:flex-col md:justify-between">
          <div className="flex flex-col gap-2 md:gap-4">
            <div className="flex items-start gap-3 md:items-center md:gap-3">
              <div className="relative size-5 shrink-0 md:size-12">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgBxsMap} />
              </div>
              <div className="min-w-px flex-1 font-['Inter:Medium'] text-[14px] font-medium leading-[18px] text-[#dedddc] md:text-[20px] md:leading-7">
                <p className="mb-0">220036, Республика Беларусь,</p>
                <p>г.&nbsp;Минск, пер.&nbsp;2-й Розы Люксембург,&nbsp;3А</p>
              </div>
            </div>
            <a
              href={EMAIL_HREF}
              className="group flex items-center gap-4 text-[#dedddc] transition-colors hover:text-[#ef6f2e] active:text-[#ef6f2e]"
            >
              <div className={cn('relative size-5 shrink-0 md:size-12', iconHoverOrange)}>
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgRoentgenEnvelope} />
              </div>
              <p className="font-['Inter:Medium'] text-[14px] font-medium leading-[18px] md:text-[20px] md:leading-7">
                {EMAIL}
              </p>
            </a>
          </div>

          <div className="mt-8 flex items-center gap-2 md:mt-0 md:gap-4">
            <a
              href={SOCIAL_LINKS.viber}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative size-12"
              aria-label="Viber"
            >
              <img
                alt=""
                className={cn('absolute inset-0 block size-full max-w-none', iconHoverOrange)}
                src={imgBasilViberSolid}
              />
            </a>
            <a
              href={SOCIAL_LINKS.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative size-12"
              aria-label="Telegram"
            >
              <img
                alt=""
                className={cn('absolute inset-0 block size-full max-w-none', iconHoverOrange)}
                src={imgLogosTelegram}
              />
            </a>
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative size-12"
              aria-label="Instagram"
            >
              <img
                alt=""
                className={cn('absolute inset-0 block size-full max-w-none', iconHoverOrange)}
                src={imgRiInstagramFill}
              />
            </a>
          </div>

          <div className="mt-8 flex flex-col gap-2 font-['Inter:Medium'] text-[14px] font-medium leading-[18px] text-[#dedddc] md:mt-0 md:gap-2 md:text-[20px] md:leading-7">
            <Link
              to="/privacy"
              className="underline decoration-solid transition-colors hover:text-[#ef6f2e] active:text-[#ef6f2e]"
            >
              Политика конфиденциальности
            </Link>
            <Link
              to="/terms"
              className="underline decoration-solid transition-colors hover:text-[#ef6f2e] active:text-[#ef6f2e]"
            >
              Условия оказания услуг
            </Link>
          </div>
        </div>

        {/* Desktop logo */}
        <div className="absolute left-[809px] top-[137px] z-10 hidden h-[457px] w-[389px] overflow-clip md:block">
          <FooterLogo className="left-[57px] top-[46px] h-[366px] w-[275px]" />
        </div>

        {/* Copyright */}
        <p className="absolute left-[51px] top-[585px] z-10 w-[291px] text-center font-['Inter:Medium'] text-[14px] font-medium leading-5 text-[rgba(222,221,220,0.55)] md:left-[821px] md:top-[752px] md:w-[364px] md:text-[20px] md:leading-7">
          © Все права защищены JTRug 2025
        </p>
      </div>
    </div>
  )
}
