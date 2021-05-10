<template>
    <div>
      <el-container>
        <el-header style="position: fixed;width: 100%;z-index: 10;margin-top: -9px;">
          <el-menu :default-active="'1'"
                   mode="horizontal">

            <el-menu-item><i class="el-icon-house" style="margin-left:90px;" @click="$router.replace('/')"/>首页</el-menu-item>
            <el-menu-item class="right">
              <el-image style="width: 55px; height: 50px;" src=""></el-image>
            </el-menu-item>
            <el-menu-item class="right" index="8" >关于我们</el-menu-item>
            <el-menu-item class="right" index="7" >联系客服</el-menu-item>
            <el-menu-item class="right" index="6">注册</el-menu-item>
            <el-menu-item class="right" index="5">登录</el-menu-item>
            <el-menu-item index="3"><i class="el-icon-scissors"></i>每日特价</el-menu-item>
          </el-menu>
        </el-header>

        <el-container>

          <el-row height="" style="margin-top: 50px;">
            <el-menu :default-active="1"  style="margin-top: 30px"
                     mode="horizontal" >

              <el-menu-item>
                <el-image style="width: 100px;margin-left: 100px ;margin-top: -30px" src=""></el-image>
              </el-menu-item>
              <el-menu-item>
                <el-menu-item style="font-size: 25px;margin-left: -50px;margin-top: 5px">购物车</el-menu-item>
              </el-menu-item>
              <el-menu-item style="margin-left: 200px;margin-top: -50px">
                <el-input placeholder="请输入内容"  class="fount">
                  <i slot="prefix" class="el-input__icon el-icon-search"></i>

                  <el-button slot="append">搜索</el-button>
                </el-input>
              </el-menu-item>
            </el-menu>
          </el-row>
        </el-container>
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          style="margin-left: 110px"
          active-text-color="#ffd04b">
          <el-menu-item index="1" style="font-size: 20px">全部商品</el-menu-item>
          <el-menu-item index="2" style="font-size: 20px">库存紧张</el-menu-item>

          <div class="zj">
            <div class="hh">
              <el-select v-model="mers">
                <el-option  v-for="type in mer" :value="type.id" :label="type.name" :key="type.id" :index="type.id"></el-option>
              </el-select>
            </div>
            已选择商品 总价：
          </div>
          <div style="color: #EA6650;font-size: 20px;margin-left: 1470px;margin-top: -27px">
            {{zj}}
            <el-button type="danger" size="small" style="margin-left: 10px" @click="addOrder(Shopcar.id,zj)">
              结算</el-button>
          </div>

        </el-menu>
        <div style="margin-left: -150px">
          <!--表头-->
          <el-row >
            <div style="margin-left: 320px;margin-top: 40px" ></div>
            <div style="font-size: 20px;margin-left: 570px;margin-top: -20px">商品信息</div>
            <div style="font-size: 20px;margin-left: 1010px;margin-top: -20px">数量</div>
            <div style="font-size: 20px;margin-left: 1360px;margin-top: -22px">单价</div>
            <div style="font-size: 20px;margin-left: 1555px;margin-top: -27px">操作</div>
            <!--<div style="font-size: 20px;margin-left: 1755px;margin-top: -32px">选择商户</div>-->
          </el-row>

          <el-main>
            <el-col :span="24">
              <div class="sp" v-for="(Shopcar,index) in MyShopcar" :key="index">
                <div style="height: 180px">
                  <!--复选框，可选中结算-->
                  <el-checkbox style="margin-left: 20px;top: -90px" v-model="Shopcar.checked" :min="0" @change="zongjia"></el-checkbox>
                  <!--商品的图片-->
                  <el-image fit="cover" style="width: 150px;height: 150px; margin-left: 20px;margin-top: 20px" v-if="Shopcar.cid.image" :src="'{{$host + Shopcar.cid.image}}'" ></el-image>
                  <div style="font-size: 18px;margin-left: 250px;margin-top: -140px;width: 300px;height: 100px;">
                    <!--商品描述-->
                    <span>{{Shopcar.particulars}}</span>
                  </div>

                  <div class="danjia">
                  </div>
                  <!--数量-->
                  <div class="numbers">
                    <el-input-number v-model="Shopcar.number" @change="handleChange" :min="1"></el-input-number>
                  </div>
                  <!--商品的单价-->
                  <div class="allmoney">
                    <span>￥{{Shopcar.price}}</span>
                  </div>
                  <!--操作-->
                  <div class="cz">
                    <br>
                    <el-link type="success" @click="del(Shopcar.id)">移除购物车</el-link>
                  </div>

                </div>
              </div>
            </el-col>
          </el-main>
        </div>
      </el-container>
    </div>
</template>

<script>
  import userhelper from  "../../helper/front/UserHelper"
    export default {
        name: "ShopCar",
        data(){
            return {
              selectId:[],
              checkAll:false,
              price:0,
              zj:0,
              checked:false,
              isdelete:0,
              ordstate:0,
              MyShopcar:[],
              Shopcar:{
                checked:false
              },
            }
        },
        methods:{
          addOrder(){
            this.MyShopcar.forEach(value => {
              if (value.checked) this.Shopcar = value;
            });
            var params = new URLSearchParams();
            this.isdelete=this.Shopcar.number;
          },
          //初始化购物车
          getShopCar(){
            var _this =this;
            var params = new URLSearchParams();
            params.append("uid",userhelper.userId);
            this.$axios.post("shopCar/shopCarAndCommodities",params).then(function (response) {
              _this.MyShopcar = response.data;
            }).catch();
          },
          //计算总价
          zongjia(){
            for (let i of this.MyShopcar) {
              if (i.checked) {
                this.zj += i.number * i.price;
              }
            }
              // return this.zj = this.MyShopcar.price * this.MyShopcar.number;
          },
          //根据商品id删除
          del(sid){
            var _this =this;
            var params = new URLSearchParams();
            params.append("sid",sid);
            this.$axios.post("",params).then(function (response) {

            }).catch();
          }
        },
      created() {
        this.getShopCar();
      }
    }
</script>

<style scoped>
  .right {
    float: right !important;
  }
  .fount{
    margin-left: 1300px;
    width: 300px;
  }
  .zj{
    margin-left: 1300px;
    font-size: 20px;
    margin-top: 40px;
    width:200px;
  }
  .sp{
    width: 1700px;
    border-radius: 4px;
    border: 1px solid #FAF3F4;

    /*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);*/
    margin-left: 300px;
    /*background-color: #FDF4F2;*/

  }
  .hh{
    font-size: 18px;
    /*margin-top: 40px;*/
    /*margin-left: 1030px;*/
    width: 150px;
    height: 50px;
  }

  .danjia{
    font-size: 18px;
    margin-left: 790px;
    width: 150px;
    height: 50px;
    margin-top: -100px;
  }
  .numbers{
    width: 150px;
    height: 50px;
    margin-top: -10px;
    margin-left: 630px;
  }
  .allmoney{
    font-size: 18px;
    margin-top: -50px;
    margin-left: 1040px;
    width: 150px;
    height: 50px;
  }
  .cz{
    font-size: 18px;
    margin-top: -50px;
    margin-left: 1240px;
    width: 150px;
    height: 50px;
  }
</style>
