const state = {
  apiKeyAuthorizationError: false,
  apiKeyConnectionError: false,
}

const mutations = {
  'SET_API_KEY_AUTHORIZATION_ERROR'(state, isError) {
    state.apiKeyAuthorizationError = isError;
  },
  'SET_API_KEY_CONNECTION_ERROR'(state, isError) {
    state.apiKeyConnectionError = isError;
  }
}

const getters = {
  isApiKeyAuthorizationError(state) {
    return state.apiKeyAuthorizationError;
  },
  isApiKeyConnectionError(state) {
    return state.apiKeyConnectionError;
  }
}

const actions = {
  setApiKeyAuthorizationError({commit}, isError) {
    commit('SET_API_KEY_AUTHORIZATION_ERROR', isError);
  },
  setApiKeyConnectionError({commit}, isError) {
    commit('SET_API_KEY_CONNECTION_ERROR', isError);
  },
  clearApiErrors({dispatch}) {
    dispatch('setApiKeyAuthorizationError', false);
    dispatch('setApiKeyConnectionError', false);
  }
}

export default {
  state, mutations, getters, actions 
}
