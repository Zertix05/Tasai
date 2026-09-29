import type { ReactNode } from 'react'

import { Footer } from './Footer'
import { Header } from './Header'

type LegalDocumentLayoutProps = {
  title: string
  pdfHref?: string
  downloadLabel?: string
  children: ReactNode
}

export function LegalDocumentLayout({
  title,
  pdfHref,
  downloadLabel = 'Скачать PDF',
  children,
}: LegalDocumentLayoutProps) {
  return (
    <div className="relative min-h-dvh w-full overflow-x-clip bg-[#3a3330]">
      <Header className="full-bleed-sticky sticky top-0 z-50 flex h-[58px] w-full content-stretch items-center justify-between bg-[rgba(38,33,30,0.55)] px-[14px] backdrop-blur-[8px] transition-colors hover:bg-[#26211e] md:h-[80px] md:px-[48px]" />

      <main className="mx-auto w-full max-w-[1440px] px-[14px] pb-16 pt-16 md:px-[48px] md:pb-24 md:pt-20">
        <div className="mb-6 flex flex-col gap-3 md:mb-8 md:flex-row md:items-end md:justify-between">
          <h1 className="font-oswald text-[30px] font-semibold uppercase leading-9 tracking-[-0.3px] text-[#dedddc] md:text-[64px] md:leading-[72px] md:tracking-[-0.64px]">
            {title}
          </h1>
          {pdfHref ? (
            <a
              href={pdfHref}
              target="_blank"
              rel="noopener noreferrer"
              className="font-['Inter'] shrink-0 text-[14px] leading-[18px] text-[#ef6f2e] underline decoration-solid transition-opacity hover:opacity-80 md:text-[16px] md:leading-6"
            >
              {downloadLabel}
            </a>
          ) : null}
        </div>

        <article className="rounded-[24px] bg-[#26211e] px-4 py-8 md:px-12 md:py-12">{children}</article>
      </main>

      <Footer className="full-bleed-bg mx-auto w-full max-w-[1440px]" />
    </div>
  )
}

export function LegalParagraph({ children }: { children: ReactNode }) {
  return (
    <p className="font-['Inter'] text-[14px] leading-[22px] text-[#dedddc] not-italic md:text-[16px] md:leading-[26px]">
      {children}
    </p>
  )
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-8 first:mt-0 md:mt-10">
      <h2 className="font-oswald mb-4 text-[22px] font-medium uppercase leading-7 tracking-[-0.22px] text-[#ef6f2e] md:mb-6 md:text-[32px] md:leading-9">
        {title}
      </h2>
      <div className="flex flex-col gap-3 md:gap-4">{children}</div>
    </section>
  )
}

export function LegalList({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex list-disc flex-col gap-2 pl-5 font-['Inter'] text-[14px] leading-[22px] text-[#dedddc] md:text-[16px] md:leading-[26px]">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}
