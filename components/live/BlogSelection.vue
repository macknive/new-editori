<template>
  <v-app>
    <v-container class="container-700">
      <div align="center">
        <h3>WHERE IS YOUR BLOG?</h3>
        <p class="f-16">
          Okay, so you ready to get your blog out to the world, where do you go
          to make that happen?
        </p>
      </div>
    </v-container>
    <v-container class="container-1000">
      <v-row align="center" class="blog-selection-row">
        <v-col>
          <a @click="wordPress()">
            <div class="svg-container">
              <img
                src="~/assets/svgs/wordpress.svg"
                alt="wordpress"
                class="svg-live"
              />
            </div>
          </a>
        </v-col>

        <v-col><h3 align="center">OR</h3></v-col>

        <v-col>
          <a @click="webFlow()">
            <div class="svg-container">
              <img
                src="~/assets/svgs/webflow.svg"
                alt="webflow"
                class="svg-live"
              />
            </div>
          </a>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  data() {
    return {
      blogChoice: undefined
    }
  },
  methods: {
    wordPress() {
      this.blogChoice = 'wordpress'
      this.$emit('chosenBlog', this.blogChoice)
    },
    webFlow() {
      this.blogChoice = 'webflow'
      this.$emit('chosenBlog', this.blogChoice)
    }
  }
}
</script>

<style></style>
