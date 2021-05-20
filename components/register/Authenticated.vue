<template>
  <div class="container-700 m-auto">
    <h1 align="center" class="py-5">Already Authenticated</h1>
    <p align="center">
      You can go to <nuxt-link to="/">Dashboard</nuxt-link> or proceed to the
      next step
    </p>

    <div class="workspace-container">
      <div class="spacer"></div>
      <div class="btn-end mb-12">
        <vs-button
          @click="proceed()"
          type="submit"
          block
          :color="color"
          class="py-7 step-button"
          >NEXT</vs-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['color'],
  data() {
    return {
      stepNumber: ''
    };
  },
  methods: {
    proceed() {
      this.$emit('thisStep', this.stepNumber);
    }
  }
};
</script>

<style></style>
