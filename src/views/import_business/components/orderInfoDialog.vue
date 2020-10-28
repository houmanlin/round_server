<template>
  <el-dialog
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose">
    <el-row style="margin-bottom: 20px">
      <el-col :span="8"> 主单号：{{ orderInfo.mainNo }}</el-col>
      <el-col :span="8">主单类型：{{ orderInfo.mainType == 1?'直单':'一主多分' }}</el-col>
      <el-col :span="8">业务类型：{{ orderInfo.businessType == 1?'统一版进口':(orderInfo.businessType == 1?'统一版出口':'转关') }}</el-col>
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
        <div class="form_value">{{ orderInfo.portEntry }}</div>
      </el-form-item>
      <el-form-item label="通关口岸:" class="info_item">
        <div class="form_value">{{ orderInfo.clearancePort }}</div>
      </el-form-item>
      <el-form-item label="航班号:" class="info_item">
        <div class="form_value">{{ orderInfo.flightNo }}</div>
      </el-form-item>
      <el-form-item label="航班日期:" class="info_item">
        <div class="form_value">{{ orderInfo.flightDate }}</div>
      </el-form-item>
      <el-form-item label="主单件数:" class="info_item">
        <div class="form_value">{{ orderInfo.mainNum }}</div>
      </el-form-item>
      <el-form-item label="主单毛量:" class="info_item">
        <div class="form_value">{{ orderInfo.mainRoughWeight }}</div>
      </el-form-item>
      <el-form-item label="主单计费量:" class="info_item">
        <div class="form_value">{{ orderInfo.mainChargedWeight }}</div>
      </el-form-item>
      
      <el-form-item label="品名数量:" class="info_item" v-show="mainTypeShow">
        <div class="form_value">{{ orderInfo.nameNum }}</div>
      </el-form-item>
      <el-form-item label="报关代理:" class="info_item" v-show="mainTypeShow">
        <div class="form_value">{{ orderInfo.customsBroker }}</div>
      </el-form-item>
      <el-form-item label="生产销售单位:" class="info_item" v-show="mainTypeShow">
        <div class="form_value">{{ orderInfo.productionSaleUnit }}</div>
      </el-form-item>
      <el-form-item label="报关类型:" class="info_item" v-show="mainTypeShow">
        <div class="form_value">{{ orderInfo.customsDeclareType == 1?'贸易代理': (orderInfo.customsDeclareType == 2?'报关代理':'企业自理') }}</div>
      </el-form-item>
      <el-form-item label="监管方式:" class="info_item" v-show="mainTypeShow">
        <div class="form_value">{{ orderInfo.supervisionMethod }}</div>
      </el-form-item>

      <el-form-item label="始发港:" class="info_item" v-show="businessType1">
          <div class="form_value">{{ orderInfo.departurePort }}</div>
      </el-form-item>
      <el-form-item label="境内送货:" class="info_item" v-show="businessType1">
        <div class="form_value">{{ orderInfo.domesticDelivery == 1?'是':'否' }}</div>
      </el-form-item>


      <el-form-item label="目的港:" class="info_item" v-show="businessType2 | businessType3">
        <div class="form_value">{{ orderInfo.destinationPort }}</div>
      </el-form-item>


      <el-form-item label="转关单号:" class="info_item" v-show="businessType3">
        <div class="form_value">{{ orderInfo.transitNo }}</div>
      </el-form-item>
      <el-form-item label="目的港:" class="info_item" v-show="businessType3">
        <div class="form_value">{{ orderInfo.destinationPort }}</div>
      </el-form-item>
      <el-form-item label="境内监管中转:" class="info_item" v-show="businessType3">
        <div class="form_value">{{ orderInfo.domesticSuperviseTransit == 1?'是':'否' }}</div>
      </el-form-item>

      <el-form-item label="货值:" class="info_item">
        <div class="form_value">{{ orderInfo.goodsValue }}</div>
      </el-form-item>
      <el-form-item label="币种:" class="info_item">
        <div class="form_value">{{ orderInfo.currency }}</div>
      </el-form-item>
      <el-form-item label="发件人:" class="info_item">
        <div class="form_value">{{ orderInfo.addresser }}</div>
      </el-form-item>
      <el-form-item label="收件人:" class="info_item">
        <div class="form_value">{{ orderInfo.addressor }}</div>
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
// import {getOrderInfo} from "@/api/import_bussiness";

export default {

  props: ["orderInfo"],
  name: "clearance_goods",
  
  data(){
    return{
      dialogVisible: false,
      activeNames:"1",
      clearanceData:{
        service_shop: "",
        clearance_order:""
      },
      mainTypeShow:false,
      businessType1:false,
      businessType2:false,
      businessType3:false
    }
  },
  methods:{
    handleClose(){
      this.dialogVisible = false
    }
  },
  created() {
    // let data = {
    //   mainNo:this.mainNo,
    //   submenuNo:this.submenuNo
    // }
    // getOrderInfo(data).then(res=>{
    //     this.orderInfo = res.data
    //   })
  },
  mounted() {},
  watch:{
    orderInfo(val){
    this.mainTypeShow = val.mainType === '直单'? true:false
    this.businessType1 = this.mainTypeShow && val.businessType === '统一版进口'? true:false
    this.businessType2 = this.mainTypeShow && val.businessType === '统一版出口'? true:false
    this.businessType3 = this.mainTypeShow && val.businessType === '转关'? true:false
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

  .main-type-hidden{
    display: hidden;
  }

  .main-type-show{
    display: block;
  }

</style>
