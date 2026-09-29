export const PHONE = '+375336600811'
export const PHONE_HREF = 'tel:+375336600811'
export const EMAIL = 'Tasai.champ@gmail.com'
export const EMAIL_HREF = `mailto:${EMAIL}`

export const SOCIAL_LINKS = {
  viber: 'viber://chat?number=%2B375336600811',
  instagram: 'https://www.instagram.com/tasai_family?igsh=Z2l5eHJhdzJ2ODJy',
  telegram: 'https://t.me/+375336600811',
  telegramChannel: 'https://t.me/tasai_prolife',
} as const

export const NAV_ITEMS = [
  { id: 'top', label: 'Главная', href: '/' },
  { id: 'about_us', label: 'О нас', href: '/about_us' },
  { id: 'classes', label: 'Направления', href: '/classes' },
  { id: 'tariffs', label: 'Залы и абонементы', href: '/tariffs' },
  { id: 'parents', label: 'Родителям', href: '/blog' },
  { id: 'faq', label: 'FAQ', href: '/#faq' },
] as const

export type NavId = (typeof NAV_ITEMS)[number]['id']

export const ROUTE_NAV: Partial<Record<string, NavId>> = {
  '/': 'top',
  '/about_us': 'about_us',
  '/classes': 'classes',
  '/tariffs': 'tariffs',
  '/blog': 'parents',
}
