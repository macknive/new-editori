<template>
  <v-container>
    <v-row class="d-flex flex-column">
      <v-col align="center">
        <h1>Tell Us About You...</h1>
        <p>The best relationships start with at least this much...</p>
      </v-col>
      <v-col>
        <p class="text-brown">Your Name</p>
        <v-text-field
          v-model="name"
          solo
          :rules="rules"
          hide-details="auto"
          clearable
        ></v-text-field><br>
        <p class="text-brown">Email Address</p>
        <v-text-field
          v-model="email"
          solo
          :rules="rules"
          hide-details="auto"
          clearable
        ></v-text-field><br>
        <p class="text-brown">Password</p>
        <v-text-field
          v-model="password"
          solo
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="rules"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          @click:append="show1 = !show1"
        ></v-text-field><br>
        <p class="text-brown">Confirm Password</p>
        <v-text-field
          v-model="password"
          solo
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="rules"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          @click:append="show1 = !show1"
        ></v-text-field>
        <v-checkbox
          v-model="checkbox"
        >
        <template v-slot:label>I accept the<a class="ml-1 text-brown">Terms of Service</a></template>
        </v-checkbox>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
 data () {
    return {
      e6: 1,
      name: "",
      email: "",
      password: "",
      error: null,
      show1: false,
      checkbox: false,
      rules: [
        value => !!value || 'Required.',
        //value => (value && value.length >= 6) || 'Min 6 characters',
      ],
    }
  },
}
</script>

<style>

</style>