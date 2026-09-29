import { useState, type ReactNode } from 'react'

import {
  imgFrame3364165,
  imgFrame3364174,
  imgFrame3364178,
  imgFrame3364179,
  imgFrame3364180,
  imgFrame3364268,
  imgFrame3364269,
} from '../assets/images'
import { CtaButton } from './CtaButton'
import { OrnamentStripMarquee } from './OrnamentStripMarquee'

const AGE_CARDS = [
  {
    id: '4-5',
    hash: 'age-4-5',
    label: (
      <>
        <span className="leading-[48px] text-[44px]">{`4-5 `}</span>
        <span className="leading-[48px] text-[44px] lowercase">лет</span>
      </>
    ),
    badge: '4-5 лет',
    image: imgFrame3364174,
    imageClassName: 'object-cover object-top',
    headline: 'Первый шаг к дисциплине и уверенности',
    description:
      'В игровой форме учим слушать, двигаться и не бояться — формируем привычки, которые помогут в школе и жизни в коллективе.',
  },
  {
    id: '6-9',
    hash: 'age-6-9',
    label: (
      <>
        <span className="leading-[48px] text-[44px]">6-9 </span>
        <span className="leading-[48px] text-[44px] lowercase">лет</span>
      </>
    ),
    badge: '6-9 лет',
    image: imgFrame3364178,
    imageClassName: 'object-cover object-top -scale-x-100',
    headline: 'Возраст, когда закладывается самооценка',
    description:
      'Интегрируем в коллектив, даем первые спортивные разряды и учим не сдаваться перед первыми трудностями.',
  },
  {
    id: '10-13',
    hash: 'age-10-13',
    label: (
      <>
        <span className="leading-[48px] text-[44px]">10-13 </span>
        <span className="leading-[48px] text-[44px] lowercase">лет</span>
      </>
    ),
    badge: '10-13 лет',
    image: imgFrame3364179,
    imageClassName: 'object-cover object-top',
    headline: 'Сложный период — сильное окружение решает всё',
    description:
      'Переходим к серьёзным нагрузкам, закаляем волю, формируем умение ставить цели и достигать их.',
  },
  {
    id: '14+',
    hash: 'age-14',
    label: (
      <>
        <span className="leading-[48px] text-[44px]">14+ </span>
        <span className="leading-[48px] text-[44px] lowercase">лет</span>
      </>
    ),
    badge: '14+ лет',
    image: imgFrame3364180,
    imageClassName: 'object-cover object-top',
    headline: 'Это возраст, когда формируется личность на всю жизнь',
    description:
      'Учим ответственности, закладываем навык самообороны, развиваем лидерские качества и уверенность в себе.',
  },
] as const

/** Покой: 324×320 — фото подрезано снизу */
const CARD_H = 320
/** Раскрытие: 324×390 */
const CARD_H_ACTIVE = 400

function AgeCard({
  label,
  image,
  imageClassName,
  hash,
  active,
  onActivate,
}: {
  label: ReactNode
  image: string
  imageClassName?: string
  hash: string
  active: boolean
  onActivate: () => void
}) {
  return (
    <div
      className="relative w-[324px] shrink-0 cursor-pointer overflow-visible"
      style={{ height: CARD_H }}
      onMouseEnter={onActivate}
      onClick={onActivate}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onActivate()
        }
      }}
      role="button"
      tabIndex={0}
      aria-expanded={active}
    >
      {/* Оболочка: сверху якорь, вниз только раскрытие */}
      <div
        className="absolute top-0 right-0 left-0 overflow-hidden rounded-[24px] bg-[#26211e] transition-[height] duration-300 ease-out"
        style={{ height: active ? CARD_H_ACTIVE : CARD_H }}
      >
        {/*
          Фото 324×390, зафиксировано сверху (object-top).
          В покое контейнер 320 — низ подрезан; при раскрытии видно 390.
        */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[400px] overflow-hidden">
          <img
            alt=""
            className={`absolute inset-0 size-full max-w-none ${imageClassName || 'object-cover object-top'}`}
            src={image}
          />
        </div>

        {/* Затемнение низа в покое — читаемость лейбла */}
        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 h-[100px] bg-[linear-gradient(180deg,rgba(38,33,30,0)_0%,rgba(38,33,30,0.35)_100%)] transition-opacity duration-300 ${
            active ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Покой: возраст + круглая стрелка */}
        <div
          className={`absolute inset-x-0 top-0 flex h-[320px] flex-col items-center justify-end px-[32px] pb-[24px] transition-opacity duration-200 ${
            active ? 'pointer-events-none opacity-0' : 'opacity-100'
          }`}
        >
          <div className="relative flex w-full shrink-0 items-center justify-center gap-[16px]">
            <p className="relative shrink-0 whitespace-nowrap font-['Oswald:SemiBold'] text-[0px] font-semibold tracking-[-0.88px] text-[#26211e] uppercase [word-break:break-word]">
              {label}
            </p>
            <button
              type="button"
              aria-label="Подробнее"
              className="relative flex shrink-0 items-center overflow-clip rounded-[100px] bg-[#26211e] p-[16px]"
              onClick={(event) => {
                event.stopPropagation()
                onActivate()
              }}
            >
              <span className="relative size-[32px] shrink-0">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgFrame3364165} />
              </span>
            </button>
          </div>
        </div>

        {/* Раскрытие: ПОДРОБНЕЕ в нижней зоне (+70px) */}
        <div
          className={`absolute inset-x-0 bottom-0 flex h-[80px] items-center justify-center transition-opacity duration-300 ${
            active ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          <CtaButton
            label="подробнее"
            to={`/classes#${hash}`}
            className="w-auto shrink-0"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      </div>
    </div>
  )
}

