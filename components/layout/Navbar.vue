<template>
  <nav class="nav-root">
    <div class="home-link">
      <nuxt-link :to="`/${workspaceSlug}`" class="logo">
        <h1 class="wordmark">Editori</h1>
      </nuxt-link>
      <div class="logo-separator" v-if="shouldShowWorkspace">›</div>
      <nuxt-link
        :to="`/${workspaceSlug}`"
        class="workspace"
        v-if="shouldShowWorkspace"
      >
        {{ workspace.name }}
      </nuxt-link>
    </div>
    <ul class="menu">
      <li>
        <nuxt-link
          :to="`/${workspaceSlug}/performance`"
          class="menu-link"
          v-if="workspaceSlug"
        >
          Performance
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          :to="`/${workspaceSlug}/content`"
          class="menu-link"
          v-if="workspaceSlug"
        >
          Content Calendar
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          :to="`/${workspaceSlug}/team`"
          class="menu-link"
          v-if="workspaceSlug"
        >
          Team
        </nuxt-link>
      </li>
    </ul>
    <div class="right">
      <div role="button" tabindex="0" class="search" aria-label="Search">
        <font-awesome-icon class="search-icon" icon="search" size="2x">
        </font-awesome-icon>
      </div>
      <nuxt-link to="/account" class="avatar" v-if="loggedInUser">
        {{ userInitial }}
      </nuxt-link>
    </div>
  </nav>
</template>

<script>
export default {
  props: ['loggedInUser', 'workspace', 'userInitial', 'shouldShowWorkspace'],
  computed: {
    workspaceSlug() {
      return this.workspace ? this.workspace.slug : '';
    }
  }
};
</script>

<style scoped>
.nav-root {
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 0 60rem;
}
a {
  color: #191919;
  text-decoration: none;
  height: 48rem;
}
.home-link {
  align-items: center;
  display: flex;
  height: 48rem;
  width: 450rem;
}
.home-link a {
  display: inline-flex;
  align-items: center;
}
.logo-separator {
  display: inline-flex;
  align-items: center;
  height: 48rem;
  border: 0;
  font-size: 24rem;
  margin: 0 16rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.workspace {
  font-family: var(--display-font);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.wordmark,
.workspace,
.avatar {
  color: #191919;
  display: inline-block;
  font-family: 'Montserrat';
  font-size: 22rem;
}
.wordmark {
  font-weight: 700;
  letter-spacing: 0.27em;
  text-transform: uppercase;
}
.search,
.avatar {
  align-items: center;
  display: flex;
  color: #191919;
  justify-content: center;
  border-radius: 50%;
  font-weight: 600;
  height: 48rem;
  width: 48rem;
}
.avatar {
  border: 1px solid #8a7968;
  font-size: 18rem;
}
.menu {
  display: flex;
  flex-direction: row;
  gap: 20rem;
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
.menu li a {
  display: block;
  padding: 0 20rem;
  height: 48rem;
  line-height: 48rem;
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
