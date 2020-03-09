<template>
  <tr class="category-line">
    <td class="category-name">{{ name }}</td>
    <td class="category-amount">
      <div v-if="amount > 1" class="ategory-amount-format">
        <money-format :value="amount"  
          :currency-code="currency"
          :subunit-value=true 
          :hide-subunits=false>
        </money-format>
      </div>
    </td>
    <td class="category-count">{{ count }} times</td>
    <td class="category-perc">{{ perc }}%</td>
  </tr>
</template>

<script>
import MoneyFormat from 'vue-money-format'

export default {
  name: 'Category',
  components: {
    'money-format': MoneyFormat
  },
  data() {
    return {
      perc: 0
    }
  },
  props: {
    total: Number,
    name: String,
    count: Number,
    amount: Number,
    currency: String,
  },
  methods: {
    calculate() {
      let perc = (this.amount/this.total)*100;
      this.perc = (Math.round(perc * 100) / 100).toFixed(2);
    }
  },
  mounted() {
    this.calculate()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.category-line {
  width: 600px;
  border-bottom: rgba(37, 54, 85, 0.3) 1px solid;
  margin: 5px;
  justify-content: space-between;
}
.category-name {
  width: 300px;
  text-align: left;
}
.category-amount {
  width: 160px;
  text-align: left;
}
.category-count {
  width: 80px;
  text-align: center;
}
.category-perc {
  width: 60px;
  text-align: right;
}
</style>
