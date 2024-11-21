<template>
  <b-dropdown
    variant="link"
    toggle-class="text-reset"
    class="mastercost-analog-dropdown"
  >
    <template #button-content>
      <span ref="tooltipTarget">
        {{ options[value].name }}
      </span>

      <TextOverflowTooltip
        :target="() => $refs.tooltipTarget"
        :title="options[value].name"
        :placement="'top'"
      />
    </template>

    <template #default="{ hide }">
      <b-dropdown-text
        v-for="(option, index) in options"
        :key="index"
        tag="div"
      >
        <b-row
          :class="{
            selected: localValue === index,
            'options-item flex-nowrap mx-n6': true,
          }"
          @click.prevent="
            localValue = index
            hide()
          "
        >
          <b-col cols="9" class="text-name px-8">
            {{ option.name }}
          </b-col>
          <b-col cols="3" class="text-price text-nowrap px-8">
            <p v-if="option.price" class="mb-0">
              {{ formatSum(option.price, $i18n.locale) }}&nbsp;₽
            </p>
          </b-col>
        </b-row>
      </b-dropdown-text>
    </template>
  </b-dropdown>
</template>

<script>
import { BDropdown, BDropdownText } from 'bootstrap-vue'
import formatSum from '@/utils/formatSum'

export default {
  components: {
    BDropdown,
    BDropdownText,
  },

  model: {
    prop: 'value',
    event: 'change',
  },

  props: {
    value: {
      type: [Number, String],
      default: 0,
    },
    options: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    localValue: {
      get() {
        return parseInt(this.value, 10)
      },
      set(newValue) {
        this.$emit('change', newValue)
      },
    },
  },

  methods: { formatSum },
}
</script>

<style lang="scss">
.mastercost-analog-dropdown {
  max-width: 100%;

  .dropdown-toggle {
    display: inline-block;
    position: relative;
    padding: 0 1rem 0 0;
    font-weight: $font-weight-normal;
    line-height: inherit;
    text-align: left;
    text-decoration-color: $dark;
    text-overflow: ellipsis;
    border: none;
    overflow: hidden;

    &::after {
      position: absolute;
      right: 0;
      top: 0.6em;
    }

    &:hover {
      text-decoration-style: solid;
      text-decoration-color: currentColor;
      color: $primary;
    }
  }

  .dropdown-menu {
    width: 25rem;
    max-width: calc(100vw - #{$grid-gutter-width});
    padding: 24px;
    line-height: 1.2;
    white-space: normal;

    li:not(:last-child) {
      margin-bottom: 16px;
    }
    .b-dropdown-text {
      padding: 0;
    }
  }

  .options-item {
    font-weight: $font-weight-normal;
    transition: $transition-base;
    transition-property: 'background-color';
    &:hover {
      cursor: pointer;
      background-color: $gray-200;
    }
    &.selected {
      background-color: $gray-100;
      &:hover {
        cursor: pointer;
        background-color: $gray-200;
      }
    }
    .text-name {
      font-size: 0.875rem;
      line-height: 1.25rem;
    }
    .text-price {
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-end;
      align-items: center;
      font-size: 1rem;
      line-height: 1.125rem;
      font-weight: $font-weight-medium;
    }
  }
}
</style>
