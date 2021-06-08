<template>
  <div>
    <vs-button :color="color" type="flat" @click="toggleChart = true"
      >Views</vs-button
    >
    <vs-button type="flat" @click="toggleChart = false">Ranking</vs-button>
    <div v-if="toggleChart">
      <highcharts :options="viewData"></highcharts>
    </div>

    <div v-if="!toggleChart">
      <highcharts :options="rankData"></highcharts>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      toggleChart: true,
      lineArray: [5, 2, 3, 3],
      rankArray: [3, 5, 2, 4]
    };
  },
  computed: {
    viewData() {
      return {
        credits: {
          enabled: false
        },
        title: {
          text: ''
        },
        series: [
          {
            type: 'line',
            data: this.lineArray
          }
        ]
      };
    },
    rankData() {
      return {
        credits: {
          enabled: false
        },
        title: {
          text: ''
        },
        series: [
          {
            type: 'line',
            data: this.rankArray
          }
        ]
      };
    }
  }
};
</script>

<style></style>
