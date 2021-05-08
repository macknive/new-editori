<template>
  <HeroSection>
    <no-ssr>
      <v-calendar class="calendar"></v-calendar>
    </no-ssr>
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
  .calendar {
    background: transparent;
    border: 0;
    left: 929rem;
    top: 228rem;
    width: 425rem;
    height: 481rem;
    font-family: var(--display-font);
  }

  .calendar >>> .vc-title {
    text-transform: uppercase;
  }

  .calendar >>> .vc-day {
    font-size: 28rem !important;
  }

  .calendar >>> .vc-day.is-not-in-month {
    font-size: 16rem !important;
    opacity: 0.4 !important;
  }
</style>