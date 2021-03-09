<template>
  <v-container class="container-1200">
    <div class="root">
      <Workflow
        class="workflow"
        :steps="workflowSteps"
        :viewer="viewer"
        :baseUrl="`/${workspaceSlug}/${deliverableSlug}`"
      >
      </Workflow>
      <div class="grid" :style="gridStyle" v-if="layout && layout.components">
        <component
          v-for="componentData in layout.components"
          :key="componentData.id"
          :is="componentData.component.name"
          :deliverable="deliverable"
          :currentStepId="currentStep.id"
          :viewer="viewer"
          :assignee="currentStep.assignee"
          :workspace="workspace"
          @autoSave="autoSave"
          @save="save"
          @advance="advanceToNextStepRequiringAction"
          class="view-component"
          :style="
            `
            grid-column-start: ${componentData.column_start};
            grid-column-end: span ${componentData.column_span};
            grid-row-start: ${componentData.row_start};
            grid-row-end: span ${componentData.row_span};
          `
          "
        >
        </component>
      </div>
      <SaveIcon
        :status="saveStatus"
        class="save-icon"
        :title="saveTooltip"
      ></SaveIcon>
    </div>
  </v-container>
</template>

<script>
import ApprovalWidget from '~/components/ApprovalWidget'
import ArticleEditor from '~/components/ArticleEditor'
import BriefEditor from '~/components/BriefEditor'
import ContentAnalysis from '~/components/ContentAnalysis'
import EditorialBrief from '~/components/EditorialBrief'
import PaymentTable from '~/components/PaymentTable'
import SaveIcon from '~/components/SaveIcon'
import Workflow from '~/components/Workflow'
import GetViewerId from '~/queries/GetViewerId'
import GetDeliverableBySlug from '~/queries/GetDeliverableBySlug'
import UpdateDeliverable from '~/queries/UpdateDeliverable'
import getWorkspaceBySlug from '~/mixins/getWorkspaceBySlug'
import { debounce } from 'vue-debounce'
import { nextStepRequiringAction } from '~/utils/steps'

/**
 * How long to wait (in milliseconds) after the most recent changes to the
 * deliverable to perform a save operation.
 */
const AUTOSAVE_DEBOUNCE_MS = 3000

const WORKFLOW_DATA_KEYS_WHITELIST = [
  'assignee',
  'completed',
  'deadline',
  'rejected',
  'step'
]

const SaveStatus = {
  ERROR: 'error',
  SAVING: 'saving',
  SAVED: 'saved',
  WAITING: 'waiting'
}

