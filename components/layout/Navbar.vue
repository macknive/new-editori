<template>
  <nav class="root">
    <nuxt-link :to="`/${workspace.slug}`" class="home-link">
      <span class="logo">
        <h1 class="wordmark">Editori</h1>
      </span>
      <span class="workspace" v-if="!hideWorkspace">
        {{workspace.name}}
      </span>
    </nuxt-link>
    <ul class="menu">
      <li>
        <nuxt-link :to="`/${workspace.slug}/performance`">
          Performance
        </nuxt-link>
      </li>
      <li>
        <nuxt-link :to="`/${workspace.slug}/content`">
          Content Calendar
        </nuxt-link>
      </li>
      <li>
        <nuxt-link :to="`/${workspace.slug}/team`">
          Team
        </nuxt-link>
      </li>
    </ul>
    <div class="right">
      <div role="button" class="search" aria-label="Search">
        <font-awesome-icon class="search-icon" icon="search" size="2x">
        </font-awesome-icon>
      </div>
      <nuxt-link to="/account" class="avatar">
        {{userInitial}}
      </nuxt-link>
    </div>
  </nav>
</template>

<script>
export default {
  props: [ 'workspace', 'hideWorkspace' ],
  computed: {
    userInitial() {
      return 'MN';
    }
  }
}
</script>

<style scoped>
  .root {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 0 60rem;
  }
  a {
    color: #191919;
    text-decoration: none;
  }
  .home-link {
    display: inline;
  }
  .workspace::before {
    content: '›';
    margin: 0 16rem;
  }
  .workspace {
    font-family: ''
  }
  .wordmark, .workspace, .avatar {
    color: #191919;
    display: inline;
    font-family: 'Montserrat';
    font-size: 22rem;
  }
  .wordmark {
    letter-spacing: 0.27em;
    text-transform: uppercase;
  }
  .search, .avatar {
    align-items: center;
    display: flex;
    color: #191919;
    justify-content: center;
    border-radius: 50%;
    font-weight: 600;
    height: calc(48 * var(--height-unit));
    width: calc(48 * var(--height-unit));
  }
  .avatar {
    border: 2px solid #8A7968;
    font-size: 18rem;
  }
  .menu {
    display: flex;
    flex-direction: row;
    gap: 60rem;
    list-style-type: none;
  }
  .menu li {
    color: #191919;
    font-family: 'Noto Sans', 'Roboto', sans-serif;
    font-size: 14rem;
    font-weight: 700;
    letter-spacing: 0.27em;
    text-transform: uppercase;
  }
  .right {
    display: flex;
    flex-direction: row;
    gap: 20rem;
  }
  .search-icon {
    width: 18rem;
    height: 18rem;
  }
</style>
