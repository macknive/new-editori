<template>
<div>
  <v-app>
    <v-stepper
      v-model="e6"
      vertical
    >
      <v-container class="newcontainer">
        <v-row>
          <v-col class="col-1 leftcol">
          <div class="rectangle"></div>
          <div class="rectangle2"></div>
          <div class="rectangle3"></div>
          <div class="rectangle4"></div>
            <div v-if="e6 == 1" class="step1">
            <v-stepper-step
              :complete="e6 > 1"
              step="Step 1"
            >
            </v-stepper-step>

            </div>
            <div v-if="e6 == 2" class="step2">
            <v-stepper-step
              :complete="e6 > 2"
              step="Step 2"
            >
            </v-stepper-step>
            </div>

            <div v-if="e6 == 3" class="step3">
            <v-stepper-step
              :complete="e6 > 3"
              step="Step 3"
            >
            </v-stepper-step>
            </div>

            <div v-if="e6 == 4" class="step3">
            <v-stepper-step
              :complete="e6 > 4"
              step="Step 3"
            >
            </v-stepper-step>
            </div>

            <div v-if="e6 == 5" class="step4">
            <v-stepper-step
              :complete="e6 > 5"
              step="Step 4"
            >
            </v-stepper-step>
            </div>

          </v-col>
          <v-col class="pt-12">
            <v-stepper-content step="1" class="pt-0 step">
              <BasicInformation v-on:thisUser="createUser($event)"/>
            </v-stepper-content>
            <v-stepper-content step="2" class="pt-0 step">
              <v-container>
                <v-row class="d-flex flex-column">
                  <v-col align="center">
                    <h1>How can we help you?</h1>
                    <p>The best relationships start with at least this much...</p>
                    <br><br><br>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <a @click="e6 = 3"><div class="square pa-12" align="center"><font-awesome-icon class="text-brown svgworkspace" icon="envelope-open-text" size="4x"></font-awesome-icon></div></a>
                    <br><p align="center" class="text-brown">Join Existing Workspace</p>
                  </v-col>
                  <v-col>
                    <a @click="e6 = 4"><div class="square pa-12" align="center"><font-awesome-icon class="text-brown svgworkspace" icon="plus" size="4x"></font-awesome-icon></div></a>
                    <br><p align="center" class="text-brown">Create New Workspace</p>
                  </v-col>
                </v-row>
              </v-container>
            </v-stepper-content>
            <v-stepper-content step="3" class="pt-0 step">
              <JoinWorkspace/>
              <v-container>
                <v-btn block @click="e6 = 5" color="brown darken-3 white--text py-7 step-button">NEXT</v-btn>
              </v-container>
            </v-stepper-content>
            <v-stepper-content step="4" class="pt-0 step">
              <CreateWorkspace v-on:thisWorkspace="createWorkspace($event)"/>
            </v-stepper-content>
            <v-stepper-content step="5" class="pt-0 step">
              <v-container>
                <h1 align="center" class="pt-5">You Are All Set</h1><br>
                <p align="center">It all starts here, let's invite the people that help make your projects a success</p>
                <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                <v-btn block @click="e6 = 1" color="brown darken-3 white--text py-7 step-button">GO TO DASHBOARD</v-btn>
              </v-container>
            </v-stepper-content>
          </v-col> 
        </v-row>
      </v-container>    
    </v-stepper>
  </v-app>
</div>
</template>

<script>
import BasicInformation from '~/components/BasicInformation';
import JoinWorkspace from '~/components/JoinWorkspace'
import CreateWorkspace from '~/components/CreateWorkspace'
export default {
  components: {
    BasicInformation,
    JoinWorkspace,
    CreateWorkspace,
  },
  data () {
    return {
      e6: 1,
      userInfo: {},
      workspaceInfo: {}
    }
  },
  methods: {
    //create mutation for user and workspace then 
    //proceed to next step
    createUser(addNewUser) {
      this.userInfo = addNewUser
      this.e6 = 2
    },
    createWorkspace(addNewWorkspace) {
      this.workspaceInfo = addNewWorkspace
      this.e6 = 5
    },
  }
}
</script>

<style>
.text-brown {
  color: #593d3b !important;
}
.rcorners {
  border-radius: 50%;
  border: 1px solid #593d3b;
  padding: 22px; 
  height: 80px;
  width: 80px;  
}
.square {
  height: 300px;
  border: 1px solid #593d3b;
  border-radius: 3%;
}
.svgworkspace {
  margin-top: 60px;
}
.step {
  border-left: none !important;
}
.container {
  max-width: 700px;
}
.newcontainer {
  max-width: unset;
}
.leftcol {
  max-width: 50px;
}
.v-stepper {
  box-shadow: none;
}
.v-stepper__step__step {
  height: 50px !important;
  width: 150px !important;
  transform: rotate(-90deg) !important;
  border-radius: unset;
  position: fixed;
  top: 150px;
  font-size: 20px;
  left: -23px;
} 
.step1 div > span {
  background: #593d3b !important;
}
.step2 div > span {
  top: 300px !important;
  background: #6f5e53 !important;
}
.step3 div > span {
  top: 450px !important;
  background: #8a7968 !important;
}
.step4 div > span {
  top: 600px !important;
  background: #ab947e !important;
}
.v-stepper--vertical .v-stepper__step {
  padding: unset;
}
.rectangle, .rectangle2, .rectangle3, .rectangle4 {
  position: fixed;
  left: 17px;
  height: 150px;
  width: 10px;
}
.rectangle {
  top: 100px;
  border: 1px solid #593d3b;
  background: #593d3b;
}
.rectangle2 {
  top: 250px;
  border: 1px solid #6f5e53;
  background: #6f5e53;
}
.rectangle3 {
  top: 400px;
  border: 1px solid #8a7968;
  background: #8a7968;
}
.rectangle4 {
  top: 550px;
  border: 1px solid #ab947e;
  background: #ab947e;
}
.v-btn--disabled {
  padding: 28px 0 !important;
}
.svgcol {
  max-width: 150px;
}
.svgapple, .svggoogle {
  height: 56px;
  border-radius: 4px;
  width: 120px !important;
}
.svgapple {
  color: white;
  background: black;
}
.svggoogle {
  border: 1px solid gray;
}
</style>
