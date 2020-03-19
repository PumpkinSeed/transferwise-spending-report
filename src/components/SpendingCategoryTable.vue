<template>
  <div>
    <table class="table">
      <thead>
        <th>type</th>
        <th>amount</th>
        <th>times</th>
        <th>percent</th>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.name">
          <td>{{ category.name }}</td>
          <td>
            <div v-if="category.amount > 1">
              <money-format :value="category.amount"  
                :currency-code="category.currency"
                :subunit-value=true 
                :hide-subunits=false>
              </money-format>
            </div>
          </td>
          <td>{{ category.counter }} times</td>
          <td>{{ category.percent.toFixed(2) }}%</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import MoneyFormat from 'vue-money-format';
export default {
  components: {
    MoneyFormat
  },
  props: {
    categories: {
      type: Object,
      required: true
    }
  }

}
</script>

<style>

</style>