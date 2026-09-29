import {
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'

import {
  img,
  img1,
  imgFrame3364242,
} from '../assets/images'
import { ContactForm } from '../components/ContactForm'
import { CtaButton } from '../components/CtaButton'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { PatternMarquee } from '../components/PatternMarquee'
import { OrnamentStripMarquee } from '../components/OrnamentStripMarquee'
import { TasaiWatermark } from '../components/TasaiWatermark'
import { CONTACT_ANCHORS, pageContactHref } from '../lib/contactAnchors'
import { cn } from '../lib/utils'

const imgArrowWhite = '/assets/imgFrame3364167.svg'

const about = {
  intro: '/assets/about/intro-photo.png',
  gallery1: '/assets/about/gallery-1.png',
  gallery2: '/assets/about/gallery-2.png',
  gallery3: '/assets/about/gallery-3.png',
  characterBanner: '/assets/about/frame-3364316.png',
  artem: '/assets/about/artem-circle.png',
  history2007: '/assets/about/history-2007.png',
  history2012: '/assets/about/history-2012.png',
  history2023: '/assets/about/history-2023.png',
  heroPattern: '/assets/about/hero-pattern.svg',
  frame3364272: '/assets/about/frame-3364272.svg',
  quoteMark: '/assets/about/quote-mark.svg',
} as const

const HISTORY_QUOTE_2007 =
  'Тогда кёкусинкай в\u00A0Минске практически не\u00A0было: пара инструкторов, занятия в\u00A0подвалах и\u00A0спортзалах.'

const HISTORY_QUOTE_2012 =
  'Это не\u00A0просто слово — это философия: охватить максимум, но\u00A0изучить каждое направление досконально.'

const HISTORY_BODY_2007 =
  'Артём родом из\u00A0Бреста. Карате начал там\u00A0— прошёл путь от\u00A0новичка до\u00A0коричневого пояса под\u00A0руководством своего наставника Алехновича Дмитрия Эдуардовича\u00A0— 7\u00A0Дан кёкусинкай, 2\u00A0Дан джиу-джитсу, руководителя Белорусской Федерации Кёкусинкай Будо Карате. Артём считает его\u00A0вторым отцом, который воспитал в\u00A0нём\u00A0лидерские качества, целеустремлённость и\u00A0справедливость. В\u00A020\u00A0лет\u00A0переехал в\u00A0Минск\u00A0— и\u00A0уже\u00A0через\u00A0несколько месяцев, 3\u00A0октября 2007\u00A0года, открыл первый\u00A0зал.'

const HISTORY_BODY_2012 =
  'К\u00A02012\u00A0году из\u00A0учеников выросли инструкторы. Артём предложил лучшим из\u00A0них\u00A0стать тренерами\u00A0— и\u00A0клуб начал расти. В\u00A0том\u00A0же\u00A0году зарегистрировали молодёжное общественное объединение и\u00A0выбрали название. Тасай\u00A0— в\u00A0переводе с\u00A0японского «многогранность», «универсальность».'

const HISTORY_BODY_2023 =
  'В\u00A02010 году — первый дан. В\u00A02018 — второй. В\u00A02023 Артём защитил третий дан и\u00A0сегодня является членом президиума Белорусской Федерации Кёкусинкай Будо Карате. За\u00A0эти годы — работа с\u00A0управлениями образования, благотворительные мастер-классы в\u00A0детских домах. Тасай сегодня — это не\u00A0просто клуб. Это система воспитания, которую строили 17\u00A0лет.'

const PRINCIPLES = [
  {
    title: 'Наши тренеры — ваши наставники',
    text: 'Наш инструктор не только ставит технику. Он видит ребёнка целиком — его характер, слабые стороны, точки роста. И работает с этим на каждой тренировке.',
    h: 132,
  },
  {
    title: 'Гармония важнее медалей',
    text: 'Мы не гонимся за кубками. Наш результат — ребёнок, который уважает себя и других, умеет справляться с трудностями и готов к реальной жизни.',
    h: 132,
  },
  {
    title: 'Воспитание через действие',
    text: 'Мы создаём среду, где ребёнок сам приходит к ценностям дисциплины и уважения через тренировки, трудности и маленькие победы каждый день. А чтобы эти ценности закрепились, проводим лекции и семинары для детей, где объясняем их смысл.',
    h: 168,
  },
  {
    title: 'Родитель — часть процесса',
    text: 'Воспитание не заканчивается у дверей зала. Мы держим родителей в контакте с тем, что происходит с ребёнком, и помогаем продолжать эту работу дома.',
    h: 132,
  },
] as const

/** Figma iPhone 16-3 tops relative to content root (frame Y − 58 header). */
const M = {
  hero: 0,
  intro: 532,
  banner: 1166,
  quote0: 1228,
  quote1: 1582,
  gallery: 1782,
  principles: 1974,
  trial: 2852,
  cities: 3124,
  founder: 3300,
  hist0: 3474,
  hist1: 3584,
  hist2: 3732,
  certs: 4532,
  contact: 4980,
  footer: 5580,
} as const

function PrincipleCard({
  title,
  text,
  className,
}: {
  title: string
  text: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'relative flex flex-col content-stretch items-stretch gap-[24px] rounded-[24px] border-2 border-solid border-[#ef6f2e] px-[40px] py-[24px]',
        className,
      )}
    >
      <p className="relative w-full shrink-0 font-['Oswald:Regular'] text-[40px] font-normal leading-[40px] text-[#ef6f2e]">
        {title}
      </p>
      <p className="relative w-full shrink-0 whitespace-pre-line font-['Inter:Regular'] text-[20px] font-normal leading-[24px] text-[#dedddc] not-italic">
        {text}
      </p>
    </div>
  )
}

