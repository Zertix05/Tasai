import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { getPageSeo } from '../lib/seo'

function upsertMeta(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/** Обновляет title и description при смене маршрута (SPA). */
export function PageSeo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const { title, description } = getPageSeo(pathname)
    document.title = title
    upsertMeta('description', description)
  }, [pathname])

  return null
}
