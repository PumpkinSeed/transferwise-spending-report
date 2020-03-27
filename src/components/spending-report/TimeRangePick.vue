<template>

<v-container class="d-flex justify-center">
  <div class="d-flex flex-row align-center">
    <div>
      <v-menu
        v-model="dateFromMenu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
          class="app-date-input"
            v-model="dateFrom"
            label="From"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker no-title v-model="dateFrom" @input="dateFromMenu = false"></v-date-picker>
      </v-menu>
    </div>

    <div>
      <v-menu
        v-model="dateToMenu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            class="app-date-input"
            v-model="dateTo"
            label="To"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker no-title v-model="dateTo" @input="dateToMenu = false"></v-date-picker>
      </v-menu>
    </div>
    <div>
      <v-btn text @click="onSetTimeRange">set</v-btn>
    </div>
  </div>
</v-container>


</template>

<script>
import { mapGetters, mapActions } from 'vuex';


export default {

  computed: {
    ...mapGetters({
      startDate: 'spending/startDate',
      endDate: 'spending/endDate'
    })
  },

  data: () => ({
    dateFrom: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().substr(0, 10),
    dateTo: new Date().toISOString().substr(0, 10),
    dateFromMenu: false,
    dateToMenu: false,
    modal: false,
  }),

  methods: {
    ...mapActions({
      setStartDate: 'spending/setStartDate',
      setEndDate: 'spending/setEndDate',
      fetchTransactions: 'spending/fetchTransactions'
    }),

    onSetTimeRange() {
      this.setStartDate(this.formatDate(this.dateFrom));
      this.setEndDate(this.formatDate(this.dateTo));
      this.fetchTransactions();
      
    },
    formatDate(date) {
      return new Date(date).toISOString();
    }
  },

  mounted() {
    if (this.startDate) {
      this.dateFrom = this.startDate.substr(0, 10);
    }
    if (this.endDate) {
      this.dateTo = this.endDate.substr(0, 10);
    }
  }

}

</script>

<style>

.app-date-input {
  width: 160px;
  margin: 5px;
}

</style>