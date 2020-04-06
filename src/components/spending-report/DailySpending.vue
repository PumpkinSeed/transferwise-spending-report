<template>
  <div>

    <div class="mt-5">
      <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
    </div>

    <div class="text-center">
      <v-dialog v-model="dialogOpen" width="800">
        <v-card>
          <app-transactions-list :options="dialogOptions"></app-transactions-list>
        </v-card>
      </v-dialog>
    </div>

  </div>
</template>

<script>
import Vue from 'vue';
import {mapGetters} from 'vuex';

import TransactionsList from './TransactionsList.vue';

export default {

  components: {
    appTransactionsList: TransactionsList
  },

  computed: {
    ...mapGetters({
      dailySpending: 'spending/dailySpending',
      selectedCurrency: 'selectedBalanceCurrency'
    }),

    chartCategories() {
      if (!this.dailySpending) return [];
      return this.dailySpending.map((entry) => {
        const date = new Date(entry.day);
        var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleString('EU', options);
      })
    },

    chartAmounts() {
      if (!this.dailySpending) return [];
      return this.dailySpending.map((entry) => entry.amount);
    },

    series() {
      return [{
        name: 'Spending',
        data: this.chartAmounts
      }]
    },

    chartOptions() {
      return {
        chart: {
          type: 'bar',
          height: 350,
          events: {
            click: (event, chartContext, config) =>  {
              const dataIndex = config.dataPointIndex;
              if (dataIndex < 0) return;
              this.dialogOptions = {
                startDate: new Date(this.dailySpending[dataIndex].day),
                endDate: new Date(new Date(this.dailySpending[dataIndex].day).valueOf() + 86400000)
              }
              this.dialogOpen = true;
            }
          }
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
        xaxis: {
            categories: this.chartCategories,
            labels: {
              rotate: 0,
              formatter: (value)  => {
                const date = new Date(value);
                var options = { month: 'short', day: 'numeric' };
                return date.toLocaleDateString('EU', options)
              }
            }
        },
        yaxis: {
          title: {
            text: this.selectedCurrency
          },
          labels: {
              show: true,
              formatter: (value) => value,
          },
        },
        tooltip: {
          y: {
            formatter: (val) => {
              return Vue.filter('moneyFormat')(val, this.selectedCurrency);
            }
          }
        }
      }
    },

  },

  data() {
    return {
      dialogOpen: false,
      dialogOptions: undefined
    }
  }

}
</script>

<style>

</style>
