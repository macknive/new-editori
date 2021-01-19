<template>
  <v-container>
    <h1>Landing page</h1>
    <div v-if="!isAuthenticated">
      Not Authenticated. Please <nuxt-link to="/login">login</nuxt-link> to
      continue.
    </div>
    <div v-if="isAuthenticated">
      <v-btn @click="onLogout" class="logout">Logout</v-btn>
      <WorkspaceList />
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import WorkspaceList from '@/components/WorkspaceList'

export default {
  middleware: 'auth',
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
  components: {
    WorkspaceList
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
