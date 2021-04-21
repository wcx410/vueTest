import Vue from 'vue'
import App from './App.vue'

//导入elementui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

import Axios from "axios"

Axios.defaults.baseURL="http://localhost:8090/xsyx/"

Vue.prototype.$axios = Axios

new Vue({
  el: '#app',
  render: h => h(App)
})
