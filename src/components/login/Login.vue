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
      <front-header></front-header>
      <div style="width: 1900px; height: 800px">
        <el-main>
          <el-col :span="24">
            <el-image style="width: 1855px; height: 800px;margin-left:12px" src="src/assets/mcimg/loginsss.png"></el-image>
          </el-col>
          <el-col :span="4">
            <div class="login">
              <div class="login-top">
                用户登录
              </div>
              <div style="margin-top: -20px">
                <el-form >
                  <div class="login-center clearfix">
                    <div class="login-center-img">
                      <el-image style="width:30px; height: 27px" src="src/assets/mcimg/name.png"></el-image>
                    </div>
                    <el-form-item class="login-center-input" prop="username">
                      <el-input type="type" placeholder="请输入您的用户名" v-model="username" onfocus="this.placeholder=''"
                                autocomplete="off" onblur="this.placeholder='请输入您的用户名'"/>
                    </el-form-item>
                  </div>
                  <div class="login-center clearfix">
                    <div class="login-center-img">
                      <el-image style="width: 27px; height: 27px" src="src/assets/mcimg/password.png"></el-image>
                    </div>
                    <el-form-item class="login-center-input" prop="password">
                      <el-input type="password" placeholder="请输入您的密码" onfocus="this.placeholder=''"
                                v-model="password" autocomplete="off" onblur="this.placeholder='请输入您的密码'"/>
                      <div class="login-center-input-text">密码</div>
                    </el-form-item>
                  </div>

                  <div class="login-center clearfix">
                    <div class="login-center-img">
                      <el-image style="width: 27px; height: 27px" src="src/assets/mcimg/yzm1.png"></el-image></div>
                    <div class="login-center-input">
                      <input type="text" placeholder="请输入验证码" onfocus="this.placeholder=''" onblur="this.placeholder='请输入验证码'"/>
                      <div class="login-center-input-text">验证码</div>
                      <br>
                      <br>
                      <canvas id="canvas" @click="showNum"></canvas>
                    </div>

                  </div>
                  <br>
                  <el-button style="margin-left: 140px ;margin-top: 20px" type="primary" @click="denglu">提交</el-button>
                </el-form>
              </div>
            </div>
            <div class="sk-rotating-plane"></div>
          </el-col>
        </el-main>

        <el-footer>

          <h2>合作商</h2>


        </el-footer>
      </div>
    </el-container>
  </div>
</template>

<script>
    export default {
        name: "Login"
    }
</script>

<style src="../../views/logine.css">
  .right {
    float: right !important;
  }

  .login {
    position: absolute;
    top: 400px;
    left: 74%;
    opacity: 0.8;
  }
</style>
