<template>
  <main>
    <b-container tag="section" class="pb-32 pb-lg-64">
      <AppBreadcrumbs :items="breadcrumbs" />

      <h1 class="h2">{{ $t('support.software.title') }}</h1>

      <p class="mb-32 mb-lg-64">{{ $t('support.software.description') }}</p>

      <b-row class="mb-8">
        <b-col
          v-for="(item, index) in items"
          :key="`col-${index}`"
          md="6"
          lg="4"
          class="mb-16 mb-lg-24"
        >
          <SupportSoftwareCard :item="item" />
        </b-col>
      </b-row>
    </b-container>
  </main>
</template>

<script>
export default {
  data() {
    return {
      breadcrumbs: [{ text: 'support.software.title', active: true }],
      items: [
        {
          alt: this.$t('proDesign.alt'),
          description: this.$t('proDesign.description'),
          fileLinks: [
            {
              text: this.$t('proDesign.linkText'),
              url: 'https://ekfgroup.com/uploads/podderzhka/prodesign/PRO_Design_setup.zip',
            },
          ],
          image: '/images/support/software/prodesign.svg',
        },
        {
          alt: this.$t('epro.alt'),
          description: this.$t('epro.description'),
          image: '/images/support/software/epro24site.svg',
          to: this.localePath('/epro'),
        },
        {
          alt: this.$t('meterPro.alt'),
          description: this.$t('meterPro.description'),
          fileLinks: [
            {
              class: 'text-secondary',
              text: this.$t('meterPro.linkTextManual'),
              url: 'https://ekfgroup.com/uploads/products/AA15E7D53A0EA5D268716CB801A54A93.pdf',
            },
            {
              text: this.$t('meterPro.linkText'),
              url: 'https://ekfgroup.com/uploads/products/18593882B7902E94D76F2F7CF59632FA.zip',
            },
          ],
          image: '/images/support/software/meterpro.svg',
          title: this.$t('meterPro.title'),
        },
        {
          alt: this.$t('masterTuner.alt'),
          description: this.$t('masterTuner.description'),
          fileLinks: [
            {
              text: this.$t('masterTuner.linkText'),
              url: 'https://ekfgroup.com/uploads/products/C0C32BFF1D913A508A390CCF866E504F.rar',
            },
          ],
          image: '/images/support/software/mastertuner.svg',
          title: this.$t('masterTuner.title'),
        },
        {
          alt: this.$t('app.alt'),
          appLinks: {
            apple: 'https://apps.apple.com/us/app/ekf/id1482637366',
            google:
              'https://play.google.com/store/apps/details?id=com.ekfgroup.ekfapp',
          },
          description: this.$t('app.description'),
          image: '/images/support/software/ekf-app.svg',
        },
        {
          alt: this.$t('homeConnect.alt'),
          appLinks: {
            apple:
              'https://apps.apple.com/ru/app/ekf-connect-home/id6474079393',
            google:
              'https://play.google.com/store/apps/details?id=home.connect.ekf&hl=en_US',
            huawei: 'https://appgallery.huawei.com/app/C110524651',
          },
          description: this.$t('homeConnect.description'),
          image: '/images/support/software/home-connect.svg',
          title: this.$t('homeConnect.title'),
        },
        {
          alt: this.$t('wifiTimer.alt'),
          appLinks: {
            apple: 'https://apps.apple.com/by/app/ekf-wifi-timer/id1539423498',
            google:
              'https://play.google.com/store/apps/details?id=com.ekfgroup.ekftimer',
          },
          description: this.$t('wifiTimer.description'),
          image: '/images/support/software/wifi-timer.svg',
          title: this.$t('wifiTimer.title'),
        },
        {
          title: 'SmartLine',
          description: this.$t('smartLine.description'),
          image: '/images/support/software/smartline.svg',
          dropdownFileLinks: [
            {
              text: 'SmartLine 1.18.2 AutoCAD',
              url: 'https://ekfgroup.com/uploads/programs/smartline_1.18.2_autocad_2012-2024.zip',
              formatAndSize: this.$t('smartLine.formatAndSize.1'),
            },
            {
              text: 'SmartLine 1.18.3 nanoCAD',
              url: 'https://ekfgroup.com/uploads/programs/smartline_1.18.3_nanocad_21-22.zip',
              formatAndSize: this.$t('smartLine.formatAndSize.2'),
            },
            {
              text: 'SmartLine 1.18.4 nanoCAD',
              url: 'https://ekfgroup.com/uploads/programs/smartline_1.18.4_nanocad_23.zip',
              formatAndSize: this.$t('smartLine.formatAndSize.3'),
            },
          ],
        },
      ],
    }
  },

  head() {
    return {
      title: this.$t('pageTitle'),
    }
  },
}
</script>

