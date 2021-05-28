<template>
  <div class="container-500 m-auto">
    <div class="center mb-20">
      <h1>Tell Us About You...</h1>
      <h4>The best relationships start with at least this much...</h4>
    </div>
    <form @submit.prevent="submit">
      <div
        class="form-group"
        :class="{ 'form-group--error': $v.newUser.username.$error }"
      >
        <label class="form__label">Username</label>
        <vs-input
          class="form__input mb-20"
          v-model.trim="$v.newUser.username.$model"
        />
      </div>

      <div class="error" v-if="!$v.newUser.username.minLength">
        Username must have at least
        {{ $v.newUser.username.$params.minLength.min }} letters.
      </div>

      <div
        class="form-group"
        :class="{ 'form-group--error': $v.newUser.email.$error }"
      >
        <label class="form__label">EMAIL ADDRESS</label>
        <vs-input
          type="email"
          class="form__input email mb-20"
          v-model.trim="$v.newUser.email.$model"
        />
      </div>

      <div class="error error-message" v-if="!$v.newUser.email.email">
        E-mail must be valid
      </div>

      <div
        class="form-group"
        :class="{ 'form-group--error': $v.newUser.displayName.$error }"
      >
        <label class="form__label">Name</label>
        <vs-input
          class="form__input mb-20"
          v-model.trim="$v.newUser.displayName.$model"
        />
      </div>

      <div>
        <div
          class="form-group"
          :class="{ 'form-group--error': $v.newUser.password.$error }"
        >
          <label class="form__label">Password</label>
          <vs-input
            type="password"
            class="form__input mb-20"
            v-model.trim="$v.newUser.password.$model"
          />
        </div>

        <div class="error" v-if="!$v.newUser.password.minLength">
          Password must have at least
          {{ $v.newUser.password.$params.minLength.min }} letters.
        </div>
        <div
          class="form-group"
          :class="{ 'form-group--error': $v.newUser.confirmPassword.$error }"
        >
          <label class="form__label">Repeat password</label>
          <vs-input
            type="password"
            class="form__input mb-20"
            v-model.trim="$v.newUser.confirmPassword.$model"
          />
        </div>
        <div class="error" v-if="!$v.newUser.confirmPassword.sameAsPassword">
          Passwords must be identical.
        </div>
      </div>
      <vs-button
        class="mt-20 step-button"
        type="submit"
        :disabled="submitStatus === 'PENDING'"
      >
        NEXT
      </vs-button>
      <p class="typo__p" v-if="submitStatus === 'OK'">
        Thanks for your submission!
      </p>
      <p class="typo__p" v-if="submitStatus === 'ERROR'">
        Please fill the form correctly.
      </p>
      <p class="typo__p" v-if="submitStatus === 'PENDING'">Sending...</p>
    </form>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators';
export default {
  data() {
    return {
      submitStatus: null,
      newUser: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        displayName: '',
        checkbox: false
      }
    };
  },
  validations: {
    newUser: {
      username: {
        required,
        minLength: minLength(4)
      },
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(4)
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs('password')
      },
      displayName: {
        required
      },
      checkbox: {
        required
      }
    }
  },

  methods: {
    submit() {
      console.log('submit!');
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR';
        console.log('error');
      } else {
        this.submitStatus = 'PENDING';
        setTimeout(() => {
          this.submitStatus = 'OK';
          this.$emit('thisUser', this.newUser);
          console.log('success');
        }, 500);
      }
    }
  }
};
</script>

<style></style>
