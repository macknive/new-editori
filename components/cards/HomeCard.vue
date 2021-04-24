<template>
  <article class="card-root" tabindex="0">
    <h3 class="card-title">{{title}}</h3>
    <h4 class="card-subtitle">{{subtitle}}</h4>
    <div class="card-content">
      <slot></slot>
    </div>
  </article>
</template>

<script>
export default {
  props: [ 'title', 'subtitle' ]
}
</script>

<style scoped>
  .card-root {
    background: #fff;
    border: 1px solid #8a7968;
    padding: 50px 100px;
    font-family: var(--body-font);
    font-weight: 400;
    font-size: 16px;
    line-height: 200%;
  }
  .card-title {
    display: inline-block;
    font-family: var(--display-font);
    font-weight: 400;
    font-size: 18px;
    text-transform: uppercase;
    padding-right: 60px;
    padding-bottom: 10px;
    border-bottom: 1px solid #8A7968;
    margin-bottom: 10px;
  }
  .card-subtitle {
    font-family: var(--body-font);
    font-weight: 700;
    font-size: 14px;
    text-transform: uppercase;
  }
  .card-content {
    margin-top: 30px;
  }
</style>