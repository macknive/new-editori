import axios from 'axios';
import ListConnectionsByWorkspace from '~/queries/ListConnectionsByWorkspace';

const AXIOS_INSTANCES_BY_CONNECTION = {};
const DEFAULT_RESPONSE = {
  // `data` is the response that was provided by the server
  data: undefined,

  // `status` is the HTTP status code from the server response
  status: 404,

  // `statusText` is the HTTP status message from the server response
  statusText: 'Not found',

  // `headers` the HTTP headers that the server responded with
  // All header names are lower cased and can be accessed using the bracket notation.
  // Example: `response.headers['content-type']`
  headers: {},

  // `config` is the config that was provided to `axios` for the request
  config: {},

  // `request` is the request that generated this response
  // It is the last ClientRequest instance in node.js (in redirects)
  // and an XMLHttpRequest instance in the browser
  request: {}
};
const DEFAULT_RESPONSE_GENERATOR = () => Promise.resolve(DEFAULT_RESPONSE);

const getAxiosConfigForConnection = function(connection) {
  switch (connection.service) {
    case 'webflow':
      return {
        baseURL: `${process.env.clientBaseUrl}/api/webflow`,
        headers: {
          'Authorization':
              `${connection.data.token_type} ${connection.data.access_token}`,
          'accept-version': '1.0.0',
        },
      };
    default:
      throw new Error(`Unknown service ${connection.service}`);
  }
};

export const axiosForService = async function(ctx, service) {
  try {
    const apollo = ctx.app.apolloProvider.defaultClient;
    const apolloResult = await apollo.query({
      query: ListConnectionsByWorkspace,
      variables: {
        workspaceSlug: ctx.route.params.workspace,
        service: service,
      }
    });

    const connection = apolloResult.data.connections[0];
    if (!connection) {
      throw new Error(`No connection for service ${service}`);
    }
    if (!AXIOS_INSTANCES_BY_CONNECTION[connection.id]) {
      AXIOS_INSTANCES_BY_CONNECTION[connection.id] = axios.create(
        getAxiosConfigForConnection(connection)
      );
    }

    return AXIOS_INSTANCES_BY_CONNECTION[connection.id];
  } catch (err) {
    return {
      'request': DEFAULT_RESPONSE_GENERATOR,
      'get': DEFAULT_RESPONSE_GENERATOR,
      'delete': DEFAULT_RESPONSE_GENERATOR,
      'head': DEFAULT_RESPONSE_GENERATOR,
      'options': DEFAULT_RESPONSE_GENERATOR,
      'post': DEFAULT_RESPONSE_GENERATOR,
      'put': DEFAULT_RESPONSE_GENERATOR,
      'patch': DEFAULT_RESPONSE_GENERATOR,
    };
  }
};
