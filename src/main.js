import Vue from 'vue'
import App from './App.vue'
import VueApexCharts from'vue-apexcharts';

import store from './store/store';
import vuetify from './plugins/vuetify';

Vue.component('apexchart', VueApexCharts);
Vue.config.productionTip = false

Vue.filter('moneyFormat', function (amount, currency) {
  const formatter = new Intl.NumberFormat(currency.slice(0, 2), {style: 'currency', currency});
  return formatter.format(amount);
});

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
