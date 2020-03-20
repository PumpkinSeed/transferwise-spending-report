<template>
  <div class="balance-card">
    <div class="balance-currency">{{ balance.currency }}</div>
    <money-format :value="balance.amount" 
      :currency-code="balance.currency"
      :subunit-value=true 
      :hide-subunits=false>
    </money-format>
  </div>
</template>

<script>
import MoneyFormat from 'vue-money-format'

export default {

  components: {
    MoneyFormat
  },

  props: {
    balance: Object,
  }

}
</script>

<style scoped>
.balance-card {
  width: 170px;
  margin: 10px;
  border-radius: 5px;
  color: rgb(37, 54, 85);
  background: rgb(68, 238, 112);
  padding: 10px;
  cursor: pointer;
}
.balance-currency {
  text-align: left;
  font-size: 22px;
}
.balance-amount {
  text-align: left;
  font-size: 15px;
}
</style>
