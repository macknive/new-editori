<template>
  <aside class="approval-root prevent-default-component-style">
    <button class="reject-button" @click="reject">
      <span class="button-text">
        <font-awesome-icon icon="exclamation-triangle"></font-awesome-icon>
      </span>
    </button>
    <button class="approve-button" @click="approve">
      <span class="button-text">
        <font-awesome-icon icon="check"></font-awesome-icon>
      </span>
    </button>
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
      this.changeStatus(this.previousStepIndex, 'completed', true)
      this.changeStatus(this.currentStepIndex, 'completed', true)
      this.$emit('save');
      this.goToStep(this.nextStepIndex);
    },
    reject() {
      this.changeStatus(this.previousStepIndex, 'rejected', true)
      this.changeStatus(this.currentStepIndex, 'completed', false)
      this.$emit('save');
      this.goToStep(this.previousStepIndex);
    },
    goToStep(stepIndex) {
      const stepData = this.workflowData[stepIndex];

      if (!stepData) {
        return;
      }

      const stepId = stepData.step.id;
      const step = this.deliverable.workflow.steps
          .find(workflowStep => workflowStep.id === stepId);

      if (!step) {
        return;
      }

      const slug = step.slug;
      if (!slug) {
        return;
      }

      this.$router.push(`./${slug}`);
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
    previousStepIndex() {
      if (this.currentStepIndex < 0) {
        return -1;
      }

      return this.currentStepIndex - 1;
    },
    currentStepIndex() {
      return this.workflowData
          .findIndex(instance => instance.step.id == this.currentStepId);
    },
    nextStepIndex() {
      if (this.currentStepIndex < 0) {
        return -1;
      }

      return this.currentStepIndex + 1;
    },
    workflowData() {
      return this.deliverable.workflow_data || [];
    }
  },
}
</script>

<style scoped>
  .approval-root {
    --height: 80px;
    --border-radius: calc(var(--height) / 2);
    border-radius: var(--border-radius);
    width: 300px;
    max-width: 60%;
    height: var(--height);
    display: flex;
    flex-direction: row;
    padding: 0;
    margin-bottom: 10px;
    z-index: 2;
    align-self: end;
    justify-self: center;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
  }

  .approval-root button {
    border: none;
    outline: none;
    cursor: pointer;
    width: 50%;
    flex: 1;
  }

  .approval-root button:first-child {
    border-top-left-radius: var(--border-radius);
    border-bottom-left-radius: var(--border-radius);
  }

  .approval-root button:last-child {
    border-top-right-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
  }

  .button-text {
    font-size: calc(var(--height) / 3);
    font-weight: 900;
    color: #fff;
  }

  .approve-button {
    background-color: #0c0;
    color: #fff;
  }

  .reject-button {
    background-color: #c00;
    color: #fff;
  }
</style>
