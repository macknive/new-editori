<template>
  <v-app>
    <button @click="connectGoogle">Connect Your Google Account</button>
  </v-app>
</template>

<script>
import getWorkspaceBySlug from '~/mixins/getWorkspaceBySlug'

export default {
  async asyncData(ctx) {
    const response = await ctx.$axios.get('/connections/google', {
      params: {
        'workspace': ctx.route.params.workspace,
      }
    });

    return {
      googleOauthUrl: response.data,
    }
  },
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
  mixins: [getWorkspaceBySlug],
  methods: {
    connectGoogle() {
      window.location.href = this.googleOauthUrl;
    }
  },
  mounted() {
    console.log('redirect URL', this.googleOauthUrl)
  }
}
</script>

<style scoped>
  button {
    display: inline-block;
    background: #ccc;
    padding: 20px 60px;
  }
</style>
