<template>
  <div>
    <section class="section">
      <app-balances/>
    </section>
    <section class="section">
      <app-spending-report/>
    </section>
  </div>
</template>

<script>
import Balances from './balances/Balances.vue';
import SpendingReport from './spending-report/SpendingReport.vue'

export default {

  components: {
    appBalances: Balances,
    appSpendingReport: SpendingReport
  }

}
</script>

<style>

</style>