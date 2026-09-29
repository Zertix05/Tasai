import { cn } from '../lib/utils'

const WORDS = ['ТАСАЙ', 'ТАСАЙ', 'ТАСАЙ', 'ТАСАЙ'] as const

type TasaiWatermarkProps = {
  /** Outer clip + position wrapper */
  className?: string
  /** Typography / color on the scrolling track */
  textClassName?: string
  /** Gap between words inside each group */
  gapClassName?: string
}

function WordGroup({ gapClassName, hidden }: { gapClassName?: string; hidden?: boolean }) {
  return (
    <div className={cn('cities-marquee__group gap-[104px]', gapClassName)} aria-hidden={hidden}>
      {WORDS.map((word, i) => (
        <span key={`${hidden ? 'b' : 'a'}-${i}`} className="shrink-0 leading-none">
          {word}
        </span>
      ))}
    </div>
  )
}

export function TasaiWatermark({
  className,
  textClassName,
  gapClassName,
}: TasaiWatermarkProps) {
  return (
    <div
      className={cn(
        // Extra height so the breve on «Й» is not clipped by overflow
        'pointer-events-none absolute overflow-hidden',
        className,
        // Always full viewport — after className so inset-x-0 / full-bleed callers don't win
        'left-1/2 w-screen max-w-none -translate-x-1/2',
      )}
      aria-hidden
    >
      <div
        className={cn(
          "tasai-watermark-marquee absolute top-0 left-0 flex h-full items-center font-['Oswald:SemiBold'] text-[179px] font-semibold uppercase leading-none whitespace-nowrap pt-[0.14em] pb-[0.02em]",
          textClassName,
        )}
        style={{ fontFamily: 'Oswald, semibold' }}
      >
        <WordGroup gapClassName={gapClassName} />
        <WordGroup gapClassName={gapClassName} hidden />
      </div>
    </div>
  )
}
