import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { img, img1, imgFrame3364242 } from '../assets/images'
import { ContactForm } from '../components/ContactForm'
import { CtaButton } from '../components/CtaButton'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { PatternMarquee } from '../components/PatternMarquee'
import { OrnamentStripMarquee } from '../components/OrnamentStripMarquee'
import { TasaiWatermark } from '../components/TasaiWatermark'
import { CONTACT_ANCHORS, pageContactHref } from '../lib/contactAnchors'
import { cn } from '../lib/utils'

const assets = {
  methodLandscape: '/assets/classes/method-landscape.png',
  methodPortrait: '/assets/classes/method-portrait.png',
  age45: '/assets/classes/age-45.png',
  age69: '/assets/classes/age-69.png',
  age1013: '/assets/classes/age-1013.png',
  age14: '/assets/classes/age-14.png',
  note: '/assets/classes/note.png',
  heroPattern: '/assets/classes/hero-pattern.svg',
  skillsBg: '/assets/classes/skills-bg.svg',
} as const

const skills = [
  'техника киокусинкай',
  'координация',
  'философия карате',
  'работа в парах',
  'дисциплина',
  'концентрация',
  'самоконтроль',
  'уважение',
  'растяжка',
] as const

const methodCards = [
  {
    title: 'Возрастные группы',
    text: 'Дети занимаются среди сверстников своего возраста и уровня развития.',
  },
  {
    title: 'Постепенное усложнение',
    text: 'Новые навыки добавляются по мере готовности ребёнка.',
  },
  {
    title: 'Регулярная практика',
    text: 'Стабильные занятия помогают формировать уверенность и дисциплину.',
  },
  {
    title: 'Последовательная программа',
    text: 'Каждая тренировка — часть общей системы обучения.',
  },
] as const

const ageGroups = [
  {
    id: '45',
    hash: 'age-4-5',
    tab: '4-5 лет',
    focus: 'фокус на адаптации и здоровьи',
    image: assets.age45,
    goal: 'Развитие координации, профилактика плоскостопия и осанки, приучение к дисциплине и командам тренера',
    result: 'Подготовка к школе — ребёнок учится слушать наставника и работать в группе',
    barWidth: 883,
    age: '4-5 лет',
    focusDesktop: '– фокус на адаптации и здоровьи',
    // heading ends 303; bar h 72; photo h 400 → 72 / 48 / 72 rhythm
    top: 375,
    imageTop: 495,
    goalTop: 495,
    resultTop: 699,
  },
  {
    id: '69',
    hash: 'age-6-9',
    tab: '6-9 лет',
    focus: 'фокус на уверенности и базах',
    image: assets.age69,
    goal: 'Закладка базовой техники киокусинкай, укрепление иммунитета, навыки самообороны и антибуллинга',
    result: 'Формирование здоровой самооценки и умение «выключать» гаджеты ради живого общения',
    barWidth: 939,
    age: '6-9 лет',
    focusDesktop: '– фокус на уверенности и базах',
    top: 967,
    imageTop: 1087,
    goalTop: 1087,
    resultTop: 1291,
  },
  {
    id: '1013',
    hash: 'age-10-13',
    tab: '10-13 лет',
    focus: 'фокус на характере и кругу общения',
    image: assets.age1013,
    goal: 'Глубокое изучение философии карате, развитие целеустремленности, защита от «плохих компаний» через вовлеченность в жизнь клуба',
    result: 'Эмоциональная устойчивость и формирование волевого характера',
    barWidth: 1052,
    age: '10-13 лет',
    focusDesktop: '– фокус на характере и кругу общения',
    top: 1559,
    imageTop: 1679,
    goalTop: 1679,
    resultTop: 1883,
  },
  {
    id: '14',
    hash: 'age-14',
    tab: '14+ лет',
    focus: 'фокус на мастерстве и подготовке к жизни',
    image: assets.age14,
    goal: 'Подготовка к чёрному поясу, развитие лидерских качеств, физическая мощь как «страховой полис» на взрослую жизнь',
    result: 'Готовность к жизненным вызовам и высокий уровень самодисциплины',
    barWidth: 1165,
    age: '14+ лет',
    focusDesktop: '– фокус на мастерстве и подготовке к жизни',
    top: 2151,
    imageTop: 2271,
    goalTop: 2271,
    resultTop: 2475,
  },
] as const

