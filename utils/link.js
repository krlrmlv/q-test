export function isExternal(url) {
  const pattern = '^https?://ekfgroup.com/.*'
  const regex = new RegExp(pattern, 'gi')
  const innerUrl =
    url === '#' || regex.test(url) || url?.startsWith(process.env.REST_API_URL)
  return Boolean(url && !url.startsWith('/') && !innerUrl)
}
