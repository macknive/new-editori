<template>
  <v-app>
    <v-container class="container-700">
      <h1 align="center" class="py-5">Already Authenticated</h1>
      <p align="center">
        You can go to <nuxt-link to="/">Dashboard</nuxt-link> or proceed to the
        next step
      </p>

      <v-container class="workspace-container">
        <div class="spacer"></div>
        <div class="btn-end mb-12">
          <v-btn
            @click="proceed()"
            type="submit"
            block
            color="brown darken-3 white--text"
            class="py-7 step-button"
            >NEXT</v-btn
          >
        </div>
      </v-container>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      stepNumber: ''
    }
  },
  methods: {
    proceed() {
      this.$emit('thisStep', this.stepNumber)
    }
  }
}
</script>

<style></style>
