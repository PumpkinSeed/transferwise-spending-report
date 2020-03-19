import transferwise from '../../repositories/TransferwiseRepository';

const state = {
  startDate: new Date().setMonth(new Date().getMonth() - 1),
  endDate: new Date(),
  statement: undefined,
}

const mutations = {

  'SET_START_DATE'(state, date) {
    state.startDate = date;
  },

  'SET_END_DATE'(state, date) {
    state.endDate = date;
  },

  'SET_STATEMENT'(state, statement) {
    state.statement = statement;
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
    if (state.statement === undefined){
      return undefined;
    }
    //TODO filter
    return state.statement.transactions.reduce((acc, cur) => acc + cur.amount.value, 0);
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

}

const actions = {

  fetchStatement({commit}, payload) {
    transferwise.getStatement(payload.profileId, payload.accountId, payload.currency, payload.start, payload.end)
      .then((result) => {
        commit('SET_STATEMENT', result.data);
      });
  }

}

export default {
  state, mutations, getters, actions
}