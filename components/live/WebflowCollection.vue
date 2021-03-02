<template>
  <v-app>
    <v-container class="container-700">
      <div align="center">
        <h3 class="pb-8">
          WHICH...
        </h3>
        <p class="f-16 py-8">
          Okay, you granted permission but let's confirm which workspace we are
          focusing on
        </p>
        <v-row align="center">
          <v-col
            align="center"
            cols="3"
            v-for="collection in collections"
            :key="collection.id"
            class="site-border ma-4"
          >
            <v-checkbox
              v-model="selectedCollection"
              :label="collection"
              :value="collection"
              class="checkbox-site"
            >
            </v-checkbox>
          </v-col>
        </v-row>
      </div>
      <v-container class="container-300 pt-8">
        <v-btn
          @click="proceed()"
          type="submit"
          block
          class="py-7"
          color="brown darken-3 white--text"
          >NEXT</v-btn
        >
      </v-container>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      collections: [
        'Blog Posts',
        'Authors',
        'Categories',
        'Tags',
        'Team Members'
      ],
      stepNumber: 'done',
      selectedCollection: ''
    }
  },
  methods: {
    proceed() {
      this.$emit('nextStep', this.stepNumber)
    }
  }
}
</script>

<style></style>
