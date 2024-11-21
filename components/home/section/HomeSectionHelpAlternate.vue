<template>
  <HomeSectionHelp>
    <div class="d-flex flex-column">
      <SeoLink
        href="https://ims3.ekf.su/"
        target="_blank"
        class="btn btn-primary mb-16"
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
      <b-button
        :to="localePath('/distribution/buy')"
        target="_blank"
        variant="light"
      >
        {{ $t('global.order') }}
      </b-button>
    </div>
  </HomeSectionHelp>
</template>

<script></script>
