<template>
  <div
    :class="{ 'form-file-sm': size === 'sm', 'form-file-lg': size === 'lg' }"
    class="form-file"
  >
    <b-row align-v="center" class="flex-md-nowrap mx-n8">
      <b-col cols="12" md="auto" class="align-self-start px-8">
        <b-form-file
          v-model="localValue"
          :accept="accept"
          :browse-text="browseText || $t('form.browseText')"
          :multiple="multiple"
          :placeholder="null"
          :size="size"
          :state="state"
          :class="{ 'no-icon': disableIcon }"
        />
      </b-col>

      <b-col
        cols="12"
        md="auto"
        class="form-file-filename flex-fill px-8 py-md-0"
        :class="messageCenter ? 'message-center' : ''"
      >
        <b-row align-v="center" class="flex-nowrap mx-n4">
          <b-col cols="12" md="auto" class="flex-shrink-1 lh-120 px-4">
            <slot :filename="filename" name="placeholder">
              <span
                class="text-muted"
                :class="{ 'd-block text-center': !filename }"
              >
                {{
                  filename
                    ? filename
                    : placeholder || $t('form.fileNotAttached')
                }}
              </span>
            </slot>
          </b-col>
          <b-col
            v-if="filename"
            cols="auto"
            class="d-flex align-self-start px-4"
          >
            <b-button
              :title="$t('global.delete')"
              size="sm"
              variant="danger"
              class="btn-icon rounded-pill border-0"
              @click="localValue = null"
            >
              <svg-icon
                name="close-16"
                width="16"
                height="16"
                aria-hidden="true"
              />
            </b-button>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { BFormFile } from 'bootstrap-vue'

export default {
  components: { BFormFile },

  model: {
    prop: 'value',
    event: 'input',
  },

  props: {
    messageCenter: {
      type: Boolean,
      default: false,
    },
    accept: {
      type: String,
      default: '',
    },
    browseText: {
      type: String,
      default: null,
    },
    disableIcon: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: null,
    },
    size: {
      type: String,
      default: null,
    },
    state: {
      type: Boolean,
      default: null,
    },
    value: {
      type: null,
      default: null,
    },
  },

  computed: {
    localValue: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit('input', newValue)
      },
    },

    filename() {
      if (!this.localValue) return false
      else if (Array.isArray(this.localValue))
        return this.localValue.map((el) => el.name).join(', ')
      else return this.localValue.name
    },
  },
}
</script>

<style lang="scss" scoped>
$custom-file-attach-icon: url('data:image/svg+xml,<svg width="24" height="24" version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m14.656 2c-1.3262 0-2.5992 0.52703-3.5371 1.4648l-7.0684 7.0684c-1.3131 1.3131-2.0508 3.0961-2.0508 4.9531 0 1.857 0.73764 3.6381 2.0508 4.9512 1.3131 1.3131 3.0961 2.0508 4.9531 2.0508 1.857 0 3.6381-0.7377 4.9512-2.0508l7.7754-7.7754-1.4141-1.4141-7.7754 7.7754c-0.93852 0.93852-2.2098 1.4648-3.5371 1.4648-1.3274 0-2.6005-0.5263-3.5391-1.4648-0.93856-0.93852-1.4648-2.2097-1.4648-3.5371 0-1.3274 0.52628-2.6005 1.4648-3.5391l7.0684-7.0684c0.56334-0.56331 1.3265-0.87891 2.123-0.87891 0.79668 0 1.5598 0.31565 2.123 0.87891 0.56331 0.56329 0.88086 1.3264 0.88086 2.123 0 0.79667-0.31756 1.5598-0.88086 2.123l-7.0781 7.0684c-0.18783 0.18788-0.44111 0.29297-0.70703 0.29297-0.26594 0-0.52099-0.10496-0.70898-0.29297-0.18804-0.18805-0.29297-0.44119-0.29297-0.70703 0-0.26522 0.10576-0.51912 0.29297-0.70703v-0.001953l6.3691-6.3574 0.70703-0.70703-1.4141-1.4141-0.70703 0.70508-6.3691 6.3594c-0.56252 0.56255-0.87891 1.3275-0.87891 2.123s0.31638 1.5585 0.87891 2.1211c0.56257 0.5626 1.3275 0.87891 2.123 0.87891 0.79552 0 1.5585-0.31619 2.1211-0.87891l7.0781-7.0684c0.9379-0.93785 1.4668-2.2109 1.4668-3.5371 0-1.3262-0.52891-2.5993-1.4668-3.5371-0.93779-0.93786-2.2108-1.4648-3.5371-1.4648z"/></svg>');

