import Vue from 'vue'
import App from './App.vue'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.config.productionTip = false
// axios.defaults.baseURL = 'http://localhost:9090/api/v1/'http://quangnhan.herokuapp.com/api/v1/
// axios.defaults.baseURL = 'https://quangnhan.herokuapp.com/api/v1/'
axios.defaults.baseURL = 'http://localhost:8082/api/v1/'
Vue.use(CoreuiVue)
new Vue({
  router,
  store,
  icons,
  render: h => h(App)
}).$mount('#app')
