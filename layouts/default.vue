<template>
  <div>
    <nuxt />
    <div v-if="isAuthenticated">
      <v-btn @click="onLogout" class="logout">Logout</v-btn>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
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
