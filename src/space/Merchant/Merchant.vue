<template>
    <div style="width: 1000px;margin: auto">
      <h3>申请商户</h3>
      <el-form :model="applyForm" :rules="rules" ref="applyForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="商户名称" prop="name">
          <el-input v-model="applyForm.name" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label="商户地址" prop="address">
          <el-input v-model="applyForm.address" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label="营业执照" prop="photos">
          <el-upload
            class="avatar-uploader"
            :show-file-list="true"
            action=""
            :on-change="handleChangeyyzz"
            :auto-upload="false"
            :before-upload="beforeAvatarUpload"
            name="file">
            <img v-if="imageFile.url" :src="$host + imageFile.url" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="身份证件照正面" prop="idcardimagezheng">
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="true"
            :auto-upload="false"
            :on-change="handleChangesfzz"
            :before-upload="beforeAvatarUpload"
            name="file">
            <img v-if="imageFile.url" :src="$host + imageFile.url" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="身份证件照反面" prop="idcardimagefan">
<!--
            :on-success="handleAvatarSuccess"-->
          <el-upload
            class="avatar-uploader"
            action=""
            :auto-upload="false"
            :on-change="handleChangesfzf"
            :show-file-list="true"
            :before-upload="beforeAvatarUpload"
            name="file">
            <img v-if="imageFile.url" :src="$host +imageFile.url" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">立即创建</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
    export default {
        name: "Merchant",
      data() {
        return {
          imageFile:[],
          yyzzimageFile: [],
          sfzzimageFile: [],
          sfzfimageFile: [],
          applyForm: {
            name: '',
            address: '',
          },
          rules: {
            name: [
              { required: true, message: '请输入商户名称', trigger: 'blur' },
              { min: 3, max: 5, message: '长度在 3 到 10 个字符', trigger: 'blur' }
            ],
            address: [
              { required: true, message: '请输入商户地址', trigger: 'blur' }
            ]
          }
        };
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
        handleChangeyyzz(file, fileList) {
          this.yyzzimageFile.push(file.raw)
          this.handleChange(file)
          this.beforeAvatarUpload(file.raw);
        },
        handleChangesfzz(file, fileList) {
          this.sfzzimageFile.push(file.raw)
          this.handleChange(file)
          this.beforeAvatarUpload(file.raw);
        },

        handleChangesfzf(file, fileList) {
          this.sfzfimageFile.push(file.raw)
          this.handleChange(file)
          this.beforeAvatarUpload(file.raw);
        },
        //上传成功调用
        handleAvatarSuccess(res, files) {
          var _this=this;
          _this.imageFile.url = res.msg;
        },
        submitForm() {
          var _this =this;
          var params = new FormData();
          params.append("userId",sessionStorage.getItem("user"));
          params.append("name",this.applyForm.name);
          params.append("address",this.applyForm.address);
          params.append("photos",this.imageFile[0].name);
          params.append("idcardimagezheng",this.imageFile[1].name);
          params.append("idcardimagefan",this.imageFile[2].name);
          params.append("yyzzimgFile",this.yyzzimageFile[0])
          params.append("sfzzimageFile",this.sfzzimageFile[0])
          params.append("sfzfimageFile",this.sfzfimageFile[0])
          // console.log(this.yyzzimageFile)
          // console.log(this.sfzzimageFile)
          // console.log(this.sfzfimageFile)

            this.$axios({
              method: 'post',
              url: 'apply/addApply',
              data:params,
              headers: {
                'Content-Type':'multipart/form-data'
              }}).then(function (val) {
              console.log(val)
                if (val.data === "申请成功") {
                  _this.$message(val.data)
                  _this.$router.push('/userhome')
                }else  if (val.data === "申请失败") {
                  _this.$message(val.data)
                }

          }).catch()
        },
        resetForm() {
          this.applyForm.name = "";
          this.applyForm.address = "";
        }
      },
    }
</script>

<style scoped>
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
