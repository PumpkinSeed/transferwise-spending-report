import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({

  state: {
    apiKey: undefined,
    profiles: [],
    accounts: [],
    balance: undefined,
    statement: undefined,
  },

  getters: {
    apiKey(state) {
      return state.apiKey;
    },
    profiles(state) {
      return state.profiles;
    },
    accounts(state) {
      return state.accounts;
    },
    balance(state) {
      return state.balance;
    },
    statement(state) {
      return state.statement;
    }
  },

  mutations: {
    'SET_API_KEY' (state, apiKey) {
      state.apiKey = apiKey;
    },
    'SET_PROFILES' (state, profiles) {
      state.profiles = profiles;
    },
    'SET_ACCOUNTS' (state, accounts) {
      state.accounts = accounts;
    },
    'SET_BALANCE' (state, balance) {
      state.balance = balance;
    },
    'SET_STATEMENT' (state, statement) {
      state.statement = statement
    }
  },

  actions: {
    init({dispatch}) {
      axios.defaults.baseURL = 'https://api.transferwise.com';
      const apiKey = localStorage.getItem('apiKey');
      if (apiKey) {
        dispatch('setApiKey', apiKey);
      }
    },
    setApiKey({commit}, apiKey) {
      commit('SET_API_KEY', apiKey);
      localStorage.setItem('apiKey', apiKey);
      axios.defaults.headers.common['Authorization'] = 'Bearer '+this.apiKey;
    },
    removeApiKey({commit}) {
      commit('SET_API_KEY', undefined);
      localStorage.removeItem('apiKey');
      delete axios.defaults.headers.common['Authorization'];
    },
    fetchProfiles({commit}) {
      console.log('fetchProfiles');
      const profiles = [];
      axios.get('/v1/profiles')
      .then(response => {
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
        commit('SET_PROFILES', profiles);
      })
      .catch(error => console.log(error))
    },
    fetchAccounts({commit}, profileId) {
      const accounts = [];
      axios.get('/v1/borderless-accounts?profileId=' + profileId)
      .then(response => {
        response.data[0].balances.forEach(element => {
          let balance = {
            id: element.id,
            currency: element.currency,
            amount: element.amount.value
          }
          accounts.push(balance);
        });
        commit('SET_ACCOUNTS', accounts);
      });
    }

  }
})
