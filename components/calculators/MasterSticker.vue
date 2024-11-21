<template>
  <ClientOnly>
    <div class="mastersticker-wrapper px-xl-64">
      <MasterStickerSteps class="mb-32" data-html2canvas-ignore="true" />

      <b-container fluid>
        <MasterStickerRail
          v-for="(rail, index) in rails"
          ref="contentToConvert"
          :key="`rail-${index}`"
          :busy-printing="busyPrinting"
          :busy-saving="busySaving"
          :index="index"
          :rail="rail"
          class="mb-32"
          @print="exportPdf(true)"
          @save-pdf="exportPdf"
        />
      </b-container>

      <MasterStickerControls data-html2canvas-ignore="true" />
    </div>
  </ClientOnly>
</template>

<script>
import html2canvas from 'html2canvas'
import JsPDF from 'jspdf'
import { mapGetters, mapActions } from 'vuex'
import { mindboxCalculateCalculator } from '@/utils/mindbox'

export default {
  data() {
    return {
      busyPrinting: false,
      busySaving: false,
      scale: 4,
    }
  },

  computed: {
    ...mapGetters('mastersticker', ['rails']),
  },

  created() {
    if (this.rails.length === 0) this.addRail()
  },

  methods: {
    ...mapActions('mastersticker', ['addRail']),

    async exportPdf(print = false) {
      mindboxCalculateCalculator('MasterSticker')

      const doc = new JsPDF('l', 'mm', 'a4')
      const railRefs = this.$refs.contentToConvert
      const pixelsPerMm = this.getPixelsPerMm()
      const documentHeight = doc.internal.pageSize.getHeight()
      const offsetX = 20
      let offsetY = 0

      if (print) {
        this.busyPrinting = true
      } else {
        this.busySaving = true
      }

      for (let i = 0; i < railRefs.length; i++) {
        await new Promise((resolve) => {
          html2canvas(railRefs[i].$el, {
            allowTaint: true,
            backgroundColor: '#ffffff',
            imageTimeout: 0,
            logging: false,
            scale: this.scale,
            useCORS: true,
          }).then((canvas) => {
            const image = canvas.toDataURL('image/jpeg', 1)
            const imageWidth = canvas.width / this.scale / pixelsPerMm
            const imageHeight = canvas.height / this.scale / pixelsPerMm

            doc.addImage(
              image,
              'JPEG',
              offsetX,
              offsetY,
              imageWidth,
              imageHeight,
              undefined,
              'FAST'
            )

            offsetY += imageHeight

            if (i === railRefs.length - 1) {
              if (print) {
                doc.autoPrint()
                doc.output('dataurlnewwindow')
              } else {
                doc.save('sample.pdf')
              }
              this.busyPrinting = false
              this.busySaving = false
            } else if (offsetY + imageHeight > documentHeight) {
              doc.addPage()
              offsetY = 0
            }
            resolve()
          })
        })
      }
    },

    /* Calculate screen density by creating element, setting its CSS width
     * to 1mm and then getting its pixel width */

    getPixelsPerMm() {
      const div = document.createElement('DIV')

      div.style.position = 'fixed'
      div.style.left = '100%'
      div.style.top = '100%'
      div.style.width = '1mm'

      document.body.appendChild(div)

      const ratio =
        Math.round(div.getBoundingClientRect().width * 10000) / 10000

      div.remove()

      return ratio
    },
  },
}
</script>

<style lang="scss" scoped>
.mastersticker-wrapper {
  position: relative;
  z-index: 1;
}

@include media-breakpoint-up(sm) {
  .mastersticker-wrapper {
    ::v-deep .mastersticker-aside {
      width: 15rem;
    }
  }
}
</style>
