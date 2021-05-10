<template>
    <div style="width: 1000px">
      <el-table
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        @current-change="handleCurrentChange"
        @row-click="querymsg"
        style="width: 100%">
        <el-table-column
          property="img"
          width="120">
        </el-table-column>
        <el-table-column
          property="name"
          width="120">
        </el-table-column>

      </el-table>
    </div>
</template>

<script>
  import Message from "../../space/message/Message"
    export default {
        name: "MessageHome",
      data(){
          return{
            tableData:[
              {
                img: '头像',
                name: '王小虎',
              },
              {
                img: '头像',
                name: '王er虎',
              },
              {
                img: '头像',
                name: '王虎',
              }
            ],
          }
      },
      methods:{
          querymsg(){
            this.$router.replace('/msg')
          }
      },
    }
</script>

<style scoped>

</style>
