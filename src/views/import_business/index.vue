<template>
  <div class="view_container">
    <!---------------   搜索  ----------------->
    <search />

    <!-----------  用户的增删改查按钮  ---------->
    <operatorGroup @onOperator="operator"/>


    <!------------- 数据表格  --------------->
    <components_table :table-header="table_header" :house_bill_header="house_bill_table_header" @onTableOperator="tableOperatorGroup" @onOperator="tableOperator"/>
    <el-pagination
        class="pagination"
        :pagerCount="21"
        layout="prev, pager, next"
        :total="1000"
        @current-change="checkPage"
    >
    </el-pagination>

    <!--  各种对话框  -->

    <clearanceGoods ref="clearanceGoods"/>
    <inspect ref="inspect"/>
    <returnSale ref="returnSale"/>
    <returnSaleSucc ref="returnSaleSucc"/>
    <returnWorkhouse ref="returnWorkhouse"/>
    <greenLight ref="greenLight"/>
    <domesticDeliveryGoods ref="domesticDeliveryGoods"/>
    <domesticDelivery ref="domesticDelivery"/>
    <submitCarInfo ref="submitCarInfo"/>
    <submitCustomsTransit ref="submitCustomsTransit"/>
    <orderInfoDialog ref="orderInfoDialog" :orderInfo="orderInfo"/>
    <orderMaterialDialog ref="orderMaterialDialog" :orderInfo="orderInfo"/>
  </div>
</template>

<script>
import search from "./components/searchComponent";
import operatorGroup from "./components/operatorButtonGroup";
import components_table from "./components/componentsTable";
import {HOSE_BILL_TABLE, IMPORT_BUSINESS_TABLE} from "@/config/tableData";
import clearanceGoods from "@/views/import_business/submit_dialog/clearance_goods";
import inspect from "@/views/import_business/submit_dialog/inspect";
import returnSale from "@/views/import_business/submit_dialog/return_sale";
import returnSaleSucc from "@/views/import_business/submit_dialog/return_sale_succ";
import returnWorkhouse from "@/views/import_business/submit_dialog/return_workhouse";
import greenLight from "@/views/import_business/submit_dialog/green_light";
import domesticDeliveryGoods from "@/views/import_business/submit_dialog/domestic_delivery_goods";
import domesticDelivery from "@/views/import_business/submit_dialog/domestic_delivery";
import submitCarInfo from "@/views/import_business/submit_dialog/submit_car_info";
import submitCustomsTransit from "@/views/import_business/submit_dialog/submit_customs_transit";
import orderInfoDialog from "@/views/import_business/components/orderInfoDialog";
import orderMaterialDialog from "@/views/import_business/components/orderMaterialDialog";
export default {
  components:{ search,
    components_table,
    operatorGroup,
    clearanceGoods,
    inspect,
    returnSale,
    returnSaleSucc,
    returnWorkhouse,
    greenLight,
    domesticDelivery,
    submitCarInfo,
    submitCustomsTransit,
    domesticDeliveryGoods,
    orderInfoDialog,
    orderMaterialDialog
  },
  data() {
    return {
      orderInfo: {},
      table_header: IMPORT_BUSINESS_TABLE,      //表格表头信息
      house_bill_table_header: HOSE_BILL_TABLE,      //表格表头信息
    }
  },


  methods: {

    /***
     * 提交重置
     */
    tableOperator(row, operator_key){
      this.orderInfo = row
      this.$refs["orderInfoDialog"].dialogVisible = true
    },
    /**
     * 添加用户
     */
    operator(operator_key){
      if(operator_key == 'add'){
        this.$router.push("add_import_business")
        return
      }
      this.$refs[operator_key].dialogVisible = true
    },
    tableOperatorGroup(operator){

      if (operator.operator_key == '查看'){
        this.$refs["orderMaterialDialog"].dialogVisible = true
      }

    },
    checkPage(){

    }

  }
}
</script>

