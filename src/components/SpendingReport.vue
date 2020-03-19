<template>
  <div>
    <div class="columns is-centered">
      <div class="column is-half">
        <datepicker input-class="input" v-model="startDate"></datepicker>
        <datepicker input-class="input" v-model="endDate"></datepicker>
        <button class="button is-fullwidth" @click="clickMe">Fetch</button>
      </div>
    </div>
    <section class="input-fields">
      <SpendingAmount/>
      <table v-for="category in categories" :key="category.name">
        <Category :category="category" />
      </table>
    </section>
  </div>
</template>

<script>
import SpendingAmount from "./SpendingAmount.vue";
import Category from "./Category.vue";
import Datepicker from 'vuejs-datepicker';

export default {
  data () {
    return {
      startDate: new Date().setMonth(new Date().getMonth() - 1),
      endDate: new Date(),
    }
  },
  computed: {
    profiles() {
      return this.$store.getters.profiles;
    },
    balances() {
      return this.$store.getters.accountBalances;
    },
    categories() {
      return this.$store.getters.categories;
    }
  },
  components: {
    Datepicker,
    SpendingAmount,
    Category
  },
  props: {
    msg: String
  },
  methods: {
    clickMe() {
      this.setDefaults()
    },
    setDefaults() {
      if (this.apiKey) {
        this.$store.dispatch('setApiKey', this.apiKey);
      }
      this.$store.dispatch('fetchProfiles');
    },
    fetchAccounts(id) {
      this.formatDate(this.startDate);
      this.formatDate(this.endDate);
      this.$store.dispatch('selectProfile', id);
      this.$store.dispatch('fetchAccounts', id);
      this.currentProfileID = id;
    },
    fetchStatement(currency) {
      let start = this.formatDate(this.startDate)
      let end = this.formatDate(this.endDate)
      const currentProfileID = this.$store.getters.selectedProfileId;
      const accountID = this.$store.getters.selectedAccountId;
      this.$store.dispatch('fetchStatement', {profileId: currentProfileID, accountId: accountID, currency, start, end})
    },
    formatDate(dateFromPicker) {
      let date = new Date(dateFromPicker)
      return date.toISOString()
    }
  },
  mounted() {
      this.$store.dispatch('init');
      this.clickMe();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
