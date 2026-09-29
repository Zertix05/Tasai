import { useState } from 'react'

import { cn } from '../lib/utils'

function FaqToggleIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 84 84"
      className={cn('size-full transition-transform duration-300 ease-out', open && 'rotate-45')}
      fill="none"
      aria-hidden
    >
      <path
        d="M42 57V27M27 42H57"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="bevel"
      />
    </svg>
  )
}

type FaqItem = {
  id: string
  question: string
  answer: string
}

const generalFaqs: FaqItem[] = [
  {
    id: 'age',
    question: 'С какого возраста можно заниматься?',
    answer:
      'В Тасай принимаем детей с 4 лет. До 6 лет занятия проходят в игровом формате — развиваем координацию, дисциплину и любовь к движению. С 6 лет начинается полноценное карате.',
  },
  {
    id: 'girls',
    question: 'Можно ли девочкам заниматься карате?',
    answer:
      'Да, и это один из лучших выборов для девочки. Карате развивает уверенность, координацию и умение постоять за себя — качества, которые нужны каждому ребёнку вне зависимости от пола.',
  },
  {
    id: 'danger',
    question: 'Карате — это не опасно? Не будут бить ребёнка?',
    answer:
      'Безопасность — наш приоритет. Спарринги начинаются только после того, как ребёнок освоил базовую технику и психологически готов. На всех контактных занятиях используется полная защитная экипировка. Наши тренеры с педагогическим образованием контролируют каждое упражнение.',
  },
  {
    id: 'first',
    question: 'Что нужно на первое занятие?',
    answer:
      'Только спортивная форма, в которой ходите на физкультуру, и бутылка воды. Кимоно и экипировка понадобятся позже — после того как ребёнок решит продолжать занятия.',
  },
  {
    id: 'trial',
    question: 'Как проходит пробное занятие?',
    answer:
      'Пробное занятие длится 60 минут. Инструктор знакомит ребёнка с залом, командой и базовыми движениями в энергичной и интересной форме. Главная задача — чтобы ребёнок почувствовал себя комфортно и захотел вернуться. Родители могут присутствовать и наблюдать.',
  },
  {
    id: 'group',
    question: 'Сколько детей в группе?',
    answer:
      'В каждой группе занимается до 15–17 человек на одного инструктора. Это позволяет тренеру уделить внимание каждому ребёнку и видеть его индивидуальный прогресс.',
  },
  {
    id: 'frequency',
    question: 'Как часто проходят тренировки?',
    answer:
      'Тренировки проходят несколько раз в неделю. Точное расписание зависит от возрастной группы и зала. Уточнить расписание вашего города можно по телефону или в форме обратной связи.',
  },
  {
    id: 'missed',
    question: 'Что делать если ребёнок пропустил занятие?',
    answer:
      'Ничего страшного. Ученик может посетить аналогичное занятие в другой группе своего возраста — чтобы не выпадать из процесса и сохранять стабильный прогресс.',
  },
]

export const membershipFaqs: FaqItem[] = [
  {
    id: 'price',
    question: 'Сколько стоит абонемент?',
    answer:
      'Стоимость зависит от города: Минск — 160 BYN/мес, Борисов и Жодино — 120 BYN/мес, Слуцк и Смолевичи — 125 BYN/мес.',
  },
  {
    id: 'limit',
    question: 'Есть ли ограничение по количеству занятий в месяц?',
    answer:
      'Никаких ограничений — это полный безлимит. Абонемент включает все тренировки вашей возрастной группы по расписанию, плюс при желании ребёнок может посещать занятия других групп в любой день и время.',
  },
  {
    id: 'freeze',
    question: 'Можно ли заморозить абонемент?',
    answer:
      'Да. В летний период абонемент можно заморозить без объяснения причин. В течение учебного года — при предоставлении подтверждающего документа.',
  },
  {
    id: 'payment',
    question: 'Как происходит оплата?',
    answer:
      'Оплата раз в месяц — безналичным платежом через личный кабинет. Там же вы видите все посещённые занятия и прогресс ребёнка.',
  },
  {
    id: 'discount',
    question: 'Есть ли скидки для братьев и сестёр?',
    answer:
      'Да. Если в клубе занимаются двое и более детей из одной семьи — действует семейная скидка. Подробности уточняйте у администратора.',
  },
  {
    id: 'includes',
    question: 'Что входит в стоимость абонемента?',
    answer:
      'Все тренировки вашей возрастной группы по расписанию в течение месяца. Экипировка и кимоно приобретаются отдельно.',
  },
]

