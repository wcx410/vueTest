import  UpdateUser from "../../space/space/UpdateUser"
import Information from "../../space/space/Information"
import footprint from "../../space/foot/footprint"
import Collection from "../../space/collection/Collection"
import BuyGoods from "../../space/goods/BuyGoods"
import Evaluate from "../../space/evaluate/Evaluate";
import Message from "../../space/message/Message";
import MessageHome from "../../space/message/MessageHome";
import Merchant from "../../space/Merchant/Merchant";
const UserRoutes = [
  {
    path: '/evaluate',
    component: Evaluate
  },
  {
    path: '/msghome',
    component: MessageHome,

  },
 {
    path: '/updateuser',
    component: UpdateUser
  },
  {
    path: '/goods',
    component: BuyGoods
  },
  {
    path: '/info',
    component: Information
  },
  {
    path: '/collection',
    component: Collection
  },
  {
    path: '/foot',
    component: footprint
  },

]

export default UserRoutes
