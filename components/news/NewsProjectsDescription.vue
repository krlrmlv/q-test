<template>
  <p class="lh-140">
    {{ $t('description.line1') }}<br />
    {{ $t('description.line2') }}
    <b-link @click="$emit('anchor-click')">{{ $t('description.form') }}</b-link
    >.
  </p>
</template>

<i18n>
{
  "en": {
    "description": {
      "form": "application form",
      "line1": "This list does not include all projects.",
      "line2": "You can request a complete reference list from our managers by filling out the"
    }
  },
  "ru": {
    "description": {
      "form": "форму заявки",
      "line1": "В данном списке представлены не все проекты.",
      "line2": "Полный референс-лист вы можете запросить у наших менеджеров, заполнив"
    }
  }
}
</i18n>
