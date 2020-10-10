<template>
  <el-row type="flex" align="middle" class="search_container">


    <!--  名称查询输入框  -->
    <el-col :span="4">
      <el-input v-model="user_name" filterable placeholder="请输入用户名"/>
    </el-col>
    <!--  名称查询输入框  -->
    <el-col :span="4" :offset="1">
      <el-input v-model="serial_number" filterable placeholder="请输入编码"/>
    </el-col>


    <!--  查询按钮  -->
    <el-col :span="6" :offset="1">
      <el-button type="primary">查询</el-button>
    </el-col>
  </el-row>
</template>

<script>

export default {
  name: "searchComponents",
  data(){
    return{
      user_name:        "",       //客户名称
      serial_number:    "",       //客户编号
    }
  }
}
</script>

<style scoped>
  .search_container{
    margin: 20px 0;
  }
</style>
