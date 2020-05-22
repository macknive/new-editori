<template>
  <div v-html="deliverable.data.brief"></div>
</template>

<script>
export default {
  props: [
    'deliverable',
  ],
}
</script>

<style scoped>

</style>