function QuoteColumn({
  title,
  children,
  className,
  contentClassName,
}: {
  title: string
  children: ReactNode
  className?: string
  contentClassName?: string
}) {
  return (
    <div className={cn('relative flex content-stretch items-start gap-[16px]', className)}>
      <div className="relative h-[40px] w-[16px] shrink-0">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgFrame3364242} />
      </div>
      <div
        className={cn(
          'relative flex min-w-px flex-[1_0_0] flex-col content-stretch items-stretch gap-[32px]',
          contentClassName,
        )}
      >
        <p className="w-full font-['Oswald:Regular'] text-[20px] font-normal leading-6 text-[#dedddc] md:text-[40px] md:leading-[44px]">
          {title}
        </p>
        <div className="flex w-full flex-col gap-1 font-['Inter:Regular'] text-[14px] font-normal leading-[18px] text-[#dedddc] not-italic md:text-[20px] md:leading-6">
          {children}
        </div>
      </div>
    </div>
  )
}

function HistoryQuote({ text }: { text: string }) {
  return (
    <div className="relative flex w-full flex-col content-stretch items-start gap-2">
      <div className="relative size-[39px] shrink-0 overflow-clip md:size-[39px]">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={about.quoteMark} />
      </div>
      <p className="w-full font-['Oswald:Regular'] text-[20px] font-normal leading-6 text-[#dedddc] md:text-[40px] md:leading-10">
        {text}
      </p>
    </div>
  )
}

// CertsCarousel / MobileCertsSwipe — archived (only used on this page).
// Full code: src/pages/_AboutUsCerts.archived.txt

