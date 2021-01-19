<template>
  <v-app>
    <v-container class="container-700 pt-12">
      <v-card class="pa-12">
        <v-card-title>Create a New Workflow</v-card-title>
        <div align="center">
          <v-row class="d-flex flex-column">
            <v-col>
              <v-row>
                <v-col class="col-4"><h4>Title</h4></v-col>
                <v-col class="col-8"
                  ><v-text-field
                    type="text"
                    v-model="title"
                    :rules="rules.field"
                /></v-col>
              </v-row>
            </v-col>
            <v-col>
              <v-row>
                <v-col class="col-4">Slug</v-col>
                <v-col class="col-8">
                  <v-text-field
                    :rules="rules.field"
                    type="text"
                    ref="slugInput"
                    @focus="onSlugFocus"
                    @blur="onSlugBlur"
                    v-model="slug"
                /></v-col>
              </v-row>
            </v-col>
            <v-col>
              <v-row>
                <v-col class="col-4">Workflow</v-col>
                <v-col class="col-8">
                  <select v-model="selectedWorkflow" :rules="rules.field">
                    <option :value="undefined" selected disabled
                      >Select a Workflow</option
                    >
                    <option
                      v-for="workflow in workflows"
                      :key="workflow.id"
                      :value="workflow"
                    >
                      {{ workflow.name }}
                    </option>
                  </select>
                </v-col>
              </v-row>
            </v-col>
            <v-col>
              <v-row v-for="role in customRoles" :key="role.id">
                <v-col class="col-4">
                  {{ role.name }}
                </v-col>
                <v-col class="col-/">
                  <select
                    v-model="usersForRole[role.name]"
                    :rules="rules.field"
                  >
                    <option :value="undefined" selected disabled
                      >Select a User</option
                    >
                    <option
                      v-for="user in role.users"
                      :key="user.id"
                      :value="user.id"
                    >
                      {{ user.display_name }}
                    </option>
                  </select>
                </v-col>
              </v-row>
              <span
                align="left"
                class="typo__p v-messages error--text"
                v-if="submitStatus === 'ERROR'"
              >
                Please fill the form correctly.
              </span>
            </v-col>
            <v-col class="pt-6"
              ><v-btn @click="createDeliverable">Create!</v-btn></v-col
            >
          </v-row>
        </div>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import CreateDeliverable from '~/queries/CreateDeliverable'
import ListWorkflowsByWorkspace from '~/queries/ListWorkflowsByWorkspace'
import GetWorkspaceBySlug from '~/queries/GetWorkspaceBySlug'
import slugify from 'slugify'
import { getRandomAnimal } from '~/assets/animals'
import { required, minLength } from 'vuelidate/lib/validators'

// See https://www.npmjs.com/package/slugify#options.
const SLUG_OPTIONS = {
  replacement: '-',
  lower: true,
  strict: true
}

export default {
  asyncData() {
    // Using async data allows non-deterministism, as this will be generated in
    // the first render only (server-side for components rendered server-side,
    // or client-side for components rendered client-side).
    const animal = getRandomAnimal()
    const title = `Untitled ${animal.name} ${animal.emoji}`
    return {
      title: title,
      slug: slugify(title, SLUG_OPTIONS)
    }
  },
  data() {
    return {
      dirtySlug: false,
      lastUpdatedSlug: undefined,
      selectedWorkflow: undefined,
      usersForRole: {},
      workflows: [],
      workspaceSlug: this.$route.params.workspace,
      submitStatus: null,
      rules: {
        field: [value => !!value || 'Required.']
      }
    }
  },
  validations: {
    title: {
      required,
      minLength: minLength(4)
    },
    slug: {
      required
    },
    selectedWorkflow: {
      required
    }
  },
  computed: {
    customRoles() {
      if (!this.selectedWorkflow || !this.selectedWorkflow.steps) {
        return []
      }

      return this.selectedWorkflow.steps.reduce((roles, step) => {
        roles[step.custom_role.id] = step.custom_role
        return roles
      }, {})
    },
    workflowData() {
      let previousDeadlineTimestamp = Date.now()
      return this.selectedWorkflow.steps.map(step => {
        let deadline
        if (previousDeadlineTimestamp && step.deadline_delta_mins) {
          deadline =
            previousDeadlineTimestamp + step.deadline_delta_mins * 1000 * 60
        } else {
          previousDeadlineTimestamp = null
        }

        return {
          assignee: this.usersForRole[step.custom_role.name],
          deadline: deadline,
          step: step.id
        }
      })
    },
    workspace() {
      return this.workspaces[0]
    }
  },
  methods: {
    setTitle(value) {
      this.title = value
      this.$v.title.$touch()
    },
    onSlugFocus() {
      this.lastUpdatedSlug = this.slug
    },
    onSlugBlur() {
      const newSlugValue = slugify(this.slug)

      if (this.lastUpdatedSlug !== newSlugValue) {
        this.dirtySlug = true
      }

      this.$refs.slugInput.value = newSlugValue
      this.lastUpdatedSlug = newSlugValue
    },
    hasAllRolesAssigned() {
      return Object.values(this.customRoles).every(
        role => this.usersForRole[role.name]
      )
    },
    createDeliverable() {
      this.$v.$touch()
      if (this.$v.$invalid || !this.hasAllRolesAssigned()) {
        this.submitStatus = 'ERROR'
        console.log('Error')
        return
      }
      console.log('Success')
      this.submitStatus = 'PENDING'
      const mutationConfig = {
        mutation: CreateDeliverable,
        variables: {
          title: this.title,
          slug: this.slug,
          workspaceId: this.workspace.id,
          workflowData: this.workflowData,
          workflowId: this.selectedWorkflow.id
        }
      }

      this.$apollo
        .mutate(mutationConfig)
        .then(result => this.onCreateSuccess(result))
        .catch(err => this.onCreateError(err))
    },
    onCreateSuccess(result) {
      const newDeliverable = result.data.createDeliverable.deliverable
      this.$router.push(`/${this.workspaceSlug}/${newDeliverable.slug}`)
    },
    onCreateError(err) {
      alert(err)
    }
  },
  watch: {
    title: function(val) {
      if (this.dirtySlug) {
        return
      }
      this.slug = slugify(val, SLUG_OPTIONS)
    }
  },
  apollo: {
    workflows: {
      prefetch: true,
      query: ListWorkflowsByWorkspace,
      variables() {
        return {
          workspaceSlug: this.workspaceSlug
        }
      }
    },
    workspaces: {
      prefetch: true,
      query: GetWorkspaceBySlug,
      variables() {
        return {
          workspaceSlug: this.workspaceSlug
        }
      }
    }
  }
}
</script>

<style scoped>
select {
  width: 100%;
  appearance: menulist;
  border-style: solid;
  padding: 8px 0 8px;
  margin-bottom: 12px;
}
.col {
  margin: auto;
  padding: 0;
}
</style>
