<template>
  <div>
    <ul>
      <li>Readability: {{stats.readability.score}}% ({{stats.readability.grade}})</li>
      <li>Words: {{stats.structure.wordCount}}</li>
      <li>Sentences: {{stats.structure.sentenceCount}}</li>
      <li>Syllables: {{stats.structure.syllableCount}}</li>
      <li>Reading Time: {{stats.readability.readingTime}}</li>
      <li>Headings: {{stats.structure.headings}}</li>
      <li>Links: {{stats.structure.links}}</li>
      <li>Images: {{stats.structure.images}} ({{stats.structure.imagesMissingAlt}} without alt text)</li>
    </ul>
  </div>
</template>

<script>
import readingTime from 'reading-time';
import DOMParser from 'universal-dom-parser';
import readability from 'text-readability';

const HTML_MIME_TYPE = 'text/html';
const DEFAULT_ORDINAL_SUFFIX = 'th';
const ORDINAL_SUFFIXES = [DEFAULT_ORDINAL_SUFFIX, 'st', 'nd', 'rd'];
const MAX_SCORE = 100;
const MIN_SCORE = 0;
const MIN_WORD_COUNT_THRESHOLD = 30;
const domParser = new DOMParser();

const RuleInput = {
  TEXT: 'text',
  DOCUMENT: 'doc',
}

const RuleOutput = {
  SCORE: 'score',
  COUNT: 'count',
  TEXT: 'text',
}

export default {
  props: [
    'deliverable',
  ],
  methods: {
    formatGradeLevel(rawGradeLevel) {
      const nearestGradeLevel = Math.round(rawGradeLevel);
      if (nearestGradeLevel > 12) {
        return 'Readable by those with a college education';
      } else if (nearestGradeLevel < 1) {
        return 'Readable by everyone';
      }

      const ordinalSuffix = ORDINAL_SUFFIXES[nearestGradeLevel] || DEFAULT_ORDINAL_SUFFIX;
      const ordinalGrade = `${nearestGradeLevel}${ordinalSuffix}`;
      return `Readable by those with a ${ordinalGrade} grade education`;
    },
    score(rawScore, wordCount) {
      if (wordCount < MIN_WORD_COUNT_THRESHOLD) {
        return undefined;
      }

      return Math.min(MAX_SCORE, Math.max(MIN_SCORE, rawScore));
    }
  },
  computed: {
    stats() {
      const doc = domParser.parseFromString(this.deliverable.data.html, HTML_MIME_TYPE);
      const text = doc.body.textContent;

      const readingTimeStats = readingTime(this.deliverable.data.html);
      const wordCount = readingTimeStats.words;

      return {
        readability: {
          grade: this.formatGradeLevel(readability.fleschKincaidGrade(text)),
          score: this.score(readability.fleschReadingEase(text), wordCount),
          readingTime: readingTimeStats.text,
        },
        seo: {},
        structure: {
          headings: doc.querySelectorAll('h1,h2,h3,h4,h5,h6').length,
          links: doc.querySelectorAll('a[href]').length,
          images: doc.querySelectorAll('img').length,
          imagesMissingAlt: doc.querySelectorAll('img:not([alt])').length,
          sentenceCount: readability.sentenceCount(text),
          syllableCount: readability.syllableCount(text),
          wordCount: wordCount,
        }
      };
    }
  }
}
</script>

<style scoped>

</style>
