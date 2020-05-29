<template>
  <div class="workflow-root">
    <WorkflowStep v-for="step in steps" :key="step.id"
        :step="step" :baseUrl="baseUrl" class="step">
    </WorkflowStep>
  </div>
</template>

<script>
  import WorkflowStep from '~/components/WorkflowStep';

  export default {
    components: {
      WorkflowStep,
    },
    props: [
      'baseUrl',
      'steps'
    ]
  }
</script>

<style scoped>
  .workflow-root {
    --completed: #84A98C;
    --rejected: #DC5E41;
    display: flex;
    background: #fff;
    font-family: 'Open Sans', sans-serif;
    align-items: center;
    justify-content: space-evenly;
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
</style>
