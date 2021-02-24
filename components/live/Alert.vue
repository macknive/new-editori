<template>
  <v-alert type="success" class="success-alert" :value="alert">
    <div align="left">
      <v-row>
        <v-col><p class="mb-0">Success!</p></v-col>
        <v-col align="right"
          ><i
            aria-hidden="true"
            class="v-icon notranslate v-alert__icon mdi mdi-check-circle theme--dark"
          ></i
        ></v-col>
      </v-row>
      Your posts are being imported from wordPress
    </div>
  </v-alert>
</template>

<script>
export default {
  data() {
    return {
      alert: true
    }
  },
  created() {
    setTimeout(() => {
      this.alert = false
    }, 1000)
  }
}
</script>

<style></style>
