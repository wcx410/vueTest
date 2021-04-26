<template>
  <div class="xsyx-block">
    <el-row>
      <div class="xsyx-flag" style="background-color: #A0918A"></div>
      <label style="font-size: 20px;color: #A0918A;display: inline">猜你喜欢</label>
      <el-link style="float: right">更多商品 >></el-link>
      <div class="xsyx-line"></div><br>
    </el-row>

    <el-row>
      <div class="xsys-commodity-box">
        <commodity v-for="(item,index) in data" :key="index" :data="item"></commodity>
      </div>
    </el-row>
  </div>
</template>

<script>
  import Commodity from "./Commodity";

    export default {
        name: "GuessLikes",
      components:{
          Commodity
      },
      data(){
          return{
            data:[]
          }
      }
    }
</script>

<style scoped>

</style>
