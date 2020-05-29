<template>
  <main class="brief-root">
    <client-only>
      <div class="content">
        <medium-editor
          :text="brief"
          :options="options"
          custom-tag="article"
          v-on:edit="onBriefUpdate"
          class="editor">
        </medium-editor>
      </div>
      <div class="placeholder content" disabled slot="placeholder">
        <article v-html="brief"></article>
      </div>
    </client-only>
  </main>
</template>

<script>
export default {
  data() {
    return {
      brief: this.deliverable.data.brief,
      options: {
        anchor: {
          linkValidation: true,
        },
        paste: {
          forcePlainText: false,
          cleanPastedHTML: false,
          cleanReplacements: [],
          cleanAttrs: ['class', 'style', 'dir'],
          cleanTags: ['meta'],
          unwrapTags: []
        },
        placeholder: {
          text: 'Enter your brief here',
        },
        toolbar: {
          buttons: [
            'bold',
            'italic',
            'underline',
            'anchor',
            'h1',
            'h2',
            'h3',
            'orderedlist',
            'unorderedlist',
            'quote',
            'removeFormat',
          ],
          updateOnEmptySelection: true,
        },
      },
    };
  },
  props: [
    'deliverable'
  ],
  methods: {
    onBriefUpdate(e) {
      const newBrief = e.api.origElements.innerHTML;
      this.deliverable.data.brief = newBrief;
      this.$emit('autoSave');
    },
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
.brief-root {
  font-family: 'Merriweather', 'Georgia', serif;
  text-rendering: optimizeLegibility;
  box-sizing: border-box;
  line-height: 1.75;
}
.brief-root >>> h1,
.brief-root >>> h2,
.brief-root >>> h3,
.brief-root >>> h4,
.brief-root >>> h5,
.brief-root >>> h6,
.brief-root >>> p {
  line-height: 1.75;
  margin-bottom: 1.75rem;
}
.brief-root >>> h1 {
  text-align: center;
}
</style>
