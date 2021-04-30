<!--商品标签维护页面-->
<template>
    <div>
        <!-- 模糊查询-->
        <el-input
                style="width: 300px"
                placeholder="请输入商品标签名"
                v-model="input"
                clearable>
        </el-input>
        <el-button
                type="primary"
                slot="append"
                icon="el-icon-search"
                @click="MohuqueryCommoditylable"

        >查询
        </el-button>
        <!--<el-button
                type="success"
                slot="append"
                icon="el-icon-circle-plus"

        >添加
        </el-button>-->
        <!--strip 双行阴影效果属性-->
        <el-table
                border
                :data="tableData"
                style="width: 100%;margin-top: 30px">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="标签ID：">
                            <span>{{ props.row.id }}</span>
                        </el-form-item>
                        <el-form-item label="标签名称：">
                            <span>{{ props.row.name }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                    label="标签ID"
                    prop="id">
            </el-table-column>
            <el-table-column
                    label="标签名称"
                    prop="name">
            </el-table-column>


            <el-table-column label="操作">
                <template>
                    <el-button
                            type="primary"
                            circle
                            icon="el-icon-edit"
                            size="medium"
                            ></el-button>
                    <el-button
                            type="danger"
                            circle
                            icon="el-icon-delete"
                            size="medium"
                            ></el-button>
                </template>
            </el-table-column>
        </el-table>
      <!--分页-->
      <el-pagination
        @size-change="rowsChange"
        @current-change="pageChange"
        :current-page="newpage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="rows"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.total">
      </el-pagination>

    </div>
</template>

<script>


  import Axios from "axios";
  import {t} from "element-ui/src/locale/index";
    export default {
      name:"CommodityLableMaintain",
      data(){
        return{
          tableData: {},
          //当前页数
          newpage:1,
          //分页页码的值
          page:1,
          //分页一页多少行的值
          rows:5,
          //搜索框的值
          input:"",
          //修改的id
          id:0,
        }

      },
      components:{},
      methods:{
        //                      商品标签查询部分
        //***********************************************************
        //页面打开 查询所有商品标签信息
        getCommodityLableAll(){
          var _this=this;
          let params = new URLSearchParams();
          params.append("name",this.input);
          this.$axios.post("/commodity/queryAlllabelbydto.action",params).then(value => {
            console.log(value.data.records)
            _this.tableData=value.data.records;
          })
        },
        //点击查询按钮 模糊查询商品标签
        MohuqueryCommoditylable(){
          this.getCommodityLableAll();
        },
        /*点击换条数的按钮*/
        rowsChange(val) {
          //修改条数的值
          console.log(val)
          this.rows=val;
          this.getCommodityAll();
        },
        //点击分页页数按钮
        pageChange(val) {
          //修改页数的值
          this.page=val;
          this.getCommodityAll();
        },
        queryCommodityLabledetails(){

        },
        deleteCommodityLable(){

        }
      },
      created() {
            this.$store.commit('back/url', window.location.href);

            //加载所有商品类型信息
            this.getCommodityLableAll();

            //获取登录信息
            /*EmpHelper.getEmp().then(value => {
                console.log(value);
            })*/
        },



        //***********************************************************






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
