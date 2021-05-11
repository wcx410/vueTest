<template>
  <div>
    <!-- 模糊查询-->
    <el-input
      style="width: 450px"
      placeholder="请输入商户名称"
      v-model="input"
      clearable>
      <template slot="append">
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="MohuqueryCommodity">
          查询
        </el-button>
      </template>
    </el-input>

    <el-table
      v-loading="loading"
      border
      :data="tableData"
      style="width: 100%;margin-top: 30px">
      <el-table-column
        sortable
        width="100px"
        label="ID"
        prop="id">
      </el-table-column>
      <el-table-column
        width="200px"
        label="商户名称"
        prop="name">
      </el-table-column>
      <el-table-column
        label="申请人姓名"
        prop="uname">
      </el-table-column>
      <el-table-column
        label="商户地址"
        prop="address">
      </el-table-column>
      <el-table-column
        width="200px"
        label="商户电话"
        prop="phone">
      </el-table-column>
      <el-table-column
        width="200px"
        label="申请时间"
        prop="applyTime">
      </el-table-column>
      <el-table-column
        label="申请消息"
        prop="userMessage">
      </el-table-column>

      <el-table-column label="操作" width="180px">
        <template slot-scope="{row}">
          <el-tooltip effect="dark" content="通过" placement="top-start" >
            <el-button
              type="primary"
              circle
              icon="el-icon-check"
              size="medium"
              @click="approval(row.id,true)"
            ></el-button>
          </el-tooltip>
          <el-tooltip effect="dark" content="拒绝" placement="top-start" >
            <el-button
              type="danger"
              circle
              icon="el-icon-close"
              size="medium"
              @click="approval(row.id,false)"
            ></el-button>
          </el-tooltip>

        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="rowsChange"
      @current-change="pageChange"
      background
      :page-sizes="[10, 15, 25, 50]"
      :page-size="rows"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.total">
    </el-pagination>


    <!-- 模态框 -->
    <el-dialog :close-on-click-modal="false"
               :title="dialog.title"
               :visible.sync="dialog.visible"
               width="400px">
      <div>

        <el-form>
          <el-form-item label="审批消息: ">
            <el-input v-model="message" maxlength="50" clearable placeholder="请输入审批消息..."></el-input>
          </el-form-item>
        </el-form>

      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="dialog.success">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import Axios from "axios";
  import el from "element-ui/src/locale/lang/el";

  export default {
    name: "MaintenanceApply",
    data() {
      return {
        // /!*延迟表格加载*!/
        loading: false,
        //搜索框的变量
        input: "",
        //商品数据
        tableData: {},
        //修改模态框的状态
        updatemotaikuang:false,
        //模态框
        dialog:{
          title: "",
          visible: false,
          success() {},
        },
        message:"",
        //弹框标题
        title: "",
        //当前页数
        newpage: 1,
        //分页页码的值
        page: 1,
        //分页一页多少行的值
        rows: 5
      }
    },
    methods: {
      //页面打开 查询所有订单信息
      getCommodityAll() {
        var _this = this;
        let params = new URLSearchParams();
        params.append("search_name", this.input);
        params.append("page", this.page);
        params.append("rows", this.rows);

        this.$axios.post("/shop/querymerchantsstatu.action", params).then((value) => {
          _this.tableData = value.data.rows;
        })
      },
      //点击查询按钮 模糊查询商品信息
      MohuqueryCommodity() {
        this.getCommodityAll();
      },
      //分页部分
      /*点击换条数的按钮*/
      rowsChange(val) {
        //修改条数的值
        console.log(val)
        this.rows = val;
        this.getCommodityAll();
      },
      //点击分页页数按钮
      pageChange(val) {
        //修改页数的值
        this.page = val;
        this.getCommodityAll();
      },
      approval(id, flag) {
        this.message = "";
        this.dialog.visible = true;
        this.dialog.title = flag ? "审批通过" : "审批拒绝";
        if(this.dialog.title=="审批通过"){
          this.dialog.success = async () =>{
            let params = new URLSearchParams();
            params.append("system_message", this.message);
            params.append("id", id);
            params.append("state",1)
            this.$axios.post("/shop/updatemerchantapply.action", params).then((value) => {
              this.dialog.visible = false;
              if(value){
                this.$message({
                  message: '申请通过√',
                  type: 'success'
                });
                this.getCommodityAll();
              }else {
                this.$message({
                  message: '申请失败×',
                  type: 'error'
                });
              }
            })
          }
        }else {
          this.dialog.success = async () =>{
            let params = new URLSearchParams();
            params.append("system_message", this.message);
            params.append("id", id);
            params.append("state",2)
            this.$axios.post("/shop/updatemerchantapply.action", params).then((value) => {
              this.dialog.visible = false;
              if(value){
                this.$message({
                  message: '申请拒绝×',
                  type: 'warning'
                });
                this.getCommodityAll();
              }else {
                this.$message({
                  message: '申请失败×',
                  type: 'error'
                });
              }
            })
          }
        }
      }
    },
    created() {
      this.getCommodityAll();
    }
  }
</script>

<style scoped>

</style>