@include media-breakpoint-down(lg) {
  .message-center {
    display: flex !important;
    justify-content: center !important;
  }
}

.form-file {
  overflow: hidden;

  .form-file-filename {
    padding-top: $input-btn-padding-y;
    padding-bottom: $input-btn-padding-y;
  }

  &.form-file-sm {
    .form-file-filename {
      padding-top: $input-btn-padding-y-sm;
      padding-bottom: $input-btn-padding-y-sm;
      font-size: $font-size-2;
    }
  }
}

::v-deep .custom-file {
  height: auto;

  .custom-file-input {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: auto;
    height: add(
      $input-btn-line-height * 1em,
      add($input-padding-y * 2, $input-height-border, false)
    );
  }

  .custom-file-label {
    &::before {
      content: '';
      width: 24px;
      height: 24px;
      background-image: escape-svg($custom-file-attach-icon);
      background-repeat: no-repeat;
      margin-right: 0.5rem;
      background-size: 1.5rem;
    }
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: auto;
    height: add(
      $input-btn-line-height * 1em,
      add($input-padding-y * 2, $input-height-border, false)
    );
    margin-bottom: 0;
    padding: $input-btn-padding-y $input-btn-padding-x;
    background-color: $gray-200;
    box-shadow: none;

    &:hover {
      background-color: $gray-300;
      border-color: $gray-300;
      box-shadow: $btn-box-shadow;
      cursor: pointer;
    }

    &:focus,
    &.focus,
    &:not(:disabled):not(.disabled):active,
    &:not(:disabled):not(.disabled).active,
    .show > &.dropdown-toggle {
      color: $white;
      background-color: $gray-500;
      border-color: $gray-500;
    }

    &::after {
      display: inline;
      position: static;
      width: auto;
      height: auto;
      padding: 0;
      font-weight: $font-weight-medium;
      line-height: $input-btn-line-height;
      border: none;
      color: currentColor;
      background-color: transparent;
    }

    .form-file-text {
      display: none !important;
    }
  }

  &.no-icon {
    .custom-file-label {
      padding: $input-btn-padding-y $input-btn-padding-x;
      background-image: none;
    }
  }

  &.b-custom-control-sm {
    .custom-file-input {
      height: add(
        $input-btn-line-height-sm * 1em,
        add($input-padding-y-sm * 2, $input-height-border, false)
      );
    }

    .custom-file-label {
      height: add(
        $input-btn-line-height-sm * 1em,
        add($input-padding-y-sm * 2, $input-height-border, false)
      );
      padding: $input-btn-padding-y-sm $input-btn-padding-x-sm
        $input-btn-padding-y-sm calc(#{$input-btn-padding-x-sm + 0.5rem} + 16px);
      background-position: left $input-btn-padding-x-sm center;
      background-size: 16px;

      .form-file-text {
        display: none !important;
      }
    }

    &.no-icon {
      .custom-file-label {
        padding: $input-btn-padding-y-sm $input-btn-padding-x-sm;
      }
    }
  }

  &.is-invalid {
    .custom-file-label {
      color: $danger;
      border-color: $danger;
      background-color: rgba($danger, 0.2);

      &:hover {
        border-color: $danger;
        background-color: rgba($danger, 0.3);
      }

      &:not(:disabled):not(.disabled) {
        &:active {
          color: $danger;
          border-color: rgba($danger, 0.5);
          background-color: rgba($danger, 0.5);
        }
      }
    }
  }

  .custom-file-input:invalid:focus ~ .custom-file-label,
  .custom-file-input.is-invalid:focus ~ .custom-file-label {
    box-shadow: none;
  }
}
</style>
