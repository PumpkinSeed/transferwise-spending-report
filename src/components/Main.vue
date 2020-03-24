<template>
  <div>
    <section class="section">
      <app-balances/>
    </section>
    <section class="section">
      <app-spending-report/>
    </section>
    <app-nav></app-nav>
  </div>
</template>

<script>
import Balances from './balances/Balances.vue';
import SpendingReport from './spending-report/SpendingReport.vue'
import NavDrawer from './NavDrawer.vue';

export default {

  components: {
    appBalances: Balances,
    appSpendingReport: SpendingReport,
    appNav: NavDrawer,
  }

}
</script>

<style>

</style>