<template>
  <el-row type="flex" align="middle" class="search_container">


    <!--  名称查询输入框  -->
    <el-col :span="18">

      <el-form ref="form" :inline="true" :model="clearanceData" label-width="80px" class="form_list">
        <el-form-item label="主单号">
          <el-input
            type="textarea"
            maxlength="10000"
            v-model="clearanceData.master_bill_number"
            placeholder="可批量输入，通过换行符（回车）区分多条数据"/>
        </el-form-item>
        <el-form-item label="报关日期">
          <el-input
            v-model="clearanceData.master_bill_time"
            placeholder="报关日期"/>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary">查询</el-button>
        </el-form-item>
        <el-form-item label="">
          <el-button class="operator_button" type="primary" @click="operatorUser('export')">导出</el-button>

        </el-form-item>

      </el-form>
    </el-col>


    <!--  查询按钮  -->
    <el-col :span="2" :offset="1">

    </el-col>

    <!--  查询按钮  -->
    <el-col :span="2">
      <!--  功能  -->


    </el-col>
  </el-row>
</template>

<script>
import {ORDER_TYPE_GROUP} from "@/config/selectData";

export default {
  name: "searchComponents",
  data(){
    return{
      clearanceData:{
        master_bill_number    : "",                   // 操作员
        master_bill_time      : "",                   // 报关日期
      },
      operator_type_list    : ORDER_TYPE_GROUP,       // 操作类型列表
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
