import GetWorkspaceBySlug from '~/queries/GetWorkspaceBySlug'
export default {
  data() {
    return {
      workspaces: [],
      workspaceSlug: this.$route.params.workspace
    };
  },
  computed: {
    workspace() {
      return this.workspaces[0];
    }
  },
  apollo: {
    workspaces: {
      prefetch: true,
      query: GetWorkspaceBySlug,
      variables() {
        return {
          workspaceSlug: this.workspaceSlug
        };
      }
    }
  }
};