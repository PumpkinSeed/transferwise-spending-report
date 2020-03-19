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
          <button class="button is-fullwidth" @click="fetchStatement">Set Time</button>
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
    isBalanceSelected() {
      return !!this.$store.getters.selectedBalanceCurrency;
    },
    categories() {
      console.log(this.$store.getters.categories);
      return this.$store.getters.categories;
    }
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
    fetchStatement() {
      let start = this.formatDate(this.startDate)
      let end = this.formatDate(this.endDate)
      const currentProfileID = this.$store.getters.selectedProfileId;
      const accountID = this.$store.getters.selectedAccountId;
      const currency = this.$store.getters.selectedBalanceCurrency;
      console.log(currentProfileID, accountID, currency, start, end)
      this.$store.dispatch('fetchStatement', {profileId: currentProfileID, accountId: accountID, currency, start, end})
    },
    formatDate(dateFromPicker) {
      let date = new Date(dateFromPicker)
      return date.toISOString()
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
