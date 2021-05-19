import Vue from 'vue'
import VueRouter, {RouteConfig} from "vue-router"
import FrontHome from "../views/front/FrontHome";
import Shopes from "../components/back/home/Customer/Shopes";
import CustomerMaintain from "../components/back/home/Customer/CustomerMaintain";
import Commodity from "../components/back/home/Commodity/Commodity";
import Login from "../views/front/Login"
import UserHome from "../space/home/UserHome"
import UserRoutes from '../router/user/user'
import ShopCar from "../space/shopCar/ShopCar"
import CommodityEdit from "../components/back/home/Commodity/CommodityEdit"
import CommodityImages from "../components/back/home/Commodity/CommodityImages";
import CommodityLableMaintain from "../components/back/home/Commodity/CommodityLableMaintain";
import CommodityTypeMaintain from "../components/back/home/Commodity/CommodityTypeMaintain";
import BackLogin from "../views/back/BackLogin"
import Registered from "../views/front/Registered"
import Emp from "../components/back/home/system/emp/EmpManagement";
import Role from "../components/back/home/system/role/RoleManagement";
import Per from "../components/back/home/system/permission/PermissionManagement";
import EmpManagementEdit from "../components/back/home/system/emp/EmpManagementEdit";
import BackHome from "../views/back/BackHome";
import BackRouter from "./back/backRouter";
import HomeSearch from '../views/front/HomeSearch.vue'
import ShopHome from "../views/shop/ShopHome";
import ShopRouter from "./shop/ShopRouter";
import Merchant from "../space/Merchant/Merchant";

import Demo from "../components/back/home/system/permission/demo";
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
    path: '/apply',
    component: Merchant
  },
  {
    path: '/',
    component: FrontHome
  },//引用Shopes.vue页面
  {
    path: '/shopes',
    component: Shopes
  },//引用CustomerMaintain.vue页面
  {
    path: '/customermaintain',
    component: CustomerMaintain
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
    path:'/zc',
    component:Registered
  },
  {
    path:'/login',
    component:Login
  },
  {path:'/emp',component:Emp},
  {path:'/demo',component:Demo},
  {path:'/role',component:Role},
  {path:'/per',component:Per},
  {path:'/empedit',component:EmpManagementEdit},
  {path:'/backLogin',component:BackLogin},

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
  },
  {
    path: '/spxq',
    component: Shopes
  },
  {
    path: '/HomeSearch',
    component: HomeSearch,
    name:"HomeSearch"
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

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router
