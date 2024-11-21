<template>
  <section class="section-home section-home-help">
    <b-container>
      <h2>
        {{ $t('help.title') }}
      </h2>
      <p class="fs-2 fs-lg-3 mb-32 mb-lg-64" v-html="$t('help.message')"></p>
      <div class="d-flex justify-content-center">
        <div class="d-flex flex-column">
          <p class="mb-32">
            <span class="h6">{{ $t('help.hotline') }}:</span>
            <b-link href="tel:88003338815" class="text-reset">
              8 800 333-88-15
            </b-link>
          </p>
          <slot>
            <div class="text-center">
              <SeoLink
                href="https://ims3.ekf.su/"
                target="_blank"
                class="btn btn-primary"
              >
                {{ $t('help.goToIms') }}
                <svg-icon
                  name="arrow-right-24"
                  width="24"
                  height="24"
                  class="ml-8"
                  aria-hidden="true"
                />
              </SeoLink>
            </div>
          </slot>
        </div>
      </div>
    </b-container>
  </section>
</template>

<style lang="scss" scoped>
.section-home-help {
  text-align: center;
  color: $white;
  background-color: $gray-900;
}
</style>
