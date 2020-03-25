<template>
  <div>

    <v-data-table
      :headers="headers"
      :items="categoriesForTable"
      :disable-pagination="true"
      :hide-default-footer="true"
      class="elevation-1"
    >
      <template v-slot:item.amount="{ item }">
        {{ item.amount | moneyFormat(item.currency) }}
      </template>
      <template v-slot:item.percent="{ item }">
        {{ item.percent.toFixed(2) + '%' }}
      </template>
    </v-data-table>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {

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
    }
  }

}
</script>

<style>

</style>