<template>
  <v-app>
    <HeroSection :shapes="shapes">
      <h1 class="title">
        Hone in on performance, focusing on <a href="#">page views</a> over the
        <a href="#">last week</a>.
      </h1>
      <Glance class="glance" title="Site Stats" :figures="glance" size="68rem" />
    </HeroSection>
    <BodySection>
      <PerformancePostCarousel
        :posts="pinned"
        :workspace="workspace"
        title="Pinned Posts"
        v-if="pinned.length">
      </PerformancePostCarousel>

      <PerformancePostCarousel
        :posts="decreasing"
        :workspace="workspace"
        title="Posts that are Declining"
        v-if="decreasing.length">
      </PerformancePostCarousel>

      <PerformancePostCarousel
        :posts="increasing"
        :workspace="workspace"
        title="Posts that are Increasing"
        v-if="increasing.length">
      </PerformancePostCarousel>

      <PerformancePostCarousel
        :posts="stable"
        :workspace="workspace"
        title="Posts that are Stable"
        v-if="stable.length">
      </PerformancePostCarousel>
    </BodySection>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import getWorkspaceBySlug from '~/mixins/getWorkspaceBySlug';
import moment from 'moment';
import BodySection from '~/components/layout/BodySection';
import HeroSection from '~/components/layout/HeroSection';
import Glance from '~/components/Glance.vue';
import PerformancePostCarousel from '~/components/cardgroups/PerformancePostCarousel';
import { PostTrend, PostPresentation } from '~/types/post-enums';


export default {
  head() {
    return {
      title: this.workspace.name
    };
  },
  components: {
    PerformancePostCarousel,
    BodySection,
    HeroSection,
    Glance
  },
  data() {
    return {
      shapes: [
        { type: 'circle', x: 674, y: -167, size: 792, color: '#fffefd' },
      ]
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
    formattedDate() {
      return moment(this.workspace.updated_at).format('ll');
    },
    glance() {
      return [
        { value: this.allDecreasing.length, caption: 'Declining posts' },
        { value: this.allIncreasing.length, caption: 'Increasing posts' },
        { value: this.allStable.length, caption: 'Stable posts' },
      ];
    },
    pinned() {
      return this.workspace.pages.filter(
        value => value.presentation === PostPresentation.PINNED
      );
    },
    decreasing() {
      return this.allDecreasing.filter(
        value => value.presentation === PostPresentation.NORMAL
      );
    },
    increasing() {
      return this.allIncreasing.filter(
        value => value.presentation === PostPresentation.NORMAL
      );
    },
    stable() {
      return this.allStable.filter(
        value => value.presentation === PostPresentation.NORMAL
      );
    },
    allDecreasing() {
      return this.workspace.pages.filter(value => value.trend === PostTrend.DECREASING);
    },
    allIncreasing() {
      return this.workspace.pages.filter(value => value.trend === PostTrend.INCREASING);
    },
    allStable() {
      return this.workspace.pages.filter(value => value.trend === PostTrend.STABLE);
    },
  },
  mixins: [getWorkspaceBySlug],
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
  left: 48rem;
  top: 278rem;
  font-family: var(--body-font);
  font-size: 46rem;
  font-weight: 300;
  text-transform: none;
  line-height: 224.5%;
  width: 571rem;
}
.title > a {
  color: #593D3B;
  font-weight: 700;
  text-decoration: underline;
}
.glance {
  left: 823rem;
  top: 280rem;
}
</style>
