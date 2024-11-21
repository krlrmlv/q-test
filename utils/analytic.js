export const buildUtmContent = ({ utmPlugin, cookies }) => {
  const {
    utm_source: utm_s,
    utm_medium: utm_m,
    utm_campaign: utm_c,
  } = utmPlugin.get()
  const analyticCookies = getAnalyticCookies(cookies)
  const referer = cookies.get(REFERER_COOKIE_NAME)

  const utmContent =
    Object.entries({
      utm_s,
      utm_m,
      utm_c,
      ...analyticCookies,
      istochnik: referer,
    })
      ?.map(([key, value]) => {
        if (value) return `${key}|${value}`
        else return `${key}|`
      })
      ?.join('|') || ''

  return utmContent
}

export const getAnalyticData = ({ utmPlugin, cookies }) => {
  const utms = utmPlugin.get()
  const analyticCookies = getFilteredAnalyticCookies(cookies)

  const utm =
    Object.entries({ ...utms, ...analyticCookies })
      ?.map(([key, value]) => `${key}=${value}`)
      ?.join('&') || null

  const referer = cookies.get(REFERER_COOKIE_NAME)

  return { utm, referer }
}

/** _ga, _ym_uid, mindboxDeviceUUID   */
const getAnalyticCookies = (cookies) => {
  const _ga = cookies.get('_ga')?.split('.')[2] ?? null
  const _ym_uid = cookies.get('_ym_uid', { parseJSON: false }) ?? null
  const mindboxDeviceUUID = cookies.get('mindboxDeviceUUID') ?? null

  return { _ga, _ym_uid, mindboxDeviceUUID }
}

const getFilteredAnalyticCookies = (cookies) => {
  const analyticCookies = getAnalyticCookies(cookies)
  const filteredObj = {}

  for (const key in analyticCookies) {
    if (analyticCookies[key]) filteredObj[key] = analyticCookies[key]
  }
  return filteredObj
}

/** Referer options */
export const REFERER_COOKIE_NAME = 'analytics_referer'

export const COOKIE_OPTIONS = {
  maxAge: 60 * 60 * 24 * 365, // 1 year
  path: '/',
  sameSite: true,
}

export const SOURCES = {
  google: 'google',
  yandex: 'yandex',
}
