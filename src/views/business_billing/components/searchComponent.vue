<template>
  <el-row type="flex" align="middle" class="search_container">


    <!--  名称查询输入框  -->
    <el-col :span="4">
      <el-input
        type="textarea"
        maxlength="10000"
        v-model="master_bill_number"
        placeholder="可批量输入，通过换行符（回车）区分多条数据"/>
    </el-col>


    <!--  查询按钮  -->
    <el-col :span="2" :offset="1">
      <el-button type="primary">查询</el-button>
    </el-col>

    <!--  查询按钮  -->
    <el-col :span="2">
      <!--  功能  -->
      <el-button class="operator_button" type="primary" @click="operatorUser('export')">导出</el-button>


    </el-col>
  </el-row>
</template>

<script>
import {ORDER_TYPE_GROUP} from "@/config/selectData";

export default {
  name: "searchComponents",
  data(){
    return{
      master_bill_number    : "",                   // 操作员
      operator_type_list    : ORDER_TYPE_GROUP,     // 操作类型列表
    }
  },
  methods:{
    operatorUser(operator_key){
      this.$emit("onOperator", operator_key)
    }
  }
}
</script>

<style scoped>
  .search_container{
    margin: 20px 0;
  }
</style>
