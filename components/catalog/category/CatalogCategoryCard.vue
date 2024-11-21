<template>
  <div class="card card-catalog-category">
    <b-row class="flex-nowrap">
      <b-col sm="auto" class="d-none d-sm-block">
        <div class="card-image">
          <b-img-lazy
            :src="$getStaticImage(category.image, 146)"
            :alt="category.name"
            width="146"
            height="146"
          />
        </div>
      </b-col>

      <b-col sm="auto" class="flex-fill">
        <div class="card-body">
          <h5 class="mb-8">
            <b-link
              :to="localePath(`/catalog/${category.slug}`)"
              class="text-reset text-decoration-none"
            >
              {{ category.name }}
            </b-link>
          </h5>

          <ul class="list-unstyled mb-0">
            <li
              v-for="(child, index) in visibleChildren"
              :key="`visible-child-${category.slug}-${index}`"
              class="pb-8"
            >
              <b-link
                :to="localePath(`/catalog/${child.slug}`)"
                class="category-child"
              >
                {{ child.name }}
              </b-link>
            </li>
          </ul>

          <b-collapse v-if="collapseVisible" v-model="collapseOpen">
            <ul class="list-unstyled mb-0">
              <li
                v-for="(child, index) in hiddenChildren"
                :key="`hidden-child-${category.slug}-${index}`"
                class="pb-8"
              >
                <b-link
                  :to="localePath(`/catalog/${child.slug}`)"
                  class="category-child"
                >
                  {{ child.name }}
                </b-link>
              </li>
            </ul>
          </b-collapse>

          <b-button
            v-if="collapseVisible"
            :class="collapseOpen ? 'not-collapsed' : 'collapsed'"
            size="sm"
            variant="link"
            class="collapse-toggle"
            @click="collapseOpen = !collapseOpen"
          >
            <span
              v-text="$t(`catalog.${collapseOpen ? 'collapse' : 'showAll'}`)"
            />
            <svg-icon
              name="caret"
              width="8"
              height="4"
              class="icon-caret ml-8"
              aria-hidden="true"
            />
          </b-button>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { BCollapse, BImgLazy } from 'bootstrap-vue'

export default {
  name: 'CatalogCategoryCard',

  serverCacheKey: ({ category, locale }) =>
    `${locale}::${category.id}::${category.created_at}`,

  components: {
    BCollapse,
    BImgLazy,
  },

  props: {
    category: {
      type: Object,
      default: () => ({}),
    },
    limit: {
      type: [String, Number],
      default: 5,
    },
    locale: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      collapseOpen: false,
    }
  },

  computed: {
    collapseVisible() {
      return Boolean(this.hiddenChildren?.length)
    },
    hiddenChildren() {
      return this.category?.children?.slice(Number(this.limit)) ?? []
    },
    visibleChildren() {
      return this.category?.children?.slice(0, Number(this.limit)) ?? []
    },
  },
}
</script>

<style lang="scss" scoped>
.card-catalog-category {
  font-size: $font-size-2;
  line-height: math.div($font-size-base, $font-size-2) * 1.2;
}

.card-image > img {
  object-fit: contain;
}

.card-body {
  padding: 0;
}

.category-child {
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: none;
    color: $primary;
  }
}

.collapse-toggle {
  padding: 0;
  text-decoration: none;
  border: none;
  color: $secondary;
}

@include media-breakpoint-up(sm) {
  .card-catalog-category {
    height: 100%;
    padding: 1.5rem;
    transition: $transition-base;
    transition-property: box-shadow;

    &:hover {
      box-shadow: $box-shadow;
    }
  }

  .card-image {
    max-width: 146px;
  }
}

@include media-breakpoint-up(lg) {
  .card-catalog-category {
    min-height: 280px;
  }
}
</style>
