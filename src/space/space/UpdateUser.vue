<template>
  <!--修改个人信息-->
  <div>
    <el-page-header content="个人首页"></el-page-header>
      <div style="margin-top: 70px;margin-right: auto">
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="true"
          :auto-upload="false"
          :on-change="handleChange"
          :before-upload="beforeAvatarUpload"
          name="file">
          <img v-if="imageFile.url" :src="$host + imageFile.url" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
          <div style="font-size: 15px;margin-left: 180px;margin-top: -60px">
            昵称：{{user.username}}<br><br>
          </div>
          <div  class="" v-show="">
            <i class="el-icon-check"></i>
            已实名认证
          </div>
          <div  class="smrz" v-show="isSmrz">
            <i class="el-icon-close"></i>
            未实名认证
          </div>
        <!--<file-load-demo></file-load-demo>-->
      </div>
    <el-divider></el-divider>
    <div style="font-size: 15px">
      <label>姓名：</label>
      <el-input type="text" :disabled="true" style="width: 200px" v-model="user.uname">
      </el-input>
    </div>
    <br>
    <br>
    <div style="font-size: 15px">
      <label>电话：</label>
      <el-input type="text" style="width: 200px" v-model="user.phone">123</el-input>
    </div>
    <br>
    <br>
    <div style="font-size: 15px">

      <label>个性签名：</label>
      <el-input type="text" style="width: 200px" v-model="user.signature"></el-input>
    </div>


    <br>
    <br>
    <div style="font-size: 15px">
      <label>性别：</label>
      <el-radio v-model="user.sex" label="男">男</el-radio>
      <el-radio v-model="user.sex" label="女" >女</el-radio>
    </div>
    <br>
    <el-button type="primary" @click="xg()">确认修改</el-button>
  </div>
</template>

<script>
  import userhelper from  "../../helper/front/UserHelper"
    export default {
        name: "UpdateUser",
       data(){
           return{
             user:{
               // id:"",
               // username:"",
               // password:"",
               // headPortrait:"",
               // phone:"",
               // signature:"",
               // birthday :"",
               // uname:"",
               // sex:"",
               // idCard:"",
               // merid:"",
               // lastLoginTime:"",
               // isDelete:"",
             },
             isSmrz:false,
             imageFile: [],
           }
       },
      methods:{

        beforeAvatarUpload(file) {
          var  _this=this;
          const type = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
          const isLt5M = file.size / 1024 / 1024 < 5;
          if (!type)
            _this.$message.error('上传图片只能是 JPG 或 PNG 获取 GIF 格式!');
          if (!isLt5M)
            _this.$message.error('上传图片大小不能超过 5MB!');
          return type && isLt5M;
        },
        // 上传附件
        handleChange(file, fileList) {
          this.imageFile.push(file.raw)
          this.beforeAvatarUpload(file.raw);
        },
        //上传成功调用
        handleAvatarSuccess(res, files) {
          var _this=this;
          _this.imageFile.url = res.msg;
        },
        //  根据编号来查询用户，在显示到界面上
        getdata(){
          var _this =this;
          var params = new URLSearchParams();
          params.append("id",sessionStorage.getItem("user"));

          this.$axios.post("space/queryBy",params).then(function (response) {
            _this.user = response.data;
          }).catch();
          if (this.user.idCard!=""&&this.user.idCard!=null){
              this.isSmrz = true;
          }
        },
        //如果用户对自己的信息进行的修改，就传到后台
        xg(){
          var _this =this;
          var params = new URLSearchParams();
          params.append("id",sessionStorage.getItem("user"))
          params.append("sex",this.user.sex);
          params.append("phone",this.user.phone);
          params.append("signature",this.user.signature);
          params.append("headPortrait",this.user.headPortrait)
          this.$axios.post("space/updateUser",params).then(function (response) {
            console.log(response.data)
            this.getdata();
            // this.$m = response.data;
          }).catch();
          // params.append("sex",this.user.)
        }

      },
      created(){
        this.getdata();
      }
    }
</script>

<style scoped>

</style>
