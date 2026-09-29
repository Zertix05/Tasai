import { img1, imgFrame3364243} from '../assets/images'
import { CONTACT_ANCHORS, pageContactHref } from '../lib/contactAnchors'
import { CtaButton } from './CtaButton'

export function TrialSection() {
  return (
    <div className="relative h-auto w-full shrink-0 py-0 max-md:pt-16 md:h-[1078px] md:py-0" data-node-id="427:4462">
      {/* Mobile — trial card + ornament tucked under it */}
      <div className="relative md:hidden">
        <div className="relative z-10 mx-[14px] flex w-[calc(100%-28px)] flex-col items-start gap-8 overflow-hidden rounded-2xl bg-[#ef6f2e] px-4 py-6">
          <p
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 font-oswald text-[100px] font-semibold uppercase leading-none text-[#26211e]/5 [writing-mode:vertical-rl]"
          >
            бесплатно
          </p>
          <p className="font-oswald relative w-full text-[48px] font-semibold uppercase leading-[58px] text-[#dedddc]">
            Пробное бесплатное занятие
          </p>
          <div className="relative flex w-full flex-col gap-4">
            <div className="flex w-full items-start gap-2">
              <div className="relative h-5 w-2 shrink-0">
                <span className="absolute top-[9px] left-0 size-2 rounded-full bg-[#26211e]" />
              </div>
              <p className="min-w-0 flex-1 font-oswald text-[20px] font-normal leading-5 text-[#26211e]">
                <span>за </span>
                <span className="font-bold">60 минут</span>
                <span>
                  {' '}
                  поможем наладить контакт ребёнка с инструктором и покажем, что каратэ это очень
                  интересно и весело
                </span>
              </p>
            </div>
            <div className="flex w-full items-start gap-2">
              <div className="relative h-5 w-2 shrink-0">
                <span className="absolute top-[9px] left-0 size-2 rounded-full bg-[#26211e]" />
              </div>
              <p className="min-w-0 flex-1 font-oswald text-[20px] font-normal leading-5 text-[#26211e]">
                необходима только спортивная форма, в которой ходите на физкультуру и водичка
              </p>
            </div>
          </div>
          <CtaButton
            size="sm"
            variant="dark"
            label="Записаться на пробное занятие"
            href={pageContactHref(CONTACT_ANCHORS.trial)}
            leadSource="trial-section"
            className="w-full"
          />
        </div>

        {/* Static ornament — overlaps up onto the trial card; cities sit on the visible strip */}
        <div className="relative z-0 -mt-[88px] h-[174px] w-full overflow-hidden">
          <img
            alt=""
            aria-hidden
            className="pointer-events-none absolute inset-0 size-full max-w-none object-cover object-top"
            src="/assets/ornament-cities-mobile.png"
          />
          <div className="absolute inset-x-0 bottom-0 flex h-[86px] items-center overflow-hidden">
            <div className="cities-marquee font-['Oswald:SemiBold'] text-[26px] font-semibold uppercase leading-8 tracking-[-0.01em] text-[#ef6f2e]">
              <div className="cities-marquee__group">
                <span className="px-6">Минск</span>
                <span aria-hidden>•</span>
                <span className="px-6">Жодино</span>
                <span aria-hidden>•</span>
                <span className="px-6">Борисов</span>
                <span aria-hidden>•</span>
                <span className="px-6">Смолевичи</span>
                <span aria-hidden>•</span>
                <span className="px-6">Слуцк</span>
                <span aria-hidden>•</span>
              </div>
              <div className="cities-marquee__group" aria-hidden>
                <span className="px-6">Минск</span>
                <span aria-hidden>•</span>
                <span className="px-6">Жодино</span>
                <span aria-hidden>•</span>
                <span className="px-6">Борисов</span>
                <span aria-hidden>•</span>
                <span className="px-6">Смолевичи</span>
                <span aria-hidden>•</span>
                <span className="px-6">Слуцк</span>
                <span aria-hidden>•</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop — unchanged */}
      <div className="relative mx-[14px] hidden overflow-hidden rounded-2xl bg-[#ef6f2e] px-4 py-6 md:absolute md:left-[calc(50%-1px)] md:top-[104px] md:z-10 md:mx-0 md:block md:h-[656px] md:w-[1344px] md:-translate-x-1/2 md:rounded-[24px] md:px-0 md:py-0">
        <div className="absolute top-0 left-1/2 h-[234px] w-[1344px] -translate-x-1/2" data-name="бесплатное">
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={img1} />
        </div>
        <p className="font-['Oswald:SemiBold'] absolute top-[106px] left-[calc(50%-558px)] mb-0 w-[550px] text-[0px] font-semibold uppercase leading-[0] tracking-[-0.01em] text-[#dedddc]">
          <span className="text-[92px] leading-[100px]">Пробное</span>
          <span className="text-[64px] leading-[100px]">{`  `}</span>
          <span className="text-[92px] leading-[100px]">бесплатное</span>
          <span className="text-[92px] leading-[100px]">{` `}</span>
          <span className="text-[92px] leading-[100px]">занятие</span>
        </p>

        <ul className="absolute top-[100px] left-[664px] mb-0 flex w-[567px] flex-col gap-6 pl-4">
          <li className="flex w-[551px] items-start gap-4">
            <div className="relative mt-0 h-10 w-4 shrink-0 rounded-none bg-transparent">
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgFrame3364243} />
            </div>
            <p className="min-w-0 flex-1 font-['Oswald:Medium'] text-[40px] font-medium leading-[40px] text-[#292420]">
              <span>{`за `}</span>
              <strong className="font-['Oswald:Bold'] font-bold">60 минут</strong>
              <span>{` поможем наладить контакт ребёнка с инструктором и покажем, что каратэ это очень интересно и весело`}</span>
            </p>
          </li>
          <li className="flex w-[551px] items-start gap-4">
            <div className="relative mt-0 h-10 w-4 shrink-0 rounded-none bg-transparent">
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgFrame3364243} />
            </div>
            <p className="min-w-0 flex-1 font-['Oswald:Medium'] text-[40px] font-medium leading-[40px] text-[#292420]">
              необходима только спортивная форма, в которой ходите на физкультуру и водичка
            </p>
          </li>
        </ul>

        <CtaButton
          variant="dark"
          label="Записаться на бесплатное пробное занятие"
          href={pageContactHref(CONTACT_ANCHORS.trial)}
          leadSource="trial-section"
          className="absolute top-[488px] left-[114px] flex w-[1117px]"
        />
      </div>

      {/* Desktop: орнамент сразу под CTA; ромбы зафиксированы на строке городов */}
      <div className="hidden md:block md:absolute md:top-[760px] md:left-0 md:h-[318px] md:w-full md:overflow-visible">
        {/*
          Якорь — центр строки городов (104 + 110/2 = 159).
          transform-origin на ряду ромбов: при scale узор растёт вверх/вниз, ромбы не уезжают.
        */}
  

        <div className="absolute top-[104px] left-[-60px] z-10 h-[110px] w-[1812px] overflow-clip full-bleed">
          <div className="cities-marquee absolute inset-y-0 left-0 font-['Oswald:SemiBold'] text-[64px] font-semibold uppercase leading-[100px] tracking-[-0.64px] text-[#ef6f2e]">
            <div className="cities-marquee__group">
              <span className="px-6">Минск</span>
              <span aria-hidden>•</span>
              <span className="px-6">Жодино</span>
              <span aria-hidden>•</span>
              <span className="px-6">Борисов</span>
              <span aria-hidden>•</span>
              <span className="px-6">Смолевичи</span>
              <span aria-hidden>•</span>
              <span className="px-6">Слуцк</span>
              <span aria-hidden>•</span>
            </div>
            <div className="cities-marquee__group" aria-hidden>
              <span className="px-6">Минск</span>
              <span aria-hidden>•</span>
              <span className="px-6">Жодино</span>
              <span aria-hidden>•</span>
              <span className="px-6">Борисов</span>
              <span aria-hidden>•</span>
              <span className="px-6">Смолевичи</span>
              <span aria-hidden>•</span>
              <span className="px-6">Слуцк</span>
              <span aria-hidden>•</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