export function AboutUsPage() {
  const [openQuotes, setOpenQuotes] = useState<[boolean, boolean]>([true, false])
  const [openHistory, setOpenHistory] = useState(2)
  const historyStackRef = useRef<HTMLDivElement>(null)
  const [historyStackMeasuredH, setHistoryStackMeasuredH] = useState(0)
  const quote0Ref = useRef<HTMLElement>(null)
  const quote1Ref = useRef<HTMLElement>(null)
  const [quoteHeights, setQuoteHeights] = useState<[number, number]>([132, 132])

  const quotes = [
    {
      title:
        'Детская психология говорит однозначно: ребёнок усваивает не то, что ему говорят, а то, что он переживает сам.',
      body: [
        'Именно поэтому карате работает там, где не работают разговоры и наказания. В Тасай мы создаём управляемую среду трудностей. Ребёнок падает — и встаёт. Проигрывает — и пробует снова. Не слушается — и чувствует последствия. Всё это происходит под наблюдением наставника, который видит не только технику, но и характер.',
      ],
      closedH: 132,
    },
    {
      title: 'Родители часто спрашивают: почему дома не слушается, а в зале — другой человек?',
      body: [
        'Потому что в зале есть структура, авторитет и понятные правила. Мы не подавляем ребёнка — мы даём ему рамку, внутри которой он чувствует себя в безопасности и начинает расти.',
        'Но самое важное — этот рост не заканчивается у дверей зала. Дисциплина, уважение и ответственность, которые ребёнок получает на тренировке, переходят домой. Именно поэтому мы работаем не только с детьми — но и с родителями. Вместе мы создаём единую среду воспитания, где зал и семья говорят на одном языке.',
      ],
      closedH: 132,
    },
  ] as const

  const history = [
    {
      year: '2007',
      title: 'первый зал',
      body: HISTORY_BODY_2007,
      quote: HISTORY_QUOTE_2007,
      image: about.history2007,
      collapsedH: 86,
    },
    {
      year: '2012',
      title: 'рождение клуба тасай',
      body: HISTORY_BODY_2012,
      quote: HISTORY_QUOTE_2012,
      image: about.history2012,
      collapsedH: 124,
    },
    {
      year: '2023',
      title: 'третий дан\nи новый этап',
      body: HISTORY_BODY_2023,
      quote: HISTORY_QUOTE_2007,
      image: about.history2023,
      collapsedH: 124,
    },
  ] as const

  const historyHeightsFallback = history.map((item) => item.collapsedH)
  const historyStackFallbackH =
    historyHeightsFallback.reduce((sum, h) => sum + h, 0) + 24 * (history.length - 1)
  const historyStackH = historyStackMeasuredH || historyStackFallbackH

  // Quotes → gallery → principles → trial… cascade with content (no fixed-gap holes)
  const quoteGap = 24
  const quoteTops = [M.quote0, M.quote0 + quoteHeights[0] + quoteGap] as const
  const quotesBottom = quoteTops[1] + quoteHeights[1]
  const galleryTop = quotesBottom + 64
  const principlesTop = galleryTop + 148 + 64
  const principlesH = 814
  const trialTop = principlesTop + principlesH + 64
  const citiesTop = trialTop + 248 + 24
  const founderOrnamentTop = citiesTop + 96
  const founderTop = citiesTop + 176
  const hist0Top = founderTop + 174
  const contactTop = hist0Top + historyStackH + 64
  const footerTop = contactTop + 640
  const mobilePageH = footerTop + 645

  useLayoutEffect(() => {
    const el = historyStackRef.current
    if (!el) return
    const update = () => {
      const next = el.offsetHeight
      setHistoryStackMeasuredH((prev) => (prev === next ? prev : next))
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [openHistory])

  useLayoutEffect(() => {
    const nodes = [quote0Ref.current, quote1Ref.current]
    const update = () => {
      const next: [number, number] = [
        nodes[0]?.offsetHeight || 132,
        nodes[1]?.offsetHeight || 132,
      ]
      setQuoteHeights((prev) =>
        prev[0] === next[0] && prev[1] === next[1] ? prev : next,
      )
    }
    update()
    const ro = new ResizeObserver(update)
    nodes.forEach((n) => n && ro.observe(n))
    return () => ro.disconnect()
  }, [openQuotes])

  return (
    <div
      className="relative w-full overflow-x-clip bg-[#3a3330] max-md:min-h-0 md:mx-auto md:min-h-[9184px] md:w-[1440px]"
      data-node-id="516:2270"
      data-name="About_us_2"
    >
      <Header className="full-bleed-sticky sticky top-0 z-50 flex h-[58px] w-full content-stretch items-center justify-between bg-[rgba(38,33,30,0.55)] px-[14px] backdrop-blur-[8px] transition-colors hover:bg-[#26211e] md:h-[80px] md:px-[48px]" />

      {/* —— Mobile absolute (iPhone 16-3 / 659:4515, 393×6284) —— */}
      <div className="relative w-full overflow-x-clip md:hidden" style={{ height: mobilePageH }}>
        {/* Hero — Figma 659:4643 */}
        <section className="absolute left-0 top-0 h-[444px] w-full overflow-x-clip overflow-y-visible">
          <TasaiWatermark
            className="top-[78px] h-[100px]"
            textClassName="text-[96px] tracking-[-1.92px] text-[rgba(38,33,30,0.17)]"
            gapClassName="gap-16"
          />
          <h1 className="font-oswald absolute left-3 top-16 w-[calc(100%-24px)] text-[30px] font-semibold uppercase leading-9 tracking-[-0.3px]">
            <span className="text-[#ef6f2e]">Тасай</span>
            <span className="text-[#ef6f2e]"> — это больше </span>
            <span className="text-[#ef6f2e]">чем секция карате</span>
          </h1>
          <p className="font-oswald absolute left-3 top-40 w-[calc(100%-24px)] text-[30px] font-semibold uppercase leading-9 tracking-[-0.3px] text-[#dedddc]">
            Это система воспитания, в которой участвуют{' '}
            <span className="text-[#ef6f2e]">тренер, ребенок и семья</span>
          </p>
          <CtaButton
            size="sm"
            label="записаться на пробное занятие"
            href={pageContactHref(CONTACT_ANCHORS.aboutHeroMobile)}
            className="absolute left-[14px] top-[332px] z-10 w-[calc(100%-28px)]"
          />
          {/* Diamond ornament under CTA — scrolls left like ТАСАЙ */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[360px] z-0 h-[120px] w-[150vw] -translate-x-1/2 overflow-hidden"
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
        </section>

        {/* Intro — Figma 659:4651 */}
        <section className="absolute left-0 top-[532px] h-[632px] w-full bg-[#26211e]">
          <div className="absolute left-[14px] top-[-88px] z-10 h-[228px] w-[calc(100%-28px)] overflow-hidden rounded-2xl">
            <img
              alt=""
              className="absolute inset-0 size-full object-cover"
              src="/assets/about/intro-photo-mobile.png"
            />
          </div>
          <p className="font-oswald absolute left-[14px] top-[164px] w-[calc(100%-28px)] text-[20px] font-normal uppercase leading-7 text-[#dedddc]">
            Нам важно не только, как ребёнок бьёт
            <br />
            на тренировке,
            <br />
            но и как он ведёт себя дома
          </p>
          <div className="absolute left-[14px] top-[272px] flex w-[calc(100%-28px)] flex-col gap-1 font-['Inter'] text-[14px] leading-[18px] text-[#dedddc]">
            <p>
              Уважает ли старших, умеет ли держать слово
              <br />
              и справляться с трудностями. Через кёкусинкай
              <br />
              дети становятся физически крепче, эмоционально
              <br />
              устойчивее и увереннее в себе.
            </p>
            <p>
              Но мы идём дальше — работаем с родителями,
              <br />
              помогаем семье понять ребёнка и сделать
              <br />
              воспитание продолжением тренировок.
            </p>
            <p>
              Наш результат — не медали. Наш результат —
              <br />
              человек с характером, который умеет уважать
              <br />
              других, держать слово и уверенно идти по жизни.
            </p>
          </div>
          <CtaButton
            size="sm"
            label="подробнее о нас"
            href="#principles"
            className="absolute left-[14px] top-[520px] w-[calc(100%-28px)]"
          />
        </section>

        {/* Character banner — 659:4932 (ornament only, no overlay text) */}
        <div className="absolute left-0 top-[1166px] h-[116px] w-full overflow-hidden">
          <img
            alt=""
            className="absolute left-1/2 top-0 h-full w-[1018px] max-w-none -translate-x-1/2 object-cover"
            src={about.characterBanner}
          />
        </div>

        {/* Quote accordions — 659:5047 / 659:5053 */}
        {quotes.map((q, i) => {
          const open = openQuotes[i]
          return (
            <article
              key={q.title}
              ref={i === 0 ? quote0Ref : quote1Ref}
              className="absolute left-[14px] z-20 w-[calc(100%-28px)] overflow-visible rounded-2xl bg-[#26211e]"
              style={{
                top: quoteTops[i],
                ...(open ? { paddingBottom: 12 } : { height: q.closedH }),
              }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-[#26211e]">
                <button
                  type="button"
                  className="relative w-full border-0 bg-transparent px-4 py-4 text-left"
                  onClick={() =>
                    setOpenQuotes((prev) =>
                      i === 0 ? [!prev[0], prev[1]] : [prev[0], !prev[1]],
                    )
                  }
                >
                  <p className="font-oswald w-full text-[20px] font-normal uppercase leading-7 text-[#dedddc]">
                    {q.title}
                  </p>
                  {open ? (
                    <div className="mt-4 flex flex-col gap-1 pr-2 font-['Inter'] text-[14px] leading-[18px] text-[#dedddc]">
                      {q.body.map((paragraph) => (
                        <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                      ))}
                    </div>
                  ) : null}
                </button>
              </div>
              <button
                type="button"
                aria-expanded={open}
                aria-label={open ? 'Свернуть' : 'Развернуть'}
                className={cn(
                  'absolute right-4 z-10 flex size-10 items-center justify-center rounded-full',
                  i === 0 ? 'bottom-[-20px]' : 'bottom-[-12px]',
                  open ? 'bg-[#ef6f2e]' : 'bg-[#dedddc]',
                )}
                onClick={() =>
                  setOpenQuotes((prev) =>
                    i === 0 ? [!prev[0], prev[1]] : [prev[0], !prev[1]],
                  )
                }
              >
                <span
                  className={cn(
                    'relative block size-6 brightness-0 transition-transform',
                    open ? '-rotate-90' : 'rotate-90',
                  )}
                >
                  <img alt="" className="absolute inset-0 size-full max-w-none" src={imgArrowWhite} />
                </span>
              </button>
            </article>
          )
        })}

        {/* Gallery — 64px below quotes, infinite marquee */}
        <div
          className="absolute left-0 z-10 h-[148px] w-full overflow-hidden"
          style={{ top: galleryTop }}
        >
          <div className="certs-marquee-x h-[148px] items-center">
            {[0, 1].map((group) => (
              <div
                key={group}
                className="flex h-full shrink-0 items-center gap-2 pr-2"
                aria-hidden={group === 1 || undefined}
              >
                {[about.gallery1, about.gallery2, about.gallery3].map((src, i) => (
                  <div
                    key={`${group}-${src}`}
                    className="h-[148px] w-[235px] shrink-0 overflow-hidden rounded-2xl"
                  >
                    <img
                      alt={group === 0 ? `Фото ${i + 1}` : ''}
                      className="pointer-events-none size-full object-cover"
                      src={src}
                      draggable={false}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Principles — 64px below gallery */}
        <section
          id="principles"
          className="absolute left-0 h-[814px] w-full scroll-mt-[58px] overflow-hidden bg-[#26211e]"
          style={{ top: principlesTop }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 h-[102px] w-full overflow-hidden"
          >
            <OrnamentStripMarquee
              height={102}
              unitHeight={132}
              stripWidth={1441}
              src={about.heroPattern}
            />
          </div>
          <div className="absolute left-4 top-16 h-14 w-7">
            <img alt="" className="absolute inset-0 size-full max-w-none" src={img} />
          </div>
          <p className="font-oswald absolute left-[61px] top-16 w-[238px] text-[26px] font-semibold uppercase leading-8 tracking-[-0.26px] text-[#dedddc]">
            На какие принципы
          </p>
          <p className="font-oswald absolute left-[250px] top-24 w-[129px] text-right text-[20px] font-medium uppercase leading-6 tracking-[-0.4px] text-[#dedddc]">
            мы опираемся
          </p>
          <div className="absolute left-[14px] top-[144px] flex w-[calc(100%-28px)] flex-col gap-2">
            {PRINCIPLES.map((p) => (
              <div
                key={p.title}
                className="flex w-full flex-col gap-3 overflow-hidden rounded-2xl border-2 border-solid border-[#ef6f2e] px-4 py-3"
                style={{ height: p.h }}
              >
                <p className="font-oswald text-[20px] font-normal leading-5 text-[#ef6f2e]">{p.title}</p>
                <p className="font-['Inter'] whitespace-pre-line text-[14px] leading-[18px] text-[#dedddc]">{p.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Trial CTA — 659:5062 */}
        <div
          className="absolute left-[14px] h-[248px] w-[calc(100%-28px)] overflow-hidden rounded-2xl bg-[#ef6f2e]"
          style={{ top: trialTop }}
        >
          <p
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 font-oswald text-[50px] font-semibold uppercase leading-none text-[#292420]/[0.07] [writing-mode:vertical-rl] "
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
            href={pageContactHref(CONTACT_ANCHORS.aboutTrialMobile)}
            className="absolute inset-x-4 top-[176px] z-[1]"
          />
        </div>

        {/* Cities — y=3182 */}
        <div className="absolute left-0 h-8 w-full overflow-hidden" style={{ top: citiesTop }}>
          <div className="cities-marquee font-oswald text-[26px] font-semibold uppercase leading-8 tracking-[-0.26px] text-[#ef6f2e]">
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

        {/* Frame 3364272 — scrolls left like ТАСАЙ */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 w-full overflow-hidden"
          style={{ top: founderOrnamentTop }}
          data-name="Frame 3364272"
        >
          <OrnamentStripMarquee
            height={56}
            stripWidth={466}
            src={about.frame3364272}
          />
        </div>
        <div
          className="absolute left-[14px] h-[142px] w-[112px] overflow-hidden rounded-full"
          style={{ top: founderTop }}
        >
          <img alt="" className="size-full object-cover" src="/assets/about/artem-mobile.png" />
        </div>
        <p
          className="font-oswald absolute left-[142px] h-16 w-[237px] text-[26px] font-semibold uppercase leading-8 tracking-[-0.26px] text-[#dedddc]"
          style={{ top: founderTop }}
        >
          История создания
          <br />
          Тасай
        </p>
        <p
          className="font-oswald absolute left-[142px] h-12 w-[237px] text-[20px] font-medium uppercase leading-6 tracking-[-0.4px] text-[#ef6f2e]"
          style={{ top: founderTop + 76 }}
        >
          <span className="normal-case">от</span> Артёма Михайловича
          <br />
          Бортника
        </p>
        <p
          className="absolute left-[142px] h-[18px] w-[237px] font-['Inter'] text-[14px] font-normal leading-[18px] text-[#dedddc]"
          style={{ top: founderTop + 124 }}
        >
          сенсей каратэ-клуба Тасай, 3 дан
        </p>

        {/* History accordion — stacked flow, lower items push down */}
        <div
          ref={historyStackRef}
          className="absolute left-0 z-10 flex w-full flex-col gap-6"
          style={{ top: hist0Top }}
        >
          {history.map((item, i) => {
            const open = openHistory === i
            return (
              <div
                key={item.year}
                className={cn(
                  'relative w-full overflow-visible bg-[#26211e]',
                  open && 'pb-6',
                )}
                style={open ? undefined : { height: item.collapsedH }}
              >
                <div className="relative overflow-hidden bg-[#26211e]">
                  <button
                    type="button"
                    className="relative flex min-h-[86px] w-full items-start border-0 bg-transparent px-6 py-6 text-left"
                    onClick={() => setOpenHistory(open ? -1 : i)}
                  >
                    <p className="font-oswald min-w-0 w-full text-[30px] font-semibold uppercase leading-[38px] text-[#dedddc]">
                      {item.year} —{' '}
                      <span className="whitespace-pre-line text-[#ef6f2e]">{item.title}</span>
                    </p>
                  </button>
                  {open ? (
                    <div className="px-6 pb-6">
                      {item.body ? (
                        <p className="mb-10 font-['Inter'] text-[14px] leading-[18px] text-[#dedddc]">{item.body}</p>
                      ) : null}
                      <HistoryQuote text={item.quote} />
                      <div className="mt-6 h-[148px] w-full overflow-hidden rounded-2xl">
                        <img
                          alt=""
                          className="size-full object-cover"
                          src={i === 2 ? '/assets/about/history-2023-mobile.png' : item.image}
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-label={open ? 'Свернуть' : 'Развернуть'}
                  className={cn(
                    'absolute right-[14px] bottom-[-12px] z-10 flex size-10 items-center justify-center rounded-full',
                    open ? 'bg-[#ef6f2e]' : 'bg-[#dedddc]',
                  )}
                  onClick={() => setOpenHistory(open ? -1 : i)}
                >
                  <span
                    className={cn(
                      'relative block size-6 brightness-0 transition-transform',
                      open ? '-rotate-90' : 'rotate-90',
                    )}
                  >
                    <img alt="" className="absolute inset-0 size-full max-w-none" src={imgArrowWhite} />
                  </span>
                </button>
              </div>
            )
          })}
        </div>

        <div
          id="contact"
          className="absolute left-0 w-full scroll-mt-[58px]"
          style={{ top: contactTop }}
        >
          <ContactForm />
        </div>
        <div className="absolute left-0 w-full" style={{ top: footerTop }}>
          <Footer />
        </div>
      </div>

      {/* —— Desktop absolute layout —— */}
      <div className="relative hidden min-h-[9184px] w-[1440px] md:block">
      {/* Hero — same full-bleed shell as /tariffs and /blog so CTA / marquees align */}
      <TasaiWatermark
        className="top-[287px] z-0 h-[210px]"
        textClassName="tracking-[-3.58px] text-[rgba(38,33,30,0.17)]"
      />

      <div className="absolute top-[80px] left-1/2 h-[649px] w-[1440px] -translate-x-1/2 overflow-hidden">
        {/* Hero title — was 214 from page; 214-80 */}
        <p className="absolute top-[134px] left-[48px] z-10 w-[1146px] font-['Oswald:Medium'] text-[64px] font-medium leading-[72px] tracking-[-1.92px] uppercase text-[#ef6f2e]">
          Тасай — это больше чем секция карате
        </p>

        {/* Hero subtitle — #516:2750 */}
        <p className="absolute top-[225px] left-[48px] z-10 w-[777px] font-['Oswald:Medium'] text-[64px] font-medium leading-[72px] tracking-[-1.92px] uppercase text-[#dedddc]">
          Это система воспитания,
          <br />
          в которой участвуют
          <br />
          <span className="text-[#ef6f2e]">тренер, ребенок и семья</span>
        </p>

        {/* CTA — same left/top as /tariffs and /blog */}
        <CtaButton
          label="Записаться на пробное занятие"
          href={pageContactHref(CONTACT_ANCHORS.aboutHeroDesktop)}
          className="absolute top-[372px] left-[841px] z-10 w-[551px]"
        />
      </div>

      <PatternMarquee
        className="absolute top-[606px] z-0"
        primarySrc={about.heroPattern}
        flipY={false}
      />

      {/* Intro photo — 59px below ornament (hero 80 + pattern 526 + h 132 + 59 = 797) */}
      <div className="absolute top-[797px] left-[48px] h-[486px] w-[660px] overflow-hidden rounded-[24px]">
        <img alt="" className="absolute inset-0 size-full max-w-none object-cover" src={about.intro} />
      </div>

      {/* Intro copy — #516:2779 */}
      <div className="absolute top-[839px] left-[733px] flex w-[656px] flex-col gap-[24px] pl-[32px]">
        <p className="w-full font-['Oswald:Regular'] text-[40px] font-normal leading-[40px] text-[#dedddc]">
          Нам важно не только, как ребёнок бьёт на тренировке, но и как он ведёт себя дома
        </p>
        <p className="w-full font-['Inter:Regular'] text-[20px] leading-[24px] text-[#dedddc] not-italic">
          Уважает ли старших, умеет ли держать слово и справляться с трудностями.
          Через кёкусинкай дети становятся физически крепче, эмоционально устойчивее и увереннее в себе.
        </p>
        <p className="w-[551px] font-['Inter:Regular'] text-[20px] leading-[24px] text-[#dedddc] not-italic">
          Но мы идём дальше — работаем с родителями, помогаем семье понять ребёнка и сделать воспитание продолжением тренировок.
        </p>
        <p className="w-full font-['Inter:Regular'] text-[20px] leading-[24px] text-[#dedddc] not-italic">
          Наш результат — не медали. Наш результат — человек с характером, который умеет уважать других, держать слово и уверенно идти по жизни.
        </p>
      </div>

      {/* Character banner — Frame 3364316 ornament */}
      <div className="absolute top-[1385px] left-0 h-[232px] w-[1440px] overflow-hidden bg-[#3a3330] full-bleed">
        <img
          alt=""
          className="absolute inset-0 size-full max-w-none object-cover"
          src={about.characterBanner}
        />
      </div>
      <p className="absolute top-[1429px] left-[48px] w-[1344px] text-center font-['Oswald:Medium'] text-[60px] font-medium leading-[72px] tracking-[-1.8px] uppercase text-[#ef6f2e]">
        Характер не воспитывается словами. Он формируется через опыт.
      </p>

      {/* Philosophy — #516:2827 / #516:2834 */}
      <QuoteColumn
        className="absolute top-[1749px] left-[48px]"
        contentClassName="w-[631px] flex-none"
        title="Детская психология говорит однозначно: ребёнок усваивает не то, что ему говорят, а то, что он переживает сам."
      >
        <p>
          Именно поэтому карате работает там, где не работают разговоры и наказания.
          В Тасай мы создаём управляемую среду трудностей. Ребёнок падает — и встаёт. Проигрывает — и пробует снова. Не слушается — и чувствует последствия. Всё это происходит под наблюдением наставника, который видит не только технику, но и характер.
        </p>
      </QuoteColumn>

      <QuoteColumn
        className="absolute top-[1749px] left-[727px] w-[665px]"
        title="Родители часто спрашивают: почему дома не слушается, а в зале — другой человек?"
      >
        <p>
          Потому что в зале есть структура, авторитет и понятные правила. Мы не подавляем ребёнка — мы даём ему рамку, внутри которой он чувствует себя в безопасности и начинает расти.
        </p>
        <p>
          Но самое важное — этот рост не заканчивается у дверей зала. Дисциплина, уважение и ответственность, которые ребёнок получает на тренировке, переходят домой. Именно поэтому мы работаем не только с детьми — но и с родителями. Вместе мы создаём единую среду воспитания, где зал и семья говорят на одном языке.
        </p>
      </QuoteColumn>

      {/* Gallery — #516:2842 */}
      <div className="absolute top-[2288px] left-[-137px] h-[344px] w-[1713px] overflow-hidden">
        <div className="cities-marquee absolute top-0 left-0">
          {[0, 1].map((groupIndex) => (
            <div
              key={groupIndex}
              className="cities-marquee__group gap-[24px] pr-[24px] whitespace-normal"
              aria-hidden={groupIndex === 1}
            >
              {[about.gallery1, about.gallery2, about.gallery3].map((imageSrc, index) => (
                <div key={`${groupIndex}-${index}`} className="relative h-[344px] w-[551px] shrink-0 overflow-hidden rounded-[24px]">
                  <img alt="" className="absolute inset-0 size-full max-w-none object-cover" src={imageSrc} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Principles — #516:2271 */}
      <div className="absolute top-[2733px] left-0 h-[853px] w-[1440px] bg-[#26211e] full-bleed-bg" data-node-id="516:2271">
        <div className="absolute top-[104px] left-[46px] h-[161px] w-[81px]">
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={img} />
        </div>
        <p className="absolute top-[108px] left-[143px] w-[840px] font-['Oswald:SemiBold'] text-[92px] font-semibold leading-[72px] tracking-[-0.92px] uppercase text-[#dedddc]">
          На какие принципы
        </p>
        <p className="absolute top-[197px] left-[143px] w-[405px] font-['Oswald:Medium'] text-[64px] font-medium leading-[72px] tracking-[-1.92px] uppercase text-[#dedddc]">
          мы опираемся
        </p>

        <PrincipleCard
          className="absolute top-[341px] left-[48px] w-[664px]"
          title="Наши тренеры — ваши наставники"
          text="Наш инструктор не только ставит технику. Он видит ребёнка целиком — его характер, слабые стороны, точки роста. И работает с этим на каждой тренировке."
        />
        <PrincipleCard
          className="absolute top-[341px] left-[728px] w-[664px]"
          title="Гармония важнее медалей"
          text="Мы не гонимся за кубками. Наш результат — ребёнок, который уважает себя и других, умеет справляться с трудностями и готов к реальной жизни."
        />
        <PrincipleCard
          className="absolute top-[541px] left-[48px] w-[777px]"
          title="Воспитание через действие"
          text="Мы создаём среду, где ребёнок сам приходит к ценностям дисциплины и уважения через тренировки, трудности и маленькие победы каждый день. А чтобы эти ценности закрепились, проводим лекции и семинары для детей, где объясняем их смысл."
        />
        <PrincipleCard
          className="absolute top-[541px] left-[841px] w-[551px]"
          title="Родитель — часть процесса"
          text="Воспитание не заканчивается у дверей зала. Мы держим родителей в контакте с тем, что происходит с ребёнком, и помогаем продолжать эту работу дома."
        />
      </div>

      {/* Free trial CTA — same as Halls desktop */}
      <div
        className="absolute top-[3730px] left-[48px] h-[600px] w-[1344px] overflow-clip rounded-[24px] bg-[#ef6f2e]"
        data-node-id="516:2843"
      >
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
          href={pageContactHref(CONTACT_ANCHORS.aboutTrialDesktop)}
          className="absolute top-[432px] left-[114px] w-[1117px]"
        />
      </div>

      {/* History — #516:2787 */}
      <div className="absolute top-[4474px] left-0 h-[2768px] w-[1440px]" data-node-id="516:2787">
        <div className="absolute top-[117px] left-[48px] size-[258px] overflow-hidden rounded-full">
          <img alt="" className="absolute inset-0 size-full max-w-none object-cover" src={about.artem} />
        </div>
        <p className="absolute top-[144px] left-[338px] w-[1049px] font-['Oswald:SemiBold'] text-[92px] font-semibold leading-[72px] tracking-[-0.92px] uppercase text-[#dedddc]">
          История создания Тасай
        </p>
        <p className="absolute top-[246px] left-[338px] w-[914px] font-['Oswald:Medium'] text-[64px] font-medium leading-[72px] tracking-[-1.92px] text-[#ef6f2e]">
          <span className="lowercase">от </span>
          Артёма Михайловича Бортника
        </p>
        <p className="absolute top-[326px] left-[338px] w-[499px] font-['Oswald:Regular'] text-[40px] font-normal leading-[40px] text-[#dedddc]">
          сенсей каратэ-клуба Тасай, 3 дан
        </p>

        {/* 2007 — #516:2791 */}
        <div className="absolute top-[470px] left-0 flex w-[1440px] items-center gap-[16px] bg-[#26211e] px-[48px] py-[64px] full-bleed-bg">
          <div className="flex w-[664px] shrink-0 flex-col gap-[64px] py-[32px] pr-[16px]">
            <div className="flex w-full flex-col gap-[32px]">
              <p className="font-['Oswald:Medium'] text-[60px] font-medium leading-[72px] tracking-[-1.8px] uppercase text-[#dedddc]">
                2007 — <span className="text-[#ef6f2e]">Первый зал</span>
              </p>
              <div className="flex flex-col gap-[16px] font-['Inter:Regular'] text-[20px] leading-[24px] text-[#dedddc] not-italic">
                <p>
                Артём родом из Бреста. Карате начал там — прошёл путь <br /> от новичка до коричневого пояса под руководством 
                своего <br /> наставника Алехновича Дмитрия Эдуардовича —  <br />7 Дан кёкусинкай, 2 Дан джиу-джитсу,
                руководителя <br /> Белорусской Федерации Кёкусинкай Будо Карате.
                </p>
                <p>
                  Артём считает его вторым отцом, который воспитал
                  <br />
                  в{'\u00A0'}нём лидерские качества, целеустремлённость
                  <br />
                  и{'\u00A0'}справедливость. В{'\u00A0'}20 лет переехал в{'\u00A0'}Минск —
                  <br />
                  и{'\u00A0'}уже через несколько месяцев, 3{'\u00A0'}октября 2007 года, открыл
                  <br />
                  первый зал.
                </p>
              </div>
            </div>
            <HistoryQuote text={HISTORY_QUOTE_2007} />
          </div>
          <div className="relative min-h-[662px] min-w-0 flex-1 overflow-hidden rounded-[24px] self-stretch">
            <img alt="" className="absolute inset-0 size-full max-w-none object-cover" src={about.history2007} />
          </div>
        </div>

        {/* 2012 — #516:2814 */}
        <div className="absolute top-[1324px] left-[48px] flex w-[1344px] items-center gap-[16px]">
          <div className="flex w-[664px] shrink-0 flex-col gap-10 py-[32px] pr-[16px]">
            <div className="flex w-full flex-col gap-8">
              <p className="font-['Oswald:Medium'] text-[60px] font-medium leading-[72px] tracking-[-1.8px] uppercase text-[#dedddc]">
                2012 —
                <br />
                <span className="text-[#ef6f2e]">Рождение клуба Тасай</span>
              </p>
              <p className="font-['Inter:Regular'] text-[20px] leading-[24px] text-[#dedddc] not-italic">
                {HISTORY_BODY_2012}
              </p>
            </div>
            <HistoryQuote text={HISTORY_QUOTE_2012} />
          </div>
          <div className="relative min-h-[564px] min-w-0 flex-1 self-stretch overflow-hidden rounded-[24px]">
            <img alt="" className="absolute inset-0 size-full max-w-none object-cover" src={about.history2012} />
          </div>
        </div>

        {/* 2023 — #516:2803 */}
        <div className="absolute top-[1952px] left-0 flex w-[1440px] items-center gap-[16px] bg-[#26211e] px-[48px] py-[64px] full-bleed-bg">
          <div className="flex w-[664px] shrink-0 flex-col gap-[64px] py-[32px] pr-[16px]">
            <div className="flex w-full flex-col gap-[32px]">
              <p className="font-['Oswald:Medium'] text-[60px] font-medium leading-[72px] tracking-[-1.8px] uppercase text-[#dedddc]">
                2023 —
                <br />
                <span className="text-[#ef6f2e]">
                  Третий дан
                  <br />
                  и новый этап
                </span>
              </p>
              <p className="font-['Inter:Regular'] text-[20px] leading-[24px] text-[#dedddc] not-italic">
                В{'\u00A0'}2010 году — первый дан. В{'\u00A0'}2018 — второй. В{'\u00A0'}2023 Артём
                <br />
                защитил третий дан и{'\u00A0'}сегодня является членом президиума
                <br />
                Белорусской Федерации Кёкусинкай Будо Карате. За{'\u00A0'}эти годы —
                <br />
                работа с{'\u00A0'}управлениями образования, благотворительные
                <br />
                мастер-классы в{'\u00A0'}детских домах. Тасай сегодня — это не{'\u00A0'}просто
                <br />
                клуб. Это система воспитания, которую строили 17{'\u00A0'}лет.
              </p>
            </div>
            <HistoryQuote text={HISTORY_QUOTE_2007} />
          </div>
          <div className="relative min-h-[622px] min-w-0 flex-1 self-stretch overflow-hidden rounded-[24px]">
            <img alt="" className="absolute inset-0 size-full max-w-none object-cover object-top" src={about.history2023} />
          </div>
        </div>
      </div>

      <div id="contact" className="absolute top-[7441px] left-0 scroll-mt-[80px]">
        <ContactForm />
      </div>

      <Footer className="full-bleed-bg absolute top-[8339px] left-0 h-[845px] w-[1440px] overflow-clip rounded-tl-[24px] rounded-tr-[24px] bg-[#26211e]" />
      </div>
    </div>
  )
}
