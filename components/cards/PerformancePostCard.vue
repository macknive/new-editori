<template>
  <vs-card>
    <div class="container-row nowrap cards">
      <nuxt-link :to="postLink(workspace.slug, post.slug)" target="_blank">
        <div class="container-column">
          <div class="container-row">
            <div class="flex-grow">
              <div :class="`status-${post.trend}`"></div>
            </div>
            <div class="flex-grow">{{ post.trend }} in page views</div>
          </div>

          {{ post.title }}<br /><br /><br />
          <font-awesome-icon
            :icon="['fa', 'lightbulb']"
            size="1x"
            class="color-grey"
          />

          <span class="color-grey"
            >This article does not show up on the first page for any
            keyword</span
          >
        </div>
      </nuxt-link>

      <div class="flex-grow">
        <font-awesome-icon
          :icon="['fa', 'thumbtack']"
          size="1x"
          :class="pinned ? 'pinned' : 'unpinned'"
          @click="togglePin()"
        />
      </div>
    </div>
  </vs-card>
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
.vs-card--content {
  font-size: unset !important;
}

.cards {
  height: 200px;
  width: 300px;
}
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
