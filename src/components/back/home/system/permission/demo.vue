<template>
<div>
  <el-tree :data="affiliatedSystemData" :props="affiliatedSystemProps"  label="lable"  ref="tree"
           show-checkbox node-key="tId" > </el-tree>

</div>
</template>

<script>
    export default {
        name: "demo",
      data(){
        return{

          affiliatedSystemData:[],
          affiliatedSystemProps: {
            children: 'children',
            label: 'pName'
          }
          }
      },
      methods:{

        jsonTree :function (data,config) {
          //1.声明了变量，拿到传参过来的值，注意这里拿到的是string类型，不是对应的值
          var id = config.id || 'id',
            pid = config.pid || 'pid',
            children = config.children || 'children';
          var idMap = [],
            newIdMap = [],
            jsonTree = [];
          /*2.v[id]==v[“id”]==v.id
             idMap数组的下标对应着id为下标的相应json数据
             a[1]对应着id为1的json数据，以此类推*/
          data.forEach(function(v){
            idMap[v[id]] = v;
          });
          //3拿到当前遍历的父元素id
          /*			根据父元素id，判断数组里是否存在这样一条数据
                      存在，就判断父元素是否有子元素数组，若没有就添加一个children数组（传参过来的）
                      把当前元素添加父元素的children数组里
                      不存在，就直接添加到jsonTree里*/
          data.forEach(function(v){
            var parent = idMap[v[pid]];
            //定义一个newIdMap
            delete v.parent;//删除{v}的parent和id
            //delete v.id;
            if(parent) {
              !parent[children] && (parent[children] = []);
              parent[children].push(v);
            } else {
              jsonTree.push(v);
            }
          });
          return jsonTree;
        },
        get(){
          let data = [
            {"id":1,"parent":0,'lable':'重庆'},
            {"id":11,"parent":1,'lable':'上海'},
            {"id":12,"parent":1,'lable':'北京'},
            {"id":121,"parent":12,'lable':'合肥'},
            {"id":2,"parent":0,"lable":'天津'},
            {"id":21,"parent":2,"lable":'丰田'},
            {"id":211,"parent":21,"lable":'饭店'},
            //{"id":212,"parent":21,"lable":'饭店2'},
            {"id":3,"parent":0,"lable":'厄尔'},
            {"id":4,"parent":0,"lable":'汇报'},
            {"id":31,"parent":3,"lable":'宝宝'},
            {"id":32,"parent":3,"lable":'茁壮'}
          ];
          this.affiliatedSystemData = data;
          var result = this.jsonTree(data, {
            id: 'id',
            pid: 'parent',
            children: 'children'
          });
          console.log(result);
          var children = JSON.stringify(result, null, '\t');
          console.log(children)
        }
      },
      created() {
          this.get();
      }
    }
</script>

<style scoped>

</style>
