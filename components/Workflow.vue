<template>
  <div class="workflow-root">
    <nuxt-link :to="`${baseUrl}/${step.slug}`"
        v-for="step in steps" :key="step.id"
        class="step"
        :class="{ active: step.active, complete: step.completed }"
        :title="step.completed ? `Completed on ${step.completed}` : ''">
      <span class="icon">{{ step.completed ? '✓' : '' }}</span>
      <span class="label">{{ step.label }}</span>
      <span class="assignee">
        {{ step.assignee.display_name }}
        {{ step.assignee.id == 2 ? '(You)' : '' }}
      </span>
    </nuxt-link>
  </div>
</template>

<script>
  export default {
    props: [
      'baseUrl',
      'steps'
    ]
  }
</script>

<style scoped>
  .workflow-root {
    --complete: #84A98C;
    display: flex;
    background: #fff;
    font-family: 'Open Sans', sans-serif;
    align-items: center;
    justify-content: space-evenly;
    margin: 0;
    padding: 30px 30px 20px;
  }
  .step {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex-basis: 0;
    flex-grow: 1;
    margin: 0;
    padding: 0;
    position: relative;
    text-decoration: none;
  }
  .step.active {
    color: #343330;
    font-weight: 600;
  }
  .step {
    color: #ccc;
  }
  .complete {
    color: var(--complete);
  }
  .step:not(:last-child)::after {
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    background: #ccc;
    top: 15px;
    left: 50%;
    position: absolute;
    z-index: 0;
  }
  .step.complete::after {
    background: var(--complete);
  }
  .icon {
    display: flex;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #ccc;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }
  .label {
    display: block;
    padding: 10px 10px 0;
    text-align: center;
  }
  .assignee {
    opacity: 0.8;
    font-size: 80%;
  }
  .icon {
    background: #fff;
    border: 2px solid #ccc;
    color: #ccc;
  }
  .active .icon {
    background: #fff;
    border-color: #343330;
    color: #343330;
  }
  .complete .icon {
    background: var(--complete);
    border-color: var(--complete);
    color: #fff;
  }
  .icon, .label, .assignee {
    cursor: pointer;
  }
</style>
