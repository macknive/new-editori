<template>
<div>
<h1>Landing page</h1>
  <button @click="onLogout" class="logout">Logout</button>
  <div class="landingMessage"></div>
  <ul v-for="workspace in workspaces" :key="workspace.id" class="indexWorkspace">
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
  mounted() {
    //wait for query to load to display proper message on after login
    setTimeout(() => {
      var target = document.querySelector(".indexWorkspace")
      if (target) {
        document.querySelector(".landingMessage").innerHTML = "List of workspaces:"
        document.querySelector(".indexWorkspace").style.display = "block"
        document.querySelector(".logout").style.display = "block"
      } else {
        document.querySelector(".landingMessage").innerHTML = "Please <a href='/login'>login</a> to see workspaces"
      }
    }, 500);
  },
  methods: {
    async onLogout() {
      await this.$apolloHelpers.onLogout()
      document.querySelector(".landingMessage").innerHTML = "Logout successful <br> Please <a href='/login'>login</a> to see workspaces"
      document.querySelector(".logout").style.display = "none"
    }
  }
}
</script>

<style>
.indexWorkspace, .logout {
  display: none;
}
</style>
