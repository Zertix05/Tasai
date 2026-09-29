import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react'

import {
  img,
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
import { SOCIAL_LINKS } from '../lib/links'
import { cn } from '../lib/utils'

const blogAssets = {
  trianglesB: '/assets/blog/triangles-b.svg',
  heroKid: '/assets/blog/gallery-opt/hero-kid.jpg',
  heroParent: '/assets/blog/gallery-opt/hero-parent.jpg',
  problem1: '/assets/blog/gallery-opt/hero-parent.jpg',
  problem2: '/assets/blog/gallery-opt/hero-kid.jpg',
  problem3: '/assets/blog/problems/frame-3364468.jpg',
  problem4: '/assets/blog/problems/frame-3364469.jpg',
  controlA: '/assets/blog/control-a.png',
  controlB: '/assets/blog/gallery-opt/control-b.jpg',
  gallery1B: '/assets/blog/gallery-opt/gallery-1b.jpg',
  gallery2B: '/assets/blog/gallery-opt/gallery-2b.jpg',
  gallery3B: '/assets/blog/gallery-opt/gallery-3b.jpg',
  gallery4B: '/assets/blog/gallery-opt/gallery-4b.jpg',
  gallery5B: '/assets/blog/gallery-opt/gallery-5b.jpg',
  gallery6B: '/assets/blog/gallery-opt/gallery-6b.jpg',
  frame4174: '/assets/blog/gallery-opt/imgFrame3364174.jpg',
  frame4178: '/assets/blog/gallery-opt/imgFrame3364178.jpg',
  frame4179: '/assets/blog/gallery-opt/imgFrame3364179.jpg',
  frame4180: '/assets/blog/gallery-opt/imgFrame3364180.jpg',
  frame4252: '/assets/blog/gallery-opt/imgFrame3364252.jpg',
  rectangle4: '/assets/blog/gallery-opt/imgRectangle4.jpg',
  dotMuted: '/assets/blog/dot-muted.svg',
  ctaPattern: '/assets/blog/cta-pattern.svg',
} as const

const gallerySlides = [
  [
    blogAssets.gallery1B,
    blogAssets.gallery2B,
    blogAssets.gallery3B,
    blogAssets.gallery4B,
    blogAssets.gallery5B,
    blogAssets.gallery6B,
  ],
  [
    blogAssets.frame4174,
    blogAssets.frame4178,
    blogAssets.frame4179,
    blogAssets.frame4180,
    blogAssets.frame4252,
    blogAssets.rectangle4,
  ],
  [
    blogAssets.heroKid,
    blogAssets.controlB,
    blogAssets.gallery2B,
    blogAssets.gallery5B,
    blogAssets.gallery1B,
    blogAssets.gallery3B,
  ],
  [
    blogAssets.frame4178,
    blogAssets.gallery4B,
    blogAssets.frame4180,
    blogAssets.gallery6B,
    blogAssets.frame4174,
    blogAssets.gallery2B,
  ],
  [
    blogAssets.gallery3B,
    blogAssets.frame4252,
    blogAssets.gallery5B,
    blogAssets.rectangle4,
    blogAssets.gallery1B,
    blogAssets.frame4179,
  ],
  [
    blogAssets.controlB,
    blogAssets.gallery6B,
    blogAssets.heroParent,
    blogAssets.gallery2B,
    blogAssets.gallery4B,
    blogAssets.frame4174,
  ],
  [
    blogAssets.gallery5B,
    blogAssets.gallery1B,
    blogAssets.frame4178,
    blogAssets.gallery3B,
    blogAssets.frame4180,
    blogAssets.gallery6B,
  ],
  [
    blogAssets.rectangle4,
    blogAssets.gallery2B,
    blogAssets.gallery4B,
    blogAssets.heroKid,
    blogAssets.gallery5B,
    blogAssets.frame4252,
  ],
] as const

const galleryImageUrls = [...new Set(gallerySlides.flat())]

function ProblemCard({
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
  if (compact) {
    return (
      <div className={className}>
        <p className="font-['Oswald:Regular'] text-[20px] leading-5 text-[#ef6f2e]">{title}</p>
        <p className="font-['Inter:Regular'] text-[14px] leading-[18px] text-[#dedddc] not-italic">{text}</p>
      </div>
    )
  }

  return (
    <div className={className}>
      <div className="flex w-full items-start gap-[16px]">
        <div className="relative h-[40px] w-[16px] shrink-0">
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgFrame3364242} />
        </div>
        <p className="min-w-px flex-1 font-['Oswald:Regular'] text-[40px] leading-[40px] text-[#ef6f2e]">
          {title}
        </p>
      </div>
      <div className="flex w-full items-center justify-center pl-[32px]">
        <p className="min-w-px flex-1 font-['Inter:Regular'] text-[20px] leading-[24px] text-[#dedddc] not-italic">
          {text}
        </p>
      </div>
    </div>
  )
}

function RequirementItem({
  title,
  text,
  compact,
}: {
  title: string
  text: string
  compact?: boolean
}) {
  if (compact) {
    return (
      <div className="flex w-full flex-col items-start gap-2">
        <div className="flex w-full items-start gap-2">
          <div className="relative h-5 w-2 shrink-0">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgFrame3364242} />
          </div>
          <p className="min-w-px flex-1 font-['Oswald:Regular'] text-[20px] leading-5 text-[#dedddc]">
            {title}
          </p>
        </div>
        <div className="flex w-full items-center pl-4">
          <p className="min-w-px flex-1 font-['Inter:Regular'] text-[14px] leading-[18px] text-[#dedddc] not-italic">
            {text}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col items-start gap-[16px]">
      <div className="flex w-full items-start gap-[16px]">
        <div className="relative h-[40px] w-[16px] shrink-0">
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgFrame3364242} />
        </div>
        <p className="min-w-px flex-1 font-['Oswald:Regular'] text-[40px] leading-[40px] text-[#dedddc]">
          {title}
        </p>
      </div>
      <div className="flex w-full items-center pl-[32px]">
        <p className="min-w-px flex-1 font-['Inter:Regular'] text-[20px] leading-[24px] text-[#dedddc] not-italic">
          {text}
        </p>
      </div>
    </div>
  )
}

