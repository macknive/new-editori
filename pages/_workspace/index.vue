<template>
  <v-app>
    
  </v-app>
</template>

<script>
import getWorkspaceBySlug from '~/mixins/getWorkspaceBySlug'

export default {
  data() {
    return {
      workspaces: [],
      workspaceSlug: this.$route.params.workspace,
    }
  },
  computed: {
    workspace() {
      return this.workspaces[0]
    },
  },
  mixins: [getWorkspaceBySlug]
}
</script>

<style scoped>

</style>
