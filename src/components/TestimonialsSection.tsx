import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import {
  img5,
  imgFrame3364096,
  imgFrame3364097,
  imgFrame3364164,
  imgRectangle3,
  img3,
  img4,
} from '../assets/images'
import { cn } from '../lib/utils'

type Review = {
  id: string
  name: string
  city: string
  date: string
  text: string
  avatar: string
  avatarWide?: boolean
  photos?: string[]
}

const REVIEWS: Review[] = [
  {
    id: 'marina',
    name: 'Марина',
    city: 'Минск',
    date: '25 июля 2025',
    text: 'Дмитрий Эдуардович, благодарим вас за то, что уделили нашим детям своё драгоценное время и передали им свой опыт. Надеемся, что наши встречи с вами повторятся',
    avatar: imgFrame3364096,
    avatarWide: true,
  },
  {
    id: 'olga',
    name: 'Ольга',
    city: 'Жодино',
    date: '3 мая 2026',
    text: 'Семья Ильютик выражает огромную благодарность тренеру Артёму Михайловичу за организацию семинара и приглашения на семинар замечательного человека Дмитрия Эдуардовича Алехновича. Наша дочь Евлалия не разачерована, очень все понравилось и получила хороший заряд для занятия каратэ Кёкусинкай. Для нас главное дочери нравится и она хочет заниматься каратэ в данном направлении. Ждём следующих семинаров. Желаем Артёму Михайловичу и Дмитрию Эдуардовичу здоровья, успехов и достижение всех поставленных целей !!! А так же желаем всем ученикам здоровья, успехов и что бы вас не покидали силы и терпения для занятия каратэ Кёкусинкай!!!',
    avatar: imgFrame3364096,
    photos: [imgRectangle3, imgRectangle3],
  },
  {
    id: 'sergey',
    name: 'Сергей',
    city: 'Минск',
    date: '25 июля 2025',
    text: 'Хочу выразить огромную благодарность за организованное мероприятие. Действительно круто!!! Учитывая, что имела возможность посещать подобные семинары в Минске, но НАШЕ было не менее маштабным, увлекательным и полезным.\nСлышала и сама спрашивала мнение ребят))) все действительно волновались, ждали, переживали, восторгались.\nЭто круто!!!\nАртем Михайлович, Вы правда заслуживаете звания лучший тренер года и вообще!!! Шихану огромное спасибо....\nОдним словом от всех Аригато гозимашта',
    avatar: imgFrame3364097,
  },
]

function ReviewHeader({ review }: { review: Review }) {
  return (
    <div className="relative flex w-full min-w-0 shrink-0 content-stretch items-center gap-3 max-md:h-[80px] md:gap-[32px]">
      <div
        className={
          review.avatarWide
            ? 'relative h-[56px] w-[65px] shrink-0 overflow-hidden rounded-[12px] max-md:h-[80px] max-md:w-[93px] md:h-[80px] md:w-[93px] md:rounded-[16px]'
            : 'relative size-14 shrink-0 overflow-hidden rounded-[12px] max-md:h-[80px] max-md:w-[80px] md:size-[80px] md:rounded-[16px]'
        }
      >
        <img
          alt=""
          className="absolute inset-0 size-full max-w-none object-cover"
          src={review.avatar}
        />
      </div>
      <div className="relative flex min-w-0 shrink flex-col items-start justify-center gap-1 whitespace-nowrap md:gap-[4px]">
        <p className="relative shrink-0 text-left font-['Oswald:Medium'] text-[20px] font-medium leading-6 tracking-[-0.24px] text-[#ef6f2e] md:text-right md:text-[24px] md:leading-[40px]">
          <span className="text-[#dedddc]">{review.name}</span>
          <span className="text-[#dedddc]">,</span>
          <span>{` ${review.city}`}</span>
        </p>
        <p className="relative shrink-0 font-['Oswald'] text-[20px] font-normal leading-6 text-[#dedddc] not-italic md:leading-[24px]">
          {review.date}
        </p>
      </div>
    </div>
  )
}

