<template>
  <div class="view_container">
    <search @getSelectData="getSelectData"/>
    <components_table :tableHeader="tableHeader" :table-data="tableData"/>
    <el-pagination
      class="pagination"
      :pagerCount="21"
      :current-page.sync="page_config.current"
      layout="prev, pager, next"
      :total="page_config.total"
      @current-change="checkPage"
    >
    </el-pagination>
  </div>
</template>

<script>


import components_table from "@/components/Table/tableComponents";
import {SYSTEM_LOG_TABLE} from "@/config/tableData";
import search from "@/views/system_log/components/searchComponent";
import {systemInfoLog} from "@/api/sys_log";
import getPageTitle from "@/utils/get-page-title";
import {getPages} from "@/utils/utils";

export default {
  name:"system_log",
  components:{components_table, search},
  data() {
    return {
      tableHeader       : SYSTEM_LOG_TABLE,
      tableData         : [],
      page_config       : {},
      operDate          : "",
      operType          : "",
      user_name         : ""
    }
  },
  created() {
    this.page_config = getPages();
    this.getData()
  },
  methods: {
    getData(){
      let data = {
        limit     : this.page_config.limit,
        page      : this.page_config.current,
        operDate  : this.operDate,
        operType  : this.operType,
        username  : this.user_name,
      }
      systemInfoLog(data).then(res=>{
        this.page_config = getPages(res.data)
        let {records} = res.data
        for (const index in records) {

          let module_Data = {
            0: "录入业务数据",
            1: "入库查验",
            2: "提交报关",
            3: "提交查验",
            4: "退单",
            5: "退单完毕",
            6: "退库",
            7: "提交放行",
            8: "提交提货车辆信息",
            9: "提货交接",
            10: "货物送达",
            11: "境内送货",
            12: "提交转关",
            13: "转关",
            14: "转关完毕",
            15: "转关异常"
          }
          let operator_keys = res.data.records[index].operType

          this.$set(res.data.records[index], "opertype_text", module_Data[operator_keys])
        }
        this.tableData = res.data.records
      })
    },
    /**
     * 切换页码
     * @param e   页码数
     */
    checkPage(e){
      this.page_config.current = e
    },
    getSelectData(data){
      this.username = data.operator
      this.operDate = data.operator_date
      this.operType = data.operator_type
      this.getData()
    }
  }
}
</script>
