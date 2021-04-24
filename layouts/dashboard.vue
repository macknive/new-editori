<template>
  <v-app>
    <div class="navbar">
      <v-row>
        <v-col
          ><nuxt-link to="/" class="link-style"
            ><h3 class="inline ml-12 text-brown">EDITORI</h3>
          </nuxt-link>

          <div v-if="workspaceSlug" class="ml-6 inline">
            <h3 class="inline">></h3>
            <h3 class="inline ml-3">{{ workspace.name }}</h3>
          </div>
        </v-col>
        <v-col align="right" cols="1">
          <v-btn icon class="mt-2">
            <v-icon medium>mdi-magnify</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="2">
          <div v-if="isAuthenticated">
            <div class="avatar-placeholder">
              <div align="center" class="mt-1">
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" icon
                      ><h2>{{ userInitial }}</h2></v-btn
                    >
                  </template>
                  <v-list>
                    <v-list-item>
                      <div align="center">
                        <a @click="onLogout" class="logout">Logout</a>
                      </div>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </div>
          </div>
          <div v-if="!isAuthenticated" class="mt-3">
            <nuxt-link to="/login">login</nuxt-link>
          </div>
        </v-col>
      </v-row>
    </div>
    <nuxt />
  </v-app>
</template>
<script>
import getWorkspaceBySlug from '~/mixins/getWorkspaceBySlug';
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      workspaces: [],
      workspaceSlug: this.$route.params.workspace
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
    userInitial() {
      var str = this.loggedInUser.display_name;
      var res = str.charAt(0);
      return res;
    },
    workspace() {
      return this.workspaces[0];
    }
  },
  methods: {
    async onLogout() {
      await this.$apolloHelpers.onLogout();
      await this.$auth.logout();
    }
  },
  mixins: [getWorkspaceBySlug]
};
</script>

<style scoped>
.v-list {
  width: 80px;
}

.inline {
  display: inline;
}
</style>
