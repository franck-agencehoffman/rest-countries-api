import { isNil } from 'lodash'

export default {
  newContentAvailable: state => !isNil(state.SWRegistrationForNewContent),
  getCountryByCode: state => code => {
    return state.countries.find(country => {
      return country.alpha2Code === code
    })
  },
  getBordersCountries: state => countriesCodes => {
    return state.countries.filter(country => {
      return countriesCodes.includes(country.alpha3Code)
    })
  },
  getCountriesFromFilters: state => (search, region) => {
    if (search === '' && region === '')
      return state.countries.slice(0, 8)

    if (search === '' && region !== '')
      return state.countries.filter(country => {
        return country.region === region
      }).slice(0, 8)

    if (search !== '' && region === '')
      return state.countries.filter(country => {
        return country.name.toLowerCase().includes(search.toLowerCase())
      }).slice(0, 8)

    return state.countries.filter(country => {
      return country.name.toLowerCase().includes(search.toLowerCase()) && country.region === region
    }).slice(0, 8)
  }
}
