<template>
  <el-dialog
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose">
    <el-form label-position="left" ref="form" :inline="true" :model="clearanceData" label-width="100px" class="order_info_list">
      <el-form-item label="主单号:">
        <div class="form_value">12434635323</div>
      </el-form-item>
      <el-form-item label="客户名称:">
        <div class="form_value">杨哥</div>
      </el-form-item>
      <el-form-item label="主单类型:">
        <div class="form_value">通关类型</div>
      </el-form-item>
      <el-form-item label="报关口岸:">
        <div class="form_value">报关口岸</div>
      </el-form-item>
      <el-form-item label="离境口岸:">
        <div class="form_value">离境口岸</div>
      </el-form-item>
      <el-form-item label="航班号:">
        <div class="form_value">航班号</div>
      </el-form-item>
      <el-form-item label="航班号:">
        <div class="form_value">航班号</div>
      </el-form-item>
      <el-form-item label="航班日期:">
        <div class="form_value">航班日期</div>
      </el-form-item>
      <el-form-item label="主单件数:">
        <div class="form_value">主单件数</div>
      </el-form-item>
      <el-form-item label="主单毛量:">
        <div class="form_value">主单毛量</div>
      </el-form-item>
      <el-form-item label="毛单体积:">
        <div class="form_value">毛单体积</div>
      </el-form-item>
      <el-form-item label="主单计费量:">
        <div class="form_value">主单计费量</div>
      </el-form-item>
      <el-form-item label="贸易方式:">
        <div class="form_value">贸易方式</div>
      </el-form-item>
      <el-form-item label="货值:">
        <div class="form_value">货值</div>
      </el-form-item>
      <el-form-item label="商品数量:">
        <div class="form_value">商品数量</div>
      </el-form-item>
      <el-form-item label="商品数量:">
        <div class="form_value">通关单号</div>
      </el-form-item>
      <el-form-item label="贸易单号:">
        <div class="form_value">贸易单号</div>
      </el-form-item>
      <el-form-item label="合同编码:">
        <div class="form_value">合同编码</div>
      </el-form-item>
      <el-form-item label="发件人:">
        <div class="form_value">发件人</div>
      </el-form-item>
      <el-form-item label="收件人:">
        <div class="form_value">收件人</div>
      </el-form-item>
    </el-form>





    <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
export default {
  props:["orderInfo"],
  name: "clearance_goods",
  data(){
    return{
      dialogVisible: false,
      activeNames:"1",
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
  .order_info_list{
    height: 300px;
    overflow-y: auto;
  }
  .form_value{
    width: 150px;
  }

</style>
