<template>
  <div>
    <v-card>
      Site Overview Component
      <v-container>
        <v-row>
          <v-col cols="4">
            <v-col><highcharts :options="pieData"></highcharts></v-col>
            <div>{{ decreasing() }} POSTS WITH DECREASING TRAFFIC</div>
            <div>{{ increasing() }} POSTS WITH INCREASING TRAFFIC</div>
            <div>{{ stable() }} POSTS WITH STABLE TRAFFIC</div>
          </v-col>
          <v-col><highcharts :options="lineData"></highcharts></v-col>
        </v-row>
      </v-container>
    </v-card>

    <h4 class="my-6">POST YOU'RE WORKING ON ({{ posts.length }})</h4>
    <v-card>
      <v-app-bar color="brown">
        <v-row>
          <v-col><h4 class="text-white">Title</h4></v-col>
          <v-col><h4 class="text-white">Assignee</h4></v-col>
          <v-col><h4 class="text-white">Status</h4></v-col>
        </v-row>
      </v-app-bar>
      <v-row v-for="post in posts" :key="post.id">
        <v-col>
          <v-row no-gutters class="flex-column ml-4">
            <v-col
              ><v-row no-gutters>
                <v-col cols="1">
                  <div :class="`status-${post.trend}`"></div
                ></v-col>
                <v-col>{{ post.trend }} in page views </v-col>
              </v-row></v-col
            >
            <v-col> {{ post.title }}</v-col>
          </v-row>
        </v-col>
        <v-col>
          <div class="avatar-placeholder">
            <div align="center" class="mt-1">
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" v-on="on" icon><h2>KC</h2></v-btn>
                </template>
              </v-menu>
            </div>
          </div>
        </v-col>
        <v-col>{{ post.status }}</v-col>
      </v-row>
    </v-card>

    <v-sheet class="mx-auto mt-12">
      <h4>POST THAT ARE DECREASING ({{ decreasing() }})</h4>
      <v-slide-group class="pa-4" active-class="success" show-arrows>
        <v-slide-item v-for="post in posts" :key="post.id">
          <v-card
            v-if="post.trend == 'decreasing'"
            class="ma-4"
            height="200"
            width="300"
          >
            <v-container>
              <v-row no-gutters>
                <v-col cols="1">
                  <div :class="`status-${post.trend}`"></div
                ></v-col>
                <v-col>{{ post.trend }} in page views </v-col>
              </v-row>
              {{ post.title }}
              <br /><br /><br />
              <span class="text-gray"
                ><font-awesome-icon :icon="['fa', 'lightbulb']" size="1x" />
                This article does not show up on the first page for any
                keyword</span
              >
            </v-container>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>

    <v-sheet class="mx-auto mt-12">
      <h4>POST THAT ARE INCREASING ({{ increasing() }})</h4>
      <v-slide-group class="pa-4" active-class="success" show-arrows>
        <v-slide-item v-for="post in posts" :key="post.id">
          <v-card
            v-if="post.trend == 'increasing'"
            class="ma-4"
            height="200"
            width="300"
          >
            <v-container>
              <v-row no-gutters>
                <v-col cols="1">
                  <div :class="`status-${post.trend}`"></div
                ></v-col>
                <v-col>{{ post.trend }} in page views </v-col>
              </v-row>
              {{ post.title }}
            </v-container>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>

    <v-sheet class="mx-auto mt-12">
      <h4>POST THAT ARE STABLE ({{ stable() }})</h4>
      <v-slide-group class="pa-4" active-class="success" show-arrows>
        <v-slide-item v-for="post in posts" :key="post.id">
          <v-card
            v-if="post.trend == 'stable'"
            class="ma-4"
            height="200"
            width="300"
          >
            <v-container>
              <v-row no-gutters>
                <v-col cols="1">
                  <div :class="`status-${post.trend}`"></div
                ></v-col>
                <v-col>{{ post.trend }} in page views </v-col>
              </v-row>
              {{ post.title }}
            </v-container>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
  </div>
</template>

<script>
export default {
  props: ['posts'],
  data() {
    return {
      decreasingTraffic: undefined,
      increasingTraffic: undefined,
      stableTraffic: undefined,
      lineArray: [5, 2, 3, 3]
    };
  },
  methods: {
    decreasing() {
      this.decreasingTraffic = this.posts.filter(
        value => value.trend === 'decreasing'
      ).length;
      return this.decreasingTraffic;
    },
    increasing() {
      this.increasingTraffic = this.posts.filter(
        value => value.trend === 'increasing'
      ).length;
      return this.increasingTraffic;
    },
    stable() {
      this.stableTraffic = this.posts.filter(
        value => value.trend === 'stable'
      ).length;
      return this.stableTraffic;
    }
  },
  computed: {
    pieData() {
      return {
        credits: {
          enabled: false
        },
        title: {
          text: this.posts.length + ' POST',
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
            colors: ['#eb6258', '#a7d36f', '#777777'],
            dataLabels: {
              enabled: false,
              formatter: function() {
                var sliceIndex = this.point.index;
                var sliceName = this.series.chart.axes[0].categories[
                  sliceIndex
                ];
                return sliceName;
              }
            },
            borderWidth: 0
          }
        },
        series: [
          {
            type: 'pie',
            data: [
              {
                name: 'Decreasing Traffic',
                y: this.decreasingTraffic
              },
              {
                name: 'Increasing Traffic',
                y: this.increasingTraffic
              },
              {
                name: 'Stable Traffic',
                y: this.stableTraffic
              }
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
