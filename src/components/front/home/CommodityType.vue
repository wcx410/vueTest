<template>
  <div class="xsyx-type-item">

    <div class="xsyx-type-content" @click="searchType(data.name)">
      <svg :class="['zdy-icon','index' + index]" style="width: 50px;height: 50px" aria-hidden="true">
        <use :xlink:href="index | icon"></use>
      </svg>
      <div class="type-name">{{ data.name }}</div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "CommodityType",
        data(){
          return{
            index:'',
            data:''
          }
        },
      filters:{
        icon: (index) => {
          switch (index) {
            case 0: return '#icon-guanjun';
            case 1: return '#icon-yajun';
            case 2: return '#icon-jijun';
            default: return '#icon-' + (index + 1);
          }
        }
      },
      methods:{
        searchType(str) {
          this.$store.commit("front/homeSearch",str);
          this.$router.push({path: "/search"});
        }
      }
    }
</script>

<style scoped>

</style>
