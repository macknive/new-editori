<template>
  <ul>
    <li v-for="siteUrl in siteList" :key="siteUrl">
      <div class="sc-site" :class="{ selected: selectedSite === siteUrl }"
          role="button" @click="selectSite(siteUrl)">
        <img :src="imageUrlForSite(siteUrl)" alt="">
        <span class="button-label">{{siteUrl}}</span>
      </div>
    </li>
  </ul>
</template>

<script>
const SITE_URL_DOMAIN_REGEX = /^(.+):\/?\/?(.+?)\/*$/;
const PROTOCOL_ORDERING = {
  'sc-domain': 0,
  'https': 1,
  'http': 2
};

function getSiteParts(siteUrl) {
  const matches = siteUrl.match(SITE_URL_DOMAIN_REGEX);
  if (!matches || !matches[1] || !matches[2]) {
    return undefined;
  }

  return matches;
}

function getSiteProtocol(siteUrl) {
  return getSiteParts(siteUrl)[1];
};

function getSiteUrlDomain(siteUrl) {
  return getSiteParts(siteUrl)[2];
};

export default {
  props: [ 'workspace' ],
  async fetch() {
    const response = await this.$axios.get('/connections/google/sites', {
      params: {
        'workspace': this.workspace,
      }
    });

    const siteList = response.data.siteList.sort((a, b) => {
      const domainA = getSiteUrlDomain(a);
      const domainB = getSiteUrlDomain(b);
      const domainSort = domainA.localeCompare(domainB);

      if (domainSort !== 0) {
        return domainSort;
      }

      const protocolA = PROTOCOL_ORDERING[getSiteProtocol(a)] || Infinity;
      const protocolB = PROTOCOL_ORDERING[getSiteProtocol(b)] || Infinity;
      return protocolA >= protocolB;
    });

    this.selectedSite = response.data.selectedSite;
    this.siteList = siteList;
  },
  data() {
    return {
      siteList: [],
      selectedSite: null,
    }
  },
  methods: {
    async selectSite(siteUrl) {
      const response = await this.$axios.post('/connections/google/sites', {
        workspaceSlug: this.workspace,
        siteUrl
      });
      this.selectedSite = siteUrl;
      console.log(response);
    },
    imageUrlForSite(siteUrl) {
      const domain = getSiteUrlDomain(siteUrl);
      if (!domain) {
        return undefined;
      }

      return `http://www.google.com/s2/favicons?domain=${domain}&sz=32`;
    }
  }
}
</script>

<style scoped>
  .sc-site {

  }

  .sc-site.selected {
    border: 2px solid green;
  }
</style>
