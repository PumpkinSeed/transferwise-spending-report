<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="transactionsForTable"
      :disable-pagination="true"
      :hide-default-footer="true"
      class="elevation-1"
    >
      <template v-slot:item.amount="{ item }">
        {{ item.amount | moneyFormat(item.currency) }}
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {

  computed: {
    ...mapGetters({
      transactions: 'spending/filteredTransactions'
    }),
    transactionsForTable() {
      return this.transactions(this.options).map((transaction) => {
        const location = `${transaction.details.merchant.city} ${transaction.details.merchant.country}`;
        return {
          date: transaction.date,
          amount: -transaction.amount.value,
          currency: transaction.amount.currency,
          description: transaction.details.description,
          merchant: transaction.details.merchant.name,
          location
        };
      });
    }
  },

  props: {
    options: Object
  },

  data() {
    return {
      headers: [
        {
          text: 'date',
          align: 'start',
          sortable: true,
          value: 'date',
        },
        { text: 'amount', value: 'amount' },
        { text: 'description', value: 'description' },
        { text: 'merchant', value: 'merchant' },
        { text: 'location', value: 'location' },
      ],
    }
  }

}
</script>

<style>

</style>