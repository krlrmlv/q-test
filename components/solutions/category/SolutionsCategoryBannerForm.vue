<template>
  <div class="card card-form">
    <h3 class="h4">
      {{ title }}
    </h3>
    <p v-if="description">
      {{ description }}
    </p>

    <SolutionsForm
      :code="$route.path.endsWith('/solutions/osveshhenie') ? 1015 : formCode"
      :fields="formFields"
      :form-name="formName"
      :submit-label="$t('solutions.makeRequest')"
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
    formName: {
      type: String,
      default: undefined,
    },
    title: {
      type: String,
      default: null,
    },
    formCode: {
      type: Number,
      default: 1012,
    },
  },

  data() {
    return {
      formFields: [
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
.card-form {
  padding: 2rem 1.5rem;
  font-size: $font-size-2;
  line-height: 1.4;
  color: $body-color;
  background-color: $body-bg;
}

@include media-breakpoint-up(md) {
  .card-form {
    padding: 2.5rem 1.5rem;
    font-size: $font-size-3;
  }
}

@include media-breakpoint-up(xl) {
  .card-form {
    padding: 3rem;
  }
}
</style>
