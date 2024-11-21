<template>
  <b-container tag="main">
    <AppBreadcrumbs :items="breadcrumbs" />

    <b-row class="mb-32 mb-lg-64">
      <b-col lg="7" class="mb-32">
        <h1
          class="h2 mb-32"
          v-html="$t('calculators.masterTool.astraBox.title')"
        />

        <div class="lead mb-32" v-html="$t('description')"></div>
        <b-button
          href="https://ekfgroup.com/uploads/products/0B6A228EBA3DD7BB72D1164D5835BD9A.xlsx"
          variant="primary"
        >
          {{ $t('download') }}
        </b-button>
        <small class="form-text text-muted">
          {{ $t('fileFormat') }}, {{ $t('fileSize') }}
        </small>
      </b-col>
      <b-col lg="5" class="mb-32">
        <img
          :alt="$t('calculators.masterTool.astraBox.title')"
          src="https://ekfgroup.com/uploads/podderzhka/astra-box.jpg"
          class="img-fluid"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mindboxViewCalculator } from '@/utils/mindbox'

export default {
  data() {
    return {
      breadcrumbs: [
        { text: 'calculators.title', to: '/calculators' },
        { text: 'calculators.masterTool.title', to: '/calculators/mastertool' },
        { text: 'calculators.masterTool.astraBox.title', active: true },
      ],
    }
  },
  head() {
    return {
      title: `${this.$t('calculators.masterTool.astraBox.title')} — EKF`,
    }
  },
  mounted() {
    mindboxViewCalculator(this.$t('calculators.masterTool.astraBox.title'))
  },
}
</script>

<i18n>
{
  "en": {
    "description": "<p>The&nbsp;configurator is&nbsp;intended for&nbsp;drawing up a&nbsp;specification of&nbsp;Astra series telecommunication cabinets with&nbsp;a&nbsp;choice of&nbsp;additional accessories. Astra cabinets are used to&nbsp;house active and&nbsp;passive telecommunication equipment. There is a&nbsp;wide range of&nbsp;wall and&nbsp;floor server cabinets, as&nbsp;well as&nbsp;server racks.</p><p>The&nbsp;configurator allows you to&nbsp;select the&nbsp;cabinet depending on&nbsp;the&nbsp;type, design, dimensions, door type, and&nbsp;the&nbsp;need for&nbsp;rear maintenance.</p>Cable organizers, cable rings, optical crosses, stationary shelves, console shelves, keyboard shelves, false panels can be added to&nbsp;the&nbsp;specification as&nbsp;additional accessories.</p>",
    "download": "Download configurator",
    "fileFormat": "XLSB file",
    "fileSize": "3 MB"
  },
  "ru": {
    "description": "<p>Конфигуратор предназначен для&nbsp;составления спецификации телекоммуникационных шкафов серии Astra с&nbsp;возможностью выбора дополнительных аксессуаров. Шкафы Astra используются для&nbsp;размещения активного и&nbsp;пассивного телекоммуникационного оборудования. В&nbsp;широком ассортименте представлены навесные и&nbsp;напольные серверные шкафы, а&nbsp;также серверные стойки.</p><p>Конфигуратор позволяет выбрать шкаф в&nbsp;зависимости от&nbsp;типа, исполнения, габаритов, типа двери, необходимости заднего обслуживания.</p><p>В&nbsp;качестве дополнительных аксессуаров в&nbsp;спецификацию можно добавить кабельные органайзеры, кабельные кольца, кроссы оптические, стационарные полки, консольные полки, клавиатурные полки, фальшпанели.</p>",
    "download": "Скачать конфигуратор",
    "fileFormat": "Файл XLSB",
    "fileSize": "3 МБ"
  }
}
</i18n>
