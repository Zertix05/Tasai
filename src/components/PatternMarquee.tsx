import { imgFrame3364269 } from '../assets/images'
import { cn } from '../lib/utils'

type PatternMarqueeProps = {
  className?: string
  /** Second overlapping triangle layer (blog/halls) */
  secondarySrc?: string
  primarySrc?: string
  /** Match Figma strips that are flipped */
  flipY?: boolean
  height?: number
  /** When false, render a single static strip (no horizontal scroll) */
  animated?: boolean
  /** Anchor crop when height stretches (e.g. bottom stays fixed while pulling up) */
  objectPosition?: 'top' | 'center' | 'bottom'
}

/**
 * Geometric triangle ribbon — scrolls horizontally, always full viewport width.
 */
export function PatternMarquee({
  className,
  primarySrc = imgFrame3364269,
  secondarySrc,
  flipY = true,
  height = 132,
  animated = true,
  objectPosition = 'center',
}: PatternMarqueeProps) {
  const layered = Boolean(secondarySrc)
  const objectClass =
    objectPosition === 'bottom'
      ? 'object-bottom'
      : objectPosition === 'top'
        ? 'object-top'
        : 'object-center'

  const unit = layered ? (
    <div className="relative h-[132px] w-[1441px] shrink-0 overflow-clip">
      <div className="absolute top-[-63px] left-[180px] h-[260px] w-[1273px]">
        <div className="absolute inset-[0_-3.99%_0_0]">
          <img alt="" className="block size-full max-w-none" src={primarySrc} />
        </div>
      </div>
      <div className="absolute top-[-60px] left-[-956px] h-[260px] w-[1273px]">
        <div className="absolute inset-[0_-3.99%_0_0]">
          <img alt="" className="block size-full max-w-none" src={secondarySrc} />
        </div>
      </div>
    </div>
  ) : (
    <img
      alt=""
      className={cn('w-[1441px] shrink-0 max-w-none object-cover', objectClass)}
      style={{ height }}
      src={primarySrc}
    />
  )

  return (
    <div
      className={cn(
        'pointer-events-none absolute overflow-hidden',
        className,
        // Always full viewport — after className so left-0 / w-[1440] from callers don't win
        'left-1/2 w-screen max-w-none -translate-x-1/2',
      )}
      style={{ height }}
      aria-hidden
    >
      <div className={cn(flipY && '-scale-y-100')}>
        {animated ? (
          <div className="pattern-marquee flex">
            <div className="flex shrink-0">{unit}</div>
            <div className="flex shrink-0" aria-hidden>
              {unit}
            </div>
          </div>
        ) : (
          unit
        )}
      </div>
    </div>
  )
}
