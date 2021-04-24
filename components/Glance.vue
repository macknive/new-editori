<template>
  <div class="glance">
    <h2>{{title}}</h2>
    <div class="figures">
      <figure class="figure" v-for="(figure, index) in figures" :key="index">
        {{figure.value}}
        <figcaption class="caption label">{{figure.caption}}</figcaption>
      </figure>
    </div>
  </div>
</template>

<script>
export default {
  props: [ 'title', 'figures' ]
}
</script>

<style>
.glance {
  left: 192rem;
  top: 614rem;
  border-left: 6rem solid #593D3B;
  padding-left: 24rem;
}
.glance h2 {
  margin-bottom: 24rem;
}
.glance .figures {
  display: flex;
  flex-direction: row;
}
.figure {
  font-family: var(--display-font);
  font-size: 36rem;
  margin-right: 40rem;
}
.caption {
  font-family: var(--body-font);
  font-size: 12rem;
  font-weight: 900;
  line-height: 1.5;
  margin-top: 40rem;
  max-width: 100rem;
}
</style>