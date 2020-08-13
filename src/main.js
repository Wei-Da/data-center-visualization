import Vue from 'vue'

import '@/styles/index.css'

import veCharts from 'vue-echarts'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import moment from 'moment'
import axios from 'axios'
import lodash from 'lodash'

import App from './App.vue'

Vue.use(ElementUI);
Vue.component('v-chart', veCharts)

Vue.prototype.axios = axios
Vue.prototype._ = lodash
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
