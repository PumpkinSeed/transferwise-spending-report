import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import VueApexCharts from'vue-apexcharts';

import store from './store/store';

Vue.use(Buefy)
Vue.component('apexchart', VueApexCharts);
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
