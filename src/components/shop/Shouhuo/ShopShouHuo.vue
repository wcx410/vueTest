<!--商户收货-->
<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-card shadow="hover">
          <!-- 模糊查询-->
          <el-input
            style="width: 65%;margin-right: 10px"
            placeholder="请输入用户姓名"
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

          <!--收货按钮-->

          <el-button icon="el-icon-suitcase" type="primary" plain @click="openDialog">确认收货</el-button>
        </el-card>
      </el-col>
    </el-row>

    <el-row style="margin-top: 15px">
      <el-col :span="24">
        <el-card style="width: 100%;min-height: 400px" shadow="hover">
          <!--strip 双行阴影效果属性-->
          <el-table
            @selection-change="checkChange"
            v-loading="loading"
            border
            :data="tableData"
            style="width: 100%;margin-top: 30px">
            <el-table-column type="expand">
              <template slot-scope="{row}">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="ID ：">
                    <span>{{ row.orderNumber }}</span>
                  </el-form-item>
                  <el-form-item label="订单状态 ：">
                    <span>{{ row.ordstate | state }}</span>
                  </el-form-item>
                  <el-form-item label="用户昵称 ：">
                    <span>{{ row.username }}</span>
                  </el-form-item>
                  <el-form-item label="用户姓名 ：">
                    <span>{{ row.uname }}</span>
                  </el-form-item>
                  <el-form-item label="商品名称 ：">
                    <span>{{ row.name }}</span>
                  </el-form-item>
                  <el-form-item label="用户手机号 ：">
                    <span>{{ row.phone | phone }}</span>
                  </el-form-item>
                  <el-form-item label="商品图片 ：">
                    <el-image style="height: 100px;width: 150px" src="" fit="cover" lazy></el-image>
                  </el-form-item><br>
                  <el-form-item label="数量 ：">
                    <span>{{ row.number }}</span>
                  </el-form-item>
                  <el-form-item label="总价 ：">
                    <span>{{ row.totlemoney }}</span>
                  </el-form-item>

                  <el-form-item label="收货时间 ：">
                    <span>{{ row.deliveryTime}}</span>
                  </el-form-item>
                  <el-form-item label="提货时间 ：">
                    <span>{{ row.pickUpTime}}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              sortable
              label="订单编号"
              prop="orderNumber">
            </el-table-column>
            <el-table-column
              width="120px"
              label="用户姓名"
              prop="uname">
            </el-table-column>
            <el-table-column
              label="商品名称"
              prop="name">
            </el-table-column>
            <el-table-column
              sortable
              width="110px"
              label="商品数量"
              prop="number">
            </el-table-column>
            <el-table-column
              label="用户手机号"
              prop="phone">
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
        </el-card>
      </el-col>
    </el-row>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="300px">
      <span>您目前已选中{{selectRows.length}}条记录, 你确定收货吗 ?</span>
      <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="shouhuo">确 定</el-button>
              </span>
    </el-dialog>
  </div>
</template>


<script>
  import Axios from "axios";

  import el from "element-ui/src/locale/lang/el";

  export default {
    name: "ShopShouHuo",
    data() {
      return {
        // /!*延迟表格加载*!/
        loading: false,
        //添加模态框的状态
        dialogVisible:false,
        //搜索框的变量
        input: "",
        //商品数据(包括图片)
        tableData: {},
        //当前页数
        newpage: 1,
        //分页页码的值
        page: 1,
        //分页一页多少行的值
        rows: 5,
        //选中的行
        selectRows: [],
        fromData: {
          comDiscount: {}
        },
        imageFile: {
          url: null
        }
      }
    },
    methods: {
      //页面打开 查询所有订单信息
      getCommodityAll() {
        var _this = this;
        let params = new URLSearchParams();
        params.append("search_uname", this.input);
        params.append("page", this.page);
        params.append("rows", this.rows);

        this.$axios.post("/shop/queryshouhuo.action", params).then(value => {
          _this.tableData = value.data.rows;
          console.log(this.tableData)
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
        this.rows = val;
        this.getCommodityAll();
      },
      //点击分页页数按钮
      pageChange(val) {
        //修改页数的值
        this.page = val;
        this.getCommodityAll();
      },
      //复选框选择
      checkChange(val) {
        this.selectRows = val;
      },
      //判断复选框是否选择
      openDialog() {
        if (this.selectRows.length == 0) {
          this.$notify.error({title: "提示",message: "请至少选择一行 !"});
          return;
        }
        this.dialogVisible = true;
      },
      //修改订单状态为待提货（ordstate=2）
      shouhuo(){
        var list =[];
        for(var i =0;i<this.selectRows.length;i++){
          list.push(this.selectRows[i].id);
        }
        //修改订单状态为待提货
        this.$axios.post("/shop/updatepshopcars.action",JSON.stringify(list),{headers: {'Content-Type': 'application/json'}}).then(value => {
          this.dialogVisible = false;
          if(value){//向收货门店表插入数据
            var arr=[];
            for (var i = 0; i < this.selectRows.length; i++) {
              arr.push(this.selectRows[i])
            }
            console.log(arr)
            this.$axios.post("/shop/insertpickupmerchants.action",JSON.stringify(arr),{headers: {'Content-Type': 'application/json'}}).then(value => {
              this.$message({
                message: '收货成功√',
                type: 'success'
              });
              this.getCommodityAll();
            })
          }else {
            this.$message({
              message: '收货失败×',
              type: 'warning'
            });
          }
        })
      }
    },
    filters: {
      phone:function(value){
        return value.substring(0,3)+ '****' + value.substring(7);
      },
      idCard:function(value){
        return value.substring(0,6) + '****' + value.substring(10);
      },
      state:function(value){
        if (value == 0) return "待发货";
        if (value == 1) return "未收货";
        if (value == 2) return "待提货";
        if (value == 3) return "已提货";
        if (value == 4) return "待退款";
        if (value == 5) return "已退款";
        return value;
      },
    },
    created() {
      this.getCommodityAll();
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
</style>
