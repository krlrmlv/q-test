<template>
  <section class="section section-home pt-0">
    <b-container>
      <div class="project-question-wrapper">
        <b-row>
          <b-col cols="12" lg="6">
            <div class="project-question-content">
              <h2 class="mb-lg-8">{{ $t('title') }}</h2>
              <p class="mb-24 mb-lg-16">{{ $t('text') }}</p>

              <ViewProjectQuestionForm />
            </div>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </section>
</template>

<style lang="scss" scoped>
@include media-breakpoint-up(lg) {
  .project-question-wrapper {
    padding: 5.25rem 0;
    background-image: url('/images/view/project/question-bg.jpg');
    background-position: right center;
    background-repeat: no-repeat;
    background-size: contain;
  }

  .project-question-content {
    padding: 3rem;
    background-color: $white;
    box-shadow: $box-shadow;
  }
}
</style>

<i18n>
{
  "en": {
    "text": "Write us and we will provide the necessary information",
    "title": "Still have questions?"
  },
  "ru": {
    "text": "Напишите и мы предоставим необходимую информацию",
    "title": "Остались вопросы?"
  }
}
</i18n>
