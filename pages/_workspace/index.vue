<template>
  <v-app>
    <v-container class="container-1200">
      <div align="right" class="text-gray">
        Last updated {{ formattedDate }}
      </div>
      <h1 align="center">dashboard</h1>
      <p align="center" class="my-6">
        Hey {{ this.loggedInUser.display_name }}, view {{ workspace.name }}'s
        performance focusing on
        <nuxt-link to="/" class="text-brown">page views</nuxt-link> over the
        <nuxt-link to="/" class="text-brown">last week</nuxt-link>
      </p>
      <h4 class="my-6">SITE OVERVIEW</h4>
      <SiteOverview />
      <h4 class="my-6">POST YOU'RE WORKING ON (10)</h4>
      <WorkingPosts /><br />
      <PostStatus />
    </v-container>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import getWorkspaceBySlug from '~/mixins/getWorkspaceBySlug';
import moment from 'moment';
import SiteOverview from '~/components/SiteOverview';
import WorkingPosts from '~/components/WorkingPosts';
import PostStatus from '~/components/PostStatus';

export default {
  layout: 'dashboard',
  head() {
    return {
      title: this.workspace.name
    };
  },
  components: {
    SiteOverview,
    WorkingPosts,
    PostStatus
  },
  data() {
    return {
      workspaces: [],
      workspaceSlug: this.$route.params.workspace
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
    workspace() {
      return this.workspaces[0];
    },
    formattedDate() {
      return moment(this.workspace.updated_at).format('ll');
    }
  },
  mixins: [getWorkspaceBySlug]
};
</script>

<style scoped>
span {
  font-size: 24px;
  letter-spacing: 1px;
}
h4 {
  font-family: unset;
}
</style>
