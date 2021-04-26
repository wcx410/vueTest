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
        <new-commodity></new-commodity>
        <!--热销商品-->
        <hot-sale></hot-sale>
        <!--猜你喜欢-->
        <guess-likes></guess-likes>
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
      }
    }
</script>

<style scoped>

</style>
