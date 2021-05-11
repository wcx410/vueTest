<!--商户订单查询-->
<template>
  <div>
    <el-row>
      <el-col :span="10">
        <el-card style="width: 100%" shadow="hover">
          <!-- 模糊查询-->
          <el-input
            style="width: 100%"
            placeholder="请输入商户名称"
            v-model="input"
            clearable>
            <div slot="prepend">
              <el-tooltip effect="dark" content="商户状态" placement="top-end">
                <!-- 订单状态 -->
                <el-select v-model="state" placeholder="商户状态" style="width: 110px;">
                  <el-option value="全部">全部</el-option>
                  <el-option value="冻结">冻结</el-option>
                  <el-option value="正常">正常</el-option>
                  <el-option value="删除">删除</el-option>
                </el-select>
              </el-tooltip>
            </div>
            <!--查询按钮-->
            <template slot="append">
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="MohuqueryCommodity">
                查询
              </el-button>
            </template>
          </el-input>
        </el-card>
      </el-col>
    </el-row>

    <el-row style="margin-top: 15px">
      <el-col :span="24">
        <el-card style="width: 100%;min-height: 400px" shadow="hover">
          <!--strip 双行阴影效果属性-->
          <el-table
            v-loading="loading"
            border
            :data="tableData"
            style="width: 100%;margin-top: 30px">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="商户名称：">
                    <span>{{props.row.name}}</span>
                  </el-form-item>
                  <el-form-item label="商户地址：">
                    <span>{{props.row.address}}</span>
                  </el-form-item>
                  <el-form-item label="商户电话 ：">
                    <span>{{props.row.phone}}</span>
                  </el-form-item>
                  <el-form-item label="商户状态 ：">
                    <span>{{props.row.state | state}}</span>
                  </el-form-item>
                  <el-form-item label="经度 ：">
                    <span>{{props.row.longitude}}</span>
                  </el-form-item>
                  <el-form-item label="纬度 ：">
                    <span>{{props.row.latitude}}</span>
                  </el-form-item>
                  <el-form-item label="营业起始时间 ：">
                    <span>{{props.row.openTimeFrom}}</span>
                  </el-form-item>
                  <el-form-item label="营业结束时间 ：">
                    <span>{{props.row.openTimeTo}}</span>
                  </el-form-item>
                  <br>
                  <el-form-item label="商户备注 ：">
                    <span>{{props.row.remark}}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              sortable
              width="150px"
              label="商户名称"
              prop="name">
            </el-table-column>
            <el-table-column
              width="120px"
              label="商户地址"
              prop="address">
            </el-table-column>
            <el-table-column
              label="商户电话"
              prop="phone">
            </el-table-column>
            <el-table-column
              label="营业时间"
              prop="openTimeFrom">
            </el-table-column>
            <el-table-column
              width="90px"
              label="商户状态"
              prop="state">
              <template slot-scope="scope">
                <span v-if="scope.row.state==0">冻结</span>
                <span v-else-if="scope.row.state==1">正常</span>
                <span v-else-if="scope.row.state==-1">删除</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="修改商户" placement="top-start">
                  <el-button
                    type="primary"
                    circle
                    icon="el-icon-edit"
                    size="medium"
                    @click="queryCommoditydetails(scope.$index, scope.row)"
                  ></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="删除商户" placement="top-start">
                  <el-button
                    type="danger"
                    circle
                    icon="el-icon-delete"
                    size="medium"
                    @click="deleteCommodity(scope.$index, scope.row)"
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

          <!-- 修改功能模态框-->
          <el-dialog :close-on-click-modal="false"
                     title="商户修改"
                     :visible.sync="updatemotaikuang">
            <!-- 商品编辑组件, 传入data值 -->
            <maintenance-edit ref="updateFrom" :from-data="fromData"></maintenance-edit>

            <div slot="footer" class="dialog-footer">
              <el-button @click="getCommodityAll">取 消</el-button>
              <!--点击调用修改方法-->
              <el-button type="primary" @click="update">确 定</el-button>
            </div>
          </el-dialog>

        </el-card>
      </el-col>
    </el-row>

  </div>
