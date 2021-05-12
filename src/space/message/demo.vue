<template>
  <div id="test" style="height:500px;">
    <el-scrollbar
      style="height:100%"
      :wrap-class="wrapClass"
      :wrap-style="wrapStyle"
      :view-class="viewClass"
      :view-style="viewStyle"
      :native="native"
      :tag="tag"
      :noresize="noresize"
    >
      <ul>
        <li v-for="item in 1000">{{item}}</li>
      </ul>
    </el-scrollbar>

  </div>
</template>

<script>
    export default {
        name: "demo",
      data(){
        return {
          //滚动区域层class
          wrapClass:{
            wrapClass:true
          },
          wrapStyle:{
            fontWeight:800
          },

          //滚动整体区域的class
          viewClass:{
            viewClass:true
          },
          viewStyle:{
            border:'1px solid #000000',
            boxSizing:'border-box'
          },
          // native属性：如果为true就不显示el的bar，也就是el模拟出来的滚动条，如果为false就显示模拟的滚动条
          native:false,
          // tag 渲染出来的标签
          tag:'section',
          // noresize 是否刷新滚动条大小
          noresize:true

        }
      }
    }
</script>

<style scoped>

</style>
