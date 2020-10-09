<template>
  <el-row type="flex" align="middle" class="search_container">


    <!--  名称查询输入框  -->
    <el-col :span="4">
      <el-input v-model="field_value" placeholder="请输入字段名">

      </el-input>
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

      field_list: [{
        value: '0',
        label: 'CODE DIV'
      }, {
        value: '1',
        label: 'CODE CD'
      }, {
        value: '2',
        label: 'CODE 名称'
      }, {
        value: '3',
        label: '顺序'
      }],
      field_value: ''
    }
  }
}
</script>

<style scoped>
  .search_container{
    margin: 20px 0;
  }
</style>
