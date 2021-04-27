<!--商品资料维护页面-->
<template>
    <div>
        <!-- 模糊查询-->
        <el-input
                style="width: 300px"
                placeholder="请输入商品名"
                v-model="input"
                clearable>
        </el-input>
       <!-- 上架状态-->
        <el-select v-model="zhuangtai">
            <el-option value="全部">全部</el-option>
            <el-option value="上架">上架</el-option>
            <el-option value="未上架">未上架</el-option>
            <el-option value="下架">下架</el-option>
        </el-select>
        <el-button
                type="primary"
                slot="append"
                icon="el-icon-search"
                @click="MohuqueryCommodity"
        >查询
        </el-button>
        <el-button
                type="success"
                slot="append"
                icon="el-icon-circle-plus"
                @click="openAddCommodity"
        >添加
        </el-button>
        <!--strip 双行阴影效果属性-->
        <el-table
                v-loading="loading"
                border
                :data="tableData"
                style="width: 100%;margin-top: 30px">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="商品名称：">
                            <span>{{ props.row.name }}</span>
                        </el-form-item>
                        <el-form-item label="商品描述：">
                            <span>{{ props.row.particulars }}</span>
                        </el-form-item>
                        <el-form-item label="商品图片：">
<!--                            <el-image fit="cover" :src="$host+props.row.image" :preview-src-list="[$host+props.row.image]" style="width: 100px;height: 50px"></el-image>-->
                        </el-form-item>
                        <el-form-item label="商品价格：">
                                <span>{{ props.row.price }}</span>
                        </el-form-item>
                        <el-form-item label="单位：">
                            <span>{{ props.row.unit }}</span>
                        </el-form-item>
                        <el-form-item label="规格：">
                            <span>{{ props.row.specification }}</span>
                        </el-form-item>
                        <el-form-item label="生产厂商：">
                            <span>{{ props.row.manufacturer }}</span>
                        </el-form-item>
                        <el-form-item label="商品类型：">
                            <span>{{ props.row.comType.name }}</span>
                        </el-form-item>
                        <el-form-item label="商品上架时间(第一次上架时间)：">
                            <span>{{ props.row.putawayDate }}</span>
                        </el-form-item>
                        <el-form-item label="最新上架时间：">
                            <span>{{ props.row.newestPutawayDate }}</span>
                        </el-form-item>
                        <el-form-item label="商品状态:" >
<!--                            <span>{{ getState(props.row.state) }}</span>-->
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                    label="商品 ID"
                    prop="id">
            </el-table-column>
            <el-table-column
                    label="商品名称"
                    prop="name">
            </el-table-column>
            <el-table-column
                    label="商品图片"
                    prop="image">
                <template slot-scope="props">
<!--                    <el-image fit="cover" :src="$host+props.row.image" :preview-src-list="[$host+props.row.image]" style="width: 100px;height: 50px"></el-image>-->
                </template>
            </el-table-column>
            <el-table-column
                    label="描述"
                    prop="particulars">
            </el-table-column>

            <el-table-column label="操作">
                <!--<template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" content="修改商品" placement="top-start">
                    <el-button
                            type="primary"
                            circle
                            icon="el-icon-edit"
                            size="medium"
                            @click="queryCommoditydetails(scope.$index, scope.row)"
&lt;!&ndash;                            v-if="$btnPermissions('商品修改')"&ndash;&gt;></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="下架商品" placement="top-start">
                    <el-button
                            type="danger"
                            circle
                            icon="el-icon-delete"
                            size="medium"
                            @click="deleteCommodity(scope.$index, scope.row)"
                            &lt;!&ndash;v-if="$btnPermissions('商品下架')"&ndash;&gt;></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="上架商品" placement="top-start">
                        <el-button
                                type="success"
                                circle
                                icon="el-icon-top"
                                size="medium"
                                @click="PutCommodity(scope.$index, scope.row)"
