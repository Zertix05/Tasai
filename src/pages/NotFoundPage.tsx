import { useEffect } from 'react'

import { notFoundDecor, notFoundQuestion } from '../assets/images'
import { CtaButton } from '../components/CtaButton'

/**
 * Desktop — PDF/Figma 404_not_found (812:3860), 1440×832
 * Mobile — Figma 814:3914
 */
export function NotFoundPage() {
  useEffect(() => {
    const html = document.documentElement
    const body = document.body
    const prevHtmlOverflow = html.style.overflow
    const prevBodyOverflow = body.style.overflow
    const prevHtmlHeight = html.style.height
    const prevBodyHeight = body.style.height

    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
    html.style.height = '100dvh'
    body.style.height = '100dvh'

    return () => {
      html.style.overflow = prevHtmlOverflow
      body.style.overflow = prevBodyOverflow
      html.style.height = prevHtmlHeight
      body.style.height = prevBodyHeight
    }
  }, [])

  return (
    <div
      className="not-found-page relative mx-auto h-dvh max-h-dvh w-full overflow-hidden bg-[#26211e] md:bg-[#3a3330]"
      data-node-id="812:3860"
      data-name="404_not_found"
    >
      {/* Ornament — outside 1440 canvas so it is not clipped on wide screens */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[70px] top-0 z-0 h-[560px] w-[570px] md:fixed md:left-[calc(50%-50px)] md:top-0 md:h-[880px] md:w-[900px] md:-translate-y-[140px]"
        data-node-id="814:3925"
      >
        <img alt="" className="size-full max-w-none object-contain" src={notFoundDecor} />
      </div>

      <div className="relative z-10 mx-auto h-full w-full max-w-[1440px] md:w-[1440px]">
        {/* Content card — PDF: left 80, top 140, padding 64, gap 64 */}
        <div className="absolute left-[14px] top-[calc(50%-32px)] flex w-[calc(100%-28px)] max-w-[365px] -translate-y-1/2 flex-col gap-6 md:left-[80px] md:top-[100px] md:w-auto md:max-w-none md:translate-y-0 md:gap-[64px] md:rounded-[24px] md:bg-[#26211e] md:p-[64px]">
          <div className="flex flex-col gap-6 md:gap-8">
            <div className="flex items-end gap-2 md:gap-4" data-node-id="814:3916">
              <span className="font-oswald text-[30px] font-medium uppercase leading-8 tracking-[-0.01em] text-[#dedddc] md:text-[64px] md:leading-[72px] md:tracking-normal">
                ошибка
              </span>
              <span className="font-oswald text-[58px] font-medium uppercase leading-none tracking-[-0.01em] text-[#dedddc] md:text-[188px] md:tracking-normal">
                404
              </span>
              <img
                alt=""
                src={notFoundQuestion}
                className="block h-14 w-4 shrink-0 object-contain object-bottom md:h-[161px] md:w-[45px]"
                data-node-id="814:3919"
              />
            </div>

            <div className="font-['Inter'] text-[14px] font-normal leading-[18px] text-[#dedddc] md:hidden">
              <p>Упс! Кажется, что‑то пошло не так. Страница, которую вы запрашиваете, не существует.</p>
              <p className="mt-2">
                Но вы можете вернуться на наш сайт и найти там всю необходимую информацию
              </p>
            </div>
            <p className="hidden max-w-[605px] font-['Inter'] text-[20px] font-normal leading-6 text-[#dedddc] md:block">
              Упс! Кажется, что‑то пошло не так. Страница, которую вы запрашиваете, не существует.
              <br />
              <br />
              Но вы можете вернуться на наш сайт и найти там всю необходимую информацию
            </p>
          </div>

          <CtaButton
            size="sm"
            label="Перейти на главную"
            to="/"
            className="w-full md:hidden"
          />
          <CtaButton label="Перейти на главную" to="/" className="hidden w-[605px] md:flex" />
        </div>
      </div>
    </div>
  )
}
