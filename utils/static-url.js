const CDN_OPTIONS = {
  filters: {},
  fit: true,
  format: 'webp',
  hAlign: 'center',
  height: undefined,
  smart: false,
  vAlign: undefined,
  width: undefined,
}

export function getCdnImage(path, optionsOrWidth, cdnUrl) {
  /* Second argument can be either an options object, or a single number,
   * meaning cropped image width */

  const options =
    typeof optionsOrWidth === 'object' && optionsOrWidth !== null
      ? { ...optionsOrWidth }
      : { width: optionsOrWidth }

  const mergedOptions = Object.assign({}, CDN_OPTIONS, { ...options })

  const { filters, fit, format, hAlign, height, smart, vAlign, width } =
    mergedOptions

  const urlParts = ['unsafe']
  const filterParts = []

  if (fit) {
    urlParts.push('fit-in')
  }

  /* If width is set and height is not, image will be square */

  if (width) {
    const size = [width]
    size.push(height ?? width)
    urlParts.push(size.join('x'))
  }

  if (hAlign) {
    urlParts.push(hAlign)
  }

  if (vAlign && hAlign !== 'center') {
    urlParts.push(vAlign)
  }

  if (smart) {
    urlParts.push('smart')
  }

  if (format) {
    filterParts.push(`format(${format})`)
  }

  if (typeof filters === 'object' && filters !== null) {
    for (const [key, value] of Object.entries(filters)) {
      filterParts.push(`${key}(${value})`)
    }
  }

  if (filterParts.length) {
    urlParts.push(['filters', ...filterParts].join(':'))
  }

  return getStaticUrl(path, urlParts.join('/'), cdnUrl)
}

export function getStaticFile({
  url = '',
  prefix = '',
  apiLink = true,
  config = {},
}) {
  const base = apiLink ? config.staticUrl : config.siteUrl
  return getStaticUrl(url, prefix, base)
}

export function getStaticImage({
  url = '',
  size = undefined,
  apiLink = true,
  config = {},
}) {
  const base = apiLink ? config.staticUrl : config.siteUrl

  const disableImageResize = base.includes('dev-hasura')

  let prefix

  if (!disableImageResize && size?.toString()?.length) {
    // eslint-disable-next-line
    let [w, h] = size.toString().split('x')
    if (!h) h = w
    prefix = `${w}x${h}`
  }

  return getStaticUrl(url, prefix, base)
}

function getStaticUrl(url, prefix, base) {
  if (!url) return

  /* Do not modify absolute paths and links to Nuxt /static/images dir */
  if (!url.startsWith('/') || url.startsWith('/images/')) return url

  /* Strip leading & trailing slash */
  let link = base?.replace(/^\/|\/$/g, '')

  if (prefix) link += `/${prefix}`

  link += url

  return link
}
