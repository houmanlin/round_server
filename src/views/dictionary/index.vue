<template>
  <div class="view_container">
    <!---------------   搜索  ----------------->
    <search />

    <!-----------  用户的增删改查按钮  ---------->
    <operatorGroup @onAdd="addUser" @onEdit="editDictionary"/>


    <!------------- 数据表格  --------------->
    <components_table :table-header="table_header"/>
    <el-pagination
        class="pagination"
        :pager-count="20"
        layout="prev, pager, next"
        :total="1000"
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
import {DICTIONARY_TABLE} from "@/config/tableData";
export default {
  components:{ search, components_table, operatorGroup, reset_pass_dialog },
  data() {
    return {
      table_header: DICTIONARY_TABLE,      //表格表头信息
    }
  },


  methods: {

    /***
     * 提交重置
     */
    submitReset(){
      debugger
    },
    /**
     * 添加用户
     */
    addUser(){
      this.$router.push({path:"add_dictionary"})
    },
    editDictionary: function () {
      this.$router.push({path: "add_dictionary", query: {id: 1}})
    },
    checkPage(){

    }
  }
}
</script>

