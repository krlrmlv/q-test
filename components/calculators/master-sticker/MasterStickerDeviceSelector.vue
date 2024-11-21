<template>
  <b-dropdown
    class="position-static"
    menu-class="module-config-pane module-config-pane-right"
    size="sm"
    toggle-class="module-config-toggle"
    variant="light"
    block
    dropright
    no-caret
  >
    <template #button-content>
      <span class="toggle-caption">
        {{ moduleTypeLabel(value) }}
      </span>

      <svg-icon name="caret" width="8" height="4" aria-hidden="true" />
    </template>

    <template #default="{ hide }">
      <li role="presentation" class="d-md-none dropdown-header">
        <b-link
          role="button"
          class="d-flex align-items-center text-reset"
          @click="hide"
        >
          <svg-icon
            name="chevron-left-24"
            width="24"
            height="24"
            aria-hidden="true"
          />
          <span class="ml-8">{{ $t('global.back', locale) }}</span>
        </b-link>
      </li>

      <li role="presentation" class="dropdown-content">
        <MasterStickerDeviceEditor
          v-if="editMode"
          :module-type="deviceType"
          @close="editMode = false"
          @delete="$emit('change', 'default')"
        />

        <ul v-else class="list-unstyled m-0 p-0">
          <b-dropdown-item-button
            v-for="(moduleType, index) in moduleTypes"
            :key="`module-type-${index}`"
            :active="value === moduleType.id"
            @click.capture.native.stop="$emit('change', moduleType.id)"
          >
            {{ moduleTypeLabel(moduleType.id) }}
          </b-dropdown-item-button>
        </ul>
      </li>

      <li role="presentation" class="dropdown-footer">
        <b-row>
          <b-col cols="6">
            <b-button size="sm" variant="gray-200" block @click="editDevice">
              {{ $t('calculators.masterSticker.edit', locale) }}
            </b-button>
          </b-col>

          <b-col cols="6">
            <b-button size="sm" variant="gray-200" block @click="createDevice">
              {{ $t('calculators.masterSticker.create', locale) }}
            </b-button>
          </b-col>
        </b-row>
      </li>
    </template>
  </b-dropdown>
</template>

<script>
import { mapGetters } from 'vuex'
import { BDropdown, BDropdownItemButton } from 'bootstrap-vue'

export default {
  components: {
    BDropdown,
    BDropdownItemButton,
  },

  props: {
    value: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      deviceType: null,
      editMode: false,
    }
  },

  computed: {
    ...mapGetters('mastersticker', [
      'locale',
      'moduleTypeCustomText',
      'moduleTypeIsCustom',
      'moduleTypes',
    ]),
  },

  methods: {
    createDevice() {
      this.deviceType = null
      this.editMode = true
    },

    editDevice() {
      this.deviceType = this.value
      this.editMode = true
    },

    moduleTypeLabel(moduleType) {
      return (
        this.moduleTypeCustomText(moduleType) ||
        this.$t(
          `calculators.masterSticker.moduleTypes.${moduleType}`,
          this.locale
        )
      )
    },
  },
}
</script>
