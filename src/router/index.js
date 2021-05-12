import Vue from 'vue'
import VueRouter, {RouteConfig} from "vue-router"
import FrontHome from "../views/front/FrontHome";
import Commodity from "../components/back/home/Commodity/Commodity";
import Login from "../components/login/Login"
import UserHome from "../space/home/UserHome"
import UserRoutes from '../router/user/user'
import ShopCar from "../space/shopCar/ShopCar"
import CommodityEdit from "../components/back/home/Commodity/CommodityEdit"
import CommodityImages from "../components/back/home/Commodity/CommodityImages";
import CommodityLableMaintain from "../components/back/home/Commodity/CommodityLableMaintain";
import CommodityTypeMaintain from "../components/back/home/Commodity/CommodityTypeMaintain";
import BackHome from "../views/back/BackHome";
import BackRouter from "./back/backRouter";

import ShopHome from "../views/shop/ShopHome";
import ShopRouter from "./shop/ShopRouter";
import Merchant from "../space/Merchant/Merchant";
import Message from "../space/message/Message";
import demo from "../space/message/demo";

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
    path: '/msg',
    component: Message
  },
  {
    path: '/apply',
    component: Merchant
  },
  {
    path: '/',
    component: FrontHome
  },
  {
    path: '/shop',
    component: ShopHome,
    children: ShopRouter
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
    path: '/userhome',
    component: UserHome,
    children:UserRoutes
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
