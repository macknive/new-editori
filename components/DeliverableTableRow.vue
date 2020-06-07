<template>
  <tr>
    <td>
      <nuxt-link :to="`${baseUrl}/${deliverable.slug}`" class="title">
        {{ deliverable.title }}
      </nuxt-link>
    </td>
    <td class="last-modified">
      <timeago :auto-update="60" :datetime="deliverable.updated_at">
      </timeago>
    </td>
    <td v-if="nextStep" class="status">
      <span v-if="nextStep.assignee">
        {{ nextStep.assignee.display_name }}
      </span>
      needs to
      <span v-if="nextStep.label">
        {{ nextStep.label }}
      </span>
      <span v-if="nextStep.deadline" class="deadline">
        (due <timeago :auto-update="60" :datetime="nextStep.deadline"></timeago>)
      </span>
    </td>
    <td v-else class="status">
      All done!
    </td>
  </tr>
</template>

<script>
import {nextStepRequiringAction} from '~/utils/steps';

export default {
  props: [
    'baseUrl',
    'deliverable',
  ],
  computed: {
    nextStep() {
      return nextStepRequiringAction(this.deliverable);
    }
  }
}
</script>

<style scoped>
.title {
  font-size: 20px;
  font-family: 'Merriweather', 'Georgia', serif;
  font-weight: 600;
  color: #343330;
}
td {
  padding: 20px;
}
</style>
