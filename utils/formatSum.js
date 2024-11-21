export default function formatSum(value, locale = undefined, options = {}) {
  return new Intl.NumberFormat(locale, options).format(value)
}
