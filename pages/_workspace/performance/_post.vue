<template>
  <div>
    <HeroSection>
      <h1 class="title relative center">{{ page.title }}</h1>

      <div class="header-body relative">
        <TopOpportunities />
      </div>
    </HeroSection>

    <BodySection>
      <ArticleDetail />
    </BodySection>
  </div>
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
  created() {
    this.$store.commit('navbar/setShouldShowWorkspace', true);
  },
  data() {
    return {
      postSlug: this.$route.params.post,
      pages: []
    };
  },
  computed: {
    page() {
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
