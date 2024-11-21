<template>
  <div class="catalog-filter">
    <p class="h7">{{ title }}</p>

    <b-form-checkbox-group>
      <ul class="list-unstyled mb-0">
        <li
          v-for="(option, index) in visibleOptions"
          :key="`option-visible-${index}`"
          class="pb-4"
        >
          <b-form-checkbox
            :checked="checked"
            :disabled="disabled"
            :value="option.value"
            @change="$emit('change', $event)"
          >
            {{ option.text }}
          </b-form-checkbox>
        </li>
      </ul>

      <b-collapse v-if="collapseVisible" v-model="collapseOpen">
        <ul class="list-unstyled mb-0">
          <li
            v-for="(option, index) in hiddenOptions"
            :key="`option-hidden-${index}`"
            class="pb-4"
          >
            <b-form-checkbox
              :checked="checked"
              :disabled="disabled"
              :value="option.value"
              @change="$emit('change', $event)"
            >
              {{ option.text }}
            </b-form-checkbox>
          </li>
        </ul>
      </b-collapse>

      <b-button
        v-show="collapseVisible"
        :class="collapseOpen ? 'not-collapsed' : 'collapsed'"
        size="sm"
        variant="link"
        class="collapse-toggle"
        @click="collapseOpen = !collapseOpen"
      >
        <span v-text="$t(`catalog.${collapseOpen ? 'collapse' : 'showAll'}`)" />
        <svg-icon
          name="caret"
          width="8"
          height="4"
          class="icon-caret ml-8"
          aria-hidden="true"
        />
      </b-button>
    </b-form-checkbox-group>
  </div>
</template>

<script>
import { BFormCheckboxGroup, BFormCheckbox, BCollapse } from 'bootstrap-vue'

export default {
  components: {
    BFormCheckboxGroup,
    BFormCheckbox,
    BCollapse,
  },

  props: {
    categories: {
      type: Array,
      default: () => [],
    },
    checked: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    limit: {
      type: Number,
      default: 12,
    },
    title: {
      type: String,
      default: null,
    },
    visible: {
      type: Number,
      default: 8,
    },
  },

  data() {
    return {
      collapseOpen: false,
    }
  },

  computed: {
    collapseVisible() {
      return Boolean(this.hiddenOptions?.length)
    },

    visibleOptions() {
      if (this.categories?.length <= this.limit) {
        return this.categories
      }
      return this.categories?.slice(0, this.visible)
    },

    hiddenOptions() {
      if (this.categories?.length <= this.limit) {
        return []
      }
      return this.categories?.slice(this.visible)
    },
  },
}
</script>

<style lang="scss" scoped>
.collapse-toggle {
  margin-top: 0.25rem;
  padding: 0;
  text-decoration: none;
  border: none;
  color: $secondary;
}
</style>
