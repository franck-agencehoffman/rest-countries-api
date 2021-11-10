<template>
  <header class="navbar" :class="{ 'dark': mode === 'dark' }">
    <h1 class="navbar-title">Where in the world?</h1>

    <a href="#" class="mode-switcher" @click.prevent="toggleMode(mode === 'dark' ? 'light' : 'dark')">
      <svg v-if="mode === 'light'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#fff" fill-rule="evenodd" stroke="#111517" d="M10.843 11.052c-3.108 0-5.628-2.31-5.628-5.157 0-1.075.358-2.07.97-2.895C3.752 3.756 2 5.865 2 8.35 2 11.47 4.76 14 8.163 14c2.711 0 5.013-1.605 5.837-3.836-.9.56-1.987.888-3.157.888Z" clip-rule="evenodd"/></svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path fill="#fff" fill-rule="evenodd" d="M13.553 13.815c-3.884 0-7.034-2.887-7.034-6.447 0-1.343.448-2.586 1.212-3.618-3.04.945-5.231 3.581-5.231 6.688 0 3.9 3.45 7.062 7.704 7.062 3.389 0 6.266-2.007 7.296-4.796a7.458 7.458 0 0 1-3.947 1.111Z" clip-rule="evenodd"/></svg>

      <span>{{ mode === 'dark' ? 'Light Mode' : 'Dark Mode' }}</span>
    </a>
  </header>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  computed: {
    ...mapState('app', ['mode'])
  },
  methods: {
    ...mapActions('app', ['toggleMode'])
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.navbar {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 23px 80px 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.0562443);

  @media (max-width: 767px) {
    padding: 30px 16px;
  }

  &.dark {
    background: $blueDark;

    .navbar-title,
    .mode-switcher span {
      color: $white;
    }
  }

  .navbar-title {
    margin: 0;
    font-size: 24px;
    font-weight: 800;
    color: $textDark;

    @media (max-width: 767px) {
      font-size: 14px;
      line-height: 20px;
    }
  }

  .mode-switcher {
    margin: 0;
    display: inline-flex;
    align-items: center;
    text-decoration: none;

    svg {
      width: 20px;
      margin-right: 8px;

      @media (max-width: 767px) {
        width: 16px;
      }
    }

    span {
      color: $textDark;
      font-weight: 600;
      font-size: 16px;
      line-height: 22px;

      @media (max-width: 767px) {
        font-size: 12px;
        line-height: 16px;
      }
    }
  }
}
</style>
