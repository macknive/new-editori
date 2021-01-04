<template>
<div>
  <v-app>
    <v-stepper
      v-model="e6"
      vertical
    >
      <v-container class="leftcontainer">
        <v-row>
          <v-col class="col-1">
            <v-stepper-step
              class="step-design"
              :complete="e6 > 1"
              step="Step 1"
            >
            </v-stepper-step>
            <v-stepper-step
              :complete="e6 > 2"
              step="Step 2"
            >
            </v-stepper-step>
            <v-stepper-step
              :complete="e6 > 3"
              step="Step 3"
            >
            </v-stepper-step>
            <v-stepper-step
              :complete="e6 > 4"
              step="Step 3"
            >
            </v-stepper-step>
            <v-stepper-step
              :complete="e6 > 5"
              step="Step 4"
            >
            </v-stepper-step>
          </v-col>
          <v-col class="pt-12">
            <v-stepper-content step="1" class="pt-0 step">
              <BasicInformation/>
              <v-container>
                <v-btn block @click="e6 = 2" color="brown lighten-1 white--text py-7 step-button">NEXT</v-btn>
                <p align="right">Already have an account?<a class="ml-1">Login</a></p>
              </v-container>
            </v-stepper-content>
            <v-stepper-content step="2" class="pt-0 step">
              <v-container>
                <v-row class="d-flex flex-column">
                  <v-col align="center">
                    <h1>How can we help you?</h1>
                    <p>The best relationships start with at least this much...</p>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <a @click="e6 = 3"><div class="square pa-12" align="center"><font-awesome-icon class="text-brown" icon="envelope-open-text" size="4x"></font-awesome-icon></div></a>
                    <p align="center" class="text-brown">Join Existing Workspace</p>
                  </v-col>
                  <v-col>
                    <a @click="e6 = 4"><div class="square pa-12" align="center"><font-awesome-icon class="text-brown" icon="plus" size="4x"></font-awesome-icon></div></a>
                    <p align="center" class="text-brown">Create New Workspace</p>
                  </v-col>
                </v-row>
              </v-container>
            </v-stepper-content>
            <v-stepper-content step="3" class="pt-0 step">
              <JoinWorkspace/>
              <v-container>
                <v-btn block @click="e6 = 5" color="brown lighten-1 white--text py-7 step-button">NEXT</v-btn>
              </v-container>
            </v-stepper-content>
            <v-stepper-content step="4" class="pt-0 step">
              <CreateWorkspace/>
              <v-container>
                <v-btn block @click="e6 = 5" color="brown lighten-1 white--text py-7 step-button">NEXT</v-btn>
              </v-container>
            </v-stepper-content>
            <v-stepper-content step="5" class="pt-0 step">
              <v-container>
                <h1 align="center" class="pt-5">You Are All Set</h1>
                <p align="center">It all starts here, let's invite the people that help make your projects a success</p>
                <br><br><br><br><br><br><br><br>
                <v-btn block @click="e6 = 1" color="brown lighten-1 white--text py-7 step-button">GO TO DASHBOARD</v-btn>
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
    }
  },
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
  border: 1px solid #593d3b;
  border-radius: 3%;
}
.step {
  border-left: none !important;
}
.container {
  max-width: 700px;
}
.leftcontainer {
  max-width: unset;
}
.v-stepper {
  box-shadow: none;
}

.v-stepper__step__step {
  height: 50px !important;
  min-width: 50px !important;
  transform: rotate(-90deg) !important;
  border-radius: unset;
}

.v-stepper--vertical .v-stepper__step {
  padding: unset;
}

</style>
