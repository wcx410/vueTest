<template>
  <div>
    <div style="display: block">
      <el-autocomplete
        class="home-query-input"
        popper-class="my-autocomplete"
        v-model="state"
        :fetch-suggestions="querySearch"
        :placeholder="'大家都在搜 : ' + hotSearch"
        clearable
        @select="handleSelect"
      ><!--@keydown.enter=""-->
        <template slot-scope="{ item }">
          <div class="name">{{ item.value }}</div>
        </template>
        <template slot="append">
          <el-button icon="el-icon-search" type="success" @click="query"></el-button>
        </template>

      </el-autocomplete>
    </div>

  </div>
</template>

<script>
    export default {
        name: "HomeQuery",
        data(){
          return{
            state:this.$store.getters["front/homeSearch"],
            hotSearchIndex:0,
            hotQueryList:[],
            hotSearch:''
          }
        },
      watch:{
          wState(value){
            this.$store.commit("front/homeSearch",value);
          }
      },
      methods:{
        querySearch(queryString){
          let params = new URLSearchParams();
          params.append("str",queryString);
          this.$axios.post("/commodity/searchTips",params).then(function (result) {

            }).catch()
        },
        handleSelect(item) {
          console.log(item.value);
        },
        query() {
          if (!this.$store.getters["front/homeSearch"]) {
            this.$store.commit("front/homeSearch",this.state = this.hotSearch);
          }
          //跳页面
          if (this.$router.currentRoute.path !== '/search') {
            this.$router.push({path: "/search"});
          } else {
            //查询
            let search = this.$store.getters["front/search"];
            if (search) search();
          }
        }
      }
    }
</script>

<style scoped>

</style>
