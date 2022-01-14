import vuetify from './plugins/vuetify'
import Vue from 'vue';
import store from './store/store';
import './plugins/vuetify'
import App from './App.vue';
import router from './router';
import { VueMaskDirective } from 'v-mask'
import ThailandAutoComplete from 'vue-thailand-address-autocomplete'

Vue.component('ThailandAutoComplete', ThailandAutoComplete)
    
Vue.directive('mask', VueMaskDirective);
Vue.config.productionTip = false

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
