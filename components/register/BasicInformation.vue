<template>
  <div style="padding: 2rem 3rem; text-align: left;">
    <div class="field">
      <label class="label">Username</label>
      <div class="control">
        <input
          :class="['input', $v.form.username.$error ? 'is-danger' : '']"
          type="text"
          placeholder="Text input"
          v-model="form.username"
        />
      </div>
      <p v-if="$v.form.username.$error" class="help is-danger">
        This username is invalid
      </p>
    </div>
    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input
          :class="['input', $v.form.demoEmail.$error ? 'is-danger' : '']"
          type="text"
          placeholder="Email input"
          v-model="form.demoEmail"
        />
      </div>
      <p v-if="$v.form.demoEmail.$error" class="help is-danger">
        This email is invalid
      </p>
    </div>
    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input
          :class="['input', $v.form.password.$error ? 'is-danger' : '']"
          type="password"
          placeholder="Password input"
          v-model="form.password"
        />
      </div>
      <p v-if="$v.form.password.$error" class="help is-danger">
        This password is invalid
      </p>
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';

export default {
  props: ['clickedNext', 'currentStep'],
  mixins: [validationMixin],
  data() {
    return {
      form: {
        username: '',
        demoEmail: '',
        message: '',
        password: ''
      }
    };
  },
  validations: {
    form: {
      username: {
        required
      },
      password: {
        required
      },
      demoEmail: {
        required,
        email
      }
    }
  },
  watch: {
    $v: {
      handler: function(val) {
        if (!val.$invalid) {
          this.$emit('can-continue', { value: true });
        } else {
          this.$emit('can-continue', { value: false });
          setTimeout(() => {
            this.$emit('change-next', { nextBtnValue: false });
          }, 3000);
        }
      },
      deep: true
    },

    clickedNext(val) {
      console.log(val);
      if (val === true) {
        this.$v.form.$touch();
      }
    }
  },
  mounted() {
    if (!this.$v.$invalid) {
      this.$emit('can-continue', { value: true });
    } else {
      this.$emit('can-continue', { value: false });
    }
  }
};
</script>
