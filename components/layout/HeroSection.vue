<template>
  <portal to="hero-section">
    <div class="hero-root">
      <aside class="shapes">
        <svg
          v-for="(shape, index) in shapes"
          :key="index"
          class="shape"
          v-bind="shapeWrapperOptions(shape)"
        >
          <component
            :is="shape.type"
            :fill="shape.color"
            :class="shape.class"
            v-bind="shapeOptions(shape)"
          ></component>
        </svg>
      </aside>
      <div class="__hero-section-content">
        <slot></slot>
      </div>
    </div>
  </portal>
</template>

<script>
export default {
  props: ['shapes'],
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
        `
      };
    }
  }
};
</script>

<style>
/* TODO: Determine why this selector fails if scoped to the component. */
.__hero-section-content > * {
  position: absolute;
}
</style>

<style scoped>
.__hero-section-content {
  position: relative;
  z-index: 2;
}
.shapes {
  pointer-events: none;
  position: relative;
  z-index: 1;
}
.shape {
  position: absolute;
}
</style>
