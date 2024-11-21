<template>
  <section>
    <b-container>
      <b-row>
        <b-col lg="4" class="d-none d-lg-block" aria-hidden="true">
          <img
            src="/images/about/contacts/contact-us.jpg"
            alt=""
            class="section-image"
          />
        </b-col>

        <b-col lg="8" xl="7" offset-xl="1" class="pt-56 pb-32 py-lg-96">
          <h2 class="mb-32 mb-lg-40">{{ $t('title') }}</h2>

          <FormFeedback />
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<style lang="scss" scoped>
.section-image {
  position: absolute;
  right: 0;
  width: auto;
  height: 100%;
}
</style>

<i18n>
{
  "en": {
    "title": "Contact Us"
  },
  "ru": {
    "title": "Напишите нам"
  }
}
</i18n>
