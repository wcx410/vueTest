import Vue from 'vue'
import VueRouter, {RouteConfig} from "vue-router"
import FrontHome from "../views/front/FrontHome";
import Registered from "../views/front/Registered"
import Login from "../views/front/Login"
import BackLogin from "../views/back/BackLogin"
import Commodity from "../components/back/home/Commodity/Commodity";
import CommodityLableMaintain from "../components/back/home/Commodity/CommodityLableMaintain";
import Emp from "../components/back/home/system/emp/EmpManagement";
import EmpManagementEdit from "../components/back/home/system/emp/EmpManagementEdit";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: FrontHome
  },
  {
    path:'/zc',
    component:Registered
  },
  {
    path:'/login',
    component:Login
  },
  {path:'/emp',component:Emp},
  {path:'/empedit',component:EmpManagementEdit},
  {path:'/backLogin',component:BackLogin},
  {
    path: '/com',
    component: Commodity
  },
  {
    path: '/lb',
    component: CommodityLableMaintain
  }
]


const router = new VueRouter({
  routes
});


export default router
