<template>
  <div class="lh-140 mb-md-n8">
    <h4 class="d-none d-md-block mb-32 mb-lg-40">
      {{ title }}
    </h4>

    <div class="documents-grid mb-md-16 mb-lg-0 pb-md-60">
      <template v-for="(group, g) in groupedItems">
        <template v-for="(item, i) in group">
          <component
            v-bind="item.attrs"
            :is="item.isHeading ? 'h6' : 'CatalogDocumentLink'"
            :key="`item-${g}-${i}`"
            :item="item.isHeading ? undefined : item"
          >
            {{ item.name }}
          </component>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CatalogProductTabDocumentation',

  serverCacheKey: ({ locale, parent }) =>
    `${locale}::${parent.id}::${parent.created_at}`,

  props: {
    hasSoftware: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      default: () => [],
    },
    locale: {
      type: String,
      required: true,
    },
    parent: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    groupedItems() {
      /* Group documents by file type id */
      const groupsObject = this.items?.reduce((result, item) => {
        const key = item.file_type_id
        result[key] = result[key] ? [...result[key], item] : [item]
        return result
      }, {})

      const result = []

      let groupSize = 0
      let rowStartMd = 0
      let rowStartXl = 0

      Object.values(groupsObject).forEach((group, g) => {
        if (!Array.isArray(group) || !group.length) return

        /* Calculate heading position in the grid for MD & XL breakpoints */
        const colStartMd = g % 3
        const colStartXl = g % 4
        if (g && g % 3 === 0) rowStartMd += groupSize + 1
        if (g && g % 4 === 0) rowStartXl += groupSize + 1

        /* Get heading classes based on group index & grid position */
        const headingClass = ['documents-grid-item mb-md-4 mb-lg-20']
        if (g > 0) headingClass.push('mt-56')
        if (rowStartMd > 0) headingClass.push('mt-md-60')
        else headingClass.push('mt-md-0')
        if (rowStartXl > 0) headingClass.push('mt-xl-60')
        else headingClass.push('mt-xl-0')

        const heading = {
          isHeading: true,
          attrs: {
            class: headingClass,
            style: {
              '--col-start-md': colStartMd + 1,
              '--col-start-xl': colStartXl + 1,
              '--row-start-md': rowStartMd + 1,
              '--row-start-xl': rowStartXl + 1,
            },
          },
          name: group[0].name_plural,
        }

        const documents = group.map((doc, d) => ({
          ...doc,
          attrs: {
            class: 'documents-grid-item mb-16 mb-md-0',
            style: {
              '--col-start-md': colStartMd + 1,
              '--col-start-xl': colStartXl + 1,
              '--row-start-md': rowStartMd + d + 2,
              '--row-start-xl': rowStartXl + d + 2,
            },
          },
        }))

        /* Add group with heading to results array */
        result.push([heading, ...documents])

        /* Update previous maximum group length */
        if (group.length > groupSize) {
          groupSize = group.length
        }
      })

      return result
    },

    title() {
      return this.$t(
        `catalog.tabs.documentation.title${
          this.hasSoftware ? 'WithSoftware' : ''
        }`
      )
    },
  },
}
</script>

<style lang="scss" scoped>
@include media-breakpoint-up(md) {
  .documents-grid {
    display: grid;
    gap: 1rem 1.5rem;
    grid-template-columns: repeat(3, 1fr);
  }

  .documents-grid-item {
    align-self: flex-start;
    grid-column-start: var(--col-start-md);
    grid-row-start: var(--row-start-md);
  }
}

@include media-breakpoint-up(lg) {
  .documents-grid {
    gap: 0 1.5rem;
  }
}

@include media-breakpoint-up(xl) {
  .documents-grid {
    grid-template-columns: repeat(4, 1fr);
  }

  .documents-grid-item {
    grid-column-start: var(--col-start-xl);
    grid-row-start: var(--row-start-xl);
  }
}
</style>
