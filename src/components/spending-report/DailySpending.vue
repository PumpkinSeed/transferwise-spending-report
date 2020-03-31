<template>
  <div>
    <div>hi</div>
    <div>
      <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';


export default {

  computed: {
    ...mapGetters({
      dailySpending: 'spending/dailySpending'
    }),
    chartCategories() {
      if (!this.dailySpending) return [];
      return Object.keys(this.dailySpending).map((date) => `${new Date(date).getMonth()}-${new Date(date).getDate()}`)
    },
    chartAmounts() {
      if (!this.dailySpending) return [];
      return Object.values(this.dailySpending).map((val) => val.amount);
    },

    series() {
      return [{
        name: 'Net Profit',
        data: this.chartAmounts
      }]
    },

    chartOptions() {
      return {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
            categories: this.chartCategories
        },
        yaxis: {
          title: {
            text: '$ (thousands)'
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "$ " + val + " thousands"
            }
          }
        }
      }
    },

  },

  mounted() {
    // console.log(this.dailySpending);
    // console.log(Object.values(this.dailySpending).reduce((prev, curr) => prev + curr.amount, 0));
    // console.log(this.chartCategories)
    // console.log(this.chartAmounts);
  }

}
</script>

<style>

</style>
