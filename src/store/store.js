import Vue from 'vue';
import Vuex from 'vuex';
import transferwise from '../repositories/TransferwiseRepository';
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
    selectedProfileId: undefined,
    selectedAccount: undefined,
    accounts: [],
    selectedAccountId: undefined,
    selectedBalanceCurrency: undefined,
  },

  getters: {
    apiKey(state) {
      return state.apiKey;
    },
    profiles(state) {
      return state.profiles;
    },
    selectedProfileId(state) {
      return state.selectedProfileId;
    },
    account(state) {
      return state.selectedAccount;
    },
    accounts(state) {
      return state.accounts;
    },
    selectedAccountId(state) {
      return state.selectedAccountId;
    },
    accountBalances(state) {
      if (state.accounts.length > 0) {
        return state.accounts[0].balances;
      } else {
        return [];
      }
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
    'SET_SELECTED_PROFILE_ID' (state, profileId) {
      state.selectedProfileId = profileId;
    },
    'SET_SELECTED_ACCOUNT' (state, account) {
      state.selectedAccount = account;
    },
    'SET_ACCOUNTS' (state, accounts) {
      state.accounts = accounts;
    },
    'SET_SELECTED_ACCOUNT_ID' (state, accountId) {
      state.selectedAccountId = accountId;
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
      }
    },

    clearState({commit}) {
      commit('SET_API_KEY', undefined);
      commit('SET_PROFILES', []);
      commit('SET_SELECTED_PROFILE_ID', undefined);
      commit('SET_ACCOUNTS', []);
      commit('SET_SELECTED_ACCOUNT_ID', undefined);
    },

    setApiKey({commit, dispatch, getters}, apiKey) {
      if (!apiKey || apiKey === '') {
        dispatch('clearState');
        localStorage.removeItem('apiKey');
      } else if (apiKey !== getters.apiKey) {
        dispatch('clearState');
        commit('SET_API_KEY', apiKey);
        localStorage.setItem('apiKey', apiKey);
        transferwise.setAuthorization(apiKey);
        dispatch('fetchProfiles');
      }
    },

    removeApiKey({dispatch}) {
      dispatch('clearState');
      localStorage.removeItem('apiKey');
      transferwise.removeAuthorization();
    },

    fetchProfiles({commit}) {
      transferwise.getProfiles()
      .then(response => {
        commit('SET_PROFILES', transformProfiles(response));
      })
      .catch(error => console.log(error))
    },

    selectProfile({commit, dispatch}, profileId) {
      commit('SET_SELECTED_PROFILE_ID', profileId);
      dispatch('fetchAccounts', profileId);
    },

    fetchAccount({commit}, profileId) {
      transferwise.getAccounts(profileId)
      .then((response) => {
        commit('SET_SELECTED_ACCOUNT', transformAccounts(response));
      })
    },

    fetchAccounts({commit, dispatch}, profileId) {
      let accounts = [];
      transferwise.getAccounts(profileId)
      .then(response => {
        accounts = response.data.map((element) => {
          return {
            id: element.id,
            balances: element.balances.map((element) => {
              return {
                id: element.id,
                currency: element.currency,
                amount: element.amount.value
              }
            })
          }
        });
        commit('SET_ACCOUNTS', accounts);
        dispatch('selectAccount', accounts[0].id);
      });
    },

    selectAccount({commit, dispatch}, accountId) {
      commit('SET_SELECTED_ACCOUNT_ID', accountId);
      dispatch('clearSelectedBalance');
    },

    selectBalanceCurrency({commit}, currency) {
      commit('SET_SELECTED_BALANCE_CURRENCY', currency);
    },

    clearSelectedBalance({commit}) {
      commit('SET_SELECTED_BALANCE_CURRENCY', undefined);
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
      balances: account.balances.map((element) => {
        return {
          id: element.id,
          currency: element.currency,
          amount: element.amount.value
        }
      })
    }
  })[0];
}
