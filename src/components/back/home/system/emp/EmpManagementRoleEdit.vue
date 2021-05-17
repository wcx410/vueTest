<template>
  <div>
    <el-form label-width="80px" status-icon :model="roleDate" ref="role">
      <el-form-item label="选择角色" prop="comType.id">
        <el-select v-model="roleDate.role.id">
          <el-option :value="0" label="--请选择--"></el-option>
          <el-option :value="r.id" :label="r.name" v-for="r in role"  ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "EmpManagementRoleEdit",
    data(){
      return{
        role:[]
      }
    },
    props:{
      roleDate: {}
    },
    methods:{
      //查询所有商品类型信息
      getEmpRoleAll(){
        var _this=this;
        this.$axios.post("/role/queryallrole").then(value => {
          console.log(value.data)
          _this.role=value.data;
        })
      },

    },
    created() {
      //加载所有商品类型信息
      this.getEmpRoleAll();
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
