<template>
  <v-app>
    <v-container class="container-700">
      <vs-row class="d-flex flex-column">
        <v-col align="center" class="mb-12">
          <h1>How can we help you?</h1>
          <h4>The best relationships start with at least this much...</h4>
        </v-col>
      </vs-row>
      <vs-row>
        <v-col>
          <a @click="proceedToJoin()"
            ><div class="workspace-border pa-12 mb-3" align="center">
              <font-awesome-icon
                class="text-brown svg-workspace"
                icon="envelope-open-text"
                size="4x"
              ></font-awesome-icon></div
          ></a>
          <p align="center" class="text-brown">Join Existing Workspace</p>
        </v-col>
        <v-col>
          <a @click="proceedToCreate()"
            ><div class="workspace-border pa-12 mb-3" align="center">
              <font-awesome-icon
                class="text-brown svg-workspace"
                icon="plus"
                size="4x"
              ></font-awesome-icon></div
          ></a>
          <p align="center" class="text-brown">Create New Workspace</p>
        </v-col>
      </vs-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      workspaceChoiceStatus: ''
    };
  },
  methods: {
    proceedToJoin(stepThree) {
      this.workspaceChoiceStatus = 'join';
      this.$emit('thisPickWorkspace', this.workspaceChoiceStatus);
    },
    proceedToCreate(stepFour) {
      this.workspaceChoiceStatus = 'create';
      this.$emit('thisPickWorkspace', this.workspaceChoiceStatus);
    },
    errorMessage() {
      console.log('error');
    }
  }
};
</script>

<style></style>
