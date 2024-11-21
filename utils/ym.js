export const sendMasterCostNoFound = (ym, vendorCode, source) => {
  if (!vendorCode) return

  const event = `mastercost-${source}-search-nofound`
  const key = `mastercost-${source}-search-nofound-item`

  ym('reachGoal', event, {
    [key]: vendorCode,
  })
}

export const sendMasterCostFound = (ym, vendorCode, source) => {
  if (!vendorCode) return

  const event = `mastercost-${source}-search`

  ym('reachGoal', event, {
    'mastercost-manual-search-item': vendorCode,
  })
}