const articles = [
  {
    title: 'Три шага, чтобы всё поменять',
    text: 'Если сын спросит, как изменить жизнь к лучшему — начни с трёх действий: отрезать лишнее, делать только то, что ведёт к цели, и держать фокус на главном. Переломный момент не приходит сам — его создаёшь ты.',
  },
  {
    title: 'Зеркало реальности',
    text: 'Когда усилия есть, а результат уходит «в тартарары», попробуй приём «Зеркало реальности»: уже сегодня проживай состояние того себя, который добился цели — и реальность начнёт подстраиваться.',
  },
  {
    title: 'Переходный возраст: поддерживать, а не воспитывать',
    text: 'В 12–17 лет ребёнок пробует жизнь «на вкус» — как пластилин. Здесь важнее поддержка и доверие, чем нравоучения. Задайте себе вопрос: я хочу быть счастливым родителем или правым?',
  },
  {
    title: 'Воспитание без суеты: от общего к частному',
    text: 'До 18 лет ответственность за ребёнка на вас. Выберите 4–5 обязательных качеств личности — школа, спорт, английский, плавание — а таланты раскрывайте мягче. Главное — баланс, а не кружки с утра до вечера.',
  },
] as const

function ArticleCard({
  title,
  text,
  compact,
}: {
  title: string
  text: string
  compact?: boolean
}) {
  if (compact) {
    return (
      <div
        data-article
        className="relative flex h-full w-[365px] shrink-0 flex-col items-start gap-3 rounded-2xl border-2 border-[#ef6f2e] px-4 py-4"
      >
        <p className="font-['Oswald:Regular'] text-[20px] leading-5 text-[#dedddc]">{title}</p>
        <p className="font-['Inter:Regular'] flex-1 text-[14px] leading-[18px] text-[#dedddc] not-italic">
          {text}
        </p>
        <CtaButton
          size="sm"
          label="подробнее"
          href={SOCIAL_LINKS.telegramChannel}
          className="mt-auto w-full"
        />
      </div>
    )
  }

  return (
    <div
      data-article
      className="relative flex w-full shrink-0 snap-start flex-col gap-[48px] overflow-hidden rounded-[24px] border-2 border-[#ef6f2e] p-[48px]"
    >
      <p className="font-['Oswald:Regular'] line-clamp-2 w-full shrink-0 text-[40px] leading-[44px] text-[#dedddc]">
        {title}
      </p>
      <div className="flex w-full items-end justify-end gap-[64px]">
        <div className="min-w-0 flex-1 overflow-clip">
          <p className="line-clamp-4 w-full font-['Inter:Regular'] text-[20px] leading-[24px] text-[#dedddc] not-italic">
            {text}
          </p>
        </div>
        <span className="shrink-0" onPointerDown={(event) => event.stopPropagation()}>
          <CtaButton
            label="подробнее"
            href={SOCIAL_LINKS.telegramChannel}
            className="w-auto shrink-0"
          />
        </span>
      </div>
    </div>
  )
}

/** Одна карточка на весь 1440-холст, следующая не выглядывает */
const ARTICLE_VIEWPORT = 1440
const ARTICLE_GAP = 0
const ARTICLE_CARD_WIDTH = ARTICLE_VIEWPORT

