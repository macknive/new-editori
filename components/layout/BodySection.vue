<template>
  <div class="body-content">
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  .body-content {
    min-height: 100vh;
  }
  h2 {
    font-family: var(--body-font);
    font-weight: 700;
    letter-spacing: 0.27em;
    text-transform: uppercase;
  }
</style>