<template>
  <div class="container-700 m-auto">
    <div class="center">
      <h1>Pending Invitations</h1>
      <h4>You have been invited to the following workspaces</h4>
    </div>
    <br /><br />
    <div class="workspace-container">
      <div class="spacer"></div>
      <div class="btn-end">
        <vs-button
          block
          @click="joinNewWorkspace()"
          color="brown darken-3 white--text"
          class="py-7 step-button bottom-button"
          >NEXT</vs-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      workspaceOwner: 'Makus Nikomi',
      workspaces: []
    };
  },
  methods: {
    joinNewWorkspace() {
      this.$emit('thisJoinWorkspace', this.workspaceOwner);
    },
    errorMessage() {
      console.log('error');
    }
  }
};
</script>

<style>
.input-select-con {
  width: 100%;
}
</style>
