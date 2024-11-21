<template>
  <transition name="fade">
    <div v-if="show" class="mastersticker-module-config" @click.stop>
      <div class="module-config-pane module-config-pane-left">
        <b-form-group
          :label="$t('calculators.masterSticker.config.controlObject', locale)"
          label-size="sm"
          class="mb-12"
        >
          <MasterStickerDeviceSelector
            :value="item.moduleType"
            @change="configUpdate('moduleType', $event)"
          />
        </b-form-group>

        <div v-if="item.moduleType !== 'spacer'">
          <MasterStickerLampColors
            v-if="item.moduleType === 'lamp'"
            :colors="item.lampColors"
            @change="configUpdate('lampColors', $event)"
          />

          <MasterStickerReverseTogglePositions
            v-else-if="item.moduleType === 'reversibleSwitch'"
            :positions="item.reverseTogglePositions"
            @change="configUpdate('reverseTogglePositions', $event)"
          />

          <div v-else>
            <b-form-group
              :label="$t('calculators.masterSticker.config.heading', locale)"
              label-size="sm"
              class="mb-12"
            >
              <b-form-input
                :value="item.heading"
                type="text"
                size="sm"
                debounce="500"
                @input="configUpdate('heading', $event)"
              />
            </b-form-group>

            <b-form-group
              :label="
                $t('calculators.masterSticker.config.description', locale)
              "
              label-size="sm"
              class="mb-12"
            >
              <b-form-textarea
                :value="item.description"
                debounce="500"
                rows="2"
                size="sm"
                class="lh-120"
                style="min-height: 3em"
                @input="configUpdate('description', $event)"
              />
            </b-form-group>

            <b-form-group
              :label="$t('calculators.masterSticker.config.room', locale)"
              label-size="sm"
              class="mb-12"
            >
              <b-form-input
                :value="item.room"
                :disabled="!item.combine"
                type="text"
                size="sm"
                debounce="500"
                class="mb-4"
                @input="configUpdate('room', $event)"
              />

              <b-form-checkbox
                :checked="item.combine"
                size="sm"
                @input="configUpdate('combine', $event)"
              >
                {{ $t('calculators.masterSticker.config.combine', locale) }}
              </b-form-checkbox>
            </b-form-group>

            <b-form-group
              :label="$t('calculators.masterSticker.config.group', locale)"
              label-size="sm"
              class="mb-12"
            >
              <MasterStickerGroupSelector
                :value="item.moduleGroup"
                class="mb-4"
                @change="configUpdate('moduleGroup', $event)"
              />

              <b-form-checkbox
                :checked="item.accent"
                size="sm"
                @input="configUpdate('accent', $event)"
              >
                {{ $t('calculators.masterSticker.config.accent', locale) }}
              </b-form-checkbox>
            </b-form-group>

            <b-form-group
              :label="$t('calculators.masterSticker.config.icon', locale)"
              label-size="sm"
              class="mb-12"
            >
              <MasterStickerIconSelector
                v-if="!item.noIcon"
                :value="item.moduleIcon"
                class="mb-4"
                @change="configUpdate('moduleIcon', $event)"
              />

              <b-form-input
                v-else
                :value="item.label"
                type="text"
                size="sm"
                debounce="500"
                class="mb-4"
                @input="configUpdate('label', $event)"
              />

              <b-form-checkbox
                :checked="item.noIcon"
                size="sm"
                @input="configUpdate('noIcon', $event)"
              >
                {{ $t('calculators.masterSticker.config.noIcon', locale) }}
              </b-form-checkbox>
            </b-form-group>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import {
  BFormGroup,
  BFormInput,
  BFormTextarea,
  BFormCheckbox,
} from 'bootstrap-vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    BFormGroup,
    BFormInput,
    BFormTextarea,
    BFormCheckbox,
  },

  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    show: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapGetters('mastersticker', ['locale']),
  },

  methods: {
    configUpdate(field, value) {
      this.$emit('update', { field, value })
    },
  },
}
</script>

<style lang="scss" scoped>
.mastersticker-module-config {
  position: absolute;
  left: 0;
  top: 0;
  cursor: default;
  z-index: $zindex-dropdown;

  ::v-deep {
    .module-config-pane {
      width: 15rem;
      padding: 0.75rem 1rem 0.5rem;
      border: $border-width solid $border-color;
      background-color: $white;
      box-shadow: $box-shadow;
    }

    .module-config-pane-right {
      flex-direction: column;
      position: absolute;
      left: 100% !important;
      top: 0;
      width: 20rem;
      height: 100%;
      padding: 0;
      min-height: 35rem;
      max-height: 90vh;
      margin-left: -$border-width;
      overflow: hidden;
      transform: none !important;

      &.show {
        display: flex;
      }

      .dropdown-content {
        flex: 1 1 auto;
        min-height: 0;
        padding: $dropdown-padding-y $dropdown-padding-x;
        overflow-y: auto;
      }

      .dropdown-header {
        padding: $dropdown-item-padding-y * 2 $dropdown-item-padding-x 0;
        font-weight: $font-weight-medium;
        text-transform: uppercase;
      }

      .dropdown-footer {
        flex: 0 0 auto;
        padding: $dropdown-item-padding-y $dropdown-item-padding-x;
        background-color: $white;
        box-shadow: $box-shadow;
      }

      .dropdown-item {
        white-space: normal;
      }
    }

    .module-config-toggle {
      justify-content: stretch;
      text-align: left;

      .toggle-caption {
        flex: 0 1 auto;
        min-width: 0;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .icon {
        margin-left: auto;
        transition: $transition-base;
        transition-property: transform;
        transform: rotate(-90deg);
      }
    }

    .dropdown.show {
      .module-config-toggle {
        .icon {
          transform: rotate(90deg);
        }
      }
    }
  }
}

@include media-breakpoint-down(sm) {
  .mastersticker-module-config {
    top: calc(100% - 1rem);
    left: 0;
    width: calc(100vw - #{$grid-gutter-width});

    ::v-deep {
      .module-config-pane {
        width: 100%;
      }

      .module-config-pane-right {
        left: 0 !important;
        width: 100%;
        margin-left: 0;
      }
    }
  }
}
</style>
