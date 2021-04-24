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
      return this.workspaces ? this.workspaces[0] : undefined;
    }
  },
  apollo: {
    workspaces: {
      prefetch: true,
      query: GetWorkspaceBySlug,
      skip() {
        return !this.workspaceSlug;
      },
      variables() {
        return {
          workspaceSlug: this.workspaceSlug
        };
      }
    }
  }
};