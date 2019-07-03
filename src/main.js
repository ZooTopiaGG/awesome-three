import Vue from 'vue'
import router from '@/router/index'
import App from './App.vue'
import 'normalize.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