function ReviewText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const normalized = text.replace(/\s+/g, ' ')

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const measure = () => {
      el.classList.remove('is-truncated')
      const overflow = el.scrollHeight > el.clientHeight + 1
      if (overflow) el.classList.add('is-truncated')
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [normalized])

  return (
    <p
      ref={ref}
      className="review-card__text relative w-full shrink-0 break-words font-['Lato'] text-[14px] font-normal leading-[18px] text-[#dedddc] not-italic max-md:h-[77px] md:h-[170px] md:font-['Inter:Regular'] md:text-[20px] md:leading-6"
    >
      {normalized}
    </p>
  )
}

function ReviewCard({ review, onOpen }: { review: Review; onOpen: (review: Review) => void }) {
  const handleOpen = () => onOpen(review)

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleOpen}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          handleOpen()
        }
      }}
      className="relative flex h-[237px] w-[324px] min-h-0 shrink-0 cursor-pointer flex-col items-start overflow-visible whitespace-normal rounded-2xl border-2 border-solid border-[#ef6f2e] p-6 max-md:gap-8 md:h-full md:w-[551px] md:cursor-default md:gap-8 md:rounded-[24px] md:p-6"
    >
      <ReviewHeader review={review} />

      <ReviewText text={review.text} />

      <div
        className={
          review.photos?.length
            ? 'relative hidden w-full shrink-0 content-stretch items-center justify-between md:flex'
            : 'relative hidden w-full shrink-0 content-stretch items-center justify-end md:flex'
        }
      >
        {review.photos?.length ? (
          <div className="relative flex shrink-0 content-stretch items-center gap-[16px]">
            {review.photos.map((photo, i) => (
              <button
                key={i}
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  handleOpen()
                }}
                aria-label="Смотреть фото к отзыву"
                className="relative size-[64px] shrink-0 overflow-hidden rounded-[100px]"
              >
                <img
                  alt=""
                  className="absolute inset-0 size-full max-w-none object-cover"
                  src={photo}
                />
              </button>
            ))}
          </div>
        ) : null}
        <button
          type="button"
          aria-label="Читать отзыв полностью"
          onClick={(event) => {
            event.stopPropagation()
            handleOpen()
          }}
          className="relative flex shrink-0 cursor-pointer content-stretch items-center overflow-clip rounded-[100px] bg-[#ef6f2e] p-[16px] transition-colors hover:bg-[#dedddc] active:bg-[#dedddc]"
        >
          <div className="relative size-[32px] shrink-0">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgFrame3364164} />
          </div>
        </button>
      </div>

      {/* Quotes — top right of card (peek above border; parent has pt for clearance) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-3 right-6 z-10 h-[30px] w-[34px] md:-top-[22px] md:h-[40px] md:w-[46px]"
      >
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={img5} />
      </div>
    </div>
  )
}

function ReviewModal({ review, onClose }: { review: Review; onClose: () => void }) {
  const [photo, setPhoto] = useState<string | null>(null)

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (photo) setPhoto(null)
        else onClose()
      }
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose, photo])

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(38,33,30,0.72)] p-4 md:p-[24px]"
      role="dialog"
      aria-modal
      aria-labelledby={`review-${review.id}-title`}
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[min(900px,calc(100vh-48px))] w-full max-w-[820px] flex-col overflow-hidden rounded-[24px] border-2 border-solid border-[#ef6f2e] bg-[#3a3330] p-4 md:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex size-10 items-center justify-center rounded-full bg-[rgba(222,221,220,0.12)] text-[#dedddc] transition-colors hover:bg-[rgba(222,221,220,0.22)] md:top-5 md:right-6 md:size-12"
        >
          <svg aria-hidden viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className="pr-12">
          <ReviewHeader review={review} />
        </div>
        <p id={`review-${review.id}-title`} className="sr-only">
          Отзыв: {review.name}, {review.city}
        </p>

        <p className="mt-6 min-h-0 flex-1 overflow-y-auto whitespace-pre-wrap font-['Inter:Regular'] text-[14px] font-normal leading-[18px] text-[#dedddc] not-italic md:mt-8 md:text-[20px] md:leading-6">
          {review.text}
        </p>

        {review.photos?.length ? (
          <div className="mt-6 flex flex-wrap gap-3 md:mt-8 md:gap-4">
            {review.photos.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPhoto(src)}
                aria-label={`Открыть фото ${i + 1}`}
                className="relative size-[72px] shrink-0 overflow-hidden rounded-full md:size-[96px]"
              >
                <img alt="" className="absolute inset-0 size-full max-w-none object-cover" src={src} />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {photo ? (
        <div
          className="absolute inset-0 z-20 flex items-center justify-center bg-[rgba(38,33,30,0.86)] p-4"
          onClick={(event) => {
            event.stopPropagation()
            setPhoto(null)
          }}
        >
          <img
            alt=""
            src={photo}
            className="max-h-[min(90vh,900px)] max-w-[min(90vw,1100px)] rounded-[16px] object-contain"
          />
        </div>
      ) : null}
    </div>,
    document.body,
  )
}

function ReviewsTrack({
  ariaHidden,
  onOpen,
}: {
  ariaHidden?: boolean
  onOpen: (review: Review) => void
}) {
  const track = [...REVIEWS, ...REVIEWS]
  return (
    <div
      className={cn(
        'cities-marquee__group items-stretch gap-[16px] pr-[16px] whitespace-normal',
        ariaHidden && 'pointer-events-none',
      )}
      aria-hidden={ariaHidden || undefined}
    >
      {track.map((review, i) => (
        <ReviewCard
          key={`${ariaHidden ? 'b' : 'a'}-${review.id}-${i}`}
          review={review}
          onOpen={onOpen}
        />
      ))}
    </div>
  )
}

export function TestimonialsSection() {
  const [openReview, setOpenReview] = useState<Review | null>(null)
  const [marqueePaused, setMarqueePaused] = useState(false)

  return (
    <div
      id="parents"
      className="relative w-full shrink-0 overflow-visible scroll-mt-[58px] md:h-[1698px] md:scroll-mt-[80px]"
      data-node-id="427:4480"
    >
      {/* Quote block — dark panel */}
      <div className="relative overflow-visible rounded-[24px] bg-[#26211e] max-md:px-[14px] max-md:pb-[10px] max-md:pt-0 md:absolute md:top-[104px] md:left-1/2 md:h-[820px] md:w-[1440px] md:-translate-x-1/2 md:px-0 md:pb-0 md:pt-0">
        <div className="absolute bottom-[88.95%] left-[calc(50%-595.5px)] top-[-5.09%] hidden w-[153px] md:block">
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={img3} />
            </div>

        {/* Mobile quotation marks — half above the block edge */}
        <div
          className="relative z-20 mb-4 ml-auto h-10 w-[46px] -translate-y-1/2 md:hidden"
          aria-hidden
        >
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={img3} />
            </div>

        <div className="relative font-['Oswald:SemiBold'] text-[26px] font-semibold uppercase leading-8 tracking-[-0.01em] text-[#dedddc] max-md:mb-6 max-md:w-full md:absolute md:top-[144px] md:left-[48px] md:mb-0 md:w-[1004px] md:text-[64px] md:leading-[72px] md:tracking-[-0.64px]">
          <p className="mb-0">{`Горжусь тем, что долгое время принадлежу клубу кЁкусинкай `}</p>
          <p>будо каратэ Тасай</p>
            </div>

        {/* Mobile: photo + advisor; name aligned to photo bottom */}
        <div className="relative flex gap-3 md:hidden">
          <div className="relative h-[94px] w-[85px] shrink-0 overflow-hidden rounded-[16px]">
            <img alt="" className="absolute inset-0 size-full max-w-none object-cover" src={img4} />
          </div>
          <div className="relative h-[94px] min-w-0 flex-1">
            <p className="absolute top-0 right-0 left-0 font-['Inter:Regular'] text-[12px] leading-4 text-[#ef6f2e] not-italic">
              Старший советник Генерального консульства Республики Беларусь в г. Санкт-Петербурге
            </p>
            <p className="absolute right-0 bottom-0 left-0 font-['Oswald:SemiBold'] text-[26px] font-semibold uppercase leading-8 tracking-[-0.26px] text-[#ef6f2e]">
              Вячеслав Ременчик
            </p>
          </div>
        </div>

        <p className="relative mt-6 font-['Inter:Regular'] text-[14px] font-normal leading-[18px] text-[#dedddc] not-italic md:hidden">
          Здесь под чутким руководством руководителя клуба и прекрасного талантливого тренера Артёма Бортника прошёл путь от ученика и до обладателя чёрного пояса, чем безмерно горжусь. Это спортивно-прикладное молодёжное объединение имеет богатую историю и традиции, в полной мере способствующие воспитанию физически и духовно развитых людей, способных постигать любые науки и трудиться, принося пользу обществу, не взирая на любые трудности. Сплочённые коллектив молодых высоко подготовленных тренеров, современная многоэтапная методика подготовки на основе мировых стандартов кекушина и система воспитания достойных членов общества — вот основные составляющие деятельности «Тасая». Желаю клубу новых побед, достойных учеников и последователей.
        </p>

        {/* Desktop absolute layout */}
        <div className="pointer-events-none absolute inset-0 hidden md:pointer-events-auto md:block">
          <div className="absolute top-[399px] left-[277px] h-[569px] w-[437px] overflow-hidden rounded-[24px]">
            <img
              alt=""
              className="absolute top-[0.08%] left-[-13.08%] h-[99.92%] w-[131.41%] max-w-none object-cover"
              src={img4}
            />
                </div>
          <div className="absolute top-[460px] left-[728px] flex w-[664px] items-center justify-center pl-4">
            <p className="min-w-px flex-1 font-['Inter:Regular'] text-[20px] leading-6 text-[#dedddc] not-italic">
              Здесь под чутким руководством руководителя клуба и прекрасного талантливого тренера Артёма Бортника прошёл путь от ученика и до обладателя чёрного пояса, чем безмерно горжусь. Это спортивно-прикладное молодёжное объединение имеет богатую историю и традиции, в полной мере способствующие воспитанию физически и духовно развитых людей, способных постигать любые науки и трудиться, принося пользу обществу, не взирая на любые трудности. Сплочённые коллектив молодых высоко подготовленных тренеров, современная многоэтапная методика подготовки на основе мировых стандартов кекушина и система воспитания достойных членов общества — вот основные составляющие деятельности «Тасая». Желаю клубу новых побед, достойных учеников и последователей.
                  </p>
                </div>
          <p className="absolute top-[844px] left-[744px] w-[648px] font-['Inter:Regular'] text-[20px] leading-6 text-[#ef6f2e] not-italic">
            Старший советник Генерального консульства Республики Беларусь в г. Санкт-Петербурге
          </p>
          <p className="absolute top-[892px] left-[744px] font-['Oswald:Medium'] text-[40px] font-medium uppercase leading-10 tracking-[-0.4px] text-[#ef6f2e] whitespace-nowrap">
            Вячеслав Ременчик
                  </p>
                </div>
              </div>

      {/* Reviews — full viewport width, 64px above/below cards */}
      <div
        className="reviews-marquee-strip relative w-screen max-w-none overflow-hidden bg-[#3a3330] py-16 max-md:ml-[calc(50%-50vw)] md:absolute md:top-[1168px] md:left-1/2 md:mt-0 md:h-[470px] md:-translate-x-1/2 md:overflow-x-clip md:overflow-y-visible md:bg-transparent md:py-0 md:pt-[32px] md:pb-0 md:full-bleed"
        onMouseEnter={() => setMarqueePaused(true)}
        onMouseLeave={() => setMarqueePaused(false)}
        onTouchStart={() => setMarqueePaused(true)}
        onTouchEnd={() => {
          window.setTimeout(() => setMarqueePaused(false), 350)
        }}
      >
        <div
          className={cn(
            'cities-marquee relative md:absolute md:top-[32px] md:bottom-0 md:left-0',
            (marqueePaused || openReview) && 'is-paused',
          )}
        >
          <ReviewsTrack onOpen={setOpenReview} />
          <ReviewsTrack ariaHidden onOpen={setOpenReview} />
                  </div>
                </div>

      {openReview ? <ReviewModal review={openReview} onClose={() => setOpenReview(null)} /> : null}
        </div>
  )
}
