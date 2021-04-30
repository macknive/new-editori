<template>
  <div>
    <v-card>
      Site Overview Component
      <v-container>
        <v-row>
          <v-col cols="4">
            <v-col><highcharts :options="pieData"></highcharts></v-col>
            <div>{{ decreasing.length }} POSTS WITH DECREASING TRAFFIC</div>
            <div>{{ increasing.length }} POSTS WITH INCREASING TRAFFIC</div>
            <div>{{ stable.length }} POSTS WITH STABLE TRAFFIC</div>
          </v-col>
          <v-col><highcharts :options="lineData"></highcharts></v-col>
        </v-row>
      </v-container>
    </v-card>

    <h4 class="my-6">POST YOU'RE WORKING ON ({{ posts.length }})</h4>
    <v-card>
      <v-app-bar color="brown">
        <v-row>
          <v-col><h4 style="color: white">Title</h4></v-col>
          <v-col><h4 style="color: white">Assignee</h4></v-col>
          <v-col><h4 style="color: white">Status</h4></v-col>
        </v-row>
      </v-app-bar>

      <nuxt-link
        v-for="post in workspace.pages"
        :key="post.id"
        :to="postLink(workspace.slug, post.slug)"
      >
        <v-row>
          <v-col>
            <v-row no-gutters class="flex-column ml-4">
              <v-col>
                <v-row no-gutters>
                  <v-col cols="1">
                    <div :class="`status-${post.trend}`"></div>
                  </v-col>
                  <v-col>{{ post.trend }} in page views </v-col>
                </v-row>
              </v-col>
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
      </nuxt-link>
    </v-card>

    <PerformancePostCarousel
      :posts="pinned"
      :workspace="workspace"
      title="Pinned Posts"
    >
    </PerformancePostCarousel>

    <PerformancePostCarousel
      :posts="decreasing"
      :workspace="workspace"
      title="Posts that are Decreasing"
    >
    </PerformancePostCarousel>

    <PerformancePostCarousel
      :posts="increasing"
      :workspace="workspace"
      title="Posts that are Increasing"
    >
    </PerformancePostCarousel>

    <PerformancePostCarousel
      :posts="stable"
      :workspace="workspace"
      title="Posts that are Stable"
    >
    </PerformancePostCarousel>
  </div>
</template>

<script>
import PerformancePostCarousel from '~/components/cardgroups/PerformancePostCarousel';

// TODO: Determine if this can be directly compiled in, from editori-api.
const PostTrend = {
  DECREASING: 'decreasing',
  INCREASING: 'increasing',
  STABLE: 'stable',
  PINNED: 'pinned'
};

export default {
  props: ['workspace', 'posts'],
  components: {
    PerformancePostCarousel
  },
  data() {
    return {
      lineArray: [5, 2, 3, 3]
    };
  },
  methods: {
    postLink(workspaceSlug, postSlug) {
      return `/${workspaceSlug}/performance/${postSlug}`;
    }
  },
  computed: {
    pinned() {
      return this.posts.filter(
        value => value.presentation === PostTrend.PINNED
      );
    },
    decreasing() {
      return this.posts.filter(value => value.trend === PostTrend.DECREASING);
    },
    increasing() {
      return this.posts.filter(value => value.trend === PostTrend.INCREASING);
    },
    stable() {
      return this.posts.filter(value => value.trend === PostTrend.STABLE);
    },
    pieData() {
      return {
        credits: {
          enabled: false
        },
        title: {
          text: this.posts.length + ' POSTS',
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
                y: this.decreasing.length
              },
              {
                name: 'Increasing Traffic',
                y: this.increasing.length
              },
              {
                name: 'Stable Traffic',
                y: this.stable.length
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

<style scoped>
a {
  color: #191919;
  text-decoration: none;
}
</style>
