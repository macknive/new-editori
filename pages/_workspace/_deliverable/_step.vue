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
          @autoSave="autoSave"
          :style="`
            grid-column-start: ${componentData.column_start};
            grid-column-end: span ${componentData.column_span};
            grid-row-start: ${componentData.row_start};
            grid-row-end: span ${componentData.row_span};
          `">
      </component>
    </div>
    <SaveIcon :status="saveStatus" class="save-icon"
        :title="saveTooltip"></SaveIcon>
  </div>
</template>

<script>
import ArticleEditor from '~/components/ArticleEditor';
import ContentAnalysis from '~/components/ContentAnalysis';
import EditorialBrief from '~/components/EditorialBrief';
import SaveIcon from '~/components/SaveIcon';
import Workflow from '~/components/Workflow';
import DeliverableBySlug from '~/queries/DeliverableBySlug';
import UpdateDeliverable from '~/queries/UpdateDeliverable';
import WorkspaceBySlug from '~/queries/WorkspaceBySlug';
import {debounce} from 'vue-debounce';

/**
 * How long to wait (in milliseconds) after the most recent changes to the
 * deliverable to perform a save operation.
 */
const AUTOSAVE_DEBOUNCE_MS = 3000;

const SaveStatus = {
  ERROR: 'error',
  SAVING: 'saving',
  SAVED: 'saved',
  WAITING: 'waiting',
};

export default {
  components: {
    ArticleEditor,
    ContentAnalysis,
    EditorialBrief,
    SaveIcon,
    Workflow,
  },
  data() {
    return {
      deliverables: [],
      deliverableSlug: this.$route.params.deliverable,
      saveStatus: SaveStatus.SAVED,
      stepSlug: this.$route.params.step,
      workspaces: [],
      workspaceSlug: this.$route.params.workspace,
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
    saveTooltip() {
      switch (this.saveStatus) {
        case SaveStatus.ERROR:
          return 'Not saved - An error has occurred.';
        case SaveStatus.WAITING:
          return 'Waiting until you finish typing...';
        case SaveStatus.SAVING:
          return 'Saving...';
        case SaveStatus.SAVED:
          return 'Saved!';
      }
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
    },
    save() {
      this.saveStatus = SaveStatus.SAVING;

      // TODO: Can this be a constant object with functions for the variables to
      // prevent frequent object allocation?
      const mutationConfig = {
        mutation: UpdateDeliverable,
        variables: {
          id: this.deliverable.id,
          data: this.deliverable.data,
          title: this.deliverable.title,
          slug: this.deliverable.slug,
        }
      };

      this.$apollo.mutate(mutationConfig)
          .then(result => this.onSaveSuccess(result))
          .catch(err => this.onSaveError(err));
    },
    onSaveSuccess(result) {
      this.saveStatus = SaveStatus.SAVED;
    },
    onSaveError(err) {
      this.saveStatus = SaveStatus.ERROR;
    }
  },
  created() {
    const debouncedSave = debounce(() => this.save(), AUTOSAVE_DEBOUNCE_MS);
    this.autoSave = () => {
      this.saveStatus = SaveStatus.WAITING;
      debouncedSave();
    };
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
@-webkit-keyframes loading-pulse { 0% { opacity: 0.2; } 100% { opacity: 0.4; } }
@keyframes loading-pulse         { 0% { opacity: 0.2; } 100% { opacity: 0.4; } }

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
.save-icon {
  position: fixed;
  bottom: 16px;
  right: 16px;
}
</style>
