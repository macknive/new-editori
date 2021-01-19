<template>
  <main class="brief-root" :class="{ locked: !isViewerAssignee }">
    <client-only>
      <div class="content">
        <input
          type="text"
          placeholder="Primary keyword"
          v-model="keyword"
          :disabled="!isViewerAssignee"
          @input="onKeywordUpdate"
          @blur="onKeywordUpdate"
        />

        <medium-editor
          :text="brief"
          :options="options"
          custom-tag="article"
          v-on:edit="onBriefUpdate"
          class="editor"
        >
        </medium-editor>
        <div v-if="!isViewerAssignee" class="lock-label">
          <font-awesome-icon icon="lock"></font-awesome-icon>
          Locked for editing by {{ assignee.display_name }}
        </div>
      </div>
      <div class="placeholder content" disabled slot="placeholder">
        <input
          type="text"
          placeholder="Primary keyword"
          v-model="keyword"
          disabled="disabled"
        />
        <article v-html="brief"></article>
      </div>
    </client-only>
  </main>
</template>

<script>
export default {
  data() {
    const isViewerAssignee = this.viewer.id === this.assignee.id
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
        'removeFormat'
      ],
      updateOnEmptySelection: true
    }

    return {
      brief: this.deliverable.data.brief,
      keyword: this.deliverable.data.keyword,
      isViewerAssignee: isViewerAssignee,
      options: {
        anchor: {
          linkValidation: true
        },
        disableEditing: !isViewerAssignee,
        paste: {
          forcePlainText: false,
          cleanPastedHTML: false,
          cleanReplacements: [],
          cleanAttrs: ['class', 'style', 'dir'],
          cleanTags: ['meta'],
          unwrapTags: []
        },
        placeholder: {
          text: 'Enter your brief here'
        },
        toolbar: isViewerAssignee ? toolbarOptions : false
      }
    }
  },
  props: ['assignee', 'deliverable', 'viewer'],
  methods: {
    onBriefUpdate(e) {
      const newBrief = e.api.origElements.innerHTML
      this.deliverable.data.brief = newBrief
      this.$emit('autoSave')
    },
    onKeywordUpdate(e) {
      this.deliverable.data.keyword = this.keyword
      this.$emit('autoSave')
    }
  }
}
</script>

<style scoped>
.placeholder {
  -webkit-animation: loading-pulse cubic-bezier(0.45, 0, 0.55, 1) 1s infinite
    alternate;
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
  color: #000;
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
