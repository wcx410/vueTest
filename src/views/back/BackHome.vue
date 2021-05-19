<template>
  <div id="app" class="homeWrap">
    <el-container  style="height:100%">
      <el-aside width="200px" >
        <!-- 菜单-->
        <el-tree
          :data="data"
          :props="defaultProps"
          accordion
          @node-click="handleNodeClick">
        </el-tree>
      </el-aside>
      <el-container>
        <el-header>
           <!-- <el-button
            size="small"
            @click="addTab(editableTabsValue)"
          >
            add tab
          </el-button>-->
        </el-header>
        <el-main>
          <!-- tabs页面显示-->
          <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
            <el-tab-pane
              v-for="(item, index) in editableTabs"
              :key="item.name"
              :label="item.title"
              :name="item.name"
            >
              <component :is="item.content"></component>

            </el-tab-pane>
          </el-tabs>

        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import EmpManagement from "../../components/back/home/system/emp/EmpManagement";
  import Warehousemaintain from "../../components/back/home/Warehouse/Warehousemaintain";
  import PurchaseOrder from "../../components/back/home/Purchase/PurchaseOrder";
  import MaintenanceApply from "../../components/shop/Maintenance/MaintenanceApply";
  import ShopMaintenance from "../../components/shop/Maintenance/ShopMaintenance"
  import PurchaseOrderJiLu from "../../components/back/home/Purchase/PurchaseOrderJiLu";

    export default {
        name: "BackHome",
      components:{
          EmpManagement,
          Warehousemaintain,
          PurchaseOrder,
        MaintenanceApply,
        ShopMaintenance,
        PurchaseOrderJiLu
      },
      data () {
        return {
          data: [],
          defaultProps: {
            children: 'children',
            label: 'name'
          },
          editableTabsValue: '2',
          editableTabs: [],
          tabIndex: 2
        }
      },
      methods: {
        /*handleClick(tab, event) {
          console.log(tab, event);
        },*/
        handleNodeClick(data) {
          if (data.type == "页面") {
            this.addTab(data.name, data.url);
          }
        },
        getdata(){
          var _this=this;
          this.$axios.post("menu/queryMenu.action").then(function (response) {
            _this.data=response.data;
          }).catch();
        },
        addTab(targetName,linkurl) {
          //判断 打开了没有
          var res =  this.editableTabs.find((item)=>{return item.title ==targetName;});
          if(res!=undefined){
            //已打开的    ---选中
            this.editableTabsValue = res.name;
          }else{
            //未打开的   ----添加
            let newTabName = ++this.tabIndex + '';
            this.editableTabs.push({
              title: targetName,
              name: newTabName,
              content: linkurl
            });
            this.editableTabsValue = newTabName;
          }


        },
        removeTab(targetName) {
          let tabs = this.editableTabs;
          let activeName = this.editableTabsValue;
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
                }
              }
            });
          }

          this.editableTabsValue = activeName;
          this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        }
      },
      created() {
         this.getdata();
      }
    }
</script>

<style scoped>
  .homeWrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
</style>
