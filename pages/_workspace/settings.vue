<template>
  <div>
    <HeroSection></HeroSection>
    <BodySection>
      <p>
        In order to retrieve performance information about your posts, you
        will need to grant Editori access to your Google Account.
      </p>
      <button class="connect-google" @click="connectGoogle">
        Connect Your Google Account
      </button>
      <SiteList :workspace="workspace"></SiteList>
    </BodySection>
  </div>
</template>

<script>
import BodySection from "~/components/layout/BodySection.vue"
import HeroSection from "~/components/layout/HeroSection.vue"
import SiteList from "~/components/settings/SiteList.vue"

export default {
  components: { BodySection, HeroSection, SiteList },
  async asyncData(ctx) {
    const response = await ctx.$axios.get('/connections/google', {
      params: {
        'workspace': ctx.route.params.workspace,
      }
    });

    return {
      googleOauthUrl: response.data,
    }
  },
  data() {
    return {
      workspace: this.$route.params.workspace
    }
  },
  methods: {
    connectGoogle() {
      window.location.href = this.googleOauthUrl;
    }
  },
  mounted() {
    console.log('redirect URL', this.googleOauthUrl)
  }
}
</script>
