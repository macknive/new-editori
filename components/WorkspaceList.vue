<template>
  <div>
    <p>List of workspace</p>
    <ul v-for="workspace in workspaces" :key="workspace.id">
      <li>
        <nuxt-link :to="`${workspace.slug}`">{{
          workspace.name
        }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import ListWorkspaces from '~/queries/ListWorkspaces'
export default {
  data() {
    return {
      workspaces: []
    }
  },
  apollo: {
    workspaces: {
      prefetch: true,
      query: ListWorkspaces
    }
  }
}
</script>

<style></style>
