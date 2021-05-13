<!--角色管理-->
<template>
  <div>

    <!-- 模糊查询-->
    <el-input
      style="width: 450px"
      placeholder="请输入关键字"
      v-model="searchStr"
      clearable>
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

    <el-table
      v-loading="isLoading"
      border
      :data="tableData"
      style="width: 100%;margin-top: 30px">
      <el-table-column
        sortable
        width="100px"
        label="角色 ID"
        prop="id">
      </el-table-column>
      <el-table-column
        width="200px"
        label="角色名称"
        prop="name">
      </el-table-column>

      <el-table-column
        label="拥有人数"
        width="180">
        <!--<template slot-scope="{row}">-->
          <!--<el-popover trigger="hover" ref="" placement="top" @show="row.empData === undefined && loadEmp(row)">-->
            <!--<div v-loading="row.empData === undefined">-->
              <!--<el-table :data="row.empData" height="250">-->
                <!--<el-table-column label="id" prop="id"/>-->
                <!--<el-table-column label="姓名" prop="name"/>-->
                <!--<el-table-column label="头像">-->
                  <!--<template slot-scope="{row}">-->
                    <!--<el-image style="height: 30px;width: 45px" :src="$host + row.image" fit="cover"-->
                              <!--:preview-src-list="[$host + row.image]"></el-image>-->
                  <!--</template>-->
                <!--</el-table-column>-->
              <!--</el-table>-->
            <!--</div>-->
            <!--<el-tag slot="reference" size="medium">人数 : {{ row.hasEmpCount }}</el-tag>-->
          <!--</el-popover>-->
        <!--</template>-->
      </el-table-column>

      <el-table-column
        label="角色备注"
        prop="remark">
      </el-table-column>
      <el-table-column label="操作" width="180px">
        <template slot-scope="scope">
          <el-tooltip effect="dark" content="编辑" placement="top-start">
            <el-button
              type="primary"
              circle
              icon="el-icon-edit"
              size="medium"
              @click="openUpdate(scope.$index, scope.row)"
            ></el-button>
          </el-tooltip>

          <el-popconfirm
            @confirm="deleteRole(scope.row.id)"
            confirm-button-text='确定'
            cancel-button-text='取消'
            icon="el-icon-info"
            icon-color="red"
            title="你确定删除该角色吗？该操作不能取消 !">
            <el-tooltip slot="reference" effect="dark" content="删除" placement="top-start">
              <el-button
                style="margin-left: 10px"
                type="danger"
                circle
                icon="el-icon-delete"
                size="medium"
              ></el-button>
            </el-tooltip>
          </el-popconfirm>

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
               title="角色添加"
               :visible.sync="addmotaikuang">
      <!--&lt;!&ndash; 商品编辑组件, 传入data值, 传入图片列表 &ndash;&gt;-->
      <!--<emp-management-edit ref="editBox" :form-data="formData" :image-file="imageFile"></emp-management-edit>-->
      <RoleManagementEdit :form-data="formData" ></RoleManagementEdit>
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
      <RoleManagementEdit :form-data="formData" ></RoleManagementEdit>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updatemotaikuang = false">取 消</el-button>
        <!--&lt;!&ndash;点击调用修改方法&ndash;&gt;-->
        <el-button type="primary" @click="submitUpdateEmp">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import RoleManagementEdit from "./RoleManagementEdit";
  export default {
    name:"RoleManagement",
    data(){
      return{
        id:0,
        //加载状态
        isLoading : false,
        //查询输入框
        searchStr: "",
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
      }
    },
    components:{
      RoleManagementEdit
    },
    created() {
      this.$store.commit('back/url', window.location.href);
      this.getRoleManagement();
      //延迟表格加载
      setTimeout(() => {
        this.isLoading = false;
      }, 2000)
    },
    methods:{
      //页面大小改变
      rowChange(val) {
        this.row = val;
        this.getRoleManagement();
      },
      //页数改变
      pageChange(val) {
        this.page = val;
        this.getRoleManagement();
      },
      /**
       * 查询员工
       */
      getRoleManagement(){
        var _this = this;
        let params = new URLSearchParams();
        params.append("searchStr",this.searchStr);
        params.append("page",this.page);
        params.append("rows",this.row);

        this.$axios.post("role/queryallrole",params).then(value => {
          console.log("-----------------------------");
          console.log(value);
          _this.tableData=value.data.records;
          _this.total=value.data.total;
        }).catch()
      },
      //点击查询按钮，模糊查询
      query(){
        this.getRoleManagement();
      },

      openAdd() {
        this.addmotaikuang = true;
        this.formData = [];
      },

      //提交添加
      async submitAddEmp() {
        var _this = this;
        this.addmotaikuang = false;
        let params = new URLSearchParams();
        params.append("name",this.formData.name);
        params.append("remark",this.formData.remark);

        this.$axios.post("role/add",params)
          .then((result)=> {
            if (result.data===true){
              _this.$message({
                type: 'success',
                message: "添加成功√"
              });
            }
            //刷新页面
            this.getRoleManagement();
          }).catch((msg) => {
          _this.$message({
            type: 'error',
            message: "添加失败×"
          });
        });
      },
      //打开修改方法
      openUpdate(index, row) {
        //获取商品id
        this.id=row.id;

        this.formData = row;
        console.log(row);
        this.updatemotaikuang = true;
      },
      //提交修改
      async submitUpdateEmp() {
        this.updatemotaikuang = false;
        let params = new URLSearchParams();
        params.append("name",this.formData.name);
        params.append("remark",this.formData.remark);
        params.append("id",this.id);

        this.$axios.post("/role/update",params)
          .then((result)=> {
            if (result.data===true){
              this.$message({
                type: 'success',
                message: "修改成功√"
              });
            }
            //刷新页面
            this.getRoleManagement();
          }).catch((msg) => {
          this.$message({
            type: 'error',
            message: "修改失败×"
          });
        });
      },
      async deleteRole(id){
        let params = new URLSearchParams();
        params.append("id",id);
        this.$axios.post("/role/delete", params).then((result)=> {
          if (result.data===true){
            this.$message({
              type: 'success',
              message: "删除成功√"
            });
          }
          //刷新页面
          this.getRoleManagement();
        }).catch((msg) => {
          this.$message({
            type: 'error',
            message: "删除失败×"
          });
        });

      }
    }
  }
</script>
<style scoped>

</style>
