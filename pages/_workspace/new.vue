<template>
  <v-app>
    <v-container>
      <div>
        <table>
          <tbody>
            <tr>
              <th>Title</th>
              <td>
                <div
                  class="form-group"
                  :class="{ 'form-group--error': $v.title.$error }"
                >
                  <v-text-field type="text" v-model.trim="$v.title.$model" />
                </div>
                <div class="error" v-if="!$v.title.required">
                  Title is required
                </div>
                <div class="error" v-if="!$v.title.minLength">
                  Title must have at least
                  {{ $v.title.$params.minLength.min }} letters.
                </div>
              </td>
            </tr>
            <tr>
              <th>Slug</th>
              <td>
                <div
                  class="form-group"
                  :class="{ 'form-group--error': $v.slug.$error }"
                >
                  <v-text-field
                    type="text"
                    ref="slugInput"
                    @focus="onSlugFocus"
                    @blur="onSlugBlur"
                    v-model.trim="$v.slug.$model"
                  />
                </div>
                <div class="error" v-if="!$v.slug.required">
                  Slug name is required
                </div>
              </td>
            </tr>
            <tr>
              <th>Workflow</th>
              <td>
                <div
                  class="form-group"
                  :class="{ 'form-group--error': $v.selectedWorkflow.$error }"
                >
                  <select v-model.trim="$v.selectedWorkflow.$model">
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
                </div>
                <div class="error" v-if="!$v.selectedWorkflow.required"></div>
              </td>
            </tr>
            <tr v-for="role in customRoles" :key="role.id">
              <th>{{ role.name }}</th>
              <td>
                <select v-model="usersForRole[role.name]">
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
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <v-btn @click="createDeliverable">Create!</v-btn>
                <p class="typo__p" v-if="submitStatus === 'ERROR'">
                  Please fill the form correctly.
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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
      submitStatus: null
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

<style></style>
