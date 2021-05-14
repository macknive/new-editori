<template>
  <div class="container-1200">
    <v-form ref="form" v-model="valid" lazy-validation>
      <div align="center">
        <img src="~/assets/editori-logo.png" alt="" class="editori" />
      </div>
      <br />
      <h1 align="center" class="mt-12 mb-12">
        WELCOME TO EDITORI
      </h1>
      <div>
        <br />
        <p class="mb-0 text-brown">EMAIL ADDRESS</p>
        <vs-input
          class="email"
          v-model="email"
          solo
          :rules="rules.email"
          hide-details="auto"
        ></vs-input>
      </div>
      <br />
      <div>
        <p class="mb-0 text-brown">PASSWORD</p>
        <vs-input
          class="password"
          v-model="password"
          solo
          :rules="rules.password"
          :type="show ? 'text' : 'password'"
          name="input-10-1"
        ></vs-input>
      </div>
      <br />
      <div align="right">
        <nuxt-link to="#" class="pr-10 text-brown forgot-password"
          >Forgot Password?</nuxt-link
        ><br /><br />
      </div>
      <div>
        <vs-button
          :color="color"
          :disabled="!valid"
          block
          @click="validate() ? login() : errorMessage()"
          class="step-button width-100"
          >LOG IN</vs-button
        >
      </div>
      <br />
      <div align="right">
        Don't have an account?
        <nuxt-link to="/register" class="pr-10 text-brown">Sign Up</nuxt-link>
      </div>
      <div align="center">
        <br />
        <p class="text-brown">CONTINUE WITH</p>
        <br />
        <div class="container-row">
          <div class="flex-grow">
            <nuxt-link to="#"
              ><div class="round-corners">
                <font-awesome-icon
                  :icon="['fab', 'facebook']"
                  class="icon alt text-brown"
                  size="2x"
                /></div
            ></nuxt-link>
          </div>
          <div class="flex-grow">
            <nuxt-link to="#"
              ><div class="round-corners">
                <font-awesome-icon
                  :icon="['fab', 'google']"
                  class="icon alt text-brown"
                  size="2x"
                /></div
            ></nuxt-link>
          </div>
          <div class="flex-grow">
            <nuxt-link to="#"
              ><div class="round-corners">
                <font-awesome-icon
                  :icon="['fab', 'apple']"
                  class="icon alt text-brown"
                  size="2x"
                /></div
            ></nuxt-link>
          </div>
        </div>
      </div>
    </v-form>
  </div>
</template>

<script>
export default {
  middleware: 'guest',
  created() {
    this.$store.commit('navbar/setShouldShowWorkspace', false);
  },
  data() {
    return {
      valid: true,
      color: '#593d3b',
      email: '',
      password: '',
      error: null,
      show: false,
      rules: {
        email: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
        ],
        password: [v => !!v || 'Password is required']
      }
    };
  },
  methods: {
    validate() {
      if (!this.$refs.form.validate()) {
        return false;
      }
      return true;
    },
    errorMessage() {
      console.log('Please fill the required form');
    },
    async login() {
      this.error = null;
      try {
        await this.$auth
          .loginWith('local', {
            data: {
              identifier: this.email,
              password: this.password
            }
          })
          .then(response => {
            this.$apolloHelpers.onLogin(response.data.jwt);
            console.log('Well done!');
            console.log('User profile', response.data.user);
            console.log('User token', response.data.jwt);
          });
        this.$router.push('/');
      } catch (e) {
        this.error = e.response.data.message[0].messages[0].message;
        alert('Wrong account input');
      }
    }
  }
};
</script>

<style>
.vs-con-input-label {
  width: 100%;
}

.vs-inputx {
  height: 40px;
}
</style>