const AGE_HASH_INDEX: Record<string, number> = Object.fromEntries(
  ageGroups.map((group, index) => [group.hash, index]),
)

const HEADER_SCROLL_OFFSET = 80

function scrollToAgeAnchor(hash: string) {
  const nodes = document.querySelectorAll(`[data-age-anchor="${hash}"]`)
  for (const node of nodes) {
    if (!(node instanceof HTMLElement)) continue
    const { width, height } = node.getBoundingClientRect()
    if (width <= 0 && height <= 0) continue
    const top = node.getBoundingClientRect().top + window.scrollY - HEADER_SCROLL_OFFSET
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
    return
  }
}

function MethodCard({
  title,
  text,
  className,
  compact,
}: {
  title: string
  text: string
  className: string
  compact?: boolean
}) {
  return (
    <div className={className}>
      <p
        className={cn(
          'shrink-0 font-oswald font-normal text-[#ef6f2e]',
          compact ? 'w-full text-[20px] leading-5' : 'text-[40px] leading-[40px]',
        )}
      >
        {title}
      </p>
      <p
        className={cn(
          "font-['Inter:Regular'] text-[#dedddc] not-italic",
          compact ? 'w-full text-[14px] leading-[18px]' : 'text-[20px] leading-[24px]',
        )}
      >
        {text}
      </p>
    </div>
  )
}

function AgeBlock({
  hash,
  top,
  barWidth,
  age,
  focus,
  image,
  imageTop,
  goal,
  result,
  goalTop,
  resultTop,
}: {
  hash: string
  top: number
  barWidth: number
  age: string
  focus: string
  image: string
  imageTop: number
  goal: string
  result: string
  goalTop: number
  resultTop: number
}) {
  return (
    <>
      <div
        data-age-anchor={hash}
        className="absolute flex h-[72px] scroll-mt-[80px] items-center gap-[16px] rounded-tr-[24px] rounded-br-[24px] bg-[#ef6f2e] py-[16px] pr-[48px]"
        style={{
          top,
          left: 'calc(720px - 50vw)',
          width: `calc(${barWidth}px - 720px + 50vw)`,
          paddingLeft: 'max(48px, calc(50vw - 720px + 48px))',
        }}
      >
        <div className="relative h-[40px] w-[16px] shrink-0">
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgFrame3364242} />
        </div>
        <p className="shrink-0 font-['Oswald:Bold'] text-[48px] font-bold leading-[40px] text-[#26211e]">{age}</p>
        <p className="font-['Oswald:Medium'] text-[40px] font-medium leading-[40px] text-[#26211e]">{focus}</p>
      </div>

      <div
        className="absolute left-[48px] h-[400px] w-[648px] overflow-hidden rounded-[24px]"
        style={{ top: imageTop }}
      >
        <img alt="" className="absolute inset-0 size-full max-w-none object-cover" src={image} />
      </div>

      <p
        className="absolute left-[752px] w-[613px] font-['Oswald:Regular'] text-[40px] font-normal leading-[40px] text-[#dedddc]"
        style={{ top: goalTop }}
      >
        Цель:
      </p>
      <div
        className="absolute left-[728px] flex w-[661px] flex-col items-stretch gap-[16px] rounded-[24px] bg-[#26211e] px-[24px] py-[16px]"
        style={{ top: goalTop + 56 }}
      >
        <p className="font-['Inter:Regular'] text-[20px] leading-[24px] text-[#dedddc] not-italic">{goal}</p>
      </div>

      <p
        className="absolute left-[752px] w-[613px] font-['Oswald:Regular'] text-[40px] font-normal leading-[40px] text-[#dedddc]"
        style={{ top: resultTop }}
      >
        Результат:
      </p>
      <div
        className="absolute left-[728px] flex w-[661px] flex-col items-stretch gap-[16px] rounded-[24px] bg-[#26211e] px-[24px] py-[16px]"
        style={{ top: resultTop + 56 }}
      >
        <p className="font-['Inter:Regular'] text-[20px] leading-[24px] text-[#dedddc] not-italic">{result}</p>
      </div>
    </>
  )
}

