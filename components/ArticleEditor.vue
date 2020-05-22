<template>
  <main class="article-root">
    <client-only>
      <div class="content">
        <h1 contenteditable>{{title}}</h1>
        <medium-editor
          :text="body"
          :options="options"
          custom-tag="article"
          v-on:edit="onBodyUpdate"
          class="editor">
        </medium-editor>
      </div>
      <div class="content" disabled slot="placeholder">
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
      options: {},
      title: this.deliverable.title,
    };
  },
  props: [
    'deliverable'
  ],
  methods: {
    onBodyUpdate(e) {
      const newBody = e.api.origElements.innerHTML;
      this.deliverable.data.html = newBody
      this.$emit('update:deliverable', this.deliverable);
    },
    onTitleUpdate(e) {
      const newTitle = 'foo';
      this.deliverable.title = newTitle;
      this.$emit('update:deliverable', this.deliverable);
    }
  }
}
</script>

<style scoped>
[disabled] {
  color: #ccc;
}
[contenteditable] {
  outline: none;
}
.article-root {
  font-family: 'Merriweather', 'Georgia', serif;
  text-rendering: optimizeLegibility;
  box-sizing: border-box;
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
