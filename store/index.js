export const state = () => ({
  platformIntegration: false,
  alertStatus: false,
  chosenPlatform: undefined
})

export const getters = {
  isAuthenticated(state) {
   return state.auth.loggedIn;
  },
  loggedInUser(state) {
    return state.auth.user;
  },
}

export const mutations = {
  platformWebflow(state) {
    state.platformIntegration = true,
    state.alertStatus = true,
    state.chosenPlatform = 'Webflow'
  },
  platformWordPress(state) {
    state.platformIntegration = true,
    state.alertStatus = true,
    state.chosenPlatform = 'Wordpress'
  }
}
