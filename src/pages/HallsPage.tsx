import { useState } from 'react'

import {
  img,
  img1,
  imgFrame3364242,
} from '../assets/images'
import { ContactForm } from '../components/ContactForm'
import { CtaButton } from '../components/CtaButton'
import { MembershipFaqBlock } from '../components/FaqSection'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { PatternMarquee } from '../components/PatternMarquee'
import { OrnamentStripMarquee } from '../components/OrnamentStripMarquee'
import { TasaiWatermark } from '../components/TasaiWatermark'
import { CONTACT_ANCHORS, pageContactHref } from '../lib/contactAnchors'
import { HALL_LOCATIONS, yandexMapEmbedUrl } from '../lib/locations'
import { cn } from '../lib/utils'

const halls = {
  bynMes: '/assets/halls/byn-mes.svg',
  trianglesB: '/assets/halls/decor-triangles-b.svg',
  benefitsDecor: '/assets/halls/decor-benefits.svg',
  separator: '/assets/halls/decor-separator.svg',
} as const

const benefits = [
  {
    title: 'Безлимитное посещение',
    text: 'Ребёнок может посещать все тренировки своей возрастной группы по расписанию и занятия других групп в любой день и время',
  },
  {
    title: 'Один понятный тариф',
    text: 'Не нужно выбирать между пакетами и переплачивать за дополнительные занятия',
  },
  {
    title: 'Заморозка абонемента',
    text: 'В летний период абонемент можно заморозить без объяснения причин. В течение учебного года — при предоставлении подтверждающего документа.',
  },
  {
    title: 'Семейные скидки',
    text: 'Регулярные тренировки помогают быстрее развивать дисциплину и уверенность',
  },
] as const

function BenefitCard({
  title,
  text,
  className,
  compact,
}: {
  title: string
  text: string
  className?: string
  compact?: boolean
}) {
  if (compact) {
    return (
      <div className={className || 'flex w-[296px] shrink-0 items-start gap-2'}>
        <div className="relative mt-2 h-4 w-2 shrink-0">
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgFrame3364242} />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <p className="font-['Oswald:Regular'] text-[20px] leading-5 text-[#ef6f2e]">{title}</p>
          <p className="font-['Inter:Regular'] text-[14px] leading-[18px] text-[#dedddc] not-italic">{text}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={className || 'flex w-[437px] items-start gap-[16px]'}>
      <div className="relative h-[40px] w-[16px] shrink-0">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgFrame3364242} />
      </div>
      <div className="flex w-[405px] shrink-0 flex-col items-start gap-[16px]">
        <p className="h-[80px] w-full font-['Oswald:Regular'] text-[40px] leading-[40px] text-[#ef6f2e]">{title}</p>
        <p className="w-full font-['Inter:Regular'] text-[20px] leading-[24px] text-[#dedddc] not-italic">{text}</p>
      </div>
    </div>
  )
}

