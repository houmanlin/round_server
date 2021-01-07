<template>
  <div id="container">
    <div class="operator_button">
      <el-button type="primary" @click="$router.push('/add_account')">
          <i class="el-icon-plus"/> 添加工作人员
      </el-button>
    </div>
    <!--  查询数据  -->
    <select_operator_group/>


    <!--  数据表格  -->
    <tableComponents :table-header-model="tableHeader"/>

  </div>
</template>

<script>
import select_operator_group from "./components/select_operator_group";
import tableComponents from "../../components/table/tableComponents";
import {TableHeader} from "../../config/account/config";

export default {
  name: "account_list",
  components:{ select_operator_group, tableComponents },
  data(){
    return{
      tableHeader: TableHeader
    }
  },
  created() {

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
