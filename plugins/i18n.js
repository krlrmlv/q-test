export default function ({ app, store }) {
  app.i18n.onLanguageSwitched = (oldLocale, newLocale) => {
    if (oldLocale !== newLocale) {
      store.commit('SET_SELECTED_LANGUAGE', newLocale)
    }
  }
}
