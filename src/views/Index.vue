<template>
  <div class="page-wrapper" :class="{ 'dark': mode === 'dark' }">
    <div class="actions-wrapper">
      <div class="input-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18"><path fill="#848484" fill-rule="evenodd" d="M12.5 11h-.8l-.3-.3c1-1.1 1.6-2.6 1.6-4.2C13 2.9 10.1 0 6.5 0S0 2.9 0 6.5 2.9 13 6.5 13c1.6 0 3.1-.6 4.2-1.6l.3.3v.8l5 5 1.5-1.5-5-5Zm-6 0C4 11 2 9 2 6.5S4 2 6.5 2 11 4 11 6.5 9 11 6.5 11Z" clip-rule="evenodd"/></svg>
        <input type="text" :class="{ 'text-grey': mode === 'light' && currentSearch === initialSearch }" v-model="currentSearch" @blur="onBlur" @focus="onFocus">
      </div>

      <div class="input-wrapper select">
        <input type="text" v-model="currentSelect" readonly @click.prevent="toggleRegions($event)">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 12"><path fill="#000" fill-rule="evenodd" d="M9.45 3.45 6 6.9 2.55 3.45 1.5 4.5 6 9l4.5-4.5-1.05-1.05Z" clip-rule="evenodd"/></svg>

        <div class="select-choices">
          <div v-for="(region, index) in regions" :key="index" class="choice" @click.prevent="toggleRegion($event)">{{ region }}</div>
        </div>
      </div>
    </div>

    <div class="countries-listing">
      <router-link v-for="country in getCountries()" :key="country.alpha2Code" :to="{ name: 'single', params: { code: country.alpha2Code }}"  :class="{ 'dark': mode === 'dark' }" class="country-item">
        <div class="flag-wrapper">
          <img class="flag" :src="country.flag" :alt="country.name">
        </div>

        <div class="details">
          <h2 class="name">{{ country.name }}</h2>
          <p class="population"><strong>Population:</strong> {{ country.population.toLocaleString('en-US') }}</p>
          <p class="region"><strong>Region:</strong> {{ country.region }}</p>
          <p class="capital"><strong>Capital:</strong> {{ country.capital }}</p>
        </div>
      </router-link>
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
    ...mapState('app', ['appTitle', 'mode', 'regions']),
    ...mapGetters('app', ['getCountriesFromFilters'])
  },
  data() {
    return {
      initialSearch: 'Search for a country...',
      currentSearch: '',
      initialSelect: 'Filter by Region',
      currentSelect: ''
    }
  },
  methods: {
    onBlur() {
      if (this.currentSearch === '')
        this.currentSearch = this.initialSearch
    },
    onFocus() {
      if (this.currentSearch === this.initialSearch)
        this.currentSearch = ''
    },
    toggleRegions(e) {
      const parent = e.target.parentElement

      if (parent)
        parent.classList.toggle('open')
    },
    toggleRegion(e) {
      const text = e.target.textContent

      if (text === this.currentSelect) {
        this.currentSelect = this.initialSelect
      } else {
        this.currentSelect = text
      }
    },
    getCountries() {
      const search = this.currentSearch === this.initialSearch ? '' : this.currentSearch
      const select = this.currentSelect === this.initialSelect ? '' : this.currentSelect

      return this.getCountriesFromFilters(search, select)
    }
  },
  mounted() {
    this.currentSearch = this.initialSearch
    this.currentSelect = this.initialSelect
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.page-wrapper {
  min-height: 85vh;
  padding: 48px 80px 45px;
  background: $light;

  @media (max-width: 767px) {
    padding: 24px 55px 65px;
  }

  &.dark {
    background: $dark;

    .input-wrapper {
      background: $blueDark;

      svg path {
        fill: $white;
      }

      input {
        color: $white;
      }
    }

    .select-choices {
      background: $blueDark;

      .choice {
        color: $white;
      }
    }

    .country-item,
    .country-item:visited,
    .country-item:active {
      background: $blueDark;

      .details h2,
      .details p {
        color: $white;
      }
    }
  }

  .actions-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 48px;

    @media (max-width: 899px) {
      flex-direction: column;
      align-items: flex-start;
    }

    @media (max-width: 767px) {
      margin-bottom: 32px;
    }
  }

  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 480px;
    padding: 18px 32px;
    border-radius: 5px;
    background: $white;
    box-shadow: 0 2px 9px rgba(0, 0, 0, 0.0532439);
    box-sizing: border-box;

    @media (max-width: 899px) {
      margin-bottom: 40px;

      &:last-of-type {
        margin-bottom: 0;
      }
    }

    @media (max-width: 499px) {
      padding: 14px 32px;
    }

    &.select {
      max-width: 200px;
      padding: 18px 18px 18px 24px;
      cursor: pointer;

      &.open {
        .select-choices {
          max-height: 500px;
          padding: 16px 24px;
        }

        svg {
          transform: rotate(180deg);
        }
      }

      svg {
        width: 12px;
        margin-right: 0;
        margin-left: 24px;
        transition: all 1s ease-in-out;

        @media (max-width: 499px) {
          width: 10px;
        }
      }

      input {
        cursor: pointer;
      }
    }

    svg {
      width: 18px;
      margin-right: 24px;

      @media (max-width: 499px) {
        width: 16px;
      }
    }

    input {
      width: 100%;
      padding: 0;
      border: 0;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
      color: $textDark;
      background: transparent;

      &.text-grey {
        color: $textGrey;
      }

      &:focus,
      &:active {
        outline: 0;
      }

      @media (max-width: 499px) {
        font-size: 12px;
        line-height: 20px;
      }
    }
  }

  .select-choices {
    position: absolute;
    top: calc(100% + 4px);
    right: 0;
    left: 0;
    z-index: 1;
    overflow: hidden;
    max-height: 0;
    padding: 0 24px;
    border-radius: 5px;
    background: $white;
    box-shadow: 0 2px 9px rgba(0, 0, 0, 0.0532439);
    transition: all 1s ease-in-out;

    .choice {
      margin-bottom: 8px;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
      color: $textDark;
      cursor: pointer;

      &:last-of-type {
        margin-bottom: 0;
      }

      @media (max-width: 499px) {
        font-size: 12px;
        line-height: 16px;
      }
    }
  }

  .countries-listing {
    display: grid;
    grid-gap: 75px;
    grid-template-columns: 1fr 1fr 1fr 1fr;

    @media (max-width: 1199px) {
      grid-template-columns: 1fr 1fr 1fr;
    }

    @media (max-width: 899px) {
      grid-template-columns: 1fr 1fr;
    }

    @media (max-width: 767px) {
      grid-gap: 40px;
    }

    @media (max-width: 499px) {
      grid-template-columns: 1fr;
    }
  }

  .country-item,
  .country-item:visited,
  .country-item:active {
    position: relative;
    overflow: hidden;
    border-radius: 5px;
    color: inherit;
    text-decoration: none;
    background: $white;
    box-shadow: 0 0 7px 2px rgba(0, 0, 0, 0.0294384);
    cursor: pointer;

    .flag-wrapper {
      height: 160px;
    }

    .flag {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }

    .details {
      padding: 24px 24px 46px;

      h2 {
        margin: 0 0 16px;
        font-style: normal;
        font-weight: 800;
        font-size: 18px;
        line-height: 26px;
        color: $textDark;

        @media (max-width: 499px) {
          font-size: 18px;
          line-height: 26px;
        }
      }

      p {
        margin: 0 0 8px;
        font-style: normal;
        font-weight: 300;
        font-size: 14px;
        line-height: 16px;
        color: $textDark;

        strong {
          font-weight: 600;
        }

        &:last-of-type {
          margin-bottom: 0;
        }

        @media (max-width: 499px) {
          font-size: 14px;
          line-height: 16px;
        }
      }
    }
  }
}
</style>
