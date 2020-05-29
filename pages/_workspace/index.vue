<template>
  <div class="root">
    <h1>{{workspace.name}} Workspace</h1>
    <table class="table">
      <tbody>
        <tr class="header-row">
          <th>Name</th>
          <th>Last Updated</th>
          <th>Status</th>
        </tr>
        <DeliverableTableRow v-for="deliverable in deliverables"
            class="deliverable"
            :key="deliverable.id" :deliverable="deliverable">
        </DeliverableTableRow>
      </tbody>
    </table>
    <nuxt-link to="./new" >
      <button class="fab">+</button>
    </nuxt-link>
  </div>
</template>

<script>
import DeliverableTableRow from '~/components/DeliverableTableRow';
import WorkspaceBySlug from '~/queries/WorkspaceBySlug';
import DeliverablesByWorkspace from '~/queries/DeliverablesByWorkspace';

export default {
  components: {
    DeliverableTableRow,
  },
  data() {
    return {
      deliverables: [],
      workspaces: [],
      workspaceSlug: this.$route.params.workspace,
    }
  },
  computed: {
    workspace() {
      return this.workspaces[0];
    }
  },
  apollo: {
    deliverables: {
      prefetch: true,
      query: DeliverablesByWorkspace,
      variables() {
        return {
          workspaceSlug: this.workspaceSlug,
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
.table {
  border: 1px solid #ccc;
  font-family: 'Open Sans', sans-serif;
  width: 100%;
}
.header-row {
  background-color: #def;
}
.deliverable:nth-child(even) {
  background: #fff;
}
.deliverable:nth-child(odd) {
  background: #f0f0f0
}
th {
  color: #343330;
  padding: 20px;
}
.fab {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  background: #2ba2f6;
  color: #fff;
  font-size: 32px;
  line-height: 64px;
  text-align: center;
  border: none;
  position: absolute;
  bottom: var(--gap);
  right: var(--gap);
  cursor: pointer;
}
</style>
