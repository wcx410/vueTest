<template>
  <div class="xsyx-block">
    <el-row>
      <div class="xsyx-flag" style="background-color: #FF7034"></div>
      <label style="font-size: 20px;color: #FF7034;display: inline">热销商品</label>
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
        name: "HotSale",
      data(){
          return{}
      },
      components:{
          Commodity
      },
      props:["data"]
    }
</script>

<style scoped>

</style>
