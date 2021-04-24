<template>
  <article class="card-root" tabindex="0">
    <h3>{{title}}</h3>
    <h4>{{subtitle}}</h4>
    <slot></slot>
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
    padding: 50rem 100rem;
    font-family: var(--body-font);
    font-weight: 400;
    font-size: 16rem;
  }
  .card-root h3 {
    font-family: var(--display-font);
    font-weight: 400;
    font-size: 18rem;
    text-transform: uppercase;
    padding-right: 60rem;
    padding-bottom: 10rem;
    border-bottom: 1px solid #8A7968;
    margin-bottom: 10rem;
  }
  .card-root h4 {
    font-family: var(--body-font);
    font-weight: 700;
    font-size: 14rem;
    text-transform: uppercase;
  }
</style>