import type { CSSProperties } from 'react'

import { cn } from '../lib/utils'

type OrnamentStripMarqueeProps = {
  className?: string
  /** Clip height of the visible strip */
  height?: number
  /** Height of one pattern unit (defaults to `height`) */
  unitHeight?: number
  /** Width of one pattern unit */
  stripWidth?: number
  src?: string
  /**
   * When set, fills the SVG mask with this Tailwind bg color
   * (e.g. `bg-[#292420]/17`). Otherwise the SVG is shown as an image.
   */
  maskClassName?: string
  flipY?: boolean
  /** Extra img/mask positioning classes on each unit */
  unitClassName?: string
}

/** Pull tiles together so the join never flashes a gap */
const TILE_OVERLAP_PX = 16
const TILE_COUNT = 6

/**
 * Horizontal geometric ornament — seamless infinite scroll.
 * Tiles overlap; animation steps by exactly one tile (width − overlap).
 */
export function OrnamentStripMarquee({
  className,
  height = 56,
  unitHeight,
  stripWidth = 466,
  src = '/assets/halls/ornament-mobile.svg',
  maskClassName,
  flipY = false,
  unitClassName,
}: OrnamentStripMarqueeProps) {
  const uh = unitHeight ?? height
  const step = Math.max(1, stripWidth - TILE_OVERLAP_PX)

  const renderUnit = (key: string) =>
    maskClassName ? (
      <div
        key={key}
        className={cn('block shrink-0', maskClassName, unitClassName)}
        style={{
          width: stripWidth,
          height: uh,
          marginLeft: key === '0' ? 0 : -TILE_OVERLAP_PX,
          WebkitMaskImage: `url(${src})`,
          maskImage: `url(${src})`,
          WebkitMaskSize: '100% 100%',
          maskSize: '100% 100%',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
        }}
      />
    ) : (
      <img
        key={key}
        alt=""
        draggable={false}
        className={cn('block shrink-0 max-w-none', unitClassName)}
        style={{
          width: stripWidth,
          height: uh,
          marginLeft: key === '0' ? 0 : -TILE_OVERLAP_PX,
        }}
        src={src}
      />
    )

  return (
    <div
      aria-hidden
      className={cn('pointer-events-none w-full overflow-hidden', className)}
    >
      <div
        className={cn('relative w-full overflow-hidden', flipY && '-scale-y-100')}
        style={{ height }}
      >
        <div
          className="ornament-strip-marquee absolute inset-y-0 left-0 flex"
          style={
            {
              '--ornament-step': `${step}px`,
            } as CSSProperties
          }
        >
          {Array.from({ length: TILE_COUNT }, (_, i) => renderUnit(String(i)))}
        </div>
      </div>
    </div>
  )
}
