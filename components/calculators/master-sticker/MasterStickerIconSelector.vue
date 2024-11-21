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
        {{ $t(`calculators.masterSticker.icons.${iconLabel(value)}`, locale) }}
      </span>

      <svg-icon name="caret" width="8" height="4" aria-hidden="true" />
    </template>

    <template #default="{ hide }">
      <li role="presentation" class="dropdown-content">
        <b-form-radio-group
          :checked="value"
          button-variant="white"
          class="icons-grid"
          size="sm"
          buttons
          @input="setIcon($event, hide)"
        >
          <b-form-radio
            v-for="(icon, index) in icons"
            :key="`icon-${index}`"
            :title="icon.label"
            :value="icon.name"
            class="btn-module-icon"
          >
            <svg-icon
              :name="`master-sticker/${icon.name || 'empty'}`"
              aria-hidden="true"
              height="24"
              width="24"
            />
            {{ $t(`calculators.masterSticker.icons.${icon.label}`, locale) }}
          </b-form-radio>
        </b-form-radio-group>
      </li>
    </template>
  </b-dropdown>
</template>

<script>
import { BDropdown, BFormRadioGroup, BFormRadio } from 'bootstrap-vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    BDropdown,
    BFormRadioGroup,
    BFormRadio,
  },

  props: {
    value: {
      type: [Number, String],
      default: null,
    },
  },

  computed: {
    ...mapGetters('mastersticker', ['iconLabel', 'icons', 'locale']),
  },

  methods: {
    setIcon(event, callback) {
      this.$emit('change', event)
      callback()
    },
  },
}
</script>

<style lang="scss" scoped>
.icons-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}

.btn-module-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 0;
  max-width: 100%;
  padding: 0.625rem 0.5rem;
  font-size: $font-size-base * 0.625;
  font-weight: $font-weight-normal;
  line-height: 1;
  border-color: $border-color;

  .icon {
    flex: 0 0 auto;
    margin-bottom: 0.5rem;
  }
}
</style>
