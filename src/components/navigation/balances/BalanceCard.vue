<template>


  <v-hover>
    <template v-slot="{ hover }">

      <v-card
        class="ma-2 balance-card borderless"
        :elevation="hover ? 16 : baseElevation"
      >
        <v-card-title>{{ balance.currency }}</v-card-title>
        <v-card-subtitle>
          <money-format :value="balance.amount" 
            :currency-code="balance.currency"
            :subunit-value=true 
            :hide-subunits=false>
          </money-format>
        </v-card-subtitle>
      </v-card>

    </template>
  </v-hover>

  <!-- <div class="balance-card">
    <div class="balance-currency">{{ balance.currency }}</div>
    <money-format :value="balance.amount" 
      :currency-code="balance.currency"
      :subunit-value=true 
      :hide-subunits=false>
    </money-format>
  </div> -->
</template>

<script>
import MoneyFormat from 'vue-money-format'

export default {

  components: {
    MoneyFormat
  },

  props: {
    balance: Object,
    isSelected: Boolean
  },

  computed: {
    baseElevation() {
      return this.isSelected ? 16 : 0;
    }
  }

}
</script>

<style scoped>
.balance-card {
  width: 170px;
  cursor: pointer;
}
.balance-currency {
  text-align: left;
  font-size: 22px;
}
.balance-amount {
  text-align: left;
  font-size: 15px;
}
</style>
