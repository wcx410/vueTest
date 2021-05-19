<template>
 <div>
            <!--模糊查询-->
            <el-input
                      style="width:600px"
                      placeholder="请输入关键字"
                      v-model="searchStr"
                      clearable>
                  <div slot="prepend">
                    <el-tooltip effect="dark" content="实名认证状态" placement="top-start">
                      <!--是否实名认证-->
                      <el-select v-model="isRealName" placeholder="是否实名认证" style="width:110px">
                          <el-option label="全部" value="-1"></el-option>
                        <el-option label="已认证" :value="1"></el-option>
                        <el-option label="未认证" :value="2"></el-option>
                      </el-select>
                    </el-tooltip>
                    <el-tooltip effect="dark" content="性别" placement="top">
                      <!--性别-->
                      <el-select v-model="Sex" placeholder="性别" style="width: 90px;margin-left: 20px;border-left: 1px solid ">
                        <el-option label="全部" value="-1"></el-option>
                        <el-option label="男" value="男"></el-option>
                        <el-option label="女" value="女"></el-option>
                      </el-select>
                    </el-tooltip>
                    <el-tooltip effect="dark" content="注销状态" placement="top-end">
                    <!--注销状态-->
                    <el-select v-model="isDelete" placeholder="注销状态" style="width: 90px;margin-left: 20px;border-left: 1px solid ">
                      <el-option label="全部" value="-1"></el-option>
                      <el-option label="正常" value="0"></el-option>
                      <el-option label="注销" value="1"></el-option>
                    </el-select>
                  </el-tooltip>
                  </div>
              <template slot="append">
                <el-button
                           slot="append"
                           icon="el-icon-serch"
                           @click="SelUser">
                      查询
                </el-button>
              </template>
            </el-input>

                 <template>
                   <el-table
                     :data="dxs"
                     style="width: 100%">
                     <el-table-column type="expand">
                       <template slot-scope="props">
                         <el-form label-position="left" inline class="demo-table-expand">
                           <el-form-item label="ID">
                             <span>{{ props.row.id }}</span>
                           </el-form-item>
                           <el-form-item label="用户名">
                             <span>{{ props.row.username }}</span>
                           </el-form-item>
                           <el-form-item label="头像">
                             <el-image style="height: 100px;width: 150px" :src="props.row.headPortrait"  fit="cover" lazy></el-image>
                           </el-form-item>
                           <el-form-item label="性别">
                             <span>{{ props.row.sex }}</span>
                           </el-form-item>
                           <el-form-item label="手机号">
                             <span>{{ props.row.phone | phone}}</span>
                           </el-form-item>
                           <el-form-item label="真实姓名">
                             <span>{{ props.row.uname }}</span>
                           </el-form-item>
                           <el-form-item label="身份证">
                             <span>{{ props.row.idCard | idCard}}</span>
                           </el-form-item>
<!--                           <el-form-item label="商品描述">-->
<!--                             <span>{{ props.row.desc }}</span>-->
<!--                           </el-form-item>-->
                         </el-form>
                       </template>
                     </el-table-column>
                     <el-table-column
                       label="ID"
                       prop="id">
                     </el-table-column>
                     <el-table-column
                       label="用户名"
                       prop="username">
                     </el-table-column>

                     <el-table-column
                       label="性别"
                       prop="sex">
                     </el-table-column>

                     <el-table-column
                     label="真实姓名"
                     prop="uname">
                   </el-table-column>

                     <el-table-column
                     label="操作">
                       <template slot-scope="scope">
                         <!--修改客户-->
                         <el-tooltip effect="dark"  content="编辑" placement="top-start">
                           <el-button
                             type="primary"
                             circle
                             icon="el-icon-edit"
                             size="medium"
                             @click="diaonima(scope.row.id)"

                           ></el-button>
