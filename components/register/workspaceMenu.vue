<template>
  <v-app>
    <v-container>
      <v-row class="d-flex flex-column">
        <v-col align="center">
          <h1>How can we help you?</h1>
          <h4>The best relationships start with at least this much...</h4>
          <br><br><br>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <a @click="proceedToJoin()"><div class="square pa-12" align="center"><font-awesome-icon class="text-brown svgworkspace" icon="envelope-open-text" size="4x"></font-awesome-icon></div></a>
          <br><p align="center" class="text-brown">Join Existing Workspace</p>
        </v-col>
        <v-col>
          <a @click="proceedToCreate()"><div class="square pa-12" align="center"><font-awesome-icon class="text-brown svgworkspace" icon="plus" size="4x"></font-awesome-icon></div></a>
          <br><p align="center" class="text-brown">Create New Workspace</p>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      workspaceChoiceStatus: "",
    }
  },
  methods: {
    proceedToJoin(stepThree) {
      this.workspaceChoiceStatus = "join"
      this.$emit('thisPickWorkspace', this.workspaceChoiceStatus)
    },
    proceedToCreate(stepFour) {
      this.workspaceChoiceStatus = "create"
      this.$emit('thisPickWorkspace', this.workspaceChoiceStatus)
    },
    errorMessage() {
      console.log("error")
    }
  }
}
</script>

<style>

</style>
