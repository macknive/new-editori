<template>
  <v-app>
    <v-stepper v-model="step" vertical>
      <v-container class="register-container">
        <v-row>
          <v-col class="col-1 step-col">
            <div class="step1-bg"></div>
            <div class="step2-bg"></div>
            <div class="step3-bg"></div>
            <div class="step4-bg"></div>
            <div v-if="step == 1" class="step1">
              <v-stepper-step :complete="step > 1" step="Step 1">
              </v-stepper-step>
            </div>
            <div v-if="step == 2" class="step2">
              <v-stepper-step :complete="step > 2" step="Step 2">
              </v-stepper-step>
            </div>
            <div v-if="step == 3" class="step2">
              <v-stepper-step :complete="step > 3" step="Step 2">
              </v-stepper-step>
            </div>
            <div v-if="step == 4" class="step3">
              <v-stepper-step :complete="step > 4" step="Step 3">
              </v-stepper-step>
            </div>
            <div v-if="step == 5" class="step4">
              <v-stepper-step :complete="step > 5" step="Step 4">
              </v-stepper-step>
            </div>
          </v-col>
          <v-col class="pt-12">
            <v-stepper-content step="1" class="pt-0 step">
              <BlogSelection v-on:chosenBlog="wordPressOrWebFlow($event)" />
            </v-stepper-content>
            <v-stepper-content step="2" class="pt-0 step">
              <ConnectToWordpress />
            </v-stepper-content>
            <v-stepper-content step="3" class="pt-0 step">
              <ConnectToWebflow />
            </v-stepper-content>
            <v-stepper-content step="4" class="pt-0 step">
              4
            </v-stepper-content>
            <v-stepper-content step="5" class="pt-0 step">
              5
            </v-stepper-content>
          </v-col>
        </v-row>
      </v-container>
    </v-stepper>
  </v-app>
</template>

<script>
import BlogSelection from '~/components/live/BlogSelection'
import ConnectToWordpress from '~/components/live/ConnectToWordpress'
import ConnectToWebflow from '~/components/live/ConnectToWebflow'
export default {
  layout: 'empty',
  components: {
    BlogSelection,
    ConnectToWordpress,
    ConnectToWebflow
  },
  data() {
    return {
      step: 1,
      chosenBlogInfo: {}
    }
  },
  methods: {
    wordPressOrWebFlow(blogSelected) {
      this.chosenBlogInfo = blogSelected
      if (this.chosenBlogInfo == 'wordpress') {
        this.step = 2
      }
      if (this.chosenBlogInfo == 'webflow') {
        this.step = 3
      }
    }
  }
}
</script>

<style></style>
