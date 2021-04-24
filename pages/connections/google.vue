<template>
  <div>
    <!--
      This template should never be rendered; it should instead redirect due to
      the middleware installed below.
    -->
  </div>
</template>

<script>
export default {
  async middleware(ctx) {
    const { code, state, error } = ctx.query;

    if (error) {
      // TODO: Handle error use case.
    }

    const response = await ctx.$axios.post('/connections/google', {
      code,
      state
    })

    const { workspaceSlug } = response.data;
    
    return ctx.redirect(`/${workspaceSlug}/settings`);
  }
}
</script>
