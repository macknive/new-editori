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
            :rules="rules"
            hide-details="auto"
            clearable
          ></v-text-field><br>
          <p class="text-brown">Email Address</p>
          <v-text-field
            v-model="newUser.email"
            solo
            :rules="emailRules"
            hide-details="auto"
            clearable
          ></v-text-field><br>
          <p class="text-brown">Password</p>
          <v-text-field
            v-model="newUser.password"
            solo
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            @click:append="show1 = !show1"
          ></v-text-field><br>
          <p class="text-brown">Confirm Password</p>
          <v-text-field
            v-model="newUser.confirmPassword"
            solo
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="confirmPasswordRules.concat(passwordConfirmationRule)"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            @click:append="show1 = !show1"
          ></v-text-field>
          <v-checkbox
            v-model="newUser.checkbox"
            :rules="[v => !!v || 'You must agree to continue!']"
          >
          <template v-slot:label>I accept the<a class="ml-1 text-brown">Terms of Service</a></template>
          </v-checkbox>

          <v-btn 
            :disabled="!valid"
            block 
            @click="validate() ? addUser() : errorMessage()" 
            color="brown lighten-1 white--text py-7 step-button"
          >NEXT</v-btn>

        </v-form><br>
          <p align="right">Already have an account?&nbsp;<nuxt-link to="/login">Login</nuxt-link></p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      valid: true,
      newUser: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        checkbox: false,
      },
      rules: [
        value => !!value || 'Required.',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [v => !!v || "Password is required"],
      confirmPasswordRules: [v => !!v || "Password is required"],
      error: null,
      show1: false,
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