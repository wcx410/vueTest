<template>
  <!--我的足迹-->
    <div>
      <el-page-header content="个人首页"></el-page-header>
      <el-row v-for="foot in commodity">
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-image fit="cover" style="width: 150px;height: 150px; margin-left: 20px;margin-top: 20px"></el-image>
            <div style="font-size: 18px;margin-left: 250px;margin-top: -140px;width: 300px;height: 100px;">
              <!--商品描述-->
              <span>{{foot.particulars}}</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import userhelper from  "../../helper/front/UserHelper"
    export default {
        name: "footprint",
       data(){
          return{
            commodity:[]
          }
       },
      methods:{
          getfoot(){
            var _this =this;
            var params = new URLSearchParams();
            params.append("uid",userhelper.userId);
            this.$axios.post("foot/queryFoot",params).then(function (response) {
              _this.commodity = response.data;
            }).catch();
          }
      },
      created() {
          this.getfoot();
      }

    }
</script>

<style scoped>

</style>
