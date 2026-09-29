import { HALL_LOCATIONS } from '../lib/locations'
import { CtaButton } from './CtaButton'
import { TariffCarousel } from './TariffCarousel'

export function PricingSection() {
  return (
    <div
      id="halls"
      className="relative z-[1] h-auto w-full shrink-0 overflow-x-clip bg-[#3a3330] py-0 scroll-mt-[58px] max-md:overflow-x-visible md:h-[1029px] md:overflow-visible md:bg-transparent md:py-0 md:scroll-mt-[80px]"
      data-node-id="427:4477"
    >
      <div
        aria-hidden
        className="pricing-bleed pointer-events-none absolute inset-y-0 z-0 hidden bg-[#26211e] md:block"
      />
      {/* Mobile header — title + ! */}
      <div className="relative z-10 flex w-full items-start justify-end gap-3 px-[14px] pt-9 md:hidden">
        <p className="min-w-0 text-right font-oswald text-[26px] font-semibold uppercase leading-8 tracking-[-0.26px] text-[#dedddc]">
          В ТАСАЙ действует единый месячный тариф
        </p>
        <img
          alt=""
          aria-hidden
          className="mt-[6px] h-14 w-4 shrink-0 object-contain object-top"
          src="/assets/exclamation.svg"
        />
      </div>

      {/* Desktop title */}
      <p className="absolute top-[104px] left-[48px] hidden w-[1344px] text-left font-['Oswald:SemiBold'] text-[92px] font-semibold uppercase leading-[100px] tracking-[-0.01em] text-[#dedddc] md:block">
        В ТАСАЙ действует единый месячный тариф
      </p>

      <CtaButton
        label="подробнее об абонементах"
        to="/tariffs"
        className="absolute top-[232px] left-[841px] hidden w-[551px] md:flex"
      />

      {/* Mobile halls carousel — card + separate button */}
      <div
        className="relative z-10 mt-6 ml-[14px] flex w-[calc(100%-14px)] snap-x snap-mandatory gap-[8px] overflow-x-auto overscroll-x-contain pr-[14px] pb-1 md:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {HALL_LOCATIONS.map((hall) => (
          <div key={hall.id} className="flex w-[333px] shrink-0 snap-start flex-col gap-2">
            <article className="flex flex-col overflow-hidden rounded-2xl bg-[#26211e]">
              <div className="relative h-[280px] shrink-0 overflow-hidden">
                <img alt="" className="absolute inset-0 size-full object-cover" src={hall.photo} />
              </div>
              <div className="flex flex-col gap-2 px-4 pt-4 pb-5">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-oswald text-[30px] font-semibold uppercase leading-8 tracking-[-0.3px] text-[#ef6f2e]">
                    {hall.city}
                  </p>
                  <p className="font-oswald text-[30px] font-semibold uppercase leading-8 tracking-[-0.3px] text-[#dedddc]">
                    {hall.price} б/мес
                  </p>
                </div>
                <p className="font-oswald text-[20px] font-medium uppercase leading-6 tracking-[-0.4px] text-[#dedddc]">
                  {hall.address}
                </p>
              </div>
            </article>
            <CtaButton label="подробнее" to="/tariffs" size="sm" className="w-full" />
          </div>
        ))}
        <div aria-hidden className="w-1 shrink-0 snap-end" />
      </div>

      <div className="hidden md:block">
        <TariffCarousel />
      </div>
    </div>
  )
}
