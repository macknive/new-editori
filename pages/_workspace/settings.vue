<template>
  <SiteList :workspace="workspace"></SiteList>
</template>

<script>
import SiteList from "~/components/settings/SiteList.vue"

export default {
  components: { SiteList },
  data() {
    return {
      workspace: this.$route.params.workspace
    }
  }
}
</script>
