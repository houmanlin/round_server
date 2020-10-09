<template>
  <div class="view_container">
    <search/>
    <components_table :tableHeader="tableHeader"/>
    <el-pagination
      class="pagination"
      layout="prev, pager, next"
      :total="1000"
      @current-change="checkPage"
    >
    </el-pagination>
  </div>
</template>

<script>


import components_table from "@/components/Table/tableComponents";
import {SYSTEM_LOG_TABLE} from "@/config/tableData";
import search from "@/views/system_log/components/searchComponent";

export default {
  name:"system_log",
  components:{components_table, search},
  data() {
    return {
      tableHeader: SYSTEM_LOG_TABLE
    }
  },
  created() {
  },
  methods: {
    /**
     * 切换页码
     * @param e   页码数
     */
    checkPage(e){
      debugger
    }
  }
}
</script>
