<template>
<div>
  <h1>Landing page</h1>
  <div v-if="!isAuthenticated">
    Not Authenticated. Please <nuxt-link to="/login">login</nuxt-link> to continue.
  </div>
  <div v-if="isAuthenticated">
    <Authenticated/>
  </div>
</div>
</template>

<script>
import { mapGetters } from "vuex";
import Authenticated from '@/components/Authenticated'

export default {
  middleware: "auth",
  computed: {
  ...mapGetters(["isAuthenticated", "loggedInUser"]),
  },
  components: {
    Authenticated
  }
}
</script>

<style>

</style>