</template>


<script>
  import Axios from "axios";
  import el from "element-ui/src/locale/lang/el";
  import MaintenanceEdit from "./MaintenanceEdit";

  export default {
    name: "ShopMaintenance",
    data() {
      return {
        $refs:{
          updateFrom:''
        },
        // /!*延迟表格加载*!/
        loading: false,
        //搜索框的变量
        input: "",
        //类型框的变量
        state: "全部",
        //商品数据
        tableData: {},
        //修改模态框的状态
        updatemotaikuang:false,
        //当前页数
        newpage: 1,
        //分页页码的值
        page: 1,
        //分页一页多少行的值
        rows: 5,
        //修改用 的商品id
        id:0,
        fromData:{
          comDiscount: {}
        },
        //订单状态
        ordstate:""
      }
    },
    components:{
      MaintenanceEdit
    },
    methods: {
      //页面打开 查询所有订单信息
      getCommodityAll() {
        this.updatemotaikuang = false
        var _this = this;
        var state;
        let params = new URLSearchParams();
        params.append("search_shname", this.input);
        params.append("page", this.page);
        params.append("rows", this.rows);
        if(this.state==="全部"){state=-2;}
        if(this.state==="冻结"){state=0;}
        if(this.state==="正常"){state=1;}
        if(this.state==="删除"){state=-1;}
        params.append("search_shstate",state);

        this.$axios.post("/shop/querymerchants.action",params).then((value) => {
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
      //点击模态框确定按钮  修改商户信息方法
      async update(){
        //关闭模态框
        this.updatemotaikuang = false;
        //执行提交操作
        let params = new URLSearchParams();
        params.append("name",this.fromData.name)
        params.append("address",this.fromData.address)
        params.append("phone",this.fromData.phone)
        params.append("longitude",this.fromData.longitude)
        params.append("latitude",this.fromData.latitude)
        params.append("openTimeFrom",this.fromData.openTimeFrom)
        params.append("openTimeTo",this.fromData.openTimeTo)
        params.append("remark",this.fromData.remark)
        params.append("state",this.fromData.state)
        params.append("id",this.id)

        this.$axios.post("shop/updatemerchantsbyid.action",params).then((result)=> {
            if (result.data===true){
              this.$message({
                type: 'success',
                message: "修改成功√"
              });
            }
            //刷新页面
            this.getCommodityAll();
          }).catch((msg) => {
          this.$message({
            type: 'error',
            message: "修改失败×"
          });
        });
      },
      //获取选中的商户的详情 打开修改模态框
      queryCommoditydetails(index, row) {
        //获取商品id
        this.id=row.id;
        this.fromData = row;
        this.updatemotaikuang = true;
      },
      //删除商户信息方法
      deleteCommodity(index, row) {
        if (row.state!==-1){
          this.$confirm('此操作将删除商户, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            let params = new URLSearchParams();
            params.append("state",-1);
            params.append("id",row.id);

            //执行删除操作
            this.$axios.post("/shop/deletemerchantsbyid.action",params)
              .then((result)=> {
                if (result.data===true){
                  this.$message({
                    type: 'success',
                    message: "删除成功√"
                  });
                }
                //刷新页面
                this.getCommodityAll();
              }).catch((msg) => {
              this.$message({
                type: 'error',
                message: "删除失败×"
              });
            });
          }).catch(() => {
            this.$message({
              showClose: true,
              message: '已取消删除'
            });
          });
        }else {
          this.$message({
            type: 'warning',
            message: "该商户已是删除状态"
          });
        }
      }
    },
    filters: {
      phone:function(value){
        return value.substring(0,3)+ '****' + value.substring(7);
      },
      state:function(value){
        if (value == 0) return "冻结";
        if (value == 1) return "正常";
        if (value == -1) return "删除";
        return value;
      }
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
