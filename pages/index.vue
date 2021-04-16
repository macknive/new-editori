<template>
  <v-container>
    <div v-if="!isAuthenticated">
      Not Authenticated. Please <nuxt-link to="/login">login</nuxt-link> to
      continue.
    </div>
    <div v-if="isAuthenticated">
      <WorkspaceList />
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import WorkspaceList from '@/components/WorkspaceList';

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
      await this.$apolloHelpers.onLogout();
      await this.$auth.logout();
    }
  }
};
</script>

<style></style>
