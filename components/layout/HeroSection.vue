<template>
  <portal to="hero-section">
    <aside class="shapes">
      <svg v-for="(shape, index) in shapes" :key="index" class="shape"
          v-bind="shapeWrapperOptions(shape)">
        <component :is="shape.type" :fill="shape.color" :class="shape.class"
            v-bind="shapeOptions(shape)">
        </component>
      </svg>
    </aside>
    <div class="content">
      <slot></slot>
    </div>
  </portal>
</template>

<script>
export default {
  props: [ 'shapes' ],
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
</style>