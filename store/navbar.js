export const state = {
  navbar: {
    shouldShowWorkspace: false
  }
};

export const getters = {
  shouldShowWorkspace(state) {
    return !!state.navbar.shouldShowWorkspace;
  }
};

export const mutations = {
  setShouldShowWorkspace(state, shouldShowWorkspace) {
    state.navbar.shouldShowWorkspace = shouldShowWorkspace;
  }
};
