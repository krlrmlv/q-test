<template>
  <b-row class="lh-140 pb-md-48">
    <b-col lg="9" xl="8" class="col-xxl-7">
      <client-only v-if="!ssrDescription">
        <CatalogProductDescriptionText
          v-if="htmlContent || productDescription"
          :link="product.hyperlink"
        >
          <span v-if="htmlContent" v-html="htmlContent"></span>
          <span v-else> {{ productDescription }}</span>
        </CatalogProductDescriptionText>
      </client-only>

      <div v-else>
        <CatalogProductDescriptionText
          v-if="htmlContent || productDescription"
          :link="product.hyperlink"
        >
          <span v-if="htmlContent" v-html="htmlContent"></span>
          <span v-else> {{ productDescription }}</span>
        </CatalogProductDescriptionText>
      </div>

      <div v-if="formattedUsages.length">
        <h4 class="mb-md-24">
          {{ $t('catalog.tabs.specs.application') }}
        </h4>

        <ul class="list-unstyled mb-32 mb-md-48">
          <li
            v-for="(item, index) in formattedUsages"
            :key="`usage-${index}`"
            class="mb-4"
          >
            {{ item }}
          </li>
        </ul>
      </div>

      <div v-if="advantages.length">
        <h4 class="mb-md-24">
          {{ $t('catalog.tabs.specs.advantages') }}
        </h4>

        <b-row class="mb-8 mb-md-24">
          <b-col
            v-for="(advantage, index) in advantages"
            :key="`advantage-${index}`"
            lg="10"
          >
            <div class="media mb-24">
              <div class="media-aside align-self-start mr-16">
                <img
                  :src="advantage.file"
                  :alt="`${$t('catalog.tabs.specs.advantage')} ${index + 1}`"
                  width="88"
                />
              </div>
              <div class="media-body">
                <p class="mb-0">{{ advantage.description }}</p>
              </div>
            </div>
          </b-col>
        </b-row>
      </div>

      <div v-if="formattedAccessories.length">
        <h4 class="mb-md-24">
          {{ $t('catalog.tabs.specs.equipment') }}
        </h4>

        <ol class="list-unstyled">
          <li
            v-for="(item, index) in formattedAccessories"
            :key="`equipment-${index}`"
            class="mb-4"
          >
            {{ item }}
          </li>
        </ol>
      </div>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'CatalogProductTabDescription',

  props: {
    items: {
      type: Object,
      default: () => ({
        accessories: [],
        descriptions: [],
        productDescription: null,
        usages: [],
      }),
    },
    locale: {
      type: String,
      required: true,
    },
    product: {
      type: Object,
      default: () => ({}),
    },
    ssrDescription: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      htmlContent: '',
    }
  },

  async fetch() {
    if (!this.product.html_description) return

    /* Render markdown with minimal set of rules enabled */
    const MarkdownIt = await import('markdown-it')
    /* eslint-disable new-cap */
    const md = new MarkdownIt.default('zero', { breaks: true }).enable([
      'normalize',
      'block',
      'inline',
      'emphasis',
      'link',
      'list',
      'newline',
      'paragraph',
      'strikethrough',
      'text',
    ])

    this.htmlContent = md.render(this.product.html_description)
  },

  computed: {
    accessories() {
      return this.items?.accessories ?? []
    },

    advantages() {
      return this.items?.descriptions ?? []
    },

    formattedAccessories() {
      return this.splitStrings(this.accessories)
    },

    formattedUsages() {
      return this.splitStrings(this.usages)
    },

    productDescription() {
      return this.items?.productDescription
    },

    usages() {
      return this.items?.usages ?? []
    },
  },

  methods: {
    splitStrings(arr) {
      const result = []
      arr.forEach((item) => {
        if (!item) return
        const splitItem = item.toString().split('\n')
        result.push(...splitItem)
      })
      return result
    },
  },
}
</script>
