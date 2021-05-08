<template>
  <HeroSection>
    <h1 class="title">Team</h1>
  </HeroSection>
</template>

<script>

import BodySection from '~/components/layout/BodySection'
import HeroSection from '~/components/layout/HeroSection'

export default {
  components: {
    BodySection, HeroSection
  },
  created() {
    this.$store.commit('navbar/setShouldShowWorkspace', true);
  },
}
</script>

<style scoped>
  .title {
    top: 200rem;
    left: 100rem;
  }
</style>