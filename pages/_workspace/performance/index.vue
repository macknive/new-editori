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
        <SiteOverview :posts="posts" :workspace="workspace" />
      </v-container>
    </BodySection>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import getWorkspaceBySlug from '~/mixins/getWorkspaceBySlug';
import moment from 'moment';
import SiteOverview from '~/components/SiteOverview';
import BodySection from '~/components/layout/BodySection'
import HeroSection from '~/components/layout/HeroSection'

export default {
  head() {
    return {
      title: this.workspace.name
    };
  },
  components: {
    SiteOverview, BodySection, HeroSection
  },
  data() {
    return {
      posts: [
        {
          title: 'Best Animal Milk v1',
          trend: 'decreasing',
          assignee: 'user1',
          status: "Waiting on Editor's review",
          slug: 'animal-milk-1',
        },
        {
          title: 'Best Animal Milk v2',
          trend: 'decreasing',
          assignee: 'user1',
          status: "Waiting on Editor's review",
          slug: 'animal-milk-2',
        },
        {
          title: 'Best Animal Milk v3',
          trend: 'decreasing',
          assignee: 'user1',
          status: "Waiting on Editor's review",
          slug: 'animal-milk-3',
        },
        {
          title: 'The Top Benefits Of Kombucha',
          trend: 'increasing',
          assignee: 'user1',
          status: "Waiting on Editor's review",
          slug: 'benefits-of-kombucha',
        },
        {
          title: 'Top 10 Juicers',
          trend: 'stable',
          assignee: 'user2',
          status: "Waiting on Editor's review",
          slug: 'top-10-juicers',
        },
        {
          title: 'Green Tea Vs Black Tea',
          trend: 'decreasing',
          assignee: 'user3',
          status: "Waiting on Editor's review",
          slug: 'green-tea-vs-black-tea',
        },
        {
          title: 'A Guide For Kombucha Enthusiasts',
          trend: 'increasing',
          assignee: 'user1',
          status: "Waiting on Editor's review",
          slug: 'a-guide-for-kombucha-enthusiasts',
        },
        {
          title: 'The Best Tea Infuser',
          trend: 'decreasing',
          assignee: 'user3',
          status: "Waiting on Editor's review",
          slug: 'best-tea-infuser',
        },
        {
          title: 'Cheap Coffee You Should Buy Today',
          trend: 'stable',
          assignee: 'user2',
          status: "Waiting on Editor's review",
          slug: 'cheap-coffee',
        }
      ]
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
    formattedDate() {
      return moment(this.workspace.updated_at).format('ll');
    },
  },
  mixins: [getWorkspaceBySlug],
  methods: {
    async onLogout() {
      await this.$apolloHelpers.onLogout();
      await this.$auth.logout();
    }
  },
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
