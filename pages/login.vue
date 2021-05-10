<template>
  <v-app>
    <vs-row>
      <vs-col class="pa-0">
        <div>
          <v-form ref="form" v-model="valid" lazy-validation>
            <div align="center">
              <img src="~/assets/editori-logo.png" alt="" class="editori" />
            </div>
            <h1 align="center" class="mt-12 mb-12">
              WELCOME TO EDITORI
            </h1>
            <vs-col class="px-10">
              <p class="mb-0 text-brown">EMAIL ADDRESS</p>
              <v-text-field
                class="email"
                v-model="email"
                solo
                :rules="rules.email"
                hide-details="auto"
              ></v-text-field>
            </vs-col>
            <vs-col class="px-10 pb-0">
              <p class="mb-0 text-brown">PASSWORD</p>
              <v-text-field
                class="password"
                v-model="password"
                solo
                :rules="rules.password"
                :type="show ? 'text' : 'password'"
                name="input-10-1"
              ></v-text-field>
            </vs-col>
            <vs-col align="right" class="pt-0 pb-10">
              <nuxt-link to="#" class="pr-10 text-brown forgot-password"
                >Forgot Password?</nuxt-link
              >
            </vs-col>
            <vs-col class="px-10">
              <v-btn
                :disabled="!valid"
                block
                @click="validate() ? login() : errorMessage()"
                color="brown darken-3 white--text"
                class="py-7 step-button login-button"
                >LOG IN</v-btn
              >
            </vs-col>
            <vs-col align="right" class="pt-0 pb-10">
              Don't have an account?
              <nuxt-link to="/register" class="pr-10 text-brown"
                >Sign Up</nuxt-link
              >
            </vs-col>
            <vs-col align="center">
              <p class="text-brown">CONTINUE WITH</p>
              <div class="d-flex justify-center">
                <div class="px-5">
                  <nuxt-link to="#"
                    ><div class="round-corners">
                      <font-awesome-icon
                        :icon="['fab', 'facebook']"
                        class="icon alt text-brown"
                        size="2x"
                      /></div
                  ></nuxt-link>
                </div>
                <div class="px-5">
                  <nuxt-link to="#"
                    ><div class="round-corners">
                      <font-awesome-icon
                        :icon="['fab', 'google']"
                        class="icon alt text-brown"
                        size="2x"
                      /></div
                  ></nuxt-link>
                </div>
                <div class="px-5">
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
            </vs-col>
          </v-form>
        </div>
      </vs-col>
    </vs-row>
  </v-app>
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

<style scoped>
.v-btn.v-size--default {
  font-size: unset;
}
</style>
