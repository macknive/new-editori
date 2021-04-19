<template>
  <v-card>
    Site Overview Component
    <v-container>
      <v-row>
        <v-col cols="4">
          <highcharts :options="chartOptions[0]"></highcharts>
          <div class="ml-12">
            <span class="text-gray"
              >{{ posts.decreasingTraffic }} POSTS WITH DECREASING TRAFFIC<br />
              {{ posts.increasingTraffic }} POSTS WITH INCREASING TRAFFIC<br />
              {{ posts.stableTraffic }} POSTS WITH STABLE TRAFFIC</span
            >
          </div>
        </v-col>
        <v-col><highcharts :options="chartOptions[1]"></highcharts></v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      posts: {
        increasingTraffic: '70',
        decreasingTraffic: '50',
        stableTraffic: '35'
      },
      chartOptions: [
        {
          credits: {
            enabled: false
          },
          title: {
            text: 'POSTS',
            align: 'center',
            verticalAlign: 'middle'
          },
          subtitle: {
            text: '',
            align: 'center',
            verticalAlign: 'middle'
          },
          plotOptions: {
            pie: {
              dataLabels: {
                enabled: false
              },
              borderWidth: 0
            }
          },
          series: [
            {
              type: 'pie',
              data: [1, 8, 2, 3],
              innerSize: '90%'
            }
          ]
        },
        {
          credits: {
            enabled: false
          },
          title: {
            text: ''
          },
          series: [
            {
              type: 'line',
              data: [4, 3, 5, 5, 7]
            }
          ]
        }
      ]
    };
  },
  computed: {
    postSum() {
      return (
        Number(this.posts.decreasingTraffic) +
        Number(this.posts.increasingTraffic) +
        Number(this.posts.stableTraffic)
      );
    }
  }
};
</script>

<style></style>
