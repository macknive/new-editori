<template>
  <div class="container-700 m-auto">
    <div class="d-flex flex-column">
      <div align="center" class="mb-20">
        <h1>How can we help you?</h1>
        <h4>The best relationships start with at least this much...</h4>
      </div>
      <br />
    </div>
    <div class="container-row">
      <div class="m-auto">
        <a @click="proceedToJoin()"
          ><div class="workspace-border mb-20" align="center">
            <br /><br />
            <font-awesome-icon
              class="text-brown svg-workspace"
              icon="envelope-open-text"
              size="4x"
            ></font-awesome-icon>
          </div>
        </a>
        <p align="center" class="text-brown">Join Existing Workspace</p>
      </div>
      <div class="m-auto">
        <a @click="proceedToCreate()"
          ><div class="workspace-border pa-12 mb-20" align="center">
            <br /><br />
            <font-awesome-icon
              class="text-brown svg-workspace"
              icon="plus"
              size="4x"
            ></font-awesome-icon></div
        ></a>
        <p align="center" class="text-brown">Create New Workspace</p>
      </div>
    </div>
  </div>
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
