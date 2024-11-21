<template>
  <form>
    <b-form-group
      :label="$t('calculators.masterSticker.groupLabel', locale)"
      label-size="sm"
      class="mb-12"
    >
      <b-form-input v-model="text" type="text" size="sm" />
    </b-form-group>

    <b-form-group
      :label="$t('calculators.masterSticker.groupColor', locale)"
      label-size="sm"
      class="mb-12"
    >
      <b-form-input v-model="color" type="color" size="sm" />
    </b-form-group>

    <b-row>
      <b-col v-if="groupId">
        <b-button size="sm" variant="danger" block @click="removeGroup">
          {{ $t('global.delete', locale) }}
        </b-button>
      </b-col>

      <b-col>
        <b-button size="sm" variant="success" block @click="saveGroup">
          {{ $t('global.save', locale) }}
        </b-button>
      </b-col>
    </b-row>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { BFormGroup, BFormInput } from 'bootstrap-vue'

export default {
  components: {
    BFormGroup,
    BFormInput,
  },

  props: {
    groupId: {
      type: [Number, String],
      default: null,
    },
  },

  data() {
    return {
      color: null,
      text: null,
    }
  },
  computed: {
    ...mapGetters('mastersticker', ['groupColor', 'groupCustomText', 'locale']),
  },

  watch: {
    groupId: {
      immediate: true,
      handler(event) {
        if (event) {
          this.color = this.groupColor(event)
          this.text = this.getGroupLabel(event)
        }
      },
    },
  },

  methods: {
    ...mapActions('mastersticker', ['updateGroup', 'deleteGroup']),

    closeEditor() {
      this.$emit('close')
      this.text = null
      this.color = null
    },

    getGroupLabel(groupId) {
      return (
        this.groupCustomText(groupId) ||
        this.$t(`calculators.masterSticker.groups.${groupId}`, this.locale)
      )
    },

    removeGroup() {
      this.deleteGroup(this.groupId)
      this.$emit('delete')
      this.closeEditor()
    },

    saveGroup() {
      this.updateGroup({
        id: this.groupId,
        customText: this.text,
        color: this.color,
      })
      this.closeEditor()
    },
  },
}
</script>
