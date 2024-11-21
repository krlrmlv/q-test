<template>
  <div class="home-calculator-tabs">
    <nav>
      <ul class="nav nav-tabs nav-justified nav-calculators" role="tablist">
        <li class="nav-item" role="presentation">
          <b-link
            :aria-selected="tabIndex === 0 ? true : false"
            :class="{ active: tabIndex === 0 }"
            role="tab"
            class="nav-link tab-calculators"
            @click="tabIndex = 0"
          >
            <svg-icon
              name="calculators/mastercost-sm"
              width="38"
              height="32"
              class="mr-16"
              aria-hidden="true"
            />
            <span class="tab-caption">
              {{ $t('calculators.masterCost.tabCaption') }}
            </span>
          </b-link>
        </li>
        <li class="nav-item" role="presentation">
          <b-link
            :aria-selected="tabIndex === 1 ? true : false"
            :class="{ active: tabIndex === 1 }"
            role="tab"
            class="nav-link tab-calculators"
            @click="tabIndex = 1"
          >
            <svg-icon
              name="calculators/mastercad-sm"
              width="38"
              height="32"
              class="mr-16"
              aria-hidden="true"
            />
            <span class="tab-caption">
              {{ $t('calculators.masterCad.subtitle') }}
            </span>
          </b-link>
        </li>
        <li class="nav-item" role="presentation">
          <b-link
            :aria-selected="tabIndex === 2 ? true : false"
            :class="{ active: tabIndex === 2 }"
            role="tab"
            class="nav-link tab-calculators"
            @click="tabIndex = 2"
          >
            <svg-icon
              name="calculators/calculator-sm"
              width="38"
              height="32"
              class="mr-16"
              aria-hidden="true"
            />
            <span class="tab-caption">
              {{ $t('calculators.airTerminal.title') }}
            </span>
          </b-link>
        </li>
      </ul>
    </nav>
    <transition-group
      tag="div"
      name="custom-tabs"
      class="tab-content tab-content-calculators"
    >
      <div
        v-show="tabIndex === 0"
        key="tab-0"
        :class="{ active: tabIndex === 0 }"
        :aria-hidden="tabIndex !== 0 ? true : false"
        role="tabpanel"
        class="tab-pane"
      >
        <div class="card-calculator">
          <div class="card-header">
            <h4>{{ $t('calculators.masterCost.tabCaption') }}</h4>
          </div>
          <h6 v-html="$t('calculators.masterCost.subtitle')"></h6>
          <LazyMasterCost
            v-if="tabIndex === 0"
            collapsed
            show-download-button
          />
        </div>
      </div>
      <div
        v-show="tabIndex === 1"
        key="tab-1"
        :class="{ active: tabIndex === 1 }"
        :aria-hidden="tabIndex !== 1 ? true : false"
        role="tabpanel"
        class="tab-pane"
      >
        <div class="card-calculator">
          <div class="card-header">
            <h4>{{ $t('calculators.masterCad.subtitle') }}</h4>
            <b-row>
              <b-col lg="9" xl="8">
                <p class="mb-0">
                  {{ $t('calculators.masterCad.schemes.description') }}
                </p>
              </b-col>
            </b-row>
          </div>
          <IframeEmbed v-if="tabIndex === 1" url="programs/mastercad" />
        </div>
      </div>
      <div
        v-show="tabIndex === 2"
        key="tab-2"
        :class="{ active: tabIndex === 2 }"
        :aria-hidden="tabIndex !== 2 ? true : false"
        role="tabpanel"
        class="tab-pane"
      >
        <div class="card-calculator">
          <div class="card-header">
            <h4>{{ $t('calculators.airTerminal.title') }}</h4>
          </div>
          <IframeEmbed
            v-if="tabIndex === 2"
            url="programs/master-tool/lightning-protection"
          />
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabIndex: -1,
    }
  },
}
</script>

<style lang="scss" scoped>
.tab-content-calculators {
  .tab-pane {
    padding-top: 4rem;
  }
}

@include media-breakpoint-down('md') {
  .home-calculator-tabs {
    display: none;
  }
  // .card-calculator {
  //   &.shadow {
  //     box-shadow: 0 4px 120px 0 rgba(33, 37, 41, 0.08);
  //     padding: 4rem 4rem 6rem 4rem;
  //   }
  // }
}
</style>
