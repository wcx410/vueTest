<!--后台登录-->
<template>
  <div>
    <div class="login-box">
      <div class="login-head">
        <span class="login-title">兴盛优选后台登录</span>
      </div>
      <div class="login-body">
        <el-form ref="form" :model="empInfo" label-width="80px">
          <!--<el-form-item label="活动名称" prop="name">-->
            <!--<el-input v-model="ruleForm.name"></el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="账号" class="login-center-input">
              <el-input placeholder="请输入账号" type="type"  v-model="empInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="密码 :" class="login-center-input">
              <el-input placeholder="请输入密码" type="type" v-model="empInfo.password" show-password></el-input>
          </el-form-item>
        <!--<el-row>-->
          <!--<el-switch :active-text="'记住我'" v-model="rememberMe"></el-switch>-->
        <!--</el-row>-->
        <el-row>
          <el-form-item>
            <el-button  type="primary" round plain @click="login">登录</el-button>
          </el-form-item>
        </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        empInfo:{
          name:"",
          password:""
        }
      }
  },
    methods:{
      login(){
        var params = new URLSearchParams();
        params.append("name",this.empInfo.name);
        params.append("password",this.empInfo.password);
        var _this =this;
        this.$axios.post("employee/backLogin",params).then(function (request) {
          if (request.data===null){
            _this.$message({
              type: 'success',
              message: "登录失败"
            });
          }else{
            _this.$message({
              type: 'success',
              message: "登录成功"
            });
            _this.$router.push({path: "/back"});
            console.log("request.data.id")
            console.log(request.data.id)
            _this.sessionStorage.setItem("emp",request.data.id);
          }
        }).catch();
      }
    }
  }
</script>
<!--<style src="../reset.css"></style>-->
<!--<style src="../style.css"></style>-->
<style src="../logine.css">
  .login-box {
    text-align: center;
    position: fixed;
    top: 80px;
    left: 50%;
    transform: translate(-50%,0);
    width: 450px;
    height: 350px;
    box-shadow: 0 0 5px 3px rgba(0, 0, 0, .1);
    border-radius: 5px;
    overflow: hidden;
  }
  .login-head {
    width: 100%;
    height: 77px;
    background-color: #505458;
  }
  .login-title {
    margin: auto;
    color: white;
    font-size: 25px;
    font-weight: bold;
    line-height: 77px;
  }
  .login-body {
    padding: 30px;
  }
  .login-body > * {
    margin-top: 20px;
  }
  .login-btn {
    width: 200px;
  }
</style>
