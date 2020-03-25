import api from '../../repositories/TransferwiseRepository';
import jsonCategories from '../../assets/spending-categories.json';
import slugify from 'slugify';

const state = {
  startDate: undefined,
  endDate: undefined,
  transactions: [],
}

const mutations = {
  'SET_START_DATE'(state, date) {
    state.startDate = date;
  },
  'SET_END_DATE'(state, date) {
    state.endDate = date;
  },
  'SET_TRANSACTIONS'(state, transactions) {
    state.transactions = transactions;
  }
}

const getters = {

  startDate(state) {
    return state.startDate;
  },

  endDate(state) {
    return state.endDate;
  },

  statement(state) {
    return state.statement;
  },

  totalSpending(state) {
    return -state.transactions.reduce((acc, cur) => acc + cur.amount.value, 0);
  },

  transactions(state) {
    return state.transactions;
  },

  filteredTransactions(state) {
    return (filterOptions) => {
      if (!filterOptions) return state.transactions;
      return state.transactions.filter((transaction) => {
        let checkStartDate = true;
        let checkEndDate = true;
        let checkCategory = true;
        if (filterOptions.startDate) {
          checkStartDate = new Date(transaction.date).getTime() >= new Date(filterOptions.startDate).getTime();
        }
        if (filterOptions.endDate) {
          checkEndDate = new Date(transaction.date).getTime() <= new Date(filterOptions.checkEndDate).getTime();
        }
        if (filterOptions.category) {
          checkCategory = transaction.category === filterOptions.category;
        }
        return checkStartDate && checkEndDate && checkCategory;
      });
    }
  },

  transactionCategories(state, getters) {
    if (state.transactions.length < 1) return undefined;
    const categories = {};
    state.transactions.forEach((transaction) => {
      const spendingCategory = transaction.category;
      if (categories[spendingCategory] === undefined) {
        categories[spendingCategory] = {
          counter: 1,
          name: spendingCategory,
          amount: -transaction.amount.value,
          currency: transaction.amount.currency
        };
      } else {
        categories[spendingCategory].counter++;
        categories[spendingCategory].amount += -transaction.amount.value;
      }
    });
    Object.values(categories).forEach((category) => category.percent = (category.amount / getters.totalSpending) * 100);
    return categories;
  }

}

const actions = {

  init({dispatch}) {
    dispatch('setStartDate', new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString());
    dispatch('setEndDate', new Date().toISOString());
  },

  clearState({commit}) {
    commit('SET_START_DATE', undefined);
    commit('SET_END_DATE', undefined);
    commit('SET_TRANSACTIONS', []);
  },

  setStartDate({commit}, startDate) {
    commit('SET_START_DATE', startDate);
  },

  setEndDate({commit}, endDate) {
    commit('SET_END_DATE', endDate);
  },

  fetchTransactions({commit, getters, rootGetters}) {
    const profileId = rootGetters.selectedAccount.profileId;
    const accountId = rootGetters.selectedAccount.id;
    const currency = rootGetters.selectedBalanceCurrency;
    const start = getters.startDate;
    const end = getters.endDate;
    api.getStatement(profileId, accountId, currency, start, end)
    .then((response) => {
      commit('SET_TRANSACTIONS', getSpendingTransactions(response));
    })
  },

  clearTransactions({commit}) {
    commit('SET_TRANSACTIONS', []);
  }

}

export default {
  state, mutations, getters, actions
}

const getSpendingTransactions = (response) => {
  return response.data.transactions
  .filter((transaction) => {
    return transaction.type === 'DEBIT' && transaction.details.type !== 'CONVERSION'
  })
  .map((transaction) => {
    if (!!transaction.details.category && typeof transaction.details.category === 'string') {
      transaction.category = getSpendingCategory(transaction.details.category);
    } else {
      transaction.category = 'other';
    }
    return transaction;
  });
}

const getSpendingCategory = (str) => {
  str = slugify(str, {lower: true, strict: true})
  for (const entry of Object.entries(jsonCategories)) {
    for(const text of entry[1]) {
      if (str.indexOf(text) >= 0) {
        return entry[0];
      }
    }
  }
  return 'Other';
}
