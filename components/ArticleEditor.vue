<template>
  <main class="article-root" :class="{ locked: !isViewerAssignee }">
    <client-only>
      <div class="content">
        <medium-editor
          :text="title"
          :options="titleOptions"
          custom-tag="h1"
          v-on:edit="onTitleUpdate"
          @blur="onTitleBlur"
          class="editor">
        </medium-editor>
        <medium-editor
          :text="body"
          :options="bodyOptions"
          custom-tag="article"
          v-on:edit="onBodyUpdate"
          class="editor">
        </medium-editor>
        <div v-if="!isViewerAssignee" class="lock-label">
          <font-awesome-icon icon="lock"></font-awesome-icon>
          Locked for editing by {{assignee.display_name}}
        </div>
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
    const isViewerAssignee = this.viewer.id === this.assignee.id;
    const toolbarOptions = {
      buttons: [
        'bold',
        'italic',
        'underline',
        'anchor',
        'h2',
        'h3',
        'h4',
        'orderedlist',
        'unorderedlist',
        'quote',
        'removeFormat',
      ],
      updateOnEmptySelection: true,
    };

    return {
      body: this.deliverable.data.html,
      bodyOptions: {
        anchor: {
          linkValidation: true,
        },
        disableDoubleReturn: true,
        disableEditing: !isViewerAssignee,
        disableExtraSpaces: true,
        paste: {
          forcePlainText: false,
          cleanPastedHTML: false,
          cleanReplacements: [],
          cleanAttrs: ['class', 'style', 'dir'],
          cleanTags: ['meta'],
          unwrapTags: []
        },
        toolbar: isViewerAssignee ? toolbarOptions : false,
      },
      isViewerAssignee: isViewerAssignee,
      title: this.deliverable.title,
      titleOptions: {
        disableReturn: true,
        disableEditing: !isViewerAssignee,
        disableExtraSpaces: true,
        toolbar: false,
      }
    };
  },
  props: [
    'assignee',
    'deliverable',
    'viewer',
  ],
  methods: {
    onBodyUpdate(e) {
      const newBody = e.api.origElements.innerHTML;
      this.deliverable.data.html = newBody;
      this.$emit('autoSave');
    },
    onTitleUpdate(e) {
      const newTitle = e.api.origElements.innerHTML;
      this.deliverable.title = newTitle;
      this.$emit('autoSave');
    },
    onTitleBlur() {
      this.title = this.sanitizeTitle(this.title);
      this.$emit('save');
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
  color: #000;
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
.locked {
  color: #777;
}
.lock-label {
  font-family: 'Open Sans', sans-serif;
  font-size: 80%;
  text-align: right;
  color: #aaa;
}
</style>
