import ListWorkspaces from '~/queries/ListWorkspaces';

export default async function({ app, redirect, store }) {
  if (!store.getters.isAuthenticated) {
    return;
  }
  const response = await app.apolloProvider.defaultClient.query({
    query: ListWorkspaces
  });
  const { workspaces } = response.data;

  if (workspaces.length > 0) {
    return redirect(`${process.env.clientBaseUrl}/${workspaces[0].slug}`);
  }
}
