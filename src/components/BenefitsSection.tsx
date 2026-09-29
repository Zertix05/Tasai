import type { ReactNode } from 'react'

import { img, imgFrame3364242, ornamentFullFrame } from '../assets/images'
import { cn } from '../lib/utils'

const BENEFITS = [
  {
    title: (
      <>
        <span className="text-[#ef6f2e]">Уверенность</span>
        <span>, которую не отнять</span>
      </>
    ),
    text: 'Не показная смелость, а внутренняя устойчивость. Ребёнок, который умеет постоять за себя, меньше подвержен буллингу — не потому что дерётся, а потому что держится иначе. Система маленьких побед на тренировках строит самооценку, которая не рассыпается при первой трудности.',
    desktopClass:
      'md:-translate-x-1/2 md:absolute md:bottom-[39.9%] md:left-[calc(50%-113.5px)] md:top-[36.03%] md:w-[437px]',
  },
  {
    title: (
      <>
        <span className="text-[#ef6f2e]">Тело</span>
        <span>, которое служит — а не подводит</span>
      </>
    ),
    text: 'Правильная осанка, крепкий мышечный корсет, развитая координация и гибкость — всё это формируется постепенно, без травм и перегрузок. Физическое здоровье становится фундаментом, на котором строится всё остальное.',
    desktopClass:
      'md:-translate-x-1/2 md:absolute md:left-[calc(50%+339.5px)] md:top-[419px] md:h-[280px] md:w-[437px]',
  },
  {
    title: (
      <>
        <span>{`Энергия и агрессия — в `}</span>
        <span className="text-[#ef6f2e]">силу и самоконтроль</span>
      </>
    ),
    text: 'Гиперактивность, вспышки злости, неумение проигрывать — это не плохой характер, это нерастраченная энергия без вектора. Карате даёт этой энергии правильное направление. Ребёнок учится управлять собой — не потому что так сказали, а потому что сам чувствует разницу.',
    desktopClass:
      'md:-translate-x-1/2 md:absolute md:left-[calc(50%-113.5px)] md:top-[779px] md:h-[280px] md:w-[437px]',
  },
  {
    title: (
      <>
        <span>{`Из «не слышит» — в `}</span>
        <span className="text-[#ef6f2e]">«сам понимает»</span>
      </>
    ),
    text: 'Дисциплина в Тасай не насаждается криком и наказаниями. Ребёнок учится уважать правила изнутри — через систему поясов, уважение к тренеру и личную ответственность за результат. То, что начинается в зале, постепенно переходит в дом и школу.',
    desktopClass:
      'md:-translate-x-1/2 md:absolute md:left-[calc(50%+339.5px)] md:top-[779px] md:h-[280px] md:w-[437px]',
  },
] as const

function BenefitCard({
  title,
  text,
  className,
}: {
  title: ReactNode
  text: string
  className?: string
}) {
  return (
    <div className={cn('flex min-w-0 shrink-0 flex-col', className)}>
      <div className="md:hidden">
        <div className="flex items-start gap-3">
          <div className="relative mt-0.5 h-5 w-2 shrink-0">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgFrame3364242} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="break-words font-oswald text-[20px] font-normal leading-5 text-[#dedddc]">
              {title}
            </p>
            <p className="mt-3 break-words font-['Inter'] text-[14px] font-normal leading-[18px] text-[#dedddc] not-italic">
              {text}
            </p>
          </div>
        </div>
      </div>

      <div className="hidden flex-1 items-start gap-[16px] md:flex">
        <div className="relative h-[40px] w-[16px] shrink-0">
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgFrame3364242} />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-6 text-[#dedddc]">
          <p className="break-words font-['Oswald:Regular'] text-[40px] font-normal leading-10">
            {title}
          </p>
          <p className="break-words font-['Inter'] text-[20px] font-normal leading-6 not-italic">
            {text}
          </p>
        </div>
      </div>
    </div>
  )
}

export function BenefitsSection() {
  return (
    <div
      className="relative w-full max-md:min-h-[412px] max-md:overflow-visible md:absolute md:left-1/2 md:top-[1760px] md:h-[1163px] md:w-[1440px] md:-translate-x-1/2 md:overflow-visible md:rounded-[24px] md:py-0"
      data-node-id="427:4242"
    >
      {/* —— Mobile (Figma 659:4133) —— */}
      <div className="absolute inset-0 md:hidden">
        <p className="font-oswald absolute left-[83px] top-[64px] w-[215px] text-[26px] font-semibold uppercase leading-8 tracking-[-0.26px] text-[#dedddc]">
          что дают занятия
        </p>
        <p className="font-oswald absolute left-[168px] top-[96px] w-[164px] text-[20px] font-medium uppercase leading-6 tracking-[-0.4px] text-[#dedddc]">
          <span>карате к</span>
          <span className="font-bold">Ё</span>
          <span>кусинкай</span>
        </p>
        <div className="absolute left-[344px] top-[64px] h-14 w-7">
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={img} />
        </div>

        {/* Horizontal swipe: equal-height cards, gap 8, peek next */}
        <div
          className="absolute left-[14px] right-0 top-[144px] z-10 grid auto-cols-[328px] grid-flow-col items-stretch gap-2 overflow-x-auto overscroll-x-contain pr-3 pb-1 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {BENEFITS.map((b, i) => (
            <BenefitCard
              key={i}
              title={b.title}
              text={b.text}
              className="h-full w-[328px] snap-start rounded-2xl bg-[#26211e] px-[14px] py-3"
            />
          ))}
          {/* Trailing spacer so last card can peek/align */}
          <div aria-hidden className="w-1 shrink-0 snap-end" />
        </div>
      </div>

      {/* —— Desktop —— */}
      <div className="relative hidden size-full md:block">
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 z-0 h-[calc(100%+157px)] w-[257px] overflow-hidden"
          data-node-id="427:4243"
        >
          <img
            alt=""
            className="absolute left-0 top-0 h-full w-full max-w-none object-cover object-left"
            src={ornamentFullFrame}
          />
        </div>

        <p className="font-['Oswald:SemiBold'] absolute left-[388px] top-[154px] text-[92px] font-semibold uppercase leading-[72px] tracking-[-0.92px] text-[#dedddc] whitespace-nowrap">
          что дают занятия
        </p>
        <p className="font-['Oswald:Medium'] absolute left-[766px] top-[243px] text-[64px] font-medium uppercase tracking-[-1.92px] text-[#dedddc] whitespace-nowrap">
          <span className="leading-[72px]">карате к</span>
          <span className="font-['Oswald:Bold'] font-bold leading-[72px]">Ё</span>
          <span className="leading-[72px]">кусинкай</span>
        </p>
        <div className="absolute left-[1295px] top-[147px] h-[161px] w-[81px]">
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={img} />
        </div>

        {BENEFITS.map((b, i) => (
          <BenefitCard key={i} title={b.title} text={b.text} className={b.desktopClass} />
        ))}
      </div>
    </div>
  )
}
