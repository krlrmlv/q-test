import { COOKIE_OPTIONS, REFERER_COOKIE_NAME, SOURCES } from '~/utils/analytic'

export default function ({ req, $cookies }) {
  let source = ''
  const cookieSource = $cookies.get(REFERER_COOKIE_NAME)

  if (req?.headers?.referer) {
    const referer = new URL(req.headers.referer)

    if (referer?.hostname?.includes(SOURCES.google)) source = SOURCES.google

    if (referer?.hostname?.includes(SOURCES.yandex)) source = SOURCES.yandex
  }

  if (!source && !cookieSource) {
    $cookies.set(REFERER_COOKIE_NAME, 'direct', COOKIE_OPTIONS)
  } else if (source) {
    $cookies.set(REFERER_COOKIE_NAME, source, COOKIE_OPTIONS)
  }
}
