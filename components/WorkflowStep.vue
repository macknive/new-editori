<template>
  <nuxt-link :to="`${baseUrl}/${step.slug}`"
      class="step-root"
      :class="{
        active: step.active,
        completed: isCompleted,
        rejected: isRejected,
      }"
      :title="step.completed ? `Completed on ${step.completed}` : ''">
    <span class="icon" v-if="isCompleted">
      <font-awesome-icon icon="check"></font-awesome-icon>
    </span>
    <span class="icon" v-if="isRejected">
      <font-awesome-icon icon="exclamation-triangle"></font-awesome-icon>
    </span>
    <span class="icon" v-if="!isCompleted && !isRejected"></span>
    <span class="label">{{ step.label }}</span>
    <span class="assignee">
      {{ step.assignee.display_name }}
      {{ isViewerAssignee ? '(You)' : '' }}
    </span>
  </nuxt-link>
</template>

<script>
const StepStatus = {
  COMPLETED: 'completed',
  REJECTED: 'rejected',
};

export default {
  props: [
    'baseUrl',
    'step',
    'viewer',
  ],
  computed: {
    canMarkAsDone() {
      return step.active && isViewerAssignee && requiresAction;
    },
    isCompleted() {
      return this.status === StepStatus.COMPLETED;
    },
    isRejected() {
      return this.status === StepStatus.REJECTED;
    },
    isViewerAssignee() {
      return this.viewer && this.step.assignee.id === this.viewer.id;
    },
    requiresAction() {
      return !this.isCompleted || this.isRejected;
    },
    status() {
      const completionTime = Date.parse(this.step.completed) || -1;
      const rejectionTime = Date.parse(this.step.rejected) || -1;

      if (completionTime > rejectionTime) {
        return StepStatus.COMPLETED;
      }

      if (rejectionTime !== undefined && rejectionTime >= 0) {
        return StepStatus.REJECTED;
      }

      return undefined;
    }
  }
}
</script>

<style scoped>
  .step-root.active {
    color: #343330;
    font-weight: 600;
  }
  .step-root {
    color: #ccc;
  }
  .completed {
    color: var(--completed);
  }
  .rejected {
    color: var(--rejected);
  }
  .step-root:not(:last-child)::after {
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
  .step-root.completed::after {
    background: var(--completed);
  }
  .icon {
    display: flex;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    font-weight: 900;
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
    text-align: center;
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
  .completed .icon {
    background: var(--completed);
    border-color: var(--completed);
    color: #fff;
  }
  .rejected .icon {
    background: var(--rejected);
    border-color: var(--rejected);
    color: #fff;
  }
  .icon, .label, .assignee {
    cursor: pointer;
  }
</style>
