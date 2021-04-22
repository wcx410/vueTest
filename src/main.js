import Vue from 'vue'
import App from './App.vue'

//导入elementui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from "axios"
import Store from '../vuex/store.js'

Vue.use(ElementUI)



Axios.defaults.baseURL="http://localhost:8090/xsyx/"

Vue.prototype.$axios = Axios

new Vue({
  el: '#app',
  render: h => h(App),
  store:Store  //挂载store
})
