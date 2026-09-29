import { imgGroup4, ornMainLong } from '../assets/images'

function OrnamentStrip() {
  return (
    <img
      alt=""
      className="h-[670px] w-[5378px] max-w-none shrink-0"
      src={ornMainLong}
    />
  )
}

export function PageDecor() {
  return (
    <>
      {/* Rotated tribal band — full-bleed width only; height stays 768px */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[5873px] left-1/2 z-0 flex h-[768px] w-[1440px] -translate-x-1/2 items-center justify-center overflow-hidden full-bleed"
        data-node-id="427:4127"
      >
        <div className="page-decor-pattern flex-none">
          <div className="page-decor-frame relative overflow-clip" data-name="Frame">
            <div className="absolute inset-[-2.2%_-0.11%_-2.14%_-0.05%]" data-node-id="427:4128" data-name="Group">
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgGroup4} />
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal diamond strip under hero — full viewport width, behind intro photo */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[851px] left-1/2 z-0 h-[670px] w-[1440px] -translate-x-1/2 overflow-hidden full-bleed"
        data-node-id="427:4372"
      >
        <div className="ornament-marquee flex h-full items-center">
          <OrnamentStrip />
          <OrnamentStrip />
        </div>
      </div>

      <div className="absolute top-[48px] left-[-2962px] h-[2731px] w-[4096px]" data-node-id="427:4707" data-name="IMG_0621+ 2" />
    </>
  )
}