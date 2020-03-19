<template>
  <div class="account-card">
    <div class="account-currency">{{ balance.currency }}</div>
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
  name: 'AccountCard',
  components: {
    'money-format': MoneyFormat
  },
  props: {
    balance: Object,
    currency: String,
    amount: Number,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.account-card{
  width: 170px;
  margin: 10px;
  border-radius: 5px;
  color: rgb(37, 54, 85);
  background: rgb(68, 238, 112);
  padding: 10px;
}
.account-currency{
  text-align: left;
  font-size: 22px;
}
.account-amount{
  text-align: left;
  font-size: 15px;
}
</style>
