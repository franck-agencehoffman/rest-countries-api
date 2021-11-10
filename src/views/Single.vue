<template>
  <div class="page-wrapper" :class="{ 'dark': mode === 'dark' }">
    <div class="actions-wrapper">
      <router-link to="/" class="back-btn">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path fill="#111517" fill-rule="evenodd" d="m6.464 4.107 1.179 1.179-3.89 3.889h14.85v1.65H3.753l3.89 3.889-1.179 1.179L.572 10l5.892-5.893Z" clip-rule="evenodd"/></svg>
        <span>Back</span>
      </router-link>
    </div>

    <div v-if="country" class="country-item">
      <div class="flag-wrapper">
        <img class="flag" :src="country.flag" :alt="country.name">
      </div>

      <div class="details">
        <h2 class="name">{{ country.name }}</h2>

        <div class="infos">
          <div class="col">
            <p class="native-name"><strong>Native Name:</strong> {{ country.nativeName }}</p>
            <p class="population"><strong>Population:</strong> {{ country.population.toLocaleString('en-US') }}</p>
            <p class="region"><strong>Region:</strong> {{ country.region }}</p>
            <p class="sub-region"><strong>Sub Region:</strong> {{ country.subregion }}</p>
            <p class="capital"><strong>Capital:</strong> {{ country.capital }}</p>
          </div>

          <div class="col">
            <p class="population"><strong>Top Level Domain:</strong> {{ formatTopLevelDomain(country.topLevelDomain) }}</p>
            <p class="region"><strong>Currencies:</strong> {{ formatCurrencies(country.currencies) }}</p>
            <p class="capital"><strong>Languages:</strong> {{ formatLanguages(country.languages) }}</p>
          </div>
        </div>

        <div v-if="country.borders.length > 0" class="borders-countries">
          <p class="countries"><strong>Border Countries:</strong><router-link class="border-country" :to="{ name: 'single', params: { code: borderCountry.alpha2Code }}" v-for="borderCountry in getBordersCountries(country.borders)" :key="borderCountry.alpha2Code">{{ borderCountry.name }}</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'

export default {
  head() {
    return {
      title: {
        inner: 'Home'
      },
      meta: [
        {
          name: 'description',
          content: `${this.appTitle} home page`,
          id: 'desc'
        }
      ]
    }
  },
  computed: {
    ...mapState('app', ['appTitle', 'mode']),
    ...mapGetters('app', ['getCountryByCode', 'getBordersCountries']),
    country() { return this.getCountryByCode(this.$route.params.code) }
  },
  methods: {
    formatTopLevelDomain(list) {
      let string = ''

      list.forEach((element) => {
        if (list[list.length - 1] === element) {
          string += element
        } else {
          string = `${string}${element}, `
        }
      })

      return string
    },
    formatCurrencies(list) {
      let string = ''

      list.forEach((element) => {
        if (list[list.length - 1] === element) {
          string += element.name
        } else {
          string = `${string}${element.name}, `
        }
      })

      return string
    },
    formatLanguages(list) {
      let string = ''

      list.forEach((element) => {
        if (list[list.length - 1] === element) {
          string += element.name
        } else {
          string = `${string}${element.name}, `
        }
      })

      return string
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.page-wrapper {
  min-height: 85vh;
  padding: 80px 80px 45px;
  background: $light;

  @media (max-width: 767px) {
    padding: 40px 28px 60px;
  }

  &.dark {
    background: $dark;

    .back-btn {
      color: $white;
      background: $blueDark;

      svg path {
        fill: $white;
      }
    }

    .country-item {
      h2,
      p {
        color: $white;
      }

      .borders-countries .border-country {
        color: $white;
        background: $blueDark;
      }
    }
  }

  .actions-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 80px;

    @media (max-width: 899px) {
      flex-direction: column;
      align-items: flex-start;
    }

    @media (max-width: 767px) {
      margin-bottom: 64px;
    }
  }

  .back-btn    {
    display: inline-flex;
    align-items: center;
    padding: 10px 39px 10px 32px;
    color: inherit;
    font-style: $textDark;
    font-weight: 300;
    font-size: 16px;
    line-height: 20px;
    text-decoration: none;
    border-radius: 6px;
    background: $white;
    box-shadow: 0 0 7px rgba(0, 0, 0, 0.293139);

    @media (max-width: 767px) {
      padding: 6px 24px;
      font-size: 14px;

      svg {
        width: 18px;
        margin-right: 18px;
      }
    }

    svg {
      width: 20px;
      margin-right: 10px;
    }
  }

  .country-item {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;

    @media (max-width: 1023px) {
      flex-direction: column;
      align-items: flex-start;
    }

    .flag-wrapper {
      width: 50%;
      border-radius: 10.0057px;
      box-shadow: 0 0 14px 4px rgba(0, 0, 0, 0.0294384);

      @media (max-width: 1023px) {
        width: 100%;
        align-items: flex-start;
      }
    }

    .flag {
      object-fit: fill;
      width: 100%;
      height: 100%;
    }

    .details {
      width: 50%;
      padding: 39px 0 39px 80px;

      @media (max-width: 1023px) {
        width: 100%;
        padding: 44px 0 0;
      }

      h2 {
        margin: 0 0 23px;
        font-style: normal;
        font-weight: 800;
        font-size: 32px;
        line-height: 44px;

        @media (max-width: 767px) {
          font-size: 22px;
          line-height: 30px;
        }
      }

      p {
        font-style: normal;
        font-size: 16px;
        line-height: 32px;

        &:last-of-type {
          margin-bottom: 0;
        }

        @media (max-width: 767px) {
          font-size: 14px;
          line-height: 32px;
        }

        strong {
          font-weight: 600;
        }
      }
    }

    .infos {
      display: flex;
      justify-content: space-between;

      @media (max-width: 767px) {
        flex-direction: column;

        .col:last-of-type {
          margin-top: 32px;
        }
      }
    }

    .borders-countries {
      margin-top: 68px;

      @media (max-width: 767px) {
        margin-top: 34px;
      }

      strong {
        margin-bottom: 8px;
        margin-right: 16px;
        font-size: 16px;
        line-height: 24px;

        @media (max-width: 767px) {
          width: 100%;
          margin-bottom: 16px;
          margin-right: 0;
        }
      }

      .countries {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
      }

      .border-country {
        min-width: 96px;
        margin-bottom: 10px;
        margin-right: 10px;
        padding: 5px 10px 4px;
        border-radius: 2px;
        font-style: normal;
        font-weight: 300;
        font-size: 14px;
        line-height: 19px;
        color: $textDark;
        text-align: center;
        text-decoration: none;
        text-decoration: none;
        white-space: pre;
        background: $white;
        box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.104931);

        &:last-of-type {
          margin-right: 0;
        }

        @media (max-width: 767px) {
          padding: 6px 15px;
          font-size: 12px;
          line-height: 16px;
        }
      }
    }
  }
}
</style>
