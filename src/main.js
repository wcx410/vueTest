import Vue from 'vue'
import App from './App.vue'
import App1 from "./App1";

//导入elementui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from "axios"
import Store from './store/store.js'
import * as echarts from 'echarts';
Axios.defaults.withCredentials = true;

Vue.prototype.$echarts = echarts
Vue.use(ElementUI)
import router from "./router/index"


Axios.defaults.baseURL="http://localhost:8090/xsyx/";
Axios.defaults.withCredentials = true;

Vue.prototype.$axios = Axios

new Vue({
  el: '#app',
  store:Store,  //挂载store
  router,
  render: h => h(App1)
})
