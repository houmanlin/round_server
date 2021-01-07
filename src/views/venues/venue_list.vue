<template>
  <div id="container">
    <div class="operator_button">
      <el-button type="primary" @click="$router.push('/add_account')">
          <i class="el-icon-plus"/> 添加工作人员
      </el-button>
    </div>
    <!--  查询数据  -->
    <select_operator_group @onReloadData="getParams"/>


    <!--  数据表格  -->
    <tableComponents @onPageHandle="pageChangeHandle"
                     :table-header-model="tableHeader"
                     :table-data-model="tableData"
                     :page-config-model="pageConfig"/>

  </div>
</template>

<script>
import select_operator_group from "./components/select_operator_group";
import tableComponents from "@/components/Table/tableComponents";
import {TableHeader} from "@/config/account/config";
import {GetAccount} from "@/api/account";
import {getPages} from "@/utils/utils";

export default {
  name: "account_list",
  components:{ select_operator_group, tableComponents },
  data(){
    return{
      tableHeader         : TableHeader,       // 表头
      tableData           : [],                // 表格数据,
      pageConfig          : {},
      search_data: {
        venue             : [],                 // 选择场馆
        identity          : [],                 // 身份
        status            : "",                 // 状态
        works_key         : "",                 // 输入查询
      }
    }
  },
  created() {
    this.pageConfig = getPages()
    this.getData()
  },
  methods:{
    getData(){
      let params = this.search_data
      params["current_page"]  = this.pageConfig.current
      params["page_size"]     = this.pageConfig.limit
      GetAccount(params).then(res=>{

        this.tableData = res.data.data
        this.pageConfig = getPages(res.data)
      })
    },
    getParams(data){
      this.search_data = data
      this.getData()
    },
    pageChangeHandle(data){
      this.pageConfig = data
      this.getData()
    }
  }
}
</script>

<style scoped>
  .operator_button{
    width: 100%;
    display: flex;
    justify-content: flex-end!important;
    margin-bottom: 10px;
  }
</style>