export default {
  layout: 'empty',
  components: {
    ApprovalWidget,
    ArticleEditor,
    BriefEditor,
    ContentAnalysis,
    EditorialBrief,
    PaymentTable,
    SaveIcon,
    Workflow
  },
  data() {
    return {
      viewer: undefined,
      shouldMarkCurrentStepComplete: this.$route.query['complete']
        ? this.$route.query['complete'].toLowerCase()
        : undefined,
      deliverables: [],
      deliverableSlug: this.$route.params.deliverable,
      saveStatus: SaveStatus.SAVED,
      stepSlug: this.$route.params.step,
      workspaces: [],
      workspaceSlug: this.$route.params.workspace
    }
  },
  computed: {
    currentStep() {
      if (!this.workflowSteps) {
        return undefined
      }
      return Object.values(this.workflowSteps).find(step => step.active)
    },
    deliverable() {
      return this.deliverables[0]
    },
    layout() {
      if (!this.view) {
        return undefined
      }
      return this.view.layout
    },
    gridStyle() {
      if (!this.layout) {
        return undefined
      }
      return `
        --gap: ${this.stringifyLength(this.layout.gap)};
        grid-template-rows: ${this.stringifyLengths(this.layout.rows)};
        grid-template-columns: ${this.stringifyLengths(this.layout.columns)};
      `
    },
    saveTooltip() {
      switch (this.saveStatus) {
        case SaveStatus.ERROR:
          return 'Not saved - An error has occurred.'
        case SaveStatus.WAITING:
          return 'Waiting until you finish typing...'
        case SaveStatus.SAVING:
          return 'Saving...'
        case SaveStatus.SAVED:
          return 'Saved!'
      }
    },
    view() {
      if (!this.currentStep) {
        return undefined
      }
      return this.currentStep.view
    },
    workflowSteps() {
      if (!this.deliverable || !this.deliverable.workflow) {
        return {}
      }

      const data = {}
      let previousStepId = null

      this.deliverable.workflow.steps.forEach((template, index) => {
        data[template.id] = template
        data[template.id].active = template.slug === this.stepSlug
        data[template.id].index = index

        if (previousStepId) {
          data[template.id].previous = data[previousStepId]
          data[previousStepId].next = data[template.id]
        }

        previousStepId = template.id
      })
      this.deliverable.workflow_data.forEach(instance => {
        const stepId = instance.step.id
        const template = data[stepId]
        data[stepId] = Object.assign({}, template, instance)
      })

      return data
    },
    workspace() {
      return this.deliverable.workspace
    }
  },
  methods: {
    stringifyLengths(lengths) {
      return lengths.map(length => this.stringifyLength(length)).join(' ')
    },
    stringifyLength(length) {
      if (!length || !length.value) {
        return ''
      }
      const value = length.value
      const unit = length.unit === 'percent' ? '%' : length.unit
      return `${value}${unit}`
    },
    sanitizeWorkflowDataForUpdate(instance) {
      return Object.keys(instance).reduce((data, key) => {
        if (!WORKFLOW_DATA_KEYS_WHITELIST.includes(key)) {
          return data
        }

        const value = instance[key]

        if (value && typeof value === 'object' && value.id !== undefined) {
          // Only send ID for relational values.
          data[key] = value.id
        } else {
          data[key] = value
        }

        return data
      }, {})
    },
    save() {
      this.saveStatus = SaveStatus.SAVING

      // TODO: Can this be a constant object with functions for the variables to
      // prevent frequent object allocation?
      // TODO: Log changes and send only the changed fields OR have semantic
      // update functions to update specific fields.
      const mutationConfig = {
        mutation: UpdateDeliverable,
        variables: {
          id: this.deliverable.id,
          data: this.deliverable.data,
          title: this.deliverable.title,
          slug: this.deliverable.slug,
          workflowData: this.deliverable.workflow_data.map(instance =>
            this.sanitizeWorkflowDataForUpdate(instance)
          )
        }
      }

      this.$apollo
        .mutate(mutationConfig)
        .then(result => this.onSaveSuccess(result))
        .catch(err => this.onSaveError(err))
    },
    onSaveSuccess(result) {
      this.saveStatus = SaveStatus.SAVED
    },
    onSaveError(err) {
      this.saveStatus = SaveStatus.ERROR
    },
    onDeliverableLoaded() {
      if (!this.stepSlug) {
        this.advanceToNextStepRequiringAction()
        return
      }

      if (
        !this.shouldMarkCurrentStepComplete ||
        !this.deliverable ||
        !this.deliverable.workflow_data
      ) {
        return
      }

      this.markCurrentStepComplete()
      this.advanceToNextStepRequiringAction()
    },
    markCurrentStepComplete() {
      this.deliverable.workflow_data.find(
        instance => instance.step.id === this.currentStep.id
      ).completed = new Date().toISOString()
      this.save()
    },
    advanceToNextStepRequiringAction() {
      const nextStep = nextStepRequiringAction(this.deliverable)

      if (!nextStep) {
        return
      }

      const newPath = `/${this.workspaceSlug}/${this.deliverableSlug}/${nextStep.slug}`
      this.$router.replace(newPath)
    }
  },
  created() {
    const debouncedSave = debounce(() => this.save(), AUTOSAVE_DEBOUNCE_MS)
    this.autoSave = () => {
      this.saveStatus = SaveStatus.WAITING
      debouncedSave()
    }
  },
  apollo: {
    viewer: {
      prefetch: true,
      query: GetViewerId
    },
    deliverables: {
      prefetch: true,
      query: GetDeliverableBySlug,
      variables() {
        return {
          deliverableSlug: this.deliverableSlug
        }
      },
      result({ data, loading, networkStatus }, key) {
        if (!data.deliverables) {
          return
        }

        this.onDeliverableLoaded()
      }
    }
  },
  mixins: [getWorkspaceBySlug]
}
</script>

<style>
@-webkit-keyframes loading-pulse {
  0% {
    opacity: 0.2;
  }
  100% {
    opacity: 0.4;
  }
}
@keyframes loading-pulse {
  0% {
    opacity: 0.2;
  }
  100% {
    opacity: 0.4;
  }
}

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
  margin: var(--gap) var(--gap) 0;
}
.grid {
  background: #f0f0f0;
  font-family: 'Open Sans', sans-serif;
  flex-grow: 1;
  display: grid;
  grid-gap: var(--gap);
  padding: var(--gap);
}
.view-component:not(.prevent-default-component-style),
.workflow {
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
