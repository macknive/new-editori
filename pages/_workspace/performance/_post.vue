<template>
  <v-app>
    <HeroSection>
      <h1 class="title relative" align="center">{{ page.title }}</h1>
      <div class="header-body">
        <h3 class="pr-6">TOP OPPORTUNITIES</h3>
        <nuxt-link to="/"><h4>SEE ALL(12)</h4></nuxt-link>
        <TopOpportunities />
      </div>
    </HeroSection>

    <BodySection>
      <ArticleDetail />
    </BodySection>
  </v-app>
</template>

<script>
import BodySection from '~/components/layout/BodySection';
import HeroSection from '~/components/layout/HeroSection';
import GetPageBySlug from '~/queries/GetPageBySlug.gql';
import TopOpportunities from '~/components/TopOpportunities';
import ArticleDetail from '~/components/ArticleDetail';
export default {
  components: {
    BodySection,
    HeroSection,
    TopOpportunities,
    ArticleDetail
  },
  data() {
    return {
      postSlug: this.$route.params.post,
      pages: []
    };
  },
  computed: {
    async page() {
      return this.pages ? this.pages[0] : undefined;
    }
  },
  apollo: {
    pages: {
      prefetch: true,
      query: GetPageBySlug,
      skip() {
        return !this.postSlug;
      },
      variables() {
        return {
          postSlug: this.postSlug
        };
      }
    }
  }
};
</script>

<style>
.relative {
  position: relative;
}
.title {
  top: 200rem;
}
h3,
h4 {
  display: inline;
  margin-right: 20px;
}
.header-body {
  top: 350rem;
}
</style>
