<template>
  <div>
    <div v-if="!isBalanceSelected">
      <h1>pick one of your balances to see spending</h1>
    </div>

    <div v-else>

      <div class="columns is-centered">
        <div class="column is-half">
          <datepicker input-class="input" v-model="startDate"></datepicker>
          <datepicker input-class="input" v-model="endDate"></datepicker>
          <button class="button is-fullwidth" @click="onSetTimeRange">Set Time Range</button>
        </div>
      </div>

      <div class="columns is-centered">
        <div class="column is-half">
          <app-donut-chart v-if="!!categories"></app-donut-chart>
          <app-spending-amount/>
          <app-spending-category-talbe v-if="!!categories" :categories="categories"/>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Datepicker from 'vuejs-datepicker';

import SpendingAmount from "./SpendingAmount.vue";
import SpendingCategoryTalbe from './SpendingCategoryTable.vue';
import DonutChart from './DonutChart.vue';

export default {

  components: {
    Datepicker,
    appSpendingAmount: SpendingAmount,
    appSpendingCategoryTalbe: SpendingCategoryTalbe,
    appDonutChart: DonutChart
  },

  data () {
    return {
      startDate: new Date().setMonth(new Date().getMonth() - 1),
      endDate: new Date(),
    }
  },

  computed: {
    ...mapGetters({
      categories: 'spending/transactionCategories',
      selectedBalanceCurrency: 'selectedBalanceCurrency',
    }),

    isBalanceSelected() {
      return !!this.selectedBalanceCurrency;
    },
  },

  methods: {
    ...mapActions({
      setStartDate: 'spending/setStartDate',
      setEndDate: 'spending/setEndDate',
      fetchTransactions: 'spending/fetchTransactions'
    }),

    onSetTimeRange() {
      this.setStartDate(formatDate(this.startDate));
      this.setEndDate(formatDate(this.endDate));
      this.fetchTransactions();
    }
  }

}

const formatDate = (date) => {
  return new Date(date).toISOString();
}
</script>

<style>

</style>
