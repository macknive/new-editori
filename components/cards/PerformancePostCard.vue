<template>
  <nuxt-link :to="postLink(workspace.slug, post.slug)">
    <v-card class="ma-4" height="200" width="300">
      <v-container>
        <v-row no-gutters>
          <v-col cols="1">
            <div :class="`status-${post.trend}`"></div>
          </v-col>
          <v-col>{{ post.trend }} in page views </v-col>
        </v-row>
        {{ post.slug }}
        <br /><br /><br />
        <span class="text-gray">
          <font-awesome-icon
            :icon="['fa', 'lightbulb']"
            size="1x"
            class="bulb"
          />
          This article does not show up on the first page for any keyword
        </span>
      </v-container>
    </v-card>
  </nuxt-link>
</template>

<script>
export default {
  props: ['post', 'workspace'],
  methods: {
    postLink(workspaceSlug, postSlug) {
      return `/${workspaceSlug}/performance/${postSlug}`;
    }
  }
};
</script>

<style>
a {
  color: #191919;
  text-decoration: none;
}

.bulb {
  color: lightgrey;
}
</style>
