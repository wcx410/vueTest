import {RouteConfig} from "vue-router";
import ShopShouhuo from "../../components/shop/Shouhuo/ShopShouHuo"
import ShopTihuo from "../../components/shop/Tihuo/ShopTihuo"
import ShopSearch from "../../components/shop/Search/ShopSearch"
import ShopStatistics from "../../components/shop/Statistics/ShopStatistics"

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
  }
]

export default ShopRouter;
