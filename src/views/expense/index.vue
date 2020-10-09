<template>
  <el-form ref="form" :model="expenseConfig" label-width="150px" class="view_container">
    <el-form-item label="分单项目费用(每项)">
      <el-input v-model="expenseConfig.house_bill"></el-input>
    </el-form-item>
    <el-form-item label="计费重量费用(每公斤)">
      <el-input v-model="expenseConfig.weight"></el-input>
    </el-form-item>
    <el-form-item label="检查费用(次)">
      <el-input v-model="expenseConfig.examine"></el-input>
    </el-form-item>
    <el-form-item label="推单费用(次)">
      <el-input v-model="expenseConfig.pushorder"></el-input>
    </el-form-item>
    <el-form-item label="退库费用(次)">
      <el-input v-model="expenseConfig.cancelling_stocks"></el-input>
    </el-form-item>
    <el-form-item label="转关费用(次)">
      <el-input v-model="expenseConfig.customs_transit"></el-input>
    </el-form-item>
    <el-form-item label="运输费(有境内监管)">
      <el-input v-model="expenseConfig.freight1"></el-input>
    </el-form-item>
    <el-form-item label="运输费(无境内监管)">
      <el-input v-model="expenseConfig.freight2"></el-input>
    </el-form-item>
    <el-form-item class="create_user">
      <el-button type="primary" @click="onSubmit">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "expense",
  data(){
    return{
      expenseConfig:{
        house_bill:             "",
        weight:                 "",
        examine:                "",
        pushorder:              "",
        cancelling_stocks:      "",
        customs_transit:        "",
        freight1:               "",
        freight2:               "",
      }
    }
  },
  methods:{
    /**
     * 创建提交
     */
    onSubmit(e){
      debugger
    }
  }
}
</script>

<style scoped>
.view_container{
  width: 60%;
  margin-top: 40px;
}
.create_user{
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 20px auto;
}
</style>
