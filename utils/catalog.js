export function parseFilters(filterString, isDev = false) {
  const filters = parseFiltersObject(filterString, isDev)

  return (
    Object.keys(filters).map((key) => ({
      key,
      selected: filters[key],
    })) || []
  )
}

export function parseFiltersObject(filterString, isDev = false) {
  let filters = {}

  if (filterString) {
    try {
      /* Try parse as JSON first... */
      filters = JSON.parse(filterString)
    } catch (e) {
      try {
        /* ...then try parse as URL encoded if not valid JSON */
        filters = JSON.parse(decodeURIComponent(filterString))
      } catch (error) {
        if (isDev) {
          // eslint-disable-next-line
          console.error('Invalid JSON in query filters:', filterString)
        }
      }
    }
  }

  return filters
}
