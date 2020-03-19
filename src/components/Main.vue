<template>
  <dir>
    <h2>main</h2>
    <app-balances/>
  </dir>
</template>

<script>
import Balances from './Balances.vue';

export default {
  components: {
    appBalances: Balances
  }
}
</script>

<style>

</style>