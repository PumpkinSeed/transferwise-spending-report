<template>
  <div v-if="amount > 1" class="amount-card">
    spent:
    <money-format :value="amount"  
      :currency-code="currency"
      :subunit-value=true 
      :hide-subunits=false>
    </money-format>
  </div>
  <div v-else class="amount-none">
      No spending at all!
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import MoneyFormat from 'vue-money-format';

export default {

  components: {
    MoneyFormat
  },

  computed: {
    ...mapGetters({
      amount: 'spending/totalSpending',
      currency: 'selectedBalanceCurrency'
    })
  }

}
</script>

<style scoped>
.amount-card{
  width: 600px;
  margin: 5px;
  color: rgb(37, 54, 85);
  width: 200xp;
  padding: 5px;
  font-size: 22px;
  border-bottom: rgba(37, 54, 85, 0.3) 3px solid;
}
.amount-none {
  width: 600px;
  margin: 5px;
  color: rgb(37, 54, 85);
  width: 200xp;
  padding: 5px;
  font-size: 22px;
}
</style>
