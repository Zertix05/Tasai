import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import {
  imgA41,
  imgG27,
  imgG34,
  imgTasaiLogo1,
} from '../assets/images'
import { cn } from '../lib/utils'

type Frame3364282Props = {
  className?: string
  property1?: 'Default' | 'Variant2'
}

function CertLightbox({ src, onClose }: { src: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(38,33,30,0.86)] p-4 md:p-6"
      role="dialog"
      aria-modal
      aria-label="Сертификат"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Закрыть"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 flex size-10 items-center justify-center rounded-full bg-[rgba(222,221,220,0.12)] text-[#dedddc] transition-colors hover:bg-[rgba(222,221,220,0.22)] md:top-5 md:right-6 md:size-12"
      >
        <svg aria-hidden viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
      <img
        alt=""
        src={src}
        className="max-h-[min(90vh,900px)] max-w-[min(90vw,1100px)] rounded-[16px] object-contain shadow-[0_8px_32px_rgba(0,0,0,0.45)]"
        onClick={(event) => event.stopPropagation()}
        draggable={false}
      />
    </div>,
    document.body,
  )
}

function CertCard({
  className,
  onOpen,
}: {
  className?: string
  onOpen?: () => void
}) {
  const shell = className || 'relative w-full shrink-0 overflow-hidden bg-white'
  if (onOpen) {
    return (
      <button
        type="button"
        aria-label="Открыть сертификат"
        onClick={onOpen}
        className={cn(shell, 'cursor-pointer border-0 p-0 text-left')}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-white" />
          <img alt="" className="absolute size-full max-w-none object-contain" src={imgA41} />
        </div>
      </button>
    )
  }
  return (
    <div className={shell}>
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-white" />
        <img alt="" className="absolute size-full max-w-none object-contain" src={imgA41} />
      </div>
    </div>
  )
}

export function Frame3364282({
  className,
  property1 = 'Default',
  onOpen,
}: Frame3364282Props & { onOpen?: () => void }) {
  const isVariant2 = property1 === 'Variant2'
  return (
    <div
      className={
        className ||
        `relative flex h-[1251px] w-[437px] flex-col items-start gap-[16px] overflow-clip content-stretch ${isVariant2 ? 'justify-end' : ''}`
      }
      id={isVariant2 ? 'node-427_4518' : 'node-427_4513'}
    >
      <CertCard className="relative aspect-[324/458] w-full shrink-0" onOpen={onOpen} />
      <CertCard className="relative aspect-[324/458] w-full shrink-0" onOpen={onOpen} />
      <CertCard className="relative aspect-[324/458] w-full shrink-0" onOpen={onOpen} />
      <CertCard className="relative aspect-[324/458] w-full shrink-0" onOpen={onOpen} />
    </div>
  )
}

type Frame3364281Props = {
  className?: string
  property1?: 'Default'
}

export function Frame3364281({ className, property1: _property1 = 'Default' }: Frame3364281Props) {
  return (
    <div
      className={
        className ||
        'relative flex h-[1177px] w-[324px] flex-col items-start justify-end gap-[16px] overflow-clip content-stretch'
      }
      data-node-id="211:1299"
    >
      <CertCard className="relative h-[458px] w-full shrink-0" />
      <CertCard className="relative h-[458px] w-full shrink-0" />
      <CertCard className="relative h-[458px] w-full shrink-0" />
      <CertCard className="relative h-[458px] w-full shrink-0" />
      <CertCard className="relative h-[458px] w-full shrink-0" />
    </div>
  )
}

