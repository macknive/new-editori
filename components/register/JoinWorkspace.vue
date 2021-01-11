<template>
<v-container>
  <div align="center">
    <h1>Pending Invitations</h1>
    <p>You have been invited to the following workspaces</p>
  </div>
  <v-row class="d-flex flex-column">
    <v-col>
      <v-row v-for="value in existingWorkspace" :key="value.id">
        <v-col>
          <h1>{{value.name}}</h1>
          <p>{{value.owner}}</p>
        </v-col>
        <v-col align="right" class="pt-8">
          <font-awesome-icon class="text-brown mr-3" icon="trash-alt" size="2x"></font-awesome-icon>
          <font-awesome-icon class="text-brown" icon="check" size="2x"></font-awesome-icon>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
  <v-btn block @click="joinNewWorkspace()" color="brown darken-3 white--text py-7 step-button">NEXT</v-btn>
</v-container>
</template>

<script>
export default {
  data() {
    return {
      existingWorkspace: [
        {name: 'Drink Filtered', owner: 'Makus Nikomi'},
        {name: 'OBB Studio', owner: 'Papa Nikomi'},
      ]
    }
  },
  methods: {
    joinNewWorkspace() {
      this.$emit('thisJoinWorkspace', this.existingWorkspace)
    },
    errorMessage() {
      console.log("error")
    }
  }
}
</script>

<style>

</style>
