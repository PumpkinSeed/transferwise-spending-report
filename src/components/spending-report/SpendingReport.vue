<template>
  <div class="d-flex justify-center">

    <div v-if="!isBalanceSelected">
      <h1>pick one of your balances to see spending</h1>
    </div>

    <div v-else>
      <div>
        <app-time-range-pick></app-time-range-pick>
      </div>

      <!-- <div>
        <app-spending-amount/>
      </div> -->

      <div>
        <v-tabs v-model="tab">
          <v-tab>pie chart</v-tab>
          <v-tab>category table</v-tab>
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
        </v-tabs-items>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';

// import SpendingAmount from "./SpendingAmount.vue";
import SpendingCategoryTalbe from './SpendingCategoryTable.vue';
import DonutChart from './DonutChart.vue';
import TimeRangePick from './TimeRangePick.vue';

export default {

  components: {
    // appSpendingAmount: SpendingAmount,
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

  data() {
    return {
      tab: null
    }
  }

}
</script>

<style>

</style>
