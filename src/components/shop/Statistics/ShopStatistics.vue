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
                <div style="float: left;">￥ {{zrsr}}</div>
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
                <div style="float: left;">￥ {{}}</div>
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
          <el-radio-group v-model="scopeDay" style="margin-left: 30px">
            <el-radio :label="365">一年内</el-radio>
            <el-radio :label="30">一个月内</el-radio>
            <el-radio :label="7">一周内</el-radio>
          </el-radio-group>

          <el-divider></el-divider>
          <!-- 统计图 -->
          <div ref="biao1" style="width: 60%;height: 400px;float: left"></div>

          <div ref="biao2" style="width: 40%;height: 400px;float: right"></div>
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
        fromData: {
          comDiscount: {}
        },
        imageFile: {
          url: null
        }
      }
    },
    methods: {
      getCommodityAll() {
        var _this = this;
        this.$axios.post("/shop/queryshouhuo.action").then(value => {
          _this.daishou = value.data.rows.length;
        }),
          this.$axios.post("/shop/querytihuo.action").then(value => {
            _this.daiti = value.data.rows.length;
          }),
          this.$axios.post("/shop/queryztsr").then(value => {
            _this.zrsr = value = data.rows.length;
          })
      },
      //点击查询按钮 模糊查询商品信息
      MohuqueryCommodity() {
        this.getCommodityAll();
      }
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
