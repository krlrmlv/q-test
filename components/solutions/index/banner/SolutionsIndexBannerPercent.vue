<template>
  <div class="solutions-banner-percent">
    <div class="percent-value" aria-hidden="true">
      <svg
        :viewBox="`0 0 ${size} ${size}`"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        preserveAspectRatio="none"
        class="percent-gauge"
      >
        <circle
          :cx="center"
          :cy="center"
          :r="radius"
          :stroke-width="strokeWidth"
          fill="none"
          stroke="#ffffff33"
        />
        <path
          :d="path"
          :stroke-width="strokeWidth"
          fill="none"
          stroke="#ffffff"
        />
      </svg>
      <span class="percent-value-caption"> {{ value }}<small>%</small> </span>
    </div>
    <p class="mb-0">{{ text }}</p>
  </div>
</template>

<script>
function polarToCartesian(cx, cy, radius, angle) {
  const angleInRadians = ((angle - 90) * Math.PI) / 180.0
  const x = cx + radius * Math.cos(angleInRadians)
  const y = cy + radius * Math.sin(angleInRadians)
  return { x, y }
}

function describeArc(x, y, radius, startAngle, endAngle) {
  const start = polarToCartesian(x, y, radius, endAngle)
  const end = polarToCartesian(x, y, radius, startAngle)
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'

  const d = [
    'M',
    start.x,
    start.y,
    'A',
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ]

  return d.join(' ')
}

export default {
  props: {
    size: {
      type: Number,
      default: 62,
    },
    strokeWidth: {
      type: Number,
      default: 4,
    },
    text: {
      type: String,
      default: null,
    },
    value: {
      type: [Number, String],
      default: null,
    },
  },

  computed: {
    center() {
      return this.size / 2
    },
    radius() {
      return (this.size - this.strokeWidth) / 2
    },
    path() {
      const angle = (this.value * 360) / 100
      return describeArc(this.center, this.center, this.radius, 0, angle)
    },
  },
}
</script>

<style lang="scss" scoped>
.solutions-banner-percent {
  display: flex;
  align-items: center;
  gap: 1rem 1.5rem;
  font-size: $font-size-2;
  line-height: 1.4;
}

.percent-gauge {
  width: 62px;
  height: 62px;
}

.percent-value {
  position: relative;
  flex: 0 0 auto;
  align-self: flex-start;
}

.percent-value-caption {
  position: absolute;
  left: 50%;
  top: 50%;
  font-size: 1.5rem;
  font-weight: $font-weight-medium;
  transform: translateX(-50%) translateY(-50%);

  small {
    font-size: 0.5em;
    font-weight: inherit;
  }
}

@include media-breakpoint-up(md) {
  .solutions-banner-percent {
    flex-direction: column;
    align-items: initial;
  }
}

@include media-breakpoint-up(lg) {
  .percent-gauge {
    width: 72px;
    height: 72px;
  }

  .percent-value-caption {
    font-size: 1.75rem;
  }
}
</style>
