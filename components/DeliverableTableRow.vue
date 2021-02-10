<template>
  <nuxt-link :to="`${baseUrl}/${deliverable.slug}`" class="title">
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
          {{ deliverable.title }} <br />
          <span
            class="deliverable-description"
            v-if="nextStep.assignee && !isViewerAssignee"
          >
            {{ nextStep.assignee.display_name }} is on
            {{ nextStep.label }} step, agreed to deliver {{ deadLine }}.
          </span>
          <span
            class="deliverable-description"
            v-if="nextStep.assignee && isViewerAssignee"
            >You need to deliver {{ nextStep.assignee.display_name }} by
            {{ deadLine }}</span
          >
        </div>
      </v-col>
      <v-col
        md="2"
        v-if="nextStep"
        class="status my-auto btn-right"
        align="right"
      >
        <v-btn v-if="isViewerAssignee" color="brown-btn"
          >{{ nextStep.label }}
        </v-btn>
        <v-btn v-if="!isViewerAssignee" color="grey-btn">PEEK</v-btn>
      </v-col>
      <v-col v-else class="status">
        All done!
      </v-col>
    </v-row>
  </nuxt-link>
</template>

<script>
import { nextStepRequiringAction } from '~/utils/steps'
import GetViewerId from '~/queries/GetViewerId'
import moment from 'moment'

export default {
  data() {
    return {
      moment: moment,
      viewer: []
    }
  },
  props: ['baseUrl', 'deliverable', 'assignee'],
  computed: {
    nextStep() {
      return nextStepRequiringAction(this.deliverable)
    },
    updatedAtMonth() {
      return moment(this.deliverable.updated_at).format('MMM')
    },
    updatedAtDate() {
      return moment(this.deliverable.updated_at).format('DD')
    },
    deadLine() {
      return moment(this.nextStep.deadline).fromNow()
    },
    isViewerAssignee() {
      if (!this.nextStep.assignee) {
        console.log('workspace has no assignee')
        return false
      }
      if (this.viewer.id == this.nextStep.assignee.id) {
        console.log(this.nextStep.assignee.id)
        return true
      }
    }
  },
  apollo: {
    viewer: {
      prefetch: true,
      query: GetViewerId
    }
  }
}
</script>

<style></style>
