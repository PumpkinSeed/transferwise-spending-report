<template>
  <div>
    <section class="section">
      <app-spending-report/>
    </section>
    <app-nav></app-nav>
  </div>
</template>

<script>
import SpendingReport from './spending-report/SpendingReport.vue'
import NavDrawer from './NavDrawer.vue';

export default {

  components: {
    appSpendingReport: SpendingReport,
    appNav: NavDrawer,
  }

}
</script>

<style>

</style>