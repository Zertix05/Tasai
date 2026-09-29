import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { isContactAnchorId } from '../lib/contactAnchors'
import { captureLeadSourceFromAnchor, captureLeadSourceFromHash } from '../lib/leadAttribution'

const HEADER_OFFSET = 80
/** Положительный = чуть ниже начала блока формы */
const CONTACT_INSET = 120

function findContactElement(): HTMLElement | null {
  for (const node of document.querySelectorAll('#contact')) {
    if (!(node instanceof HTMLElement)) continue
    const { height, width } = node.getBoundingClientRect()
    if (height > 0 && width > 0) return node
  }
  return document.getElementById('contact')
}

function scrollToContact() {
  const el = findContactElement()
  if (!el) return
  const top =
    el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET + CONTACT_INSET
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
}

function scrollToHash(hash: string) {
  const id = hash.replace(/^#/, '')
  if (!id) return
  if (isContactAnchorId(id)) {
    scrollToContact()
    return
  }
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/** Скролл вверх при смене страницы; к #contact* — к форме */
export function ScrollManager() {
  const { pathname, hash } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const delay = hash ? 100 : 0
    const timer = window.setTimeout(() => {
      if (hash) {
        if (isContactAnchorId(hash.replace(/^#/, ''))) {
          captureLeadSourceFromHash(hash)
        }
        scrollToHash(hash)
        return
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }, delay)
    return () => window.clearTimeout(timer)
  }, [pathname, hash])

  useEffect(() => {
    const resetX = () => {
      if (window.scrollX !== 0) {
        window.scrollTo({ left: 0, top: window.scrollY, behavior: 'auto' })
      }
    }
    resetX()
    window.addEventListener('resize', resetX)
    return () => window.removeEventListener('resize', resetX)
  }, [])

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return
      const anchor = target.closest('a[href*="#contact"]')
      if (!(anchor instanceof HTMLAnchorElement)) return

      const url = new URL(anchor.href, window.location.href)
      const hash = url.hash
      if (!hash || !isContactAnchorId(hash.replace(/^#/, ''))) return

      event.preventDefault()
      captureLeadSourceFromAnchor(anchor)

      const hashId = hash.replace(/^#/, '')
      const hashChanged = window.location.hash !== hash

      navigate({
        pathname: url.pathname,
        search: url.search,
        hash: hashId,
      })

      if (!hashChanged) {
        requestAnimationFrame(() => scrollToContact())
      }
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [navigate])

  return null
}
