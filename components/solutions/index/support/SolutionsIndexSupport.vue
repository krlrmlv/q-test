<template>
  <section class="py-48 py-md-64">
    <b-container class="pt-24 pt-md-48 pt-lg-0">
      <b-row>
        <b-col cols="12" md="6" class="mb-64 mb-md-0">
          <div class="mb-32 mb-md-40 mb-xl-48">
            <h2>
              {{ title }}
            </h2>
            <p v-if="description" class="fs-2 fs-xl-3">
              {{ description }}
            </p>
          </div>

          <b-row>
            <b-col md="10">
              <SolutionsForm
                :fields="fields"
                :form-name="formName"
                :mindbox-custom-fields="mindboxCustomFields"
                :industry-page="industryPage"
                @submit="$emit('submit')"
              />
            </b-col>
          </b-row>
        </b-col>

        <b-col cols="12" md="6">
          <SolutionsIndexSupportSteps :steps="helpSteps" :title="helpTitle" />
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
    formName: {
      type: String,
      default: 'Решения — Главная — Сопровождаем на всех этапах проекта',
    },
    helpSteps: {
      type: Array,
      default: () => [],
    },
    helpTitle: {
      type: String,
      default: null,
    },
    industryPage: {
      type: Boolean,
      default: false,
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
          name: 'username',
          placeholder: 'form.fullName',
          rules: 'required',
        },
        {
          name: 'phonenumber',
          placeholder: 'form.phone',
          rules: 'required|tel',
          type: 'tel',
        },
        {
          name: 'email',
          placeholder: 'form.email',
          rules: 'required|email',
          type: 'email',
        },
        {
          name: 'company',
          placeholder: 'form.company',
          rules: 'required',
        },
      ],
      mindboxCustomFields: {
        formName: 'Сопровождаем на всех этапах проекта',
        EKFFormID: 'soprovozhdaem_na_vsekh_etapah_proekta',
      },
    }
  },
}
</script>
