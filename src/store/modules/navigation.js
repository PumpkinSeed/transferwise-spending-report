const state = {
  navDrawerOpen: false,
  apiKeyModalOpen: false
}

const mutations = {
  'SET_NAV_DRAWER_OPEN'(state, setOpen) {
    state.navDrawerOpen = setOpen;
  },
  'SET_API_KEY_MODAL_OPEN'(state, setOpen) {
    state.apiKeyModalOpen = setOpen;
  }
}

const getters = {
  isNavDrawerOpen(state) {
    return state.navDrawerOpen;
  },
  isApiKeyModalOpen(state) {
    return state.apiKeyModalOpen;
  }
}

const actions = {
  setNavDrawerOpen({commit}, setOpen) {
    commit('SET_NAV_DRAWER_OPEN', setOpen);
  },
  setApiKeyModalOpen({commit}, setOpen) {
    commit('SET_API_KEY_MODAL_OPEN', setOpen);
  }
}

export default {
  state, mutations, getters, actions
}