export function HallsPage() {
  const [activeCity, setActiveCity] = useState(0)
  const city = HALL_LOCATIONS[activeCity]

  return (
    <div
      className="relative w-full overflow-x-clip bg-[#3a3330] max-md:min-h-0 md:mx-auto md:w-[1440px]"
      data-node-id="516:3164"
      data-name="Halls"
    >
      <Header className="full-bleed-sticky sticky top-0 z-50 flex h-[58px] w-full content-stretch items-center justify-between bg-[rgba(38,33,30,0.55)] px-[14px] backdrop-blur-[8px] transition-colors hover:bg-[#26211e] md:h-[80px] md:px-[48px]" />

      {/* —— Mobile flow (iPhone 16-5 / 706:3459) —— */}
      <div className="flex flex-col md:hidden">
        {/* Hero — CTA at 347 (h-48) + 31px → pattern */}
        <section className="relative h-[426px] w-full overflow-hidden">
          <TasaiWatermark
            className="top-[58px] h-[100px]"
            textClassName="text-[96px] tracking-[-1.92px] text-[rgba(38,33,30,0.17)]"
            gapClassName="gap-16"
          />
          <h1 className="font-oswald absolute top-[64px] left-3 w-[calc(100%-24px)] text-[30px] font-semibold uppercase leading-9 tracking-[-0.3px] text-[#ef6f2e]">
            развитие ребёнка не должно зависеть от подсчёта посещений
          </h1>
          <p className="font-oswald absolute top-[199px] left-[14px] w-[calc(100%-28px)] text-[20px] font-medium uppercase leading-7 tracking-[-0.4px] text-[#dedddc]">
            Стоимость единого месячного тарифа зависит только от города, в котором проходят тренировки
          </p>
          <CtaButton
            size="sm"
            label="Записаться на пробное занятие"
            href={pageContactHref(CONTACT_ANCHORS.hallsHeroMobile)}
            className="absolute top-[347px] left-[14px] w-[calc(100%-28px)]"
          />
        </section>

        <OrnamentStripMarquee
          height={65}
          unitHeight={96}
          stripWidth={488}
          src={halls.trianglesB}
          flipY
        />

        {/* Benefits title — 24px to dark block; 30px left */}
        <div className="relative z-10 flex items-end gap-2 pt-[3px] pr-4 pb-6 pl-[30px]">
          <p className="font-oswald text-[26px] font-semibold uppercase leading-8 tracking-[-0.26px] text-[#dedddc] whitespace-nowrap">
            что вы получаете
          </p>
          <div className="relative h-14 w-7 shrink-0">
            <img alt="?" className="absolute inset-0 size-full max-w-none" src={img} />
          </div>
        </div>

        <section className="relative overflow-hidden bg-[#292420] pt-6">
          <div className="overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="relative h-[282px] w-[646px] shrink-0">
              <BenefitCard
                compact
                className="absolute top-0 left-[30px] flex w-[296px] items-start gap-2"
                title={benefits[0].title}
                text={benefits[0].text}
              />
              <BenefitCard
                compact
                className="absolute top-0 left-[350px] flex w-[296px] items-start gap-2"
                title={benefits[2].title}
                text={benefits[2].text}
              />
              <BenefitCard
                compact
                className="absolute top-[166px] left-[30px] flex w-[296px] items-start gap-2"
                title={benefits[1].title}
                text={benefits[1].text}
              />
              <BenefitCard
                compact
                className="absolute top-[166px] left-[350px] flex w-[328px] items-start gap-2"
                title={benefits[3].title}
                text={benefits[3].text}
              />
            </div>
          </div>
          {/* Bottom ornament — #DEDDDC @ 3% */}
          <OrnamentStripMarquee
            className="mb-5"
            maskClassName="bg-[#dedddc]/[0.03]"
          />
        </section>

        {/* Cities + hall card + map */}
        <section className="pt-16">
          <div className="mb-4 overflow-x-auto px-[14px] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex w-max items-center gap-[8px]">
              {HALL_LOCATIONS.map((item, index) => {
                const active = index === activeCity
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveCity(index)}
                    className={cn(
                      'group shrink-0 rounded-2xl px-3 py-2 transition-colors',
                      active ? 'bg-[#ef6f2e]' : 'bg-[#26211e]',
                    )}
                  >
                    <span
                      className={cn(
                        'font-oswald whitespace-nowrap text-[20px] font-medium uppercase leading-6 tracking-normal transition-colors',
                        active
                          ? 'text-[#26211e] group-hover:text-[#dedddc]'
                          : 'text-[#dedddc] group-hover:text-[#dedddc]',
                      )}
                      style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 500, letterSpacing: 0 }}
                    >
                      {item.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mx-[14px] flex w-[calc(100%-28px)] flex-col">
            <div className="h-[200px] w-full overflow-hidden rounded-tl-2xl rounded-tr-2xl">
              <img
                key={`photo-m-${city.id}`}
                alt={`Зал Тасай — ${city.label}`}
                className="size-full object-cover object-[50%_40%]"
                src={city.photo}
              />
            </div>
            <div className="flex w-full flex-col gap-4 overflow-clip rounded-bl-2xl rounded-br-2xl bg-[#26211e] px-6 py-6">
              <div className="flex items-start gap-3.5">
                <p
                  key={`price-m-${city.id}`}
                  className="font-oswald text-[48px] font-semibold leading-[58px] tracking-[-0.48px] uppercase text-[#ef6f2e]"
                >
                  {city.price}
                </p>
                <div className="relative mt-3 h-[31px] w-16 shrink-0">
                  <img alt="" className="absolute inset-0 block size-full max-w-none" src={halls.bynMes} />
                </div>
              </div>
              <p
                key={`addr-m-${city.id}`}
                className="font-oswald text-[20px] font-medium leading-5 text-white"
              >
                {city.address}
              </p>
            </div>
          </div>

          <div className="mx-[14px] mt-4 h-[188px] w-[calc(100%-28px)] overflow-hidden rounded-2xl bg-[#26211e]">
            <iframe
              key={`map-m-${city.id}`}
              title={`Карта — ${city.label}, ${city.address}`}
              src={yandexMapEmbedUrl(city.lat, city.lon)}
              className="size-full border-0"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </section>

        <div className="overflow-hidden pt-24 pb-8">
          <div className="cities-marquee flex whitespace-nowrap">
            {[0, 1].map((g) => (
              <p
                key={g}
                className="font-oswald shrink-0 text-[26px] font-semibold uppercase leading-8 tracking-[-0.26px] text-[#ef6f2e]"
                aria-hidden={g === 1}
              >
                Минск&nbsp;&nbsp;•&nbsp;&nbsp;жодино&nbsp;&nbsp;•&nbsp;&nbsp;борисов&nbsp;&nbsp;•&nbsp;&nbsp;смолевичи&nbsp;&nbsp;•&nbsp;&nbsp;слуцк&nbsp;&nbsp;•&nbsp;&nbsp;
              </p>
            ))}
          </div>
        </div>

        <section className="px-[14px] pb-0">
          {/* Trial CTA — same as About mobile 659:5062 */}
          <div className="relative h-[248px] w-full overflow-hidden rounded-2xl bg-[#ef6f2e]">
            <p
              aria-hidden
              className="pointer-events-none absolute right-0 top-0 font-oswald text-[50px] font-semibold uppercase leading-none text-[rgba(41,36,32,0.07)] [writing-mode:vertical-rl]"
            >
              бесплатно
            </p>
            <p className="font-oswald absolute inset-x-4 top-6 z-[1] text-center text-[26px] font-semibold uppercase leading-8 tracking-[-0.26px] text-[#26211e]">
              Запишитесь на
              <br />
              <span className="text-[#dedddc]">пробное БЕСПЛАТНОЕ</span>
              <br />
              занятие и познакомтесь
              <br />
              с ТАСАЙ лично
            </p>
            <CtaButton
              size="sm"
              variant="dark"
              label="оставить заявку"
              href={pageContactHref(CONTACT_ANCHORS.hallsTrialMobile)}
              className="absolute inset-x-4 top-[176px] z-[1]"
            />
          </div>
        </section>

        {/* Ornament under trial CTA — 64px above/below */}
        <OrnamentStripMarquee
          className="py-16"
          maskClassName="bg-[#292420]/17"
        />

        <MembershipFaqBlock className="max-md:pt-0 max-md:pb-16" />

        <div id="contact" className="scroll-mt-[58px]">
          <ContactForm />
        </div>
        <Footer />
      </div>

      {/* —— Desktop absolute layout —— */}
      <div className="relative hidden min-h-[6288px] w-[1440px] md:block">
        <TasaiWatermark
          className="top-[287px] z-0 h-[210px]"
          textClassName="tracking-[-3.58px] text-[rgba(38,33,30,0.17)]"
        />

        <div className="absolute top-[80px] left-1/2 h-[649px] w-[1440px] -translate-x-1/2 overflow-hidden">
          <p className="absolute top-[95px] left-[48px] w-[1344px] font-['Oswald:Medium'] text-[64px] font-medium leading-[72px] uppercase text-[#ef6f2e]">
            развитие ребёнка не должно зависеть от подсчёта посещений
          </p>
          <p className="absolute top-[318px] left-[48px] w-[664px] font-['Oswald:Regular'] text-[40px] leading-[40px] text-[#dedddc]">
            Стоимость единого месячного тарифа зависит только от города, в котором проходят тренировки
          </p>

          <CtaButton
            label="Записаться на пробное занятие"
            href={pageContactHref(CONTACT_ANCHORS.hallsHeroDesktop)}
            className="absolute top-[372px] left-[841px] z-10 w-[551px]"
          />
        </div>

        <PatternMarquee
          className="absolute top-[606px] z-0"
          secondarySrc={halls.trianglesB}
        />

        <PatternMarquee
          className="absolute top-[2497px] left-0 z-20 w-[1440px]"
          primarySrc={halls.separator}
          height={208}
          flipY
        />

        <div className="pointer-events-none absolute top-[809px] left-[80px] z-30 h-[165px] w-[484px]">
          <p className="absolute top-0 left-[233px] font-['Oswald:SemiBold'] text-[92px] font-semibold leading-[72px] tracking-[-0.92px] uppercase whitespace-nowrap text-[#dedddc]">
            что
          </p>
          <p className="absolute top-[89px] left-0 font-['Oswald:Medium'] text-[64px] font-medium leading-[72px] tracking-[-1.92px] uppercase whitespace-nowrap text-[#dedddc]">
            вы получаете
          </p>
          <div className="absolute top-0 right-0 h-[161px] w-[81px]">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={img} />
          </div>
        </div>

        <div className="pointer-events-none absolute top-[898px] left-0 z-10 h-[674px] w-[1440px] overflow-hidden bg-[#292420] full-bleed">
          <div className="absolute top-[98px] right-[-400px] h-[260px] w-[1273px]">
            <div className="absolute inset-[0_-3.99%_0_0]">
              <img alt="" className="block size-full max-w-none" src={halls.benefitsDecor} />
            </div>
          </div>
          <div className="absolute top-[370px] left-[-855px] h-[260px] w-[1273px]">
            <div className="absolute inset-[0_-3.99%_0_0]">
              <img alt="" className="block size-full max-w-none" src={halls.benefitsDecor} />
            </div>
          </div>
        </div>

        <div className="absolute top-[898px] left-1/2 z-10 h-[674px] w-[1440px] -translate-x-1/2">
          <BenefitCard
            className="absolute top-[148px] left-[48px] flex w-[437px] items-start gap-[16px]"
            title={benefits[0].title}
            text={benefits[0].text}
          />
          <BenefitCard
            className="absolute top-[148px] left-[501px] flex w-[438px] items-start gap-[16px]"
            title={benefits[1].title}
            text={benefits[1].text}
          />
          <BenefitCard
            className="absolute top-[364px] left-[501px] flex w-[438px] items-start gap-[16px]"
            title={benefits[2].title}
            text={benefits[2].text}
          />
          <BenefitCard
            className="absolute top-[364px] left-[955px] flex w-[437px] items-start gap-[16px]"
            title={benefits[3].title}
            text={benefits[3].text}
          />
        </div>

        <div className="absolute top-[1572px] left-1/2 h-[925px] w-[1440px] -translate-x-1/2 overflow-clip">
          <div className="absolute top-[112px] left-[48px] flex w-[1344px] items-center gap-[16px] rounded-[24px] bg-[#26211e] px-[40px] py-[16px]">
            {HALL_LOCATIONS.map((item, index) => {
              const active = index === activeCity
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveCity(index)}
                  className={cn(
                    'group flex min-w-px flex-[1_0_0] items-center justify-center rounded-[500px] px-[40px] pt-[16px] pb-[24px] transition-colors',
                    active ? 'bg-[#ef6f2e]' : 'bg-[#3a3330]',
                  )}
                >
                  <span
                    className={cn(
                      'font-oswald whitespace-nowrap text-[40px] font-medium leading-[40px] tracking-normal transition-colors',
                      active
                        ? 'text-[#26211e] group-hover:text-[#dedddc]'
                        : 'text-[rgba(222,221,220,0.55)] group-hover:text-[#dedddc]',
                    )}
                    style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 500, letterSpacing: 0 }}
                  >
                    {item.label}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="absolute top-[240px] left-[48px] h-[581px] w-[1344px]">
            <div className="absolute top-0 left-0 flex w-[664px] flex-col items-start gap-[24px] overflow-clip rounded-[24px] bg-[#26211e] px-[32px] py-[24px]">
              <p
                key={`addr-${city.id}`}
                className="w-full font-['Oswald:Medium'] text-[32px] font-medium leading-[40px] text-white"
              >
                {city.address}
              </p>
              <div className="flex items-start gap-[14px]">
                <p
                  key={`price-${city.id}`}
                  className="font-['Oswald:SemiBold'] text-[64px] font-semibold leading-[72px] tracking-[-0.64px] uppercase whitespace-nowrap text-[#ef6f2e]"
                >
                  {city.price}
                </p>
                <div className="relative h-[45px] w-[111px] shrink-0">
                  <img alt="" className="absolute inset-0 block size-full max-w-none" src={halls.bynMes} />
                </div>
              </div>
            </div>

            <div className="absolute top-[200px] left-0 h-[381px] w-[664px] overflow-hidden rounded-[24px] bg-[#26211e]">
              <iframe
                key={city.id}
                title={`Карта — ${city.label}, ${city.address}`}
                src={yandexMapEmbedUrl(city.lat, city.lon)}
                className="absolute inset-0 size-full border-0"
                loading="lazy"
                allowFullScreen
              />
            </div>

            <div className="absolute top-0 left-[680px] h-[581px] w-[664px] overflow-hidden rounded-[24px] bg-[#26211e]">
              <img
                key={`photo-${city.id}`}
                alt={`Зал Тасай — ${city.label}`}
                className="absolute inset-0 size-full max-w-none object-cover object-[50%_40%]"
                src={city.photo}
              />
            </div>
          </div>
        </div>

        <div className="absolute top-[2809px] left-1/2 h-[600px] w-[1344px] -translate-x-1/2 overflow-clip rounded-[24px] bg-[#ef6f2e]">
          <div className="absolute top-0 left-1/2 h-[234px] w-[1344px] -translate-x-1/2">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={img1} />
          </div>
          <div className="absolute top-[104px] left-1/2 w-[1138px] -translate-x-1/2 text-center font-['Oswald:Medium'] text-[64px] font-medium tracking-[-1.92px] uppercase text-[#26211e]">
            <p className="leading-[72px]">Запишитесь на </p>
            <p className="leading-[72px]">
              <span className="text-[#dedddc]">пробное БЕСПЛАТНОЕ занятие </span>
              <span>и познакомтесь с ТАСАЙ лично</span>
            </p>
          </div>
          <CtaButton
            variant="dark"
            label="оставить заявку"
            href={pageContactHref(CONTACT_ANCHORS.hallsTrialDesktop)}
            className="absolute top-[432px] left-[114px] w-[1117px]"
          />
        </div>

        <div className="absolute top-[3513px] left-0 z-10 w-[1440px]">
          <MembershipFaqBlock />

          <div id="contact" className="relative z-10 mt-[104px] scroll-mt-[80px]">
            <ContactForm />
          </div>

          <Footer className="full-bleed-bg relative z-10 h-[845px] w-[1440px] overflow-clip rounded-tl-[24px] rounded-tr-[24px] bg-[#26211e]" />
        </div>
      </div>
    </div>
  )
}
