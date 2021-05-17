<template>
  <!--显示个人信息-->
  <div>
    <el-page-header content="个人首页"></el-page-header>
    <div style="margin-top: 70px">
      <!--            <el-avatar :size="110" :src="require('@/assets/mcimg/16.png')"></el-avatar>-->
      <!--<el-upload-->
      <!--class="avatar-uploader"-->
      <!--:action="'http://localhost:8080/userFileUpload?dir=frontImage&uId=' + userHelper.userId"-->
      <!--:show-file-list="false"-->
      <!--:on-success="handleAvatarSuccess"-->
      <!--:before-upload="beforeAvatarUpload"-->
      <!--name="file">-->
      <!--&lt;!&ndash;                <img v-if="imageUrl" :src="'http://localhost:8080/' + imageUrl" class="avatar">&ndash;&gt;-->

      <!--<el-image style="width:200px;height: 200px" v-if="user.headPortrait" :src="$host + user.headPortrait"></el-image>-->

      <!--</el-upload>-->
      <div style="font-size: 15px;margin-left: 240px;margin-top: -60px">
        昵称：{{ user.username }}<br><br>
      </div>


      <div  class="smrz" v-show="isSmrz">
        <i class="el-icon-check"></i>
        已实名认证
      </div>
      <div  class="smrz" v-show="isnSmrz">
        <i class="el-icon-close"></i>
        未实名认证
      </div>

      <div style="margin-left: 390px;margin-top: -40px" v-show="isnSmrz">
        <el-button type="info" plain @click="dialogVisible = true">实名认证</el-button>
      </div>

      <div style="margin-left: 390px;margin-top: -40px" v-show="isSmrz">
        <!--去申请商户-->
        <el-button type="warning" plain @click="$router.replace('/apply')">申请成为商户</el-button>
      </div>

      <div style="margin-left: 390px;margin-top: -40px" v-show="sh">
        <el-button type="warning" plain @click="gotoShop()">商户中心</el-button>
      </div>

      <!--<file-load-demo></file-load-demo>-->
    </div>
    <el-divider></el-divider>
    <div style="font-size: 15px">
      <label>姓名：</label>
      <el-input type="text" :disabled="true" style="width: 200px;margin-left: 40px" v-model="user.uname">
      </el-input>
    </div>
    <br>
    <br>
    <div style="font-size: 15px" v-show="isSmrz">
      <label>生日：</label>
      <el-input type="text"  suffix-icon="el-icon-date" :disabled="true" style="width: 200px;margin-left: 40px" v-model="user.birthday"></el-input>
    </div>
    <br>
    <br>
    <div style="font-size: 15px">
      <label>电话：</label>
      <el-input type="text" style="width: 200px;margin-left: 40px" v-model="user.phone|phones" :disabled="true">123</el-input>
    </div>
    <br>
    <br>
    <div style="font-size: 15px">
      <label>个性签名：</label>
      <el-input type="text" style="width: 200px ;margin-left: 10px" v-model="user.signature" :disabled="true"></el-input>
    </div>
    <br>
    <br>
    <div style="font-size: 15px" v-show="sqsh">
      <label>身份证：</label>
      <el-input type="text" style="width: 200px;margin-left: 24px" v-model="user.idCard|idCards" :disabled="true"></el-input>
    </div>

    <br>
    <br>
    <div style="font-size: 15px">
      <label>性别：</label>
      <el-radio v-model="user.sex" :disabled="true" label="男" style=";margin-left: 40px">男</el-radio>
      <el-radio v-model="user.sex" :disabled="true" label="女" >女</el-radio>
    </div>
    <!--   这是给用户添加身份证的     添加身份证-->
    <el-dialog
      title="实名认证"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span style="font-size: 25px;margin-left: 5px" >{{user.uname}}</span>
      <br>
      <br>

      <el-input  suffix-icon="el-icon-postcard" v-model="user.idCard" placeholder="请输入您的身份证"></el-input>
      <span slot="footer" class="dialog-footer">

            <el-button @click="dialogVisible = false">取 消
            </el-button>
            <el-button type="primary" @click="smrzff">确 定</el-button>
          </span>
    </el-dialog>

    <!--        <el-image style="float: right !important;margin-top: -600px"-->
    <!--                  :src="require('@/assets/mcimg/home-3.png')"></el-image>-->
    <!--<el-image style="float: right !important;margin-top: -60px"-->
              <!--:src="require('@/assets/mcimg/home-2.png')"></el-image>-->
  </div>
</template>

<script>
  import userhelper from  "../../helper/front/UserHelper"
    export default {
        name: "Information",
        data(){
            return{
              isnSmrz:false,
              isSmrz: false,
              sqsh:false,
              sh:false,
              dialogVisible:false,
              // msg:"",
              user:{}
            }
        },
      methods:{
        handleClose(done){
          //关闭身份认证
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },
        queryUserById(){
          //根据id显示查出来的用户，在上面显示
          var _this =this;
          var params = new URLSearchParams();
          //userhelper.userId
          params.append("id",sessionStorage.getItem("user"));
          this.$axios.post("space/queryBy",params).then(function (response) {
            _this.user = response.data;
            // 是否进行了实名认证
            if (_this.user.idCard == null) {
              _this.isnSmrz = true

            } else {
              _this.isSmrz = true
              _this.sqsh=true
            }
            //是否是商户
            if (_this.user.merid == null){
              _this.sh=false
            }else {
              _this.sh=true
              _this.isSmrz=false
            }
          }).catch();

          // let id = this.user.idCard;
          // id=id.substr(0,id.length-4)+"****";
          // this.user.idCard=id;
        },
        gotoShop(){
          //替换路由路径
          userhelper.merId(this.user.merid);
          this.$router.replace('/shop')

        },
        smrzff(){
          //进行实名认证，输入身份证
          var _this =this;
          var params = new URLSearchParams();
          params.append("id",sessionStorage.getItem("user"));
          console.log("zzz"+sessionStorage.getItem("user.id"))
          params.append("idCard",this.user.idCard)
          this.$axios.post("space/updateUser",params).then(function (response) {
            // _this.msg = response.data;
            _this.$message(response.data);
            _this.dialogVisible = false;
            _this.queryUserById();

          }).catch();
        }
      },
      filter:{
        idCards:function(value){
          return value.substring(0,6) + '****' + value.substring(10);
        },
        phones:function(value){
          return value.substring(0,3)+ '****' + value.substring(7);
        },
      },
      created() {
        this.queryUserById()
      }
    }
</script>

<style scoped>
  .smrz{
    width: 105px;
    border-radius: 4px;
    border: 1px solid #CCCCCC;
    height: 20px;
    /*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);*/
    margin-left: 240px;
    background-color: #FCFCFC;
    font-family: 楷体;
    font-size: 15px;

  }
</style>
