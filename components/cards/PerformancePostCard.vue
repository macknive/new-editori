<template>
  <v-card class="ma-4" height="200" width="300">
    <div align="right">
      <font-awesome-icon
        :icon="['fa', 'thumbtack']"
        size="1x"
        :class="pinned ? 'pinned' : 'unpinned'"
        @click="togglePin()"
      />
    </div>
    <nuxt-link :to="postLink(workspace.slug, post.slug)">
      <v-container>
        <v-row no-gutters>
          <v-col cols="1">
            <div :class="`status-${post.trend}`"></div>
          </v-col>
          <v-col>{{ post.trend }} in page views </v-col>
        </v-row>
        {{ post.title }}<br /><br /><br />
        <font-awesome-icon
          :icon="['fa', 'lightbulb']"
          size="1x"
          class="color-grey"
        />
        <span class="color-grey"
          >This article does not show up on the first page for any keyword</span
        >
      </v-container>
    </nuxt-link>
  </v-card>
</template>

<script>
import UpdatePage from '~/queries/UpdatePage';
export default {
  props: ['post', 'workspace'],
  methods: {
    postLink(workspaceSlug, postSlug) {
      return `/${workspaceSlug}/performance/${postSlug}`;
    },
    togglePin() {
      const newState = this.pinned ? 'normal' : 'pinned';
      const mutationConfig = {
        mutation: UpdatePage,
        variables: {
          id: this.post.id,
          presentation: newState
        }
      };
      this.$apollo.mutate(mutationConfig);
    }
  },
  computed: {
    pinned() {
      return this.post.presentation === 'pinned';
    }
  }
};
</script>

<style>
a {
  color: #191919;
  text-decoration: none;
}

.color-grey {
  color: lightgrey;
}
.pinned,
.unpinned {
  color: black;
}

.unpinned {
  opacity: 0.25;
}
</style>
