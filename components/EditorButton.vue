<template>
  <div class="editor-button-wrapper" role="button" tabindex="0">
    <div class="editor-button-animation"></div>
    <div class="editor-button-root" role="button">
      <span class="promo">Don't miss out</span>
      <span class="message">Meet with Editor</span>
      <span class="message-count"
          :aria-label="`${messages.length} messages waiting`">
        {{messages.length}}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: [ 'messages' ]
}
</script>

<style>
  .editor-button-wrapper {
    outline-offset: 45rem;
    --outer-ring-width: 360rem;
    --inner-ring-width: 330rem;
    --outer-ring-offset: calc((var(--outer-ring-width) - var(--inner-ring-width)) / 2);
  }

  @keyframes pulse {
    0% {
      transform: scale(0.9);
      box-shadow: 0 0 0 0 #8a7968b3;
    }
    
    70% {
      transform: scale(1);
      box-shadow: 0 0 0 calc(var(--outer-ring-offset) * 3) #8a796800;
    }
    
    100% {
      transform: scale(0.9);
      box-shadow: 0 0 0 0 #8a796800;
    }
  }

  .editor-button-animation {
    animation: pulse 2s infinite;
    background: #8a7968ff;
    box-shadow: 0 0 0 0 #8a7968ff;
    width: var(--outer-ring-width);
    height: var(--outer-ring-width);
    position: absolute;
    border-radius: 50%;
    left: calc(-1 * var(--outer-ring-offset));
    top: calc(-1 * var(--outer-ring-offset));
    z-index: 1;
  }

  .editor-button-root {
    background: #6f5e53;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: #fff;
    position: relative;
    width:  var(--inner-ring-width);
    height:  var(--inner-ring-width);
    z-index: 2;
  }
  .editor-button-root .promo {
    font-family: var(--display-font);
    font-size: 16rem;
    text-transform: uppercase;
    letter-spacing: 0.27em;
    padding: 0 20rem 12rem;
    border-bottom: 1px solid #fff;
    margin-bottom: 12rem;
    text-align: center;
  }
  .editor-button-root .message {
    font-family: var(--body-font);
    font-size: 32rem;
    letter-spacing: 0.015em;
    text-transform: uppercase;
    width: 85%;
    text-align: center;
  }
  .editor-button-root .message-count {
    left: 80%;
    top: 12%;
    width: 64rem;
    height: 64rem;
    background: var(--failing-red);
    color: #fff;
    font-family: var(--display-font);
    font-size: 26rem;
    font-weight: 700;
    letter-spacing: 0.015; 
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
  }
</style>