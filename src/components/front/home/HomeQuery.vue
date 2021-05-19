<template>
  <el-input v-model="search" placeholder="请输入内容">
    <el-button slot="append"  icon="el-icon-search" @click="query"></el-button>
  </el-input>
</template>

<script>

    export default {
      name: "HomeQuery",
      data() {
        return {
          search:'',

        }
      },
      methods: {
        query(){
          this.$store.commit("setSearch",this.search);
          this.$router.push("/HomeSearch");
        }
      }
    }
</script>

<style scoped>

</style>
