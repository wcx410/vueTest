import Vue from 'vue'
import VueRouter, {RouteConfig} from "vue-router"
import FrontHome from "../views/front/FrontHome";
import UserHome from "../space/home/UserHome.vue"
import UserRoutes from '../router/user/user'
import ShopCar from "../space/shopCar/ShopCar"
import Login from "../components/login/Login"
import Commodity from "../components/back/home/Commodity/Commodity";
import CommodityEdit from "../components/back/home/Commodity/CommodityEdit"
import CommodityImages from "../components/back/home/Commodity/CommodityImages";
import CommodityLableMaintain from "../components/back/home/Commodity/CommodityLableMaintain";
import CommodityTypeMaintain from "../components/back/home/Commodity/CommodityTypeMaintain";
import BackHome from "../views/back/BackHome";
import BackRouter from "./back/backRouter";


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/shopCar',
    component: ShopCar
  },
  {
    path: '/',
    component: FrontHome
  },
  {
      path: '/userhome',
    component: UserHome,
    children:UserRoutes
  },
  /**
   * 后台路由,访问地址 /back/.....
   */
  {
    path: '/back',
    component: BackHome,
    children: BackRouter
  },
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
})
/**
 * 静态根路由
 */
/*export class RootRouter {

}*/


export default router
