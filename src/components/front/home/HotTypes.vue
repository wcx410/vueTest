<template>
  <div class="xsyx-block">
    <el-row>
      <div class="xsyx-flag" style="background-color: #2CAEF8"></div>
      <label style="font-size: 20px;color: #2CAEF8;display: inline">热门分类</label>
      <el-link style="float: right">更多分类 >></el-link>
      <div class="xsyx-line"></div><br>
    </el-row>
    <el-row>
      <div class="xsyx-type-box">
        <commodity-type v-for="(item,index) in data" :data="item" :index="index" :key="index"></commodity-type>
      </div>
    </el-row>
  </div>
</template>

<script>
  import CommodityType from "./CommodityType";

    export default {
        name: "HotTypes",
      data(){
        return{
          data:[]
        }
      },
      mounted() {
          var _this = this;
          this.$axios.get("/comType/queryHot").then(function (result) {
            _this.data=result.data;
          }).catch()
      },
      components:{
          CommodityType
      }
    }
</script>

<style scoped>

</style>
