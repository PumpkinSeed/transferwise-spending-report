<template>
  <div class="hello">
    <section class="input-fields">
      <b-input placeholder="API Key" class="api_key" v-model="apiKey"></b-input>
      <datepicker input-class="datapicker-input-field" wrapper-class="datapicker-wrapper" v-model="startDate"></datepicker>
      <datepicker input-class="datapicker-input-field" wrapper-class="datapicker-wrapper" v-model="endDate"></datepicker>
      <b-button class="submit" @click="clickMe">Fetch</b-button>
    </section>
    <section class="input-fields">
      <li v-for="profile in profiles" :key="profile.id">
        <ProfileCard @click.native="fetchAccounts(profile.id)" v-bind:type="profile.type" v-bind:name="profile.name" v-bind:isBusiness="profile.isBusiness"/>
      </li>
      <h1>Balances</h1>
      <li v-for="balance in balances" :key="balance.id">
        <AccountCard @click.native="fetchStatement(balance.currency)" v-bind:currency="balance.currency" v-bind:amount="balance.amount"/>
      </li>
      <SpendingAmount/>
      <table class="category-table" v-for="category in categories" :key="category.name">
        <Category :category="category" />
      </table>
    </section>
  </div>
</template>

<script>
import ProfileCard from "./ProfileCard.vue";
import AccountCard from "./AccountCard.vue";
import SpendingAmount from "./SpendingAmount.vue";
import Category from "./Category.vue";
import Datepicker from 'vuejs-datepicker';

// import transferwise from '../repositories/TransferwiseRepository';

export default {
  name: 'SpendingReport',
  data () {
    return {
      apiKey: '',
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
    ProfileCard,
    AccountCard,
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
.input-fields {
  width: 400px;
}
.api_key {
  width: 400px;
  margin: 5px;
}
.submit{
  width: 400px;
  margin: 5px;
}
.api_key_label {
  margin: 15px 10px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
.datapicker-input-field {
  width: 400px;
  padding: 10px;
  margin: 5px;
  border-color: rgb(219, 219, 219);
  border-style: solid;
  border-width: 1px;
  border-radius: 4px;
}
.category-table {
  table-layout: fixed;
  width: 600px;
  margin: 5px;
}
</style>
