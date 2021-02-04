<template>
  <v-row class="mb-6">
    <v-col class="my-auto date">
      <h4 class="pl-1">{{ updatedAtMonth }}</h4>
      <h3>{{ updatedAtDate }}</h3>
    </v-col>
    <v-col class="my-auto">
      <v-row no-gutters>
        <v-col class="status-placeholder" cols="1">
          <div class="status-green"></div>
        </v-col>
        <v-col>
          <h5>ON TRACK</h5>
        </v-col>
      </v-row>
      <div>
        <nuxt-link :to="`${baseUrl}/${deliverable.slug}`" class="title">
          {{ deliverable.title }} <br />
        </nuxt-link>
        <span v-if="nextStep.assignee"
          >{{ nextStep.assignee.display_name }} is writing an article, agreed to
          deliver by Friday.</span
        >
      </div>
    </v-col>
    <v-col
      md="2"
      v-if="nextStep"
      class="status my-auto btn-right"
      align="right"
    >
      <v-btn>{{ nextStep.label }}</v-btn>
    </v-col>
    <v-col v-else class="status">
      All done!
    </v-col>
  </v-row>
</template>

<script>
import { nextStepRequiringAction } from '~/utils/steps'
import moment from 'moment'

export default {
  return: {
    moment: moment
  },
  props: ['baseUrl', 'deliverable'],
  computed: {
    nextStep() {
      return nextStepRequiringAction(this.deliverable)
    },
    updatedAtMonth() {
      return moment(this.deliverable.updated_at).format('MMM')
    },
    updatedAtDate() {
      return moment(this.deliverable.updated_at).format('DD')
    }
  }
}
</script>

<style scoped>
.date {
  max-width: 60px;
}
.status-placeholder {
  max-width: 30px;
}
</style>
