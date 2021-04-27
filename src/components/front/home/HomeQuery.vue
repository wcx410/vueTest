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
        name: "HomeQuery"
    }
</script>

<style scoped>

</style>
