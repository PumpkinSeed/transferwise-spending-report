import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#37517e', // TW navy
        secondary: '#5d7079', // slate grey
        accent: '#FFB619', // TW amber
        borderless: '#44EE70', // Borderless green
      }
    }
  }
});
