<template>
  <flicking
    :options="{ gap: 10, moveType: 'freeScroll' }"
    :tag="'div'"
    :viewportTag="'div'"
    :cameraTag="'div'"
    @need-panel="
      e => {
        // ADD PANELS
      }
    "
    @move-end="
      e => {
        // HANDLE INDEX CHANGE
      }
    "
  >
    <div>CONTENTS OF PANEL 0</div>
    <div>CONTENTS OF PANEL 1</div>
    <div>CONTENTS OF PANEL 2</div>
  </flicking>
</template>
<script>
export default {};
</script>