function MobileCertsMarquee({ onOpen }: { onOpen: () => void }) {
  const certs = [0, 1, 2, 3, 4, 5]
  const [paused, setPaused] = useState(false)
  // Slot 200px; certs A4 aspect + gap-16 peek out of the slot, clipped by section above
  return (
    <div
      className="relative h-[200px] w-[138px] shrink-0 overflow-visible"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => {
        window.setTimeout(() => setPaused(false), 350)
      }}
    >
      <div
        className={cn(
          'certificates-marquee absolute top-[-40px] left-0 flex w-full flex-col gap-4',
          paused && 'is-paused',
        )}
      >
        {[0, 1].map((group) => (
          <div
            key={group}
            className={cn('flex w-full flex-col gap-4', group === 1 && 'pointer-events-none')}
            aria-hidden={group === 1 || undefined}
          >
            {certs.map((i) => (
              <button
                key={`${group}-${i}`}
                type="button"
                aria-label={group === 0 ? 'Открыть сертификат' : undefined}
                tabIndex={group === 0 ? 0 : -1}
                onClick={onOpen}
                className="relative aspect-[324/458] w-[138px] shrink-0 cursor-pointer overflow-hidden border-0 bg-white p-0"
              >
                <img alt="" className="pointer-events-none size-full object-contain" src={imgA41} />
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function AccreditationSection() {
  const [open, setOpen] = useState(false)
  const openCert = () => setOpen(true)

  return (
    <div
      className="relative flex h-auto w-full min-w-0 shrink-0 flex-col overflow-hidden rounded-none bg-[#26211e] max-md:px-[14px] max-md:pb-16 max-md:pt-16 md:block md:h-[796px] md:overflow-clip md:rounded-[24px] md:px-0 md:py-0 md:full-bleed-bg"
      data-node-id="427:4490"
    >
      {/* —— Mobile layout —— */}
      <div className="relative flex w-full gap-3 md:hidden">
        <MobileCertsMarquee onOpen={openCert} />

        <div className="flex min-w-0 flex-1 flex-col">
          <p className="font-oswald text-[20px] font-semibold leading-5 tracking-[-0.4px] text-[#dedddc] normal-case">
            Клуб ТАСАЙ является аккредитованным клубом кёкусинкай карате
          </p>
          <p className="mt-4 font-['Inter:Regular'] text-[14px] font-normal leading-[18px] text-[#dedddc] not-italic">
            и официальным представителем Белорусской федерации Кёкусинкай Будо каратэ на территории
            Минска и Минской области
          </p>

          <div className="mt-auto flex items-center justify-center gap-2 pt-6">
            <div className="relative size-12 shrink-0" data-name="g28">
              <img alt="" className="absolute inset-0 size-full max-w-none" src={imgG27} />
            </div>
            <div className="relative size-12 shrink-0 overflow-hidden rounded-full">
              <img alt="" className="absolute inset-0 size-full max-w-none object-cover" src={imgG34} />
            </div>
            <div className="relative size-12 shrink-0 overflow-hidden rounded-full bg-[#d9232f]">
              <div className="absolute left-1/2 top-1/2 size-[38px] -translate-x-1/2 -translate-y-1/2">
                <img
                  alt=""
                  className="absolute top-0 left-[7.33%] h-full w-[84.96%] max-w-none"
                  src={imgTasaiLogo1}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* —— Desktop absolute layout —— */}
      <div
        className="relative z-10 hidden min-w-0 flex-col gap-4 md:absolute md:top-[104px] md:left-[615px] md:flex md:h-[588px] md:w-[778px]"
        data-node-id="427:4491"
      >
        <div className="absolute top-0 left-0 flex w-[778px] items-center justify-center pr-4">
          <p className="min-w-0 flex-1 break-words font-['Oswald'] text-[40px] font-medium leading-[0] tracking-[-0.4px] text-[#dedddc]">
            <span className="leading-[44px]">Клуб ТАСАЙ является </span>
            <span className="uppercase leading-[44px]">акредитованным</span>
            <span className="leading-[44px]">
              {' '}
              клубом кёкусинкай карате и официальным представителем Белорусской федерации Кёкусинкай Будо
              каратэ на территории Минской области и города Минска
            </span>
          </p>
        </div>

        <div className="absolute top-[415px] left-0 flex items-center gap-4">
          <div className="relative size-[173px] shrink-0" data-name="g28">
            <img alt="" className="absolute inset-0 size-full max-w-none" src={imgG27} />
          </div>
          <div className="relative size-[173px] shrink-0 overflow-hidden rounded-full">
            <img alt="" className="absolute inset-0 size-full max-w-none object-cover" src={imgG34} />
          </div>
          <div className="relative size-[173px] shrink-0 overflow-hidden rounded-full bg-[#d9232f]">
            <div className="absolute left-1/2 top-1/2 size-[164px] -translate-x-1/2 -translate-y-1/2">
              <img
                alt=""
                className="absolute top-0 left-[7.33%] h-full w-[84.96%] max-w-none"
                src={imgTasaiLogo1}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className="relative hidden w-[138px] shrink-0 overflow-hidden md:absolute md:top-[-587px] md:left-[48px] md:block md:h-[2562px] md:w-[477px]"
        data-node-id="427:4512"
      >
        <div
          className={cn('certificates-marquee absolute top-0 left-5 flex w-[437px] flex-col', open && 'is-paused')}
        >
          <Frame3364282
            className="relative flex h-[1251px] w-[437px] shrink-0 flex-col items-start gap-4 overflow-clip"
            property1="Default"
            onOpen={openCert}
          />
          <Frame3364282
            className="relative flex h-[1251px] w-[437px] shrink-0 flex-col items-end gap-4 overflow-clip"
            property1="Variant2"
            onOpen={openCert}
          />
          <Frame3364282
            className="relative flex h-[1251px] w-[437px] shrink-0 flex-col items-start gap-4 overflow-clip"
            property1="Default"
            onOpen={openCert}
          />
          <Frame3364282
            className="relative flex h-[1251px] w-[437px] shrink-0 flex-col items-end gap-4 overflow-clip"
            property1="Variant2"
            onOpen={openCert}
          />
        </div>
      </div>

      <Frame3364281 className="pointer-events-none absolute top-[-113px] left-[1069px] z-0 hidden h-[1177px] w-[324px] flex-col items-start justify-end gap-4 overflow-clip opacity-[0.07] md:flex" />

      {open ? <CertLightbox src={imgA41} onClose={() => setOpen(false)} /> : null}
    </div>
  )
}
