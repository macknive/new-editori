<template>
  <div class="app-root">
    <Navbar
      class="nav"
      :workspace="workspace"
      :loggedInUser="loggedInUser"
      :userInitial="userInitial"
      :shouldShowWorkspace="shouldShowWorkspaceInNavbar"
    />
    <header class="header">
      <portal-target name="hero-section"></portal-target>
    </header>
    <main class="main">
      <div class="body-wrapper">
        <nuxt />
      </div>
      <footer class="footer">
        Copyright &copy; 2021, Editori
      </footer>
    </main>
  </div>
</template>
<script>
import getWorkspaceBySlug from '~/mixins/getWorkspaceBySlug';
import Navbar from '~/components/layout/Navbar';
import { mapGetters } from 'vuex';

export default {
  components: {
    Navbar
  },
  mixins: [getWorkspaceBySlug],
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
    userInitial() {
      if (!this.loggedInUser) {
        return undefined;
      }

      const names = this.loggedInUser.display_name.split(' ');
      const lastIndex = names.length - 1;

      if (lastIndex === 0) {
        return names[0];
      }

      return `${names[0].charAt(0)}${names[lastIndex].charAt(0)}`;
    },
    shouldShowWorkspaceInNavbar() {
      return this.$store.getters['navbar/shouldShowWorkspace'];
    }
  },
  methods: {
    async onLogout() {
      await this.$apolloHelpers.onLogout();
      await this.$auth.logout();
    }
  }
};
</script>

<style>
html {
  --aspect-ratio: calc(2 / 1);
  --base-width: 1400;
  --base-height: 720;
  --hero-width: 80vw;
  --hero-height: calc(var(--hero-width) / var(--aspect-ratio));
  --width-unit: calc(var(--hero-width) / var(--base-width));
  --height-unit: calc(var(--hero-height) / var(--base-height));
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
.label,
button {
  font-family: var(--body-font);
  font-weight: 700;
  letter-spacing: 0.27em;
  text-transform: uppercase;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--display-font);
  font-weight: 400;
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
  width: var(--hero-width);
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
  height: var(--hero-height);
  width: var(--hero-width);
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
  margin-top: var(--main-top-margin);
  min-height: calc(100vh - var(--hero-height));
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.footer {
  background: #fffefd;
  display: grid;
  padding: 30px;
  place-items: center;
}
</style>
