<template>
  <div>
    <div v-if="visible">
      <vs-card class="border-card text-white">
        <div slot="header" class="center">
          <div v-if="visible">
            <span @click="toggleCard" class="material-icons-outlined"
              >close</span
            >
          </div>
          <h3 class="m-auto">Noted Changes</h3>
        </div>
        <h4 class="mb-12">ON PAGE SIGNAL</h4>
        <p class="mb-12">Article has significant updates to the content</p>
        <p class="mb-12">The following sections were changed</p>
        <p class="mb-12">• Water Is Essential To Your Body</p>
        <p class="mb-12">
          • The Hype Behind Drinking Loads Of Water In The Morning
        </p>
        <p class="mb-12">• The Myths and Claims With Drinking Water</p>
        <p class="mb-20">• Bottom Line</p>
        <br />
        <div class="center mt-20">
          <h3 class="changes">SEE CHANGES</h3>
          <br />
          <br />

          <span class="material-icons-outlined">
            keyboard_arrow_down
          </span>
        </div>
      </vs-card>
    </div>
    <div v-if="!visible">
      <div class="border-card-closed">
        <div @click="toggleCard" class="rotate text-white">
          <span class="material-icons-outlined">
            arrow_drop_up
          </span>
          Noted Changes
          <span class="material-icons-outlined">
            arrow_drop_up
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: true
    };
  },
  methods: {
    toggleCard() {
      this.visible = !this.visible;
    }
  }
};
</script>

<style>
.border-card {
  height: 500px;
  width: 350px;
  background-color: #6f5e53;
}

.border-card-closed {
  position: absolute;
  right: 0px;
  height: 50px;
  width: 200px;
}

.rotate {
  background-color: #6f5e53;
  transform: rotate(-90deg);
  position: absolute;
  right: 0px;
  padding: 5px;
}

.changes {
  border: 1px solid white;
  padding: 10px;
}
</style>
