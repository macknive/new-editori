<template>
  <v-app>
    <div class="navbar">
      <v-row>
        <v-col
          ><nuxt-link to="/" class="link-style"
            ><h3 class="ml-12">EDITORI</h3></nuxt-link
          ></v-col
        >
        <v-col align="right" cols="1">
          <v-btn icon class="mt-2">
            <v-icon medium>mdi-magnify</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="2">
          <div v-if="isAuthenticated">
            <div class="avatar-placeholder">
              <div align="center" class="mt-1">
                <v-btn icon
                  ><h2>{{ userInitial }}</h2></v-btn
                >
              </div>
            </div>
          </div>
          <div v-if="!isAuthenticated" class="mt-3">
            <nuxt-link to="/login">login</nuxt-link>
          </div>
        </v-col>
      </v-row>
    </div>
    <nuxt />
    <div v-if="isAuthenticated && visible">
      <v-btn @click="onLogout" class="logout">Logout</v-btn>
    </div>
  </v-app>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      visible: false
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
    userInitial() {
      var str = this.loggedInUser.username
      var res = str.charAt(0)
      return res
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

<style></style>
