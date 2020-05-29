<template>
  <tr>
    <td>
      <nuxt-link :to="`./${deliverable.slug}`" class="title">
        {{ deliverable.title }}
      </nuxt-link>
    </td>
    <td class="last-modified">
      <timeago :auto-update="60" :datetime="deliverable.updated_at">
      </timeago>
    </td>
    <td v-if="status.complete" class="status">
      All done!
    </td>
    <td v-else class="status">
      {{ status.assignee.display_name }} needs to {{ status.step.label }}
      <span v-if="status.deadline" class="deadline">
        (due <timeago :auto-update="60" :datetime="status.deadline"></timeago>)
      </span>
    </td>
  </tr>
</template>

<script>
export default {
  props: ['deliverable'],
  computed: {
    status() {
      return this.deliverable.workflow_data.find(step => {
        return !step.completed;
      });
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
