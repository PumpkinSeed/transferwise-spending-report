<template>
  <div class="hello">
    <section>
    <b-field>
      <b-input placeholder="API Key" class="api_key" v-model="apiKey"></b-input>
      <b-button class="submit" @click="clickMe">Fetch</b-button>
    </b-field>
    </section>
    <li v-for="profile in profiles" :key="profile.id">
      <ProfileCard @click.native="fetchData(profile.id)" v-bind:type="profile.type" v-bind:name="profile.name" v-bind:odd="profile.odd"/>
    </li>
    <h1>Balances</h1>
    <li v-for="balance in balances" :key="balance.id">
      <AccountCard v-bind:currency="balance.currency" v-bind:amount="balance.amount"/>
    </li>
  </div>
</template>

<script>
import axios from "axios";
import ProfileCard from "./ProfileCard.vue";
import AccountCard from "./AccountCard.vue"

export default {
  name: 'SpendingReport',
  data () {
    return {
      apiKey: '',
      profiles: [],
      balances: []
    }
  },
  components: {
    ProfileCard,
    AccountCard
  },
  props: {
    msg: String
  },
  methods: {
    clickMe() {
      localStorage.apiKey = this.apiKey;
      this.setDefaults()
    },
    setDefaults() {
      axios.defaults.baseURL = 'https://api.transferwise.com';
      axios.defaults.headers.common['Authorization'] = 'Bearer '+this.apiKey;
      this.printAccounts();
    },
    printAccounts() {
      this.profiles = [];
      axios.get('/v1/profiles')
      .then(response => {
        let counter = 1;
        response.data.forEach(element => {
          let profile = {
            id: element.id,
            type: element.type
          }
          
          if (counter%2===1) {
            profile.odd = true
          } else {
            profile.odd = false
          }

          if (profile.type === "personal") {
            profile.name = element.details.firstName
            profile.name += ' '
            profile.name += element.details.lastName
          } else if (profile.type === "business") {
            profile.name = element.details.name
          }
          this.profiles.push(profile)
          counter++;
        });
      })
      .catch(error => console.log(error))
    },
    fetchData(id) {
      this.balances = [];
      axios.get('/v1/borderless-accounts?profileId='+id)
      .then(response => {
        response.data[0].balances.forEach(element => {
          let balance = {
            id: element.id,
            currency: element.currency,
            amount: element.amount.value
          }
          this.balances.push(balance);
        })
      })
    },
  },
  mounted() {
    if (localStorage.apiKey !== "") {
      console.log(localStorage.apiKey)
      this.apiKey = localStorage.apiKey;
      this.clickMe()
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.api_key {
  width: 400px;
  margin: 10px;
}
.submit{
  margin: 10px;
}
.api_key_label {
  margin: 15px 10px;
}
h1 {
  font-size: 32px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
