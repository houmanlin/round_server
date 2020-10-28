<template>
  <div class="view_container">
    <!---------------   搜索  ----------------->
    <search @onFiledData="getFiledData" @onOperator="exportExcel"/>

    <!-----------  用户的增删改查按钮  ---------->
    <operatorGroup/>


    <!------------- 数据表格  --------------->
    <components_table :table-header="table_header" :table-data="table_data" :upload_url="upload_url" @onOperator="operatorTable"/>

    <el-pagination
        class="pagination"
        :pagerCount="21"
        layout="prev, pager, next"
        :total="page_config.total"
        :current-page="page_config.current"
        @current-change="checkPage"
    >
    </el-pagination>
  </div>
</template>

<script>
import search from "./components/searchComponent";
import operatorGroup from "./components/operatorButtonGroup";
import components_table from "@/components/Table/tableComponents";
import reset_pass_dialog from "@/views/user_manage/components/resetPassDialog";
import {BUSINESS_BILLING_TABLE} from "@/config/tableData";
import {exportClearanceGoods, getClearanceGoods} from "@/api/clearance_goods";
import {getPages} from "@/utils/utils";
export default {
  components:{ search, components_table, operatorGroup, reset_pass_dialog },
  data() {
    return {
      table_header      : BUSINESS_BILLING_TABLE,      //表格表头信息
      dialog_status     : false,                       //提示面板状态
      page_config       : {},                          //分页配置
      table_data        : [],                          //表格数据
      submenuNo         : "",                          //分单号
      customsDate       : "",
      mainNo            : "",
      upload_url        : `${process.env.VUE_APP_URL}/busUploadFile/uploadFileInfo`
    }
  },

  created() {
    this.page_config = getPages()
    this.getData()
  },
  methods: {
    getData(){
      let data = {
        limit         : this.page_config.limit,
        page          : this.page_config.current,
        mainNo        : this.mainNo,
        submenuNo     : this.submenuNo,
        customsDate   : this.customsDate,
      }
      getClearanceGoods(data).then(res=>{
        this.page_config = getPages(res.data)
        // let { records } = res.data
        this.table_data = res.data.records
      })
    },
    /**
     * 分页处理
     * @param e
     */
    checkPage(e){
      this.page_config.current = e
      this.getData()
    },
    operatorTable(operator){
      let { table_data ,operator_key } = operator

      if (operator_key == "下载文件"){
        let download = `${process.env.VUE_APP_URL}/busUploadFile/downloadFile?fileType=0&mainNo=${table_data.mainNo}&nodeType=10`
        if(table_data.submenuNo){
          download += `&submenuNo=${table_data.submenuNo}`
        }
        window.open(download)
      }
    },
    /**
     * 获取过滤参数
     * @param data    过滤参数
     */
    getFiledData(data){
      this.mainNo               = data.mainNo;
      this.submenuNo            = data.submenuNo;
      this.customsDate          = data.customsDate;
      this.page_config.current  = 1
      this.getData()
    },
    /**
     * 导出Excel
     */
    exportExcel(){
      window.open( `${process.env.VUE_APP_URL}/busBilling/export?flag=1`)
    },
  }
}
</script>

