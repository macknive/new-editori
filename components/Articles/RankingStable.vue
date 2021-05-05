<template>
  <div>
    Ranking & Stable Component

    <highcharts :options="lineData"></highcharts>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lineArray: [5, 2, 3, 3]
    };
  },
  computed: {
    lineData() {
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
    }
  }
};
</script>

<style></style>
