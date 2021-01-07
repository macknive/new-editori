<template>
<div>
<v-app>
  <v-row>
    <v-col class="pa-0 brown lighten-2">
    </v-col>
    <v-col class="pa-0">
      <div class="d-flex flex-column">
        <v-container>
          <h1 align="center" class="py-12 mt-12">LOGIN</h1>
          <v-col class="px-10">
          <p class="mb-0 text-brown">Email Address</p>
          <v-text-field
            v-model="email"
            solo
            :rules="rules"
            hide-details="auto"
            clearable
          ></v-text-field>
          </v-col>
          <v-col class="px-10 pb-0">  
          <p class="mb-0 text-brown">Password</p>
          <v-text-field
            v-model="password"
            solo
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="rules"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            @click:append="show1 = !show1"
          ></v-text-field>
          </v-col>
          <v-col align="right" class="pt-0 pb-10">
            <nuxt-link to="#" class="pr-10 text-brown">Forgot Password?</nuxt-link >
          </v-col>
          <v-col class="px-10">
            <v-btn block @click="login" color="brown darken-3 white--text py-7">LOG IN</v-btn>
          </v-col><br>
          <v-col align="right" class="pt-0 pb-10">
            Don't have an account?
            <nuxt-link to="/register" class="pr-10 text-brown">Sign Up</nuxt-link >
          </v-col><br><br>
          <v-col align="center">
            <p class="text-brown">CONTINUE WITH</p>
            <div class="d-flex justify-center">
            <div class="px-5"><nuxt-link to="#"><div class="rcorners"><font-awesome-icon :icon="['fab', 'facebook']" class="icon alt text-brown" size="2x"/></div></nuxt-link ></div>
            <div class="px-5"><nuxt-link to="#"><div class="rcorners"><font-awesome-icon :icon="['fab', 'google']" class="icon alt text-brown" size="2x"/></div></nuxt-link ></div>
            <div class="px-5"><nuxt-link to="#"><div class="rcorners"><font-awesome-icon :icon="['fab', 'apple']" class="icon alt text-brown" size="2x"/></div></nuxt-link ></div>
            </div>
          </v-col>
        </v-container>
      </div>
    </v-col>
  </v-row>
</v-app>
</div>
</template>

<script>
export default {
  middleware: "guest",
  data() {
    return {
    email: "",
    password: "",
    error: null,
    show1: false,
    rules: [
      value => !!value || 'Required.',
      //value => (value && value.length >= 6) || 'Min 6 characters',
    ],
    };
  },
  methods: {
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
      }
    },
  },
};
</script>

<style>
.rcorners {	
  border-radius: 50%;	
  border: 1px solid #593d3b;	
  padding: 22px; 	
  height: 80px;	
  width: 80px;  	
}

.text-brown {
  color: #593d3b !important;
}

</style>



