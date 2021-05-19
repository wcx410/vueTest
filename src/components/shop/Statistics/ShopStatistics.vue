<!--商户统计-->
<template>
  <div>
    <el-row :gutter="15">
      <el-col :span="6">
        <el-card shadow="hover" style="height: 100px">
          <!-- 待收商品 -->
          <xl-panel style="height: 40px">
            <div slot="title">待收商品</div>
            <div slot="body">
              <div style="line-height: 40px;font-size: 23px;font-weight: bold;">
                <div style="float: left;margin-left: 20px;margin-right: 10px">
                  <svg class="icon" aria-hidden="true" width="40" height="40">
                    <use xlink:href="#icon-gouwu"></use>
                  </svg>
                </div>
                <div style="float: left;">个数: {{daishou}}</div>
              </div>
            </div>
          </xl-panel>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" style="height: 100px">
          <!-- 待提商品 -->
          <xl-panel style="height: 40px">
            <div slot="title">待提商品</div>
            <div slot="body">
              <div style="line-height: 40px;font-size: 23px;font-weight: bold;">
                <div style="float: left;margin-left: 20px;margin-right: 10px">
                  <svg class="icon" aria-hidden="true" width="40" height="40">
                    <use xlink:href="#icon-ziyuan"></use>
                  </svg>
                </div>
                <div style="float: left;">个数: {{daiti}}</div>
              </div>
            </div>
          </xl-panel>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" style="height: 100px">
          <!-- 昨日收入 -->
          <xl-panel style="height: 40px">
            <div slot="title">昨日收入</div>
            <div slot="body">
              <div style="line-height: 40px;font-size: 23px;font-weight: bold;">
                <div style="float: left;margin-left: 20px;margin-right: 10px">
                  <svg class="icon" aria-hidden="true" width="40" height="40">
                    <use xlink:href="#icon-shouru1"></use>
                  </svg>
                </div>
                <div style="float: left;">{{zrsr}}￥</div>
              </div>
            </div>
          </xl-panel>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" style="height: 100px;text-align: center">
          <!-- 总收入 -->
          <xl-panel style="height: 40px">
            <div slot="title">总收入</div>
            <div slot="body">
              <div style="line-height: 40px;font-size: 23px;font-weight: bold;">
                <div style="float: left;margin-left: 20px;margin-right: 10px">
                  <svg class="icon" aria-hidden="true" width="40" height="40">
                    <use xlink:href="#icon-07"></use>
                  </svg>
                </div>
                <div style="float: left;">￥ {{zsr}}</div>
              </div>
            </div>
          </xl-panel>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :span="24">
        <el-card shadow="hover">
          <div style="float: left">营收统计 : </div>

          <el-divider></el-divider>
          <!-- 统计图 -->
          <!--<div ref="biao1" style="width: 60%;height: 400px;float: left"></div>-->

          <!--<div ref="biao2" style="width: 40%;height: 400px;float: right"></div>-->
          <div id="main" style="width: 600px;height:400px;"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Axios from "axios";

  import el from "element-ui/src/locale/lang/el";

  export default {
    name: "ShopStatistics",
    data() {
      return {
        //商品数据(包括图片)
        daishou: "",
        daiti: "",
        zrsr:"",
        zsr:"",
        xdata:[],
        ydata:[],
        fromData: {
          comDiscount: {}
        },
        imageFile: {
          url: null
        }
      }
    },
    methods: {
      initEchart() {
        var _this = this;
        //初始化echart实例，获取dom
        var echartDemo = this.$echarts.init(document.getElementById('main'));
        var option = {
          title: {
            text: '商品销量'
          },
          tooltip: {},
          legend: {
            data:['销量']
          },
          xAxis: {
            data:_this.xdata
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: _this.ydata
          }]
        };
        echartDemo.setOption(option);
      },
      getCommodityAll() {
        var _this = this;
        let params = new URLSearchParams();
        params.append("id",sessionStorage.getItem("user"))
        this.$axios.post("/shop/queryshouhuo.action").then(value => {
          _this.daishou = value.data.rows.length;
        }),
          this.$axios.post("/shop/querytihuo.action").then(value => {
            _this.daiti = value.data.rows.length;
          }),
          this.$axios.post("/shop/queryztsr",params).then(value => {
            _this.zrsr = value.data
          }),
          this.$axios.post("/shop/queryzsr",params).then(value => {
            _this.zsr = value.data
          })
      },
      //点击查询按钮 模糊查询商品信息
      MohuqueryCommodity() {
        this.getCommodityAll();
      },
    getdata(){
      var _this =this;
      this.$axios.post("shop/queryTu").then(function (response) {
        _this.xdata=response.data.map(function (item) {
          item =item.name;
          return item;
        })
        _this.ydata=response.data.map(function (item) {
          item =item.number;
          return item;
        })
        console.log(_this.xdata);
        console.log(_this.ydata);
      }).catch();
    }
    },//数据自动刷新，必然需要一个监听机制告诉Echarts重新设置数据
    watch: {
      //观察option的变化
      xdata: {
        handler(newVal, oldVal) {
          this.initEchart();
        },
        deep: true //对象内部属性的监听，关键。
      }
    }
    ,mounted(){
      this.initEchart();
      this.getdata();
    },
  created() {
    this.getCommodityAll();
  }
  }
</script>

<style scoped>
  .el-row {
    margin-bottom: 15px;
  }
  .el-row:last-child {
    margin-bottom: 0;
  }
</style>
