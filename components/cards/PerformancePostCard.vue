<template>
  <v-card class="ma-4 rounded-lg elevation-6" height="200" width="300">
    <nuxt-link :to="postLink(workspace.slug, post.slug)">
      <v-container>
        <vs-row vs-type="flex">
          <vs-col vs-w="1">
            <div :class="`status-${post.trend}`"></div>
          </vs-col>
          <vs-col>{{ post.trend }} in page views </vs-col>
          <vs-col>
            <font-awesome-icon
              :icon="['fa', 'thumbtack']"
              size="1x"
              :class="pinned ? 'pinned' : 'unpinned'"
              @click="togglePin()"
            />
          </vs-col>
        </vs-row>
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
.post-card {
  box-shadow: 0 0 12px #0003;
  border-radius: 12px;
  width: 340px;
  height: 285px;
  padding: 20px;
}
</style>
