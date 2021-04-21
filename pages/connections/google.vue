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
    const code = ctx.query.code;
    const response = await ctx.$axios.post('/connections/google', {
      'code': code,
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