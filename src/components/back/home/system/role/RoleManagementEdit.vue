<template>
    <div>
      <el-form label-width="90px" status-icon :model="formData" ref="form" :rules="rules">
        <el-form-item label="角色名称: " prop="name">
          <el-input v-model="formData.name" maxlength="15" clearable placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色备注: " prop="remark">
          <el-input v-model="formData.remark" type="textarea" maxlength="100" placeholder="请输入角色备注"></el-input>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
    export default {
      name: "RoleManagementEdit",
      data() {
        return {
          rules: {
            name: [{
              required: true,
              message: "角色名不能为空 !"
            }]
          }
        }
      },
      props:["formData"]
    }
</script>

<style scoped>

</style>