function CitiesMarquee({ className }: { className?: string }) {
  return (
    <div className={cn('overflow-hidden', className)}>
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
  )
}

function MethodologyScroll() {
  const scrollerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    const center = () => {
      el.scrollLeft = Math.max(0, (el.scrollWidth - el.clientWidth) / 2)
    }
    center()
    const ro = new ResizeObserver(center)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <section className="relative w-full">
      {/* Title stays fixed while cards scroll — 24px to cards */}
      <div className="relative z-10 flex items-end justify-center gap-2 px-4 pt-[3px] pb-[24px]">
        <p className="font-oswald text-[26px] font-semibold uppercase leading-8 tracking-[-0.26px] text-[#dedddc] whitespace-nowrap">
          Основы нашей методики
        </p>
        <img
          alt=""
          aria-hidden
          className="h-14 w-4 shrink-0 object-contain object-bottom"
          src="/assets/exclamation.svg"
        />
      </div>

      <div
        ref={scrollerRef}
        className="relative w-full overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {/* Side insets only for first/last edge — cards scroll to screen edge */}
        <div className="flex w-max">
          <div aria-hidden className="w-[14px] shrink-0" />
          {/* 3×2 grid: rows stretch so photos match card height */}
          <div className="grid w-[832px] shrink-0 grid-cols-3 gap-2">
            <MethodCard
              compact
              className="flex h-full min-h-0 flex-col gap-6 overflow-clip rounded-2xl bg-[#26211e] px-4 py-6"
              title={methodCards[0].title}
              text={methodCards[0].text}
            />
            <MethodCard
              compact
              className="flex h-full min-h-0 flex-col gap-6 overflow-clip rounded-2xl bg-[#26211e] px-4 py-6"
              title={methodCards[2].title}
              text={methodCards[2].text}
            />
            <div className="min-h-0 overflow-hidden rounded-2xl bg-[#26211e]">
              <img alt="" className="size-full object-cover" src={assets.methodLandscape} />
            </div>

            <div className="min-h-0 overflow-hidden rounded-2xl bg-[#26211e]">
              <img
                alt=""
                className="size-full object-cover object-[50%_20%]"
                src={assets.methodPortrait}
              />
            </div>
            <MethodCard
              compact
              className="flex h-full min-h-0 flex-col gap-6 overflow-clip rounded-2xl bg-[#26211e] px-4 py-6"
              title={methodCards[1].title}
              text={methodCards[1].text}
            />
            <MethodCard
              compact
              className="flex h-full min-h-0 flex-col gap-6 overflow-clip rounded-2xl bg-[#26211e] px-4 py-6"
              title={methodCards[3].title}
              text={methodCards[3].text}
            />
          </div>
          <div aria-hidden className="w-[14px] shrink-0" />
        </div>
      </div>
    </section>
  )
}

