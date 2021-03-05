<template>
  <BlogSelection :baseUrl="`/${workspaceSlug}`" />
</template>

<script>
import BlogSelection from '~/components/BlogSelection'
import GetWorkspaceBySlug from '~/queries/GetWorkspaceBySlug'
export default {
  layout: 'empty',
  components: {
    BlogSelection
  },
  data() {
    return {
      workspaces: [],
      workspaceSlug: this.$route.params.workspace
    }
  },
  apollo: {
    workspaces: {
      prefetch: true,
      query: GetWorkspaceBySlug,
      variables() {
        return {
          workspaceSlug: this.workspaceSlug
        }
      }
    }
  }
}
</script>

<style></style>
