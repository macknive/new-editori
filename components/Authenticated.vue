<template>
<div>

  <button @click="onLogout" class="logout">Logout</button>
  <p>List of workspace</p>
  <ul v-for="workspace in workspaces" :key="workspace.id">
    <li>
      <nuxt-link :to="`${workspace.slug}`" @click="window.location.reload(true)">{{workspace.name}}</nuxt-link>
    </li>
  </ul>

</div>

</template>

<script>
import gql from 'graphql-tag'
export default {
  apollo: {
    workspaces: gql 
      `query GetWorkspaceBySlug {
      workspaces {
        id
        name
        slug
      }
    }`
  },
  methods: {
    async onLogout() {
      await this.$apolloHelpers.onLogout()
      await this.$auth.logout()
    }
  }
}
</script>

<style>

</style>
