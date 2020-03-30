
const state = {
  apiKeyLoading: false,
  profileCardsLoading: false,
  balanceCardsLoading: false,
  spendingLoading: false
}

const mutations = {
  'SET_API_KEY_LOADING'(state, isLoading) {
    state.apiKeyLoading = isLoading;
  },
  'SET_PROFILE_CARDS_LOADING'(state, isLoading) {
    state.profileCardsLoading = isLoading;
  },
  'SET_BALANCE_CARDS_LOADING'(state, isLoading) {
    state.balanceCardsLoading = isLoading;
  },
  'SET_SPENDING_LOADING'(state, isLoading) {
    state.spendingLoading = isLoading;
  }
}

const getters = {
  isApiKeyLoading(state) {
    return state.apiKeyLoading;
  },
  isProfileCardsLoading(state) {
    return state.profileCardsLoading;
  },
  isBalanceCardsLoading(state) {
    return state.balanceCardsLoading;
  },
  isSpendingLoading(state) {
    return state.spendingLoading;
  }
}

const actions = {
  setApiKeyLoading({commit}, isLoading) {
    commit('SET_API_KEY_LOADING', isLoading);
  },
  setProfileCardsLoading({commit}, isLoading) {
    commit('SET_PROFILE_CARDS_LOADING', isLoading);
  },
  setBalanceCardsLoading({commit}, isLoading) {
    commit('SET_BALANCE_CARDS_LOADING', isLoading);
  },
  setSpendingLoading({commit}, isLoading) {
    commit('SET_SPENDING_LOADING', isLoading);
  }
}

export default {
  state, mutations, getters, actions
}
