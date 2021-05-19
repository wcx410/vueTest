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
        query:{

        }
      }
    }
</script>

<style scoped>

</style>
