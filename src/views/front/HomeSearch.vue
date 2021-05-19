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
<!--          <div class="xsyx-commodity-content">-->
<!--            <el-badge :value="'NEW'" type="success" class="badge"/>-->
<!--            <div class="image-box" @click="$router.push({path: '/spxq?id=' + data.id})">-->
<!--              <el-image :src="$host + data.image" fit="cover" class="image"></el-image>-->
<!--            </div>-->
<!--            <el-row style="height: 52px">-->
<!--              <div class="title">{{ data.name }}</div>-->
<!--            </el-row>-->
<!--            <el-row>-->
<!--              <div class="type">{{ data.comType.name }}</div>-->
<!--            </el-row>-->
<!--            <el-row>-->
<!--              <el-button class="add-to-car" type="success" round plain>加入购物车</el-button>-->
<!--              <div class="price">-->
<!--                <span class="discount"></span>-->
<!--                <span class="discount-price"> ￥{{ data.price }}</span>-->
<!--                <span> / {{ data.unit }}</span>-->
<!--              </div>-->
<!--            </el-row>-->
<!--          </div>  -->
          <el-row>
            <div class="xsys-commodity-box">
              {{name}}
              {{unit}}
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
          name: "",
          image: "",
          unit: "",
        }
      },
      methods:{
        query() {
          var _this = this;
          var params = new URLSearchParams();
          params.append("name",this.search);
          this.$axios.post("/commodity/queryallcommodity.action", params).then(function (item) {
            console.log(item)
          })
        }
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
