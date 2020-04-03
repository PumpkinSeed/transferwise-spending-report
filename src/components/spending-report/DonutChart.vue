<template>
    <div class="d-flex flex-column align-center">
      <div>
        <apexchart width="350" type="donut" :options="options" :series="series"></apexchart>
      </div>
      <div>
        <div>
          <div class="d-flex align-center" v-for="legend in legendData" :key="legend.name">
            <div class="legend-dot" :style="{ backgroundColor: legend.color }"></div>
            <span class="legend-text">{{ legend.name }}</span>
          </div>
        </div>
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
import { mapGetters } from 'vuex';
import TransactionsList from './TransactionsList.vue';

export default {

  components: {
    appTransactionsList: TransactionsList
  },

  computed: {
    ...mapGetters({
      categories: 'spending/transactionCategories',
      totalSpending: 'spending/totalSpending',
      currency: 'selectedBalanceCurrency',
    }),
    legendData() {
      return Object.keys(this.categories).map((key, index) => {
        return { name: key, color: this.colors[index] }
      });
    },
    options() {
      return {
        colors: this.colors,
        labels: Object.keys(this.categories),
        legend: {
          show: false,
          position: 'bottom',
          horizontalAlign: 'left',
          width: 250,
          onItemClick: {
            toggleDataSeries: false
          },
        },
        chart: {
          events: {
            dataPointSelection: (event, chartContext, config) =>  {
              const dataIndex = config.dataPointIndex;
              if (dataIndex < 0) return;
              this.dialogOptions = {category: this.legendData[dataIndex].name};
              this.dialogOpen = true;
            }
          }
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
    return {
      colors: ['#F66D44', '#FEAE65', '#E6F69D', '#AADEA7', '#64C2A6', '#2D87BB', '#E8A09A', '#E8A09A', '#FBE29F', '#C6D68F'],
      dialogOpen: false,
      dialogOptions: undefined
    }
  }

}
</script>

<style>

.legend-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  margin-right: 2px;
}

.legend-text {
  font-size: smaller;
}

</style>
