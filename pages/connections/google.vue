<template>
  <div>
    Successfully connected account!
    
    <dl>
      <dt>Code:</dt><dd>{{code}}</dd>
      <dt>Access Token:</dt><dd>{{accessToken}}</dd>
    </dl>
  </div>
</template>

<script>
export default {
  async asyncData(ctx) {
    const { code, state } = ctx.query;
    const response = await ctx.$axios.post('/connections/google', {
      code,
      state
    })

    return {
      code: code,
      accessToken: response.data
    }
  }
}
</script>

<style>

</style>