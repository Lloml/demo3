import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import echarts from 'echarts'
import * as API from './api/index'
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.prototype.$api = API

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
