import GetWorkspaceBySlug from '~/queries/GetWorkspaceBySlug'
export default {
    apollo: {
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