<template>
  <v-app>
    <v-container class="wp-connection-fail container-700" style="display: none">
      <div align="center">
        <h3>HEY, NOT SO FAST...</h3>
        <div class="placeholder-gray"></div>
        <p class="f-16">
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
    <v-container class="container-700 wp-container">
      <div align="center">
        <h3>
          AH, SO YOU'RE TEAM WORDPRESS
        </h3>
        <p class="f-16">
          No Problem, we will use it as the source of truth to stay in sync. In
          Wordpress land the best way to do that is... you guessed it.. Plugins!
        </p>
        <a>
          <div class="editori-border mb-4">
            <v-container>
              <div class="editori-container mb-6" align="left">
                <span class="editori-logo px-5">e</span>
                <span class="editori-text" align="center">EDITORI</span>
              </div>
              <span>CONNECTOR FOR WORDPRESS</span>
            </v-container>
          </div>
        </a>
        <div class="mb-12">
          <i>Click to view on Wordpress</i>
        </div>

        <v-btn
          @click="checkWordpressConnection()"
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
export default {
  data() {
    return {
      wpStatus: '',
      wpConnection: false
    }
  },
  methods: {
    checkWordpressConnection() {
      if (this.wpConnection == true) {
        this.wpStatus = 'complete'
        this.$emit('dataForWp', this.wpStatus)
        return
      }
      this.wpStatus = 'incomplete'
      this.$emit('dataForWp', this.wpStatus)
      document.querySelector('.wp-container').style.display = 'none'
      document.querySelector('.wp-connection-fail').style.display = 'block'
    },
    back() {
      document.querySelector('.wp-container').style.display = 'block'
      document.querySelector('.wp-connection-fail').style.display = 'none'
    }
  }
}
</script>

<style></style>
