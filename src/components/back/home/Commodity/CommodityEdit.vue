<!--商品添加修改模态框-->
<template>
       <div>

        <el-form label-width="80px" status-icon :model="fromData" ref="form" :rules="rules">
            <el-form-item label="商品名称" prop="name">
                <el-input v-model="fromData.name"></el-input>
            </el-form-item>
            <el-form-item label="商品描述" prop="particulars">
                <el-input v-model="fromData.particulars"></el-input>
            </el-form-item>
            <el-form-item label="商品图片">
                <!-- 商品图片-->
                <commodity-images :image-file="imageFile"></commodity-images>
            </el-form-item>
            <el-form-item label="商品价格" prop="price">
                <el-input  v-model="fromData.price"></el-input >
            </el-form-item>
            <el-form-item label="单位" prop="unit">
                <el-input v-model="fromData.unit"></el-input>
            </el-form-item>
            <el-form-item label="规格" prop="specification">
                <el-input v-model="fromData.specification"></el-input>
            </el-form-item>
            <el-form-item label="生产厂商" prop="manufacturer">
                <el-input v-model="fromData.manufacturer"></el-input>
            </el-form-item>
            <el-form-item label="商品类型" prop="comType.id">
                <el-select v-model="fromData.comType.id">
                    <el-option :value="type.id" :label="type.name" v-for="type in comtype" :key="type.id" :index="type.id"></el-option>
                </el-select>
            </el-form-item>
            <!--<el-form-item label="上架时间">
                <el-input v-model="fromData.putawayDate" type="date" placeholder="选择日期"></el-input>
            </el-form-item>-->

        </el-form>
       </div>
</template>

<script>
  import CommodityImages from "./CommodityImages";
  import Axios from "axios";

  export default{
    name:"CommodityEdit",
    data(){
      return{
      fromData: {},
      imageFile:{},
      comtype : {},
        //验证执行
        rules: {
          name: [{
            message: "商品名不能为空 !",
            required: true,
            trigger: "blur"
          }],
          particulars: [{
            message: "商品描述不能为空 !",
            required: true,
            trigger: "blur"
          }],
          price: [{
            message: "商品价格不能为空 !",
            required: true,
            trigger: "blur"
          }],
          unit: [{
            message: "单位不能为空 !",
            required: true,
            trigger: "blur"
          }],
          specification: [{
            message: "规格不能为空 !",
            required: true,
            trigger: "blur"
          }],
          manufacturer: [{
            message: "生产厂商不能为空 !",
            required: true,
            trigger: "blur"
          }],
          'comType.id': [{
            message: "商品类型不能为空 !",
            required: true,
            trigger: "blur"
          }],
        }
      }
    },
    components:{
      CommodityImages
    },
    methods:{
      //查询所有商品类型信息
      getCommodityTypeAll(){
        var _this=this;
        this.$axios.post("/commodity/queryAlltype.action").then(value => {
          console.log(value.data)
          _this.comtype=value.data;
        })
      },

    },
    created() {
        //加载所有商品类型信息
        this.getCommodityTypeAll();
    },
    //触发验证
    async validate() {
      return new Promise<boolean>(resolve => {
        (this.$refs.form).validate((value) => {
          resolve(value);
        })
      });
    }
  }
</script>

<style scoped>

</style>
