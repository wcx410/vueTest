<template>
    <div>
      <template v-for="(item,index) in data" :data="item" :index="index">
        <el-menu-item :index="2-index"  @click="searchType(data.name)">{{item.name}}</el-menu-item>
      </template>
    </div>
</template>

<script>
    export default {
        name: "HotTypeTop",
      data(){
          return{
            data:[]
          }
      },
      methods:{
        searchType(str) {
          this.$store.commit("front/homeSearch",str);
          this.$router.push({path: "/search"});
        },
      },
      mounted() {
        var _this = this;
        this.$axios.get("/comType/queryHot").then(function (result) {
          _this.data=result.data;
        }).catch()
      }
    }
</script>

<style scoped>

</style>
