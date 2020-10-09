<template>
  <el-dialog
      :visible.sync="dialogVisible"
      width="35%"
      :before-close="handleClose">
    <el-form ref="form" :model="clearanceData" label-width="100px">
      <el-form-item label="主单号:">
        <div></div>
      </el-form-item>
      <el-form-item label="客户名称:">
        <div></div>
      </el-form-item>
      <el-form-item label="业务类型:">
        <div></div>
      </el-form-item>
      <el-form-item label="报关类型:">
        <div></div>
      </el-form-item>
      <el-form-item label="监管港式:">
        <div></div>
      </el-form-item>
      <el-form-item label="主件数:">
        <div></div>
      </el-form-item>
      <el-form-item label="商品数量:">
        <div></div>
      </el-form-item>
      <el-form-item label="状态:">
        <div></div>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
export default {
  name: "clearance_goods",
  data(){
    return{
      dialogVisible: false,
      clearanceData:{
        service_shop: "",
        clearance_order:""
      }
    }
  },
  methods:{
    handleClose(){

    }
  }
}
</script>

<style scoped>

</style>
