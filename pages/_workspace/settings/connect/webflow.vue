<template>
  <div class="webflow-settings-root">
    <ul v-if="connections && connections.length > 0">
      <li v-for="connection in connections" :key="connection.id">
        <p>
          Connected to {{ connection.service }} at {{ connection.created_at }}
        </p>
        <p>
          <b>Token:</b> <code>{{ connection.data.access_token }}</code>
        </p>
      </li>
    </ul>
    <div v-if="sites">
      Choose a site:
      <select>
        <option v-for="site in sites" :key="site['_id']">{{
          site.name
        }}</option>
      </select>
    </div>
    <button @click="authorizeWebflow">Connect Webflow</button>
  </div>
</template>

<script>
import CreateConnection from '~/queries/CreateConnection'
import ListConnectionsByWorkspace from '~/queries/ListConnectionsByWorkspace'
import GetWorkspaceBySlug from '~/queries/GetWorkspaceBySlug'
import { axiosForService } from '~/utils/request-utils'
import base64 from 'base-64'

const RESPONSE_TYPE = 'code'
const GRANT_TYPE = 'authorization_code'
const WEBFLOW_SERVICE_NAME = 'webflow'

const serialize = function(obj) {
  return base64.encode(JSON.stringify(obj))
}
const deserialize = function(s) {
  return JSON.parse(base64.decode(s))
}

export default {
  async asyncData(ctx) {
    const webflowAxios = await axiosForService(ctx, 'webflow')
    const sitesResponse = await webflowAxios.get('/sites')
    return {
      sites: sitesResponse.data
    }
  },
  data() {
    return {
      connections: [],
      sites: [],
      workspaceSlug: this.$route.params.workspace,
      workspaces: []
    }
  },
  computed: {
    workspace() {
      return this.workspaces[0]
    }
  },
  middleware(ctx) {
    const apollo = ctx.app.apolloProvider.defaultClient
    const axios = ctx.app.$axios
    const code = ctx.route.query['code']

    if (!code) {
      return
    }

    if (process.client) {
      // We should be trying to fetch an access token for the specified
      // authorization code, but this is not possible with a client-side XHR due
      // to CORS.
      // window.location.reload();
      return
    }

    return axios
      .post('https://api.webflow.com/oauth/access_token', {
        client_id: process.env.apiKeys.webflow.clientId,
        client_secret: process.env.apiKeys.webflow.clientSecret,
        code: code,
        grant_type: GRANT_TYPE
      })
      .then(response => {
        const stateStr = ctx.route.query['state']
        const state = stateStr ? deserialize(stateStr) : {}

        const mutationConfig = {
          mutation: CreateConnection,
          variables: {
            service: WEBFLOW_SERVICE_NAME,
            workspaceId: state.workspaceId,
            data: {
              access_token: response.data.access_token,
              token_type: response.data.token_type
            }
          }
        }

        return apollo
          .mutate(mutationConfig)
          .then(connectionResponse => {
            // Strip query params
            ctx.redirect(ctx.route.path)
            return
          })
          .catch(err => {
            console.error('create connection error', err)
          })
      })
      .catch(err => {
        console.error('request access token error', err)
      })
  },
  methods: {
    authorizeWebflow() {
      const state = {
        workspaceId: this.workspace.id,
        workspaceSlug: this.workspaceSlug
      }
      window.location.href =
        'https://webflow.com/oauth/authorize' +
        `?client_id=${process.env.apiKeys.webflow.clientId}` +
        `&response_type=${RESPONSE_TYPE}` +
        `&state=${serialize(state)}`
    }
  },
  apollo: {
    connections: {
      prefetch: true,
      query: ListConnectionsByWorkspace,
      variables() {
        return {
          workspaceSlug: this.workspaceSlug,
          service: WEBFLOW_SERVICE_NAME
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

<style scoped>
.webflow-settings-root {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
code {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  display: inline-block;
  border-radius: 4px;
  color: #555;
  padding: 4px;
}
p {
  margin: 0;
  padding: 0;
  line-height: 1.5;
}
li,
select {
  margin-bottom: 20px;
}
</style>
