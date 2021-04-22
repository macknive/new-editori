<template>
  <ul>
    <li v-for="siteUrl in siteList" :key="siteUrl">
      <!-- TODO: Mark one as selected -->
      <div role="button" @click="selectSite(siteUrl)">
        <img :src="imageUrlForSite(siteUrl)" alt="">
        <span class="button-label">{{siteUrl}}</span>
      </div>
    </li>
  </ul>
</template>

<script>
const SITE_URL_DOMAIN_REGEX = /:\/?\/?(.+?)\/*$/

export default {
  async asyncData(ctx) {
    const response = await ctx.$axios.get('/connections/google/sites', {
      params: {
        'workspace': ctx.route.params.workspace,
      }
    });

    return {
      siteList: response.data,
    }
  },
  data() {
    return {
      workspaceSlug: this.$route.params.workspace
    }
  },
  methods: {
    getSiteUrlDomain(siteUrl) {
      const matches = siteUrl.match(SITE_URL_DOMAIN_REGEX);
      if (!matches || !matches[1]) {
        return undefined;
      }

      return matches[1];
    },
    async selectSite(siteUrl) {
      console.log('sending', this.workspaceSlug, siteUrl);
      const response = await this.$axios.post('/connections/google/sites', {
        workspaceSlug: this.workspaceSlug,
        siteUrl
      });
      console.log(response);
    },
    imageUrlForSite(siteUrl) {
      const domain = this.getSiteUrlDomain(siteUrl);
      if (!domain) {
        return undefined;
      }

      return `http://www.google.com/s2/favicons?domain=${domain}&sz=32`;
    }
  }
}
</script>

<style>

</style>
