<!--图片上传组件-->
<template>
  <div>
    <el-upload
      class="avatar-uploader"
      :show-file-list="true"
      action=""
      :on-change="handleChange"
      :auto-upload="false"
      :before-upload="beforeAvatarUpload"
      name="file">
      <img v-if="imageFile.url" :src="$host + imageFile.url" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
  export  default {
    name:"EmpManagementImage",
    data(){
      return{
        imageFile: {},
        empId :'1',
        imageFileHeard:[]
      }
      //当前员工id, 上传需要获取员工id
    },
    methods:{
      //上传前验证
      beforeAvatarUpload(file) {
        _this=this;
        const type = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!type)
          _this.$message.error('上传图片只能是 JPG 或 PNG 获取 GIF 格式!');
        if (!isLt5M)
          _this.$message.error('上传图片大小不能超过 5MB!');
        return type && isLt5M;
      },

      //上传成功调用
      handleAvatarSuccess(res, files) {
        _this=this;
        _this.imageFile.url = res.msg;
      },
      handleChange(file, fileList) {
        this.imageFileHeard.push(file.raw)
        this.handleChange(file)
        this.beforeAvatarUpload(file.raw);
      },

    }
  }





</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
