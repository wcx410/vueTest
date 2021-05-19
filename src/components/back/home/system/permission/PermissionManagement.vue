<template>
    <div>
      <el-col :span="16">
        <el-input v-model="searchStr" placeholder="输关键字查找..." clearable style="width: 350px">
          <el-button slot="append" icon="el-icon-search" @click="query"></el-button>
        </el-input>
        <!--表格数据-->
        <el-table :data="tableData"
                  v-loading="isLoading"
                  highlight-current-row
                  @row-click="selectRow"
        >
          <el-table-column width="100" prop="id" label="ID" sortable></el-table-column>
          <el-table-column width="200" prop="name" label="角色名"></el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
        </el-table>
        <el-pagination
          @size-change="rowChange"
          @current-change="pageChange"
          background
          :page-sizes="[10, 15, 25, 50]"
          :page-size="10"
          layout="total, sizes, prev, pager, next"
          :total="total">
        </el-pagination>
      </el-col>

      <div class="buttons">
        <el-button @click="authorization">授权</el-button>
        <el-button @click="resetChecked">清空</el-button>
      </div>
      <!-- 树节点 -->
      <el-col :span="8">
        <div style="padding-left: 25px">
          <el-tree
          :data="data"
          show-checkbox
          node-key="id"
          ref="tree"
          :default-expanded-keys="[]"
          :default-checked-keys="ids"
          :props="defaultProps">
        </el-tree>

        </div>
      </el-col>

    </div>
</template>

<script>

    export default {
        name: "PermissionManagement",
      data(){
          return {
            data:[],
            defaultProps: {
              children: 'children',
              label: 'name'
            },
            total:0,
            //加载状态
            isLoading: false,
            searchStr: "",
            //当前页数
            page: 1,
            //每页条
            row: 10,
            tableData:[],
            ids:[],
            id:0
          }
      },

      created() {
        this.$store.commit('back/url', window.location.href);
        this.getPerManagement();
        this.getmenu();
        //延迟表格加载
        setTimeout(() => {
          this.isLoading = false;
        }, 2000)
      },
      methods:{
        //页面大小改变
        rowChange(val) {
          this.row = val;
          this.getPerManagement();
        },
        //页数改变
        pageChange(val) {
          this.page = val;
          this.getPerManagement();
        },
        /**
         * 查询员工
         */
        getPerManagement(){
          this.isLoading = true;
          var _this = this;
          let params = new URLSearchParams();
          params.append("searchStr",this.searchStr);
          params.append("page",this.page);
          params.append("rows",this.row);

          this.$axios.post("role/queryallrole",params).then(value => {
            console.log("-----------------------------");
            console.log(value);
            _this.tableData=value.data.records;
            _this.total=value.data.total;
          }).catch()
        },

      //点击查询按钮，模糊查询
      query(){
        this.getPerManagement();
      },
        //查询所有的menu
        getAllMenu(){
          var _this = this;
          this.$axios.post("menu/queryallper").then((result)=> {
            console.log(result.data)
            this.data=result.data;
            console.log(this.data)
          }).catch();
        },
        selectRow(row, column, event){
          console.log(row)
          console.log(column)
          console.log(event)
          var _this = this;
          this.id = row.id;
          let params = new URLSearchParams();
          params.append("id",row.id);
          this.$axios.post("menu/querybyid",params).then((result)=> {
            this.ids = result.data;
            this.resetChecked();
          }).catch();

        },
      getmenu(){
          var _this = this;
          this.$axios.post("/menu/querymenuthir").then((result)=>{
            this.data= result.data;
          }).catch();
      },
        //清空
        resetChecked() {
          this.$refs.tree.setCheckedKeys([]);
        },
        //授权
        authorization(){
          var _this = this;
          var list = this.$refs.tree.getCheckedNodes();
          var zid = [];
          var idss = [];
          for (let i = 0; i < list.length-1; i++) {
            zid.push(list[i].id);
          }
          zid.forEach(function (item) {
            console.log("------------");
            // console.log(item);
            // console.log(_this.id);
            var iid ={menu:item,role:_this.id};
            idss.push(iid);
          });
          this.$axios.post("/menu/authorization",JSON.stringify(idss),{headers: {'Content-Type': 'application/json; charset=UTF-8'}})
            .then((result) => {
              if (result.data === true) {
                this.$message({
                  type: 'success',
                  message: "授权成功√"
                });
              }
              //刷新页面
              this.getEmpManagement();
            }).catch((msg) => {
            this.$message({
              type: 'error',
              message: "授权失败×"
            });
          });
        }
      },
    }
</script>

<style scoped>

</style>
