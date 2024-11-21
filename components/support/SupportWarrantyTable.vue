<template>
  <div
    ref="wrapper"
    :style="{
      '--header-height': `${headerHeight}px`,
      '--thead-left': `${theadCoords.left}px`,
      '--thead-right': `${theadCoords.right}px`,
      '--thead-offset': `${theadCoords.offset}px`,
    }"
    :class="{ 'header-fixed': theadFixed }"
    class="table-responsive-lg bg-white"
  >
    <table ref="table" class="table table-borderless table-warranty">
      <thead ref="thead" class="bg-light">
        <tr class="border-0">
          <th class="col-6 align-middle border-right">
            {{ $t('support.warranty.fields.name') }}
          </th>
          <th class="col-2 align-middle">
            <span v-html="$t('support.warranty.fields.servicePeriod')" />
          </th>
          <th class="col-2 align-middle">
            <span v-html="$t('support.warranty.fields.storagePeriod')" />
          </th>
          <th class="col-2 align-middle">
            <span v-html="$t('support.warranty.fields.lifeTime')" />
          </th>
        </tr>
      </thead>

      <tbody>
        <tr class="row-empty">
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>

        <tr
          v-for="(category, rootIndex) in categories"
          :key="`row-${rootIndex}`"
        >
          <td colspan="4" class="px-0">
            <CardCollapse
              :title="category.name"
              accordion="accordion"
              body-class="pl-0"
              toggle-class="fs-4"
              toggle-variant="secondary"
            >
              <table
                class="table table-borderless table-striped table-warranty-items mt-8 mb-0"
              >
                <tbody>
                  <tr v-if="!(category.children && category.children.length)">
                    <td class="col-6 border-right">
                      {{ category.name }}
                    </td>
                    <td class="col-2 text-center">
                      {{ category.servicePeriod }}
                    </td>
                    <td class="col-2 text-center">
                      {{ category.storagePeriod }}
                    </td>
                    <td class="col-2 text-center">
                      {{ category.lifeTime }}
                    </td>
                  </tr>

                  <tr
                    v-for="(item, itemIndex) in category.children"
                    :key="`item-${rootIndex}-${itemIndex}`"
                  >
                    <td class="col-6 border-right">
                      {{ item.name }}
                    </td>
                    <td class="col-2 text-center">
                      {{ item.servicePeriod }}
                    </td>
                    <td class="col-2 text-center">
                      {{ item.storagePeriod }}
                    </td>
                    <td class="col-2 text-center">
                      {{ item.lifeTime }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardCollapse>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { warrantyCategories } from '~/components/constants/warranty'

export default {
  data() {
    return {
      categories: warrantyCategories,
      headerHeight: null,
      theadFixed: false,
      theadCoords: {
        left: null,
        right: null,
        offset: 0,
      },
    }
  },

  mounted() {
    this.updateHeaderHeight()
    this.fixThead()

    window.addEventListener('scroll', this.updateHeaderHeight, {
      passive: true,
    })
    window.addEventListener('scroll', this.fixThead, {
      passive: true,
    })
    this.$refs.wrapper.addEventListener('scroll', this.updateTheadOffset, {
      passive: true,
    })
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.updateHeaderHeight)
    window.removeEventListener('scroll', this.fixThead)
    this.$refs.wrapper.removeEventListener('scroll', this.updateTheadOffset)
  },

  methods: {
    fixThead() {
      const table = this.$refs.table
      const thead = this.$refs.thead

      if (!table || !thead) return

      if (
        table?.getBoundingClientRect().top <= this.headerHeight &&
        table?.getBoundingClientRect().bottom >
          this.headerHeight + thead.getBoundingClientRect().height
      ) {
        this.theadFixed = true
        this.$refs.wrapper.style.paddingTop = `${
          thead.getBoundingClientRect().height
        }px`
        window.addEventListener('scroll', this.unfixThead, {
          passive: true,
        })
      }
    },

    unfixThead() {
      const table = this.$refs.table
      const thead = this.$refs.thead

      if (!table || !thead) return

      if (
        table?.getBoundingClientRect().top >=
          thead.getBoundingClientRect().top ||
        table?.getBoundingClientRect().bottom <=
          thead.getBoundingClientRect().bottom
      ) {
        this.$refs.wrapper.style.paddingTop = null
        this.theadFixed = false
        window.removeEventListener('scroll', this.unfixThead)
        window.addEventListener('scroll', this.fixThead, {
          passive: true,
        })
      }
    },

    updateHeaderHeight() {
      const header = document.querySelector('.app-header')
      this.headerHeight = header?.getBoundingClientRect().height || 0
    },

    updateTheadOffset() {
      this.theadCoords.offset = this.$refs.wrapper?.scrollLeft * -1
    },
  },
}
</script>

<style lang="scss" scoped>
.table-warranty {
  ::v-deep {
    .card-collapse {
      .card-collapse {
        .card-header {
          padding-left: calc(0.5rem + 16px);
        }
      }
    }
  }
}

.table-warranty-items {
  font-size: $font-size-3;

  tr {
    td {
      padding: 1.25rem;

      &:first-child {
        padding-left: calc(1.5rem + 48px);
      }
    }
  }
}

@include media-breakpoint-down(md) {
  .table-warranty,
  .table-warranty-items {
    width: 720px;
    table-layout: fixed;

    thead {
      width: 720px;
    }

    tr:not(.row-empty) {
      th {
        padding: 0.5rem !important;
      }
    }

    th,
    td {
      font-size: $font-size-2;

      &:first-child {
        width: 330px;
      }

      &:nth-child(2),
      &:nth-child(3),
      &:nth-child(4) {
        width: 130px;
      }
    }
  }

  .table-warranty {
    tr:not(.row-empty) {
      td {
        padding: 0.5rem 0 !important;
      }
    }

    tr.row-empty {
      td {
        padding: 0 !important;
        font-size: 0;
        line-height: 0;
      }
    }
  }

  .table-warranty-items {
    tr:not(.row-empty) {
      td {
        padding: 0.5rem !important;
      }
    }
  }

  .header-fixed {
    .table-warranty {
      thead {
        position: fixed;
        top: var(--header-height);
        left: var(--thead-left);
        right: var(--thead-right);
        transform: translateX(var(--thead-offset));
        z-index: 10;
      }
    }
  }

  ::v-deep {
    .card-header.fs-4 {
      font-size: $font-size-2 !important;
    }
  }
}

@include media-breakpoint-down(sm) {
  .table-warranty,
  .table-warranty-items {
    width: 540px;

    thead {
      width: 540px;
    }

    th,
    td {
      font-size: $font-size-2;

      &:first-child {
        width: 252px;
      }

      &:nth-child(2),
      &:nth-child(3),
      &:nth-child(4) {
        width: 96px;
      }
    }
  }
}

@include media-breakpoint-up(lg) {
  .table-warranty {
    thead {
      position: sticky;
      top: var(--header-height);
      z-index: 1;
    }
  }
}
</style>
