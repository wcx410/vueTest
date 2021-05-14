<!-- 员工管理 -->
<template>
  <div>
    <!-- 模糊查询-->
    <el-input
      style="width: 600px"
      placeholder="请输入关键字"
      v-model="searchStr"
      clearable>
      <div slot="prepend">
        <el-tooltip effect="dark" content="冻结状态" placement="top-end">
          <!-- 冻结状态-->
          <el-select v-model="searchSate" placeholder="状态" style="width: 90px;">
            <el-option label="全部" value=""></el-option>
            <el-option label="激活" value="1"></el-option>
            <el-option label="冻结" value="0"></el-option>
          </el-select>
        </el-tooltip>
        <el-tooltip effect="dark" content="性别" placement="top-start">
          <!-- 性别-->
          <el-select v-model="searchSex" placeholder="性别"  style="width: 90px;margin-left: 20px;border-left: 1px solid #DCDFE6">
            <el-option label="全部" value=""></el-option>
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-tooltip>
      </div>
      <template slot="append">
        <el-button

          slot="append"
          icon="el-icon-search"
          @click="query">
          查询
        </el-button>
      </template>
    </el-input>

    <el-button

      plain
      type="success"
      slot="append"
      icon="el-icon-circle-plus"
      style="margin-left: 15px"
      @click="openAdd"
    >添加
    </el-button>

    <!--strip 双行阴影效果属性-->
    <el-table
      v-loading="isLoading"
      border
      :data="tableData"
      style="width: 100%;margin-top: 30px">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="用户ID ：">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="用户名 ：">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="头像 ：">
              <el-image style="height: 100px;width: 135px" :preview-src-list="[$host + props.row.image]" src="$host + row.image" fit="cover"></el-image>
            </el-form-item>
            <el-form-item label="性别 ：">
              <span>{{ props.row.sex }}</span>
            </el-form-item>
            <el-form-item label="手机号 ：">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="身份证号码 ：">
              <span>{{ props.row.icCard }}</span>
            </el-form-item>
            <el-form-item label="员工住址 ：">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="邮箱 ：">
              <span>{{ props.row.email }}</span>
            </el-form-item>
            <el-form-item label="备注 ：">
              <span>{{ props.row.remark }}</span>
            </el-form-item>
            <el-form-item label="最后上线日期 ：">
              <span>{{ props.row.lastLoginTime }}</span>
            </el-form-item>
            <el-form-item label="状态 ：">
              <span>{{ getState(props.row.state) }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        sortable
        width="70px"
        label="ID"
        prop="id">
      </el-table-column>
      <el-table-column
        width="140px"
        label="姓名"
        prop="name">
      </el-table-column>
      <el-table-column
        width="65px"
        label="性别"
        prop="sex">
      </el-table-column>
      <el-table-column
        width="120"
        label="头像"
      prop="image">
      </el-table-column>
      <el-table-column
        sortable
        width="140px"
        label="手机号"
        prop="phone">
      </el-table-column>
      <el-table-column
        sortable
        label="邮箱"
        prop="email">
      </el-table-column>


      <el-table-column label="操作">
        <template slot-scope="scope">
          <!--修改员工-->
          <el-tooltip effect="dark" content="编辑" placement="top-start">
            <el-button
              type="primary"
              circle
              icon="el-icon-edit"
              size="medium"
              @click="openUpdate(scope.$index, scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip v-if="scope.row.state === 1" effect="dark" content="冻结" placement="top-start">
            <el-button
              type="warning"
              circle
              icon="el-icon-video-pause"
              size="medium"
              @click="openFreezeValidation(scope.$index, scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip v-if="scope.row.state === 0" effect="dark" content="激活" placement="top-start">
            <!--&lt;!&ndash; el-icon-video-play &ndash;&gt;-->
            <el-button
              type="success"
              circle
              icon="el-icon-video-play"
              size="medium"
              @click="openUnFreezeValidation(scope.$index, scope.row)"
            ></el-button>

            </el-tooltip>

          <el-tooltip effect="dark" content="删除" placement="top-start"
                      >
            <el-button
              type="danger"
              circle
              icon="el-icon-delete"
              size="medium"
              @click="openDeleteValidation(scope.$index, scope.row)"
            ></el-button>
            </el-tooltip>

          <!--&lt;!&ndash;员工角色&ndash;&gt;-->
          <el-tooltip effect="dark" content="添加角色" placement="top-start"
          >
            <el-button
              type="danger"
              circle
              icon="el-icon-user"
              size="medium"
              @click="openEmpRoles(scope.$index, scope.row)"
            ></el-button>
          </el-tooltip>

        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="rowChange"
      @current-change="pageChange"
      background
      :page-sizes="[10, 15, 25, 50]"
      :page-size="10"
      layout="total, sizes, prev, pager, next"
      :total="total">
    </el-pagination>

   <!--&lt;!&ndash; 添加功能模态框&ndash;&gt;-->
    <el-dialog :close-on-click-modal="false"
               title="员工添加"
               :visible.sync="addmotaikuang">
      <!--&lt;!&ndash; 商品编辑组件, 传入data值, 传入图片列表 &ndash;&gt;-->
      <!--<emp-management-edit ref="editBox" :form-data="formData" :image-file="imageFile"></emp-management-edit>-->
      <EmpManagementEdit :form-data="formData" :image-file="imageFile"></EmpManagementEdit>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addmotaikuang = false">取 消</el-button>
        <!--&lt;!&ndash;点击调用添加方法&ndash;&gt;-->
        <el-button type="primary" @click="submitAddEmp">确 定</el-button>
      </div>
    </el-dialog>

        <!--&lt;!&ndash; 修改功能模态框&ndash;&gt;-->
        <el-dialog :close-on-click-modal="false"
                   title="员工修改"
                   :visible.sync="updatemotaikuang">
          <!--&lt;!&ndash; 商品编辑组件, 传入data值, 传入图片列表 &ndash;&gt;-->
          <!--<emp-management-edit ref="editBox" :form-data="formData" :image-file="imageFile"></emp-management-edit>-->
          <EmpManagementEdit :form-data="formData" :image-file="imageFile"></EmpManagementEdit>
          <div slot="footer" class="dialog-footer">
            <el-button @click="updatemotaikuang = false">取 消</el-button>
            <!--&lt;!&ndash;点击调用修改方法&ndash;&gt;-->
            <el-button type="primary" @click="submitUpdateEmp">确 定</el-button>
          </div>
        </el-dialog>

            <!--&lt;!&ndash; 冻结员工 &ndash;&gt;-->
            <el-dialog :close-on-click-modal="false"
                       title="身份验证"
                       :visible.sync="freezeyanzheng"
                       width="300px">
              <div>
                <p>冻结员工: 你正在操作敏感数据, 请输入你的登录密码以确保是你本人操作 !</p>
                <el-input v-model="freezeYzPassword" type="password" clearable show-password></el-input>
              </div>

              <div slot="footer" class="dialog-footer">
                <el-button @click="freezeyanzheng = false">取 消</el-button>
                <!--&lt;!&ndash;点击调用修改方法&ndash;&gt;-->
                <el-button type="primary" @click="freezeEmp">确 定</el-button>
              </div>
            </el-dialog>

            <!--&lt;!&ndash;&lt;!&ndash; 激活员工 &ndash;&gt;&ndash;&gt;-->
            <el-dialog :close-on-click-modal="false"
                       title="身份验证"
                       :visible.sync="unFreezeyanzheng"
                       width="300px">
              <div>
                <p>激活员工: 你正在操作敏感数据, 请输入你的登录密码以确保是你本人操作 !</p>
                <el-input v-model="unFreezeYzPassword" type="password" clearable show-password></el-input>
              </div>

              <div slot="footer" class="dialog-footer">
                <el-button @click="unFreezeyanzheng = false">取 消</el-button>
                <!--&lt;!&ndash;&lt;!&ndash;点击调用修改方法&ndash;&gt;&ndash;&gt;-->
                <el-button type="primary" @click="unFreezeEmp">确 定</el-button>
              </div>
            </el-dialog>

                <!--&lt;!&ndash; 删除员工 &ndash;&gt;-->
                <el-dialog :close-on-click-modal="false"
                           title="身份验证"
                           :visible.sync="deleteyanzheng"
                           width="300px">
                  <div>
                    <p>删除员工: 你正在操作敏感数据, 请输入你的登录密码以确保是你本人操作 !</p>
                    <el-input v-model="deleteYzPassword" type="password" clearable show-password></el-input>
                  </div>
            <!--&lt;!&ndash;dialog-footer footer&ndash;&gt;-->
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="deleteyanzheng = false">取 消</el-button>
                    <!--&lt;!&ndash;点击调用修改方法&ndash;&gt;-->
                    <el-button type="primary" @click="deleteEmp">确 定</el-button>
                  </div>
                </el-dialog>

    <!--&lt;!&ndash; 编辑角色 &ndash;&gt;-->
    <!--&lt;!&ndash; 模态框 &ndash;&gt;-->
    <el-dialog :close-on-click-modal="false"
               title="角色添加"
               :visible.sync="rolesyanzheng"
               width="300px">
      <EmpManagementEdit :form-data="formData" :image-file="imageFile"></EmpManagementEdit>

      <div slot="footer" class="dialog-footer">
        <el-button @click="rolesyanzheng = false">取 消</el-button>
        <!--点击调用修改方法-->
        <el-button type="primary" @click="empRole">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
  import EmpManagementEdit from "./EmpManagementEdit"

  export default {
    name:"EmpManagement",
    data(){
      return{
            // "name": "",
            // "image": "",
            // "sex": "男",
            // "phone": "",
            // "icCard": "",
            // "email": "",
            // "address": "",
            // "remark": "",
    //     $refs: {
    //       editBox: any
    // },
      //自己的id
        id:0,
      //加载状态
      isLoading : false,
      //查询输入框
      searchStr: "",
      //性别
      searchSex: '',
      //状态
      searchSate: '',
      //表数据
      tableData: {},
      //当前页数
      page:1,
      //每页条
      row:10,
        //
       total:0,

      //添加员工表单模态框是否打开
      addmotaikuang: false,
      //修改员工表单模态框是否打开
      updatemotaikuang: false,
      //表单数据
      formData:[],
      //表单图片
      imageFile:{url: null},

      //选择的员工Id
      selectEmpId: 0,

      //冻结验证模态框
      freezeyanzheng: false,
      //冻结验证密码
      freezeYzPassword: "",

      //激活验证模态框
      unFreezeyanzheng: false,
      //激活验证密码
      unFreezeYzPassword: "",

      //删除员工验证模态框
      deleteyanzheng: false,
      //删除验证密码
      deleteYzPassword:"",
      }
    },
    components:{
      EmpManagementEdit
    },
    methods: {
      //获取状态
      getState(state) {
        if (state === -1) return "已删除";
        if (state === 0) return "已冻结";
        if (state === 1) return "已激活";
      },

      //***********************************************************
      //                          查询员工
      //***********************************************************

      //页面大小改变
      rowChange(val) {
        this.row = val;
        this.getEmpManagement();
      },
      //页数改变
      pageChange(val) {
        this.page = val;
        this.getEmpManagement();
      },
      /**
       * 查询员工
       */
      getEmpManagement(){
        var _this = this;
        let params = new URLSearchParams();
        params.append("searchStr",this.searchStr);
        params.append("searchSate",this.searchSate);
        params.append("searchSex",this.searchSex);
        params.append("page",this.page);
        params.append("rows",this.row);

        this.$axios.post("employee/queryallemp",params).then(value => {
          console.log("-----------------------------");
          console.log(value);
          _this.tableData=value.data.records;
          _this.total=value.data.total;
        }).catch()
      },
      //点击查询按钮，模糊查询
      query(){
        this.getEmpManagement();
      },
      //***********************************************************
      //                          添加员工
      //***********************************************************

      /**
       * 打开添加员工窗口
       */
      openAdd() {
        this.addmotaikuang = true;
        this.formData = [];
        this.imageFile = {url: null};
      },

      //提交添加
      async submitAddEmp() {
        var _this = this;
        this.addmotaikuang = false;
        let params = new URLSearchParams();
        params.append("name",this.formData.name);
        params.append("image",this.imageFile.url);
        params.append("sex",this.formData.sex);
        params.append("phone",this.formData.phone);
        params.append("icCard",this.formData.icCard);
        params.append("email",this.formData.email);
        params.append("address",this.formData.address);
        params.append("remark",this.formData.remark);

        this.$axios.post("employee/add",params)
          .then((result)=> {
            if (result.data===true){
              _this.$message({
                type: 'success',
                message: "添加成功√"
              });
            }
            //刷新页面
            this.getEmpManagement();
          }).catch((msg) => {
          _this.$message({
            type: 'error',
            message: "添加失败×"
          });
        });
      },

      //***********************************************************
      //                          修改员工
      //***********************************************************
      //打开修改方法
      openUpdate(index, row) {
        //获取商品id
        this.id=row.id;

        this.formData = row;
        console.log(row);
        this.imageFile = {url: row.image};
        this.updatemotaikuang = true;
      },
      //提交修改
      async submitUpdateEmp() {
        this.updatemotaikuang = false;
        let params = new URLSearchParams();
        params.append("name",this.formData.name);
        params.append("image",this.imageFile.url);
        params.append("sex",this.formData.sex);
        params.append("phone",this.formData.phone);
        params.append("icCard",this.formData.icCard);
        params.append("email",this.formData.email);
        params.append("address",this.formData.address);
        params.append("remark",this.formData.remark);
        params.append("id",this.id);

        this.$axios.post("/employee/update",params)
          .then((result)=> {
            if (result.data===true){
              this.$message({
                type: 'success',
                message: "修改成功√"
              });
            }
            //刷新页面
            this.getEmpManagement();
          }).catch((msg) => {
          this.$message({
            type: 'error',
            message: "修改失败×"
          });
        });
      },
      // ***********************************************************
      //                          冻结员工
      // ***********************************************************
      //打开验证
      openFreezeValidation(index,row) {
        this.selectEmpId = row.id;
        this.freezeyanzheng = true;
        this.freezeYzPassword = "";
      },
      async freezeEmp(){
        let params = new URLSearchParams();
        params.append("password", this.freezeYzPassword);
        params.append("empId",this.selectEmpId);
        this.$axios.post("/employee/validation", params).then((result)=> {
          if (result.data===true){
            this.$message({
              type: 'success',
              message: "冻结成功√"
            });
          }
          //刷新页面
          this.getEmpManagement();
          this.freezeyanzheng = false;
        }).catch((msg) => {
          this.$message({
            type: 'error',
            message: "冻结失败×"
          });
        });
      },

      //***********************************************************
      //                          激活员工
      //***********************************************************
      //打开验证
      openUnFreezeValidation(index,row) {
        this.selectEmpId = row.id;
        this.unFreezeyanzheng = true;
        this.unFreezeYzPassword = "";
      },

      async unFreezeEmp(){
        let params = new URLSearchParams();
        params.append("password", this.unFreezeYzPassword);
        params.append("empId",this.selectEmpId);
        this.$axios.post("/employee/unFreeze", params).then((result)=> {
          if (result.data===true){
            this.$message({
              type: 'success',
              message: "激活成功√"
            });
          }
          //刷新页面
          this.getEmpManagement();
          this.unFreezeyanzheng = false;
        }).catch((msg) => {
          this.$message({
            type: 'error',
            message: "激活失败×"
          });
        });
      },

      //***********************************************************
      //                          删除员工
      //***********************************************************
      //打开验证
      openDeleteValidation(index,row) {
        this.selectEmpId = row.id;
        this.deleteyanzheng = true;
        this.deleteYzPassword = "";
      },
      async deleteEmp(){
        let params = new URLSearchParams();
        params.append("empId",this.selectEmpId);
        params.append("password",this.deleteYzPassword)
        this.$axios.post("/employee/delete", params).then((result)=> {
          if (result.data===true){
            this.$message({
              type: 'success',
              message: "删除成功√"
            });
          }
          //刷新页面
          this.getEmpManagement();
          this.deleteyanzheng = false;
        }).catch((msg) => {
          this.$message({
            type: 'error',
            message: "删除失败×"
          });
        });
      },
      /**获取角色*/
      async loadEmpRoles(row) {
        this.$set(row,"roleData",await EmpHelper.getRolesByEmpId(row.id));
      }
    },

    created() {
      this.$store.commit('back/url', window.location.href);
      this.getEmpManagement();
      //延迟表格加载
      setTimeout(() => {
        this.isLoading = false;
      }, 2000)
    },
  }
</script>

<style scoped>
  /*table拉开的样式 ↓*/
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
