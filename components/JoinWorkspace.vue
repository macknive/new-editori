<template>
<v-container>
  <div align="center">
    <h1>Pending Invitations</h1>
    <p>You have been invited to the following workspaces</p>
  </div>
  <v-row class="d-flex flex-column">
    <v-col>
      <v-row>
        <v-col>
          <h1>Drink Filtered</h1>
          <p>Invited by Makus Nikomi</p>
        </v-col>
        <v-col align="right" class="pt-8">
          <font-awesome-icon class="text-brown mr-3" icon="trash-alt" size="2x"></font-awesome-icon>
          <font-awesome-icon class="text-brown" icon="check" size="2x"></font-awesome-icon>
        </v-col>
      </v-row>
    </v-col>
    <v-col>
      <v-row>
        <v-col>
          <h1>EBB Studio</h1>
          <p>Invited by Papa Nikomi</p>
        </v-col>
        <v-col align="right" class="pt-8">
          <font-awesome-icon class="text-brown mr-3" icon="trash-alt" size="2x"></font-awesome-icon>
          <font-awesome-icon class="text-brown" icon="check" size="2x"></font-awesome-icon>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
export default {

}
</script>

<style>

</style>