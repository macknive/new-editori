<template>
  <article>
    <header class="header">
      <Navbar class="nav" :workspace="workspace" :hideWorkspace="hideWorkspace" />
      <aside class="shapes">
        <svg v-for="(shape, index) in shapes" :key="index" class="shape"
            v-bind="shapeWrapperOptions(shape)">
          <component :is="shape.type" :fill="shape.color"
              v-bind="shapeOptions(shape)">
          </component>
        </svg>
      </aside>
      <div class="content">
        <slot name="header"></slot>
      </div>
    </header>
    <main class="main">
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </article>
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
    --aspect-ratio: calc(16 / 10);
    --base-width: 1400;
    --base-height: 900;
    --section-width: 100vw;
    --section-height: calc(100vw / var(--aspect-ratio));
    --width-unit: calc(var(--section-width) / var(--base-width));
    --height-unit: calc(var(--section-height) / var(--base-height));
    --display-font: 'Montserrat', sans-serif;
    --body-font: 'Noto Sans', 'Roboto', sans-serif;
    color: #191919;
    font-size: var(--height-unit);
    font-family: 'Noto Sans', 'Roboto', sans-serif;
  }
  .label, .main h2, button {
    font-family: var(--body-font);
    font-size: 18rem;
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
</style>

<style>
  /* TODO: Why don't scoped styles work? */
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
    min-height: 100vh;
    position: relative;
    z-index: 2;
  }
</style>