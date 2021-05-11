<template>
    <div style="width: 1000px;margin: auto">
      <h3>申请商户</h3>
      <el-form :model="applyForm" :rules="rules" ref="applyForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="商户名称" prop="name">
          <el-input v-model="applyForm.name" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label="商户地址" prop="address">
          <el-input v-model="applyForm.address" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">立即创建</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
    export default {
        name: "Merchant",
      data() {
        return {
          applyForm: {
            name: '',
            address: '',
          },
          rules: {
            name: [
              { required: true, message: '请输入商户名称', trigger: 'blur' },
              { min: 3, max: 5, message: '长度在 3 到 10 个字符', trigger: 'blur' }
            ],
            address: [
              { required: true, message: '请输入商户地址', trigger: 'blur' }
            ]
          }
        };
      },
      methods:{
        submitForm() {

          var _this =this;
          var params = new URLSearchParams();
          params.append("userId",userhelper.userId);
          params.append("name",this.applyForm.name);
          params.append("address",this.applyForm.address);
          this.$axios.post("apply/addApply",params).then(function (val) {
                if (val == "添加成功") {
                  _this.$message(val)
                }else  if (val == "添加失败") {
                  _this.$message(val)
                }

          }).catch()
        },
        resetForm() {
          this.applyForm.name = "";
          this.applyForm.address = "";
        }
      },
    }
</script>

<style scoped>

</style>
