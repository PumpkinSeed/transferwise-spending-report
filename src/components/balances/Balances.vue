<template>
  <div>
    <div class="columns is-mobile is-multiline is-centered">
      <app-balance-card
        class="border"
        :class="{ 'selected-border': selectedCurency === balance.currency }"
        v-for="(balance, index) in balances" :key="index"
        :balance="balance" :isSelected="selectedCurency === balance.currency"
        @click.native="onSelectBalance(index)"/>
    </div>
  </div>
</template>

<script>
import BalanceCard from './BalanceCard.vue';

export default {

  components: {
    appBalanceCard: BalanceCard
  },

  computed: {
    balances() {
      return this.$store.getters.accountBalances;
    },
    selectedCurency() {
      return this.$store.getters.selectedBalanceCurrency;
    }
  },

  methods: {
    onSelectBalance(index) {
      if (this.balances[index].currency === this.selectedCurency) {
        this.$store.dispatch('clearSelectedBalance');
      } else {
        this.$store.dispatch('selectBalanceCurrency', this.balances[index].currency);
      }
    }
  }

}
</script>

<style scoped>

.border {
  border: 1px solid transparent;
}

.selected-border {
  border: 1px solid black
}

</style>