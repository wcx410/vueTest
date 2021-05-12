<template>
    <div>
      <div class="talk_input" style="margin-top: 0px">
        <!-- 请输入内容 -->
        <el-input type="text" class="talk_word"  clearable v-model='str'></el-input>
        <!-- 按钮 class="talk_sub"-->
        <el-button type="success" round  plain  @click="add_data()">发送</el-button>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Messagebom",
      props:["str"]
    }
</script>

<style>

</style>
