<template>
    <div>
      <el-container>

        <el-header style="position: fixed;width: 100%;z-index: 10;margin-top: -9px;">
          <el-menu :default-active="'1'"
                   mode="horizontal">
            <el-menu-item>
              <el-image style="width: 60px; height: 60px" src=""></el-image>
            </el-menu-item>
            <el-menu-item><i class="el-icon-house" @click="goHome"/>首页</el-menu-item>
            <el-menu-item class="right">
              <el-image style="width: 55px; height: 50px" src=""></el-image>
            </el-menu-item>
            <el-menu-item class="right" index="8">关于我们</el-menu-item>
            <el-menu-item class="right" index="7">联系客服</el-menu-item>

            <el-menu-item index="3"><i class="el-icon-scissors"></i>每日特价</el-menu-item>
          </el-menu>
        </el-header>

        <el-container>
          <div style="width: 2000px; height: 800px">
            <el-col>
              <!--                <el-aside width="200px" style="background-color: white;margin-left: 5%;margin-top: 50px">-->
              <el-col style="width: 420px">
                <div style="margin-top: 130px;width: 185px;margin-left: 65px">

                  <el-menu router default-active="2"
                           class="el-menu-vertical-demo"
                           @open="handleOpen"
                           @close="handleClose">
                    <!--                        <div style="margin-left: -60px">-->
                    <!--                            <i class="el-icon-more"></i>-->
                    <!--                        </div>-->
                    <el-menu-item style="font-weight: bolder;font-size: 17px"><i class="el-icon-more"></i>全部功能</el-menu-item>

                    <el-submenu index="1">
                      <template slot="title">
                        <i class="el-icon-user"></i>
                        <span>个人中心</span>
                      </template>
                      <el-menu-item-group>
                        <el-menu-item @click="$router.push('/info')">显示个人信息</el-menu-item>
                        <el-menu-item  @click="$router.push('/updateuser')">修改个人信息</el-menu-item>
                      </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item @click="goShopCar"><i class="el-icon-shopping-cart-full"/>我的购物车</el-menu-item>
                    <!--index="./goods"-->
                    <el-menu-item @click="$router.push('/goods')"><i class="el-icon-shopping-bag-2"/>已买到的宝贝</el-menu-item>
                    <el-menu-item @click="$router.push('/collection')"><i class="el-icon-star-off"/>我的收藏</el-menu-item>
                    <el-menu-item  @click="$router.push('/msghome')"><i class="el-icon-s-comment"/>我的消息</el-menu-item>
                    <el-menu-item @click="$router.push('/evaluate')"><i class="el-icon-chat-line-round"/>评价管理</el-menu-item>
                    <el-menu-item @click="$router.push('/foot')"><i class="el-icon-bicycle"/>我的足迹</el-menu-item>
                  </el-menu>
                </div>
              </el-col>
              <el-container>
                <el-col :span="18" style="margin-left: -110px;width: 1200px">

                  <div style="margin-top: 90px; width: 2200px;margin-left: -5px">
                    <!--                                <el-menu :default-active="'1'" :src="require('@/assets/mcimg/16.png')"-->
                    <!--                                         mode="horizontal"  style="width: 1100px;height: 150px;" class="bjtp">-->
                    <!--                                    <el-menu-item>-->
                    <!--                                        <div class="block"><el-avatar :size="50" :src="require('@/assets/mcimg/16.png')"></el-avatar></div>-->
                    <!--                                    </el-menu-item>-->
                    <!--                                    <el-menu-item>嘤嘤嘤(里面也加入账号)</el-menu-item>-->

                    <!--                                    <el-menu-item class="right" >我的收获地址</el-menu-item>-->
                    <!--                                    <el-menu-item class="right" >我的积分折扣</el-menu-item>-->
                    <!--                                </el-menu>-->

                    <!--                                <el-menu :default-active="'1'"-->
                    <!--                                         mode="horizontal" style="width: 900px">-->
                    <!--                                    <el-menu-item>代付款</el-menu-item>-->
                    <!--                                    <el-menu-item style="cursor: default">|</el-menu-item>-->
                    <!--                                    <el-menu-item>代发货</el-menu-item>-->
                    <!--                                    <el-menu-item style="cursor: default">|</el-menu-item>-->
                    <!--                                    <el-menu-item>待评价</el-menu-item>-->
                    <!--                                    <el-menu-item style="cursor: default">|</el-menu-item>-->
                    <!--                                    <el-menu-item>退款</el-menu-item>-->
                    <!--                                </el-menu>-->

                  </div>
                  <div>
                    <router-view></router-view>
                  </div>
                </el-col>
              </el-container>

            </el-col>

          </div>
        </el-container>
      </el-container>
    </div>
</template>

<script>
  import userhelper from  "../../helper/front/UserHelper"
  // import UpdateUser from "../space/space/UpdateUser"
  // import Information from "../space/space/Information.vue"
    export default {
        name: "UserHome",
        data(){
            return {

            }
        },
        methods:{
          goShopCar(){
            if (sessionStorage.getItem("user")==null){
              this.$router.push('/login')
            }else {
              this.$router.push("/shopCar")
            }
          },
          goHome(){
            this.$router.push('/');
          },
          handleOpen() {

          },
          handleClose() {

          }
      },
      components:{
        // UpdateUser,
        // Information
      }
    }
</script>

<style scoped>
  .right {
    float: right !important;
  }
  .day{
    width: 350px;
    height: 240px;
    margin-left: 202px;
    margin-top: 130px;
  }

  .day1{
    width:350px;
    height: 40px;
    background-color: #A9D6BA;
    text-align: center;
    font-size: 19px;
    line-height: 40px;
  }
  .day2{
    width: 350px;
    height: 200px;
    background-color: #F9F9F5;
  }
</style>
