<template>
  <el-dialog
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose">
    <el-row style="margin-bottom: 20px">
      <el-col :span="6"> 主单号:{{ orderInfo.mainNo }}</el-col>
      <el-col :span="18">主单类型:{{ orderInfo.mainType }}</el-col>
    </el-row>
    <el-form label-position="left" ref="form" :inline="true" :model="clearanceData" label-width="110px" class="order_info_list">
<!--      <el-form-item label="主单号:" class="info_item">-->
<!--        <div class="form_value">{{ orderInfo.mainNo }}</div>-->
<!--      </el-form-item>-->
      <el-form-item label="一级客户:" class="info_item">
        <div class="form_value">{{ orderInfo.customerNameOne }}</div>
      </el-form-item>
      <el-form-item label="二级客户:" class="info_item">
        <div class="form_value">{{ orderInfo.customerNameTwo }}</div>
      </el-form-item>

      <el-form-item label="报关口岸:" class="info_item">
        <div class="form_value">{{ orderInfo.customsPort }}</div>
      </el-form-item>
      <el-form-item label="离境口岸:" class="info_item">
        <div class="form_value">{{ orderInfo.exitPort }}</div>
      </el-form-item>
      <el-form-item label="航班号:" class="info_item">
        <div class="form_value">{{ orderInfo.flightNo }}</div>
      </el-form-item>
      <el-form-item label="航班日期:" class="info_item">
        <div class="form_value">{{ orderInfo.flightDate }}</div>
      </el-form-item>
      <el-form-item label="主单件数:" class="info_item">
        <div class="form_value">{{ orderInfo.mainNumPackage }}</div>
      </el-form-item>
      <el-form-item label="主单毛量:" class="info_item">
        <div class="form_value">{{ orderInfo.mainRoughWeight }}</div>
      </el-form-item>
      <el-form-item label="毛单体积:" class="info_item">
        <div class="form_value">{{ orderInfo.mainVolume }}</div>
      </el-form-item>
      <el-form-item label="主单计费量:" class="info_item">
        <div class="form_value">{{ orderInfo.mainChargedWeight }}</div>
      </el-form-item>
      <el-form-item label="货值:" class="info_item">
        <div class="form_value">{{ orderInfo.goodsValue }}</div>
      </el-form-item>
      <el-form-item label="商品数量:" class="info_item">
        <div class="form_value">{{ orderInfo.descriptionNum }}</div>
      </el-form-item>
      <el-form-item label="通关单号:" class="info_item">
        <div class="form_value">{{ orderInfo.customsNo }}</div>
      </el-form-item>
      <el-form-item label="贸易单号:" class="info_item">
        <div class="form_value">{{ orderInfo.tradeNo }}</div>
      </el-form-item>
      <el-form-item label="合同编码:" class="info_item">
        <div class="form_value">{{ orderInfo.contractCoding }}</div>
      </el-form-item>
      <el-form-item label="发件人:" class="info_item">
        <div class="form_value">{{ orderInfo.addresser }}</div>
      </el-form-item>
      <el-form-item label="收件人:" class="info_item">
        <div class="form_value">{{ orderInfo.addressee }}</div>
      </el-form-item>
      <el-form-item label="报关企业代理:" class="info_item">
        <div class="form_value">{{ orderInfo.customsBrokerAgent }}</div>
      </el-form-item>
      <el-form-item label="报关日期:" class="info_item">
        <div class="form_value">{{ orderInfo.declarationDate }}</div>
      </el-form-item>
      <el-form-item label="生产销售单位:" class="info_item">
        <div class="form_value">{{ orderInfo.productionSaleUnit }}</div>
      </el-form-item>
      <el-form-item label="备注:" class="info_item" style="width: 98%; border-color: #ffffff">
        <div class="form_value">{{ orderInfo.remark }}</div>
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
      this.dialogVisible = false
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
  .info_item{
    padding-left: 10px;
    border: 1px solid #99a9bf;
  }
  .el-form-item{
    margin-bottom: 0;
    margin-right: 0;
  }

</style>
