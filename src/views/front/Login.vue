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
                <el-form :model="user"  :rules="rules" ref="user">
                  <div class="login-center clearfix">
                    <div class="login-center-img">
                      <el-image style="width:30px; height: 27px" src="src/assets/mcimg/name.png"></el-image>
                    </div>
                    <el-form-item class="login-center-input" prop="username">
                      <el-input type="type" placeholder="请输入您的用户名" v-model="user.username" onfocus="this.placeholder=''"
                                autocomplete="off" onblur="this.placeholder='请输入您的用户名'"/>
                    </el-form-item>
                  </div>
                  <div class="login-center clearfix">
                    <div class="login-center-img">
                      <el-image style="width: 27px; height: 27px" src="src/assets/mcimg/password.png"></el-image>
                    </div>
                    <el-form-item class="login-center-input" prop="password">
                      <el-input type="password" placeholder="请输入您的密码" onfocus="this.placeholder=''"
                                v-model="user.password" autocomplete="off" onblur="this.placeholder='请输入您的密码'"/>
                      <div class="login-center-input-text">密码</div>
                    </el-form-item>
                  </div>

                  <div class="login-center clearfix">
                    <div class="login-center-img">
                      <el-image style="width: 27px; height: 27px" src="src/assets/mcimg/yzm1.png"></el-image></div>
                    <div class="login-center-input">
                      <input v-model="user.yzm" type="text" placeholder="请输入验证码" onfocus="this.placeholder=''" onblur="this.placeholder='请输入验证码'"/>
                      <!--<div class="login-center-input-text">验证码</div>-->
                      <br>
                      <br>
                      <canvas id="code-canvas" :width="contentWidth" :height="contentHeight"></canvas>
                    </div>

                  </div>
                  <br>
                  <el-button style="margin-left: 140px ;margin-top: 80px" type="primary" @click="denglu">登录</el-button>
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
  import userHelper from "../../helper/front/UserHelper"
  export default {
    data(){
      return {
        user:{
          username:"",
          password:"",
          yzm:""
        },
        rules: {
          username:[{
                message: "用户名不能为空 !",
                required: true,
                trigger: "blur"
          }],
          password:[{
            message: "密码不能为空 !",
            required: true,
            trigger: "blur"
          }],
          yzm:[{
            message: "验证码不能为空 !",
            required: true,
            trigger: "blur"
          }],
        }
      }
    },
    props: {
      identifyCode: {
        type: String,
        default: '1234'
      },
      fontSizeMin: {
        type: Number,
        default: 16
      },
      fontSizeMax: {
        type: Number,
        default: 40
      },
      backgroundColorMin: {
        type: Number,
        default: 180
      },
      backgroundColorMax: {
        type: Number,
        default: 240
      },
      colorMin: {
        type: Number,
        default: 50
      },
      colorMax: {
        type: Number,
        default: 160
      },
      lineColorMin: {
        type: Number,
        default: 40
      },
      lineColorMax: {
        type: Number,
        default: 180
      },
      dotColorMin: {
        type: Number,
        default: 0
      },
      dotColorMax: {
        type: Number,
        default: 255
      },
      contentWidth: {
        type: Number,
        default: 112
      },
      contentHeight: {
        type: Number,
        default: 38
      }
    },

    methods: {
      // 生成一个随机数
      randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min)
      },
      // 生成一个随机的颜色
      randomColor(min, max) {
        let r = this.randomNum(min, max)
        let g = this.randomNum(min, max)
        let b = this.randomNum(min, max)
        return 'rgb(' + r + ',' + g + ',' + b + ')'
      },
      drawPic() {
        let canvas = document.getElementById('code-canvas')
        let ctx = canvas.getContext('2d')
        ctx.textBaseline = 'bottom'
        // 绘制背景
        // ctx.fillStyle = this.randomColor(this.backgroundColorMin, this.backgroundColorMax)
        ctx.fillStyle = 'rgb(255,247,230)'
        ctx.fillRect(0, 0, this.contentWidth, this.contentHeight)
        // 绘制文字
        for (let i = 0; i < this.identifyCode.length; i++) {
          this.drawText(ctx, this.identifyCode[i], i)
        }
        this.drawLine(ctx)
        this.drawDot(ctx)
      },
      drawText(ctx, txt, i) {
        ctx.fillStyle = this.randomColor(this.colorMin, this.colorMax)
        ctx.font = this.randomNum(this.fontSizeMin, this.fontSizeMax) + 'px SimHei'
        let x = (i + 1) * (this.contentWidth / (this.identifyCode.length + 1))
        let y = this.randomNum(this.fontSizeMax, this.contentHeight - 5)
        var deg = this.randomNum(-45, 45)
        // 修改坐标原点和旋转角度
        ctx.translate(x, y)
        ctx.rotate(deg * Math.PI / 180)
        ctx.fillText(txt, 0, 0)
        // 恢复坐标原点和旋转角度
        ctx.rotate(-deg * Math.PI / 180)
        ctx.translate(-x, -y)
      },
      drawLine(ctx) {
        // 绘制干扰线
        for (let i = 0; i < 6; i++) {
          ctx.strokeStyle = this.randomColor(this.lineColorMin, this.lineColorMax)
          ctx.beginPath()
          ctx.moveTo(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight))
          ctx.lineTo(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight))
          ctx.stroke()
        }
      },
      drawDot(ctx) {
        // 绘制干扰点
        for (let i = 0; i < 20; i++) {
          ctx.fillStyle = this.randomColor(0, 255)
          ctx.beginPath()
          ctx.arc(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight), 1, 0, 2 * Math.PI)
          ctx.fill()
        }
      },
      denglu(){
        var params = new URLSearchParams();
        params.append("username",this.user.username);
        params.append("password",this.user.password);
        var _this =this;
        this.$axios.post("user/login",params).then(function (request) {
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
            _this.$router.push({path: "/"})

            sessionStorage.setItem("user",request.data);
          //  userHelper.userId(request.data);

          }
          //刷新页面
        }).catch();
        //   _this.$router.push({path: "/"});
        // }).catch();
      }
    },
    watch: {
      identifyCode() {
        this.drawPic()
      }
    },
    mounted() {
      this.drawPic()
    }
  }
</script>

<style src="../logine.css">

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
