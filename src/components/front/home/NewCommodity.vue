<template>
  <div class="xsyx-block">

    <el-row>
      <div class="xsyx-flag" style="background-color: #8558D6"></div>
      <label style="font-size: 20px;color: #8558D6;display: inline">新品上市</label>
      <el-link style="float: right">更多新品 >></el-link>
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
        name: "NewCommodity",
      data(){
          return{

          }
      },
      components:{
          Commodity
      },
      props:["data"]


    }
</script>

<style scoped>

</style>
