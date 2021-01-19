<template>
  <v-app>
    <v-stepper v-model="step" vertical>
      <v-container class="newcontainer">
        <v-row>
          <v-col class="col-1 leftcol">
            <div class="rectangle"></div>
            <div class="rectangle2"></div>
            <div class="rectangle3"></div>
            <div class="rectangle4"></div>
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
              <BasicInformation v-on:thisUser="createUser($event)" />
            </v-stepper-content>
            <v-stepper-content step="2" class="pt-0 step">
              <WorkspaceMenu v-on:thisPickWorkspace="joinOrCreate($event)" />
            </v-stepper-content>
            <v-stepper-content step="3" class="pt-0 step">
              <JoinWorkspace v-on:thisJoinWorkspace="joinWorkspace($event)" />
            </v-stepper-content>
            <v-stepper-content step="4" class="pt-0 step">
              <CreateWorkspace v-on:thisWorkspace="createWorkspace($event)" />
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
import BasicInformation from '~/components/register/BasicInformation'
import JoinWorkspace from '~/components/register/JoinWorkspace'
import CreateWorkspace from '~/components/register/CreateWorkspace'
import WorkspaceMenu from '~/components/register/WorkspaceMenu'
import Success from '~/components/register/Success'
export default {
  middleware: 'guest',
  components: {
    BasicInformation,
    JoinWorkspace,
    CreateWorkspace,
    WorkspaceMenu,
    Success
  },
  data() {
    return {
      step: 1,
      userInfo: {},
      workspaceInfo: {},
      joinWorkspaceInfo: {},
      joinCreateInfo: {}
    }
  },
  methods: {
    //create mutation for user and workspace then
    //proceed to next step
    createUser(addNewUser) {
      this.userInfo = addNewUser
      this.step = 2
      document.querySelector('.basicinformation').style.display = 'none'
    },
    joinOrCreate(joinCreate) {
      this.joinCreateInfo = joinCreate
      if (this.joinCreateInfo == 'join') {
        this.step = 3
      }
      if (this.joinCreateInfo == 'create') {
        this.step = 4
      }
    },
    createWorkspace(addNewWorkspace) {
      this.workspaceInfo = addNewWorkspace
      this.step = 5
    },
    joinWorkspace(joinNewWorkspace) {
      this.joinWorkspaceInfo = joinNewWorkspace
      this.step = 5
    }
  }
}
</script>

<style></style>
