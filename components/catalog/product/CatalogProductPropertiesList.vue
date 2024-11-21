<template>
  <dl ref="list" class="catalog-product-properties-list">
    <div
      v-for="(property, index) in visibleProperties"
      :key="`prop-${index}`"
      class="list-item"
    >
      <dt>
        <span>{{ property?.property?.name }}</span>
      </dt>
      <dd>
        {{ property?.value }}
        <span v-if="property?.property_unit">
          {{ property?.property_unit?.name }}
        </span>
      </dd>
    </div>
  </dl>
</template>

<script>
export default {
  props: {
    properties: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      visibleProperties: [],
    }
  },

  created() {
    this.visibleProperties = [...this.properties]
  },

  mounted() {
    this.shortenList()
  },

  methods: {
    shortenList() {
      /* Remove properties that do not fit in max height */
      const list = this.$refs.list
      for (let i = 0; i < this.visibleProperties.length; i++) {
        if (list?.scrollHeight > list?.clientHeight) {
          list.removeChild(list.lastChild)
          this.visibleProperties.pop()
        } else {
          break
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.catalog-product-properties-list {
  max-height: 22rem;
  font-size: $font-size-2;
  line-height: 1.4;
  color: $gray-500;
  overflow: hidden;

  .list-item {
    display: flex;
    align-items: flex-end;
    margin-bottom: 0.5rem;
    overflow: hidden;
  }

  dt {
    position: relative;
    flex: 0 0 57%;
    margin: 0;
    padding-right: $grid-gutter-width;
    font-weight: $font-weight-normal;
    overflow: hidden;

    &::after {
      display: inline-block;
      content: '';
      position: absolute;
      bottom: 0.375em;
      width: 100%;
      height: $border-width;
      background-image: linear-gradient(
        to right,
        transparent 50%,
        $gray-500 50%
      );
      background-repeat: repeat-x;
      background-size: 4px $border-width;
    }
  }

  dd {
    flex: 0 0 43%;
    min-width: 0;
    margin: 0;
    padding-left: 0.125rem;
    font-weight: $font-weight-normal;
    word-break: break-word;
    hyphens: auto;
    color: $body-color;
  }
}
</style>