<i18n>
{
  "en": {
    "app": {
      "alt": "EKF app",
      "description": "Mobile app for&nbsp;search for&nbsp;EKF products by&nbsp;name, barcode and&nbsp;ETIM, selection of&nbsp;points of&nbsp;sale and&nbsp;checking the&nbsp;availability of&nbsp;products"
    },
    "epro": {
      "alt": "ePRO 24",
      "description": "Service for&nbsp;remote control and&nbsp;management of&nbsp;electrical equipment in&nbsp;a&nbsp;house, apartment, office and&nbsp;other facilities"
    },
    "homeConnect": {
      "alt": "EKF Connect Home",
      "description": "Mobile app for&nbsp;controlling electrical appliances from&nbsp;anywhere in&nbsp;the&nbsp;world 24/7",
      "title": "EKF Connect Home"
    },
    "meterPro": {
      "alt": "MeterPro",
      "description": "Software for&nbsp;setting up and&nbsp;maintenance of&nbsp;SKAT105 electricity meters",
      "linkText": "Download archive (ZIP, 3.6 MB)",
      "linkTextManual": "Download user guide (PDF, 0.8 MB)",
      "title": "MeterPro"
    },
    "masterTuner": {
      "alt": "MasterTuner",
      "description": "Configurator for&nbsp;controlling frequency converters (up&nbsp;to&nbsp;32 devices) via&nbsp;ModBus protocol with&nbsp;the&nbsp;ability to&nbsp;configure all the&nbsp;parameters of&nbsp;the&nbsp;frequency converter and&nbsp;save them to&nbsp;a&nbsp;file",
      "linkText": "Download archive (RAR, 5 MB)",
      "title": "MasterTuner"
    },
    "pageTitle": "Software — EKF",
    "proDesign": {
      "alt": "PROdesign",
      "description": "Software for&nbsp;the&nbsp;development and&nbsp;debugging of&nbsp;control algorithms for&nbsp;programmable relays PRO-Relay EKF PROxima in&nbsp;FBD (functional block diagrams) and&nbsp;LD (ladder diagrams) languages",
      "linkText": "Download archive (ZIP, 3.5 MB)"
    },
    "wifiTimer": {
      "alt": "Wi-Fi Timer",
      "description": "Mobile app for&nbsp;astrotimer control",
      "title": "Wi-Fi Timer"
    },
    "smartLine": {
      "title": "SmartLine",
      "description": "A&nbsp;module that expands the standard capabilities of&nbsp;familiar CAD systems and provides the ability to&nbsp;design overhead power lines using SIP EKF fittings",
      "formatAndSize": {
        "1": "(ZIP, 16.7 МB)",
        "2": "(ZIP, 11.2 МB)",
        "3": "(ZIP, 11.1 МB)"
      }
    }
  },
  "ru": {
    "app": {
      "alt": "Приложение EKF",
      "description": "Мобильное приложение для&nbsp;поиска продукции EKF по&nbsp;названию, штрих-коду и&nbsp;ETIM, подбора точек продаж и&nbsp;проверки наличия товаров"
    },
    "epro": {
      "alt": "ePRO 24",
      "description": "Сервис для&nbsp;удаленного контроля и&nbsp;управления электрооборудованием в&nbsp;доме, квартире, офисе и&nbsp;на&nbsp;других объектах"
    },
    "homeConnect": {
      "alt": "EKF Connect Home",
      "description": "Мобильное приложение для&nbsp;управления электроприборами из&nbsp;любой точки мира 24/7",
      "title": "EKF Connect Home"
    },
    "meterPro": {
      "alt": "MeterPro",
      "description": "Программное обеспечение для&nbsp;наладки и&nbsp;обслуживания счетчиков электроэнергии СКАТ105",
      "linkText": "Скачать архив (ZIP, 3.6 МБ)",
      "linkTextManual": "Скачать инструкцию (PDF, 0.8 МБ)",
      "title": "MeterPro"
    },
    "masterTuner": {
      "alt": "MasterTuner",
      "description": "Конфигуратор управления преобразователями частоты (до&nbsp;32&nbsp;устройств) по&nbsp;протоколу ModBus с&nbsp;возможностью настройки всех параметров ПЧ и&nbsp;сохранением их в&nbsp;файл",
      "linkText": "Скачать архив (RAR, 5 МБ)",
      "title": "MasterTuner"
    },
    "pageTitle": "Программное обеспечение — EKF",
    "proDesign": {
      "alt": "PROdesign",
      "description": "Программное обеспечение для&nbsp;разработки и&nbsp;отладки алгоритмов управления программируемых реле PRO-Relay EKF&nbsp;PROxima на&nbsp;языках FBD (функциональные блок-схемы) и&nbsp;LD (лестничные диаграммы)",
      "linkText": "Скачать архив (ZIP, 3.5 МБ)"
    },
    "wifiTimer": {
      "alt": "Wi-Fi Timer",
      "description": "Мобильное приложение для&nbsp;управления астротаймером",
      "title": "Wi-Fi Timer"
    },
    "smartLine": {
      "title": "SmartLine",
      "description":"Модуль, расширяющий стандартные возможности привычных САПР и&nbsp;предоставляющий возможность проектировать воздушные линии электропередач с&nbsp;применением арматуры СИП EKF",
      "formatAndSize": {
        "1": "(ZIP, 16.7 МБ)",
        "2": "(ZIP, 11.2 МБ)",
        "3": "(ZIP, 11.1 МБ)"
      }
    }
  }
}
</i18n>
