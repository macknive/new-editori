<template>
  <BlogSelection :baseUrl="`/${workspaceSlug}`" />
</template>

<script>
import BlogSelection from '~/components/BlogSelection'
import getWorkspaceBySlug from '~/mixins/getWorkspaceBySlug'
export default {
  components: {
    BlogSelection
  },
  data() {
    return {
      workspaces: [],
      workspaceSlug: this.$route.params.workspace
    }
  },
  mixins: [getWorkspaceBySlug]
}
</script>

<style></style>
