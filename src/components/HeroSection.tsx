import {
  imgEllipse12,
  imgG26,
  imgG34,
  imgGroup10,
  imgGroup11,
  imgGroup12,
  imgGroup13,
} from '../assets/images'
import { CONTACT_ANCHORS, pageContactHref } from '../lib/contactAnchors'
import { CtaButton } from './CtaButton'
import { TasaiWatermark } from './TasaiWatermark'

/** Mobile: iPhone 16-1 Frame 3364446 (393×531). Desktop: absolute 1440 canvas. */
export function HeroSection() {
  return (
    <div
      className="relative z-10 w-full max-md:h-[531px] max-md:overflow-x-clip max-md:overflow-y-visible max-md:px-0 max-md:pb-0 max-md:pt-0 md:absolute md:left-1/2 md:top-[80px] md:h-[784px] md:w-[1440px] md:-translate-x-1/2 md:px-0 md:pb-0 md:pt-0"
      data-node-id="427:4378"
      data-name="хиро"
    >
      {/* —— Mobile absolute (Figma 659:4072 + screenshot) —— */}
      <div className="absolute inset-0 md:hidden" aria-hidden={false}>
        <TasaiWatermark
          className="top-[78px] h-[100px]"
          textClassName="text-[96px] tracking-[-1.92px] text-[rgba(38,33,30,0.17)]"
          gapClassName="gap-16"
        />

        <div
          aria-hidden
          className="pointer-events-none absolute left-[14px] top-[39px] flex h-6 items-center gap-2"
        >
          <div className="relative h-3 w-[76px] shrink-0">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgGroup10} />
          </div>
          <div className="relative size-1.5 shrink-0">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgEllipse12} />
          </div>
          <p className="whitespace-nowrap font-['Inter'] text-[16px] font-medium uppercase leading-6 tracking-[-0.24px] text-[#dedddc]">
            СЕТЬ СПОРТИВНЫХ КЛУБОВ
          </p>
        </div>

        <h1 className="font-oswald absolute left-[14px] top-[119px] w-[calc(100%-28px)] text-[56px] font-semibold uppercase leading-[56px] tracking-[-0.56px] text-[#ef6f2e]">
          <span className="block">каратэ</span>
          <span className="block tracking-[-1px]">и воспитание</span>
        </h1>

        <p className="font-oswald absolute left-[14px] top-[239px] w-[calc(100%-28px)] text-[30px] font-semibold uppercase leading-9 tracking-[-0.3px] text-[#dedddc]">
          которые работают вместе
        </p>

        <p className="absolute left-[14px] top-[323px] w-[calc(100%-28px)] font-['Inter'] text-[16px] font-medium uppercase leading-6 tracking-[-0.03em] text-[#dedddc]">
          воспитываем характер детей
          <br />
          через спорт, уважение, дисциплину
          <br />
          и сотрудничество с родителями
        </p>

        <CtaButton
          label="Записаться на пробное занятие"
          href={pageContactHref(CONTACT_ANCHORS.heroMobile)}
          leadSource="hero-mobile"
          size="sm"
          className="absolute left-[14px] top-[427px] z-10 !h-12 w-[calc(100%-28px)] font-oswald text-[16px] font-medium leading-8 tracking-[0.02em]"
        />

        {/* Diamond ornament under CTA — scrolls left like ТАСАЙ */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[440px] z-0 h-[120px] w-[150vw] -translate-x-1/2 overflow-hidden"
        >
          <div className="ornament-strip-marquee absolute inset-y-0 left-0 flex items-center">
            <img
              alt=""
              className="h-[280px] w-[1120px] max-w-none shrink-0"
              src="/assets/orn_main.svg"
            />
            <img
              alt=""
              aria-hidden
              className="h-[280px] w-[1120px] max-w-none shrink-0"
              src="/assets/orn_main.svg"
            />
          </div>
        </div>
      </div>

      {/* —— Desktop —— */}
      <div className="relative hidden size-full md:block">
        <TasaiWatermark
          className="top-[248px] z-0 h-[210px]"
          textClassName="text-[210px] tracking-[-3.58px] text-[rgba(38,33,30,0.17)]"
          gapClassName="gap-[104px]"
        />

        <div
          aria-hidden
          className="pointer-events-none absolute left-[48px] top-[116px] flex items-center gap-6"
        >
          <div className="relative h-[16.283px] w-[103.467px] shrink-0">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgGroup10} />
          </div>
          <div className="relative size-[6px] shrink-0">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgEllipse12} />
          </div>
          <p className="font-inter whitespace-nowrap text-[24px] font-medium uppercase leading-7 tracking-normal text-[#dedddc]">
            СЕТЬ СПОРТИВНЫХ КЛУБОВ
          </p>
        </div>

        <div className="absolute left-[1078px] top-[114px] flex w-[314px] items-center gap-4">
          <div className="relative size-[94px]">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgG26} />
          </div>
          <div className="relative size-[94px] overflow-hidden rounded-full bg-[#d9232f]">
            <div className="absolute left-1/2 top-1/2 h-[64px] w-[48px] -translate-x-1/2 -translate-y-1/2">
              <div className="absolute inset-[0_0.14%_25.07%_0]">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgGroup11} />
              </div>
              <div className="absolute inset-[96.23%_0_0_0]">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgGroup12} />
              </div>
              <div className="absolute inset-[80.71%_0_6.26%_0.1%]">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgGroup13} />
              </div>
            </div>
          </div>
          <div className="relative size-[94px]">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgG34} />
          </div>
        </div>

        <div
          className="absolute left-[48px] top-[209px] w-[1142px] font-oswald text-[117px] font-semibold uppercase leading-[110px]"
          style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 600 }}
        >
          <span className="text-[#ef6f2e]">
            каратэ
            <br />
            и воспитание
          </span>
        </div>

        <div
          className="absolute left-[48px] top-[432px] w-[1118px] font-oswald text-[94px] font-semibold uppercase leading-[114px] text-[#dedddc]"
          style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 600 }}
        >
          которые работают вместе
        </div>

        <p className="absolute left-[48px] top-[616px] w-[551px] font-['Inter:Medium'] text-[20px] font-medium uppercase leading-6 tracking-[-0.6px] text-[#dedddc]">
          воспитываем характер детей через спорт, уважение, дисциплину и сотрудничество с родителями
        </p>

        <CtaButton
          label="Записаться на пробное занятие"
          href={pageContactHref(CONTACT_ANCHORS.heroMain)}
          leadSource="hero-main"
          className="absolute left-[728px] top-[624px] w-[664px]"
        />
      </div>
    </div>
  )
}
