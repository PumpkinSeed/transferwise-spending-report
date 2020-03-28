<template>
  <div>
    <app-spending-report/>
    <app-nav></app-nav>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import SpendingReport from './spending-report/SpendingReport.vue'
import NavDrawer from './navigation/NavDrawer.vue';

export default {

  components: {
    appSpendingReport: SpendingReport,
    appNav: NavDrawer,
  },

  methods: {
    ...mapActions({
      init: 'init'
    })
  },

  mounted() {
    this.init();
  }

}
</script>

<style>

</style>