function ArticlesFeed() {
  const [active, setActive] = useState(0)
  const [cardHeight, setCardHeight] = useState<number>()
  const firstCardRef = useRef<HTMLDivElement>(null)
  const drag = useRef<{ id: number; x: number; moved: boolean } | null>(null)
  const dotsCount = articles.length
  const step = ARTICLE_CARD_WIDTH + ARTICLE_GAP

  useLayoutEffect(() => {
    const el = firstCardRef.current
    if (!el) return
    const sync = () => {
      const h = Math.ceil(el.getBoundingClientRect().height)
      if (h > 0) setCardHeight(h)
    }
    sync()
    void document.fonts?.ready.then(sync)
  }, [])

  const goTo = (index: number) => {
    if (index < 0 || index >= articles.length) return
    setActive(index)
  }

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return
    drag.current = { id: event.pointerId, x: event.clientX, moved: false }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current || drag.current.id !== event.pointerId) return
    if (Math.abs(event.clientX - drag.current.x) > 8) {
      drag.current.moved = true
    }
  }

  const finishDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current || drag.current.id !== event.pointerId) return
    const delta = event.clientX - drag.current.x
    const didSwipe = drag.current.moved && Math.abs(delta) > 48
    drag.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    if (!didSwipe) return
    if (delta < 0) goTo(active + 1)
    else goTo(active - 1)
  }

  return (
    <div
      className="absolute top-[510px] left-0 flex w-[1440px] cursor-grab touch-pan-y select-none flex-col overflow-hidden pb-[104px] active:cursor-grabbing"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={finishDrag}
      onPointerCancel={finishDrag}
      role="region"
      aria-roledescription="carousel"
      aria-label="Статьи"
    >
      <div className="overflow-hidden">
        <div
          className="flex w-max items-stretch transition-transform duration-300 ease-out"
          style={{
            gap: ARTICLE_GAP,
            transform: `translateX(-${active * step}px)`,
          }}
        >
          {articles.map((article, index) => (
            <div
              key={article.title}
              ref={index === 0 ? firstCardRef : undefined}
              data-article-column
              className="shrink-0"
              style={{
                width: ARTICLE_CARD_WIDTH,
                ...(cardHeight && cardHeight > 0 ? { height: cardHeight } : {}),
              }}
              aria-hidden={index !== active}
            >
              <ArticleCard {...article} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-[8px]">
        {Array.from({ length: dotsCount }, (_, index) => {
          const isActive = index === active
          const canNavigate = index < articles.length
          return (
            <button
              key={index}
              type="button"
              aria-label={canNavigate ? `Группа статей ${index + 1}` : undefined}
              aria-current={isActive || undefined}
              aria-hidden={!canNavigate}
              tabIndex={canNavigate ? 0 : -1}
              disabled={!canNavigate}
              onClick={() => goTo(index)}
              onPointerDown={(event) => event.stopPropagation()}
              className={cn(
                'relative z-10 rounded-full transition-all duration-300 disabled:cursor-default',
                isActive ? 'h-[16px] w-[32px] bg-[#ef6f2e]' : 'h-[16px] w-[16px] bg-[#dedddc]',
              )}
            />
          )
        })}
      </div>
    </div>
  )
}

function PhotoGallery() {
  const CARD = 481
  const GAP = 16
  const STEP = CARD + GAP
  const PX_PER_SEC = 40
  const topPhotos = gallerySlides.map((slide) => slide[0])
  const bottomPhotos = gallerySlides.flatMap((slide) => [slide[1], slide[2]])

  useEffect(() => {
    for (const url of galleryImageUrls) {
      const img = new Image()
      img.decoding = 'async'
      img.src = url
    }
  }, [])

  const renderStrip = (
    photos: readonly string[],
    keyPrefix: string,
    { offsetX = 0 }: { offsetX?: number } = {},
  ) => {
    const durationSec = (photos.length * STEP) / PX_PER_SEC
    return (
      <div style={offsetX ? { transform: `translateX(${offsetX}px)` } : undefined}>
        <div className="cities-marquee" style={{ animationDuration: `${durationSec}s` }}>
          {[0, 1].map((copy) => (
            <div
              key={`${keyPrefix}-${copy}`}
              className="flex shrink-0 gap-4 pe-4"
              aria-hidden={copy === 1}
            >
              {photos.map((src, index) => (
                <div
                  key={`${keyPrefix}-${copy}-${index}`}
                  className="h-[332px] w-[481px] shrink-0 overflow-hidden rounded-[24px] bg-[#26211e]"
                >
                  <img
                    alt=""
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
    )
  }

  return (
    <div
      className="absolute top-[4473px] left-1/2 z-10 flex h-[784px] w-[1440px] -translate-x-1/2 flex-col gap-4 overflow-hidden pt-[104px] full-bleed"
      role="region"
      aria-label="Фотогалерея"
    >
      <div className="relative h-[332px] w-full overflow-hidden">{renderStrip(topPhotos, 'desk-top')}</div>
      <div className="relative h-[332px] w-full overflow-hidden">
        {renderStrip(bottomPhotos, 'desk-bottom', {
          offsetX: -Math.round(STEP / 2),
        })}
      </div>
    </div>
  )
}

/** Mobile: two looping rows in chessboard stagger */
function MobilePhotoGallery() {
  const CARD = 272
  const GAP = 8
  const STEP = CARD + GAP
  const PX_PER_SEC = 40
  const topPhotos = gallerySlides.map((slide) => slide[0])
  const bottomPhotos = gallerySlides.flatMap((slide) => [slide[1], slide[2]])

  const renderStrip = (
    photos: readonly string[],
    keyPrefix: string,
    { offsetX = 0 }: { offsetX?: number } = {},
  ) => {
    const durationSec = (photos.length * STEP) / PX_PER_SEC
    return (
      <div style={offsetX ? { transform: `translateX(${offsetX}px)` } : undefined}>
        <div className="cities-marquee" style={{ animationDuration: `${durationSec}s` }}>
          {[0, 1].map((copy) => (
            <div
              key={`${keyPrefix}-${copy}`}
              className="flex shrink-0 gap-2 pe-2"
              aria-hidden={copy === 1}
            >
              {photos.map((src, index) => (
                <div
                  key={`${keyPrefix}-${copy}-${index}`}
                  className="h-[188px] w-[272px] shrink-0 overflow-hidden rounded-2xl bg-[#26211e]"
                >
                  <img
                    alt=""
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
    )
  }

  return (
    <div
      className="mb-8 flex w-full flex-col gap-2 overflow-hidden pb-4 pt-4"
      role="region"
      aria-label="Фотогалерея"
    >
      <div className="relative h-[188px] w-full overflow-hidden">
        {renderStrip(topPhotos, 'top')}
      </div>
      <div className="relative h-[188px] w-full overflow-hidden">
        {renderStrip(bottomPhotos, 'bottom', {
          offsetX: -Math.round(STEP / 2),
        })}
      </div>
    </div>
  )
}

const problemCards = [
  {
    title: 'Ребенок боится идти в школу?',
    text: 'Научим защищать свои границы и чувствовать уверенность рядом со сверстниками',
    photo: blogAssets.problem1,
  },
  {
    title: 'Гаджеты заменили реальную жизнь?',
    text: 'Дадим крутую альтернативу экранам в\u00a0кругу верных друзей',
    photo: blogAssets.problem2,
  },
  {
    title: 'Ребенок не может постоять за себя?',
    text: 'Обучим навыкам антибуллинга и\u00a0самообороны',
    photo: blogAssets.problem3,
  },
  {
    title: 'Проблемы с\u00a0осанкой или\u00a0часто болеете?',
    text: 'Укрепим мышечный корсет и\u00a0иммунитет',
    photo: blogAssets.problem4,
  },
] as const

/** Mobile: photo (card-sized) + card below; start shows first pair with left inset */
function ProblemsSwipe() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const drag = useRef<{
    id: number
    x: number
    y: number
    left: number
    axis: 'x' | 'y' | null
  } | null>(null)
  const colW = 272
  const gap = 8
  const step = colW + gap

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    // Touch: native overflow handles both axes. Mouse: custom drag.
    if (e.pointerType !== 'mouse' || e.button !== 0) return
    const el = scrollerRef.current
    if (!el) return
    drag.current = {
      id: e.pointerId,
      x: e.clientX,
      y: e.clientY,
      left: el.scrollLeft,
      axis: null,
    }
    el.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current
    const d = drag.current
    if (!el || !d || d.id !== e.pointerId) return
    const dx = e.clientX - d.x
    const dy = e.clientY - d.y
    if (!d.axis) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return
      d.axis = Math.abs(dx) >= Math.abs(dy) ? 'x' : 'y'
      if (d.axis === 'y') {
        drag.current = null
        try {
          el.releasePointerCapture(e.pointerId)
        } catch {
          /* already released */
        }
        return
      }
    }
    if (d.axis === 'x') {
      el.scrollLeft = d.left - dx
    }
  }

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current
    const d = drag.current
    if (!el || !d || d.id !== e.pointerId) return
    const wasHorizontal = d.axis === 'x'
    drag.current = null
    try {
      el.releasePointerCapture(e.pointerId)
    } catch {
      /* already released */
    }
    if (!wasHorizontal) return
    const next = Math.round(el.scrollLeft / step)
    el.scrollTo({ left: Math.max(0, next) * step, behavior: 'smooth' })
  }

  return (
    <div
      ref={scrollerRef}
      className="flex cursor-grab gap-2 overflow-x-auto overscroll-x-contain pb-8 snap-x snap-mandatory select-none active:cursor-grabbing [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      style={{ WebkitOverflowScrolling: 'touch', scrollPaddingLeft: 14 }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      {/* Left inset so first column doesn’t stick to the edge */}
      <div aria-hidden className="w-[14px] shrink-0" />
      {problemCards.map((card) => (
        <div
          key={card.title}
          className="flex w-[272px] shrink-0 snap-start flex-col gap-2"
        >
          <div className="h-[148px] w-[272px] overflow-hidden rounded-2xl">
            <img
              alt=""
              className="pointer-events-none size-full object-cover"
              src={card.photo}
              draggable={false}
            />
          </div>
          <ProblemCard
            compact
            className="flex h-[148px] w-[272px] flex-col gap-6 overflow-hidden rounded-2xl border border-[#ef6f2e] px-4 py-6"
            title={card.title}
            text={card.text}
          />
        </div>
      ))}
      {/* Right inset smaller than left */}
      <div aria-hidden className="w-2 shrink-0 snap-end" />
    </div>
  )
}

const controlPoints = [
  'Тренеры с педагогическим образованием',
  'Использование полной защитной экипировки',
  'Вход в спарринги только после освоения базовой техники',
] as const

function MobileArticlesCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const cardStep = 377 // 365px card + 12px gap

  const syncActive = () => {
    const el = scrollerRef.current
    if (!el) return
    const next = Math.round(el.scrollLeft / cardStep)
    setActive(Math.max(0, Math.min(articles.length - 1, next)))
  }

  const goTo = (index: number) => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollTo({ left: index * cardStep, behavior: 'smooth' })
    setActive(index)
  }

  return (
    <>
      <div
        ref={scrollerRef}
        onScroll={syncActive}
        className="flex items-stretch gap-3 overflow-x-auto pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ WebkitOverflowScrolling: 'touch', scrollPaddingLeft: 14, scrollPaddingRight: 14 }}
      >
        <div aria-hidden className="w-[14px] shrink-0" />
        {articles.map((article) => (
          <div key={article.title} className="flex shrink-0 snap-start">
            <ArticleCard compact {...article} />
          </div>
        ))}
        <div aria-hidden className="w-[14px] shrink-0 snap-end" />
      </div>
      <div className="mt-6 flex items-center justify-center gap-2">
        {articles.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Статья ${index + 1}`}
            aria-current={index === active}
            onClick={() => goTo(index)}
            className={cn(
              'rounded-full transition-all',
              index === active ? 'h-2 w-4 bg-[#ef6f2e]' : 'size-2 bg-[#dedddc]',
            )}
          />
        ))}
      </div>
    </>
  )
}

export function BlogPage() {
  return (
    <div
      className="relative w-full overflow-x-clip bg-[#3a3330] max-md:min-h-0 md:mx-auto md:min-h-[8203px] md:w-[1440px]"
      data-node-id="427:3885"
      data-name="Blog"
    >
      <Header className="full-bleed-sticky sticky top-0 z-50 flex h-[58px] w-full content-stretch items-center justify-between bg-[rgba(38,33,30,0.55)] px-[14px] backdrop-blur-[8px] transition-colors hover:bg-[#26211e] md:h-[80px] md:px-[48px]" />

      {/* —— Mobile flow (iPhone 16-6) —— */}
      <div className="flex flex-col md:hidden">
        <section className="relative px-[14px] pt-16">
          <TasaiWatermark
            className="top-[58px] h-[100px]"
            textClassName="text-[96px] tracking-[-1.92px] text-[rgba(38,33,30,0.17)]"
            gapClassName="gap-16"
          />
          <h1 className="font-oswald relative mb-6 w-full text-[30px] font-semibold uppercase leading-9 tracking-[-0.3px] text-[#ef6f2e]">
            Растим сильных, здоровых и уверенных детей — вместе с вами
          </h1>
          <p className="font-oswald relative mb-8 w-full text-[20px] font-medium uppercase leading-7 tracking-[-0.4px] text-[#dedddc]">
            Всё, что нужно знать, чтобы отбросить сомнения, найти ответы на сложные вопросы и быть
            спокойными за ребенка
          </p>
          <CtaButton
            size="sm"
            label="Записаться на пробное занятие"
            href={pageContactHref(CONTACT_ANCHORS.blogHeroMobile)}
            className="relative w-full"
          />
        </section>

        {/* Ornament under hero CTA — pt/pb 31px, scrolls left */}
        <OrnamentStripMarquee
          className="py-[31px]"
          maskClassName="bg-[#292420]/17"
        />

        <ProblemsSwipe />

        {/* Ornament under problem cards — #DEDDDC @ 3% */}
        <OrnamentStripMarquee maskClassName="bg-[#dedddc]/[0.03]" />

        <section className="px-[14px] pb-8 pt-8">
          <div className="relative mb-6 flex items-start justify-end gap-2">
            <div className="max-w-[337px] text-right">
              <p className="font-oswald text-[26px] font-semibold uppercase leading-8 tracking-[-0.26px] text-[#dedddc]">
                Карате — это не про драку,
              </p>
              <p className="font-oswald text-[20px] font-medium uppercase leading-6 tracking-[-0.4px] text-[#dedddc]">
                а про контроль
              </p>
            </div>
            <img
              alt=""
              aria-hidden
              className="mt-1 h-14 w-4 shrink-0 object-contain object-top"
              src="/assets/exclamation.svg"
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            {controlPoints.map((point) => (
              <div key={point} className="w-full rounded-2xl bg-[#26211e] px-4 py-4">
                <p className="font-oswald text-[20px] font-normal leading-5 text-[#dedddc]">{point}</p>
              </div>
            ))}
            <div className="w-full overflow-hidden rounded-2xl">
              <img alt="" className="block h-[200px] w-full object-cover" src={blogAssets.controlB} />
            </div>
          </div>
        </section>

        <div className="overflow-hidden py-4">
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
            </div>
            <CtaButton
              size="sm"
              variant="dark"
              label="Записаться на пробное занятие"
              href={pageContactHref(CONTACT_ANCHORS.blogTrialMobile)}
              className="w-full"
            />
          </div>
        </section>

        {/* Ornament between trial CTA and requirements — #292420 @ 17%, pt 26 / pb 64 */}
        <OrnamentStripMarquee
          className="pt-[26px] pb-16"
          maskClassName="bg-[#292420]/17"
        />

        <section className="px-[14px] pb-8">
          <div className="relative mb-6 h-14">
            <div className="absolute left-0 top-0 h-14 w-7">
              <img alt="?" className="absolute inset-0 size-full max-w-none" src={img} />
            </div>
            <p className="font-oswald absolute left-[42px] top-0 text-[26px] font-semibold uppercase leading-8 tracking-[-0.26px] text-[#dedddc]">
              Что понадобится
            </p>
            <p className="font-oswald absolute left-[142px] top-8 text-[20px] font-medium uppercase leading-6 tracking-[-0.4px] text-[#dedddc] whitespace-nowrap">
              для регулярных занятий
            </p>
          </div>
          <div className="mb-4 flex flex-col gap-6 rounded-2xl bg-[#26211e] px-4 py-6">
            <p className="font-oswald text-[20px] font-normal leading-5 text-[#ef6f2e]">
              Одежда для занятий
            </p>
            <div className="flex flex-col gap-3">
              <RequirementItem compact title="Кимоно (доги)" text="традиционная форма для занятий карате" />
              <RequirementItem
                compact
                title="Пояс"
                text="цвет пояса соответствует уровню мастерства (кю) ученика в системе иерархии киокусинкай"
              />
            </div>
          </div>
          <div className="flex flex-col gap-6 rounded-2xl bg-[#26211e] px-4 py-6">
            <p className="font-oswald text-[20px] font-normal leading-5 text-[#ef6f2e]">
              Защитная экипировка
            </p>
            <div className="flex flex-col gap-3">
              <RequirementItem
                compact
                title="Защита голени и стоп"
                text="мягкие накладки на ноги для защиты суставов и костей при ударах"
              />
              <RequirementItem
                compact
                title="Перчатки (шингарты)"
                text="специальные накладки на руки с открытыми пальцами"
              />
              <RequirementItem compact title="Шлем" text="для защиты головы во время спаррингов" />
              <RequirementItem
                compact
                title="Защита корпуса (жилет) и паха"
                text="дополнительные элементы, обеспечивающие безопасность жизненно важных зон"
              />
            </div>
          </div>
        </section>

        <MobilePhotoGallery />

        <section className="bg-[#26211e] pt-16 pb-16">
          <p className="font-oswald mb-6 px-[14px] text-[26px] font-semibold uppercase leading-8 tracking-[-0.26px] text-[#dedddc]">
            Территория осознанного воспитания
          </p>
          <CtaButton
            size="sm"
            label="перейти в TG-канал"
            href={SOCIAL_LINKS.telegramChannel}
            className="mb-6 mx-[14px] w-[calc(100%-28px)]"
          />
          <p className="mb-8 px-[14px] font-['Inter:Regular'] text-[14px] leading-[18px] text-[#dedddc] not-italic">
            Спортивные победы начинаются с правильного настроя дома, а дисциплина в зале помогает
            наладить учёбу и поведение в школе. В нашем блоге мы разбираем реальные родительские
            боли: от борьбы с экранной зависимостью до защиты от буллинга и укрепления детского
            иммунитета.
          </p>
          <MobileArticlesCarousel />
        </section>

        <div id="contact" className="scroll-mt-[58px]">
          <ContactForm />
        </div>
        <Footer />
      </div>

      {/* —— Desktop absolute layout —— */}
      <div className="relative hidden min-h-[8125px] w-[1440px] md:block">
      <TasaiWatermark
        className="top-[287px] z-0 h-[210px]"
        textClassName="tracking-[-3.58px] text-[rgba(38,33,30,0.17)]"
      />

      <div className="absolute top-[80px] left-1/2 h-[649px] w-[1440px] -translate-x-1/2 overflow-hidden">
        <p className="absolute top-[95px] left-[48px] w-[1344px] font-['Oswald:Medium'] text-[64px] font-medium leading-[72px] uppercase text-[#ef6f2e]">
          Растим сильных, здоровых и уверенных детей — вместе с вами
        </p>
        <p className="absolute top-[318px] left-[48px] w-[664px] font-['Oswald:Regular'] text-[40px] leading-[40px] text-[#dedddc]">
          Всё, что нужно знать, чтобы отбросить сомнения, найти ответы на сложные вопросы и быть спокойными за ребенка
        </p>
        <CtaButton
          label="Записаться на пробное занятие"
          href={pageContactHref(CONTACT_ANCHORS.blogHeroDesktop)}
          className="absolute top-[372px] left-[841px] z-10 w-[551px]"
        />
      </div>

      <PatternMarquee
        className="absolute top-[606px] z-0"
        secondarySrc={blogAssets.trianglesB}
      />

      {/* Problems — Figma #427:3927 Frame 3364385 (1802×708 at x:-181). BG full-bleed; content stays fixed. */}
      <div
        className="pointer-events-none absolute top-[813px] left-0 h-[708px] w-[1440px] bg-[#292420] full-bleed-bg"
        aria-hidden
      />
      <div className="absolute top-[813px] left-[-181px] z-10 h-[708px] w-[1802px]" data-node-id="427:3927">
        <ProblemCard
          className="absolute top-[104px] left-[682px] flex h-[242px] w-[438px] flex-col items-start gap-[32px] rounded-[24px] border-2 border-[#ef6f2e] px-[24px] pt-[32px] pb-[64px]"
          title="Ребенок боится идти в школу?"
          text="Научим защищать свои границы и чувствовать уверенность рядом со сверстниками"
        />
        <ProblemCard
          className="absolute top-[362px] left-[229px] flex h-[242px] w-[438px] flex-col items-start gap-[32px] rounded-[24px] border-2 border-[#ef6f2e] px-[24px] pt-[32px] pb-[64px]"
          title="Гаджеты заменили реальную жизнь?"
          text={'Дадим крутую альтернативу экранам в\u00a0кругу верных друзей'}
        />
        <ProblemCard
          className="absolute top-[362px] left-[683px] flex h-[242px] w-[437px] flex-col items-start gap-[32px] rounded-[24px] border-2 border-[#ef6f2e] px-[24px] pt-[32px] pb-[64px]"
          title="Ребенок не может постоять за себя?"
          text={'Обучим навыкам антибуллинга и\u00a0самообороны'}
        />
        <ProblemCard
          className="absolute top-[104px] left-[1136px] flex h-[242px] w-[437px] flex-col items-start gap-[32px] rounded-[24px] border-2 border-[#ef6f2e] px-[24px] pt-[32px] pb-[64px]"
          title={'Проблемы с\u00a0осанкой или\u00a0часто болеете?'}
          text={'Укрепим мышечный корсет и\u00a0иммунитет'}
        />
        <div className="absolute top-[-39px] left-0 h-[385px] w-[666px] rounded-[32px]">
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[32px]">
            <img alt="" className="absolute inset-0 size-full max-w-none object-cover" src={blogAssets.problem3} />
          </div>
        </div>
        <div className="absolute top-[362px] left-[1136px] h-[411px] w-[666px] rounded-[32px]">
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[32px]">
            <img alt="" className="absolute inset-0 size-full max-w-none object-cover" src={blogAssets.problem4} />
          </div>
        </div>
      </div>

      <div className="absolute top-[1625px] left-1/2 h-[889px] w-[1440px] -translate-x-1/2">
        <p className="absolute top-[106px] right-[168px] text-right font-['Oswald:Medium'] text-[64px] font-medium leading-[72px] tracking-[-1.92px] uppercase whitespace-nowrap text-[#dedddc]">
          Карате — это не про драку,
        </p>
        <p className="absolute top-[195px] right-[168px] text-right font-['Oswald:SemiBold'] text-[92px] font-semibold leading-[72px] tracking-[-0.92px] uppercase whitespace-nowrap text-[#dedddc]">
          а про контроль
        </p>
        <span className="absolute top-[112px] right-[48px] font-['Oswald:SemiBold'] text-[140px] font-semibold leading-none text-[#ef6f2e]">
          !
        </span>
        <div className="absolute right-[728px] bottom-[408px] flex w-[664px] flex-col items-start rounded-[24px] bg-[#26211e] px-[36px] pt-[24px] pb-[32px]">
          <p className="w-full font-['Oswald:Regular'] text-[40px] leading-[40px] text-[#dedddc]">Тренеры с педагогическим образованием</p>
        </div>
        <div className="absolute right-[728px] bottom-[256px] flex w-[664px] flex-col items-start rounded-[24px] bg-[#26211e] px-[36px] pt-[24px] pb-[32px]">
          <p className="w-full font-['Oswald:Regular'] text-[40px] leading-[40px] text-[#dedddc]">Использование полной защитной экипировки</p>
        </div>
        <div className="absolute right-[728px] bottom-[104px] flex w-[664px] flex-col items-start rounded-[24px] bg-[#26211e] px-[36px] pt-[24px] pb-[32px]">
          <p className="w-full font-['Oswald:Regular'] text-[40px] leading-[40px] text-[#dedddc]">Вход в спарринги только после освоения базовой техники</p>
        </div>
        <div className="absolute top-[345px] left-[728px] h-[440px] w-[664px] rounded-[24px]">
          <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[24px]">
            <div className="absolute inset-0 rounded-[24px] bg-[#d9d9d9]" />
            <img alt="" className="absolute size-full max-w-none rounded-[24px] object-cover" src={blogAssets.controlA} />
            <div className="absolute inset-0 overflow-hidden rounded-[24px]">
              <img alt="" className="absolute top-[-8.14%] left-0 h-[116.37%] w-[107.99%] max-w-none" src={blogAssets.controlB} />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-[2514px] left-1/2 h-[930px] w-[1441px] -translate-x-1/2">
        <div className="absolute top-[104px] left-[-60px] h-[110px] w-[1812px] overflow-clip full-bleed">
          <div className="cities-marquee absolute inset-y-0 left-0 font-['Oswald:SemiBold'] text-[64px] font-semibold uppercase leading-[100px] tracking-[-0.64px] text-[#ef6f2e]">
            <div className="cities-marquee__group">
              <span className="px-6">Минск</span><span aria-hidden>•</span>
              <span className="px-6">Жодино</span><span aria-hidden>•</span>
              <span className="px-6">Борисов</span><span aria-hidden>•</span>
              <span className="px-6">Смолевичи</span><span aria-hidden>•</span>
              <span className="px-6">Слуцк</span><span aria-hidden>•</span>
            </div>
            <div className="cities-marquee__group" aria-hidden>
              <span className="px-6">Минск</span><span aria-hidden>•</span>
              <span className="px-6">Жодино</span><span aria-hidden>•</span>
              <span className="px-6">Борисов</span><span aria-hidden>•</span>
              <span className="px-6">Смолевичи</span><span aria-hidden>•</span>
              <span className="px-6">Слуцк</span><span aria-hidden>•</span>
            </div>
          </div>
        </div>
        <div className="absolute top-[318px] left-[calc(50%+0.5px)] h-[508px] w-[1344px] -translate-x-1/2 overflow-clip rounded-[24px] bg-[#ef6f2e]">
          <div className="absolute top-0 left-1/2 h-[234px] w-[1344px] -translate-x-1/2">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={blogAssets.ctaPattern} />
          </div>
          <p className="absolute top-[104px] left-[114px] w-[550px] font-oswald text-[92px] font-semibold uppercase leading-[100px] text-[#dedddc]">
            Пробное
            <br />
            бесплатное
            <br />
            занятие
          </p>
          <div className="absolute top-[104px] left-[679px] flex h-[300px] w-[551px] flex-col items-start justify-between">
            <p className="min-h-px flex-1 w-full font-['Oswald:Medium'] text-[40px] font-medium leading-[40px] text-[#292420]">
              <span>{`за `}</span>
              <span className="font-['Oswald:Bold'] font-bold">60 минут</span>
              <span>{` поможем наладить контакт ребёнка с инструктором и покажем, что каратэ это очень интересно и весело`}</span>
            </p>
            <CtaButton variant="dark" label="Записаться" href={pageContactHref(CONTACT_ANCHORS.blogTrialDesktop)} className="w-full" />
          </div>
        </div>
      </div>

      <div className="absolute top-[3444px] left-0 h-[1029px] w-[1441px]">
        <PatternMarquee
          className="absolute top-[769px] left-1/2 z-0 w-[1441px] -translate-x-1/2"
          secondarySrc={blogAssets.trianglesB}
          animated={false}
        />
        <div className="absolute top-[104px] left-[48px] w-[1100px]">
          <div className="relative flex items-start gap-[24px]">
            <div className="relative h-[161px] w-[81px] shrink-0">
              <img alt="?" className="absolute inset-0 block size-full max-w-none" src={img} />
            </div>
            <div className="min-w-0 pt-[4px]">
              <p className="font-['Oswald:SemiBold'] text-[92px] font-semibold leading-[72px] tracking-[-0.92px] uppercase whitespace-nowrap text-[#dedddc]">
                Что понадобится
              </p>
              <p className="mt-[17px] ml-[131px] font-['Oswald:Medium'] text-[64px] font-medium leading-[72px] tracking-[-1.92px] uppercase whitespace-nowrap text-[#dedddc]">
                для регулярных занятий
              </p>
            </div>
          </div>
        </div>
        <div className="absolute top-[345px] left-[48px] flex w-[664px] flex-col items-start gap-[48px] rounded-[24px] bg-[#292420] p-[32px]">
          <p className="h-[40px] w-[314px] font-['Oswald:Regular'] text-[40px] leading-[40px] text-[#ef6f2e]">Одежда для занятий</p>
          <div className="flex w-full flex-col items-start gap-[24px]">
            <RequirementItem title="Кимоно (доги)" text="традиционная форма для занятий карате" />
            <RequirementItem title="Пояс" text="цвет пояса соответствует уровню мастерства (кю) ученика в системе иерархии киокусинкай" />
          </div>
        </div>
        <div className="absolute top-[345px] left-[728px] flex w-[664px] flex-col items-start gap-[48px] rounded-[24px] bg-[#292420] p-[32px]">
          <p className="w-full font-['Oswald:Regular'] text-[40px] leading-[40px] text-[#ef6f2e]">Защитная экипировка</p>
          <div className="flex w-full flex-col items-start gap-[24px]">
            <RequirementItem title="Защита голени и стоп" text="мягкие накладки на ноги для защиты суставов и костей при ударах" />
            <RequirementItem title="Перчатки (шингарты)" text="специальные накладки на руки с открытыми пальцами" />
            <RequirementItem title="Шлем" text="для защиты головы во время спаррингов" />
            <RequirementItem title="Защита корпуса (жилет) и паха" text="дополнительные элементы, обеспечивающие безопасность жизненно важных зон" />
          </div>
        </div>
      </div>

      <PhotoGallery />

      <div className="absolute top-[5440px] left-1/2 h-[922px] w-[1440px] -translate-x-1/2 bg-[#26211e] full-bleed-bg">
        <p className="absolute top-[104px] left-[48px] w-[1344px] font-['Oswald:SemiBold'] text-[96px] font-semibold leading-[100px] uppercase text-[#dedddc]">
          Территория осознанного воспитания
        </p>
        <p className="absolute top-[256px] left-[631px] w-[761px] font-['Inter:Regular'] text-[20px] leading-[24px] text-[#dedddc] not-italic">
          Спортивные победы начинаются с правильного настроя дома, а дисциплина в зале помогает наладить учёбу и поведение в школе. В нашем блоге мы разбираем реальные родительские боли: от борьбы с экранной зависимостью до защиты от буллинга и укрепления детского иммунитета. «Территория осознанного воспитания» — это ваш ориентир в мире детской психологии, физического развития и мудрости боевых искусств.
        </p>
        <CtaButton
          label="перейти в TG-канал"
          href={SOCIAL_LINKS.telegramChannel}
          className="absolute top-[336px] left-[48px] w-[551px]"
        />
        <ArticlesFeed />
      </div>

      <div id="contact" className="absolute top-[6362px] left-0 scroll-mt-[80px]">
        <ContactForm />
      </div>
      <Footer className="full-bleed-bg absolute top-[7260px] left-0 h-[845px] w-[1440px] overflow-clip rounded-tl-[24px] rounded-tr-[24px] bg-[#26211e]" />
      </div>
    </div>
  )
}
