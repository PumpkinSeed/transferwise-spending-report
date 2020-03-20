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
          <SpendingAmount/>
          <app-spending-category-talbe v-if="!!categories" :categories="categories"/>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import SpendingAmount from "./SpendingAmount.vue";
import SpendingCategoryTalbe from './SpendingCategoryTable.vue';
import Datepicker from 'vuejs-datepicker';

export default {
  data () {
    return {
      startDate: new Date().setMonth(new Date().getMonth() - 1),
      endDate: new Date(),
    }
  },
  computed: {
    ...mapGetters({
      categories: 'spending/categories',
      totalSpending: 'spending/totalSpending',
      selectedBalanceCurrency: 'selectedBalanceCurrency',
    }),
    isBalanceSelected() {
      return !!this.selectedBalanceCurrency;
    },
  },
  components: {
    Datepicker,
    SpendingAmount,
    appSpendingCategoryTalbe: SpendingCategoryTalbe,
  },
  props: {
    msg: String
  },
  methods: {
    ...mapActions({
      setStartDate: 'spending/setStartDate',
      setEndDate: 'spending/setEndDate'
    }),

    onSetTimeRange() {
      this.setStartDate(this.formatDate(this.startDate));
      this.setEndDate(this.formatDate(this.endDate));
      this.$store.dispatch('spending/fetchStatement');
    },

    formatDate(dateFromPicker) {
      let date = new Date(dateFromPicker)
      return date.toISOString()
    }
  },
}
</script>

<style>

</style>
