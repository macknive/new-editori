<template>
<div>
  <input type="text" placeholder="Username" v-model="username">
  <input type="password" placeholder="Password" v-model="password">
  <button @click="login">Login</button>
</div>
</template>

<script>
export default {
  middleware: "guest",
  data() {
    return {
    username: "",
    password: "",
    error: null,
    };
  },
  methods: {
    async login() {
      this.error = null;
      try {
        await this.$auth.loginWith("local", {
        data: {
          identifier: this.username,
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