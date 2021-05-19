<template>
  <!--我的评价-->
  <div>
    <el-page-header content="个人首页"></el-page-header>
    <el-row v-for="shop in shopEvaluate">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-image fit="cover" style="width: 150px;height: 150px; margin-left: 20px;margin-top: 20px"></el-image>
          <div style="font-size: 18px;margin-left: 250px;margin-top: -140px;width: 300px;height: 100px;">
            <!--商品描述-->
            <span>{{shop.particulars}}</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import userhelper from  "../../helper/front/UserHelper"
    export default {
      name: "Evaluate",
      data(){
        return{
          shopEvaluate:[],
        }
      },
      methods:{
          getComments(){
            var _this =this;
            var params = new URLSearchParams();
            params.append("uid",sessionStorage.getItem("user"));
            this.$axios.post("evaluate/getComments",params).then(function (response) {
              _this.shopEvaluate = response.data;
            }).catch();
          }
      },
      created() {
        this.getComments();
      }
    }
</script>

<style scoped>

</style>
