<template>
  <div>
    <input type="text" placeholder="Username" v-model="username">
    <input type="password" placeholder="Password" v-model="password">
    <button @click="onLogin">Login</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    onLogin(e) {
      console.log('Logging in...');

      // TODO: Get base URL from nuxt.config.js
      this.$axios.post('/auth/local', {
        identifier: this.username,
        password: this.password,
      })
      .then(response => {
        // Handle success.
        this.$apolloHelpers.onLogin(response.data.jwt);
        console.log('Well done!');
        console.log('User profile', response.data.user);
        console.log('User token', response.data.jwt);
      })
      .catch(error => {
        // Handle error.
        console.log('An error occurred:', error);
      });
    }
  }
}
</script>

<style>

</style>
