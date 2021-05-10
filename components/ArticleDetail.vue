<template>
  <div>
    ARTICLE DETAIL COMPONENT
    <v-btn-toggle v-model="toggle_exclusive" group mandatory class="mb-6">
      <v-btn @click="toggle = true">POST AT A GLANCE</v-btn>
      <v-btn @click="toggle = false">RANKING & STABLE</v-btn>
    </v-btn-toggle>
    <div v-if="toggle">
      <Glance class="glance" title="This Week" :figures="figures" />
    </div>
    <div v-if="!toggle">
      <vs-row>
        <vs-col> <RankingStable /></vs-col>
        <vs-col><NotedChanges /></vs-col>
      </vs-row>
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
