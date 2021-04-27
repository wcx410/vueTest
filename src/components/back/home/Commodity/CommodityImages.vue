<!--图片上传组件-->
<template>
    <div>
        <el-upload
                class="avatar-uploader"
                :action="'http://localhost:8080/fileUpload?dir=back/comimg&empId=' + empId"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                name="file">
            <img v-if="imageFile.url" :src="$host + imageFile.url" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </div>
</template>

<script>
export  default {
  name:"CommodityImages",
  data(){
    return{
      imageFile: {},
    }
    //当前员工id, 上传需要获取员工id


  },
  methods:{

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
