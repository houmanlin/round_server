<template>
  <el-row type="flex" align="middle" class="search_container">
    <!--  名称查询输入框  -->
    <el-col :span="4"><el-input v-model="operator" placeholder="请输入操作员名称"></el-input></el-col>
    <!--  操作时间选择  -->
    <el-col :span="4" :offset="1">
      <el-date-picker
        v-model="operator_date"
        type="datetime"
        placeholder="操作时间">
      </el-date-picker>
    </el-col>
    <!--  操作类型  -->
    <el-col :span="4" :offset="1">
      <el-select filterable v-model="operator_type" placeholder="请选择操作类型">
        <el-option
            v-for="item in operator_type_list"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
    </el-col>

    <!--    -->
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
