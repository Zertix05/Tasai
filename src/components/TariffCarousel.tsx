import { useState } from 'react'

import { HALL_LOCATIONS } from '../lib/locations'
import { Button } from './ui/button'

const imgArrowWhite = '/assets/imgFrame3364167.svg'
const imgFrame3364197 = '/assets/imgFrame3364197.png'
const img2 = '/assets/img2.svg'

export function TariffCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = HALL_LOCATIONS[activeIndex]
  const upcoming = Array.from({ length: HALL_LOCATIONS.length - 1 }, (_, offset) => {
    return HALL_LOCATIONS[(activeIndex + offset + 1) % HALL_LOCATIONS.length]
  })

  const goPrev = () => {
    setActiveIndex((index) => (index - 1 + HALL_LOCATIONS.length) % HALL_LOCATIONS.length)
  }

  const goNext = () => {
    setActiveIndex((index) => (index + 1) % HALL_LOCATIONS.length)
  }

  return (
    <div
      className="-translate-x-1/2 absolute content-stretch flex gap-[16px] items-end left-[calc(50%+0.5px)] pl-[48px] top-[384px] w-[1440px]"
      data-node-id="I427:4477;306:3074"
    >
      <div
        className="content-stretch flex gap-[24px] items-end relative shrink-0 w-[760px]"
        data-node-id="I427:4477;306:3075"
      >
        <div className="flex h-[541px] w-[64px] shrink-0 items-end pb-[81px]">
          <Button
            type="button"
            aria-label="Предыдущий зал"
            onClick={goPrev}
            variant="outline"
            className="group size-[64px] shrink-0 rounded-full border-2 border-[#dedddc] bg-transparent p-0 hover:border-[#ef6f2e] hover:bg-transparent active:border-[#ef6f2e] active:bg-transparent"
          >
            <span className="relative size-[32px] rotate-180">
              <img
                alt=""
                className="absolute inset-0 size-full max-w-none transition-[filter] group-hover:[filter:brightness(0)_saturate(100%)_invert(48%)_sepia(79%)_saturate(1486%)_hue-rotate(346deg)_brightness(99%)_contrast(91%)] group-active:[filter:brightness(0)_saturate(100%)_invert(48%)_sepia(79%)_saturate(1486%)_hue-rotate(346deg)_brightness(99%)_contrast(91%)]"
                src={imgArrowWhite}
              />
            </span>
          </Button>
        </div>

        <div
          className="relative h-[541px] min-w-px flex-[1_0_0] overflow-hidden rounded-[24px]"
          data-node-id="I427:4477;306:3080"
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[24px]">
            <img
              alt=""
              className="absolute size-full max-w-none rounded-[24px] object-cover"
              src={imgFrame3364197}
            />
            <div className="absolute inset-0 overflow-hidden rounded-[24px]">
              <img
                key={`photo-${active.id}`}
                alt=""
                className="absolute top-[-23.03%] left-[-23.6%] h-[122.96%] w-[143.41%] max-w-none object-cover"
                src={active.photo}
              />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 h-[168px] w-[584px] rounded-bl-[24px] rounded-br-[24px] bg-[#ef6f2e]" />

          <p
            key={`address-${active.id}`}
            className="absolute top-[469px] left-6 right-12 text-right font-['Oswald'] text-[32px] leading-[40px] font-medium text-[#dedddc]"
          >
            {active.address}
          </p>
          <p
            key={`city-${active.id}`}
            className="absolute top-[392px] right-[48px] whitespace-nowrap font-['Oswald'] text-[44px] leading-[72px] font-semibold tracking-[-0.44px] text-[#26211e] uppercase"
          >
            {active.city}
          </p>

          <div className="absolute top-[396px] left-[24px] h-[75px] w-[221px]">
            <div className="absolute top-[75px] left-0 flex -translate-y-full flex-col justify-end font-['Oswald'] text-[64px] leading-[0] font-semibold tracking-[-0.64px] whitespace-nowrap text-[#26211e] uppercase">
              <p key={`price-${active.id}`} className="leading-[72px]">
                {active.price}
              </p>
            </div>
            <p className="absolute top-[-6px] left-[139px] whitespace-nowrap font-['Oswald'] text-[40px] leading-[0] font-semibold tracking-[-0.4px] uppercase">
              <span className="leading-[72px] text-[#26211e]">/</span>
              <span className="font-medium leading-[72px] text-[#26211e]">мес</span>
            </p>
            <div className="absolute top-[16px] left-[105px] h-[32px] w-[31px]">
              <img
                alt=""
                className="absolute inset-0 size-full max-w-none"
                src={img2}
              />
            </div>
          </div>
        </div>

        <div className="flex h-[541px] w-[64px] shrink-0 items-end pb-[81px]">
          <Button
            type="button"
            aria-label="Следующий зал"
            onClick={goNext}
            variant="outline"
            className="group size-[64px] shrink-0 rounded-full border-2 border-[#dedddc] bg-transparent p-0 hover:border-[#ef6f2e] hover:bg-transparent active:border-[#ef6f2e] active:bg-transparent"
          >
            <span className="relative size-[32px]">
              <img
                alt=""
                className="absolute inset-0 size-full max-w-none transition-[filter] group-hover:[filter:brightness(0)_saturate(100%)_invert(48%)_sepia(79%)_saturate(1486%)_hue-rotate(346deg)_brightness(99%)_contrast(91%)] group-active:[filter:brightness(0)_saturate(100%)_invert(48%)_sepia(79%)_saturate(1486%)_hue-rotate(346deg)_brightness(99%)_contrast(91%)]"
                src={imgArrowWhite}
              />
            </span>
          </Button>
        </div>
      </div>

      <div
        className="content-stretch relative flex w-[632px] shrink-0 items-center"
        data-node-id="I427:4477;306:3092"
      >
        {upcoming.map((location) => (
          <button
            key={location.id}
            type="button"
            onClick={() =>
              setActiveIndex(HALL_LOCATIONS.findIndex((item) => item.id === location.id))
            }
            className="content-stretch relative flex h-[168px] shrink-0 flex-col items-center rounded-[24px] px-[40px] pt-[19px] pb-[32px] text-right transition-opacity hover:opacity-80"
          >
            <div className="content-stretch relative flex shrink-0 flex-col items-center gap-[8px] text-[rgba(222,221,220,0.55)]">
              <p className="w-full shrink-0 font-['Oswald'] text-[44px] leading-[72px] font-semibold tracking-[-0.44px] uppercase">
                {location.city}
              </p>
              <p className="w-full shrink-0 font-['Oswald'] text-[32px] leading-[40px] font-medium">
                {location.preview}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
