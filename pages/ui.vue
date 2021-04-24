<template>
  <PageTemplate :shapes="shapes" :workspace="workspace" :hideWorkspace="hideNavbarWorkspace">
    <template v-slot:header>
      <h1 class="workspace-name">{{workspace.name}}</h1>
      <time class="date" :datetime="`${now.month}-${now.date}`">
        {{now.month}}.{{now.date}}
      </time>
      <div class="workspace-switcher label" role="button">
        <span>Switch workspace</span>
        <font-awesome-icon class="caret" icon="caret-down" />
      </div>
      <Glance title="This Week" :figures="figures" />
      <img src="~/assets/svgs/editor.svg" alt="" class="editor">
      <button class="editor-button">
        Chat with Editor
      </button>
      <span class="speech-bubble label">Got a minute?</span>
    </template>
    <template>
      <div>

      </div>
    </template>
  </PageTemplate>
</template>

<script>
import Glance from '~/components/Glance';
import PageTemplate from '~/components/layout/PageTemplate';

const currentTime = new Date();

function pad(value, totalDigits) {
  const valueString = value.toString();
  const existingDigits = valueString.length;
  let prefix = '';
  for (let i = 0; i < totalDigits - existingDigits; i++) {
    prefix += '0';
  }

  return prefix + valueString;
}

export default {
  components: { Glance, PageTemplate },
  data() {
    return {
      shapes: [
        { type: 'circle', x: -265, y: -198, size: 792, color: '#fffefd' },
        { type: 'circle', x: 847, y: 381, size: 715, color: '#8a7968' },
      ]
    }
  },
  layout: 'empty',
  computed: {
    figures() {
      return [
        { value: '40k', caption: 'Total traffic' },
        { value: '$700', caption: 'Total income' },
        { value: '$300', caption: 'Total spend' },
      ]
    },
    hideNavbarWorkspace() {
      return false;
    },
    now() {
      const month = pad(currentTime.getMonth() + 1, 2);
      const date = pad(currentTime.getDate(), 2);

      return {
        month,
        date
      }
    },
    workspace() {
      return {
        name: 'Drink Filtered',
        slug: 'drink-filtered',
      }
    }
  }
}
</script>

<style>
  .date {
    color: #f2f2f2;
    font-size: 144rem;
    font-weight: 900;
    font-family: var(--display-font);
    left: 138rem;
    top: 149rem;
    z-index: 1;
  }
  .workspace-name {
    font-size: 70rem;
    font-weight: 700;
    left: 100rem;
    top: 240rem;
    text-transform: uppercase;
    z-index: 2;
  }
  .workspace-switcher {
    left: 100rem;
    top: 360rem;
    text-transform: uppercase;
  }
  .editor {
    left: 795rem;
    top: 163rem;
    width: 590rem;
    height: 834rem;
  }
  .editor-button {
    left: 993rem;
    top: 760rem;
    font-size: 24rem;
    box-shadow: 0 0 10rem #0004;
  }
  .speech-bubble {
    color: #8A7968;
    width: 190rem;
    height: 128rem;
    transform: rotate(-3.37deg);
    left: 1069rem;
    top: 188rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
</style>
