import Vue from 'vue'
import App from './App.vue'
import App1 from "./App1";

//导入elementui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from "axios"
import Store from './store/store.js'

import router from "./router";

Vue.use(ElementUI)


Axios.defaults.baseURL="http://localhost:8090/xsyx/"

Vue.prototype.$axios = Axios

new Vue({
  el: '#app',
  render: h => h(App1),
  store:Store,  //挂载store
  router
})
