<template>
  <div class="root">
    <h1>{{workspace.name}} Workspace</h1>
    <table class="">
      <tr v-for="deliverable in deliverables" :key="deliverable.id">
        <td>
          <nuxt-link :to="`/${workspace.slug}/${deliverable.slug}`"
              class="deliverable">
            {{ deliverable.title }}
          </nuxt-link>
        </td>
      </tr>
    </table>
    <button class="fab">+</button>
  </div>
</template>

<script>
import WorkspaceBySlug from '~/queries/WorkspaceBySlug';
import DeliverablesByWorkspace from '~/queries/DeliverablesByWorkspace';

export default {
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
table .deliverable {
  font-size: 20px;
  font-family: 'Merriweather', 'Georgia', serif;
  font-weight: 600;
  color: #343330;
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
}
</style>
