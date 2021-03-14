<template>
  <v-app>
    <v-container class="container-1200">
      <div class="root">
        <h1 align="center" class="mb-6">{{ workspace.name }}</h1>
        <v-row>
          <v-col>
            <v-btn-toggle v-model="toggle_exclusive" mandatory>
              <v-btn @click="live = true">LIVE</v-btn>
              <v-btn @click="live = false">UPCOMING</v-btn>
            </v-btn-toggle>
          </v-col>

          <v-col align="right">
            <v-text-field
              solo
              v-model="search"
              class="searchbar"
              append-icon="mdi-magnify"
              label="Search"
            ></v-text-field>
          </v-col>
        </v-row>

        <div v-if="live">
          <div v-if="!integration">
            <v-container class="container-700">
              <div align="center">
                <h3>CAN YOU HELP US OUT?</h3>
                <div class="placeholder-gray my-12"></div>
                <p class="f-16 mb-12">
                  Before we start working on taking your blog to the next level
                  lets configure this workspace. Don't worry, it is quick and
                  painless. Easy Peasy!
                </p>
                <v-btn
                  color="brown darken-3 white--text"
                  class="py-7 step-button"
                  :to="`${workspaceSlug}/settings/connect/`"
                  >SURE, HERE IS WHAT YOU NEED...</v-btn
                >
              </div>
            </v-container>
          </div>
          <div v-if="integration">
            <v-alert type="success" class="success-alert" :value="alert">
              <div align="left">
                <v-row>
                  <v-col><p class="mb-0">Success!</p></v-col>
                  <v-col align="right"
                    ><i
                      aria-hidden="true"
                      class="v-icon notranslate v-alert__icon mdi mdi-check-circle theme--dark"
                    ></i
                  ></v-col>
                </v-row>
                <div>Your posts are being imported from {{ platform }}</div>
              </div>
            </v-alert>
            {{ platform }} integrated successfully
          </div>
        </div>
        <div v-if="!live">
          <DeliverableTableRow
            v-for="deliverable in deliverableList"
            class="deliverable"
            :key="deliverable.id"
            :deliverable="deliverable"
            :baseUrl="`/${workspaceSlug}`"
          >
          </DeliverableTableRow>
          <nuxt-link :to="`${workspace.slug}/new`">
            <button class="fab">+</button>
          </nuxt-link>
        </div>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import DeliverableTableRow from '~/components/DeliverableTableRow'
import ListDeliverablesByWorkspace from '~/queries/ListDeliverablesByWorkspace'
import getWorkspaceBySlug from '~/mixins/getWorkspaceBySlug'

export default {
  layout: 'empty',
  components: {
    DeliverableTableRow
  },
  data() {
    return {
      deliverables: [],
      workspaces: [],
      workspaceSlug: this.$route.params.workspace,
      toggle_exclusive: undefined,
      search: '',
      live: true,
      integration: this.$store.state.platformIntegration,
      alert: this.$store.state.alertStatus,
      platform: this.$store.state.chosenPlatform
    }
  },
  created() {
    setTimeout(() => {
      this.alert = false
    }, 7000)
  },
  computed: {
    ...mapState(['platformIntegration', 'alertStatus', 'chosenPlatform']),
    workspace() {
      return this.workspaces[0]
    },
    deliverableList() {
      return this.deliverables
        .filter(deliverable => {
          return deliverable.title
            .toLowerCase()
            .includes(this.search.toLowerCase())
        })
        .sort(function(a, b) {
          return new Date(b.updated_at) - new Date(a.updated_at)
        })
    }
  },
  apollo: {
    deliverables: {
      prefetch: true,
      query: ListDeliverablesByWorkspace,
      variables() {
        return {
          workspaceSlug: this.workspaceSlug
        }
      }
    }
  },
  mixins: [getWorkspaceBySlug]
}
</script>

<style>
body {
  background: #f8f8f8;
  --gap: 20px;
}
</style>

<style scoped>
.v-btn-toggle > .v-btn.v-btn--active {
  background-color: #6f5e53 !important;
  color: white;
}

.searchbar {
  width: 300px;
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
