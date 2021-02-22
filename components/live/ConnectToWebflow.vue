<template>
  <v-app>
    <v-container class="container-700">
      <div align="center">
        <h3>
          AH, SO YOU'RE TEAM WEBFLOW
        </h3>
        <p class="f-16">
          No Problem, we will use it as the source of truth to stay in sync.
          Just connect your account.
        </p>
        <Webflow />
        <div class="mb-12">
          <i>Click to login to Webflow</i>
        </div>

        <v-btn
          type="submit"
          block
          class="py-7"
          color="brown darken-3 white--text"
          >NEXT</v-btn
        >
      </div>
    </v-container>
  </v-app>
</template>

<script>
import Webflow from '~/components/live/Webflow'
export default {
  components: {
    Webflow
  },
  methods: {
    proceed
  }
}
</script>

<style></style>
