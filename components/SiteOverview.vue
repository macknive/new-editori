<template>
  <v-card>
    Site Overview Component
    <v-container>
      <v-row>
        <v-col cols="4">
          <v-col><highcharts :options="pieData"></highcharts></v-col>
          <div class="ml-12">
            <span class="text-gray"
              >{{ posts.decreasingTraffic }} POSTS WITH DECREASING TRAFFIC<br />
              {{ posts.increasingTraffic }} POSTS WITH INCREASING TRAFFIC<br />
              {{ posts.stableTraffic }} POSTS WITH STABLE TRAFFIC</span
            >
          </div>
        </v-col>
        <v-col><highcharts :options="lineData"></highcharts></v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      lineArray: [5, 2, 3, 3],
      posts: {
        increasingTraffic: 70,
        decreasingTraffic: 50,
        stableTraffic: 35
      }
    };
  },
  computed: {
    postSum() {
      return (
        Number(this.posts.decreasingTraffic) +
        Number(this.posts.increasingTraffic) +
        Number(this.posts.stableTraffic)
      );
    },
    pieData() {
      return {
        title: {
          text: this.postSum + ' POST',
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
            data: [
              this.posts.increasingTraffic,
              this.posts.decreasingTraffic,
              this.posts.stableTraffic
            ],
            innerSize: '90%'
          }
        ]
      };
    },
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
