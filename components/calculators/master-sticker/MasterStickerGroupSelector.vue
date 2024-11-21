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
        {{ getGroupLabel(value) }}
      </span>

      <span
        :style="{ backgroundColor: groupColor(value) }"
        class="group-color ml-8"
      />

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
        <MasterStickerGroupEditor
          v-if="editMode"
          :group-id="groupId"
          @close="editMode = false"
          @delete="$emit('change', 0)"
        />

        <ul v-else class="list-unstyled m-0 p-0">
          <b-dropdown-item-button
            v-for="(group, index) in groups"
            :key="`group-${index}`"
            :active="value === group.id"
            @click.capture.native.stop="$emit('change', group.id)"
          >
            <span
              :style="{ backgroundColor: group.color }"
              class="group-color mr-8"
            />

            {{ getGroupLabel(group.id) }}
          </b-dropdown-item-button>
        </ul>
      </li>

      <li role="presentation" class="dropdown-footer">
        <b-row>
          <b-col cols="6">
            <b-button size="sm" variant="gray-200" block @click="editGroup">
              <template v-if="editMode">
                {{ $t('global.cancel', locale) }}
              </template>

              <template v-else>
                {{ $t('calculators.masterSticker.edit', locale) }}
              </template>
            </b-button>
          </b-col>

          <b-col cols="6">
            <b-button size="sm" variant="gray-200" block @click="createGroup">
              {{ $t('calculators.masterSticker.create', locale) }}
            </b-button>
          </b-col>
        </b-row>
      </li>
    </template>
  </b-dropdown>
</template>

<script>
import { BDropdown, BDropdownItemButton } from 'bootstrap-vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    BDropdown,
    BDropdownItemButton,
  },

  props: {
    value: {
      type: [Number, String],
      default: null,
    },
  },

  data() {
    return {
      editMode: false,
      groupId: null,
    }
  },

  computed: {
    ...mapGetters('mastersticker', [
      'groupColor',
      'groupCustomText',
      'groups',
      'locale',
    ]),
  },

  methods: {
    createGroup() {
      this.groupId = null
      this.editMode = true
    },

    editGroup() {
      this.groupId = this.value
      this.editMode = !this.editMode
    },

    getGroupLabel(groupId) {
      return (
        this.groupCustomText(groupId) ||
        this.$t(`calculators.masterSticker.groups.${groupId}`, this.locale)
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.group-color {
  display: inline-block;
  flex: 0 0 auto;
  width: 0.875em;
  height: 0.875em;
  border-radius: $rounded-pill;
}
</style>
