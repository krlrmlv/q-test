export function getOffsetTop() {
  return (
    Math.max(
      window?.pageYOffset,
      document?.documentElement?.scrollTop,
      document?.body?.scrollTop
    ) || 0
  )
}

export function getScrollbarWidth() {
  const outer = document.createElement('div')
  outer.style.visibility = 'hidden'
  outer.style.overflow = 'scroll'
  document.body.appendChild(outer)

  const inner = document.createElement('div')
  outer.appendChild(inner)

  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth

  outer.parentNode.removeChild(outer)

  return scrollbarWidth
}

export function getViewportWidth() {
  return Math.min(
    window.innerWidth,
    document.documentElement.getBoundingClientRect().width
  )
}

export function scrollToTarget(target, timeout = 0) {
  const isElement = target instanceof HTMLElement
  const targetEl = isElement ? target : document.querySelector(target)

  if (!targetEl || !process.client) return

  const windowOffset = getOffsetTop() ?? 0
  const targetOffset = target.getBoundingClientRect()?.top ?? 0
  const headerHeight =
    document.querySelector('.app-header')?.getBoundingClientRect()?.height ?? 0

  const top = windowOffset + targetOffset - headerHeight - 32

  if (top >= 0) {
    setTimeout(() => {
      window.scrollTo({ top, behavior: 'smooth' })
    }, timeout)
  }
}
