<template>
  <aside class="save-icon-root" :class="`${status}-state`">
    <font-awesome-icon icon="save" class="base-icon"></font-awesome-icon>
    <font-awesome-icon icon="exclamation-circle" class="error-icon badge"></font-awesome-icon>
    <font-awesome-icon icon="check-circle" class="success-icon badge"></font-awesome-icon>
  </aside>
</template>

<script>
export default {
  props: ['status']
}
</script>

<style scoped>
  .save-icon-root {
    opacity: 0.3;
    display: flex;
    width: 32px;
    height: 32px;
    position: relative;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: opacity 0.5s ease-in-out;
    font-size: 24px;
  }

  .waiting-state {
    opacity: 0.3;
  }

  .saving-state {
    -webkit-animation: loading-pulse cubic-bezier(0.45, 0, 0.55, 1) 0.3s infinite alternate;
    animation: loading-pulse cubic-bezier(0.45, 0, 0.55, 1) 0.3s infinite alternate;
  }

  .saved-state, .error-state {
    opacity: 0.7;
  }

  .base-icon {
    font-size: 1em;
  }

  .badge {
    background: #fff;
    border-radius: 50%;
    font-size: 0.6em;
    position: absolute;
    bottom: 0;
    right: 0;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }

  .success-icon {
    color: #0c0;
  }

  .error-icon {
    color: #c00;
  }

  .error-state .error-icon,
  .saved-state .success-icon {
    opacity: 1;
  }
</style>
