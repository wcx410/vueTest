import {RouteConfig} from "vue-router";
import Commodity from "./components/back/home/Commodity/Commodity.vue";
import CommodityEdit from "./components/back/home/Commodity/CommodityEdit.vue";
import CommodityImages from "../../components/back/home/Commodity/CommodityImages";
import CommodityTypeMaintain from "./components/back/home/Commodity/CommodityTypeMaintain.vue";
import CommodityLableMaintain from "./components/back/home/Commodity/CommodityLableMaintain.vue";
import CustomerMaintain from "./components/back/home/Customer/CustomerMaintain.vue"
/**
 * 后台路由
 */
const BackRouter = [
    // {path: '/', component: BackHome,},
     //商品资料维护
    {path:"/commodity",component:Commodity},
    //商品类型维护
    {path:"/typemaintain",component:CommodityTypeMaintain},
    //商品标签维护
    {path:"/lablemaintain",component:CommodityLableMaintain},
    // //配送管理
    // {path:"/peison",component:Distribution},
    /*{
        path: '/aaa',
        component: BackHome,
        children: [
            {
                path: '/aaa',
                component: BackHome,
            }
        ]
    }*/
    // //商户管理
    // {path:"/merchants",component: MerchantsMaintain},
    // //员工管理
    // {path:"/empManagement",component:EmpManagement},
    // //角色管理
    // {path:"/roleManagement",component:RoleManagement},
    // //权限管理
    // {path:"/permissionManagement",component:PermManagement},
    //
    // {path:"/customermaintain",component:CustomerMaintain},
    //
    // {path: "/merchantsApply",component: MerchantsApply}
]

export default BackRouter;
