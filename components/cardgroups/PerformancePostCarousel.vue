<template>
  <div>
    <div>
      <h4 class="section-title">{{ title }} ({{ posts.length }})</h4>
      <flicking :options="{ gap: 10, moveType: 'freeScroll' }">
        <div v-for="post in posts" :key="post.id">
          <PerformancePostCard :post="post" :workspace="workspace">
          </PerformancePostCard>
        </div>
      </flicking>
    </div>
    <br />
  </div>
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
