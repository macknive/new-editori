<template>
  <div class="root">
    <header class="header">
      <Navbar class="nav" :workspace="workspace" :hideWorkspace="hideWorkspace" />
      <aside class="shapes">
        <svg v-for="(shape, index) in shapes" :key="index" class="shape"
            v-bind="shapeWrapperOptions(shape)">
          <component :is="shape.type" :fill="shape.color" :class="shape.class"
              v-bind="shapeOptions(shape)">
          </component>
        </svg>
      </aside>
      <div class="content">
        <slot name="header"></slot>
      </div>
    </header>
    <main class="main">
      <slot name="content"></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
import Navbar from '~/components/layout/Navbar';

export default {
  components: {
    Navbar,
  },
  props: [ 'hideWorkspace', 'shapes', 'workspace' ],
  methods: {
    shapeOptions(shape) {
      const options = {};

      switch (shape.type) {
        case 'circle':
          options.cx = '50%';
          options.cy = '50%';
          options.r = '50%';
          break;
      }

      return options;
    },
    shapeWrapperOptions(shape) {
      return {
        width: 100,
        height: 100,
        style: `
          left: ${shape.x}rem;
          top: ${shape.y}rem;
          width: ${shape.size}rem;
          height: ${shape.size}rem;
        `,
      };
    }
  }
}
</script>

<style>
  html {
    --aspect-ratio: calc(2 / 1);
    --base-width: 1400;
    --base-height: 720;
    --section-width: 80vw;
    --section-height: calc(var(--section-width) / var(--aspect-ratio));
    --width-unit: calc(var(--section-width) / var(--base-width));
    --height-unit: calc(var(--section-height) / var(--base-height));
    --display-font: 'Montserrat', sans-serif;
    --body-font: 'Noto Sans', 'Roboto', sans-serif;
    --failing-red: #af125a;
    --passing-green: #68b684;
    color: #191919;
    font-size: var(--height-unit);
    font-family: var(--body-font);
    letter-spacing: 0.015em;
  }
  body {
    background: #fff8f0;
  }
  .label, .main h2, button {
    font-family: var(--body-font);
    font-weight: 700;
    letter-spacing: 0.27em;
    text-transform: uppercase;
  }
  h1, .header h2 {
    font-family: var(--display-font);
    letter-spacing: 0.015em;
    text-transform: uppercase;
  }
  .header h2 {
    font-weight: 400;
  }
  button {
    background: #593d3b;
    border-radius: 5rem;
    color: #fff;
    padding: 16rem;
  }
  .card {
    background: #fff;
    border: 1px solid #8a7968;
    padding: 50rem 100rem;
  }
  .card h3 {
    font-family: var(--display-font);
    font-weight: 400;
    font-size: 18rem;
    text-transform: uppercase;
    padding-right: 60rem;
    padding-bottom: 10rem;
    border-bottom: 1px solid #8A7968;
    margin-bottom: 10rem;
  }
  .card h4 {
    font-family: var(--body-font);
    font-weight: 700;
    font-size: 14rem;
    text-transform: uppercase;
  }
  .card p {
    font-family: var(--body-font);
    font-weight: 400;
    font-size: 16rem;
  }
</style>

<style>
  /* TODO: Why don't scoped styles work? */
  .root {
    width: var(--section-width);
    margin: 0 auto;
  }
  .nav {
    position: absolute;
    top: 60rem;
    left: 0;
    right: 0;
    z-index: 999;
  }
  .header {
    background: #fff8f0;
    height: var(--section-height);
    width: var(--section-width);
    font-size: 16rem;
    position: relative;
    z-index: 1;
  }

  .header > .content {
    position: relative;
    z-index: 2;
  }

  .content > * {
    position: absolute;
  }

  .header > .shapes {
    pointer-events: none;
    position: relative;
    z-index: 1;
  }
  .header .shape {
    position: absolute;
  }
  .main {
    background: #fffefd;
    box-shadow: 0 0 50rem #0001;
    min-height: 100vh;
    padding: 80rem;
    position: relative;
    z-index: 2;
  }
</style>