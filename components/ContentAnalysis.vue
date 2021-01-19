<template>
  <dl>
    <dt>Readability:</dt>
    <dd>{{ stats.readability.score }}%</dd>
    <dt>Reading Level:</dt>
    <dd>{{ stats.readability.grade }}</dd>
    <dt>Reading Time:</dt>
    <dd>{{ stats.readability.readingTime }}</dd>
    <dt>Words:</dt>
    <dd>{{ stats.structure.wordCount }}</dd>
    <dt>Sentences:</dt>
    <dd>{{ stats.structure.sentenceCount }}</dd>
    <dt>Syllables:</dt>
    <dd>{{ stats.structure.syllableCount }}</dd>
    <dt>Headings:</dt>
    <dd>{{ stats.structure.headings }}</dd>
    <dt>Links:</dt>
    <dd>{{ stats.structure.links }}</dd>
    <dt>Images:</dt>
    <dd>
      {{ stats.structure.images }}
      <span v-if="stats.structure.imagesMissingAlt">
        ({{ stats.structure.imagesMissingAlt }} without alt text)
      </span>
    </dd>
  </dl>
</template>

<script>
import readingTime from 'reading-time'
import DOMParser from 'universal-dom-parser'
import readability from 'text-readability'

const HTML_MIME_TYPE = 'text/html'
const DEFAULT_ORDINAL_SUFFIX = 'th'
const ORDINAL_SUFFIXES = [DEFAULT_ORDINAL_SUFFIX, 'st', 'nd', 'rd']
const MAX_SCORE = 100
const MIN_SCORE = 0
const MIN_WORD_COUNT_THRESHOLD = 30
const domParser = new DOMParser()

const RuleInput = {
  TEXT: 'text',
  DOCUMENT: 'doc'
}

const RuleOutput = {
  SCORE: 'score',
  COUNT: 'count',
  TEXT: 'text'
}

export default {
  props: ['deliverable'],
  methods: {
    formatGradeLevel(rawGradeLevel) {
      const nearestGradeLevel = Math.round(rawGradeLevel)
      if (nearestGradeLevel > 12) {
        return 'College'
      } else if (nearestGradeLevel < 1) {
        return 'Everyone'
      }

      const ordinalSuffix =
        ORDINAL_SUFFIXES[nearestGradeLevel] || DEFAULT_ORDINAL_SUFFIX
      const ordinalGrade = `${nearestGradeLevel}${ordinalSuffix}`
      return `${ordinalGrade} grade`
    },
    score(rawScore, wordCount) {
      if (wordCount < MIN_WORD_COUNT_THRESHOLD) {
        return undefined
      }

      return Math.min(MAX_SCORE, Math.max(MIN_SCORE, rawScore))
    }
  },
  computed: {
    stats() {
      const doc = domParser.parseFromString(
        this.deliverable.data.html,
        HTML_MIME_TYPE
      )
      const text = doc.body.textContent

      const readingTimeStats = readingTime(this.deliverable.data.html)
      const wordCount = readingTimeStats.words

      return {
        readability: {
          grade: this.formatGradeLevel(readability.fleschKincaidGrade(text)),
          score: this.score(readability.fleschReadingEase(text), wordCount),
          readingTime: readingTimeStats.text
        },
        seo: {},
        structure: {
          headings: doc.querySelectorAll('h1,h2,h3,h4,h5,h6').length,
          links: doc.querySelectorAll('a[href]').length,
          images: doc.querySelectorAll('img').length,
          imagesMissingAlt: doc.querySelectorAll('img:not([alt])').length,
          sentenceCount: readability.sentenceCount(text),
          syllableCount: readability.syllableCount(text),
          wordCount: wordCount
        }
      }
    }
  }
}
</script>

<style scoped>
dd {
  display: inline-block;
  margin: 0 0 0.5em;
  padding: 0;
}
dt {
  font-weight: bold;
}
</style>
