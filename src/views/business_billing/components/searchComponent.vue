<template>
  <el-row type="flex" align="middle" class="search_container">


    <!--  名称查询输入框  -->
    <el-col :span="18">

      <el-form ref="form" :inline="true" :model="clearanceData" label-width="80px" class="form_list">
        <el-form-item label="主单号">
          <el-input
            type="textarea"
            maxlength="10000"
            v-model="clearanceData.mainNo"
            placeholder="可批量输入，通过换行符（回车）区分多条数据"/>
        </el-form-item>
        <el-form-item label="报关日期">
          <el-date-picker
              v-model="clearanceData.customsDate"
              type="date"
              placeholder="报关时间">
          </el-date-picker>

        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="getFiled">查询</el-button>
        </el-form-item>
        <el-form-item label="">
          <el-button class="operator_button" type="primary" @click="operatorUser('export')">导出</el-button>

        </el-form-item>

      </el-form>
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
        mainNo                : "",                   // 操作员
        customsDate           : "",                   // 报关日期
      },
      operator_type_list    : ORDER_TYPE_GROUP,       // 操作类型列表
    }
  },
  methods:{
    operatorUser(operator_key){
      this.$emit("onOperator", operator_key)
    },
    getFiled(){
      let custom_date = new Date( this.clearanceData.customsDate)
      this.clearanceData.customsDate = `${custom_date.getFullYear()}-${custom_date.getMonth()+1}-${custom_date.getDate()}`

      this.$emit("onFiledData", this.clearanceData)
    }
  }
}
</script>

<style scoped>
  .search_container{
    margin: 20px 0;
  }
</style>
