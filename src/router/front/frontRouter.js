import Register from "../../views/front/Registered";
import VueRouter from "vue-router/types/router";


const FontRouter=[
  {
    path:'/zc',
    component:Register
  },
  {
    path:'/login',
    component:Register
  }
];
const Font = new VueRouter({
  routes
});
export default Font;
