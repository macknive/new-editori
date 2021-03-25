<template>
  <v-app>
    <div class="mt-12 pt-12"></div>
    <v-container class="container-700" v-if="webflowStep == 1">
      <div align="center">
        <h3>
          AH, SO YOU'RE TEAM WEBFLOW
        </h3>
        <p class="f-16 py-8">
          No Problem, we will use it as the source of truth to stay in sync.
          Just connect your account.
        </p>
        <a @click="authorizeWebflow()">
          <div class="editori-border mb-4">
            <v-container>
              <img
                src="~/assets/svgs/webflowconnect.svg"
                alt="webflowconnect"
              />
              <div class="mt-4">
                <span>Connect to Webflow</span>
              </div>
            </v-container>
          </div>
        </a>
        <div class="mb-12">
          <i>Click to login to Webflow</i>
        </div>
        <v-container class="container-300">
          <v-btn
            @click="proceed()"
            type="submit"
            block
            class="py-7"
            color="brown darken-3 white--text"
            >NEXT</v-btn
          >
        </v-container>
      </div>
    </v-container>

    <v-container class="container-1200" v-if="webflowStep == 2">
      <div align="center">
        <h3 class="pb-8">
          WHICH SITE ARE WE FOCUSING ON?
        </h3>
        <p class="f-16 py-8">
          Okay, you granted permission but let's confirm which workspace we are
          focusing on
        </p>
      </div>
      <v-row>
        <v-col v-for="site in sampleSites" :key="site.id">
          <v-btn @click="selectSite($event)" class="sample-sites" :value="site">
            {{ site }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-if="webflowStep == 3" class="container-1200">
      <div align="center">
        <h3 class="pb-8">
          WHICH...
        </h3>
        <p class="f-16 py-8">
          Okay, you granted permission but let's confirm which workspace we are
          focusing on
        </p>
      </div>
      <v-row>
        <v-col v-for="collection in sampleCollections" :key="collection.id">
          <v-btn
            @click="selectCollection($event)"
            class="sample-sites"
            :value="collection"
            >{{ collection }}</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import CreateConnection from '~/queries/CreateConnection'
import ListConnectionsByWorkspace from '~/queries/ListConnectionsByWorkspace'
import getWorkspaceBySlug from '~/mixins/getWorkspaceBySlug'
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
      workspaces: [],
      webflowStep: '1',
      sampleSites: ['Drink Filtered', 'Ebb Studio', 'Example Site'],
      sampleCollections: [
        'Blog Posts',
        'Authors',
        'Categories',
        'Tags',
        'Team Members',
        'Others'
      ],
      selectedSite: undefined,
      selectedCollection: undefined
    }
  },
  computed: {
    ...mapState(['platformIntegration']),
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
    },
    proceed() {
      return (this.webflowStep = '2')
    },
    selectSite(e) {
      this.selectedSite = e.target.value
      if (this.selectedSite) {
        console.log('Selected Site: ' + this.selectedSite)
        this.webflowStep = '3'
      }
    },
    selectCollection(e) {
      this.selectedCollection = e.target.value
      if (this.selectedCollection) {
        console.log('Selected Collection: ' + this.selectedCollection)
        this.$store.commit('platformWebflow')
        this.$router.push(`/${this.workspaceSlug}`)
      }
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
    }
  },
  mixins: [getWorkspaceBySlug]
}
</script>

<style></style>