export function AgeGroupsSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const active = activeIndex === null ? null : AGE_CARDS[activeIndex]

  return (
    <div
      id="directions"
      className="relative flex w-full shrink-0 flex-col content-stretch items-stretch gap-8 bg-[#26211e] px-0 py-0 scroll-mt-[58px] max-md:h-[866px] md:w-[1440px] md:items-center md:gap-[104px] md:bg-transparent md:px-[48px] md:py-[104px] md:scroll-mt-[80px]"
      data-node-id="427:4461"
    >
      <div className="relative h-auto w-full shrink-0 px-[14px] max-md:h-[120px] md:h-[244px] md:px-0" data-node-id="I427:4461;192:13124">
        <div className="absolute top-[-22px] left-[-997px] hidden h-[437px] w-[2946px] md:block" data-node-id="I427:4461;220:1516">
          <div className="absolute top-[175px] left-[1136px] h-[260px] w-[1273px]" data-node-id="I427:4461;220:1227">
            <div className="absolute inset-[0_-3.99%_0_0]">
              <img alt="" className="block size-full max-w-none" src={imgFrame3364269} />
            </div>
          </div>
          <div className="absolute top-[175px] left-0 h-[260px] w-[1273px]" data-node-id="I427:4461;220:1477">
            <div className="absolute inset-[0_-3.99%_0_0]">
              <img alt="" className="block size-full max-w-none" src={imgFrame3364269} />
            </div>
          </div>
          <div className="absolute top-[2px] left-[792px] h-[152px] w-[745px]" data-node-id="I427:4461;220:1195">
            <div className="absolute inset-[0_-3.99%_0_0]">
              <img alt="" className="block size-full max-w-none" src={imgFrame3364268} />
            </div>
          </div>
          <div className="absolute top-[2px] left-[1537px] h-[152px] w-[745px]" data-node-id="I427:4461;220:1269">
            <div className="absolute inset-[0_-3.99%_0_0]">
              <img alt="" className="block size-full max-w-none" src={imgFrame3364268} />
            </div>
          </div>
          <div className="absolute top-[2px] left-[2201px] h-[152px] w-[745px]" data-node-id="I427:4461;220:1438">
            <div className="absolute inset-[0_-3.99%_0_0]">
              <img alt="" className="block size-full max-w-none" src={imgFrame3364268} />
            </div>
          </div>
        </div>
        {/* Mobile title + lead */}
        <p className="font-['Oswald:SemiBold'] text-[26px] font-semibold uppercase leading-8 tracking-[-0.01em] text-[#dedddc] md:hidden max-md:absolute max-md:left-[14px] max-md:top-[64px]">
          Поэтапное развитие:
        </p>
        <p className="w-full max-w-full text-left font-['Oswald:Medium'] text-[20px] font-medium uppercase leading-6 tracking-[-0.02em] text-[#dedddc] md:hidden max-md:absolute max-md:left-[14px] max-md:top-[96px] max-md:w-[calc(100%-28px)]">
          дети обучаются постепенно,{' '}
          <span className="text-[#ef6f2e]">шаг за шагом</span>
          , в своей возрастной группе
        </p>

        {/* Desktop — строка 1 в одну линию; строки 2–3 ниже */}
        <div className="absolute top-0 left-0 hidden w-full md:block">
          <p className="m-0 flex items-baseline whitespace-nowrap uppercase text-[#dedddc]">
            <span className="shrink-0 font-['Oswald:SemiBold'] text-[92px] font-semibold leading-[100px] tracking-[-0.92px]">
              Поэтапное развитие:{' '}
            </span>
            <span className="shrink-0 font-['Oswald:Medium'] text-[64px] font-medium leading-[72px] tracking-[-0.02em]">
              дети обучаются
            </span>
          </p>
          <div className="flex items-start">
            <span
              aria-hidden
              className="pointer-events-none invisible shrink-0 select-none font-['Oswald:SemiBold'] text-[92px] font-semibold uppercase leading-[100px] tracking-[-0.92px] whitespace-nowrap"
            >
              Поэтапное развитие:{' '}
            </span>
            <div className="-ml-[305px] shrink-0 font-['Oswald:Medium'] text-[64px] font-medium uppercase leading-[72px] tracking-[-0.02em] text-[#dedddc]">
              <p className="m-0 whitespace-nowrap">
                постепенно, <span className="text-[#ef6f2e]">шаг&nbsp;за&nbsp;шагом</span>,
              </p>
              <p className="m-0 whitespace-nowrap">в&nbsp;своей возрастной группе</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile ornament — same as WhyTasai */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-[152px] z-0 w-full overflow-hidden md:hidden"
      >
        <OrnamentStripMarquee maskClassName="bg-[#dedddc]/[0.03]" />
      </div>

      {/* Mobile carousel — Figma 659:4142 cards 338×554 */}
      <div className="md:hidden">
        <div
          className="absolute left-[14px] right-0 top-[208px] z-10 flex snap-x snap-mandatory gap-2 overflow-x-auto overscroll-x-contain pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {AGE_CARDS.map((card) => (
            <article
              key={card.id}
              className="flex h-[554px] w-[338px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl bg-[#3a3330]"
            >
              <div className="relative h-[254px] shrink-0 overflow-hidden rounded-2xl">
                <img
                  alt=""
                  className={`absolute inset-0 size-full ${card.imageClassName}`}
                  src={card.id === '4-5' ? '/assets/mobile/age-45.png' : card.image}
                />
              </div>
              <div className="mt-6 flex h-[276px] shrink-0 flex-col px-[14px]">
                <div className="flex h-[180px] flex-col gap-3">
                  <p className="font-oswald text-[20px] font-semibold uppercase leading-6">
                    <span className="text-[#ef6f2e]">{card.badge}</span>
                    <span className="text-[#dedddc]"> — {card.headline}</span>
                  </p>
                  <p className="font-['Inter'] text-[14px] leading-[18px] text-[#dedddc]">{card.description}</p>
                </div>
                <CtaButton
                  label="подробнее"
                  to={`/classes#${card.hash}`}
                  size="sm"
                  className="mt-auto mb-6 w-[310px]"
                />
              </div>
            </article>
          ))}
          <div aria-hidden className="w-1 shrink-0 snap-end" />
        </div>
      </div>

      {/* Desktop cards */}
      <div
        className="relative hidden w-full shrink-0 flex-col md:flex"
        onMouseLeave={() => setActiveIndex(null)}
      >
        <div
          className="relative flex w-full content-stretch items-start gap-[16px] transition-[height] duration-300 ease-out"
          style={{ height: activeIndex === null ? CARD_H : CARD_H_ACTIVE }}
          data-node-id="I427:4461;192:13102"
        >
          {AGE_CARDS.map((card, index) => (
            <AgeCard
              key={card.id}
              label={card.label}
              image={card.image}
              imageClassName={card.imageClassName}
              hash={card.hash}
              active={activeIndex === index}
              onActivate={() => setActiveIndex(index)}
            />
          ))}
        </div>

        {/* Коричневая плашка с возрастом + описание */}
        <div
          className={`flex w-full items-stretch gap-[32px] overflow-hidden transition-[height,opacity,margin] duration-300 ease-out ${
            active ? 'mt-[16px] h-[128px] opacity-100' : 'mt-0 h-0 opacity-0'
          }`}
        >
          {active ? (
            <>
              <div className="flex h-[128px] w-[300px] shrink-0 items-center justify-center rounded-[24px] bg-[#26211e] py-[28px]">
                <p className="whitespace-nowrap font-['Oswald:SemiBold'] text-[64px] font-semibold leading-[72px] tracking-[-0.88px] text-[#dedddc] uppercase">
                  {active.badge}
                </p>
              </div>
              <div className="flex min-w-0 flex-1 basis-0 flex-col justify-center gap-[16px]">
                <p className="w-full font-['Oswald:Medium'] text-[44px] font-medium leading-[44px] text-[#ef6f2e]">
                  {active.headline}
                </p>
                <p className="w-full max-w-[760px] font-['Inter:Regular'] text-[20px] leading-[24px] text-[#dedddc] not-italic">
                  {active.description}
                </p>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}
