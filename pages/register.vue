<template>
<div>
  <v-app>
    <v-stepper
      v-model="e6"
      vertical
    >
      <v-container>
        <v-row>
          <v-col class="col-1">
            <v-stepper-step
              :complete="e6 > 1"
              step="1"
            >
            </v-stepper-step>
            <v-stepper-step
              :complete="e6 > 2"
              step="2"
            >
            </v-stepper-step>
            <v-stepper-step
              :complete="e6 > 3"
              step="3"
            >
            </v-stepper-step>
            <v-stepper-step
              :complete="e6 > 4"
              step="4"
            >
            </v-stepper-step>
            <v-stepper-step
              :complete="e6 > 5"
              step="5"
            >
            </v-stepper-step>
          </v-col>
          <v-col>
            <v-stepper-content step="1" class="pt-0 step">
              <BasicInformation/>
              <v-container class="content-container">
                <v-btn block @click="e6 = 2" color="brown lighten-1 white--text py-7 step-button">NEXT</v-btn>
                <p align="right">Already have an account?<a class="ml-1">Login</a></p>
              </v-container>
            </v-stepper-content>
            <v-stepper-content step="2" class="pt-0 step">
              <WorkspaceArea/>
              <v-btn
                color="primary"
                @click="e6 = 3"
              >
                Continue
              </v-btn>
            </v-stepper-content>
            <v-stepper-content step="3" class="pt-0 step">
              <JoinWorkspace/>
              <v-btn
                color="primary"
                @click="e6 = 4"
              >
                Continue
              </v-btn>
            </v-stepper-content>
            <v-stepper-content step="4" class="pt-0 step">
              <CreateWorkspace/>
              <v-btn
                color="primary"
                @click="e6 = 5"
              >
                Continue
              </v-btn>
            </v-stepper-content>
            <v-stepper-content step="5" class="pt-0 step">
              <Success/>
              <v-btn
                color="primary"
                @click="e6 = 1"
              >
                Continue
              </v-btn>
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
import WorkspaceArea from '~/components/WorkspaceArea'
import JoinWorkspace from '~/components/JoinWorkspace'
import CreateWorkspace from '~/components/CreateWorkspace'
import Success from '~/components/Success'
export default {
  components: {
    BasicInformation,
    WorkspaceArea,
    JoinWorkspace,
    CreateWorkspace,
    Success
  },
  data () {
    return {
      e6: 1,
    }
  },
}
</script>

<style>
.step {
  border-left: none !important;
}
.content-container {
  max-width: 500px;
}
.v-stepper {
  box-shadow: none;
}
</style>