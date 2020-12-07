<template>
<div>
<h1>Landing page</h1>
List of workspaces
  <ul>
    <li v-for="workspaces in workspaces" :key="workspaces.id">
      <nuxt-link :to="`${workspaces.slug}`" target="_blank">{{workspaces.name}}</nuxt-link>
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