export function ClassesPage() {
  const { hash } = useLocation()
  const [activeAge, setActiveAge] = useState(0)
  const age = ageGroups[activeAge]

  useEffect(() => {
    const id = hash.replace(/^#/, '')
    const index = AGE_HASH_INDEX[id]
    if (index !== undefined) setActiveAge(index)
  }, [hash])

  useEffect(() => {
    const id = hash.replace(/^#/, '')
    if (AGE_HASH_INDEX[id] === undefined) return
    const timer = window.setTimeout(() => scrollToAgeAnchor(id), 150)
    return () => window.clearTimeout(timer)
  }, [hash, activeAge])

  return (
    <div
      className="relative w-full overflow-x-clip bg-[#3a3330] max-md:min-h-0 md:mx-auto md:min-h-[8135px] md:w-[1440px]"
      data-node-id="516:2844"
      data-name="classes"
    >
      <Header className="full-bleed-sticky sticky top-0 z-50 flex h-[58px] w-full content-stretch items-center justify-between bg-[rgba(38,33,30,0.55)] px-[14px] backdrop-blur-[8px] transition-colors hover:bg-[#26211e] md:h-[80px] md:px-[48px]" />

      {/* —— Mobile flow (iPhone 16-4 / 702:3087) —— */}
      <div className="flex flex-col md:hidden">
        {/* Hero — 459px */}
        <section className="relative h-[426px] w-full overflow-hidden">
          <TasaiWatermark
            className="top-[58px] h-[100px]"
            textClassName="text-[96px] tracking-[-1.92px] text-[rgba(38,33,30,0.17)]"
            gapClassName="gap-16"
          />
          <h1 className="font-oswald absolute top-[64px] left-3 w-[calc(100%-24px)] text-[30px] font-semibold uppercase leading-9 tracking-[-0.3px]">
            <span className="block text-[#dedddc]">Ребёнок</span>
            <span className="block text-[#dedddc]">не «ходит на карате»,</span>
            <span className="block text-[#ef6f2e]">он «учится карате»</span>
          </h1>
          <p className="font-oswald absolute top-[199px] left-[14px] w-[calc(100%-28px)] text-[20px] font-medium uppercase leading-7 tracking-[-0.4px] text-[#dedddc]">
            Мы строим обучение как долгосрочный образовательный процесс, где каждый новый этап
            опирается на предыдущий.
          </p>
          <CtaButton
            size="sm"
            label="Записаться на пробное занятие"
            href={pageContactHref(CONTACT_ANCHORS.classesHeroMobile)}
            className="absolute top-[347px] left-[14px] w-[calc(100%-28px)]"
          />
        </section>

        {/* Pattern — 31px below CTA, scrolls left like ТАСАЙ */}
        <OrnamentStripMarquee
          height={65}
          unitHeight={96}
          stripWidth={488}
          src={assets.heroPattern}
          flipY
        />

        {/* Methodology — scroll both ways from centered start */}
        <MethodologyScroll />

        {/* Skills ribbon — equal 64px above and below */}
        <div className="relative mt-16 mb-16 h-[65px] w-full overflow-hidden">
          <div className="absolute inset-0 -scale-y-100 overflow-hidden">
            <img
              alt=""
              className="absolute left-1/2 top-[-15px] h-[96px] w-[471px] max-w-none -translate-x-[calc(50%+35px)]"
              src={assets.skillsBg}
            />
          </div>
          <div className="cities-marquee absolute inset-y-0 left-0 flex items-center">
            <div className="cities-marquee__group flex items-start gap-4 pr-4">
              {skills.map((item) => (
                <span key={item} className="flex items-start gap-4">
                  <span className="relative block h-7 w-2 shrink-0">
                    <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgFrame3364242} />
                  </span>
                  <span className="font-oswald whitespace-nowrap text-[20px] font-normal leading-7 text-[#ef6f2e]">
                    {item}
                  </span>
                </span>
              ))}
            </div>
            <div className="cities-marquee__group flex items-start gap-4 pr-4" aria-hidden>
              {skills.map((item) => (
                <span key={`d-${item}`} className="flex items-start gap-4">
                  <span className="relative block h-7 w-2 shrink-0">
                    <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgFrame3364242} />
                  </span>
                  <span className="font-oswald whitespace-nowrap text-[20px] font-normal leading-7 text-[#ef6f2e]">
                    {item}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Development */}
        <section
          className="scroll-mt-[58px] px-[14px] pt-0"
          data-age-anchor={age.hash}
        >
          <div className="relative mb-8 h-14 w-full">
            <div className="absolute left-0 top-0 h-14 w-7">
              <img alt="?" className="absolute inset-0 size-full max-w-none" src={img} />
            </div>
            <p className="font-oswald absolute left-[45px] top-0 text-[26px] font-semibold uppercase leading-8 tracking-[-0.26px] text-[#dedddc] whitespace-nowrap">
              как происходит
            </p>
            <p className="font-oswald absolute left-[159px] top-8 text-[20px] font-medium uppercase leading-6 tracking-[-0.4px] text-[#dedddc] whitespace-nowrap">
              развитие ребенка
            </p>
          </div>

          <div className="mb-4 flex w-full items-center justify-between">
            {ageGroups.map((group, index) => {
              const active = index === activeAge
              return (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => setActiveAge(index)}
                  className={cn(
                    'shrink-0 rounded-2xl px-3 py-2 transition-colors',
                    active ? 'bg-[#ef6f2e]' : 'bg-[#26211e]',
                  )}
                >
                  <span
                    className={cn(
                      'font-oswald text-[20px] font-medium uppercase leading-6 tracking-[-0.4px] whitespace-nowrap',
                      active ? 'text-[#26211e]' : 'text-[#dedddc]',
                    )}
                  >
                    {group.tab}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="flex w-full flex-col items-start">
            <div className="h-[200px] w-full overflow-hidden rounded-tl-2xl rounded-tr-2xl">
              <img alt="" className="size-full object-cover" src={age.image} />
            </div>
            <div className="flex w-full flex-col gap-4 overflow-clip rounded-bl-2xl rounded-br-2xl bg-[#26211e] px-4 py-6">
              <p className="font-oswald text-[20px] font-medium uppercase leading-6 tracking-[-0.4px] text-[#ef6f2e] whitespace-nowrap">
                {age.focus}
              </p>
              <div className="flex w-full flex-col gap-2">
                <p className="font-oswald text-[20px] font-normal leading-5 text-[#dedddc]">Цель:</p>
                <p className="font-['Inter:Regular'] text-[14px] leading-[18px] text-[#dedddc] not-italic">
                  {age.goal}
                </p>
              </div>
              <div className="flex w-full flex-col gap-2">
                <p className="font-oswald text-[20px] font-normal leading-5 text-[#dedddc]">Результат:</p>
                <p className="font-['Inter:Regular'] text-[14px] leading-[18px] text-[#dedddc] not-italic">
                  {age.result}
                </p>
              </div>
            </div>
          </div>
        </section>

        <CitiesMarquee className="mt-24 mb-6" />

        {/* Trial CTA — mobile Figma */}
        <section className="px-[14px]">
          <div className="relative flex w-full flex-col items-start gap-8 overflow-hidden rounded-2xl bg-[#ef6f2e] px-4 py-6">
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
              href={pageContactHref(CONTACT_ANCHORS.classesTrialMobile)}
              className="w-full"
            />
          </div>
        </section>

        {/* Note — 88px below trial CTA; no dark full-bleed wrap in Figma */}
        <section className="mt-[88px] px-[14px] pb-10">
          <p className="font-oswald mb-6 w-full text-[26px] font-semibold uppercase leading-8 tracking-[-0.52px] text-[#dedddc]">
            <span className="text-[#ef6f2e]">!</span> Каждая тренировка является частью общей программы
            развития
          </p>
          <p className="mb-8 font-['Inter:Regular'] text-[14px] leading-[18px] text-[#dedddc] not-italic">
            Если ребёнок пропускает занятие, ему важно восстановить пропущенный материал, чтобы
            продолжать двигаться вместе со своей группой. Поэтому ученики могут посещать аналогичные
            занятия в других группах своего возраста для закрепления и повторения материала.
          </p>
          <div className="h-[184px] w-full overflow-hidden rounded-2xl">
            <img alt="" className="size-full object-cover" src={assets.note} />
          </div>
        </section>

        <div id="contact" className="scroll-mt-[58px]">
          <ContactForm />
        </div>
        <Footer />
      </div>

      {/* —— Desktop absolute layout —— */}
      <div className="relative hidden min-h-[8135px] w-[1440px] md:block">
        {/* Hero — same full-bleed shell as /tariffs and /blog so CTA left aligns */}
        <TasaiWatermark
          className="top-[287px] z-0 h-[210px]"
          textClassName="tracking-[-3.58px] text-[rgba(38,33,30,0.17)]"
        />

        <div className="absolute top-[80px] left-1/2 h-[649px] w-[1440px] -translate-x-1/2 overflow-hidden">
          <p className="absolute top-[146px] left-[48px] z-10 w-[891px] font-['Oswald:Medium'] text-[64px] font-medium leading-[72px] uppercase">
            <span className="text-[#dedddc]">Ребёнок</span>
            <span className="text-[#dedddc]"> не «ходит на карате»,</span>
            <span className="text-[#ef6f2e]"> он «учится карате»</span>
          </p>

          <p className="absolute top-[316px] left-[48px] z-10 w-[664px] font-['Oswald:Regular'] text-[40px] font-normal leading-[40px] text-[#dedddc]">
            Мы строим обучение как долгосрочный образовательный процесс, где каждый новый этап опирается на предыдущий.
          </p>

          <CtaButton
            label="Записаться на пробное занятие"
            href={pageContactHref(CONTACT_ANCHORS.classesHeroDesktop)}
            className="absolute top-[372px] left-[841px] z-10 w-[551px]"
          />
        </div>

        <PatternMarquee
          className="absolute top-[606px] z-0"
          primarySrc={assets.heroPattern}
          flipY={false}
        />

        {/* Methodology — 59px below ornament (hero 80 + pattern 526 + h 132 + 59 = 797) */}
        <div className="absolute top-[797px] left-0 z-10 h-[857px] w-[1440px] overflow-visible">
          <img
            alt=""
            aria-hidden
            className="absolute top-0 left-[48px] h-[140px] w-[48px] object-contain object-top"
            src="/assets/exclamation.svg"
          />
          <p className="absolute top-[1px] left-[125px] w-[335px] font-['Oswald:SemiBold'] text-[92px] font-semibold leading-[72px] tracking-[-0.92px] uppercase text-[#dedddc]">
            Основы
          </p>
          <p className="absolute top-[89px] left-[125px] w-[461px] font-['Oswald:Medium'] text-[64px] font-medium leading-[72px] tracking-[-1.92px] uppercase text-[#dedddc]">
            нашей методики
          </p>

          <MethodCard
            className="absolute top-[233px] left-[49px] flex h-[242px] w-[436px] flex-col gap-[32px] rounded-[24px] bg-[#26211e] px-[24px] pt-[32px] pb-[64px]"
            title="Возрастные группы"
            text="Дети занимаются среди сверстников своего возраста и уровня развития."
          />
          <MethodCard
            className="absolute top-[233px] left-[501px] flex h-[242px] w-[438px] flex-col gap-[32px] rounded-[24px] bg-[#26211e] px-[24px] pt-[32px] pb-[64px]"
            title="Постепенное усложнение"
            text="Новые навыки добавляются по мере готовности ребёнка."
          />
          {/* Right photo — stretch to viewport right edge */}
          <div
            className="absolute top-[109px] left-[955px] h-[366px] overflow-hidden rounded-l-[32px]"
            style={{ width: 'calc(50vw - 235px)' }}
          >
            <img alt="" className="absolute inset-0 size-full max-w-none object-cover" src={assets.methodLandscape} />
          </div>

          {/* Left photo — stretch to viewport left edge (inner edge stays at x=486) */}
          <div
            className="absolute top-[491px] h-[366px] overflow-hidden rounded-r-[32px]"
            style={{ left: 'calc(720px - 50vw)', width: 'calc(50vw - 234px)' }}
          >
            <img
              alt=""
              className="absolute inset-0 size-full max-w-none object-cover object-[50%_20%]"
              src={assets.methodPortrait}
            />
          </div>
          <MethodCard
            className="absolute top-[491px] left-[501px] flex h-[242px] w-[437px] flex-col gap-[32px] rounded-[24px] bg-[#26211e] px-[24px] pt-[32px] pb-[64px]"
            title="Регулярная практика"
            text="Стабильные занятия помогают формировать уверенность и дисциплину."
          />
          <MethodCard
            className="absolute top-[491px] left-[954px] flex h-[242px] w-[438px] flex-col gap-[32px] rounded-[24px] bg-[#26211e] px-[24px] py-[32px]"
            title="Последовательная программа"
            text="Каждая тренировка — часть общей системы обучения."
          />
        </div>

        {/* Skills ribbon — 64px above (after methodology) and 64px below (to heading) */}
        <div className="absolute top-[1718px] left-0 z-10 h-[232px] w-[1440px] overflow-hidden full-bleed">
          <img alt="" className="absolute top-[-14px] left-0 h-[260px] w-full max-w-none object-cover" src={assets.skillsBg} />
          <div className="cities-marquee absolute inset-0 flex items-center font-['Oswald:Regular'] text-[40px] font-normal uppercase leading-[40px] text-[#ef6f2e]">
            <div className="cities-marquee__group flex items-center gap-[32px] pr-[32px]">
              {skills.map((item) => (
                <span key={item} className="flex items-center gap-[16px]">
                  <span className="relative block h-[40px] w-[16px] shrink-0">
                    <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgFrame3364242} />
                  </span>
                  <span className="whitespace-nowrap">{item}</span>
                </span>
              ))}
            </div>
            <div className="cities-marquee__group flex items-center gap-[32px] pr-[32px]" aria-hidden>
              {skills.map((item) => (
                <span key={`d-${item}`} className="flex items-center gap-[16px]">
                  <span className="relative block h-[40px] w-[16px] shrink-0">
                    <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgFrame3364242} />
                  </span>
                  <span className="whitespace-nowrap">{item}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute top-[1872px] left-0 z-10 h-[2775px] w-[1440px]">
          <div className="absolute top-[142px] left-[48px] h-[161px] w-[777px]">
            <div className="absolute top-0 left-0 h-[161px] w-[81px]">
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={img} />
            </div>
            <p className="absolute top-0 left-[96px] w-[681px] text-right font-['Oswald:SemiBold'] text-[92px] font-semibold leading-[72px] tracking-[-0.92px] uppercase text-[#dedddc]">
              как происходит
            </p>
            <p className="absolute top-[89px] left-[96px] w-[474px] text-right font-['Oswald:Medium'] text-[64px] font-medium leading-[72px] tracking-[-1.92px] uppercase text-[#dedddc]">
              развитие ребенка
            </p>
          </div>

          {ageGroups.map((group) => (
            <AgeBlock
              key={group.id}
              hash={group.hash}
              top={group.top}
              barWidth={group.barWidth}
              age={group.age}
              focus={group.focusDesktop}
              image={group.image}
              imageTop={group.imageTop}
              goalTop={group.goalTop}
              resultTop={group.resultTop}
              goal={group.goal}
              result={group.result}
            />
          ))}
        </div>

        <div className="absolute top-[4650px] left-0 z-10 h-[1078px] w-[1441px]">
          <div className="absolute top-[104px] left-[48px] h-[656px] w-[1344px] overflow-clip rounded-[24px] bg-[#ef6f2e]">
            <div className="absolute top-0 left-0 h-[234px] w-[1344px]">
              <img alt="" className="absolute inset-0 block size-full max-w-none " src={img1} />
            </div>
            <p className="absolute top-[106px] left-[114px] w-[550px] font-['Oswald:Medium'] text-[64px] font-medium leading-[100px] uppercase text-[#dedddc]">
              <span className="font-['Oswald:SemiBold'] text-[92px] font-semibold">Пробное</span>
              {'  '}
              <span className="font-['Oswald:SemiBold'] text-[92px] font-semibold">бесплатное</span>
              {' '}
              <span className="font-['Oswald:SemiBold'] text-[92px] font-semibold">занятие</span>
            </p>
            <div className="absolute top-[100px] left-[664px] h-[312px] w-[567px]">
              <div className="absolute top-0 left-[16px] flex w-[551px] items-start gap-[16px]">
                <div className="relative h-[40px] w-[16px] shrink-0">
                  <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgFrame3364242} />
                </div>
                <p className="min-w-px flex-1 font-['Oswald:Medium'] text-[40px] font-medium leading-[40px] text-[#26211e]">
                  за <span className="font-['Oswald:Bold'] font-bold">60 минут</span> поможем наладить контакт ребёнка с
                  инструктором и покажем, что каратэ это очень интересно и весело
                </p>
              </div>
              <div className="absolute top-[184px] left-[16px] flex w-[551px] items-start gap-[16px]">
                <div className="relative h-[40px] w-[16px] shrink-0">
                  <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgFrame3364242} />
                </div>
                <p className="min-w-px flex-1 font-['Oswald:Medium'] text-[40px] font-medium leading-[40px] text-[#26211e]">
                  необходима только спортивная форма, в которой ходите на физкультуру и водичка
                </p>
              </div>
            </div>
            <CtaButton
              variant="dark"
              label="Записаться на бесплатное пробное занятие"
              href={pageContactHref(CONTACT_ANCHORS.classesTrialDesktop)}
              className="absolute top-[488px] left-[114px] w-[1117px]"
            />
          </div>

          <div className="absolute top-[864px] left-[-60px] h-[110px] w-[1812px] overflow-clip full-bleed">
            <div className="cities-marquee absolute inset-y-0 left-0 font-['Oswald:SemiBold'] text-[64px] font-semibold uppercase leading-[100px] tracking-[-0.64px] text-[#ef6f2e]">
              <div className="cities-marquee__group">
                <span className="px-6">Минск</span>
                <span aria-hidden> • </span>
                <span className="px-6">Жодино</span>
                <span aria-hidden> • </span>
                <span className="px-6">Борисов</span>
                <span aria-hidden> • </span>
                <span className="px-6">Смолевичи</span>
                <span aria-hidden> • </span>
                <span className="px-6">Слуцк</span>
                <span aria-hidden> • </span>
              </div>
              <div className="cities-marquee__group" aria-hidden>
                <span className="px-6">Минск</span>
                <span aria-hidden> • </span>
                <span className="px-6">Жодино</span>
                <span aria-hidden> • </span>
                <span className="px-6">Борисов</span>
                <span aria-hidden> • </span>
                <span className="px-6">Смолевичи</span>
                <span aria-hidden> • </span>
                <span className="px-6">Слуцк</span>
                <span aria-hidden> • </span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-[5832px] left-0 z-10 flex w-[1440px] items-center gap-[16px] bg-[#26211e] px-[48px] py-[64px] full-bleed-bg">
          <div className="flex w-[664px] shrink-0 flex-col gap-[64px] py-[32px] pr-[16px]">
            <div className="flex flex-col gap-[32px]">
              <p className="font-['Oswald:Medium'] text-[60px] font-medium leading-[72px] tracking-[-1.8px] uppercase text-[#dedddc]">
                <span className="text-[#ef6f2e]">!</span> Каждая тренировка является частью
                <br />
                общей программы развития
              </p>
              <p className="font-['Inter:Regular'] text-[20px] leading-[24px] text-[#dedddc] not-italic">
                Если ребёнок пропускает занятие, ему важно восстановить пропущенный материал, чтобы продолжать двигаться
                вместе со своей группой. Поэтому ученики могут посещать аналогичные занятия в других группах своего возраста
                для закрепления и повторения материала.
              </p>
            </div>
          </div>
          <div className="relative min-h-[352px] min-w-0 flex-1 self-stretch overflow-hidden rounded-[24px]">
            <img alt="" className="absolute inset-0 size-full max-w-none object-cover" src={assets.note} />
          </div>
        </div>

        <div id="contact" className="absolute top-[6392px] left-0 z-10 scroll-mt-[80px]">
          <ContactForm />
        </div>

        <Footer className="full-bleed-bg absolute top-[7290px] left-0 z-10 h-[845px] w-[1440px] overflow-clip rounded-tl-[24px] rounded-tr-[24px] bg-[#26211e]" />
      </div>
    </div>
  )
}
