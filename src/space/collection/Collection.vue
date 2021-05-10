<template>
    <div>
      <h2>我的收藏</h2>
      <el-row v-for="coll in commodity">
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <!--v-if="Shopcar.cid.image" :src="'{{$host + Shopcar.cid.image}}'"-->
            <el-image fit="cover" style="width: 150px;height: 150px; margin-left: 20px;margin-top: 20px" ></el-image>
            <div style="font-size: 18px;margin-left: 250px;margin-top: -140px;width: 300px;height: 100px;">
              <!--商品描述-->
              <span>{{coll.particulars}}</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import userhelper from  "../../helper/front/UserHelper"
    export default {
        name: "Collection",
      data(){
          return{
            commodity:[]
          }
      },
      methods:{
          getcol(){
            var _this =this;
            var params = new URLSearchParams();
            params.append("uid",userhelper.userId);
            this.$axios.post("collect/getCollection",params).then(function (response) {
              _this.commodity = response.data;
            }).catch();
          }
      },
      created() {
        this.getcol();
      }
    }
</script>

<style scoped>

</style>
