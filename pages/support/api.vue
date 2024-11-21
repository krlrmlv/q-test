<template>
  <main>
    <b-container tag="section" class="support-api pb-32 pb-lg-64">
      <AppBreadcrumbs :items="breadcrumbs" />

      <h1 class="h2">{{ $t('support.api.title') }}</h1>

      <p class="mb-32 mb-lg-64">
        {{ $t('support.api.description') }}
      </p>

      <b-row>
        <b-col lg="4">
          <SupportApiNav
            v-model="index"
            :items="navItems"
            @input="contentShow = true"
          />
        </b-col>

        <b-col lg="8">
          <SupportApiContent
            :index="index"
            :is-first="isFirst"
            :is-last="isLast"
            :visible="contentShow"
            @close="contentShow = false"
            @navigate-back="navigateBack"
            @navigate-forward="navigateForward"
          />
        </b-col>
      </b-row>
    </b-container>
  </main>
</template>

<script>
export default {
  data() {
    return {
      breadcrumbs: [{ text: 'support.api.title', active: true }],
      contentShow: false,
      index: '1',
      navItems: [
        { key: 'general', text: 'Общие положения' },
        { key: 'auth', text: 'Авторизация' },
        { key: 'server', text: 'Работа с\xA0сервером (запросы и\xA0ответы)' },
        { key: 'version', text: 'Версионирование' },
        {
          key: 'methods',
          text: 'API-методы',
          items: [
            {
              key: 'post',
              text: 'API для\xA0отправки данных Партнерами',
              badge: 'post',
              items: [
                {
                  key: 'partner_stocks',
                  text: 'Остатки товаров Партнеров (stocks)',
                },
                {
                  key: 'partner_stocks_pack',
                  text: 'Остатки товаров Партнеров (stocks, пакетная выгрузка)',
                },
                { key: 'sales', text: 'Продажи товаров Партнерами (sales)' },
                {
                  key: 'sales_pack',
                  text: 'Продажи товаров Партнерами (sales, пакетная выгрузка)',
                },
                {
                  key: 'sales_branches',
                  text: 'Продажи товаров филиалами Партнеров (sales-branches)',
                },
                {
                  key: 'product_urls',
                  text: 'URL для карточек товаров (product-urls)',
                },
              ],
            },
            {
              key: 'get',
              text: 'API\xA0для получения данных Партнерами',
              badge: 'get',
              items: [
                {
                  key: 'catalog',
                  text: 'Каталог продукции (catalog)',
                  items: [
                    { key: 'products', text: 'Товары (products)' },
                    { key: 'files', text: 'Файлы продукции (files)' },
                    {
                      key: 'properties',
                      text: 'Характеристики (свойства) товаров (properties)',
                    },
                    { key: 'prices', text: 'Цены продукции (prices)' },
                    {
                      key: 'product_groups',
                      text: 'Группы товаров (product-groups)',
                    },
                    {
                      key: 'product_analogs',
                      text: 'Аналоги товаров (product-analogs)',
                    },
                  ],
                },
                { key: 'stocks', text: 'Остатки (stocks)' },
                { key: 'warehouses', text: 'Склады (warehouses)' },
                {
                  key: 'receipts',
                  text: 'Предполагаемые поступления (receipts)',
                },
                {
                  key: 'sent_data',
                  text: 'Отправленная информация (sent-data)',
                },
              ],
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

  computed: {
    isFirst() {
      return this.index === this.flatIndex[0]
    },

    isLast() {
      return this.index === this.flatIndex[this.flatIndex.length - 1]
    },

    flatIndex() {
      const result = []

      this.navItems.forEach((rootItem, i) => {
        if (!rootItem.items) {
          result.push(`${i + 1}`)
        } else {
          rootItem.items.forEach((l1Item, j) => {
            if (!l1Item.items) {
              result.push(`${i + 1}.${j + 1}`)
            } else {
              l1Item.items.forEach((l2Item, k) => {
                if (!l2Item.items) {
                  result.push(`${i + 1}.${j + 1}.${k + 1}`)
                } else {
                  l2Item.items.forEach((_, l) => {
                    result.push(`${i + 1}.${j + 1}.${k + 1}.${l + 1}`)
                  })
                }
              })
            }
          })
        }
      })

      return result
    },
  },

  methods: {
    navigateBack() {
      const foundIndex = this.flatIndex.findIndex((el) => el === this.index)
      this.index = this.flatIndex[foundIndex > -1 ? foundIndex - 1 : 0]
    },

    navigateForward() {
      const foundIndex = this.flatIndex.findIndex((el) => el === this.index)
      this.index =
        this.flatIndex[
          foundIndex > -1 && foundIndex < this.flatIndex.length - 1
            ? foundIndex + 1
            : 0
        ]
    },
  },
}
</script>

<style lang="scss" scoped>
.support-api {
  ::v-deep {
    pre {
      white-space: pre-wrap;
    }

    .badge {
      flex: 0 0 auto;
      margin-left: 0.5rem;
      padding: 0.375rem 0.5rem;
      font-size: $font-size-2;
      font-weight: $font-weight-medium;
      line-height: inherit;
      text-transform: uppercase;
      color: $white;
    }

    .badge-post {
      background-color: $success;
    }

    .badge-get {
      background-color: $info;
    }
  }
}
</style>

<i18n>
{
  "en": {
    "pageTitle": "API for partners — EKF"
  },
  "ru": {
    "pageTitle": "API для партнеров — EKF"
  }
}
</i18n>
