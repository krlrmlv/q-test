export default function debounce(f, ms = 300) {
  let timer
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => f.apply(this, args), ms)
  }
}
