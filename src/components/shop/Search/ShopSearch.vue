<!--商户订单查询-->
<template>
  <div>
    <el-row>
      <el-col :span="10">
        <el-card style="width: 100%" shadow="hover">
          <!-- 模糊查询-->
          <el-input
            style="width: 100%"
            placeholder="请输入用户姓名"
            v-model="input"
            clearable>
            <div slot="prepend">
              <el-tooltip effect="dark" content="订单状态" placement="top-end">
                <!-- 订单状态 -->
                <el-select v-model="state" placeholder="订单状态" style="width: 110px;">
                  <el-option value="全部">全部</el-option>
                  <el-option value="待发货">待发货</el-option>
                  <el-option value="未收货">未收货</el-option>
                  <el-option value="待提货">待提货</el-option>
                  <el-option value="已提货">已提货</el-option>
                  <el-option value="待退款">待退款</el-option>
                  <el-option value="已退款">已退款</el-option>
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
                  <el-form-item label="ID ：">
                    <span>{{props.row.orderNumber}}</span>
                  </el-form-item>
                  <el-form-item label="订单状态 ：">
                    <span>{{props.row.ordstate | state }}</span>
                  </el-form-item>
                  <el-form-item label="用户昵称 ：">
                    <span>{{props.row.username}}</span>
                  </el-form-item>
                  <el-form-item label="用户姓名 ：">
                    <span>{{props.row.uname}}</span>
                  </el-form-item>
                  <el-form-item label="商品名称 ：">
                    <span>{{props.row.name}}</span>
                  </el-form-item>
                  <el-form-item label="用户手机号 ：">
                    <span>{{props.row.phone | phone}}</span>
                  </el-form-item>
                  <el-form-item label="商品图片 ：">
                    <el-image style="height: 100px;width: 150px" :src="$host+props.row.image" :preview-src-list="[$host+props.row.image]" fit="cover"
                              lazy></el-image>
                  </el-form-item>
                  <br>
                  <el-form-item label="数量 ：">
                    <span>{{props.row.number}}</span>
                  </el-form-item>
                  <el-form-item label="总价 ：">
                    <span>{{props.row.totalprice}}</span>
                  </el-form-item>
                  <el-form-item label="收货时间 ：">
                    <span>{{props.row.deliveryTime}}</span>
                  </el-form-item>
                  <el-form-item label="提货时间 ：">
                    <span>{{props.row.pickUpTime}}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              sortable
              width="150px"
              label="订单编号"
              prop="orderNumber">
            </el-table-column>
            <el-table-column
              width="90px"
              label="订单状态"
              prop="ordstate">
              <template slot-scope="scope">
                <span v-if="scope.row.ordstate==0">待发货</span>
                <span v-else-if="scope.row.ordstate==1">未收货</span>
                <span v-else-if="scope.row.ordstate==2">待提货</span>
                <span v-else-if="scope.row.ordstate==3">已提货</span>
                <span v-else-if="scope.row.ordstate==4">待退款</span>
                <span v-else-if="scope.row.ordstate==5">已退款</span>
              </template>
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
              width="110px"
              label="用户手机号"
              prop="phone">
            </el-table-column>
            <el-table-column
              width="160px"
              label="收货时间"
              prop="deliveryTime">
            </el-table-column>
            <el-table-column
              width="160px"
              label="提货时间"
              prop="pickUpTime">
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

  </div>
</template>


<script>
    import Axios from "axios";

    import el from "element-ui/src/locale/lang/el";

    export default {
      name: "ShopSearch",
      data() {
        return {
          // /!*延迟表格加载*!/
          loading: false,
          //搜索框的变量
          input: "",
          //类型框的变量
          state: "全部",
          //商品数据(包括图片)
          tableData: {},
          //当前页数
          newpage: 1,
          //分页页码的值
          page: 1,
          //分页一页多少行的值
          rows: 5,
          //订单状态
          ordstate:"",
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
          var state;
          let params = new URLSearchParams();
          params.append("search_ordname", this.input);
          params.append("page", this.page);
          params.append("rows", this.rows);
          if(this.state==="全部"){state=-1;}
          if(this.state==="待发货"){state=0;}
          if(this.state==="未收货"){state=1;}
          if(this.state==="待提货"){state=2;}
          if(this.state==="已提货"){state=3;}
          if(this.state==="待退款"){state=4;}
          if(this.state==="已退款"){state=5;}
          params.append("search_ordstate",state);

          this.$axios.post("/shop/querycomorder.action", params).then((value) => {
            // console.log(index);
            // if(value.data.rows[0].ordstate==1){
            //   this.ordstate="未收货";
            // }
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
          if (value == 1) return "未收货";
          if (value == 2) return "待提货";
          if (value == 3) return "已提货";
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
