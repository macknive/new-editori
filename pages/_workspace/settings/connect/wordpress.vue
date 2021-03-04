<template>
  <v-app>
    <v-container v-if="!wpIncomplete" class="container-700">
      <div align="center">
        <h3 class="pb-8">HEY, NOT SO FAST...</h3>
        <div class="placeholder-gray"></div>
        <p class="f-16 py-8">
          It looks like you haven’t finished setting things up in WordPress.
          Make sure you have the Editori Connector for WordPress plugin
          installed and configured before continuing.
        </p>
        <v-row>
          <v-col
            ><v-btn
              @click="back()"
              block
              class="py-7"
              color="brown darken-3 white--text"
              >BACK</v-btn
            ></v-col
          >
          <v-col
            ><v-btn
              @click="checkWordpressConnection()"
              block
              class="py-7"
              color="brown darken-3 white--text"
              >DONE! CHECK AGAIN</v-btn
            ></v-col
          >
        </v-row>
      </div>
    </v-container>
    <v-container v-if="wpIncomplete" class="container-700">
      <div align="center">
        <h3 class="pb-8">
          AH, SO YOU'RE TEAM WORDPRESS
        </h3>
        <p class="f-16 pb-8">
          No Problem, we will use it as the source of truth to stay in sync. In
          Wordpress land the best way to do that is... you guessed it.. Plugins!
        </p>
        <div class="editori-border mb-4">
          <a>
            <v-container>
              <div class="editori-container mb-6" align="left">
                <span class="editori-logo px-5">e</span>
                <span class="editori-text" align="center">EDITORI</span>
              </div>
              <span class="text-brown">CONNECTOR FOR WORDPRESS</span>
            </v-container>
          </a>
        </div>
        <div class="mb-12">
          <i>Click to view on Wordpress</i>
        </div>
        <v-container class="container-300">
          <v-btn
            @click="checkWordpressConnection()"
            type="submit"
            block
            class="py-7"
            color="brown darken-3 white--text"
            >NEXT</v-btn
          >
        </v-container>
      </div>
    </v-container>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  data() {
    return {
      wpStatus: undefined,
      wpConnection: false,
      wpIncomplete: false
    }
  },
  methods: {
    checkWordpressConnection() {
      if (this.wpConnection == true) {
        this.wpStatus = 'complete'
        console.log('sucess')
      }
      this.wpIncomplete = false
      this.wpStatus = 'incomplete'
      console.log('fail')
    },
    back() {
      this.wpIncomplete = true
    }
  }
}
</script>

<style></style>
