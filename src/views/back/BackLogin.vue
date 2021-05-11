<!--后台登录-->
<template>
  <div>
    <div class="login-box">
      <div class="login-head">
        <span class="login-title">兴盛优选后台登录</span>
      </div>
      <div class="login-body">
        <el-row>
          <el-input placeholder="请输入账号" clearable v-model="empInfo.name">
            <template slot="prepend">账号 :</template>
          </el-input>
        </el-row>
        <el-row>
          <el-input placeholder="请输入密码" clearable show-password v-model="empInfo.password">
            <template slot="prepend" >密码 :</template>
          </el-input>
        </el-row>
        <!--<el-row>-->
          <!--<el-switch :active-text="'记住我'" v-model="rememberMe"></el-switch>-->
        <!--</el-row>-->
        <el-row>
          <el-button class="login-btn" type="primary" round plain @click="login">登录</el-button>
        </el-row>
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
          _this.$router.push({path: "/"});
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
