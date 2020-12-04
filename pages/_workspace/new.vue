<template>
  <table>
    <tbody>
      <tr>
        <th>Title</th>
        <td>
          <input type="text" v-model="title">
        </td>
      </tr>
      <tr>
        <th>Slug</th>
        <td>
          <input type="text" ref="slugInput"
              @focus="onSlugFocus" @blur="onSlugBlur" v-model="slug">
        </td>
      </tr>
      <tr>
        <th>Workflow</th>
        <td>
          <select v-model="selectedWorkflow">
            <option :value="undefined" selected disabled>Select a Workflow</option>
            <option v-for="workflow in workflows"
                :key="workflow.id" :value="workflow">
              {{workflow.name}}
            </option>
          </select>
        </td>
      </tr>
      <tr v-for="role in customRoles" :key="role.id">
        <th>{{role.name}}</th>
        <td>
          <select v-model="usersForRole[role.name]">
            <option :value="undefined" selected disabled>Select a User</option>
            <option v-for="user in role.users" :key="user.id" :value="user.id">
              {{user.display_name}}
            </option>
          </select>
        </td>
      </tr>
      <tr>
        <td></td>
        <td>
          <button @click="createDeliverable">Create!</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import CreateDeliverable from '~/queries/CreateDeliverable';
import ListWorkflowsByWorkspace from '~/queries/ListWorkflowsByWorkspace';
import GetWorkspaceBySlug from '~/queries/GetWorkspaceBySlug';
import slugify from 'slugify';
import {getRandomAnimal} from '~/assets/animals';

// See https://www.npmjs.com/package/slugify#options.
const SLUG_OPTIONS = {
  replacement: '-',
  lower: true,
  strict: true,
};

export default {
  asyncData() {
    // Using async data allows non-deterministism, as this will be generated in
    // the first render only (server-side for components rendered server-side,
    // or client-side for components rendered client-side).
    const animal = getRandomAnimal();
    const title = `Untitled ${animal.name} ${animal.emoji}`;
    return {
      title: title,
      slug: slugify(title, SLUG_OPTIONS),
    };
  },
  data() {
    return {
      dirtySlug: false,
      lastUpdatedSlug: undefined,
      selectedWorkflow: undefined,
      usersForRole: {},
      workflows: [],
      workspaceSlug: this.$route.params.workspace,
    };
  },
  computed: {
    customRoles() {
      if (!this.selectedWorkflow || !this.selectedWorkflow.steps) {
        return [];
      }

      return this.selectedWorkflow.steps.reduce((roles, step) => {
        roles[step.custom_role.id] = step.custom_role;
        return roles;
      }, {});
    },
    workflowData() {
      let previousDeadlineTimestamp = Date.now();
      return this.selectedWorkflow.steps.map(step => {
        let deadline;
        if (previousDeadlineTimestamp && step.deadline_delta_mins) {
          deadline = previousDeadlineTimestamp +
              (step.deadline_delta_mins * 1000 * 60);
        } else {
          previousDeadlineTimestamp = null;
        }

        return {
          // TODO: Don't assign workflow steps to users on the client; store the
          // role/user mappings in the deliverable and pull dynamically from
          // that where assignees are needed, so that future edits to the
          // workflow can have correct assignees.
          assignee: this.usersForRole[step.custom_role.name],
          deadline: deadline,
          step: step.id,
        };
      });
    },
    workspace() {
      return this.workspaces[0];
    }
  },
  methods: {
    onSlugFocus() {
      this.lastUpdatedSlug = this.slug;
    },
    onSlugBlur() {
      const newSlugValue = slugify(this.slug);

      if (this.lastUpdatedSlug !== newSlugValue) {
        this.dirtySlug = true;
      }

      this.$refs.slugInput.value = newSlugValue;
      this.lastUpdatedSlug = newSlugValue;
    },
    createDeliverable() {
      // TODO: Can this be a constant object with functions for the variables to
      // prevent frequent object allocation?
      const mutationConfig = {
        mutation: CreateDeliverable,
        variables: {
          title: this.title,
          slug: this.slug,
          workspaceId: this.workspace.id,
          workflowData: this.workflowData,
          workflowId: this.selectedWorkflow.id,
        }
      };

      this.$apollo.mutate(mutationConfig)
          .then(result => this.onCreateSuccess(result))
          .catch(err => this.onCreateError(err));
    },
    onCreateSuccess(result) {
      const newDeliverable = result.data.createDeliverable.deliverable;
      this.$router.push(`/${this.workspaceSlug}/${newDeliverable.slug}`);
    },
    onCreateError(err) {
      // TODO: Build error UI.
      alert(err);
    }
  },
  watch: {
    title: function(val) {
      if (this.dirtySlug) {
        return;
      }
      this.slug = slugify(val, SLUG_OPTIONS);
    }
  },
  apollo: {
    workflows: {
      prefetch: true,
      query: ListWorkflowsByWorkspace,
      variables() {
        return {
          workspaceSlug: this.workspaceSlug,
        }
      }
    },
    workspaces: {
      prefetch: true,
      query: GetWorkspaceBySlug,
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

</style>
