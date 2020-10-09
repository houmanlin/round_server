<template>
  <div class="search_container">

    <!--  功能  -->
    <el-button class="operator_button dark_green" type="primary" @click="operatorUser('新增')">新增</el-button>

    <!--  功能  -->
    <el-button class="operator_button" type="warning" @click="operatorUser('修改')">修改</el-button>

    <!--  功能  -->
    <el-button class="operator_button" type="danger" @click="operatorUser('删除')">删除</el-button>

  </div>
</template>

<script>
export default {
  name: "operatorButtonGroup",
  data(){
    return{
      operator_convert:{       //数据转换
        '新增': "Add",
        '修改': "Edit",
        '删除': "Remove",
        '重置': "Reset",
        '启用': "Enable",
        '禁用': "Disable",
      }
    }
  },
  methods:{
    /**
     * 操作按钮
     * @param operator  操作关键字
     */
    operatorUser(operator){
      this.$emit('on' + this.operator_convert[operator])
    }
  }
}
</script>

<style scoped>
  .search_container{
    display: flex;
    justify-content: flex-start;
  }
  .operator_button{
    margin-right: 15px;
    margin-bottom: 15px;
    float: right;
  }
</style>
