<template>
  <div>
    <!--<el-form label-width="80px" status-icon ref="role" >-->
      <!--<el-form-item label="选择角色" v-model="roles" placeholder="请选择">-->
        <!--<el-select v-model="roles" placeholder="请选择">-->
          <!--<el-option  v-for="r in role"   :value="r.id" :label="r.name"  ></el-option>-->
        <!--</el-select>-->
      <!--</el-form-item>-->
    <!--</el-form>-->
    <!--<el-checkbox-group  size="small" >
      &lt;!&ndash;<el-checkbox  v-for="r in role"  :value="r.id" :label="r.name"  border></el-checkbox>&ndash;&gt;
      <el-checkbox v-for="r in role"  :key="r.name"  >{{r.name}}</el-checkbox>
    </el-checkbox-group>-->
    <el-checkbox-group  v-model="ids">
      <el-checkbox  v-for="r in roles"  :label="r.id">{{r.name}}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
  export default {
    name: "EmpManagementRoleEdit",
    data(){
      return{
        role:[{id:1,name:"角色1"},{id:2,name:"角色2"}],
        roles:[],
        ids:[]
      }
    },
    props:[
      // roleDate: {}
      "roledata"
    ],


    methods:{
      //查询所有商品类型信息
      getEmpRoleAll(){
        var _this=this;
        this.$axios.post("/role/queryallrole").then(value => {
          console.log(value.data.records)
         this.roles=value.data.records;
        })
      },
      emproles() {
        //获取员工id
        // this.id=row.id;
        let params = new URLSearchParams();
        params.append("id", roledata);
        this.$axios.post("/employee/querybyid", params)
          .then((result) => {
            result.data.forEach((val)=>{
              this.ids .push(val.role)
            })
          }).catch()
      },
    },
    created() {
      //加载所有商品类型信息
      this.getEmpRoleAll();
    },
    mounted(){

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
