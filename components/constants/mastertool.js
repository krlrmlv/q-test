export const mtGroups = [
  {
    name: 'calculators.masterTool.electricians',
    items: [
      { slug: 'lightning-protection', badge: 'new' },
      { slug: 'grounding-resistance' },
      { slug: 'motor-capacitor' },
      { slug: 'voltage-drop' },
      { slug: 'buildings-load' },
      // { slug: 'leakage-current' },
      // { slug: 'short-circuit' },
      // { slug: 'sensitivity' },
      { slug: 'configurate-kupol', badge: 'new' },
      {
        file: 'mastertool-configurate-kupol',
        slug: 'configurate-kupol-file',
      },
    ],
  },
  {
    name: 'calculators.masterTool.industrialEquipment',
    items: [
      { slug: 'freq-converter-efficiency', badge: 'new' },
      { slug: 'thermal-stability' },
      { slug: 'button-choose' },
      { slug: 'cable-tray', badge: 'new' },
      // { file: 'mastertool-cable-tray', slug: 'cable-tray' },
    ],
  },
  {
    name: 'calculators.masterTool.cabinetEquipment',
    items: [
      // { slug: 'selectivity' },
      // { slug: 'trivia' },
      { slug: 'uerm' },
      { slug: 'voltage-stabilizer' },
      // { slug: 'configurate-fort' },
      // { slug: 'configurate-vru' },
      { slug: 'outdoor-locker' },
      { file: 'mastertool-avr-box', slug: 'avr-box' },
      // { file: 'mastertool-astra-box', slug: 'astra-box' },
    ],
  },
]

export default {}
