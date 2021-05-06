export default (graphqlError, { store, error, redirect, route }) => {
  console.log({ graphqlError });

  const { networkError, message, gqlError, graphqlErrors } = graphqlError;

  // handle error

  if (process.env.NODE_ENV !== 'production') {
    console.log({
      graphqlError,
      error
    });
  }

  return error({ statusCode: 503, message: message });
};
