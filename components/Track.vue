<template>
  <div>
    <div v-if="page.title" class="container-row">
      <div class="width-500 mb-20">
        {{ page.title }}
        <p>Written by: {{ writer }}</p>
      </div>
      <div class="m-auto">
        <vs-switch
          v-model="currentState"
          :value="page.trackingType"
          @click="updateTracking"
        />
      </div>
    </div>
  </div>
</template>

<script>
import UpdatePageTracking from '~/queries/UpdatePageTracking';
export default {
  props: ['page'],
  data() {
    return {
      //color: '#593d3b',
      writer: 'Meg',
      currentState: this.page.trackingType === 'TRACKING_ENABLED' ? true : false
    };
  },
  methods: {
    updateTracking() {
      const newTrackValue = this.currentState
        ? 'TRACKING_DISABLED'
        : 'TRACKING_ENABLED';
      const mutationConfig = {
        mutation: UpdatePageTracking,
        variables: {
          id: this.page.id,
          trackingType: newTrackValue
        }
      };
      this.$apollo.mutate(mutationConfig);
    }
  }
};
</script>

<style>
.vs-switch-active {
  background: #593d3b !important;
}

.vs-switch > .vs-circle-switch {
  background: #593d3b !important;
}

.vs-switch-active > .vs-circle-switch {
  background: white !important;
}
</style>
