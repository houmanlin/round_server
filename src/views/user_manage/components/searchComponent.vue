<template>
  <el-row type="flex" align="middle" class="search_container">


    <!--  名称查询输入框  -->
    <el-col :span="4"><el-input v-model="operator" placeholder="请输入用户名"></el-input></el-col>


    <!--  名称查询输入框  -->
    <el-col :span="4" :offset="1"><el-input v-model="operator" placeholder="请输入真实姓名"></el-input></el-col>


    <!--  查询按钮  -->
    <el-col :span="6" :offset="1">
      <el-button type="primary">查询</el-button>
    </el-col>
  </el-row>
</template>

<script>
import {ORDER_TYPE_GROUP} from "@/config/orderType";

export default {
  name: "searchComponents",
  data(){
    return{
      operator            : "",                   // 操作员
      operator_date       : "",                   // 操作时间
      operator_type       : "",                   // 操作类型
      operator_type_list  : ORDER_TYPE_GROUP,     // 操作类型列表
    }
  }
}
</script>

<style scoped>
  .search_container{
    margin: 20px 0;
  }
</style>
