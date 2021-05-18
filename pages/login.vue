<template>
  <div class="container-1200">
    <div align="center">
      <img src="~/assets/editori-logo.png" alt="" class="editori" />
    </div>
    <br />
    <h1 align="center" class="mt-12 mb-12">
      WELCOME TO EDITORI
    </h1>
    <div class="form-group" :class="{ 'form-group--error': $v.email.$error }">
      <label class="form__label">EMAIL ADDRESS</label>
      <vs-input
        type="email"
        class="form__input email"
        v-model.trim="$v.email.$model"
      />
    </div>
    <div class="error" v-if="!$v.email.required">Email is required</div>
    <div class="error email v-messages" v-if="!$v.email.email">
      E-mail must be valid
    </div>

    <br />
    <div
      class="form-group"
      :class="{ 'form-group--error': $v.password.$error }"
    >
      <label class="form__label">PASSWORD</label>
      <vs-input
        type="password"
        class="form__input password"
        v-model.trim="$v.password.$model"
        placeholder="Disabled"
      />
    </div>
    <div class="error" v-if="!$v.password.required">password is required</div>

    <br />
    <div align="right">
      <nuxt-link to="#" class="pr-10 text-brown forgot-password"
        >Forgot Password?</nuxt-link
      ><br /><br />
    </div>
    <div>
      <vs-button
        :color="color"
        block
        @click="login()"
        class="step-button width-100 login-button"
        type="submit"
        :disabled="submitStatus === 'PENDING'"
        >LOG IN</vs-button
      >
      <p class="typo__p" v-if="submitStatus === 'OK'">
        Thanks for your submission!
      </p>
      <p class="typo__p" v-if="submitStatus === 'ERROR'">
        Please fill the form correctly.
      </p>
      <p class="typo__p" v-if="submitStatus === 'PENDING'">Sending...</p>
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
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
export default {
  middleware: 'guest',
  created() {
    this.$store.commit('navbar/setShouldShowWorkspace', false);
  },
  data() {
    return {
      color: '#593d3b',
      email: '',
      password: '',
      submitStatus: null
    };
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  },
  methods: {
    async login() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR';
      } else {
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
