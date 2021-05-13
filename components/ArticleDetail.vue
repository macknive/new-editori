<template>
  <div>
    ARTICLE DETAIL COMPONENT<br /><br />

    <vs-button :color="color" type="flat" @click="toggle = true"
      >POST AT A GLANCE</vs-button
    >
    <vs-button :color="color" type="flat" @click="toggle = false"
      >RANKING & STABLE</vs-button
    >
    <br /><br />
    <div v-if="toggle">
      <Glance class="glance" title="This Week" :figures="figures" />
    </div>
    <div v-if="!toggle">
      <div class="container-row">
        <div class="flex-grow"><RankingStable /></div>
        <div class="flex-grow"><NotedChanges /></div>
      </div>
    </div>
    <br /><br /><br /><br />
    <QueryDetails />
  </div>
</template>

<script>
import NotedChanges from '~/components/Articles/NotedChanges';
import Glance from '~/components/Glance';
import QueryDetails from '~/components/Articles/QueryDetails';
import RankingStable from '~/components/Articles/RankingStable';

export default {
  components: {
    NotedChanges,
    Glance,
    QueryDetails,
    RankingStable
  },
  data() {
    return {
      color: '#593d3b',
      toggle_exclusive: undefined,
      toggle: true
    };
  },
  computed: {
    figures() {
      return [
        { value: '40k', caption: 'Total traffic' },
        { value: '$700', caption: 'Total income' },
        { value: '$300', caption: 'Total spend' }
      ];
    }
  }
};
</script>

<style>
.v-btn.v-size--default {
  font-size: unset;
}
.v-application .caption {
  font-size: 12rem !important;
}
</style>
