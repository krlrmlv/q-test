export default ({ store }) => {
  /* Refresh saved location on client-side navigation */

  if (process.client) {
    store.dispatch('geo/getClientLocation')
  }
}
