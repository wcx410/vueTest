<!--采购申请页面-->
<template>
  <div>
    <!--strip 双行阴影效果属性-->
    <el-table
      border
      :data="purchaseorderAllData"
      style="width: 100%;margin-top: 30px"
      @row-click="clickTableRow"
      v-loading="loading"
      highlight-current-row
      @row-contextmenu="rightClick">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="申请人备注：">
              <span>{{ props.row.applicantremarks }}</span>
            </el-form-item>
            <el-form-item label="操作时间：">
              <span>{{ props.row.operationtime }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="订单id"
        prop="orderid">
      </el-table-column>
      <el-table-column
        label="申请人"
        prop="applicant">
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="props">
          <span>{{ getState(props.row.state) }}</span>
        </template>
      </el-table-column>
    </el-table>
    <!--右键显示菜单-->
    <div id="menu">
      <div class="menu"
           @click="openDinDanXiangQing"
      ><i style="font-size: 15px" class="el-icon-lock"></i>查询订单详情
      </div>
    </div>
    <div id="meeenu" style="width: 200px;height: 200px;">

    </div>


    <!--订单详情模态框-->
    <el-dialog :close-on-click-modal="false"
               title="订单详情审核页面"
               :visible.sync="ddmotaikuang">
      <!--采购商品的表-->
      <el-table
        border
        :data="caigouAllData"
        style="width: 100%;margin-top: 30px">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品价格：">
                <span>{{ props.row.price }}</span>
              </el-form-item>
              <el-form-item label="商品规格：">
                <span>{{ props.row.specification }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="商品id"
          prop="commodityid">
        </el-table-column>
        <el-table-column
          label="商品名称"
          prop="commodityname">
        </el-table-column>
        <el-table-column
          label="采购数量"
          prop="commoditysum">
        </el-table-column>
      </el-table>
      <span style="float: right">总价：<a style="color:red;">{{this.CaiGouShopZon}}</a></span>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="openShenHeBeiZhu">审核</el-button>

      </div>
    </el-dialog>

    <!--点击审核按钮弹出审核人写备注的模态框-->
    <el-dialog :close-on-click-modal="false"
               title="备注"
               :visible.sync="shenhebeizhu">
      <el-input
        style="width: 300px"
        placeholder="---请输入---"
        v-model="beizhu"
        clearable>
      </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="refuse">拒绝</el-button>
        <el-button type="primary" @click="agree">同意</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Axios from "axios";

    export default {
        name: "PurchaseOrder",
      data(){
          return{
            /*延迟表格加载*/
            loading:  true,
            //订单详情模态框状态
            ddmotaikuang:  false,

            //所有订单数据
            purchaseorderAllData:  [],
            //根据订单id查询所有采购商品数据
            caigouAllData:  [],
            // 获取当前右键点击的订单id
            currentRowIndex:  0,
            //订单所有采购商品总价
            CaiGouShopZon:  0,

            //审核人备注模态框状态
            shenhebeizhu:false,
            //提交审核时 审核人备注的变量
            beizhu : ""
          }
      },


      created() {
        this.$store.commit('back/url', window.location.href);
        //加载所有未审核订单信息
        this.getpurchaseorderAll();

        //延迟表格加载
        setTimeout(() => {
          this.loading = false;
        }, 1000)
      },

      methods: {
        //***********************************************************
        //                      右键菜单部分
        //***********************************************************
        // table的左键点击关闭右键菜单事件
        clickTableRow(row, column, event) {
          let menu = document.querySelector("#menu");
          menu.style.display = 'none';
          // console.log(row,column,event)
        },
        // table的右键点击当前行展开右键菜单事件
        rightClick(row, column, event) {
          console.log("右键点击了一次")
          let menu = document.querySelector("#menu");
          event.preventDefault();
          //获取我们自定义的右键菜单


          // 根据事件对象中鼠标点击的位置，进行定位
          menu.style.left = event.clientX-220 +"px"  ;
          menu.style.top = (event.clientY-140) +"px";
          console.log(event.clientX)
          // 改变自定义菜单的隐藏与显示
          // menu.visible = false;
         menu.style.display = 'block';
          //console.log(row,column);

          // 获取当前右键点击table 获取当前行的id值下标
          this.purchaseorderAllData.forEach((item, index) => {
            if (item.orderid === row.orderid) {
              this.currentRowIndex = item.orderid;
              return false;
            }
          })
        },
        //获取审核状态
        getState(state) {
          if (state === -1) return "拒绝";
          if (state === 0) return "未审核";
          if (state === 1) return "采购中";
          if (state === 2) return "采购完成";
          if (state === 3) return "已入库";
        },
        //***********************************************************
        //                      显示所有未审核订单部分
        //***********************************************************

        //获取所有未审核订单信息
        getpurchaseorderAll() {
          Axios({
            method: "post",
            url: "/purchase/querypurchaseorderAll",
          }).then(value => {
            //console.log(value.data)
            this.purchaseorderAllData = value.data;
          })
        },
        //右键查看订单详情打开模态框
        openDinDanXiangQing() {
          //清除总价数据
          this.CaiGouShopZon = 0;

          this.ddmotaikuang = true;
          //根据订单id 查询所有采购商品
          let params = new URLSearchParams();
          params.append("orderid", this.currentRowIndex.toString())
          console.log(this.currentRowIndex.toString())
          Axios({
            method: "post",
            url: "/purchase/querycaigouAll",
            data: params
          }).then(value => {
            //console.log(value.data)
            this.caigouAllData = value.data;
            //计算这个订单的总价
            for (let i = 0; i < this.caigouAllData.length; i++) {
              //alert(this.caigouAllData[i].commoditysum)
              this.CaiGouShopZon += this.caigouAllData[i].commoditysum * this.caigouAllData[i].price;
            }

          })
        },
        //关闭订单详情页面
        closeDinDanXiangQing() {
          this.ddmotaikuang = false
        },
        //打开审核人备注模态框
        openShenHeBeiZhu() {
          this.shenhebeizhu = true;
        },
        //点击同意 通过申请
        agree() {
          //获取当前用户id  做审核人
          //console.log(EmpHelper.empId)
          //获取订单id
          //console.log(this.currentRowIndex)
          //传一个表示同意的参数 1 修改状态

          //获取审批人备注
          //console.log(this.beizhu)
          let params = new URLSearchParams();
          params.append("orderid", this.currentRowIndex.toString());
          //params.append("approvedby", sessionStorage.getItem("emp"));
          console.log(sessionStorage.getItem("emp.id")+"---------emp.id")
          params.append("state", "1");
          params.append("approvedbyremarks", this.beizhu);

          //提交审核
          Axios({
            method: "post",
            url: "/purchase/shenHe",
            data: params
          }).then(value => {
            //审核成功
            this.$message({
              type: 'success',
              message: value.data.msg
            });
            //关闭备注模态框
            this.shenhebeizhu = false;
            //订单详情审核模态框
            this.ddmotaikuang = false;
            //刷新表格数据
            this.getpurchaseorderAll();
            //模拟采购流程 计时30秒后执行修改订单状态为采购成功
            //根据订单id 修改订单状态为2
            setTimeout(() => {
              //执行采购完成操作
              Axios({
                method: "post",
                url: "/purchase/caigouwancheng",
                data: params
              }).then(value => {

                this.$message({
                  type: 'success',
                  message: "订单：" + this.currentRowIndex + "已经" + value.data.msg
                });
              })

            }, 10000)
          })

        },
        //点击拒绝 不通过申请
        refuse() {
          //获取当前用户id  做审核人
          //console.log(EmpHelper.empId)
          //获取订单id
          //console.log(this.currentRowIndex)
          //传一个表示同意的参数 1 修改状态

          //获取审批人备注
          console.log(request.data.id)
          let params = new URLSearchParams();
          params.append("orderid", this.currentRowIndex.toString());
          //params.append("approvedby", sessionStorage.getItem("emp"));
          params.append("state", "-1");
          params.append("approvedbyremarks", this.beizhu);

          //提交审核
          Axios({
            method: "post",
            url: "/purchase/shenHe",
            data: params
          }).then(value => {
            //审核成功
            this.$message({
              type: 'success',
              message: value.data.msg
            });
            //关闭备注模态框
            this.shenhebeizhu = false;
            //订单详情审核模态框
            this.ddmotaikuang = false;
            //刷新表格数据
            this.getpurchaseorderAll();

          })
        }
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
  #menu {
    width: 140px;
    white-space: nowrap;
    overflow: hidden; /*隐藏溢出的元素*/
    box-shadow: 0 1px 1px #888, 1px 0 1px #ccc;
    position: absolute;
    display: none;
    background: #ffffff;
    z-index: 10;
  }

  .menu {
    width: 125px;
    height: 25px;
    line-height: 25px;
    text-indent: 10px;
    cursor: pointer;
  }

  .menu:hover {
    color: deeppink;
    text-decoration: underline;
  }
</style>
