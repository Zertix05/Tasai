const phrase = 'Большой путь вашего ребенка начинается с первых маленьких шагов'

function MarqueeGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="cities-marquee__group" aria-hidden={hidden || undefined}>
      <span className="px-6">{phrase}</span>
      <span aria-hidden>•</span>
      <span className="px-6">{phrase}</span>
      <span aria-hidden>•</span>
    </div>
  )
}

export function PathRibbon() {
  return (
    <div
      className="relative w-full shrink-0 max-md:mt-16 max-md:mb-16 max-md:h-8 md:mt-0 md:mb-0 md:h-[214px]"
      data-node-id="427:4478"
    >
      <div
        className="relative flex h-full w-full items-center overflow-hidden md:absolute md:top-[104px] md:left-0 md:h-[110px] full-bleed"
        data-node-id="427:4479"
      >
        <div className="cities-marquee flex items-center font-['Oswald:SemiBold'] text-[26px] font-semibold uppercase leading-none tracking-[-0.01em] text-[#ef6f2e] md:absolute md:inset-y-0 md:left-0 md:text-[64px] md:leading-[100px] md:tracking-[-0.64px]">
          <MarqueeGroup />
          <MarqueeGroup hidden />
        </div>
      </div>
    </div>
  )
}
