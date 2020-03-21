<template>
    <div class="level">
      <div class="level-item">
        <apexchart width="400" type="donut" :options="options" :series="series"></apexchart>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      categories: 'spending/transactionCategories',
      totalSpending: 'spending/totalSpending',
      currency: 'selectedBalanceCurrency',
    }),
    options() {
      return {
        labels: Object.keys(this.categories),
        legend: {
          show: false,
          position: 'bottom',
          horizontalAlign: 'left',
          onItemClick: {
            toggleDataSeries: false
          },
        },
        plotOptions: {
          pie: {
            donut: {
              size: '65%',
              labels: {
                show: true,
                total: {
                  show: true,
                  showAlways: true,
                  label: 'Total Spent:',
                  formatter: () => {
                    const formatter = new Intl.NumberFormat(this.currency.slice(0, 2), {style: 'currency', currency: this.currency});
                    return formatter.format(this.totalSpending);
                  }
                }
              }
            },
            expandOnClick: false
          }
        }
      }
    },
    series() {
      return Object.values(this.categories).map((category) => +category.amount.toFixed(2));
    }
  },
  data() {
    return {}
  }
}
</script>

<style>

</style>