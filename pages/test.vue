<template>
  <v-app>
    <v-container class="container-1200">
      <div align="right" class="text-gray">
        Last updated formattedDate
      </div>
      <h1 align="center">dashboard</h1>
      <p align="center" class="my-6">
        Hey this.loggedInUser.display_name , view workspace.name's performance
        focusing on
        <nuxt-link to="/" class="text-brown">page views</nuxt-link> over the
        <nuxt-link to="/" class="text-brown">last week</nuxt-link>
      </p>
      <h4 class="my-6">SITE OVERVIEW</h4>
      <SiteOverview :posts="posts" />
    </v-container>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import getWorkspaceBySlug from '~/mixins/getWorkspaceBySlug';
import moment from 'moment';
import SiteOverview from '~/components/SiteOverview';

export default {
  layout: 'dashboard',
  head() {
    return {
      title: 'this.workspace.name'
    };
  },
  components: {
    SiteOverview
  },
  data() {
    return {
      workspaces: [],
      workspaceSlug: this.$route.params.workspace,
      posts: [
        {
          title: 'Best Animal Milk v1',
          trend: 'decreasing',
          assignee: 'user1',
          status: "Waiting on Editor's review"
        },
        {
          title: 'Best Animal Milk v2',
          trend: 'decreasing',
          assignee: 'user1',
          status: "Waiting on Editor's review"
        },
        {
          title: 'Best Animal Milk v3',
          trend: 'decreasing',
          assignee: 'user1',
          status: "Waiting on Editor's review"
        },
        {
          title: 'The Top Benefits Of Kombucha',
          trend: 'increasing',
          assignee: 'user1',
          status: "Waiting on Editor's review"
        },
        {
          title: 'Top 10 Juicers',
          trend: 'stable',
          assignee: 'user2',
          status: "Waiting on Editor's review"
        },
        {
          title: 'Green Tea Vs Black Tea',
          trend: 'decreasing',
          assignee: 'user3',
          status: "Waiting on Editor's review"
        },
        {
          title: 'A Guide For Kombucha Enthusiasts',
          trend: 'increasing',
          assignee: 'user1',
          status: "Waiting on Editor's review"
        },
        {
          title: 'The Best Tea Infuser',
          trend: 'decreasing',
          assignee: 'user3',
          status: "Waiting on Editor's review"
        },
        {
          title: 'Cheap Coffee You Should Buy Today',
          trend: 'stable',
          assignee: 'user2',
          status: "Waiting on Editor's review"
        }
      ]
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
