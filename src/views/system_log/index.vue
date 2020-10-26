<template>
  <div class="view_container">
    <search @getSelectData="getSelectData"/>
    <components_table :tableHeader="tableHeader" :table-data="tableData"/>
    <el-pagination
      class="pagination"
      :pagerCount="21"
      :current-page="page_config.current"
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
            1:"提交报关",
            2:"提交查验",
            3:"查验操作",
            4:"提交放行",
            5:"放行出库",
            6:"提交转关",
            7:"转关操作",
            8:"提货操作",
            9:"提交退单",
            10:"退库完成",
            11:"删除主单",
            12:"删除分单"
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
      this.getData()
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
