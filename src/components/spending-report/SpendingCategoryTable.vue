<template>
  <div>

    <v-data-table
      :headers="headers"
      :items="categoriesForTable"
      :disable-pagination="true"
      :hide-default-footer="true"
      @click:row="onClickRow"
      class="elevation-1"
    >
      <template v-slot:item.amount="{ item }">
        {{ item.amount | moneyFormat(item.currency) }}
      </template>
      <template v-slot:item.percent="{ item }">
        {{ item.percent.toFixed(2) + '%' }}
      </template>
    </v-data-table>

  <div class="text-center">
    <v-dialog v-model="dialogOpen" width="800">
      <v-card>
        <app-transactions-list :category="selectedCategory"></app-transactions-list>
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
    }),
    categoriesForTable() {
      return Object.values(this.categories).map((category) => {
        return {
          name: category.name,
          amount: category.amount,
          currency: category.currency,
          counter: category.counter,
          percent: category.percent,
        }
      }).sort((a, b) => b.amount - a.amount);
    }
  },

  data() {
    return {
      headers: [
        {
          text: 'category',
          align: 'start',
          sortable: true,
          value: 'name',
        },
        { text: 'amount spent', value: 'amount' },
        { text: 'num of times', value: 'counter' },
        { text: 'spending %', value: 'percent' },
      ],
      dialogOpen: false,
      selectedCategory: undefined
    }
  },

  methods: {
    onClickRow(category) {
      this.dialogOpen = true;
      this.selectedCategory = category.name;
    }
  }

}
</script>

<style>

</style>