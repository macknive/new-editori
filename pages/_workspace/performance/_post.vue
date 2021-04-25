<template>
  <div>Post: {{postSlug}}</div>
</template>

<script>
export default {
  data() {
    return {
      postSlug: this.$route.params.post,
    };
  }
}
</script>

<style>

</style>