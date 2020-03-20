import Vue from 'vue';
import Vuex from 'vuex';
import api from '../repositories/TransferwiseRepository';
import spending from './modules/spending';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    spending: {
      namespaced: true,
      ...spending
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

    init({dispatch}) {
      const apiKey = localStorage.getItem('apiKey');
      if (apiKey) {
        dispatch('setApiKey', apiKey);
        dispatch('spending/init');
      }
    },

    clearState({commit, dispatch}) {
      commit('SET_API_KEY', undefined);
      commit('SET_PROFILES', []);
      commit('SET_SELECTED_ACCOUNT', []);
      commit('SET_SELECTED_BALANCE_CURRENCY', undefined);
      dispatch('spending/clearState');
    },

    setApiKey({commit, dispatch, getters}, apiKey) {
      if (!apiKey || apiKey === '') {
        dispatch('clearState');
        localStorage.removeItem('apiKey');
      } else if (apiKey !== getters.apiKey) {
        dispatch('clearState');
        commit('SET_API_KEY', apiKey);
        localStorage.setItem('apiKey', apiKey);
        api.setAuthorization(apiKey);
        dispatch('fetchProfiles');
      }
    },

    removeApiKey({dispatch}) {
      dispatch('clearState');
      localStorage.removeItem('apiKey');
      api.removeAuthorization();
    },

    fetchProfiles({commit}) {
      api.getProfiles()
      .then(response => {
        commit('SET_PROFILES', transformProfiles(response));
      })
      .catch(error => console.log(error))
    },

    selectProfile({dispatch}, profileId) {
      dispatch('fetchAccount', profileId);
      dispatch('clearSelectedBalance');
    },

    fetchAccount({commit}, profileId) {
      api.getAccounts(profileId)
      .then((response) => {
        commit('SET_SELECTED_ACCOUNT', transformAccounts(response));
      })
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