&lt;!&ndash;                                v-if="$btnPermissions('商品上架')"&ndash;&gt;></el-button>
                    </el-tooltip>
                </template>-->
            </el-table-column>
        </el-table>
        <!--分页-->
  <!--     <el-pagination
              @size-change="rowsChange"
               @current-change="pageChange"
                :current-page="newpage"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="5"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableData.total">
        </el-pagination>-->

        <!-- 添加功能模态框-->
        <el-dialog :close-on-click-modal="false"
                   title="商品添加"
                   :visible.sync="addmotaikuang">
            <!-- 商品编辑组件, 传入data值, 传入图片列表 -->
            <commodity-edit ref="addFrom" :from-data="fromData" :image-file="imageFile"></commodity-edit>

            <div slot="footer" class="dialog-footer">
                <el-button @click="addmotaikuang = false">取 消</el-button>
                <!--点击调用添加方法-->
             <el-button type="primary"   <!-- @click="submitAddCommodity" -->>确 定</el-button>
            </div>
        </el-dialog>

        <!-- 修改功能模态框-->
        <el-dialog :close-on-click-modal="false"
                   title="商品修改"
                   :visible.sync="updatemotaikuang">
            <!-- 商品编辑组件, 传入data值, 传入图片列表 -->
<!--            <commodity-edit ref="updateFrom" :from-data="fromData" :image-file="imageFile"></commodity-edit>-->

            <div slot="footer" class="dialog-footer">
                <el-button @click="updatemotaikuang = false">取 消</el-button>
                <!--点击调用添加方法-->
                <el-button type="primary" <!--@click="updateCommodity"-->>确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
  import Axios from "axios";
  import CommodityEdit from "./CommodityEdit";
  import el from "element-ui/src/locale/lang/el";

  export default {
    name: "Commodity",
    data(){
      return{
        $refs:{
          addFrom:'',
          updateFrom:''
        },
      // /!*延迟表格加载*!/
      loading:true,
        //添加模态框的状态
        addmotaikuang :false,
        //修改模态框的状态
        updatemotaikuang:false,
        //搜索框的变量
        input:"",
        //状态框的变量
        zhuangtai:"全部",
        //商品数据(包括图片)
        tableData:  {},
      //修改用 的商品id
      id:0,
        //当前页数
        newpage:1,
        //分页页码的值
        page:1,
        //分页一页多少行的值
        rows:5,
        fromData:{
          comType: {},
          comDiscount: {}
        },
        imageFile:{
          url: null
        }
      }
    },
    components:{
      CommodityEdit
    },
    methods:{
      //页面打开 查询所有商品信息
      getCommodityAll(){
        //console.log("getCommodityAll")
        var _this=this;
        let params = new URLSearchParams();
        params.append("name",this.input)
        params.append("state",this.zhuangtai)
        params.append("page",this.page.toString())
        params.append("rows",this.rows.toString())
        params.append("com_type",1)

        this.$axios.post("/commodity/queryallcommodity.action",params).then(value => {
          console.log(value.data.records)
          _this.tableData=value.data.records;
        })
      },
      //点击查询按钮 模糊查询商品信息
      MohuqueryCommodity(){
        this.getCommodityAll();
      },
      openAddCommodity() {
        //打开模态框
        this.addmotaikuang = true;
        //设置fromData的值, 这个就是传到模态框表单里面的值, 这里是添加, 创建一个空的商品对象
        //清空数据
        this.fromData = {comType: {}, comDiscount: {}};
        //设置图片
        this.imageFile = {url:null};
      }
    },
    created() {

      //加载所有商品信息
      this.getCommodityAll();

      //延迟表格加载
      setTimeout(() => {
        this.loading = false;
      }, 2000)
  }

  }
  /*import Axios from "axios";
  import CommodityEdit from "./CommodityEdit";
  import {ComDiscount, Commodity as Com, FileInfo, Message} from "../../../../helper/entity";
  /!**
   * 创建一个空的商品对象
   * 这里的Com是Commodity类型的别名, 因为Commodity类型会与当前组件类名冲突
   *!/
  function createEmptyCommodity(): Com {
    return {comType: {}, comDiscount: {}};
  }
  /!**
   * 创建一个空的文件信息
   *!/
  function createEmptyFileInfo(): FileInfo {
    return {url: null};
  }

export default {
  name:"Commodity",
  data(){
    return{
      /!*延迟表格加载*!/
      loading:true,
      //添加模态框的状态
      addmotaikuang :false,
      //修改模态框的状态
      updatemotaikuang:false,
      //搜索框的变量
      input:"",
      //状态框的变量
      zhuangtai:"全部",
      //商品数据(包括图片)
      tableData:  {},
      //修改用 的商品id
      id:0,

      //当前页数
      newpage:1,
      //分页页码的值
      page:1,
      //分页一页多少行的值
      rows:5
    }
  },
  components:{
    CommodityEdit
  },
  methods:{
    //页面打开 查询所有商品信息
    getCommodityAll(){
      //console.log("getCommodityAll")
      var _this=this;
      let params = new URLSearchParams();
      params.append("name",this.input)
      params.append("state",this.zhuangtai)
      params.append("page",this.page.toString())
      params.append("rows",this.rows.toString())
      params.append("com_type",1)

      this.$axios.post("/commodity/queryallcommodity.action",params).then(value => {
        console.log(value.data.records)
      _this.tableData=value.data.records;
      })
    },
    //点击查询按钮 模糊查询商品信息
    MohuqueryCommodity(){
      this.getCommodityAll();
    },
    //                      商品添加部分
    //!***********************************************************
    //打开添加商品模态框方法
    openAddCommodity() {
      //打开模态框
      this.addmotaikuang = true;
      //设置fromData的值, 这个就是传到模态框表单里面的值, 这里是添加, 创建一个空的商品对象
      //清空数据
      this.fromData = createEmptyCommodity();
      //设置图片
      this.imageFile = createEmptyFileInfo();
    },
    //提交添加的商品信息方法
     submitAddCommodity() {

      // if (!await this.$refs.addFrom.validate()) {
      //   this.$message.error("验证失败")
      //   return ;
      // }
      //验证价格是不是数字
      let value = this.fromData.price.toString().replace('/(^*)|(*$)','')  //去除字符串前后空格
      let num = Number(value)  //将字符串转换为数字
      if(isNaN(num)){  //判断是否是非数字
        this.$message.error("价格必须是数字")
        return;
      }else if(value === ''|| value === null){  //空字符串和null都会被当做数字
        this.$message.error("价格必须是数字")
        return;
      }
      //价格大于0
      if(num<=0){
        this.$message.error("价格必须大于0")
        return;
      }
      //验证规格是不是数字
      let value1 = this.fromData.specification.toString().replace('/(^*)|(*$)','')  //去除字符串前后空格
      let num1 = Number(value1)  //将字符串转换为数字
      if(isNaN(num1)){  //判断是否是非数字
        this.$message.error("规格必须是数字")
        return;
      }else if(value1 === ''|| value1 === null){  //空字符串和null都会被当做数字
        this.$message.error("规格必须是数字")
        return;
      }
      //规格大于0
      if(num1<=0){
        this.$message.error("规格必须大于0")
        return;
      }

      //关闭模态框
      this.addmotaikuang = false;
      //执行提交操作
      let params = new URLSearchParams();
      params.append("name",this.fromData.name)
      params.append("particulars",this.fromData.particulars)
      params.append("image",this.imageFile.url)
      params.append("price",this.fromData.price.toString())
      params.append("unit",this.fromData.unit)
      params.append("specification",this.fromData.specification)
      params.append("manufacturer",this.fromData.manufacturer)
      params.append("comtype",this.fromData.comType.id.toString())

      this.$axios.post("/commodity/addCommodity",params)
        .then((result)=> {
          if (result.data.flag===true){
            this.$message({
              type: 'success',
              message: "添加成功√"
            });
          }
          //刷新页面
          this.getCommodityAll();
        }).catch((msg) => {
        this.$message({
          type: 'error',
          message: "添加失败×"
        });
      });
    }
  },
  created() {
    //this.$store.commit('back/url', window.location.href);

    //加载所有商品信息
    this.getCommodityAll();

    //获取登录信息
    /!*EmpHelper.getEmp().then(value => {
        console.log(value);
    })*!/
    //延迟表格加载
    setTimeout(() => {
      this.loading = false;
    }, 2000)
  }
}
*/
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
