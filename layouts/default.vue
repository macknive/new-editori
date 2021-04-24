<template>
  <div class="app-root">
    <Navbar class="nav" :workspace="workspace" :hideWorkspace="hideWorkspace" :userInitial="userInitial" />
    <header class="header">
      <portal-target name="hero-section"></portal-target>
    </header>
    <main class="main">
      <nuxt/>
      <footer class="footer">
        Copyright &copy; 2021, Editori
      </footer>
    </main>
  </div>
</template>
<script>
import Navbar from '~/components/layout/Navbar';
import { mapGetters } from 'vuex';

export default {
  components: {
    Navbar,
  },
  props: [ 'hideWorkspace' ],
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
    userInitial() {
      var str = this.loggedInUser.display_name
      var res = str.charAt(0)
      return res
    },
    workspace() {
      return {
        name: 'Drink Filtered',
        slug: 'drink-filtered',
      }
    }
  },
  methods: {
    async onLogout() {
      await this.$apolloHelpers.onLogout()
      await this.$auth.logout()
    }
  }
}
</script>

<style>
  html {
    --aspect-ratio: calc(2 / 1);
    --base-width: 1400;
    --base-height: 720;
    --section-width: 80vw;
    --section-height: calc(var(--section-width) / var(--aspect-ratio));
    --width-unit: calc(var(--section-width) / var(--base-width));
    --height-unit: calc(var(--section-height) / var(--base-height));
    --display-font: 'Montserrat', sans-serif;
    --body-font: 'Noto Sans', 'Roboto', sans-serif;
    --failing-red: #af125a;
    --passing-green: #68b684;
    color: #191919;
    font-size: var(--height-unit);
    font-family: var(--body-font);
    letter-spacing: 0.015em;
  }
  body {
    background: #fff8f0;
    font-size: 16px;
  }
  .label, button {
    font-family: var(--body-font);
    font-weight: 700;
    letter-spacing: 0.27em;
    text-transform: uppercase;
  }
  h1 {
    font-family: var(--display-font);
    letter-spacing: 0.015em;
    text-transform: uppercase;
  }
  button {
    background: #593d3b;
    border-radius: 5rem;
    color: #fff;
    padding: 16rem;
  }
</style>

<style scoped>
  .app-root {
    width: var(--section-width);
    margin: 0 auto;
    position: relative;
  }
  .nav {
    position: absolute;
    top: 60rem;
    left: 0;
    right: 0;
    z-index: 999;
  }
  .header {
    background: #fff8f0;
    height: var(--section-height);
    width: var(--section-width);
    font-size: 16rem;
    position: relative;
    z-index: 1;
  }
  .main {
    background: #fffefd;
    box-shadow: 0 0 50rem #0001;
    padding: 80rem 80rem 0;
    position: relative;
    z-index: 2;
  }
  .footer {
    background: #fffefd;
    display: grid;
    padding: 30px;
    place-items: center;
  }
</style>
