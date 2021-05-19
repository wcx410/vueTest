<!--商品类型维护页面-->
<template>
    <div>
        <!-- 模糊查询-->
        <el-input
                style="width: 300px"
                placeholder="请输入商品类型名"
                v-model="input"
                clearable>
        </el-input>
        <el-button
                type="primary"
                slot="append"
                icon="el-icon-search"
                @click="MohuqueryCommoditytype"

        >查询
        </el-button>
        <el-button
                type="success"
                slot="append"
                icon="el-icon-circle-plus"
                @click="addmotaikuang=true"
        >添加
        </el-button>
        <!--strip 双行阴影效果属性-->
        <el-table
                border
                :data="tableData"
                style="width: 100%;margin-top: 30px">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="类型ID：">
                            <span>{{ props.row.id }}</span>
                        </el-form-item>
                        <el-form-item label="类型名称：">
                            <span>{{ props.row.name }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                    label="类型ID"
                    prop="id">
            </el-table-column>
            <el-table-column
                    label="类型名称"
                    prop="name">
            </el-table-column>


            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" content="修改类型" placement="top-start">
                    <el-button
                            type="primary"
                            circle
                            icon="el-icon-edit"
                            size="medium"
                            @click="openupdateCommodityType(scope.$index, scope.row)"></el-button>
                    </el-tooltip>
                        <el-button
                            type="danger"
                            circle
                            icon="el-icon-delete"
                            size="medium"
                            @click="deleteCommodityType(scope.$index, scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>
      <!--分页-->
      <el-pagination
        @size-change="rowsChange"
        @current-change="pageChange"
        :current-page="newpage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="rows"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.total">
      </el-pagination>
        <!--添加模态框-->
        <el-dialog :close-on-click-modal="false"
                   title="添加"
                   :visible.sync="addmotaikuang">
            <el-input
                    style="width: 300px"
                    placeholder="---请输入类型---"
                    v-model="typename"
                    clearable>
            </el-input>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addCommodityType">确 定</el-button>
            </div>
        </el-dialog>
        <!--修改模态框-->
        <el-dialog :close-on-click-modal="false"
                   title="修改"
                   :visible.sync="updatemotaikuang">
            <el-input
                    style="width: 300px"
                    placeholder="---请输入类型---"
                    v-model="typename"
                    clearable>
            </el-input>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="updateCommodityType">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

    import Axios from "axios";

    export default {
      name: "CommodityTypeMaintain",

      data(){
        return{
        tableData:{},
          //添加模态框的状态
          addmotaikuang :false,
          //修改模态框的状态
          updatemotaikuang:false,
          //搜索框的变量
          input:"",
        //类型添加的值
        typename:"",
        //修改的类型id
        typeid:0,
          //当前页数
          newpage:1,
          //分页页码的值
          page:1,
          //分页一页多少行的值
          rows:5,
        }
      },
      components:{},
      methods: {
        //                      商品类型查询部分
        //***********************************************************
        //页面打开 查询所有商品类型信息
        getCommodityTypeAll() {
          var _this = this;
          let params = new URLSearchParams();
          params.append("name",this.input);
          params.append("page",this.page);
          params.append("rows",this.rows);
          this.$axios.post("/commodity/queryAlltypebydto.action",params).then(value => {
            console.log(value.data.records)
            _this.tableData = value.data.records;
          })
        },
        //点击查询按钮 模糊查询商品类型
        MohuqueryCommoditytype(){
          this.getCommodityTypeAll();
        },
        /*点击换条数的按钮*/
        rowsChange(val) {
          //修改条数的值
          console.log(val)
          this.rows=val;
          this.getCommodityTypeAll();
        },
        //点击分页页数按钮
        pageChange(val) {
          //修改页数的值
          this.page=val;
          this.getCommodityTypeAll();
        },
        //打开添加模态框
        openaddCommodityType() {

        },
        //添加类型
        addCommodityType() {
          //alert(this.typename)
          let params = new URLSearchParams();
          params.append("name", this.typename);
          //添加
          var _this = this;
          this.$axios.post("/commodity/addtype.action", params).then((result) => {
            if (result.data === true) {
              _this.$message({
                type: 'success',
                message: "添加成功√"
              });
            }
            //刷新页面
            this.getCommodityTypeAll();
            this.addmotaikuang = false;
          }).catch((msg) => {
            _this.$message({
              type: 'error',
              message: "添加失败×"
            });
            //关闭模态框
            this.addmotaikuang = false;
            //刷新页面
            this.getCommodityTypeAll();
          })
        },
        //打开修改模态框
        openupdateCommodityType(index, row) {
          this.updatemotaikuang = true;
          //获取id
          this.typeid = row.id
          //alert(row.id)
          //赋值
          this.typename = row.name;
        },
        //提交修改
        updateCommodityType() {
          let params = new URLSearchParams();
          params.append("id", this.typeid);
          params.append("name", this.typename);
          //修改
          var _this = this;
          this.$axios.post("/commodity/updatetype.action", params).then((result) => {
            if (result.data === true) {
              _this.$message({
                type: 'success',
                message: "修改成功√"
              });
            }
            //刷新页面
            this.getCommodityTypeAll();
            this.updatemotaikuang = false;
          }).catch((msg) => {
            _this.$message({
              type: 'error',
              message: "修改失败×"
            });
            //关闭模态框
            this.updatemotaikuang = false;
            //刷新页面
            this.getCommodityTypeAll();
          })
        },
        //                      商品类型删除部分
        //***********************************************************

        deleteCommodityType(index, row) {
          this.$confirm('此操作将删除类型, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            let params = new URLSearchParams();
            params.append("id", row.id)
            console.log(row.id)
            //执行删除操作
            this.$axios.post("/commodity/deletetype.action", params)
              .then((result) => {
                if (result.data === true) {
                  this.$message({
                    type: 'success',
                    message: "删除成功√"
                  });
                }
                //刷新页面
                this.getCommodityTypeAll();
              }).catch((msg) => {
              this.$message({
                type: 'error',
                message: "删除失败×"
              });
            });


          }).catch(() => {
            this.$message({
              type: 'error',
              message: '已取消删除'
            });
          });
        }
      },

      created() {
        this.$store.commit('back/url', window.location.href);

        //加载所有商品类型信息
        this.getCommodityTypeAll();

        //获取登录信息
        /*EmpHelper.getEmp().then(value => {
                console.log(value);
            })*/
      }


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

    /*table拉开的样式 ↑*/


</style>
