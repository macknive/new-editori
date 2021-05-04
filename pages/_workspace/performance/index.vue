<template>
  <v-app>
    <HeroSection>
      <h1 class="title">Performance</h1>
    </HeroSection>
    <BodySection>
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
        <SiteOverview :posts="this.workspace.pages" :workspace="workspace" />
      </v-container>
    </BodySection>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import getWorkspaceBySlug from '~/mixins/getWorkspaceBySlug';
import moment from 'moment';
import SiteOverview from '~/components/SiteOverview';
import BodySection from '~/components/layout/BodySection';
import HeroSection from '~/components/layout/HeroSection';

export default {
  head() {
    return {
      title: this.workspace.name
    };
  },
  components: {
    SiteOverview,
    BodySection,
    HeroSection
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
    formattedDate() {
      return moment(this.workspace.updated_at).format('ll');
    }
  },
  mixins: [getWorkspaceBySlug],
  methods: {
    async onLogout() {
      await this.$apolloHelpers.onLogout();
      await this.$auth.logout();
    }
  }
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
.v-list {
  width: 80px;
}
.inline {
  display: inline;
}
.title {
  top: 200rem;
  left: 100rem;
}
</style>
