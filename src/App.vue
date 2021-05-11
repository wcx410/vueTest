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

            <el-button
              size="small"
              @click="addTab(editableTabsValue)"
            >
              add tab
            </el-button>
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
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      data: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  methods: {
    /*handleClick(tab, event) {
      console.log(tab, event);
    },*/
    handleNodeClick(data) {
      console.log(data);
    },
    getdata(){
      var _this=this;
      this.$axios.post("queryMenu.action").then(function (response) {
        console.log(response.data)
        _this.data=response.data;
      }).catch();
    }
  },
  created() {
    // this.getdata();
  }
}
</script>

<style>
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
