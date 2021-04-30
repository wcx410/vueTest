import Vue from 'vue'
import VueRouter, {RouteConfig} from "vue-router"
import FrontHome from "../views/front/FrontHome";
import Commodity from "../components/back/home/Commodity/Commodity";
import CommodityEdit from "../components/back/home/Commodity/CommodityEdit"
import CommodityImages from "../components/back/home/Commodity/CommodityImages";
import CommodityLableMaintain from "../components/back/home/Commodity/CommodityLableMaintain";
import CommodityTypeMaintain from "../components/back/home/Commodity/CommodityTypeMaintain";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: FrontHome
  },
  /**
   * 后台路由,访问地址 /back/.....
   */
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
