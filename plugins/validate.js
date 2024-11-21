import Vue from 'vue'
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  setInteractionMode,
} from 'vee-validate'
import { email, max, min_value, required } from 'vee-validate/dist/rules'

extend('email', email)
extend('max', max)
extend('min_value', min_value)
extend('required', required)
extend('tel', {
  validate(value) {
    if (value.startsWith('+7'))
      return Boolean(value?.match(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/gim))

    return Boolean(value?.match(/[0-9]{0,14}$/gim))
  },
})

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

export default function VeeValidatePlugin() {
  setInteractionMode('passive')
}
