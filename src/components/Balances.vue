<template>
  <div>
    <div class="columns is-mobile is-multiline is-centered">
      <app-balance-card
        v-for="(balance, index) in balances" :key="index"
        :balance="balance"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BalanceCard from './BalanceCard.vue';

export default {
  components: {
    appBalanceCard: BalanceCard
  },
  computed: {
    ...mapGetters({
      balances: 'accountBalances'
    })
  }
}
</script>

<style>

</style>