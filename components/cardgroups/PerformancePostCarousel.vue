<template>
  <v-sheet class="mx-auto mt-12">
    <h4>{{ title }} ({{ posts.length }})</h4>
    <v-slide-group class="pa-4" active-class="success" show-arrows>
      <v-slide-item v-for="post in posts" :key="post.id">
        <PerformancePostCard :post="post" :workspace="workspace">
        </PerformancePostCard>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>

<script>
import PerformancePostCard from '~/components/cards/PerformancePostCard';

export default {
  props: ['posts', 'title', 'workspace'],
  components: {
    PerformancePostCard
  }
};
</script>

<style></style>
