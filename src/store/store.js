import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import api from '../repositories/TransferwiseRepository';
import spending from './modules/spending';
import loading from './modules/loading';
import navigation from './modules/navigation';
import errors from './modules/errors';

Vue.use(Vuex);

const vuexSessionPersist = new VuexPersistence({
  storage: window.sessionStorage,
  reducer: (state) => ({
    navDrawerOpen: state.navDrawerOpen,
    profiles: state.profiles,
    selectedAccount: state.selectedAccount,
    selectedBalanceCurrency: state.selectedBalanceCurrency,
    spending: state.spending
  })
});

const vuexApiPersist = new VuexPersistence({
  storage: window.localStorage,
  reducer: (state) => ({apiKey: state.apiKey})
})

export default new Vuex.Store({
  plugins: [vuexSessionPersist.plugin, vuexApiPersist.plugin],
  modules: {
    spending: {
      namespaced: true,
      ...spending
    },
    loading: {
      namespaced: true,
      ...loading
    },
    navigation: {
      namespaced: true,
      ...navigation
    },
    errors: {
      namespaced: true,
      ...errors
    }
  },

  state: {
    apiKey: undefined,
    profiles: [],
    selectedAccount: undefined,
    selectedBalanceCurrency: undefined,
  },

  getters: {
    apiKey(state) {
      return state.apiKey;
    },
    profiles(state) {
      return state.profiles;
    },
    selectedAccount(state) {
      return state.selectedAccount;
    },
    accountBalances(state) {
      if (!state.selectedAccount) return undefined;
      return state.selectedAccount.balances; 
    },
    selectedBalanceCurrency(state) {
      return state.selectedBalanceCurrency;
    },
  },

  mutations: {
    'SET_API_KEY' (state, apiKey) {
      state.apiKey = apiKey;
    },
    'SET_PROFILES' (state, profiles) {
      state.profiles = profiles;
    },
    'SET_SELECTED_ACCOUNT' (state, account) {
      state.selectedAccount = account;
    },
    'SET_SELECTED_BALANCE_CURRENCY' (state, currecy) {
      state.selectedBalanceCurrency = currecy;
    },
  },

  actions: {

    init({getters, dispatch}) {
      if (getters.apiKey) {
        api.setAuthorization(getters.apiKey);
        if (this.state.profiles.length === 0) {
          dispatch('fetchProfiles');
        }
      }
      dispatch('spending/init');
    },

    clearState({commit, dispatch}) {
      commit('SET_API_KEY', undefined);
      commit('SET_PROFILES', []);
      commit('SET_SELECTED_ACCOUNT', []);
      commit('SET_SELECTED_BALANCE_CURRENCY', undefined);
      dispatch('spending/clearState');
    },

    setApiKey({commit, dispatch}, apiKey) {
      if (!apiKey || apiKey === '') {
        dispatch('clearState');
        dispatch('navigation/setApiKeyModalOpen', false);
      } else {
        dispatch('clearState');
        commit('SET_API_KEY', apiKey);
        api.setAuthorization(apiKey);
        dispatch('fetchProfiles');
      }
    },

    removeApiKey({dispatch}) {
      dispatch('clearState');
      api.removeAuthorization();
    },

    fetchProfiles({commit, dispatch}) {
      dispatch('loading/setProfileCardsLoading', true);
      api.getProfiles()
      .then(response => {
        console.log(response);
        commit('SET_PROFILES', transformProfiles(response));
        dispatch('navigation/setApiKeyModalOpen', false);
      })
      .catch(error => {
        if (error.response?.status === 401) {
          dispatch('errors/setApiKeyAuthorizationError', true);
        } else {
          dispatch('errors/setApiKeyConnectionError', true);
        }
      })
      .finally(() => dispatch('loading/setProfileCardsLoading', false));
    },

    selectProfile({dispatch}, profileId) {
      dispatch('fetchAccount', profileId);
      dispatch('clearSelectedBalance');
    },

    deselectProfile({commit, dispatch}) {
      commit('SET_SELECTED_ACCOUNT', undefined);
      dispatch('clearSelectedBalance');
    },

    fetchAccount({commit, dispatch}, profileId) {
      dispatch('loading/setBalanceCardsLoading', true);
      api.getAccounts(profileId)
      .then((response) => {
        commit('SET_SELECTED_ACCOUNT', transformAccounts(response));
      })
      .finally(() => dispatch('loading/setBalanceCardsLoading', false));
    },

    selectBalanceCurrency({commit, dispatch}, currency) {
      commit('SET_SELECTED_BALANCE_CURRENCY', currency);
      dispatch('spending/fetchTransactions');
    },

    clearSelectedBalance({commit}) {
      commit('SET_SELECTED_BALANCE_CURRENCY', undefined);
      this.dispatch('spending/clearTransactions');
    },

  }
});

const transformProfiles = (response) => {
  const profiles = [];
  response.data.forEach(element => {
    let profile = {
      id: element.id,
      type: element.type
    };
    profile.isBusiness = element.type == "business";

    if (profile.type === "personal") {
      profile.name = element.details.firstName
      profile.name += ' '
      profile.name += element.details.lastName
    } else if (profile.type === "business") {
      profile.name = element.details.name
    }
    profiles.push(profile);
  });
  return profiles;
};

const transformAccounts = (response) => {
  if (response.data.length < 1) return undefined;
  return response.data.map((account) => {
    return {
      id: account.id,
      profileId: account.profileId,
      balances: account.balances.map((balance) => {
        return {
          id: balance.id,
          currency: balance.currency,
          amount: balance.amount.value
        }
      })
    }
  })[0];
}
