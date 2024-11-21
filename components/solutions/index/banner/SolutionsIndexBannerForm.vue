<template>
  <div class="solutions-banner-form">
    <h3 class="h4">
      {{ title }}
    </h3>
    <p v-if="description">
      {{ description }}
    </p>

    <SolutionsForm
      :fields="fields"
      :submit-label="$t('solutions.makeRequest')"
      form-name="Решения — Главная — Бесплатный расчет проекта"
      banner-form
    />
  </div>
</template>

<script>
export default {
  props: {
    description: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      fields: [
        {
          name: 'phonenumber',
          placeholder: 'form.phone',
          rules: 'required|tel',
          type: 'tel',
        },
        {
          name: 'company',
          placeholder: 'form.company',
          rules: 'required',
        },
      ],
      mindboxCustomFields: {
        formName: 'Заявка на подбор оборудования ',
        EKFFormID: 'zayavka_na_podbor_oborudovaniya',
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.solutions-banner-form {
  padding: 3rem;
  color: $body-color;
  background-color: $body-bg;
}

@include media-breakpoint-down(md) {
  .solutions-banner-form {
    padding: 2rem 1.5rem;
    font-size: $font-size-2;
  }
}
</style>
