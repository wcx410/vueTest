<!--配送管理页面-->
<template>
    <div> <!--strip 双行阴影效果属性-->
        <el-table
                border
                :data="orderAllData"
                style="width: 100%;margin-top: 30px"
                v-loading="loading"
                highlight-current-row
        >
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="商品id：">
                            <span>{{ props.row.id1 }}</span>
                        </el-form-item>
                        <el-form-item label="商品名：">
                            <span>{{ props.row.name }}</span>
                        </el-form-item>
                        <el-form-item label="商品规格：">
                            <span>{{ props.row.specification }}</span>
                        </el-form-item>
                        <el-form-item label="商品数量：">
                            <span>{{ props.row.number }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
          <el-table-column
            label="订单"
            prop="id">
          </el-table-column>
            <el-table-column
                    label="订单编号"
                    prop="ordernumber">
            </el-table-column>
            <el-table-column label="订单状态">
                <template slot-scope="props">
                    <span>{{ getState(props.row.ordstate) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">

                    <el-button
                            type="primary"
                            size="medium"
                            @click="openpeison(scope.$index, scope.row)">配送
                    </el-button>

                </template>
            </el-table-column>
        </el-table>

        <!--配送选择仓库模态框-->
        <el-dialog
                :close-on-click-modal="false"
                :show-close="false"
                title="选择配送"
                :visible.sync="selectwarehousemotaikuang">
            <el-form label-width="80px">
                <el-form-item label="仓库名:">
                    <el-select v-model="warehouseid" @change="warehousechange">
                        <el-option value="0" label="---请选择---"></el-option>
                        <el-option :value="ck.warid" :label="ck.warname" v-for="ck in warehouseAll" :key="ck.warid"
                                   :index="ck.warid"></el-option>
                    </el-select>
                </el-form-item>
              <el-form-item label="车辆:">
                <el-select v-model="carid" @change="carchange">
                  <el-option value="0" label="---请选择---"></el-option>
                  <el-option :value="car.id" :label="car.name+','+car.chepai+'('+getCarState(car.state)+')'" v-for="car in carAll" :key="car.id"
                             :index="car.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="配送员:">
                <el-select v-model="peisongyuanid" @change="peisongyuanchange">
                  <el-option value="0" label="---请选择---"></el-option>
                  <el-option :value="psy.id" :label="psy.name+'('+getCarState(psy.state)+')'" v-for="psy in peisongyuanAll" :key="psy.id"
                             :index="psy.id"></el-option>
                </el-select>
              </el-form-item>

                <el-form-item label="需求数量:">
                    <span>{{this.xuqiushopsum}}</span>
                </el-form-item>
                <el-form-item label="商品总量:">
                    <span>{{this.shopsum}}</span>
                </el-form-item>

            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="selectwarehousemotaikuang=false">取 消</el-button>
                <el-button type="primary" @click="peison">确认配送</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import Axios from "axios";

    export default {
      name: "Distribution",
      data(){
        return{
          /*延迟表格加载*/
          loading:true,
          //所有订单数据
          orderAllData:{},

          //配送模态框
          peisonmotaikuang : false,

          //选择仓库的模态框状态
          selectwarehousemotaikuang :false,
          //仓库名（id）
          warehouseid:"0",
          peisongyuanid:"0",
          carid:"0",
          //所有仓库数据
          warehouseAll: {},
          carAll: {},
          peisongyuanAll: {},
          //订单需求商品数量
          xuqiushopsum : 0,
          //商品拥有数
          shopsum :0,
          //获取点击配送的商品的id
          shop :{},
        }
      },
      methods:{

        //查询所有的订单信息
        getorderAll() {
          var _this=this;
          this.$axios.post("/peisong/peisongAll.action").then(value => {
            console.log("111")
            console.log(value.data)
            _this.orderAllData=value.data;
          }).catch(function (result) {
            console.log("111")
            console.log(result)
          })
        },
        //点击配送按钮  查询所有拥有这个商品的仓库的数据  给下拉框赋值
        openpeison(index, row) {
          //alert(row.ordstate)
          if (row.ordstate!=="0"){
            this.$message({
              type: 'error',
              message: "请选择待发货的订单×"
            });
            return;
          }
          this.selectwarehousemotaikuang = true;
          //给商品 赋值 后面修改仓库商品数量要用
          this.shop=row;
          //订单需求商品数量
          this.xuqiushopsum=row.number;
          //alert(row.id1)
          //给下拉框赋值  查询所有拥有这个商品的仓库的数据
          let params = new URLSearchParams();
          params.append("shopid", row.id1)
          this.$axios.post("/peisong/warehouseAllByshopid.action",params).then(value => {
            this.warehouseAll=value.data;
          })
          this.$axios.post("/peisong/carAll.action",params).then(value => {
            console.log(value)
            this.carAll=value.data;
          })
          this.$axios.post("/peisong/peisongyuanAll.action",params).then(value => {
            this.peisongyuanAll=value.data;
          })
        },

        //转库下拉框值改变触发事件
        warehousechange() {
          if(this.warehouseid==="0"){
            this.shopsum=0;
          }
          //让商品总量 随着仓库更改而更改  this.shopsum
          //alert(this.warehouseid)
          //商品id
          //alert(this.shopid)
          //根据仓库id 查询这个仓库里的这个商品的数量
          let params = new URLSearchParams();
          params.append("warid",this.warehouseid)
          params.append("shopid",this.shop.id1)
          this.$axios.post("/peisong/querywarehouseshopsum.action",params).then(value => {
            this.shopsum=value.data;
          })
        },
        carchange(){},
        peisongyuanchange(){},
        //点击确认配送
        peison(){
          //拿到仓库id
          //this.warehouseid
          //拿到商品id
          //this.shop.id1.toString()
          //拿到配送数量
          //this.xuqiushopsum
          //商品规格
          //订单id
          //如果仓库id为0 提示选择仓库
          console.log(this.warehouseid)
          console.log(this.peisongyuanid)
          if(this.warehouseid==="0"){
            this.$message({
              type: 'error',
              message: "请选择仓库"
            });
            return
          }
          if(this.carid==="0"){
            this.$message({
              type: 'error',
              message: "请选择配送车辆"
            });
            return
          }
          if(this.carid==="1"){
            this.$message({
              type: 'error',
              message: "请选择闲置配送车辆"
            });
            return
          }
          if(this.peisongyuanid==="0"){
            this.$message({
              type: 'error',
              message: "请选择配送员"
            });
            return
          }if(this.peisongyuanid==="1"){
            this.$message({
              type: 'error',
              message: "请选择闲置配送员"
            });
            return
          }if(this.peisongyuanid==="2"){
            this.$message({
              type: 'error',
              message: "请选择在职配送员"
            });
            return
          }
          //如果配送数量小于仓库数量 就可以配送
          if (this.xuqiushopsum<=this.shopsum){
            let params = new URLSearchParams();
            params.append("warid",this.warehouseid)
            params.append("carid",this.carid)
            params.append("peisongyuanid",this.peisongyuanid)
            params.append("shopid",this.shop.id1)
            params.append("xuqiushopsum",this.xuqiushopsum)
            params.append("guige",this.shop.specification)
            params.append("ddid",this.shop.id)
            this.$axios.post("/peisong/querenpeisong.action",params).then(value => {
              this.$message({
                type: 'success',
                message: "配送成功"
            })
              //this.shopsum = value.data;
              //关闭选择配送仓库模态框
              this.selectwarehousemotaikuang=false
              //刷新配送管理页面
              this.getorderAll();
            })
          }else {
            this.$message({
              type: 'error',
              message: "仓库商品数量不足×"
            });
          }
        },
        //获取订单状态
        getState(state) {
          if (state === "0") return "待发货";
          if (state === "1") return "待收货";
          if (state === "2") return "待提货";
          if (state === "3") return "已收货";
          if (state === "4") return "待退款";
          if (state === "5") return "已退款";
        },
        //获取车辆状态
        getCarState(state) {
          if (state == "0") return "闲置";
          if (state == "1") return "运输中";
          if (state == "2") return "已离职";
        }
      },

        created() {
            this.$store.commit('back/url', window.location.href);
            //查询所有的订单信息
            this.getorderAll();
            //延迟表格加载
            setTimeout(() => {
                this.loading = false;
            }, 1000)
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

    /*table拉开的样式 ↑*/
</style>
