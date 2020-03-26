import Vue from 'vue';
import VueRouter from 'vue-router';
import VueApexCharts from'vue-apexcharts';

import { Routes } from './routes';
import App from './App.vue'
import store from './store/store';
import vuetify from './plugins/vuetify';

Vue.component('apexchart', VueApexCharts);
Vue.config.productionTip = false

Vue.filter('moneyFormat', function (amount, currency) {
  const formatter = new Intl.NumberFormat(currency.slice(0, 2), {style: 'currency', currency});
  return formatter.format(amount);
});

const router = new VueRouter({Routes})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
