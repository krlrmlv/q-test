<template>
  <b-modal
    v-model="localVisible"
    :size="size"
    modal-class="modal-documents-language"
    centered
    hide-footer
    hide-header
    no-close-on-esc
    no-close-on-backdrop
    @hidden="$emit('hidden')"
  >
      <h4 class="fs-6 fs-sm-7 text-center mb-40">{{ $t('chooseLanguage') }}</h4>
      <ul class="list-unstyled mb-24 ml-12 language-list">
        <li
          v-for="(language, code) in availableLanguages"
          :key="`lang-${code}`" 
          :class="{active : (code == currentLanguage)}"
          class="d-flex language-link-modal"
          :name="`language-link-${code}`"
          @click="clickLanguage(code)"
        >
          <span class="d-flex rounded-pill overflow-hidden mr-8 mb-24">
            <svg-icon :name="`flags/${code}-24`" width="24" height="24" aria-hidden="true"/>
          </span>
          {{ language }}
          <svg-icon name="check-24" width="24" height="24" aria-hidden="true" class="ml-auto icon-checked"/>
        </li>
      </ul>
      <b-button variant="primary" block class="mb-16" @click="setLanguage">{{ $t('continue') }}</b-button>
  </b-modal>
</template>

<script>
import { BModal } from 'bootstrap-vue'

export default {
  name: 'DocumentsLanguageModal',
  components: { BModal },
  model: {
    prop: 'visible',
    event: 'change',
  },
  props: {
    size: {
      type: String,
      default: 'md',
    },
    visible: {
      type: Boolean,
      default: false,
    },
    selectedLanguage: {
      type: String,
      default: null,
    }
  },
  data() {
    return {
      availableLanguages: {'en': 'English', 'ru': 'Русский'},
      currentLanguage: this.selectedLanguage
    }
  },
  computed: {
    localVisible: {
      get() {
        return this.visible
      },
      set(newValue) {
        this.$emit('change', newValue)
      },
    },
  },
  methods: {
    clickLanguage(code) {
      this.currentLanguage = code;
    },
    setLanguage() {
      this.$emit('set-selected-language', this.currentLanguage)
      
      let redirectUrl = this.$route.path + '?language=' + this.currentLanguage
      if (this.$route.query.is_group)
        redirectUrl += '&is_group=true'

      window.location.href = redirectUrl
    }
  },
}
</script>

<style lang="scss" scoped>

.language-list li .icon-checked {
  display: none;
}

.language-list li.active {
  font-weight: bold;
}

.language-list li.active .icon-checked {
  display: block;
}

.language-link {
  color: $gray-500;
}

.language-link-modal {
  color: $gray-900;
  cursor: pointer;
}

::v-deep {
  .modal-documents-language .modal-dialog {
    max-width: 370px;
    margin-left: auto;
    margin-right: auto;
  }

  .modal .modal-body {
    padding: 4rem 4rem 2.5rem 4rem;
  }
}
</style>

<i18n>
  {
    "en": {
      "chooseLanguage": "Choose language",
      "continue": "Continue"
    },
    "ru": {
      "chooseLanguage": "Выберите язык",
      "continue": "Продолжить"
    }
  }
</i18n>