<!--商品修改模态框-->
<template>
  <div>

    <el-form label-width="80px" status-icon :model="fromData" ref="form" :rules="rules">
      <el-form-item label="商户名称" prop="name">
        <el-input v-model="fromData.name"></el-input>
      </el-form-item>
      <el-form-item label="商户地址" prop="address">
        <el-input v-model="fromData.address"></el-input>
      </el-form-item>
      <el-form-item label="商户电话" prop="phone">
        <el-input v-model="fromData.phone"></el-input>
      </el-form-item>
      <el-form-item label="经度" prop="longitude">
        <el-input  v-model="fromData.longitude"></el-input >
      </el-form-item>
      <el-form-item label="纬度" prop="latitude">
        <el-input v-model="fromData.latitude"></el-input>
      </el-form-item>
      <el-form-item label="营业起始时间" prop="openTimeFrom">
        <el-input v-model="fromData.openTimeFrom"></el-input>
      </el-form-item>
      <el-form-item label="营业结束时间" prop="openTimeTo">
        <el-input v-model="fromData.openTimeTo"></el-input>
      </el-form-item>
      <el-form-item label="商户备注" prop="remark">
        <el-input v-model="fromData.remark"></el-input>
      </el-form-item>
       <el-form-item label="商户状态" prop="state">
         <el-select v-model="fromData.state">
           <el-option></el-option>
         </el-select>
       </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import Axios from "axios";

  export default{
    name:"MaintenanceEdit",
    data(){
      return{
        //验证执行
        rules: {
          name: [{
            message: "商户名称不能为空 !",
            required: true,
            trigger: "blur"
          }],
          address: [{
            message: "商户地址不能为空 !",
            required: true,
            trigger: "blur"
          }],
          phone: [{
            message: "商户电话不能为空 !",
            required: true,
            trigger: "blur"
          }],
          longitude: [{
            message: "经度不能为空 !",
            required: true,
            trigger: "blur"
          }],
          latitude: [{
            message: "纬度不能为空 !",
            required: true,
            trigger: "blur"
          }],
          openTimeFrom: [{
            message: "营业起始时间不能为空 !",
            required: true,
            trigger: "blur"
          }],
          openTimeTo: [{
            message: "营业结束时间不能为空 !",
            required: true,
            trigger: "blur"
          }],
          remark: [{
            message: "商户描述不能为空 !",
            required: true,
            trigger: "blur"
          }],
          state: [{
            message: "商户类型不能为空 !",
            required: true,
            trigger: "blur"
          }],
        }
      }
    },
    props:{
      fromData: {}
    },
    created() {
      //加载所有商品类型信息
      this.getCommodityTypeAll();
    },
    //触发验证
    async validate() {
      return new Promise<boolean>(resolve => {
        (this.$refs.form).validate((value) => {
          resolve(value);
        })
      });
    }
  }
</script>

<style scoped>

</style>
