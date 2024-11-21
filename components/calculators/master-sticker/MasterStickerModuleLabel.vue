<template>
  <div
    :class="{ accent: item.accent }"
    :style="{ height: `${height}mm` }"
    class="module-label"
  >
    <div
      v-if="item.moduleType === 'lamp'"
      class="module-label-fill module-label-lamp"
    >
      <span
        v-for="(color, index) in item.lampColors"
        :key="`color-${index}`"
        :style="{
          color: contrastColor(color.value),
          backgroundColor: color.value,
        }"
        class="lamp-color"
      >
        {{ color.text }}
      </span>
    </div>

    <div
      v-else-if="item.moduleType === 'reversibleSwitch'"
      class="module-label-fill module-label-reverse"
    >
      <p
        class="module-label-heading"
        :style="{
          color: contrastColor(
            groupColor(item.reverseTogglePositions[0].groupId)
          ),
          backgroundImage: `linear-gradient(to right bottom, ${groupColor(
            item.reverseTogglePositions[0].groupId
          )} 49%, ${groupColor(item.reverseTogglePositions[2].groupId)} 51%`,
        }"
      >
        {{ item.heading }}
      </p>

      <div class="module-label-description">
        <div
          v-for="pos in item.reverseTogglePositions"
          :key="pos.id"
          class="reverse-toggle-position"
        >
          <div
            :style="{
              color: contrastColor(groupColor(pos.groupId)),
              backgroundColor: groupColor(pos.groupId),
            }"
            class="position-icon"
          >
            <img
              v-if="pos.icon"
              :src="getIconSrc(pos.icon, groupColor(pos.groupId))"
              width="24"
              height="24"
              aria-hidden="true"
            />
          </div>

          {{ pos.name }}<br />
          {{ $te(pos.text) ? $t(pos.text, locale) : pos.text }}
        </div>
      </div>
    </div>

    <div
      v-else
      :style="{
        color: contrastColor(groupColor(item.moduleGroup)),
        backgroundColor: groupColor(item.moduleGroup),
      }"
      class="module-label-fill"
    >
      <p class="module-label-heading">
        {{ item.heading }}
      </p>

      <pre class="module-label-description">{{ item.description }}</pre>

      <div class="module-label-icon">
        <img
          v-if="hasIcon"
          :src="getIconSrc(item.moduleIcon, groupColor(item.moduleGroup))"
          width="24"
          height="24"
          aria-hidden="true"
        />

        <span v-else class="module-label-icon-label">
          {{ item.label }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getContrastColor } from '@/utils/color'

export default {
  props: {
    height: {
      type: [String, Number],
      default: 25,
    },
    item: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    ...mapGetters('mastersticker', ['groupColor', 'iconByName', 'locale']),

    hasIcon() {
      return (
        !this.item?.noIcon &&
        !!this.iconByName(this.item?.moduleIcon) &&
        !!this.item?.moduleIcon
      )
    },
  },

  methods: {
    contrastColor(bgColor) {
      return getContrastColor(bgColor, '#fff', '#000')
    },

    getIconSrc(icon, bgcolor) {
      if (!icon) return null
      let color = 'black'
      if (this.item?.accent || this.item?.moduleType === 'reversibleSwitch') {
        color = this.contrastColor(bgcolor) === '#fff' ? 'white' : 'black'
      }
      return require(`~/assets/images/icons/master-sticker/${color}/${icon}.svg`)
    },
  },
}
</script>

<style lang="scss" scoped>
.module-label {
  padding: 0;
  font-size: 2.7mm;
  line-height: 1;
  text-align: center;

  &.accent {
    .module-label-description,
    .module-label-icon {
      color: inherit;
      background-color: transparent;
    }
  }
}

.module-label-fill {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .module-label-heading {
    display: flex;
    flex: 0 0 auto;
    justify-content: center;
    height: 5mm;
    margin: 0;
    padding: 1mm;
    font-size: 3mm;
    font-weight: $font-weight-bold;
    white-space: nowrap;
    overflow: hidden;
  }

  .module-label-description {
    flex: 1 0 auto;
    margin: 0;
    padding: 1mm;
    font-size: inherit;
    color: $body-color;
    background-color: $body-bg;
    overflow: hidden;
  }

  .module-label-icon {
    padding: 1mm 1mm 4mm;
    color: $body-color;
    background-color: $body-bg;
  }

  .module-label-icon-label {
    font-size: 4mm;
  }

  &.module-label-lamp {
    justify-content: center;

    .lamp-color {
      width: 90%;
      max-width: 40mm;
      margin: 0.5mm auto;
      padding: 1.5mm;
      font-size: 3.5mm;
      text-align: center;
      border-radius: 0.5mm;
    }
  }

  &.module-label-reverse {
    .module-label-description {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }

    .reverse-toggle-position {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
      margin: 0.5mm;
    }

    .position-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 10mm;
      height: 10mm;
      margin-bottom: 1mm;
      padding: 0;
      border-radius: 0.5mm;
    }
  }
}

.reversed .module-label-fill {
  flex-direction: column-reverse;

  .module-label-icon {
    padding: 4mm 1mm 1mm;
  }
}

.module-spacer .module-label {
  opacity: 0;
}
</style>
