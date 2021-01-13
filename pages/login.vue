<template>
  <v-app>
    <v-row>
      <v-col class="pa-0 brown lighten-2">
      </v-col>
      <v-col class="pa-0">
        <div class="d-flex flex-column">
          <v-container>
            <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            >
            <h1 align="center" class="py-12 mt-12 testclass">LOGIN</h1>
            <v-col class="px-10">
            <p class="mb-0 text-brown">EMAIL ADDRESS</p>
            <v-text-field
              v-model="email"
              solo
              :rules="rules.email"
              hide-details="auto"
              clearable
            ></v-text-field>
            </v-col>
            <v-col class="px-10 pb-0">  
            <p class="mb-0 text-brown">PASSWORD</p>
            <v-text-field
              v-model="password"
              solo
              :rules="rules.password"
              :type="show ? 'text' : 'password'"
              name="input-10-1"
            ></v-text-field>
            </v-col>
            <v-col align="right" class="pt-0 pb-10">
              <nuxt-link to="#" class="pr-10 text-brown">Forgot Password?</nuxt-link >
            </v-col>
            <v-col class="px-10">
              <v-btn 
                :disabled="!valid"
                block 
                @click="validate() ? login() : errorMessage()" 
                color="brown darken-3 white--text py-7 step-button"
              >LOG IN</v-btn>
            </v-col><br>
            <v-col align="right" class="pt-0 pb-10">
              Don't have an account?
              <nuxt-link to="/register" class="pr-10 text-brown">Sign Up</nuxt-link >
            </v-col><br>
            <v-col align="center">
              <p class="text-brown">CONTINUE WITH</p>
              <div class="d-flex justify-center">
              <div class="px-5"><nuxt-link to="#"><div class="rcorners"><font-awesome-icon :icon="['fab', 'facebook']" class="icon alt text-brown" size="2x"/></div></nuxt-link ></div>
              <div class="px-5"><nuxt-link to="#"><div class="rcorners"><font-awesome-icon :icon="['fab', 'google']" class="icon alt text-brown" size="2x"/></div></nuxt-link ></div>
              <div class="px-5"><nuxt-link to="#"><div class="rcorners"><font-awesome-icon :icon="['fab', 'apple']" class="icon alt text-brown" size="2x"/></div></nuxt-link ></div>
              </div>
            </v-col>
            </v-form>
          </v-container>
        </div>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
export default {
  middleware: "guest",
  data() {
    return {
      valid: true,
      email: "",
      password: "",
      error: null,
      show: false,
      rules: {
        email: [ v => !!v || 'E-mail is required', v => /.+@.+\..+/.test(v) || 'E-mail must be valid',],
        password: [v => !!v || "Password is required"],
      },
    };
  },
  methods: {
    validate() {
      if(!this.$refs.form.validate()) {
        return false
      }
      return true
    },
    errorMessage() {
      console.log("Please fill the required form")
    },
    async login() {
      this.error = null;
      try {
        await this.$auth.loginWith("local", {
        data: {
          identifier: this.email,
          password: this.password, 
        },
        })
        .then(response => { 
          this.$apolloHelpers.onLogin(response.data.jwt);
          console.log('Well done!');
          console.log('User profile', response.data.user);
          console.log('User token', response.data.jwt);
        })
      } catch (e) {
      this.error = e.response.data.message[0].messages[0].message;
      alert("Wrong account input")
      }
    },
  },
};
</script>

<style>

</style>
