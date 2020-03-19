import Vue from 'vue';
import Vuex from 'vuex';
import transferwise from '../repositories/TransferwiseRepository';

Vue.use(Vuex);

export default new Vuex.Store({

  state: {
    apiKey: undefined,
    profiles: [],
    selectedProfileId: undefined,
    accounts: [],
    selectedAccountId: undefined,
    selectedBalanceCurrency: undefined,
    statement: undefined,
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
    statement(state) {
      return state.statement;
    },
    categories(state) {
      if (state.statement === undefined){
        return undefined;
      }
      const categories = {};
      let sum = 0;
      state.statement.transactions.forEach((transaction) => {
        if (transaction.type === "DEBIT" && transaction.details.type !== "CONVERSION") {
          if (categories[transaction.details.category] === undefined) {
            categories[transaction.details.category] = {
              counter: 1,
              name: transaction.details.category,
              amount: transaction.details.amount.value,
              currency: transaction.details.amount.currency
            };
          } else {
            categories[transaction.details.category].counter++;
            categories[transaction.details.category].amount += transaction.details.amount.value;
          }
          sum += transaction.details.amount.value;
        }
      });
      Object.values(categories).forEach((category) => category.percent = (category.amount / sum) * 100);
      return categories;
    }
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
    'SET_ACCOUNTS' (state, accounts) {
      state.accounts = accounts;
    },
    'SET_SELECTED_ACCOUNT_ID' (state, accountId) {
      state.selectedAccountId = accountId;
    },
    'SET_SELECTED_BALANCE_CURRENCY' (state, currecy) {
      state.selectedBalanceCurrency = currecy;
    },
    'SET_STATEMENT' (state, statement) {
      state.statement = statement
    }
  },

  actions: {
    init({dispatch}) {
      const apiKey = localStorage.getItem('apiKey');
      if (apiKey) {
        dispatch('setApiKey', apiKey);
      }
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

    clearState({commit}) {
      commit('SET_API_KEY', undefined);
      commit('SET_PROFILES', []);
      commit('SET_SELECTED_PROFILE_ID', undefined);
      commit('SET_ACCOUNTS', []);
      commit('SET_SELECTED_ACCOUNT_ID', undefined);
      commit('SET_STATEMENT', undefined);
    },

    fetchProfiles({commit}) {
      const profiles = [];
      transferwise.getProfiles()
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

    selectProfile({commit, dispatch}, profileId) {
      commit('SET_SELECTED_PROFILE_ID', profileId);
      dispatch('fetchAccounts', profileId);
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

    fetchStatement({commit}, payload) {
      transferwise.getStatement(payload.profileId, payload.accountId, payload.currency, payload.start, payload.end)
        .then((result) => {
          commit('SET_STATEMENT', result.data);
        });
    }
  }
});
