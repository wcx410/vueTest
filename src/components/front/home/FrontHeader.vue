<template>
<div>
  <el-header style="position: fixed;width: 100%;z-index: 10;margin-top: -9px;">
    <el-menu :default-active="'1'" mode="horizontal">
      <el-menu-item index="9">
        <el-image style="width: 60px; height: 60px" src="./src/assets/mcimg/logos.png"></el-image>
      </el-menu-item>
      <el-menu-item index="1"><i class="el-icon-house"/>首页</el-menu-item>
      <el-menu-item class="right" index="8">
        <el-button round type="success" plain>现在下单</el-button>
      </el-menu-item>
      <el-menu-item class="right" index="7">联系客服</el-menu-item>
      <el-menu-item class="right" index="6" @click="$router.replace('/zc')">注册</el-menu-item>
      <el-menu-item class="right" index="5" @click="$router.push('/userhome')">个人首页</el-menu-item>

      <el-menu-item class="right" index="5" @click="$router.replace('/login')" v-show="xs">登录</el-menu-item>
      <!--<el-avatar shape="square" class="right" style="margin-top: 10px"
                 :size="'small'" :fit="'fit'" src="./assets/mcimg/6.png" v-show="bxs">
      </el-avatar>-->
      <!--购物车-->
      <el-submenu class="right" index="4" >
        <template slot="title">
          <i class="el-icon-shopping-cart-2">
            <el-badge :value="carData ? carData.length : 0" :max="99" type="success" style="margin-top: -30px;margin-left: -8px"/>
          </i>
        </template>
        <!--购物车模板-->
        <shopping-cart :car-data="carData"></shopping-cart>
      </el-submenu>
      <el-menu-item class="right" index="3"><i class="el-icon-scissors"></i>每日特价</el-menu-item>
      <el-submenu class="right" index="2">
<!--        <template slot="title">-->
        <template slot="title">
          <i class="el-icon-notebook-2"></i>商品分类</template>
        <hot-type-top></hot-type-top>
<!--        </template>-->
      </el-submenu>
      <el-menu-item class="right">
        <home-query ref="search"></home-query>
      </el-menu-item>
    </el-menu>



  </el-header>

</div>

</template>

<script>
    import ShoppingCart from "./ShoppingCart";
    import HomeQuery from "./HomeQuery";
    import {UserHelper} from "../../../helper/front/UserHelper";
    import {ShoppingCartHelper} from "../../../helper/front/ShoppingCartHelper";
    import HotTypeTop from "./HotTypeTop";

    let shoppingCartHelper = new ShoppingCartHelper();

    export default {
      name:"FrontHeader",
        data(){
          return{
            'xs':true,
            'bxs':false,
            carData:null
          }
        },
      components:{
          ShoppingCart,
          HomeQuery,
          HotTypeTop
      },
      methods:{
        xianshi(){
          if (UserHelper.userId===null){

            this.xs=true
            this.bxs=false;
          }else {
            this.xs=false
            this.bxs=true;
          }
        }
      },
      created() {
          var _this = this;
            shoppingCartHelper.getShoppingData().then(value => {
                _this.carData = value;
            })
            this.xianshi();
        },

        mounted() {

        }
    }
</script>

<style scoped>
    .el-menu--horizontal > .el-menu-item.is-active {
        border-bottom: 2px solid #67C23A;
    }

    .right {
        float: right !important;
    }
</style>
