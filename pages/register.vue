<template>
  <v-app>
    <v-stepper v-model="step" vertical>
      <v-container class="register-container">
        <v-row>
          <v-col class="col-1 step-col">
            <div class="step1-bg"></div>
            <div class="step2-bg"></div>
            <div class="step3-bg"></div>
            <div class="step4-bg"></div>
            <div v-if="step == 1" class="step1">
              <v-stepper-step :complete="step > 1" step="Step 1">
              </v-stepper-step>
            </div>
            <div v-if="step == 2" class="step2">
              <v-stepper-step :complete="step > 2" step="Step 2">
              </v-stepper-step>
            </div>
            <div v-if="step == 3" class="step3">
              <v-stepper-step :complete="step > 3" step="Step 3">
              </v-stepper-step>
            </div>
            <div v-if="step == 4" class="step3">
              <v-stepper-step :complete="step > 4" step="Step 3">
              </v-stepper-step>
            </div>
            <div v-if="step == 5" class="step4">
              <v-stepper-step :complete="step > 5" step="Step 4">
              </v-stepper-step>
            </div>
          </v-col>
          <v-col class="pt-12">
            <v-stepper-content step="1" class="pt-0 step basicinformation">
              <div v-if="!isAuthenticated">
                <BasicInformation v-on:thisUser="register($event)" />
              </div>
              <div v-if="isAuthenticated">
                <Authenticated v-on:thisStep="proceedToNextStep($event)" />
              </div>
            </v-stepper-content>
            <v-stepper-content step="2" class="pt-0 step">
              <WorkspaceMenu v-on:thisPickWorkspace="joinOrCreate($event)" />
            </v-stepper-content>
            <v-stepper-content step="3" class="pt-0 step">
              <JoinWorkspace v-on:thisJoinWorkspace="joinWorkspace($event)" />
            </v-stepper-content>
            <v-stepper-content step="4" class="pt-0 step">
              <CreateNewWorkspace
                v-on:thisWorkspace="createWorkspace($event)"
              />
            </v-stepper-content>
            <v-stepper-content step="5" class="pt-0 step">
              <Success />
            </v-stepper-content>
          </v-col>
        </v-row>
      </v-container>
    </v-stepper>
  </v-app>
</template>

<script>
import BasicInformation from '~/components/register/BasicInformation';
import JoinWorkspace from '~/components/register/JoinWorkspace';
import CreateNewWorkspace from '~/components/register/CreateNewWorkspace';
import WorkspaceMenu from '~/components/register/WorkspaceMenu';
import Success from '~/components/register/Success';
import Authenticated from '~/components/register/Authenticated';
import { mapGetters } from 'vuex';
import CreateWorkspace from '~/queries/CreateWorkspace';

export default {
  layout: 'empty',
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
  components: {
    BasicInformation,
    Authenticated,
    JoinWorkspace,
    CreateWorkspace,
    WorkspaceMenu,
    CreateNewWorkspace,
    Success
  },
  data() {
    return {
      step: 1,
      userInfo: {},
      workspaceInfo: {},
      joinWorkspaceInfo: {},
      joinCreateInfo: {}
    };
  },
  methods: {
    async register(addNewUser) {
      this.userInfo = addNewUser;
      this.error = null;
      try {
        this.$axios.setToken(false);
        await this.$axios.post('auth/local/register', {
          email: this.userInfo.email,
          username: this.userInfo.username,
          password: this.userInfo.password,
          display_name: this.userInfo.displayName
        });
        await this.$auth
          .loginWith('local', {
            data: {
              identifier: this.userInfo.email,
              password: this.userInfo.password
            }
          })
          .then(response => {
            this.$apolloHelpers.onLogin(response.data.jwt);
            console.log('Well done!');
            console.log('User profile', response.data.user);
            console.log('User token', response.data.jwt);
          });
        this.step = 2;
        document.querySelector('.basicinformation').style.display = 'none';
        console.log('success');
      } catch (e) {
        this.error = e.response.data.message[0].messages[0].message;
        alert(this.error);
      }
    },
    proceedToNextStep() {
      this.step = 2;
    },
    joinOrCreate(joinCreate) {
      this.joinCreateInfo = joinCreate;
      if (this.joinCreateInfo == 'join') {
        this.step = 3;
      }
      if (this.joinCreateInfo == 'create') {
        this.step = 4;
      }
    },
    createWorkspace(addNewWorkspace) {
      this.workspaceInfo = addNewWorkspace;
      const mutationConfig = {
        mutation: CreateWorkspace,
        variables: {
          name: this.workspaceInfo.workspaceName,
          slug: this.workspaceInfo.workspaceSlug
        }
      };
      this.$apollo
        .mutate(mutationConfig)
        .then(this.onCreateSuccess())
        .catch(err => this.onCreateError(err));
      this.step = 5;
    },
    onCreateSuccess() {
      console.log('success');
      console.log(this.workspaceInfo.workspaceName);
      console.log(this.workspaceInfo.workspaceSlug);
    },
    onCreateError(err) {
      console.log(err);
    },

    joinWorkspace(joinNewWorkspace) {
      this.joinWorkspaceInfo = joinNewWorkspace;
      this.step = 5;
    }
  }
};
</script>

<style></style>
