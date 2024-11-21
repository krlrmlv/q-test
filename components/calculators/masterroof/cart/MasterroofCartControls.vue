<template>
  <b-row align-v="center" class="justify-content-md-end">
    <b-col cols="12" md="auto" order-md="1" class="mb-24 mb-md-0">
      <b-button
        :disabled="cartLoading"
        variant="primary"
        block
        @click="addToCart"
      >
        <div v-if="cartLoading" class="spinner-wrapper mr-8">
          <b-spinner small />
        </div>
        <svg-icon
          name="cart-add-24"
          width="24"
          height="24"
          class="mr-8"
          aria-hidden="true"
        />
        {{ $t('cart.addToCart') }}
      </b-button>
    </b-col>
    <b-col cols="12" md="auto" order-md="0" class="mb-16 mb-md-0">
      <b-button
        :disabled="pdfLoading"
        variant="link"
        class="btn-download"
        block
        @click="savePdf"
      >
        <div v-if="pdfLoading" class="spinner-wrapper mr-8">
          <b-spinner small />
        </div>
        <svg-icon
          v-else
          name="file/pdf-24"
          width="24"
          height="24"
          class="mr-8"
          aria-hidden="true"
        />
        {{ $t('global.downloadPdf') }}
      </b-button>
    </b-col>
  </b-row>
</template>

<script>
import { BSpinner } from 'bootstrap-vue'
import { mapActions, mapGetters } from 'vuex'
import autoTable from 'jspdf-autotable'
import html2canvas from 'html2canvas'
import JsPDF from 'jspdf'
import { embedFonts } from '@/utils/pdf'

export default {
  components: { BSpinner },

  data() {
    return {
      cartLoading: false,
      pdfLoading: false,
    }
  },

  computed: {
    ...mapGetters('cart', ['cartProducts']),
    ...mapGetters('masterroof', { mrCart: 'cart', i18n: 'i18n' }),
    pdfDate() {
      const now = new Date()
      const datestring = now.toLocaleDateString(this.$i18n.locale, {
        dateStyle: 'medium',
      })
      return `${this.$t(`${this.i18n}.estimateDate`)} ${datestring}`
    },

    pdfDescription() {
      return this.$t(`${this.i18n}.descriptionShort`)
    },

    pdfTitle() {
      return this.$t(`${this.i18n}.title`)
    },

    tableBody() {
      const rows = []
      const productRows = this.mrCart.map(
        ({ name, quantity_not_rounded, vendor_code }) => [
          { content: name },
          { content: vendor_code },
          { content: quantity_not_rounded, styles: { halign: 'center' } },
        ]
      )
      rows.push(...productRows)
      return rows
    },

    tableHead() {
      const headStyles = { fillColor: 160 }
      return [
        [
          {
            content: this.$t(`${this.i18n}.cart.fields.name`),
            styles: headStyles,
          },
          {
            content: this.$t(`${this.i18n}.cart.fields.vendor`),
            styles: headStyles,
          },
          {
            content: this.$t(`${this.i18n}.cart.fields.quantity`),
            styles: headStyles,
          },
        ],
      ]
    },
  },

  methods: {
    ...mapActions('cart', ['cartUpsertBulk', 'fetchCart']),
    ...mapActions('masterroof', ['clearCart']),

    scroll() {
      const target = document.getElementById('masterroof-form-controls-reset')
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' })
    },

    async addToCart() {
      this.cartLoading = true

      await this.fetchCart()
      const products = this.mrCart.reduce((acc, product) => {
        const mrProduct = acc.find(
          ({ product_id }) => product_id === product?.id
        )
        if (mrProduct) {
          mrProduct.quantity =
            Number(mrProduct.quantity || 0) + Number(product?.quantity)
        } else {
          const cartProduct = this.cartProducts?.find(
            ({ id }) => id === product?.id
          )
          const quantity =
            Number(cartProduct?.cart?.quantity || 0) + product?.quantity

          acc.push({ product_id: product?.id, quantity })
        }
        return acc
      }, [])

      if (products?.length) {
        const source = 'Калькулятор - MasterRoof'
        await this.cartUpsertBulk({ products, source })
      }
      this.$store.dispatch('masterroof/changeAddedToCart', true)
      this.clearCart()

      this.cartLoading = false
      this.scroll()
    },

    async savePdf() {
      this.pdfLoading = true

      const marginY = 15
      const marginX = 15
      const textColor = [32, 35, 40]
      const doc = new JsPDF('l', 'mm', 'a4')

      let offsetY = marginY

      embedFonts(doc)
      doc.setTextColor(...textColor)

      /* add header logo */
      const logoEl = document.querySelector('.masterroof-logo')
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

      doc.save('masterroof.pdf')

      this.pdfLoading = false
    },
  },
}
</script>

<style lang="scss" scoped>
.btn-download {
  padding: 0;
  text-align: left;
  border: none;
  color: $secondary;

  &:focus,
  &:hover {
    text-decoration: none;
  }
}

.spinner-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px; /* same size as icon */
  height: 24px;
}
</style>
