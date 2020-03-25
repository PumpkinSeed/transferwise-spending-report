<template>
  <div>
    <div v-if="!isBalanceSelected">
      <h1>pick one of your balances to see spending</h1>

    </div>

    <div v-else>
      <app-time-range-pick></app-time-range-pick>  

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
import { mapGetters } from 'vuex';

import SpendingAmount from "./SpendingAmount.vue";
import SpendingCategoryTalbe from './SpendingCategoryTable.vue';
import DonutChart from './DonutChart.vue';
import TimeRangePick from './TimeRangePick.vue';

export default {

  components: {
    appSpendingAmount: SpendingAmount,
    appSpendingCategoryTalbe: SpendingCategoryTalbe,
    appDonutChart: DonutChart,
    appTimeRangePick: TimeRangePick
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

}
</script>

<style>

</style>
