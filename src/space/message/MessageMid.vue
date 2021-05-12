<template>
  <div style="height:900px;">
    <el-scrollbar
      style="height:100%;margin-right: 20px"
      :wrap-class="wrapClass"
      :wrap-style="wrapStyle"
      :view-class="viewClass"
      :view-style="viewStyle"
      :native="native"
      :tag="tag"
      :noresize="noresize"
    >
    <ul>
      <!--<li v-for="i in msg" class="infinite-list-item">-->
      <div v-for="i in data" class="infinite-list-item">
        <!-- 对方  v-if="!itemc.mineMsg"-->
        <div class="word" >
          <!--<img :src="itemc.headUrl">-->
          <div class="info">
            <p class="time">{{i.name1}}</p>
            <div class=" info-content2">{{i.content1}}</div>
          </div>
        </div>
        <!-- 我的 v-else-->
        <div class="word-my" >
          <div class="info2">
            <p class="time2">{{i.name2}}</p>
            <div class="   info-content2">{{i.content2}}</div>
          </div>
          <!--<img :src="itemc.headUrl">-->
        </div>
      </div>
      <!--</li>-->
    </ul>
    </el-scrollbar>
  </div>
</template>

<script>
    export default {
        name: "MessageMid",
      props:["data"],
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
</script>

<style scoped>

</style>
