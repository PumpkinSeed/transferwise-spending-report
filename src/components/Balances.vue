<template>
  <div>
    <h1>balances</h1>
    <app-balance-card v-for="(balance, index) in balances" :key="index" :balance="balance"></app-balance-card>
  </div>
</template>

<script>
// import { mappGetters } from 'vuex';
import BalanceCard from './BalanceCard.vue';

export default {
  components: {
    appBalanceCard: BalanceCard
  },
  computed: {
    // ...mappGetters({
    //   balances: 'accountBalances'
    // })
    balances() {
      return this.$store.getters.accountBalances;
    }
  },
  mounted() {
    const profileId = this.$store.getters.selectedProfileId;
    this.$store.dispatch('fetchAccounts', profileId);
  }
}
</script>

<style>

</style>