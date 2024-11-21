<template>
  <div class="lh-140 pb-md-48">
    <template v-if="hasSpecifications">
      <h4 class="border-bottom pb-8">
        {{ $t('catalog.tabs.specs.dataSheet') }}
      </h4>

      <b-row class="mb-16 mb-md-32">
        <b-col
          v-for="(file, index) in specifications"
          :key="`file-${index}`"
          lg="6"
          class="mb-16"
        >
          <FileDownloadLink :item="file" />
        </b-col>
      </b-row>
    </template>

    <template v-if="hasUsages">
      <h4 class="border-bottom pb-8">
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
    </template>

    <template v-if="hasAdvantages">
      <h4 class="border-bottom pb-8">
        {{ $t('catalog.tabs.specs.advantages') }}
      </h4>

      <b-row class="mb-8 mb-md-24">
        <b-col
          v-for="(benefit, index) in advantages"
          :key="`benefit-${index}`"
          cols="6"
          md="4"
          lg="2"
        >
          <div class="mb-8">
            <img :src="benefit.file" :alt="benefit.description" width="88" />
          </div>
          <p class="mb-24">{{ benefit.description }}</p>
        </b-col>
      </b-row>
    </template>

    <template v-if="hasDescriptions">
      <h4 class="border-bottom pb-8">
        {{ $t('catalog.tabs.specs.description') }}
      </h4>

      <b-row class="mb-8 mb-md-24">
        <b-col
          v-for="(item, index) in descriptions"
          :key="`description-${index}`"
          lg="6"
        >
          <div class="media mb-24">
            <div class="media-aside align-self-start mr-16">
              <img
                :src="item.file"
                :alt="`${$t('catalog.tabs.specs.description')} ${index + 1}`"
                width="88"
              />
            </div>
            <div class="media-body">
              <p class="mb-0">{{ item.description }}</p>
            </div>
          </div>
        </b-col>
      </b-row>
    </template>

    <template v-if="hasAccessories">
      <h4 class="border-bottom pb-8">
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
    </template>
  </div>
</template>

<script>
export default {
  name: 'CatalogTabSpecs',

  serverCacheKey: ({ locale, parent }) =>
    `${locale}::${parent.id}::${parent.created_at}`,

  props: {
    accessories: {
      type: Array,
      default: () => [],
    },
    advantages: {
      type: Array,
      default: () => [],
    },
    descriptions: {
      type: Array,
      default: () => [],
    },
    locale: {
      type: String,
      required: true,
    },
    parent: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    specifications: {
      type: Array,
      default: () => [],
    },
    usages: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    formattedAccessories() {
      return this.splitStrings(this.accessories)
    },

    formattedUsages() {
      return this.splitStrings(this.usages)
    },

    hasAccessories() {
      return Boolean(this.formattedAccessories?.length)
    },

    hasAdvantages() {
      return Boolean(this.advantages?.length)
    },

    hasDescriptions() {
      return Boolean(this.descriptions?.length)
    },

    hasSpecifications() {
      return Boolean(this.specifications?.length)
    },

    hasUsages() {
      return Boolean(this.formattedUsages?.length)
    },
  },

  methods: {
    splitStrings(arr) {
      const result = []
      arr.forEach((item) => {
        const splitItem = item.split('\n')
        result.push(...splitItem)
      })
      return result
    },
  },
}
</script>
