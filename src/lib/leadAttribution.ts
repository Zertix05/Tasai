import {
  ANCHOR_LABELS,
  anchorIdFromHref,
  isContactAnchorId,
  type ContactAnchorId,
} from './contactAnchors'

const STORAGE_KEY = 'tasai_lead_cta'

const PAGE_LABELS: Record<string, string> = {
  '/': 'Главная',
  '/about_us': 'О нас',
  '/classes': 'Занятия',
  '/tariffs': 'Тарифы',
  '/blog': 'Блог',
}

/** @deprecated используйте ANCHOR_LABELS из contactAnchors */
export const LEAD_SOURCE_LABELS: Record<string, string> = {
  'header-cta': ANCHOR_LABELS['contact-header'],
  'hero-main': ANCHOR_LABELS['contact-hero-main'],
  'hero-mobile': ANCHOR_LABELS['contact-hero-mobile'],
  'trial-section': ANCHOR_LABELS['contact-trial'],
  'intro-section': ANCHOR_LABELS['contact-intro'],
}

export function setLeadAttribution(label: string): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, label.slice(0, 200))
  } catch {
    /* private mode / quota */
  }
}

export function getLeadAttribution(): string | null {
  try {
    return sessionStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

export function clearLeadAttribution(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY)
  } catch {
    /* ignore */
  }
}

function labelForAnchorId(id: string): string {
  if (id in ANCHOR_LABELS) {
    return ANCHOR_LABELS[id as ContactAnchorId]
  }
  return id
}

export function captureLeadSourceFromHash(hash: string): void {
  const id = hash.replace(/^#/, '')
  if (!isContactAnchorId(id)) return
  setLeadAttribution(labelForAnchorId(id))
}

export function captureLeadSourceFromAnchor(anchor: HTMLAnchorElement): void {
  const anchorId = anchorIdFromHref(anchor.getAttribute('href') ?? anchor.href)
  if (anchorId) {
    setLeadAttribution(labelForAnchorId(anchorId))
    return
  }

  const explicitId = anchor.dataset.leadSource?.trim()
  if (explicitId) {
    setLeadAttribution(LEAD_SOURCE_LABELS[explicitId] ?? explicitId)
    return
  }

  const label =
    anchor.dataset.leadLabel?.trim() ||
    anchor.textContent?.trim().replace(/\s+/g, ' ') ||
    'Кнопка'
  const page = PAGE_LABELS[window.location.pathname] ?? window.location.pathname
  setLeadAttribution(`${page} — ${label}`)
}

export { isContactHref } from './contactAnchors'
