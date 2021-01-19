<template>
  <div>
    <p v-if="deliverable.data.keyword">
      <b>Primary keyword:</b> {{ deliverable.data.keyword }}
    </p>
    <div v-html="deliverable.data.brief"></div>
  </div>
</template>

<script>
export default {
  props: ['deliverable']
}
</script>

<style scoped></style>
