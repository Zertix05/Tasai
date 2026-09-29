/** Уникальные якоря кнопок «Записаться» — для рекламы, Метрики и amoCRM */
export const CONTACT_ANCHORS = {
  header: 'contact-header',
  heroMain: 'contact-hero-main',
  heroMobile: 'contact-hero-mobile',
  trial: 'contact-trial',
  intro: 'contact-intro',

  blogHeroMobile: 'contact-blog-hero-mobile',
  blogTrialMobile: 'contact-blog-trial-mobile',
  blogHeroDesktop: 'contact-blog-hero-desktop',
  blogTrialDesktop: 'contact-blog-trial-desktop',

  aboutHeroMobile: 'contact-about-hero-mobile',
  aboutTrialMobile: 'contact-about-trial-mobile',
  aboutHeroDesktop: 'contact-about-hero-desktop',
  aboutTrialDesktop: 'contact-about-trial-desktop',

  classesHeroMobile: 'contact-classes-hero-mobile',
  classesTrialMobile: 'contact-classes-trial-mobile',
  classesHeroDesktop: 'contact-classes-hero-desktop',
  classesTrialDesktop: 'contact-classes-trial-desktop',

  hallsHeroMobile: 'contact-halls-hero-mobile',
  hallsTrialMobile: 'contact-halls-trial-mobile',
  hallsHeroDesktop: 'contact-halls-hero-desktop',
  hallsTrialDesktop: 'contact-halls-trial-desktop',
} as const

export type ContactAnchorId = (typeof CONTACT_ANCHORS)[keyof typeof CONTACT_ANCHORS]

export const ANCHOR_LABELS: Record<ContactAnchorId, string> = {
  [CONTACT_ANCHORS.header]: 'Шапка — Записаться',
  [CONTACT_ANCHORS.heroMain]: 'Главная — Hero',
  [CONTACT_ANCHORS.heroMobile]: 'Главная — Hero (моб.)',
  [CONTACT_ANCHORS.trial]: 'Главная — Пробное занятие',
  [CONTACT_ANCHORS.intro]: 'Главная — О клубе',

  [CONTACT_ANCHORS.blogHeroMobile]: 'Блог — Hero (моб.)',
  [CONTACT_ANCHORS.blogTrialMobile]: 'Блог — Пробное (моб.)',
  [CONTACT_ANCHORS.blogHeroDesktop]: 'Блог — Hero',
  [CONTACT_ANCHORS.blogTrialDesktop]: 'Блог — Пробное',

  [CONTACT_ANCHORS.aboutHeroMobile]: 'О нас — Hero (моб.)',
  [CONTACT_ANCHORS.aboutTrialMobile]: 'О нас — Пробное (моб.)',
  [CONTACT_ANCHORS.aboutHeroDesktop]: 'О нас — Hero',
  [CONTACT_ANCHORS.aboutTrialDesktop]: 'О нас — Пробное',

  [CONTACT_ANCHORS.classesHeroMobile]: 'Занятия — Hero (моб.)',
  [CONTACT_ANCHORS.classesTrialMobile]: 'Занятия — Пробное (моб.)',
  [CONTACT_ANCHORS.classesHeroDesktop]: 'Занятия — Hero',
  [CONTACT_ANCHORS.classesTrialDesktop]: 'Занятия — Пробное',

  [CONTACT_ANCHORS.hallsHeroMobile]: 'Тарифы — Hero (моб.)',
  [CONTACT_ANCHORS.hallsTrialMobile]: 'Тарифы — Пробное (моб.)',
  [CONTACT_ANCHORS.hallsHeroDesktop]: 'Тарифы — Hero',
  [CONTACT_ANCHORS.hallsTrialDesktop]: 'Тарифы — Пробное',
}

export function isContactAnchorId(id: string): boolean {
  return id === 'contact' || id.startsWith('contact-')
}

export function anchorIdFromHref(href: string): string | null {
  const hashIndex = href.indexOf('#')
  if (hashIndex === -1) return null
  const hash = href.slice(hashIndex + 1)
  return hash && isContactAnchorId(hash) ? hash : null
}

export function isContactHref(href?: string): boolean {
  if (!href) return false
  return anchorIdFromHref(href) !== null
}

/** Кнопка в шапке: с других страниц — на главную к форме */
export function contactHref(anchor: ContactAnchorId, pathname: string): string {
  const hash = `#${anchor}`
  if (pathname === '/') return hash
  return `/${hash}`
}

/** Якорь на текущей странице */
export function pageContactHref(anchor: ContactAnchorId): string {
  return `#${anchor}`
}
