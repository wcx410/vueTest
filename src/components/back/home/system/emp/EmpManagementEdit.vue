<template>
  <div>
  <el-form label-width="110px" status-icon :model="formData" ref="form" :rules="rules">
    <el-container>
      <el-col :span="12">
        <el-form-item label="员工姓名: " prop="name">
          <el-input v-model="formData.name" maxlength="15" clearable placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="员工头像: ">
          <!-- 商品图片-->
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
          <!--<emp-management-image :image-file="imageFile"></emp-management-image>-->
        </el-form-item>
        <el-form-item label="员工性别: ">
          <el-radio v-model="formData.sex" label="男" value="男" border></el-radio>
          <el-radio v-model="formData.sex" label="女" value="女" border></el-radio>
        </el-form-item>
        <el-form-item label="手机号: " prop="phone">
          <el-input v-model="formData.phone" maxlength="11" clearable placeholder="请输入手机号"></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="身份证: " prop="icCard">
          <el-input v-model="formData.icCard" maxlength="20" clearable placeholder="请输入身份证"></el-input>
        </el-form-item>
        <el-form-item label="员工住址: " prop="address">
          <el-input v-model="formData.address" maxlength="30" clearable placeholder="请输入地址"></el-input>
        </el-form-item>
        <el-form-item label="员工邮箱: " prop="email">
          <!--<el-autocomplete v-model="formData.email" :maxlength="30" clearable-->
                           <!--:fetch-suggestions="emailFetch"-->
                           <!--placeholder="请输入邮箱"-->
                           <!--:trigger-on-focus="false"-->
                           <!--style="width: 100%"></el-autocomplete>-->
          <el-input v-model="formData.email"></el-input>
        </el-form-item>
        <el-form-item label="员工备注: " prop="remark">
          <el-input v-model="formData.remark" maxlength="100" type="textarea" placeholder="请输入备注"></el-input>
        </el-form-item>
      </el-col>
    </el-container>

  </el-form>
  </div>
</template>

<script>
  import EmpManagementImage from "./EmpManagementImage"

  export default {
    name:"EmpManagementEdit",
    data(){
      return{
        rules:{
          name: [{
            pattern: /^[\u4e00-\u9fa5]{2,4}$/,
            message: "请输入2-4位长度的汉字 !",
            required: true,
            trigger: "blur"
          }],
          phone: [{
            pattern: /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/,
            message: "请输正确的手机号 !",
            required: true,
            trigger: "blur"
          }],
          icCard: [{
            pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
            message: "请输正确身份证号码 !",
            required: true,
            trigger: "blur"
          }],
          address: [{
            message: "地址不能为空 !",
            required: true,
            trigger: "blur"
          }],
          email: [{
            type: "email",
            message: "请输入正确的邮箱 !",
            required: true,
            trigger: "blur"
          }]
        }
      }
    },
    components:{
      EmpManagementImage
    },
    // props:["formData","imageFile"],
    props:{
      formData: {},
      imageFile:{},
      imageFileHeard:{},
    },
    methods:{
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
    },
    //触发验证
    async validate() {
      return new Promise<boolean>(resolve => {
        (this.$refs.form).validate((value) => {
          resolve(value);
        })
      });
    }
  }
</script>
