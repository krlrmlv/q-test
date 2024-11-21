<template>
  <div>
    <h2 class="h3">{{ $t('calculators.masterKupol.initialData.title') }}</h2>
    <p
      class="mb-32"
      v-html="$t('calculators.masterKupol.initialData.description')"
    />

    <ValidationObserver v-slot="{ handleSubmit }" slim>
      <b-row class="mb-lg-32">
        <b-col cols="12" md="6" order-md="2" offset-xl="1" class="mb-32">
          <picture>
            <source
              srcset="/images/calculators/masterkupol/scheme-336.png"
              media="(max-width: 575px)"
            />
            <source
              srcset="/images/calculators/masterkupol/scheme-516.png"
              media="(max-width: 767px)"
            />
            <source
              srcset="/images/calculators/masterkupol/scheme-336.png"
              media="(max-width: 991px)"
            />
            <source
              srcset="/images/calculators/masterkupol/scheme-456.png"
              media="(max-width: 1199px)"
            />
            <source srcset="/images/calculators/masterkupol/scheme.png" />

            <img
              :alt="$t('calculators.masterKupol.schemeAlt')"
              src="/images/calculators/masterkupol/scheme.png"
              class="img-fluid"
            />
          </picture>
        </b-col>
        <b-col cols="12" md="6" xl="5" order-md="1" class="mb-32">
          <MasterkupolInitialDataForm />
        </b-col>
      </b-row>
      <MasterkupolNext
        @click="handleSubmit(() => $emit('next', 'protectionMethod'))"
      />
    </ValidationObserver>
  </div>
</template>
