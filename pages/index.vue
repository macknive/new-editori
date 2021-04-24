<template>
  <v-container>
    <div v-if="!isAuthenticated">
      Not Authenticated. Please <nuxt-link to="/login">login</nuxt-link> to
      continue.
    </div>
    <div v-if="isAuthenticated">
      No worspaces found
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  middleware: ['auth', 'default-workspace'],
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
  methods: {
    async onLogout() {
      await this.$apolloHelpers.onLogout();
      await this.$auth.logout();
    }
  },
};
</script>

<style></style>
