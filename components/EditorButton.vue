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
  @keyframes pulse {
    0% {
      transform: scale(0.92);
      box-shadow: 0 0 0 0 #8a7968b3;
    }
    
    70% {
      transform: scale(1);
      box-shadow: 0 0 0 30rem #8a796800;
    }
    
    100% {
      transform: scale(0.92);
      box-shadow: 0 0 0 0 #8a796800;
    }
  }

  .editor-button-wrapper {
    outline-offset: 45rem;
  }

  .editor-button-animation {
    animation: pulse 2s infinite;
    background: #8a7968ff;
    box-shadow: 0 0 0 0 #8a7968ff;
    width: 380rem;
    height: 380rem;
    position: absolute;
    border-radius: 50%;
    left: -15rem;
    top: -15rem;
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
    width: 350rem;
    height: 350rem;
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
    width: 300rem;
    text-align: center;
  }
  .editor-button-root .message-count {
    left: 280rem;
    top: 40rem;
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