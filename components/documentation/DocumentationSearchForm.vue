<template>
  <b-form class="form-documentation-search" @submit.prevent="handleSubmit">
    <b-input-group>
      <b-form-input
        :value="value"
        :placeholder="$t('searchPlaceholder')"
        @input="$emit('input', $event)"
      />

      <b-input-group-append>
        <b-button
          :title="$t('searchSubmit')"
          :aria-label="$t('searchSubmit')"
          type="submit"
          variant="outline-primary"
        >
          <b-spinner v-if="loading" class="mr-md-8" small />
          <svg-icon
            v-else
            class="d-md-none"
            name="search-24"
            width="24"
            height="24"
            aria-hidden="true"
          />

          <span class="d-none d-md-inline" v-text="$t('searchSubmit')" />
        </b-button>
      </b-input-group-append>
    </b-input-group>
  </b-form>
</template>

<script>
import {
  BForm,
  BFormInput,
  BInputGroup,
  BInputGroupAppend,
  BSpinner,
} from 'bootstrap-vue'

export default {
  components: {
    BForm,
    BFormInput,
    BInputGroup,
    BInputGroupAppend,
    BSpinner,
  },

  model: {
    prop: 'value',
    event: 'input',
  },

  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: null,
    },
  },

  methods: {
    handleSubmit() {
      if (this.value?.length) {
        this.$emit('search', this.value)
      } else {
        this.$emit('clear')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.form-documentation-search {
  ::v-deep {
    .input-group {
      .input-group-append {
        margin-left: 0.5rem;
      }
    }
  }
}

@include media-breakpoint-down(sm) {
  .form-documentation-search {
    ::v-deep {
      .input-group {
        .input-group-append {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          margin-left: 0;

          .btn {
            padding-right: 0.75rem;
            padding-left: 0.75rem;
            border-color: transparent;
          }
        }
      }
    }
  }
}
</style>

<i18n>
{
  "en": {
    "searchPlaceholder": "Enter product code or name",
    "searchSubmit": "Find documentation"
  },
  "ru": {
    "searchPlaceholder": "Введите артикул или название изделия",
    "searchSubmit": "Найти документацию"
  }
}
</i18n>
