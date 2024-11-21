<template>
  <b-container>
    <div v-if="!$route.query.is_group">
      <h1 class="fs-7 d-lg-none mb-16 mb-sm-24">{{ product.name }}</h1>
      <p class="d-lg-none text-gray mb-8">
        {{ product.vendor_code }}
      </p>
      <b-row class="mb-24">
        <b-col md="3" order="2" order-sm="1" class="text-center text-sm-left">
          <img
            :src="$getCdnImage(`/products/${product.image}`, 250)"
            :alt="product.name"
            class="img-fluid"
          />
        </b-col>
        <b-col md="9" order="1">
          <h1 class="h3 d-none d-lg-block mb-24">{{ product.name }}</h1>
          <p class="d-none d-lg-block mb-0 text-gray">
            {{ product.vendor_code }}
          </p>
        </b-col>
      </b-row>
    </div>
    <div v-else>
      <h1 class="fs-6 fs-sm-7 mb-32">{{ $t('groupTitle') }}</h1>
    </div>
    <div v-if="product.files">
      <DocumentsFileList :files="product.files" />
    </div>
  </b-container>
</template>

<script>
import { mapActions } from 'vuex'
import PRODUCT_DOCUMENTS_QUERY from '~/graphql/documents/ProductDocuments.gql'
import { getCartId } from '~/utils/cart'

export default {
  nuxtI18n: false,
  layout: 'documents',
  async asyncData({ app, error, $graphql, params, query, redirect }) {
    const ALLOWED_LANGUAGES = ['en', 'ru']
    const COOKIE_NAME = 'documents_language'

    if (!params.product) return error({ statusCode: 404 })

    let language = query.language || app.$cookies.get(COOKIE_NAME)
    if (!language) {
      language = app.i18n.locale
    }

    language = ALLOWED_LANGUAGES.includes(language) ? language : 'ru'

    const variables = {
      locale: language,
      slug: params.product,
    }

    $graphql.default.setHeaders({
      'x-hasura-cart-id': await getCartId(app.$cookies),
    })

    const productData = await $graphql.default.request(
      PRODUCT_DOCUMENTS_QUERY,
      variables
    )

    const [product] = productData.product

    if (!product) return error({ statusCode: 404 })

    if (params.product !== product.slug) {
      redirect(`/documents/${product.slug}`, query)
    }

    product.totalFiles = product.files?.length || 0

    product.files = product.files?.filter((item) => {
      if (variables.locale !== 'ru')
        return (
          item.file_type?.code.includes(` ${variables.locale}`) ||
          item.file_type?.code === 'Datasheet'
        )
      else
        return (
          !item.file_type?.code.match(/\sen|cn$/) &&
          item.file_type?.code !== 'Datasheet'
        )
    })

    if (variables.locale !== 'ru' && product.files?.length === 0) {
      let redirectUrl = `/documents/${product.slug}?language=ru`

      if (query.is_group) redirectUrl += '&is_group=true'

      redirect(redirectUrl)
    }

    return {
      product,
    }
  },
  head() {
    return {
      title: this.product && this.product.name,
    }
  },
  mounted() {
    this.languageSelectAvailable()
  },
  methods: {
    ...mapActions('documents', ['setLanguageSelectAvailable']),

    languageSelectAvailable() {
      this.setLanguageSelectAvailable(
        this.product?.totalFiles > this.product?.files?.length
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.text-gray {
  color: $gray-600;
}
</style>

<i18n>
  {
    "en": {
      "groupTitle": "Documentation and software"
    },
    "ru": {
      "groupTitle": "Документация и ПО"
    }
  }
  </i18n>
