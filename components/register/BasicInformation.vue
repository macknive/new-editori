<template>
  <v-container>
    <v-row class="d-flex flex-column">
      <v-col align="center">
        <h1>Tell Us About You...</h1>
        <p>The best relationships start with at least this much...</p>
      </v-col>
      <v-col>
        <p class="text-brown">Your Name</p>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            v-model="newUser.name"
            solo
            :rules="rules.name"
            hide-details="auto"
          ></v-text-field><br>
          <p class="text-brown">Email Address</p>
          <v-text-field
            v-model="newUser.email"
            solo
            :rules="rules.email"
            hide-details="auto"
          ></v-text-field><br>
          <p class="text-brown">Password</p>
          <v-text-field
            v-model="newUser.password"
            solo
            :rules="rules.password"
            :type="show ? 'text' : 'password'"
            name="input-10-1"
          ></v-text-field>
          <p class="text-brown">Confirm Password</p>
          <v-text-field
            v-model="newUser.confirmPassword"
            solo
            :rules="rules.confirmPassword.concat(passwordConfirmationRule)"
            :type="show ? 'text' : 'password'"
            name="input-10-1"
          ></v-text-field>
          <v-checkbox
            v-model="newUser.checkbox"
            :rules="rules.termsOfService"
          >
          <template v-slot:label>I accept the<a class="ml-1 text-brown">Terms of Service</a></template>
          </v-checkbox><br>

          <v-btn 
            :disabled="!valid"
            block 
            @click="validate() ? addUser() : errorMessage()" 
            color="brown darken-3 white--text py-7 step-button"
          >NEXT</v-btn>

        </v-form><br>
          <p align="right">Already have an account?&nbsp;<nuxt-link to="/login" class="text-brown">Login</nuxt-link></p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      valid: true,
      error: null,
      show: false,
      newUser: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        checkbox: false,
      },
      rules: {
        name: [ value => !!value || 'Required.',],
        email: [ v => !!v || 'E-mail is required', v => /.+@.+\..+/.test(v) || 'E-mail must be valid',],
        password: [v => !!v || "Password is required"],
        confirmPassword: [v => !!v || "Password is required"],
        termsOfService: [v => !!v || 'You must agree to continue!']
      },
    }
  },
  computed: {
    passwordConfirmationRule() {
      return () =>
        this.newUser.password === this.newUser.confirmPassword || "Password must match";
    }
  },
  methods: {
    validate() {
      if(!this.$refs.form.validate()) {
        return false
      }
      return true
    },
    addUser() {
      this.$emit('thisUser', this.newUser)
    },
    errorMessage() {
      console.log("Please fill the required form")
    }
  }
}
</script>

<style>

</style>
