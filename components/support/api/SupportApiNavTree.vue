<template>
  <div>
    <div class="d-flex align-items-start">
      <span v-if="hasChildren" class="navbar-text text-muted">
        {{ index }}. {{ item.text }}
      </span>

      <b-link
        v-else
        :class="{ active: isActive }"
        class="nav-link"
        @click="$emit('input', index)"
      >
        {{ index }}. {{ item.text }}
      </b-link>

      <span v-if="item.badge" :class="`badge-${item.badge}`" class="badge">{{
        item.badge
      }}</span>
    </div>

    <ul v-if="hasChildren" class="nav">
      <li
        v-for="(child, childIndex) in item.items"
        :key="`child-${childIndex}`"
      >
        <SupportApiNavTree
          :active-index="activeIndex"
          :index="`${index}.${childIndex + 1}`"
          :item="child"
          @input="$emit('input', $event)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    activeIndex: {
      type: [String, Number],
      default: '',
    },
    index: {
      type: [String, Number],
      default: '',
    },
    item: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    hasChildren() {
      return Boolean(this.item?.items?.length)
    },

    isActive() {
      return this.activeIndex === this.index
    },
  },
}
</script>
