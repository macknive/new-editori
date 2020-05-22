<template>
  <div>
    <!-- Empty template since this page redirects -->
    <!-- TODO: Handle error cases. -->
  </div>
</template>

<script>
import DeliverableBySlug from '~/queries/DeliverableBySlug';

export default {
  data() {
    return {
      deliverableSlug: this.$route.params.deliverable,
      workspaceSlug: this.$route.params.workspace,
      deliverables: [],
    }
  },
  apollo: {
    deliverables: {
      prefetch: true,
      query: DeliverableBySlug,
      variables() {
        return {
          deliverableSlug: this.deliverableSlug,
        }
      },
      result ({ data, loading, networkStatus }, key) {
        if (!data.deliverables) {
          return;
        }

        const stepSlugsById = {};
        const deliverable = data.deliverables[0];
        deliverable.workflow.steps.forEach(template => {
          stepSlugsById[template.id] = template.slug;
        });

        const nextStepInstance = deliverable.workflow_data.find(instance => {
           return !instance.completed;
        });

        const stepSlug = stepSlugsById[nextStepInstance.step.id];

        this.$router
            .push(`/${this.workspaceSlug}/${this.deliverableSlug}/${stepSlug}`);
      },
    },
  }
}
</script>
