<template>
  <div id="container">
    <div class="operator_button">
      <el-button type="primary" @click="$router.push('/add_venue')">
          <i class="el-icon-plus"/> 添加场馆
      </el-button>
    </div>
    <!--  查询数据  -->
<!--    <select_operator_group @onReloadData="getParams"/>-->


    <!--  数据表格  -->
    <tableComponents @onPageHandle="pageChangeHandle"
                     @onOperatorHandle="operatorHandle"
                     :table-header-model="tableHeader"
                     :table-data-model="tableData"
                     :page-config-model="pageConfig"/>

  </div>
</template>

<script>
import select_operator_group from "./components/select_operator_group";
import tableComponents from "@/components/Table/tableComponents";
import {TableHeader} from "@/config/venus/config";
import {DelVenue, SelectVenue} from "@/api/venue";
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
    this.getData()
  },
  methods:{
    getData(){
      let params = this.search_data

      SelectVenue(params).then(res=>{
        for (const result in res.data) {
          res.data[result].venue_status = res.data[result].venue_status == '1' ? "正常" : "删除"
        }
        this.tableData = res.data
      })
    },
    getParams(data){
      this.search_data = data
      this.getData()
    },
    pageChangeHandle(data){
      this.pageConfig = data
      this.getData()
    },
    operatorHandle: function (data) {

      let path;
      if (data.operatorKey === "delete") {
        this.$confirm('是否确认删除该店铺','确认删除' ,{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          callback: action => {
            if (action === 'confirm') {
              let params = {
                id: data.data.id
              }
              DelVenue(params).then(res=>{

                this.getData()
              })
            }
          }
        })
        return
      } else if (data.operatorKey === "mobile") {

        path = "";
      } else {
        path = "/add_venue";
      }
      this.$router.push({ path, query: {id: data.data.id} })
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
