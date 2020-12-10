<template>
<div>

  <p>List of workspace</p>
  <ul v-for="workspace in workspaces" :key="workspace.id">
    <li>
      <nuxt-link :to="`${workspace.slug}`" target="_blank">{{workspace.name}}</nuxt-link>
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
}
</script>

<style>

</style>
