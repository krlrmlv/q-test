<template>
  <div class="mastersticker-module-create">
    <b-dropdown
      :aria-label="$t('calculators.masterSticker.addDeviceSelect', locale)"
      :title="$t('calculators.masterSticker.addDeviceSelect', locale)"
      size="sm"
      variant="link"
      toggle-class="btn-icon text-reset"
      block
      dropright
      no-caret
    >
      <template #button-content>
        <svg-icon
          name="ellipsis-24"
          width="24"
          height="24"
          aria-hidden="true"
        />
      </template>

      <b-dropdown-item
        v-for="moduleType in moduleTypes"
        :key="moduleType.id"
        @click="moduleCreate(moduleType.id)"
      >
        {{ $t(`calculators.masterSticker.moduleTypes.${moduleType.id}`, locale) }}
      </b-dropdown-item>
    </b-dropdown>

    <b-button
      :aria-label="$t('calculators.masterSticker.addDevice', locale)"
      :title="$t('calculators.masterSticker.addDevice', locale)"
      size="sm"
      variant="link"
      class="flex-fill btn-icon text-reset"
      block
      @click="moduleCreate('default')"
    >
      <svg-icon name="plus-24" width="24" height="24" aria-hidden="true" />
    </b-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { BDropdown, BDropdownItem } from 'bootstrap-vue'

export default {
  components: {
    BDropdown,
    BDropdownItem,
  },

  computed: {
    ...mapGetters('mastersticker', ['locale', 'moduleTypeById', 'moduleTypes']),

    moduleTypeOptions() {
      return this.moduleTypes.map(({ text, id }) => {
        return { text, value: id }
      })
    },
  },

  methods: {
    moduleCreate(moduleType = 'default') {
      this.$emit('create', moduleType)
    },
  },
}
</script>

<style lang="scss" scoped>
.mastersticker-module-create {
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  width: 8.9mm;
  padding: 0 0.5mm;
  border: $border-width solid $border-color;
  border-left: none;
  color: $gray-500;
  background-color: $gray-100;
  transition: $transition-base;
  transition-property: color, background-color;

  &:hover {
    color: $gray-700;
    background-color: $gray-200;
  }

  ::v-deep {
    .dropdown-menu {
      margin-top: -$border-width;
      margin-left: -$border-width;
    }
  }
}
</style>
