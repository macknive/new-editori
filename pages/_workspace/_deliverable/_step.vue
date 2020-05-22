<template>
  <div class="root">
    <Workflow class="workflow" :steps="workflowSteps"
        :baseUrl="`/${workspaceSlug}/${deliverableSlug}`">
    </Workflow>
    <div class="grid" :style="gridStyle">
      <component v-for="componentData in layout.components"
          :key="componentData.id"
          :is="componentData.component.name"
          :deliverable="deliverable"
          :style="`
            grid-column-start: ${componentData.column_start};
            grid-column-end: span ${componentData.column_span};
            grid-row-start: ${componentData.row_start};
            grid-row-end: span ${componentData.row_span};
          `">
      </component>
    </div>
  </div>
</template>

<script>
import ArticleEditor from '~/components/ArticleEditor';
import ContentAnalysis from '~/components/ContentAnalysis';
import EditorialBrief from '~/components/EditorialBrief';
import Workflow from '~/components/Workflow';
import DeliverableBySlug from '~/queries/DeliverableBySlug';
import WorkspaceBySlug from '~/queries/WorkspaceBySlug';

export default {
  components: {
    ArticleEditor,
    ContentAnalysis,
    EditorialBrief,
    Workflow,
  },
  data() {
    return {
      deliverableSlug: this.$route.params.deliverable,
      workspaceSlug: this.$route.params.workspace,
      stepSlug: this.$route.params.step,
      deliverables: [],
      workspaces: [],
    }
  },
  computed: {
    currentStep() {
      return Object.values(this.workflowSteps).find(step => step.active);
    },
    deliverable() {
      return this.deliverables[0];
    },
    layout() {
      return this.view.layout;
    },
    gridStyle() {
      return `
        --gap: ${this.stringifyLength(this.layout.gap)};
        grid-template-rows: ${this.stringifyLengths(this.layout.rows)};
        grid-template-columns: ${this.stringifyLengths(this.layout.columns)};
      `;
    },
    view() {
      return this.currentStep.view;
    },
    workflowSteps() {
      const data = {};
      let currentStepId = null;

      this.deliverable.workflow.steps.forEach(template => {
        data[template.id] = template;
        data[template.id].active = template.slug === this.stepSlug;
      });
      this.deliverable.workflow_data.forEach(instance => {
        const stepId = instance.step.id;
        const template = data[stepId];
        data[stepId] = Object.assign({}, template, instance);
      });

      return data;
    },
    workspace() {
      return this.deliverable.workspace;
    }
  },
  methods: {
    stringifyLengths(lengths) {
      return lengths.map(length => this.stringifyLength(length)).join(' ');
    },
    stringifyLength(length) {
      const value = length.value || '';
      const unit = length.unit === 'percent' ? '%' : length.unit;
      return `${value}${unit}`;
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
      }
    },
    workspaces: {
      prefetch: true,
      query: WorkspaceBySlug,
      variables() {
        return {
          workspaceSlug: this.workspaceSlug,
        }
      }
    },
  }
}
</script>

<style>
body {
  background: #f0f0f0;
  --gap: 20px;
}
</style>

<style scoped>
.root {
  flex-direction: column;
}
.workflow {
  flex-grow: 0;
}
.grid {
  background: #f0f0f0;
  font-family: 'Open Sans', sans-serif;
  flex-grow: 1;
  display: grid;
  grid-gap: var(--gap);
  padding: var(--gap);
}
.grid > * {
  background: #fff;
  border-radius: calc(var(--gap) / 2);
  padding: var(--gap);
}
</style>
