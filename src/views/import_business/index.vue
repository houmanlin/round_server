<template>
  <div class="view_container">
    <!---------------   搜索  ----------------->
    <search @onGetFieldData="getFieldData" @exportFiles="exportFile"/>

    <!-----------  用户的增删改查按钮  ---------->
    <operatorGroup @onOperator="operator"/>


    <div class="count_container">
      退单次数：<p v-text="countData.chargebackNum"></p>
      查验次数：<p v-text="countData.checkNum"></p>
      报关次数：<p v-text="countData.customsClearanceNum"></p>
      转关：<p v-text="countData.customsTransitWeight"></p>
      企业自理次数：<p v-text="countData.enterpriseOwnNum"></p>
      进口提货：<p v-text="countData.importPickUpGoodsWeight"></p>
      出库放行次数：<p v-text="countData.outboundClearanceNum"></p>
      贸易代理次数：<p v-text="countData.tradeAgencyNum"></p>
    </div>

    
    <!------------- 数据表格  --------------->
    <components_table 
    :table-header="table_header" 
    :house_bill_header="house_bill_table_header" 
    :tableData="table_data" 
    
    @onShowOrderInfo="showOrderInfo"
    @onTableOperator="tableOperatorGroup" 
    @onOperator="tableOperator" 
    @onUploadMethod="uploadFile" 
    @onGetSelectData="getSelectData" 
    @onGetSelectMenuData="getSelectMenuData"
    @onNodeDetailOperator="getNodeDetailList"/>
    <el-pagination
        class="pagination"
        :pagerCount="21"
        :current-page="page_config.current"
        layout="prev, pager, next"
        :total="page_config.total"
        @current-change="checkPage"
    >
    </el-pagination>

    <!--  各种对话框  -->

    <clearanceGoods ref="clearanceGoods" :mainNo="orderInfo.mainNo" :submenuNo="orderInfo.submenuNo" @onUploadSuccess="uploadSuccess"/>
    <inspect ref="inspect" :mainNo="orderInfo.mainNo" :submenuNo="orderInfo.submenuNo" @onUploadSuccess="uploadSuccess"/>
    <returnSale ref="returnSale" :mainNo="orderInfo.mainNo" :submenuNo="orderInfo.submenuNo" @onUploadSuccess="uploadSuccess"/>
    <returnSaleSucc ref="returnSaleSucc" :mainNo="orderInfo.mainNo" :submenuNo="orderInfo.submenuNo" @onUploadSuccess="uploadSuccess"/>
    <returnWorkhouse ref="returnWorkhouse" :mainNo="orderInfo.mainNo" :submenuNo="orderInfo.submenuNo" @onUploadSuccess="uploadSuccess"/>
    <greenLight ref="greenLight" :mainNo="orderInfo.mainNo" :submenuNo="orderInfo.submenuNo" @onUploadSuccess="uploadSuccess"/>
    <domesticDeliveryGoods ref="domesticDeliveryGoods" :mainNo="orderInfo.mainNo" :submenuNo="orderInfo.submenuNo" @onUploadSuccess="uploadSuccess"/>
    <domesticDelivery ref="domesticDelivery" :mainNo="orderInfo.mainNo" :submenuNo="orderInfo.submenuNo" @onUploadSuccess="uploadSuccess"/>
    <greenLightReturnWorkhouse ref="greenLightReturnWorkhouse" :mainNo="orderInfo.mainNo" :submenuNo="orderInfo.submenuNo" @onUploadSuccess="uploadSuccess"/>
    <submitCarInfo ref="submitCarInfo" :mainNo="orderInfo.mainNo" :submenuNo="orderInfo.submenuNo" @onUploadSuccess="uploadSuccess"/>
    <submitCustomsTransit ref="submitCustomsTransit" :mainNo="orderInfo.mainNo" :submenuNo="orderInfo.submenuNo" @onUploadSuccess="uploadSuccess"/>
    <customsTransitOperator ref="customsTransitOperator" :mainNo="orderInfo.mainNo" :submenuNo="orderInfo.submenuNo" @onUploadSuccess="uploadSuccess"/>
    <submitReturnSale ref="submitReturnSale" :mainNo="orderInfo.mainNo" :submenuNo="orderInfo.submenuNo" @onUploadSuccess="uploadSuccess"/>
    <orderInfoDialog ref="orderInfoDialog" :orderInfo="orderInfoDetail" />
    <subOrderInfoDialog ref="subOrderInfoDialog" :orderInfo="orderInfoDetail" />
    <orderMaterialDialog v-if="orderMater" :orderInfo="orderInfo" @onCloseDialog="closeDialog"/>
    <nodeDetailListDialog ref="nodeDetailListDialog" :orderInfo="nodeOrderInfo" />
    
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
import greenLightReturnWorkhouse from "@/views/import_business/submit_dialog/greenLightReturnWorkhouse";
import submitCarInfo from "@/views/import_business/submit_dialog/submit_car_info";
import submitCustomsTransit from "@/views/import_business/submit_dialog/submit_customs_transit";
import customsTransitOperator from "@/views/import_business/submit_dialog/customsTransitOperator";
import submitReturnSale from "@/views/import_business/submit_dialog/submitReturnSale";
import orderInfoDialog from "@/views/import_business/components/orderInfoDialog";
import subOrderInfoDialog from "@/views/import_business/components/subOrderInfoDialog";
import orderMaterialDialog from "@/views/import_business/components/orderMaterialDialog";
import nodeDetailListDialog from "@/views/import_business/components/nodeDetailListDialog";
import {getCount,getOrderInfo, getImportBussiness, houseOrderDel, MainOrderDel} from "@/api/import_bussiness";
import {getPages} from "@/utils/utils";
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
    greenLightReturnWorkhouse,
    submitCarInfo,
    submitCustomsTransit,
    customsTransitOperator,
    submitReturnSale,
    domesticDeliveryGoods,
    orderInfoDialog,
    subOrderInfoDialog,
    orderMaterialDialog,
    nodeDetailListDialog
  },
  data() {
    return {
      nodeOrderInfo:{mainNo:"",submenuNo:"",nodeOperationType:""},
      countData:{},
      orderInfo: {},
      orderInfoDetail:{},
      table_header            : IMPORT_BUSINESS_TABLE,      //表格表头信息
      house_bill_table_header : HOSE_BILL_TABLE,      //表格表头信息
      page_config             : {},
      table_data              : [],
      mainNo                  : "",
      submenuNo               : "",
      flightNo                : "",
      customerIdOne           : "",                // 一级客户
      customerIdTwo           : "",               // 二级客户
      exitPort                : "",           // 离境港口
      declarationDate         : "",                  // 离境港口
      flightDateStart         : "",                  // 报关时间
      flightDateEnd           : "",                  // 报关时间
      status                  : "",        // 操作类
      orderMater              : false,
      selectTableData         : [],
      selectMenuTableData         : [],
    }
  },
  created() {
    this.page_config = getPages()
    this.getData();
  },

  methods: {

    getData(){
      let data = {
        limit                   : this.page_config.limit,
        page                    : this.page_config.current,
        mainNo                  : this.mainNo          ,
        submenuNo               : this.submenuNo       ,
        flightNo                : this.flightNo        ,
        customerIdOne           : this.customerIdOne   ,               // 一级客户,                // 一级客户
        customerIdTwo           : this.customerIdTwo   ,              // 二级客户,               // 二级客户
        exitPort                : this.exitPort        ,          // 离境港口,           // 离境港口
        declarationDate         : this.declarationDate ,                 // 离境港口,                  // 离境港口
        flightDateStart         : this.flightDateStart ,                 // 报关时间,                  // 报关时间
        flightDateEnd           : this.flightDateEnd ,                 // 报关时间,                  // 报关时间
        status                  : this.status          ,       // 操作类,        // 操作类
      }
      // let a = "?"
      // for (let i in data){
      //   a += i == 'status' ?  i+"=${this."+ i +"}" : i+"=${this."+ i +"}&"
      // }
      // console.log(a)

      getImportBussiness(data).then(res=>{
        this.page_config = getPages(res.data)
        let { records } = res.data
        this.table_data = records
        for(let item of this.table_data){
          if(item.busSubmenuListVOS && item.busSubmenuListVOS.length > 0){
            for(let subItem of item.busSubmenuListVOS){
              this.$set(subItem, "mainNo", item.mainNo)
              this.$set(subItem, "id", item.id)
            }
          }
        }
      })

      getCount().then(res=>{
        this.countData = res.data
      })
    },

    uploadSuccess(){
      this.getData();
    },

    /***
     * 查看节点详细（查验操作、放行出库）
     */
    getNodeDetailList(operator){
      console.log(operator)
      this.nodeOrderInfo = operator.table_data
      this.$set(this.nodeOrderInfo, "nodeOperationType", operator.operator_key)
      this.$refs["nodeDetailListDialog"].dialogVisible = true
    },

    /**
     * 查看订单详情
     */
    showOrderInfo(operator){
      this.orderInfo = operator.table_data
      let data = {
        mainNo:this.orderInfo.mainNo,
        submenuNo:this.orderInfo.submenuNo?this.orderInfo.submenuNo:''
      }
      getOrderInfo(data).then(res=>{
        this.orderInfoDetail = res.data
        if(this.orderInfo.submenuNo){
          this.$refs["subOrderInfoDialog"].dialogVisible = true  
        } else {
          this.$refs["orderInfoDialog"].dialogVisible = true
        }
      })
    },

    /***
     * 提交重置
     */
    tableOperator(row, operator_key){
      this.orderInfo = row[0]
      let data = {
        mainNo:this.orderInfo.mainNo,
        submenuNo:this.orderInfo.submenuNo?this.orderInfo.submenuNo:''
      }
      getOrderInfo(data).then(res=>{
        this.orderInfoDetail = res.data
        if(this.orderInfo.submenuNo){
          this.$refs["subOrderInfoDialog"].dialogVisible = true  
        } else {
          this.$refs["orderInfoDialog"].dialogVisible = true
        }
      })
      
    },
    /**
     * 添加用户
     */
    operator(operator_key){
      debugger
      let ids = ""
      let menu_ids = ""
      this.selectTableData.forEach((item, index)=>{
        ids += this.selectTableData.length != index +1 ? `${item.id},` : `${item.id}`
      })
      this.selectMenuTableData.forEach((item, index)=>{
        menu_ids += this.selectMenuTableData.length != index +1 ? `${item.id},` : `${item.id}`
      })

      if(operator_key == 'add'){
        this.$router.push("add_import_business")
        return
      }
      if(operator_key == 'mainNoRemove'){

        let data = {
          ids
        }

        MainOrderDel(data).then(res=>{
          this.$message.success("成功")
          this.getData();
        })
        return
      }
      if(operator_key == 'houseNoRemove'){
        let data = {
          ids:menu_ids
        }

        houseOrderDel(data).then(res=>{
          this.$message.success("成功")
          this.getData();
        })
        return
      }
      if(this.selectTableData.length > 1){
        this.$message.info("只能操作一条订单")
        return
      }
      if(this.selectMenuTableData.length > 1){
        this.$message.info("只能操作一条订单")
        return
      }
      if(this.selectTableData.length >= 1 && this.selectMenuTableData.length >= 1){
        this.$message.info("只能操作一条订单")
        return
      }
      if(this.selectMenuTableData.length < 1 && this.selectTableData.length < 1){
        this.$message.info("请选择要操作的数据")
        return
      }

      if(this.selectTableData.length > 0){
        this.orderInfo = this.selectTableData[0]
        console.log(this.selectTableData)
      } else {
        this.orderInfo = this.selectMenuTableData[0]
        console.log(this.selectMenuTableData)
      }
      this.$refs[operator_key].dialogVisible = true
    },
    tableOperatorGroup(operator){
      let {table_data } = operator
      if (operator.operator_key == '查看'){
        this.orderInfo = operator.table_data
        this.orderMater = true
      }

      if(operator.operator_key == "下载"){
        window.open(
            `${process.env.VUE_APP_URL}/busUploadFile/downloadFile?fileType=0&mainNo=${table_data.mainNo}&submenuNo=${table_data.submenuNo}&nodeType=0`)
      }
      if(operator.operator_key == "编辑"){
        this.$router.push(`add_import_business?id=${table_data.id}`)
      }

    },
    checkPage(e){
      this.page_config.current = e
      this.getData()
    },
    closeDialog(){
      this.orderMater = false
    },
    exportFile(){
      let ids = []
      for (let select_key in this.selectTableData){
        ids.push(this.selectTableData[select_key].id)
      }
      ids = ids.join(",")

      let export_file_params = `limit=${this.page_config.limit}&page=${this.page_config.current}&mainNo=${this.mainNo}&submenuNo=${this.submenuNo}&flightNo=${this.flightNo}&customerIdOne=${this.customerIdOne}&customerIdTwo=${this.customerIdTwo}&exitPort=${this.exitPort}&declarationDate=${this.declarationDate}&flightDateStart=${this.flightDateStart}&flightDateEnd=${this.flightDateEnd}&status=${this.status}&ids=${ids}`
      window.open(`${process.env.VUE_APP_URL}/busMain/export?${export_file_params}`)
    },
    getFieldData(data){
      this.mainNo = data.mainNo                // 主单号
      this.submenuNo = data.submenuNo                   // 分单号
      this.flightNo = data.flightNo                   // 航班号
      this.customerIdOne = data.customerIdOne                   // 一级客户
      this.customerIdTwo = data.customerIdTwo                  // 二级客户
      this.exitPort = data.exitPort                   // 离境港口
      this.declarationDate = data.declarationDate                   // 离境港口
      this.flightDateStart = data.flightDateStart                   // 报关时间
      this.flightDateEnd = data.flightDateEnd                   // 报关时间
      this.status = data.status                  // 操作类型
      this.page_config.current = 1                  // 操作类型


      this.getData();
    },
    getSelectData(data){
      this.selectTableData = data
    },
    getSelectMenuData(data){
      this.selectMenuTableData = data
    },
    uploadFile(data){

    }

  }
}
</script>

<style lang="less" scoped>
  .count_container{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 14px;
    width: 100%;
    color: #909399;

    p {
      margin-right: 25px;
    }
  }

</style>