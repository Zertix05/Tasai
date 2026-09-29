import { img, imgRectangle3, imgRectangle4 } from '../assets/images'
import { OrnamentStripMarquee } from './OrnamentStripMarquee'
import { cn } from '../lib/utils'

const CARDS = [
  {
    title: 'Мы воспитываем, а не просто тренируем',
    text: 'В большинстве секций карате — спорт. В Тасай — система воспитания, где карате является инструментом. Родители остаются в контакте с тренером, понимают что происходит с ребёнком, и видят изменения не только в зале, но и дома.',
    desktopClass: 'md:left-[48px] md:top-[345px] md:w-[664px]',
  },
  {
    title: 'Ребёнок входит в своём темпе — без давления',
    text: 'Никаких спаррингов с первого дня. Никакого «давай-давай» и сравнения с другими. Первые занятия — это знакомство: с залом, тренером, базовыми движениями. Нагрузка растёт постепенно, когда ребёнок сам готов. Наша задача — чтобы он захотел вернуться.',
    desktopClass: 'md:left-[50px] md:top-[625px] md:w-[662px]',
  },
  {
    title: 'Тренер — не просто спортсмен, а наставник',
    text: 'Все инструкторы Тасай — ученики основателя клуба, прошедшие долгий путь в карате. Они понимают детскую психологию и знают: как найти подход к замкнутому ребёнку, как удержать гиперактивного, как мотивировать того, кто хочет всё бросить. Каждый месяц тренер даёт обратную связь родителям.',
    desktopClass: 'md:left-[728px] md:top-[625px] md:w-[664px]',
  },
] as const

export function WhyTasaiSection() {
  return (
    <>
      {/* Mobile divider photo (iPhone layout) */}
      <div className="h-[261px] w-full overflow-hidden md:hidden">
        <img alt="" className="size-full object-cover" src="/assets/mobile/break-boards.png" />
      </div>

      <div
        className="relative w-full min-w-0 max-md:overflow-hidden max-md:bg-[#3a3330] md:absolute md:left-1/2 md:top-[3080px] md:h-[1017px] md:w-[1440px] md:-translate-x-1/2 md:overflow-visible md:bg-[#26211e] min-[1440px]:bg-transparent"
        data-node-id="427:4365"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-1/2 z-0 hidden w-screen -translate-x-1/2 bg-[#26211e] min-[1440px]:block"
        />

        <div className="relative z-10 size-full">
        {/* —— Mobile —— */}
        <div className="relative px-4 pb-8 pt-16 md:hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 top-[20px] z-0 w-full overflow-hidden"
          >
            <OrnamentStripMarquee maskClassName="bg-[#dedddc]/[0.03]" />
          </div>

          <div className="relative z-10 mb-6 flex items-end gap-3">
            <div className="relative h-14 w-7 shrink-0">
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={img} />
            </div>
            <p className="font-oswald text-2xl font-semibold uppercase leading-6 text-[#dedddc]">
              Почему именно тасай
            </p>
          </div>

          <div className="relative z-10 flex flex-col gap-2">
            {CARDS.map((card) => (
              <div
                key={card.title}
                className="flex w-full flex-col items-start gap-4 rounded-2xl px-4 pt-3 pb-3 outline outline-2 outline-offset-[-2px] outline-[#ef6f2e]"
              >
                <p className="w-full font-oswald text-xl font-normal leading-5 text-[#ef6f2e]">{card.title}</p>
                <p className="w-full font-['Inter'] text-sm font-normal leading-4 text-[#dedddc] not-italic">
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* —— Desktop —— */}
        <div className="relative hidden size-full md:block">
          <div className="absolute top-[73px] left-[728px] h-[536px] w-[772px] rounded-[24px]">
            <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[24px]">
              <img alt="" className="absolute size-full max-w-none rounded-[24px] object-cover" src={imgRectangle3} />
              <img alt="" className="absolute size-full max-w-none rounded-[24px] object-cover" src={imgRectangle4} />
            </div>
          </div>

          <div className="absolute left-[64px] top-[104px] h-[161px] w-[81px]">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={img} />
          </div>

          <p className="absolute left-[161px] top-[73px] w-[653px] font-['Oswald:SemiBold'] text-[0px] font-semibold uppercase leading-[0] tracking-[-0.92px] text-[#dedddc]">
            <span className="font-['Oswald:Medium'] text-[64px] font-medium leading-[72px] tracking-[-1.92px]">
              Почему
            </span>
            <span className="font-['Oswald:Medium'] text-[64px] font-medium leading-[72px]">{` `}</span>
            <span className="font-['Oswald:Medium'] text-[64px] font-medium leading-[72px] tracking-[-1.92px]">
              именно
            </span>
            <span className="text-[92px] leading-[100px]">{` `}</span>
            <span className="text-[92px] leading-[100px]">тасай</span>
          </p>

          {CARDS.map((card) => (
            <div
              key={card.title}
              className={cn(
                'absolute flex flex-col gap-4 rounded-[24px] border-2 border-solid border-[#ef6f2e] px-12 py-6',
                card.desktopClass,
              )}
            >
              <p className="break-words font-['Oswald:Medium'] text-[40px] font-medium uppercase leading-10 text-[#ef6f2e]">
                {card.title}
              </p>
              <p className="break-words font-['Inter'] text-[20px] font-normal leading-6 text-[#dedddc] not-italic">
                {card.text}
              </p>
            </div>
          ))}
        </div>
        </div>
      </div>
    </>
  )
}
