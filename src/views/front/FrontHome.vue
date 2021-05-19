<template>
  <div>
    <el-container>
      <front-header></front-header>

      <el-main style="margin-top: 50px">
        <!--巨幕-->
        <hugescreen></hugescreen>
        <!--热门分类-->
        <hot-types></hot-types>
        <!--新品上市-->
        <new-commodity :data="homeData"></new-commodity>
        <!--热销商品-->
        <!--<hot-sale :data="homeData.hotSale"></hot-sale>-->
        <!--猜你喜欢-->
        <!--<guess-likes :data="homeData.guessLikes"></guess-likes>-->
      </el-main>

      <el-footer style="margin: 100px -10px -10px -10px;padding: 0;">
        <!--页尾-->
        <home-footer></home-footer>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import FrontHeader from "../../components/front/home/FrontHeader";
  import Hugescreen from "../../components/front/home/Hugescreen";
  import HotTypes from "../../components/front/home/HotTypes";
  import NewCommodity from "../../components/front/home/NewCommodity";
  import HotSale from "../../components/front/home/HotSale";
  import GuessLikes from "../../components/front/home/GuessLikes";
  import HomeFooter from "./Footer";
  import {ShoppingCartHelper} from "../../helper/front/ShoppingCartHelper";

  let shoppingCartHelper = new ShoppingCartHelper();

  export default {
        name: "FrontHome",
      components:{
          FrontHeader,
          Hugescreen,
          HotTypes,
          NewCommodity,
          HotSale,
          GuessLikes,
          HomeFooter
      },
      data(){
          return{
            homeData:[],
            carData:null
          }
      },
      created() {
          var _this = this;

          /*shoppingCartHelper.getShoppingData().then(value => {
            _this.carData = value;
          })*/

        this.$axios.get("/commodity/queryHome").then(function (result) {
          console.log(result);
          _this.homeData=result.data;
        }).catch();

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
