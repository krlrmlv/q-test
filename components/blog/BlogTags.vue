<template>
  <transition name="fade" mode="out-in">
    <b-row :key="collapsed">
      <b-col
        :lg="collapsed ? 10 : null"
        :xl="collapsed ? 8 : null"
        :offset-xl="collapsed ? 2 : null"
        :order-lg="collapsed ? null : 2"
        cols="12"
      >
        <b-nav :class="{ 'blog-tags-collapsed': collapsed }" class="blog-tags">
          <b-nav-item :active="!activeTag" @click="$emit('change', null)">
            # {{ $t('blog.allTags') }}
            <span v-if="totalCount" class="tag-items-count"
              >{{ totalCount }}
            </span>
          </b-nav-item>

          <b-nav-item
            v-for="(tag, index) in visibleTags"
            :key="`tag-${index}`"
            :active="activeTag === tag.slug"
            @click="$emit('change', tag.slug)"
          >
            # {{ tag.name }}
            <span v-if="tag.totalArticles" class="tag-items-count">
              {{ tag.totalArticles.aggregate.count }}
            </span>
          </b-nav-item>
        </b-nav>
      </b-col>
      <b-col
        v-if="collapseToggleVisible"
        :class="{ show: !collapsed }"
        :lg="collapsed ? 2 : null"
        class="dropdown text-lg-right mb-16 mb-lg-12"
        cols="12"
      >
        <b-button
          :aria-expanded="!collapsed"
          variant="link"
          size="sm"
          class="blog-tags-toggle dropdown-toggle text-secondary"
          aria-haspopup="true"
          @click="collapsed = !collapsed"
        >
          {{ $t('blog.allTags') }}
        </b-button>
      </b-col>
    </b-row>
  </transition>
</template>

<script>
import { BNav, BNavItem } from 'bootstrap-vue'

export default {
  components: {
    BNav,
    BNavItem,
  },

  props: {
    activeTag: {
      type: String,
      default: null,
    },
    tags: {
      type: Array,
      default: () => [],
    },
    totalCount: {
      type: [Number, String],
      default: null,
    },
    visible: {
      type: [Number, String],
      default: 10,
    },
  },

  data() {
    return {
      collapsed: true,
    }
  },

  computed: {
    collapseToggleVisible() {
      return this.tags?.length > this.limit
    },

    limit() {
      return Number(this.visible) || 1
    },

    visibleTags() {
      if (this.collapsed) return this.tags

      return this.tags?.slice(0, this.limit)
    },
  },
}
</script>

<style lang="scss" scoped>
.blog-tags-toggle {
  padding: 0.1875rem 0;
  line-height: #{math.div($font-size-1, $font-size-base) * $line-height-base};
}

.blog-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0 0.5rem;
  margin-bottom: 0.5rem;

  .tag-items-count {
    margin-left: 0.25em;
    color: $gray-500;
  }

  .nav-link {
    display: inline-block;
    margin-bottom: 0.5rem;
    padding: 0.1875rem 0.5rem;
    font-size: $font-size-1;
    text-transform: lowercase;
    border-radius: 0.25rem;
    color: inherit;
    background-color: $gray-200;
    transition: $btn-transition;

    &:hover {
      color: $white;
      background-color: $primary;

      .tag-items-count {
        color: inherit;
      }
    }

    &.active {
      color: $white;
      background-color: $secondary;

      .tag-items-count {
        color: inherit;
      }
    }
  }
}

@include media-breakpoint-up(lg) {
  .blog-tags {
    display: block;
    column-count: 4;
    gap: 0 $grid-gutter-width;
    margin-bottom: -0.5rem;

    &.blog-tags-collapsed {
      display: flex;
      flex-wrap: wrap;
      gap: 0 0.5rem;
    }
  }
}

@include media-breakpoint-up(xl) {
  .blog-tags {
    &.blog-tags-collapsed {
      justify-content: center;
    }
  }
}
</style>