function FaqRow({
  item,
  open,
  onToggle,
}: {
  item: FaqItem
  open: boolean
  onToggle: () => void
}) {
  return (
    <div className="relative z-10 flex w-full shrink-0 flex-col items-start gap-2">
      <div className="group flex w-full items-stretch gap-2">
        <button
          type="button"
          onClick={onToggle}
          className={cn(
            'flex min-w-px flex-[1_0_0] cursor-pointer items-center rounded-2xl px-4 py-3 text-left font-normal transition-[background-color,color] duration-300 ease-out md:rounded-[500px] md:px-8 md:py-5',
            'hover:bg-[#dedddc] hover:text-[#26211e] group-hover:bg-[#dedddc] group-hover:text-[#26211e]',
            open ? 'bg-[#ef6f2e] text-[#26211e]' : 'bg-[#26211e] text-[#dedddc]',
          )}
        >
          <span
            className="font-oswald text-[20px] leading-6 tracking-[-0.4px] md:text-[40px] md:leading-[44px]"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            {item.question}
          </span>
        </button>

        <button
          type="button"
          aria-label={open ? 'Свернуть ответ' : 'Развернуть ответ'}
          aria-expanded={open}
          onClick={onToggle}
          className={cn(
            'relative flex w-11 shrink-0 cursor-pointer items-center justify-center self-stretch rounded-full p-1.5 transition-[background-color,color] duration-300 ease-out md:w-[84px] md:p-3',
            'hover:bg-[#dedddc] hover:text-[#26211e] group-hover:bg-[#dedddc] group-hover:text-[#26211e]',
            open ? 'bg-[#ef6f2e] text-[#26211e]' : 'bg-[#26211e] text-[#dedddc]',
          )}
        >
          <span className="relative block size-9 md:size-12">
            <FaqToggleIcon open={open} />
          </span>
        </button>
      </div>

      {open ? (
        <div className="flex w-full items-center justify-center px-4 py-4 md:pr-[156px] md:pl-[56px]">
          <p
            className="font-inter min-w-px flex-[1_0_0] text-[14px] leading-[18px] font-normal text-[#dedddc] not-italic md:text-[20px] md:leading-6"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {item.answer}
          </p>
        </div>
      ) : null}
    </div>
  )
}

function FaqGroup({
  items,
  label,
  labelHeight,
}: {
  items: FaqItem[]
  label: string
  labelHeight: number
}) {
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set())

  const toggle = (id: string) => {
    setOpenIds((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="relative flex w-full items-start md:pl-[153px]">
      <div
        className="pointer-events-none mt-[26px] mr-[54px] hidden w-[68px] shrink-0 items-center justify-center md:flex"
        style={{ height: labelHeight }}
        aria-hidden
      >
        <div className="-rotate-90 flex-none">
          <p
            className="font-oswald whitespace-nowrap text-[64px] font-semibold leading-[68px] tracking-[-0.64px] text-[#26211e] uppercase"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            {label}
          </p>
        </div>
      </div>

      <div className="relative z-10 flex w-full flex-col items-start gap-2 md:w-[1004px]">
        {items.map((item) => (
          <FaqRow
            key={item.id}
            item={item}
            open={openIds.has(item.id)}
            onToggle={() => toggle(item.id)}
          />
        ))}
      </div>
    </div>
  )
}

export function MembershipFaqBlock({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'relative w-full rounded-br-[24px] rounded-bl-[24px] px-[14px] pt-16 md:w-[1440px] md:px-0 md:pt-[104px]',
        className,
      )}
    >
      <p
        className="font-oswald mb-8 w-full text-[30px] font-semibold uppercase leading-8 tracking-[-0.01em] text-[#dedddc] md:mb-[80px] md:ml-[56px] md:w-[891px] md:text-[96px] md:leading-[100px] md:tracking-[-0.96px]"
        style={{ fontFamily: "'Oswald', sans-serif" }}
      >
        Часто задаваемые вопросы
      </p>
      <FaqGroup items={membershipFaqs} label="абонементы" labelHeight={357} />
    </div>
  )
}

export function FaqSection() {
  return (
    <div
      id="faq"
      className="relative z-10 w-full shrink-0 scroll-mt-[58px] rounded-br-[24px] rounded-bl-[24px] bg-[#3a3330] px-[14px] pt-16 pb-16 max-md:h-auto md:h-auto md:w-[1440px] md:bg-transparent md:scroll-mt-[80px] md:px-0 md:pt-[104px] md:pb-[104px]"
      data-node-id="427:4523"
    >
      <p
        className="font-oswald mb-8 w-full text-[30px] font-semibold uppercase leading-8 tracking-[-0.01em] text-[#dedddc] md:mb-[80px] md:ml-[56px] md:w-[891px] md:text-[96px] md:leading-[100px] md:tracking-[-0.96px]"
        style={{ fontFamily: "'Oswald', sans-serif" }}
      >
        Часто задаваемые вопросы
      </p>

      <div className="w-full md:hidden">
        <FaqGroup items={generalFaqs} label="общие" labelHeight={190} />
      </div>

      <div className="hidden flex-col gap-[104px] md:flex">
        <FaqGroup items={generalFaqs} label="общие" labelHeight={190} />
        <FaqGroup items={membershipFaqs} label="абонементы" labelHeight={357} />
      </div>
    </div>
  )
}
