import { Roboto, RobotoBold } from '@/utils/jspdf/fonts.js'

export function embedFonts(doc) {
  if (!doc) return

  doc.addFileToVFS('Roboto-normal.ttf', Roboto)
  doc.addFileToVFS('Roboto-bold.ttf', RobotoBold)
  doc.addFont('Roboto-normal.ttf', 'Roboto', 'normal')
  doc.addFont('Roboto-bold.ttf', 'Roboto', 'bold')
  doc.setFont('Roboto', 'normal')
}
