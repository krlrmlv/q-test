<template>
  <section class="pt-16 pt-xl-32 pb-24 pb-md-48 pb-xl-96">
    <b-container>
      <b-row>
        <b-col cols="12" md="7" lg="6" class="fs-2 fs-xl-3 mb-16">
          <div class="mb-24 mb-md-40">
            <h2>{{ title }}</h2>
            <p v-if="description">
              {{ description }}
            </p>
          </div>

          <div class="d-flex align-items-center mb-16">
            <div class="align-self-start text-primary mr-16">
              <svg-icon
                name="phone-24"
                width="24"
                height="24"
                aria-hidden="true"
              />
            </div>
            <p class="mb-0">
              <b-link href="tel:+74957888815" class="text-reset">
                +7 (495) 788-88-15 </b-link
              >,
              <b-link href="tel:88003338815" class="text-reset">
                8 (800) 333-88-15
              </b-link>
              <span class="text-muted">
                ({{ $t('global.multichannel') }})
              </span>
            </p>
          </div>

          <div class="d-flex align-items-center mb-16">
            <div class="align-self-start text-primary mr-16">
              <svg-icon
                name="mail-24"
                width="24"
                height="24"
                aria-hidden="true"
              />
            </div>
            <p class="mb-0">
              <b-link href="mailto:info@ekf.su" class="text-reset">
                info@ekf.su
              </b-link>
            </p>
          </div>
        </b-col>

        <b-col cols="12" md="5" lg="6" xl="4" offset-xl="1" class="mb-16">
          <SolutionsForm
            :code="formCode"
            :form-name="formName"
            :submit-label="submitLabel"
            :mindbox-custom-fields="mindboxCustomFields"
          />
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
export default {
  props: {
    description: {
      type: String,
      default: null,
    },
    formCode: {
      type: Number,
      default: 1012,
    },
    formName: {
      type: String,
      default: undefined,
    },
    submitLabel: {
      type: String,
      default: undefined,
    },
    title: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      mindboxCustomFields: {
        formName: 'Заявка на консультацию',
        EKFFormID: 'zayavka_na_konsultatsiyu',
      },
    }
  },
}
</script>
