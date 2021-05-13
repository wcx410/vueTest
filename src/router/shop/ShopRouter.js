import {RouteConfig} from "vue-router";
import ShopShouhuo from "../../components/shop/Shouhuo/ShopShouHuo"
import ShopTihuo from "../../components/shop/Tihuo/ShopTihuo"
import ShopSearch from "../../components/shop/Search/ShopSearch"
import ShopStatistics from "../../components/shop/Statistics/ShopStatistics"
import ShopMaintenance from "../../components/shop/Maintenance/ShopMaintenance"
import MaintenanceApply from "../../components/shop/Maintenance/MaintenanceApply";
import ShopMessage from "../../components/shop/Message/ShopMessage"

/**
 * 商户路由
 */
const ShopRouter = [
  {
    path: '/shouhuo',
    component: ShopShouhuo
  },
  {
    path: '/tihuo',
    component: ShopTihuo
  },
  {
    path: '/search',
    component: ShopSearch
  },
  {
    path: '/statistics',
    component: ShopStatistics
  },
  {
    path: '/maintenance',
    component: ShopMaintenance
  },
  {
    path: '/maintenanceapply',
    component: MaintenanceApply
  },
  {
    path: '/message',
    component: ShopMessage
  }
]

export default ShopRouter;
