<template>
  <main class="article-root">
    <client-only>
      <div class="content">
        <h1 contenteditable ref="titleEl" @blur="onTitleUpdate">
          {{title}}
        </h1>
        <medium-editor
          :text="body"
          :options="options"
          custom-tag="article"
          v-on:edit="onBodyUpdate"
          class="editor">
        </medium-editor>
      </div>
      <div class="placeholder content" disabled slot="placeholder">
        <h1 contenteditable>{{title}}</h1>
        <article v-html="body"></article>
      </div>
    </client-only>
  </main>
</template>

<script>
export default {
  data() {
    return {
      body: this.deliverable.data.html,
      options: {
        paste: {
          forcePlainText: false,
          cleanPastedHTML: false,
          cleanReplacements: [],
          cleanAttrs: ['class', 'style', 'dir'],
          cleanTags: ['meta'],
          unwrapTags: []
       }
      },
      title: this.deliverable.title,
    };
  },
  props: [
    'deliverable'
  ],
  methods: {
    onBodyUpdate(e) {
      const newBody = e.api.origElements.innerHTML;
      this.deliverable.data.html = newBody;
      this.deliverable.title = this.title;
      this.$emit('autoSave');
    },
    onTitleUpdate(e) {
      const newTitle = this.sanitizeTitle(this.$refs.titleEl.textContent);
      this.$refs.titleEl.textContent = newTitle;

      if (this.title === newTitle) {
        // No-op.
        return;
      }

      this.title = newTitle;
      this.deliverable.title = newTitle;
      this.$emit('autoSave');
    },
    sanitizeTitle(title) {
      return title.trim().replace(/\s+/g,' ');
    }
  }
}
</script>

<style scoped>
.placeholder {
  -webkit-animation: loading-pulse cubic-bezier(0.45, 0, 0.55, 1) 1s infinite alternate;
  animation: loading-pulse cubic-bezier(0.45, 0, 0.55, 1) 1s infinite alternate;
  opacity: 0.3;
  filter: grayscale(1);
}
[contenteditable] {
  outline: none;
}
.article-root {
  font-family: 'Merriweather', 'Georgia', serif;
  text-rendering: optimizeLegibility;
  box-sizing: border-box;
  line-height: 1.75;
}
.article-root >>> h1,
.article-root >>> h2,
.article-root >>> h3,
.article-root >>> h4,
.article-root >>> h5,
.article-root >>> h6,
.article-root >>> p {
  line-height: 1.75;
  margin-bottom: 1.75rem;
}
.article-root >>> h1 {
  text-align: center;
}
</style>
