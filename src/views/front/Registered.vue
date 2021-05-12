<template>
  <div>
    <el-container>
      <el-header style="position: fixed;width: 100%;z-index: 10;margin-top: -9px;">
        <el-menu :default-active="'1'"
                 mode="horizontal">
          <el-menu-item>
            <el-image style="width: 60px; height: 60px" src="src/assets/mcimg/logos.png"></el-image>
          </el-menu-item>
          <el-menu-item><i class="el-icon-house"/>首页</el-menu-item>
          <el-menu-item class="right">
            <el-image style="width: 55px; height: 50px" src="src/assets/mcimg/hua.png"></el-image>
          </el-menu-item>
          <el-menu-item class="right" index="8">关于我们</el-menu-item>
          <el-menu-item class="right" index="7">联系客服</el-menu-item>
          <el-menu-item class="right" index="6">注册</el-menu-item>
          <el-menu-item class="right" index="5">登录</el-menu-item>

          <el-menu-item index="3"><i class="el-icon-scissors"></i>每日特价</el-menu-item>
        </el-menu>
      </el-header>

      <el-main>
        <el-col :span="24">
          <!--<el-image style="width: 1855px; height: 800px" src="../../../assets/mcimg/zc.png"></el-image>-->
          <el-image style="width: 1300px; height: 546px" src="src/assets/mcimg/zc.png"></el-image>
        </el-col>
        <div id="div1" style="display:block">
          <el-steps finish-status="success" >
            <div class="login">
              <div style="margin-top: 33px; margin-left: 50px">
                用户注册
              </div>
              <br>
              <br>
              <el-form label-width="80px" :model="user" :rules="rules" ref="user">
                <el-form-item class="login-center-input" style="margin-left: 0px" prop="username">
                  <i class="el-icon-user"></i>
                  <el-input v-model="user.username" placeholder="请输入用户名" onfocus="this.placeholder=''" onblur="this.placeholder='请输入用户名'" style="width: 55%"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <i class="el-icon-setting"></i>
                  <el-input v-model="user.password" autocomplete="off" placeholder="请输入密码" onfocus="this.placeholder=''" onblur="this.placeholder='请输入密码'" style="width: 55%"></el-input>
                </el-form-item>
                <el-form-item prop="pwd2">
                  <i class="el-icon-setting"></i>
                  <el-input v-model="user.pwd2" autocomplete="off" placeholder="请确认你的密码" onfocus="this.placeholder=''" onblur="this.placeholder='请确认你的密码'" style="width: 55%"></el-input>
                </el-form-item>
                <el-form-item prop="sex">
                  <i class="el-icon-setting"></i>
                  <el-radio-group v-model="user.sex">
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item class="login-center-input" style="margin-left: 0px" prop="phone">
                  <i class="el-icon-phone"></i>
                  <el-input v-model="user.phone" placeholder="请输入手机号" onfocus="this.placeholder=''" onblur="this.placeholder='请输入手机号'" style="width: 55%"></el-input>
                </el-form-item>
                <el-form-item prop="yzm">
                  <i class="el-icon-info"></i>
                  <el-input v-model="user.yzm" placeholder="请输入验证码" onfocus="this.placeholder=''" onblur="this.placeholder='请输入验证码'" style="width: 55%"></el-input>
                  <el-button type="primary" size="small" plain class="fs">点击发送</el-button>-->
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">确认注册</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-steps>
        </div>
      </el-main>
    </el-container>
  </div>
</template>


<script>
  export default {
    data() {
      // return {
      //   user:{
      //     phone:"",
      //     yzm:"",
      //     username:"",
      //     password:"",
      //     pwd2:"",
      //     sex:""
      //   },
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.user.pwd2 !== '') {
            this.$refs.ruleForm.validateField('pwd2');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.user.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        user: {
          password: '',
          pwd2: '',
          phone:"",
          yzm:"",
          username:"",
          sex:""
        },
        rules: {
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          pwd2: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          username:[{
                pattern: /^[\u4e00-\u9fa5]{2,4}$/,
                message: "请输入2-4位长度的汉字 !",
                required: true,
                trigger: "blur"
              }],
              sex:[{
                message: "性别不能为空 !",
                required: true,
                trigger: "blur"
              }],
              phone:[{
                pattern: /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/,
                message: "请输正确的手机号 !",
                required: true,
                trigger: "blur"
              }]
        }
      };
      // rules:{
      //   username:[{
      //     pattern: /^[\u4e00-\u9fa5]{2,4}$/,
      //     message: "请输入2-4位长度的汉字 !",
      //     required: true,
      //     trigger: "blur"
      //   }],
      //   password:[{
      //     message: "密码不能为空 !",
      //     required: true,
      //     trigger: "blur"
      //   }],
      //   pwd2:[{
      //
      //   }],
      //   sex:[{
      //     message: "性别不能为空 !",
      //     required: true,
      //     trigger: "blur"
      //   }],
      //   phone:[{
      //     pattern: /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/,
      //     message: "请输正确的手机号 !",
      //     required: true,
      //     trigger: "blur"
      //   }]
      // }
      // }
    },
    methods: {
      onSubmit() {
        var params = new URLSearchParams();
        params.append("username",this.user.username);
        params.append("password",this.user.password);
        params.append("phone",this.user.phone);
        params.append("sex",this.user.sex);
        var _this =this;
        this.$axios.post("user/register",params).then(function (data) {
          _this.$router.push({path: "/"});
        }).catch();
      }
    }

  }
</script>


<style scoped>
  .right {
    float: right !important;

  }

  .fs{
    position: absolute;
    left: 64%;
  }

  .login {
    position: absolute;
    top: 47px;
    left: 70%;
    opacity: 0.8;
    background: white;
    height: 526px;
  }
</style>
