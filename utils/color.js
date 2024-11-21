export function getContrastColor(
  srcColor,
  white = '#ffffff',
  black = '#000000',
  threshold = 165
) {
  if (!srcColor?.length) return black

  /* Strip hash from color value */
  const color = srcColor.startsWith('#') ? srcColor.slice(1) : srcColor

  const rgb = []

  /* Iterate by 1 or 2 chars depending on color format (#xxx or #xxxxxx) */
  const digits = color.length === 3 ? 1 : 2
  for (let i = 0; i < 3; i++) {
    let hex = color.slice(digits * i, digits * (i + 1))
    if (digits < 2) {
      /* Duplicate char if color format is #xxx */
      hex = `${hex}${hex}`
    }
    rgb[i] = parseInt(hex, 16)
  }

  /* Calculate color lightness */
  const lightness = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]

  return lightness >= threshold ? black : white
}
