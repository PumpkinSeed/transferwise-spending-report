<template>
  <div class="d-flex justify-center">

    <div v-if="!isBalanceSelected" class="ma-10">
      <h3>Pick one of your balances to see spending.</h3>
    </div>

    <div v-else>
      <div>
        <app-time-range-pick></app-time-range-pick>
      </div>

      <div class="d-flex justify-center">
        <div class="mt-12 pt-12" v-if="isSpendingLoading">
          <v-progress-circular
            :size="50"
            color="primary"
            indeterminate/>
        </div>

        <div class="d-flex justify-center mt-10" v-else-if="transactions.length === 0">
          <h3>No spending in the selected period.</h3>
        </div>

        <div class="app-tabs" v-else>
          <div>
            <v-tabs grow v-model="tab">
              <v-tab>pie chart</v-tab>
              <v-tab>category table</v-tab>
              <v-tab>Daily spending</v-tab>
            </v-tabs>   
          </div>

          <div>
            <v-tabs-items v-model="tab">
              <v-tab-item>
                <app-donut-chart v-if="!!categories"></app-donut-chart>
              </v-tab-item>
              <v-tab-item>
                <app-spending-category-talbe v-if="!!categories"/>
              </v-tab-item>
              <v-tab-item>
                <app-daily-spending v-if="!!categories"/>
              </v-tab-item>
            </v-tabs-items>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import SpendingCategoryTalbe from './SpendingCategoryTable.vue';
import DonutChart from './DonutChart.vue';
import TimeRangePick from './TimeRangePick.vue';
import DailySpending from './DailySpending.vue';

export default {

  components: {
    appSpendingCategoryTalbe: SpendingCategoryTalbe,
    appDonutChart: DonutChart,
    appTimeRangePick: TimeRangePick,
    appDailySpending: DailySpending
  },

  computed: {
    ...mapGetters({
      categories: 'spending/transactionCategories',
      selectedBalanceCurrency: 'selectedBalanceCurrency',
      isSpendingLoading: 'loading/isSpendingLoading',
      transactions: 'spending/transactions'
    }),

    isBalanceSelected() {
      return !!this.selectedBalanceCurrency;
    },
  },

  data() {
    return {
      tab: null
    }
  }

}
</script>

<style>

.app-tabs {
  width: 600px;
}

</style>
