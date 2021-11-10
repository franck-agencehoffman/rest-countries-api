import { isNil, shuffle } from 'lodash'
import axios from 'axios'

export default {
  /**
   * Closes "add to home screen" modal for apple
   */
  closeAddToHomeScreenModalForApple: async ({ commit }) => {
    localStorage.setItem('addToHomeIosPromptLastDate', Date.now())
    commit('setShowAddToHomeScreenModalForApple', false)
  },

  /**
   * Trigger service worker skipWating so the new service worker can take over.
   * This will also trigger a window refresh (see /src/misc/register-service-worker.js)
   */
  serviceWorkerSkipWaiting({ state, commit }) {
    if (isNil(state.SWRegistrationForNewContent)) return

    commit('setRefreshingApp', true)
    state.SWRegistrationForNewContent.waiting.postMessage('skipWaiting')
  },

  toggleMode({ commit }, mode) {
    commit('setMode', mode)
  },

  async fetchCountries({ commit }) {
    const response = await axios.get('https://restcountries.com/v2/all?fields=flag,alpha3Code,alpha2Code,name,population,region,capital,subregion,nativeName,topLevelDomain,currencies,languages,borders')
    const regions = []

    response.data.forEach(country => {
      if (!regions.includes(country.region))
        regions.push(country.region)
    })

    commit('setRegions', regions.sort())
    commit('setCountries', shuffle(response.data))
  }
}
