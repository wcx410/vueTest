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
        <el-date-picker
          v-model="fromData.openTimeFrom"
          type="datetime"
          placeholder="选择营业起始时间" format="yyyy/MM/dd HH:mm:ss">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="营业结束时间" prop="openTimeTo">
        <el-date-picker
          v-model="fromData.openTimeTo"
          type="datetime"
          placeholder="选择营业结束时间" format="yyyy/MM/dd HH:mm:ss">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="商户备注" prop="remark">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="fromData.remark">
        </el-input>
      </el-form-item>
       <el-form-item label="商户状态" prop="state">
         <el-select v-model="fromData.state">
           <el-option
             v-for="item in options"
             :key="item.value"
             :label="item.label"
             :value="item.value">
           </el-option>
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
        options:[{ value: 0,
                   label: '冻结'},
          { value: 1,
            label: '正常'},
          { value: -1,
            label: '删除'}
        ],
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
    filters: {
      state:function(value){
        if (value == 0) return "冻结";
        if (value == 1) return "正常";
        if (value == -1) return "删除";
        return value;
      }
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
