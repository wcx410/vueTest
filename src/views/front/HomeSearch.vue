<template>
  <div>
    <el-container>
      <front-header></front-header>
<!--      <front-header ref="head"></front-header>-->
<!--      <template>-->
<!--        <el-input v-model="val" placeholder="请输入内容">-->
<!--          <el-button slot="append"  icon="el-icon-search" @click="query(val)"></el-button>-->
<!--        </el-input>-->
<!--      </template>-->

      <el-main style="margin-top: 50px;min-height: 400px">
        <div class="xsyx-block">
          <el-row>
            <div class="xsyx-flag" style="background-color: #8558D6"></div>
            <label style="font-size: 20px;color: #8558D6;display: inline">搜索结果</label>
            <div class="xsyx-line"></div><br>
          </el-row>
          <div class="xsyx-commodity-content" v-for="c in tableData">
            <el-badge :value="'NEW'" type="success" class="badge"/>
            <div class="image-box" @click="selByid(c.id)">
              <el-image :src="c.image" fit="cover" class="image"></el-image>
            </div>
            <el-row style="height: 52px">
              <div class="title">{{ c.name }}</div>
            </el-row>
<!--            <el-row>-->
<!--              <div class="type">{{ c.comType }}</div>-->
<!--            </el-row>-->
            <el-row>
              <el-button class="add-to-car" type="success" @click="add(c.id,c.price)" round plain>加入购物车</el-button>
              <div class="price">
                <span class="discount"></span>
                <span class="discount-price"> ￥{{ c.price }}</span>
                <span> / {{ c.unit }}</span>
              </div>
            </el-row>
          </div>
          <el-row>
            <div class="xsys-commodity-box">

            </div>
          </el-row>

        </div>

<!--        <el-pagination-->
<!--          @size-change=""-->
<!--          @current-change=""-->
<!--          background-->
<!--          :page-sizes="[20, 30, 50, 100]"-->
<!--          :page-size="20"-->
<!--          layout="total, sizes, prev, pager, next"-->
<!--          :total="tableData.total"total>-->
<!--        </el-pagination>-->

      </el-main>


      <el-footer style="margin: 100px -10px -10px -10px;padding: 0;">
        <!-- 页尾 -->
        <Footer></Footer>
      </el-footer>

    </el-container>
  </div>

</template>

<script>

    import Footer from "./Footer";
    import FrontHeader from "../../components/front/home/FrontHeader";
    export default {
        name: "HomeSearch",
      components: {FrontHeader,  Footer},
      data(){
        return{
          search:"",
          tableData: [],
        }
      },
      methods:{
        query() {
          var _this = this;
          var params = new URLSearchParams();
          this.search = this.$store.state.search;
          params.append("name",this.search);
          this.$axios.post("/commodity/queryallcommoditys.action", params).then(function (item) {
            _this.tableData = item.data;
            _this.tableData = _this.tableData.map((val)=>{
              val.image="http://localhost:8090/xsyx/"+val.image;
              return val;
            })
          })
        },
        add(cid,price) {
          if (sessionStorage.getItem("user") == null) {
            this.$router.push("/login")
          } else {
            var _this = this;
            var params = new URLSearchParams();
            params.append("totalprice", price * 1)
            params.append("number", 1)
            params.append("uid", sessionStorage.getItem("user"));
            params.append("cid", cid);
            this.$axios.post("/shopCar/addShopCar", params).then(function (item) {
            }).catch()
          }
        },
        selByid(id){

          this.$router.push({path: '/spxq?id=' + id})
          // var _this=this;
          // var params = new URLSearchParams();
          // params.append("id",this.id);
          // this.$axios.post("/commodity/xiangqing.action",params).then(function (item) {
          //
          // }).catch()
        }
      },
      created() {
          this.query();
      }
    }
</script>

<style scoped>

  /* 块级 */
  .xsyx-block {
    /*background-color: #F4F4F4;*/
    margin-top: 25px;
    /*border: 2px solid #F4F4F4;*/
    border-radius: 5px;
    padding: 20px;
  }
  /* 横线 */
  .xsyx-line {
    width: 100%;
    height: 1px;
    background-color: #d9d9d9;
    margin-top: 5px;
    margin-bottom: 4px;
  }
  /* 标签 */
  .xsyx-flag {
    margin-right: 5px;
    width: 5px;
    height: 25px;
    float:left;
  }


</style>
