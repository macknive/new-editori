<template>
  <v-stepper v-model="step" vertical>
    <v-container class="register-container">
      <div>
        <div class="col-1 step-col">
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
        </div>
        <div class="pt-12">
          <v-stepper-content step="1" class="pt-0 step basicinformation">
            <div v-if="!isAuthenticated">
              <BasicInformation v-on:thisUser="register($event)" />
            </div>
            <div v-if="isAuthenticated">
              <Authenticated
                v-on:thisStep="proceedToNextStep($event)"
                :color="color"
              />
            </div>
          </v-stepper-content>
          <v-stepper-content step="2" class="pt-0 step">
            <WorkspaceMenu v-on:thisPickWorkspace="joinOrCreate($event)" />
          </v-stepper-content>
          <v-stepper-content step="3" class="pt-0 step">
            <JoinWorkspace v-on:thisJoinWorkspace="joinWorkspace($event)" />
          </v-stepper-content>
          <v-stepper-content step="4" class="pt-0 step">
            <CreateNewWorkspace v-on:thisWorkspace="createWorkspace($event)" />
          </v-stepper-content>
          <v-stepper-content step="5" class="pt-0 step">
            <Success />
          </v-stepper-content>
        </div>
      </div>
    </v-container>
  </v-stepper>
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
  created() {
    this.$store.commit('navbar/setShouldShowWorkspace', false);
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
      color: '#593d3b',
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

<style>
.vs-button {
  width: 100%;
  background: #593d3b;
}

.step1 div > span,
.step2 div > span,
.step3 div > span,
.step4 div > span {
  font-family: 'Noto Sans';
  font-weight: 700;
  font-size: 18px;
}

.step1 div > span,
.step2 div > span,
.step3 div > span,
.step4 div > span {
  padding-bottom: 10px;
}

.step {
  border-left: none !important;
}

.register-container {
  max-width: unset;
}

.step-col {
  max-width: 50px;
  padding-bottom: 20px;
}

.v-stepper {
  box-shadow: none !important;
}

.step1 div > span {
  background: #593d3b !important;
}

.step2 div > span {
  top: 250px !important;
  background: #6f5e53 !important;
}

.step3 div > span {
  top: 400px !important;
  background: #8a7968 !important;
}

.step4 div > span {
  top: 550px !important;
  background: #ab947e !important;
}

.v-stepper--vertical .v-stepper__step {
  padding: unset;
}

.v-stepper__step__step {
  height: 50px !important;
  width: 150px !important;
  transform: rotate(-90deg) !important;
  border-radius: unset !important;
  position: fixed;
  top: 100px;
  font-size: 20px;
  left: -23px;
}

.step1-bg,
.step2-bg,
.step3-bg,
.step4-bg {
  position: fixed;
  left: 17px;
  height: 150px;
  width: 10px;
}

.step1-bg {
  top: 50px;
  border: 1px solid #593d3b;
  background: #593d3b;
}

.step2-bg {
  top: 200px;
  border: 1px solid #6f5e53;
  background: #6f5e53;
}

.step3-bg {
  top: 350px;
  border: 1px solid #8a7968;
  background: #8a7968;
}

.step4-bg {
  top: 500px;
  border: 1px solid #ab947e;
  background: #ab947e;
}

.svg-apple,
.svg-google {
  height: 56px;
  border-radius: 4px;
  width: 120px !important;
}

.svg-apple {
  color: white;
  background: black;
}

.svg-google {
  border: 1px solid gray;
}

@media only screen and (max-width: 375px) {
  .step1-bg,
  .step2-bg,
  .step3-bg,
  .step4-bg {
    left: 0px;
    height: 130px;
  }

  .step1-bg {
    top: 20px;
  }

  .step2-bg {
    top: 150px;
  }

  .step3-bg {
    top: 280px;
  }

  .step4-bg {
    top: 410px;
  }

  .v-stepper__step__step {
    height: 30px !important;
    width: 130px !important;
    top: 50px;
    font-size: 16px;
    left: -40px;
  }

  .step1 div > span {
    top: 70px;
  }

  .step2 div > span {
    top: 200px !important;
  }

  .step3 div > span {
    top: 330px !important;
  }

  .step4 div > span {
    top: 460px !important;
  }
}
</style>
