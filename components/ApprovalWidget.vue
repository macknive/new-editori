<template>
  <aside class="approval-root">
    <button @click="approve">Yup</button>
    <button @click="reject">Nope</button>
  </aside>
</template>

<script>
export default {
  props: [
    'deliverable',
    'currentStepId',
  ],
  methods: {
    approve() {
      this.changeStatus(this.previousStepDataIndex, 'completed', true)
      this.changeStatus(this.currentStepDataIndex, 'completed', true)
      this.$emit('autoSave');
    },
    reject() {
      this.changeStatus(this.previousStepDataIndex, 'rejected', true)
      this.changeStatus(this.currentStepDataIndex, 'completed', false)
      this.$emit('autoSave');
    },
    changeStatus(index, field, setValue) {
      if (index < 0) {
        // TODO: Error handling
        return;
      }

      const value = setValue ? new Date().toISOString() : null;
      this.deliverable.workflow_data[index][field] = value;
    }
  },
  computed: {
    previousStepDataIndex() {
      if (this.currentStepDataIndex < 0) {
        return -1;
      }

      return this.currentStepDataIndex - 1;
    },
    currentStepDataIndex() {
      return this.workflowData
          .findIndex(instance => instance.step.id == this.currentStepId);
    },
    workflowData() {
      return this.deliverable.workflow_data || [];
    }
  }
}
</script>

<style>
  .approval-root {
    width: 400px;
    max-width: 60%;
    display: flex;
    flex-direction: row-reverse;
    position: fixed;
    bottom: 60px;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
