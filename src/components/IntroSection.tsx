import { imgFrame3364252, imgRectangle3 } from '../assets/images'
import { CONTACT_ANCHORS, pageContactHref } from '../lib/contactAnchors'
import { CtaButton } from './CtaButton'

export function IntroSection() {
  return (
    <div
      className="relative z-10 w-full bg-[#26211e] max-md:mt-[88px] max-md:h-[494px] max-md:px-0 max-md:pb-0 max-md:pt-0 md:absolute md:left-1/2 md:top-[998px] md:mt-0 md:h-[765px] md:w-[1440px] md:-translate-x-1/2 md:overflow-hidden md:rounded-[24px] md:bg-transparent md:px-0 md:pb-0 md:pt-0"
      data-node-id="427:4373"
    >
      {/* Desktop full-bleed bg image */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden rounded-[24px] md:block">
        <img alt="" className="absolute size-full max-w-none rounded-[24px] object-cover" src={imgRectangle3} />
        <div className="absolute inset-0 overflow-hidden rounded-[24px]">
          <img
            alt=""
            className="absolute top-[-20.58%] left-[-1.63%] h-[141.16%] w-1/2 max-w-none"
            src={imgFrame3364252}
          />
        </div>
      </div>

      {/* Mobile absolute layout — Figma 659:4092 */}
      <div className="absolute inset-0 md:hidden">
        <div className="absolute left-[14px] top-[-88px] z-10 h-[204px] w-[calc(100%-28px)] overflow-hidden rounded-2xl">
          <img alt="" className="absolute inset-0 size-full object-cover" src="/assets/mobile/intro-family.png" />
        </div>

        <p className="font-['Oswald:Medium'] absolute left-[14px] top-[164px] w-[calc(100%-28px)] text-[20px] font-medium uppercase leading-7 tracking-[-0.4px] text-[#dedddc]">
          ТАСАЙ — место, где дети растут сильными, а семьи становятся ближе
        </p>
        <p className="font-['Inter:Regular'] absolute left-[14px] top-[244px] w-[calc(100%-28px)] text-[14px] font-normal leading-[18px] text-[#dedddc] not-italic">
          Мы создаём систему гармоничного воспитания, в которой ребёнок развивается не только как
          спортсмен, но и как личность — благодаря единству тренеров, родителей и правильного
          окружения.
        </p>
        <CtaButton
          label="подробнее о нас"
          to="/about_us"
          size="sm"
          className="absolute left-[14px] top-[382px] w-[calc(100%-28px)]"
        />
      </div>

      <div className="relative md:absolute md:top-0 md:right-0 md:h-[765px] md:w-[760px] md:rounded-[24px] md:bg-[#26211e]">
        <p className="hidden font-['Oswald:Medium'] text-[20px] font-medium uppercase leading-7 tracking-[-0.4px] text-[#dedddc] md:absolute md:top-[104px] md:left-[48px] md:block md:w-[664px] md:text-[60px] md:leading-[72px] md:tracking-[-1.8px]">
          ТАСАЙ — место, где дети растут сильными, а семьи становятся ближе
        </p>
        <p className="hidden font-['Inter:Regular'] text-[14px] font-normal leading-[18px] text-[#dedddc] not-italic md:absolute md:top-[390px] md:left-[236px] md:flex md:w-[476px] md:-translate-y-1/2 md:flex-col md:justify-center md:text-[20px] md:leading-6">
          Мы создаём систему гармоничного воспитания, в которой ребёнок развивается не только как
          спортсмен, но и как личность — благодаря единству тренеров, родителей и правильного
          окружения.
        </p>
        <CtaButton
          label="Записаться на пробное занятие"
          href={pageContactHref(CONTACT_ANCHORS.intro)}
          leadSource="intro-section"
          className="absolute top-[597px] left-1/2 hidden w-[664px] -translate-x-1/2 md:flex"
        />
      </div>
    </div>
  )
}
