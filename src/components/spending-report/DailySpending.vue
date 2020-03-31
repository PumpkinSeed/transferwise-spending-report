<template>
  <div>hi</div>
</template>

<script>
import {mapGetters} from 'vuex';


export default {

  computed: {
    ...mapGetters({
      dailySpending: 'spending/dailySpending'
    }),
  },

  mounted() {
    console.log(this.dailySpending);
    console.log(Object.values(this.dailySpending).reduce((prev, curr) => prev + curr.amount, 0));
  }

}
</script>

<style>

</style>