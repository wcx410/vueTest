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
                  @current-change="selectRow"
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

      <!-- 树节点 -->
      <el-col :span="8">
        <div style="padding-left: 25px">
          <!--<el-tree-->
          <!--:data="data"-->
          <!--show-checkbox-->
          <!--node-key="id"-->
          <!--:default-expanded-keys=[]-->
          <!--:default-checked-keys=[]-->
          <!--:props="defaultProps">-->
        <!--</el-tree>-->

          <el-tree
            ref="tree"
            :props="defaultProps"
            :load="loadNode"
            lazy
            :check-strictly="true"
            show-checkbox
            @check-change="checkChange"
            node-key="id">
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
            // data:[],
              // id:"",
              // name:"",
              // children:""
              // children:[{
              //   id:"",
              //   name:"",
              //   children:[{
              //     id:"",
              //     name:"",
              //   }]
              // }]
            // defaultProps: {},
            defaultProps: {
              children: "children",
              label: "name",
              isLeaf: "leaf",
              // disabled: "hasChild",  //还可以使用disabled控制节点是否能被选择
            },
            selectOrg: {
              orgJsn: {}, //存唯一的值，勾选的
              orgsid: [], //存id，与node-key相结合
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
          }
      },

      created() {
        this.$store.commit('back/url', window.location.href);
        this.getPerManagement();
        this.getAllMenu();
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
        async selectRow(){

        },

        // 树组件动态加载事件
        loadNode(node, resolve) {
          if (node.level === 0) {
            // 这里适合去做数据请求，获取到树状图数据
            // node.level === 0 是初始化树状图最开始就展示的数据
            var _this = this;
            this.$axios.post("menu/queryallper").then((result)=> {
              // this.data=result.data;
              for (let i = 0; i < result.data.length; i++) {
            //
                alert(result.data.get(i).id)
              }
            }).catch();
            let res = [
              {
                id: 6,
                name: "lazy_tomato集团",
                children: "",
              },
            ];
            resolve(res);
          } else {
            // 这里适合去做数据请求，获取到树状图数据 （为实现loading效果，添加了定时器）
            setTimeout(() => {
              // 每次请求的数据应该根据node.data.id 去请求（看项目后端需要什么参数，我的是点击节点的id，去获取这个节点下面的子节点数据）
              let res2 = [
                {
                  id: 10,
                  name: "上海分公司",
                  leaf: false,
                },
                {
                  id: 11,
                  name: "武汉分公司",
                  // leaf 这个参数可以根据请求接口，返回的数据信息，去判断这个节点是否还包含子节点，从而控制是否有右箭头
                  leaf: true,
                },
              ];
              resolve(res2);
            }, 500);
          }
        },
        // 设置复选框为单选的
        checkChange(data, checked) {
          // 获取当前选择的id在数组中的索引
          const indexs = this.selectOrg.orgsid.indexOf(data.id);
          // 如果不存在数组中，并且数组中已经有一个id并且checked为true的时候，代表不能再次选择。
          if (indexs < 0 && this.selectOrg.orgsid.length === 1 && checked) {
            // 设置已选择的节点为false 很重要
            this.$refs.tree.setChecked(this.selectOrg.orgJsn, false); //设置之前选中的为未选中
            this.selectOrg.orgsid = []; //清空
            this.selectOrg.orgsid.push(data.id); //存唯一的node-key中唯一的标致 id
            this.selectOrg.orgJsn = data; //存当前节点的json
          } else if (this.selectOrg.orgsid.length === 0 && checked) {
            // 发现数组为空 并且是已选择
            // 防止数组有值，首先清空，再push
            this.selectOrg.orgJsn = data;
            this.selectOrg.orgsid = [];
            this.selectOrg.orgsid.push(data.id);
          } else if (
            indexs >= 0 &&
            this.selectOrg.orgsid.length === 1 &&
            !checked
          ) {
            // 再次直接进行赋值为空操作
            this.selectOrg.orgsid = [];
          }
        },
      },
    }
</script>

<style scoped>

</style>
