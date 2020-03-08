<template>
  <div class="account-card">
    <div class="account-currency">{{ currency }}</div>
    <div class="account-amount">{{ amount }}</div>
  </div>
</template>

<script>
export default {
  name: 'AccountCard',
  data () {
    return {
        currencyIcon: {
            "USD": "$",
            "GPB": "L",
            "EUR": "E",
            "HUF": "Ft",
        }
    }
  },
  props: {
    currency: String,
    amount: Number,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.account-card{
  width: 200px;
  margin: 10px;
  border-radius: 5px;
  color: rgb(37, 54, 85);
  background: rgb(68, 238, 112);
  width: 200xp;
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
