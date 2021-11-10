export default {
  setNetworkOnline: (state, value) => (state.networkOnLine = value),
  setSWRegistrationForNewContent: (state, value) =>
    (state.SWRegistrationForNewContent = value),
  setShowAddToHomeScreenModalForApple: (state, value) =>
    (state.showAddToHomeScreenModalForApple = value),
  setRefreshingApp: (state, value) => (state.refreshingApp = value),
  setMode: (state, mode) => (state.mode = mode),
  setRegions: (state, regions) => (state.regions = regions),
  setCountries: (state, countries) => (state.countries = countries)
}
