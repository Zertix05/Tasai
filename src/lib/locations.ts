export type HallLocation = {
  id: string
  city: string
  label: string
  /** Текст адреса под городом */
  address: string
  /** Короткая подпись в карусели на главной */
  preview: string
  price: number
  /** Путь к фото зала: файл положи в public/, путь начинай с /assets/... */
  photo: string
  /** Широта метки на Яндекс.Картах */
  lat: number
  /** Долгота метки на Яндекс.Картах */
  lon: number
}

/**
 * Единый список залов для главной карусели и /tariffs.
 *
 * Куда что менять:
 * - address  → полный адрес
 * - photo    → ссылка/путь на фото (например '/assets/halls/minsk.jpg')
 * - lat, lon → координаты метки на карте
 * - price    → цена абонемента
 *
 * Фото клади в: public/assets/halls/
 * Координаты: открой точку в Яндекс.Картах → ПКМ → «Что здесь?» → скопируй lat/lon
 */
export const HALL_LOCATIONS: HallLocation[] = [
  {
    id: 'minsk',
    city: 'минск',
    label: 'Минск',
    address: 'ул. Ложинская, д. 14, пом.3',
    preview: 'ул. Ложинская, д. 14, пом.3',
    price: 160,
    photo: '/assets/Minsk.jpg',
    lat: 53.949736,
    lon: 27.682358,
  },
  {
    id: 'borisov',
    city: 'борисов',
    label: 'Борисов',
    address: 'ул. 50 лет БССР, д. 10А',
    preview: 'ул. 50 лет БССР, д. 10А',
    price: 120,
    photo: '/assets/Borisov.jpg',
    lat: 54.216415,
    lon: 28.478364,
  },
  {
    id: 'zhodino',
    city: 'Жодино',
    label: 'Жодино',
    address: 'ул. Калиновского, д. 5',
    preview: 'ул. Калиновского, д. 5',
    price: 120,
    photo: '/assets/Godino.jpg',
    lat: 54.106403,
    lon: 28.312970,
  },
  {
    id: 'slutsk',
    city: 'слуцк',
    label: 'Слуцк',
    address: 'ул. Ленина, д. 118А',
    preview: 'ул. Ленина, д. 118А',
    price: 125,
    photo: '/assets/imgFrame3364198.png',
    lat: 53.021559,
    lon: 27.544848,
  },
  {
    id: 'smolevichi',
    city: 'смолевичи',
    label: 'Смолевичи',
    address: 'ул. Социалистическая, д. 70',
    preview: 'ул. Социалистическая, д. 70',
    price: 125,
    photo: '/assets/imgFrame3364198.png',
    lat: 54.043975,
    lon: 28.073620,
  },
]

/** Embed Яндекс.Карты с красной меткой в точке lat/lon */
export function yandexMapEmbedUrl(lat: number, lon: number, zoom = 16) {
  const ll = `${lon}%2C${lat}`
  return `https://yandex.ru/map-widget/v1/?ll=${ll}&z=${zoom}&pt=${lon}%2C${lat}%2Cpm2rdm&l=map`
}
