<template>
  <b-button
    variant="white"
    class="btn-icon text-secondary"
    block
    @click="printResult(true)"
  >
    <svg-icon
      name="print-24"
      width="24"
      height="24"
      class="mr-8"
      aria-hidden="true"
    />
    {{ $t('global.print') }}
  </b-button>
</template>

<script>
import autoTable from 'jspdf-autotable'
import html2canvas from 'html2canvas'
import JsPDF from 'jspdf'
import { Roboto, RobotoBold } from '~/utils/jspdf/fonts'
import formatSum from '@/utils/formatSum'
import sendToMindbox from '@/utils/mindbox'

export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    profit: {
      type: [Number, String],
      default: 0,
    },
    total: {
      type: [Number, String],
      default: 0,
    },
  },

  computed: {
    pdfDate() {
      const now = new Date()
      const datestring = now.toLocaleDateString(this.$i18n.locale, {
        dateStyle: 'medium',
      })
      return `${this.$t('calculators.masterCost.estimateDate')} ${datestring}`
    },

    pdfDescription() {
      return this.$t('calculators.masterCost.description')
    },

    pdfProfit() {
      return `${this.formatSum(this.profit, this.$i18n.locale)} ₽`
    },

    pdfProfitLabel() {
      return `${this.$t('calculators.masterCost.youSave')}:`
    },

    pdfTitle() {
      return this.$t('calculators.masterCost.title')
    },

    pdfTotal() {
      return `${this.formatSum(this.total, this.$i18n.locale)} ₽`
    },

    pdfTotalLabel() {
      return `${this.$t('calculators.masterCost.projectCostEkf')}:`
    },

    pdfTotalLabelComment() {
      return this.$t('calculators.masterCost.projectCostEkfComment')
    },

    tableBody() {
      const fillColor = 240
      const rows = []
      this.items.forEach(
        ({ analog, analogs, price, quantity, vendor_code }) => {
          const row = [
            { content: vendor_code, styles: { fillColor, cellWidth: 'wrap' } },
            {
              content: price ? `${price} ₽` : '–',
              styles: { fillColor, cellWidth: 'wrap' },
            },
            { content: quantity, styles: { fillColor, halign: 'center' } },
            {
              content:
                analogs?.[analog]?.vendor_code ||
                this.$t('calculators.masterCost.notFound'),
              styles: {
                textColor: analogs?.[analog] ? [32, 35, 40] : [224, 0, 0],
                cellWidth: 'wrap',
              },
            },
            {
              content: analogs?.[analog] ? analogs[analog].name : '–',
            },
            {
              content: analogs?.[analog] ? `${analogs[analog].price} ₽` : '–',
              styles: { textColor: [50, 194, 55], cellWidth: 'wrap' },
            },
          ]
          if (
            analogs?.[analog]?.assembly &&
            analogs?.[analog]?.assemblies[analogs[analog].assembly]
          ) {
            analogs?.[analog]?.assemblies[
              analogs[analog].assembly
            ].products.forEach((ap, i) => {
              const apRow = [
                {
                  content: i !== 0 ? '' : vendor_code,
                  styles: { fillColor, cellWidth: 'wrap' },
                },
                {
                  content: i !== 0 ? '' : price ? `${price} ₽` : '–',
                  styles: { fillColor, cellWidth: 'wrap' },
                },
                {
                  content: i !== 0 ? '' : quantity,
                  styles: { fillColor, halign: 'center' },
                },
                {
                  content: ap.vendor_code || '-',
                  styles: {
                    textColor: analogs?.[analog] ? [32, 35, 40] : [224, 0, 0],
                    cellWidth: 'wrap',
                  },
                },
                {
                  content: ap.name || '–',
                },
                {
                  content: `${ap.price * ap.assemblyQty} ₽`,
                  styles: { textColor: [50, 194, 55], cellWidth: 'wrap' },
                },
              ]
              rows.push(apRow)
            })
          } else rows.push(row)
        }
      )
      return rows
    },

    tableHead() {
      const headStyles = { fillColor: 160 }
      const headStylesEkf = { fillColor: [58, 135, 114], cellWidth: 'wrap' }
      return [
        [
          {
            content: this.$t('calculators.masterCost.labelVendorCode'),
            styles: headStyles,
          },
          {
            content: this.$t('calculators.masterCost.labelPrice'),
            styles: headStyles,
          },
          {
            content: this.$t('calculators.masterCost.labelCount'),
            styles: headStyles,
          },
          {
            content: this.$t('calculators.masterCost.labelVendorCodeEkf'),
            styles: headStylesEkf,
          },
          {
            content: this.$t('calculators.masterCost.labelNameEkf'),
            styles: headStylesEkf,
          },
          {
            content: this.$t('calculators.masterCost.labelPriceEkf'),
            styles: headStylesEkf,
          },
        ],
      ]
    },
  },
  methods: {
    formatSum,

    async printResult(print = false) {
      this.$emit('set-loading', true)
      sendToMindbox('EKFGroup.SaveCalculation', {
        customerAction: {
          customFields: {
            calculator: 'MasterCost',
          },
        },
      })

      const marginY = 15
      const marginX = 15
      const textColor = [32, 35, 40]
      const doc = new JsPDF('l', 'mm', 'a4')

      let offsetY = marginY

      /* embed custom font with UTF8 support */
      doc.addFileToVFS('Roboto-normal.ttf', Roboto)
      doc.addFileToVFS('Roboto-bold.ttf', RobotoBold)
      doc.addFont('Roboto-normal.ttf', 'Roboto', 'normal')
      doc.addFont('Roboto-bold.ttf', 'Roboto', 'bold')
      doc.setFont('Roboto', 'normal')

      doc.setTextColor(...textColor)

      /* add header logo */
      const logoEl = document.querySelector('.mastercost-logo')
      if (logoEl) {
        const imageHeight = 12
        const canvas = await html2canvas(logoEl, { scale: 4 })
        const image = canvas.toDataURL('image/jpeg', 1)
        const scale = imageHeight / canvas.height
        const imageWidth = canvas.width * scale
        doc.addImage(image, 'JPEG', marginX, offsetY, imageWidth, imageHeight)
        offsetY += imageHeight + 4
      } else {
        doc.setFontSize(36)
        doc.setFont('Roboto', 'bold')
        doc.text(this.pdfTitle, marginX, offsetY, { baseline: 'top' })
        doc.setFont('Roboto', 'normal')
        offsetY += 14
      }

      /* add header subtitle */
      doc.setFontSize(12)
      doc.text(this.pdfDescription, marginX, offsetY, { baseline: 'top' })
      offsetY += 12

      /* add date */
      doc.setFontSize(10)
      doc.setFont('Roboto', 'bold')
      doc.text(this.pdfDate, marginX, offsetY, { baseline: 'top' })
      doc.setFont('Roboto', 'normal')
      offsetY += 7

      /* add results table */
      autoTable(doc, {
        head: this.tableHead,
        body: this.tableBody,
        bodyStyles: {
          font: 'Roboto',
          fontStyle: 'normal',
          textColor: [32, 35, 40],
        },
        headStyles: { font: 'Roboto', fontStyle: 'bold' },
        margin: { left: 15, right: 15, top: 15, bottom: 15 },
        startY: offsetY,
        didDrawPage: ({ cursor, pageCount, pageNumber }) => {
          /* set cursor after the table */
          if (pageNumber === pageCount) {
            offsetY = cursor.y + 10
          }
        },
      })

      /* add total cost */
      const offsetX = doc.internal.pageSize.width - marginX
      doc.setFontSize(12)
      doc.setFont('Roboto', 'bold')
      doc.text(this.pdfTotal, offsetX, offsetY, {
        align: 'right',
        baseline: 'top',
      })
      const totalTextWidth = doc.getTextDimensions(this.pdfTotal).w
      const totalTextHeight = doc.getTextDimensions(this.pdfTotal).h
      doc.setFont('Roboto', 'normal')
      doc.text(this.pdfTotalLabel, offsetX - totalTextWidth - 2, offsetY, {
        align: 'right',
        baseline: 'top',
      })
      offsetY += totalTextHeight + 2

      doc.setFontSize(8)
      doc.setFont('Roboto', 'normal')
      doc.text(this.pdfTotalLabelComment, offsetX, offsetY, {
        align: 'right',
        baseline: 'top',
      })

      /* add profit */
      if (this.profit) {
        doc.setFont('Roboto', 'bold')
        doc.setTextColor(224, 0, 0)
        doc.text(this.pdfProfit, offsetX, offsetY, {
          align: 'right',
          baseline: 'top',
        })
        const profitTextWidth = Math.max(
          doc.getTextDimensions(this.pdfProfit).w,
          totalTextWidth
        )
        doc.setFont('Roboto', 'normal')
        doc.setTextColor(...textColor)
        doc.text(this.pdfProfitLabel, offsetX - profitTextWidth - 2, offsetY, {
          align: 'right',
          baseline: 'top',
        })
      }

      this.$emit('set-loading', false)
      this.$gtm.push({ event: 'ClPrintMascost' })

      if (print) {
        doc.autoPrint()
        doc.output('dataurlnewwindow')
      } else {
        doc.save('mastercost.pdf')
      }
    },
  },
}
</script>
