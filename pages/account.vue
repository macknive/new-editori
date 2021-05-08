<template>
  <div>
    <HeroSection>
      <h1 class="title">Account Settings</h1>
    </HeroSection>
    <BodySection>
      <button @click="onLogout">Logout</button>
    </BodySection>
  </div>
</template>

<script>

import BodySection from '~/components/layout/BodySection'
import HeroSection from '~/components/layout/HeroSection'

export default {
  components: {
    BodySection, HeroSection
  },
  created() {
    this.$store.commit('navbar/setShouldShowWorkspace', false);
  },
  methods: {
    async onLogout() {
      await this.$apolloHelpers.onLogout();
      await this.$auth.logout();
    }
  }
}
</script>

<style scoped>
  .title {
    top: 200rem;
    left: 100rem;
  }
</style>