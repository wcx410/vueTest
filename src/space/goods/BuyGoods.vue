<template>
  <div>

      <el-menu :default-active="'1'"
               mode="horizontal" style="width: 1200px">
        <el-menu-item style="cursor: default">|</el-menu-item>
        <el-menu-item @click="">代发货</el-menu-item>
        <el-menu-item style="cursor: default">|</el-menu-item>
        <el-menu-item @click="">待收货</el-menu-item>
        <el-menu-item style="cursor: default">|</el-menu-item>
        <el-menu-item>已收货</el-menu-item>
      </el-menu>


    <el-row>
      <div style="font-size: 20px;margin-left: 0px;margin-top: 20px;margin-left: 150px"></div>
      <div style="font-size: 20px;margin-left: 0px;margin-top: 20px;margin-left: 150px">宝贝</div>
      <div style="font-size: 20px;margin-left: 0px;margin-top: -20px;margin-left: 360px">单价</div>
      <div style="font-size: 20px;margin-left: 0px;margin-top: -23px;margin-left: 550px">数量</div>
      <div style="font-size: 20px;margin-left: 0px;margin-top: -24px;margin-left: 750px">实际付款</div>
      <div style="font-size: 20px;margin-left: 750px;margin-top: -24px;margin-left: 950px">操作</div>

    </el-row>
    <!--<el-row>-->
      <!--<el-col :span="24">-->
        <!--&lt;!&ndash;v-for="(da,index) in data" :key="index"&ndash;&gt;-->
        <!--<div class="sp">-->
          <!--<div style="height: 150px" >-->
            <!--<el-checkbox style="margin-left: 20px;top: -100px" v-model=""></el-checkbox>-->
            <!--&lt;!&ndash;<el-image fit="cover" style="width: 120px;height: 120px;margin-top: 30px" :src="require('@/assets/mcimg/logos.png')"></el-image>&ndash;&gt;-->
            <!--<div class="guige">-->
              <!--<span>订单号：</span><br><br>-->
              <!--<span>商品名字：</span>-->
            <!--</div>-->

            <!--<div class="danjia">-->
              <!--￥-->
            <!--</div>-->
            <!--<div class="numbers">-->


            <!--</div>-->
            <!--<div class="allmoney">-->

            <!--</div>-->

            <!--<div class="cz">-->
              <!--<el-button type="danger" size="small">确认收货</el-button>-->

              <!--<el-link type="success" @click="">添加至收藏夹</el-link>-->
              <!--<br><br>-->
              <!--<el-link type="success" >再次购买</el-link>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</el-col>-->
    <!--</el-row>-->

  </div>
</template>

<script>
  import userhelper from  "../../helper/front/UserHelper"
    export default {
      name: "BuyGoods",
      data(){
        return{
          goods:[],
        }
      },
      methods:{
        getoods(state){
          var _this =this;
          var params = new URLSearchParams();
          params.append("state",state);
          params.append("uid",userhelper.userId);
          this.$axios.post("buy/getBuyGoods",params).then(function (response) {
            _this.goods = response.data;
          }).catch();
        }
      },
      created() {
      }
    }
</script>

<style scoped>
  .sp{
    width: 1090px;
    border-radius: 4px;
    border: 1px solid #CCCCCC;

    /*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);*/
    margin-left: -20px;

  }
  .guige{
    font-size: 15px;
    margin-left: 160px;

    width: 150px;
    height: 100px;
    margin-top: -100px;

  }
  .danjia{
    font-size: 18px;
    margin-left: 360px;
    width: 150px;
    height: 50px;
    margin-top: -80px;
  }
  .numbers{
    font-size: 18px;
    width: 150px;
    height: 50px;
    margin-top: -48px;
    margin-left: 560px;
  }
  .allmoney{
    font-size: 18px;
    margin-top: -50px;
    margin-left: 780px;
    width: 150px;
    height: 50px;
  }
  .cz{
    font-size: 18px;
    margin-top: -85px;
    margin-left: 940px;
    width: 150px;
    height: 50px;
  }
</style>
