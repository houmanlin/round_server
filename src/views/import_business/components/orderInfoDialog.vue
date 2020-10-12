<template>
  <el-dialog
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose">
    <el-form label-position="left" ref="form" :inline="true" :model="clearanceData" label-width="100px" class="order_info_list">
      <el-form-item label="主单号:">
        <div class="form_value">{{ orderInfo.mainNo }}</div>
      </el-form-item>
      <el-form-item label="一级客户:">
        <div class="form_value">{{ orderInfo.customerNameOne }}</div>
      </el-form-item>
      <el-form-item label="二级客户:">
        <div class="form_value">{{ orderInfo.customerNameOne }}</div>
      </el-form-item>
      <el-form-item label="主单类型:">
        <div class="form_value">
          {{ orderInfo.mainType }}
        </div>
      </el-form-item>
      <el-form-item label="报关口岸:">
        <div class="form_value">{{ orderInfo.customsPort }}</div>
      </el-form-item>
      <el-form-item label="离境口岸:">
        <div class="form_value">{{ orderInfo.exitPort }}</div>
      </el-form-item>
      <el-form-item label="航班号:">
        <div class="form_value">{{ orderInfo.flightNo }}</div>
      </el-form-item>
      <el-form-item label="航班日期:">
        <div class="form_value">{{ orderInfo.flightDate }}</div>
      </el-form-item>
      <el-form-item label="主单件数:">
        <div class="form_value">{{ orderInfo.mainNumPackage }}</div>
      </el-form-item>
      <el-form-item label="主单毛量:">
        <div class="form_value">{{ orderInfo.mainRoughWeight }}</div>
      </el-form-item>
      <el-form-item label="毛单体积:">
        <div class="form_value">{{ orderInfo.mainVolume }}</div>
      </el-form-item>
      <el-form-item label="主单计费量:">
        <div class="form_value">{{ orderInfo.mainChargedWeight }}</div>
      </el-form-item>
      <el-form-item label="货值:">
        <div class="form_value">{{ orderInfo.goodsValue }}</div>
      </el-form-item>
      <el-form-item label="商品数量:">
        <div class="form_value">{{ orderInfo.descriptionNum }}</div>
      </el-form-item>
      <el-form-item label="通关单号:">
        <div class="form_value">{{ orderInfo.customsNo }}</div>
      </el-form-item>
      <el-form-item label="贸易单号:">
        <div class="form_value">{{ orderInfo.tradeNo }}</div>
      </el-form-item>
      <el-form-item label="合同编码:">
        <div class="form_value">{{ orderInfo.contractCoding }}</div>
      </el-form-item>
      <el-form-item label="发件人:">
        <div class="form_value">{{ orderInfo.addresser }}</div>
      </el-form-item>
      <el-form-item label="收件人:">
        <div class="form_value">{{ orderInfo.addressee }}</div>
      </el-form-item>
      <el-form-item label="报关企业代理:">
        <div class="form_value">{{ orderInfo.customsBrokerAgent }}</div>
      </el-form-item>
      <el-form-item label="报关日期:">
        <div class="form_value">{{ orderInfo.declarationDate }}</div>
      </el-form-item>
      <el-form-item label="生产销售单位:">
        <div class="form_value">{{ orderInfo.productionSaleUnit }}</div>
      </el-form-item>
      <el-form-item label="备注:">
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
