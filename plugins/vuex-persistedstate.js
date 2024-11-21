import createPersistedState from 'vuex-persistedstate'

export default ({ query, store }) => {
  /* Restore masterSticker state from cookie */
  createPersistedState({
    paths: ['mastersticker'],
  })(store)

  /* Reapply currently selected locale */
  return store.dispatch('mastersticker/setLocale', query?.lang)
}