<!--                           <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>-->
                         </el-tooltip>

                         <!--删除客户-->

                         <el-popconfirm
                           @confirm="Deluser(scope.row.id)"
                           confirm-button-text='确定'
                           cancel-button-text='取消'
                           icon="el-icon-info"
                           icon-color="red"
                           title="你确定删除该客户吗？该操作不能取消!"
                         >
                           <el-tooltip slot="reference" effect="dark"  content="删除" placement="top-start">
                           <el-button
                            style="margin-left: 10px"
                            type="danger"
                            circle
                            icon="el-icon-delete"
                             size="medium" v-if="scope.row.isDelete =='0'">
                             </el-button>
                           </el-tooltip>
                         </el-popconfirm>

                         <el-popconfirm
                           @confirm="Delzero(scope.row.id)"
                           confirm-button-text='确定'
                           cancel-button-text='取消'
                           icon="el-icon-info"
                           icon-color="red"
                           title="你确定恢复该客户吗？"
                         >
                             <el-tooltip slot="reference" effect="dark"  content="恢复" placement="top-start">
                             <el-button  v-if="scope.row.isDelete=='1'"
                                        style="margin-left: 10px"
                                        type="success" icon="el-icon-check" circle>
                               恢复
                             </el-button>
                             </el-tooltip>
                         </el-popconfirm>





                       </template>
                   </el-table-column>
                   </el-table>
                 </template>
                    <!--模态框-->
                            <el-dialog :visible.sync="dialogVisible" >

                              <el-form label-width="110px" status-icon  ref="form" :model="id" >
                                <el-container>
                                  <el-col :span="12">
                                    <el-form-item label="ID">
                                      <el-input v-model="id.id" disabled></el-input>
                                    </el-form-item>
                                    <el-form-item label="昵称: " >
                                      <el-input  maxlength="20" v-model="id.username" clearable placeholder="请输入昵称"></el-input>
                                    </el-form-item>
                                    <el-form-item label="头像: " >
                                      <!-- 头像 --><el-upload
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
                                    </el-form-item>
                                    <el-form-item label="真实姓名: " >
                                      <el-input  maxlength="4" v-model="id.uname" clearable placeholder="真实姓名"></el-input>
                                    </el-form-item>
                                    <el-form-item label="身份证: " >
                                      <el-input  maxlength="20" v-model="id.idCard" clearable placeholder="请输入身份证"></el-input>
                                    </el-form-item>
                                  </el-col>

                                  <el-col :span="12">
                                    <el-form-item label="性别: " >
                                      <el-radio-group v-model="id.sex">
                                      <el-radio  label="男"  value="男" border></el-radio>
                                      <el-radio  label="女"  value="女" border></el-radio>
                                      </el-radio-group>
                                    </el-form-item>
                                    <el-form-item label="手机号: ">
                                      <el-input  maxlength="20" v-model="id.phone" clearable placeholder="请输入手机号"></el-input>
                                    </el-form-item>
                                    <el-form-item label="个性签名: " >
                                      <el-input  maxlength="30" v-model="id.signature" clearable placeholder="个性签名"></el-input>
                                    </el-form-item>

                                  </el-col>

                                </el-container>

                              </el-form>

                              <div slot="footer" class="dialog-footer">
                                <el-button @click="dialogVisible = false" >取 消</el-button>
                                <el-button @click="user">确 定</el-button>
                              </div>
                            </el-dialog>
  </div>
</template>

      <script>
          export default {

            searchStr:this.searchStr="",
            isRealName:this.isRealName=null,
            Sex:this.Sex=null,
            idCard:this.idCard=null,


              name: "CustomerMaintain",
            data(){
              return{
                searchStr:"",
                isRealName:"-1",
                Sex:"-1",
                username:"",
                idCard:"",
                headPortrait:"",
                uname:"",
                sex:"",
                phone:"",
                signature:"",
                dxs:[],
                dialogVisible: false,
                id:[],
                idCard:"",
                visible: false,
                isDelete:"-1",
                imageFile:[]

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
              SelUser(){
                var _this = this;
                var params = new URLSearchParams();
                params.append("username",this.searchStr);
                params.append("state",this.isRealName);
                params.append("sex",this.Sex);
                params.append("isDelete",this.isDelete)
                this.$axios.post("/user/queryUser.action",params).then(function (item) {
                _this.dxs = item.data.records.map(val=>{
                  val.headPortrait="http://localhost:8090/xsyx/"+val.headPortrait;
                  return val;
                })
                }).catch()
                // console.log("searchStr:"+this.searchStr);
                // console.log("isRealName:"+this.isRealName)
                // console.log("Sex:"+this.Sex)
              },
              diaonima(id){
                this.dialogVisible=true
                var _this=this;
                var params=new URLSearchParams();
                params.append("id",id);
                this.$axios.post("/user/queryByid.action",params).then(function (item) {
                  console.log(item)
                  _this.id=item.data
                })
              },
              user(){
                this.dialogVisible=false
                var _this=this;
                var params=new FormData();
                for (let key in this.id){
                  if (key=="birthday" ){
                    continue;
                  }
                  params.append(key,_this.id[key])

                  // console.log(key)
                  // console.log(_this.id[key])
                }
                params.append("imgFile",this.imageFile[0])
                this.$axios({
                  method: 'post',
                  url: 'user/update.action',
                  data:params,
                  headers: {
                    'Content-Type':'multipart/form-data'
                  }
                }).then(function (item) {
                  _this.SelUser();
                  // console.log(item)
                })
              },
              Deluser(id){
                this.visible=true;
                var _this=this;
                var params=new URLSearchParams();
                params.append("id",id);
                this.$axios.post("/user/Deluser.action",params).then(function (item) {
                  _this.SelUser();
                  console.log(item)
                })
              },
              Delzero(id){
                this.visible=true;
                var _this=this;
                var params=new URLSearchParams();
                params.append("id",id);
                this.$axios.post("/user/Delzero.action",params).then(function (item) {
                  _this.SelUser();
                })
              },
              handleClose(done) {
                this.$confirm('确认关闭？')
                  .then(_ => {
                    done();
                  })
                  .catch(_ => {});
              }
            },created() {
              this.SelUser();
            }
            ,
            filters: {
              phone: (phone) => phone && phone.substring(0,3) + '****' + phone.substring(7),
              idCard: (idCard) => idCard && idCard.substring(0,6) + '****' + idCard.substring(10)
            }
          }
      </script>

      <style scoped>

        .demo-table-expand {
          font-size: 0;
        }
        .demo-table-expand label {
          width: 90px;
          color: #99a9bf;
        }
        .demo-table-expand .el-form-item {
          margin-right: 0;
          margin-bottom: 0;
          width: 50%;
        }

      </style>
