<template>
  <div class="container-700">
    <div align="center">
      <h1>Tell Us About You...</h1>
      <h4>The best relationships start with at least this much...</h4>
    </div>
    <div class="mt-5">
      <p class="text-brown mb-0">USERNAME</p>
      <v-form ref="form" v-model="valid" lazy-validation>
        <vs-input
          v-model="newUser.username"
          solo
          :rules="rules.username"
          hide-details="auto"
          class="pb-3"
        ></vs-input>
        <p class="text-brown mb-0">EMAIL ADDRESS</p>
        <vs-input
          v-model="newUser.email"
          solo
          :rules="rules.email"
          hide-details="auto"
          class="pb-3"
        ></vs-input>
        <p class="text-brown mb-0">NAME</p>

        <vs-input
          v-model="newUser.displayName"
          solo
          :rules="rules.username"
          hide-details="auto"
          class="pb-3"
        ></vs-input>
        <p class="text-brown mb-0">PASSWORD</p>
        <vs-input
          v-model="newUser.password"
          solo
          :rules="rules.password"
          :type="show ? 'text' : 'password'"
          name="input-10-1"
        ></vs-input>
        <p class="text-brown mb-0">CONFIRM PASSWORD</p>
        <vs-input
          v-model="newUser.confirmPassword"
          solo
          :rules="rules.confirmPassword.concat(passwordConfirmationRule)"
          :type="show ? 'text' : 'password'"
          name="input-10-1"
        ></vs-input>
        <vs-checkbox
          class="checkbox"
          v-model="newUser.checkbox"
          :rules="rules.termsOfService"
        >
          I accept the <a class="ml-1 text-brown">Terms of Service</a>
        </vs-checkbox>
        <vs-button
          :disabled="!valid"
          block
          @click="validate() ? addUser() : errorMessage()"
          :color="color"
          class="step-button"
          >NEXT</vs-button
        >
      </v-form>
      <p align="right">
        Already have an account?&nbsp;<nuxt-link to="/login" class="text-brown"
          >Login</nuxt-link
        >
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      color: '#593d3b',
      valid: true,
      error: null,
      show: false,
      newUser: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        displayName: '',
        checkbox: false
      },
      rules: {
        username: [value => !!value || 'Required.'],
        email: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
        ],
        password: [v => !!v || 'Password is required'],
        confirmPassword: [v => !!v || 'Password is required'],
        termsOfService: [v => !!v || 'You must agree to continue!']
      }
    };
  },
  computed: {
    passwordConfirmationRule() {
      return () =>
        this.newUser.password === this.newUser.confirmPassword ||
        'Password must match';
    }
  },
  methods: {
    validate() {
      if (!this.$refs.form.validate()) {
        return false;
      }
      return true;
    },
    addUser() {
      this.$emit('thisUser', this.newUser);
    },
    errorMessage() {
      console.log('Please fill the required form');
    }
  }
};
</script>

<style></style>
