<template>
  <div class="view_container">
    <!---------------   搜索  ----------------->
    <search @onSelectData="getSelectData"/>

    <!-----------  用户的增删改查按钮  ---------->
    <operatorGroup @onAdd="addUser" @onEdit="editClient" @onRemove="removeClient"/>


    <!------------- 数据表格  --------------->
    <components_table :table-header="table_header" :table-data="table_data" @onOperator="tableOperator" @onSelectData="getSelectTableData"/>

    <el-pagination
        class="pagination"
        :pagerCount="21"
        layout="prev, pager, next"
        :current-page="this.page_config.current"
        :total="this.page_config.total"
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
import {CLIENT_MANAGE_TABLE} from "@/config/tableData";
import {customerCheckEnable, listCustomer, removeCustomer} from "@/api/customer";
import {getPages} from "@/utils/utils";
export default {
  components:{ search, components_table, operatorGroup, reset_pass_dialog },
  data() {
    return {
      table_header    : CLIENT_MANAGE_TABLE,      //表格表头信息
      table_data      : [],
      page_config     : {},
      selected_data   : [],
      user_name       : "",
      serial_number   : "",

    }
  },

  created() {
    this.page_config = getPages()
    this.getData()
  },

  methods: {

    getData(){
      let data = {
        limit           : this.page_config.limit,
        page            : this.page_config.current,
        username        : this.user_name,
        customerCode    : this.serial_number,
      }
      listCustomer(data).then(res=>{
        let { records } = res.data
        this.page_config = getPages(res.data)
        for (const index in records) {
          let is_enable = records[index]["isEnable"] ? '启用' : '禁用';
          this.$set(res.data.records[index], "enable_text", is_enable)
        }
        this.table_data = res.data.records


      })
    },

    /***
     * 提交重置
     */
    getSelectTableData(e){
      this.selected_data = e
    },
    /***
     *
     */
    getSelectData(data){
      this.serial_number = data.serial_number;
      this.user_name = data.user_name;
      this.page_config.current = 1
      this.getData()
    },
    /**
     * 添加用户
     */
    addUser(){
      this.$router.push({path:"add_client"})
    },
    checkPage(){

    },
    editClient(){
      if(this.selected_data.length > 1){
        this.$message.warning("只能修改一个客户")
        return
      }
      let {id, username, isEnable} = this.selected_data[0]
      this.$router.push({path:"add_client", query:{id, username, isEnable}})
    },
    tableOperator(row){
      let {table_data, operator_key} = row

      if (operator_key == "删除"){
        let data = {
          ids: table_data.id.toString()
        }
        console.log(data)
        removeCustomer(data).then(res=>{
          this.$message.success(res.message)
          this.getData()
        })
        return
      }

      let data = {
        ids:table_data.id.toString()  ,
        isEnable: operator_key == '启用' ? 1 : 0
      }
      customerCheckEnable(data).then(res=>{
        this.$message.success(res.message)
        this.getData()
      })
    },
    removeClient(){
      let ids = ""
      for (const dataKey in this.selected_data) {
        ids += parseInt(dataKey)+1 == this.selected_data.length ? `${this.selected_data[dataKey].id}` : `${this.selected_data[dataKey].id},`
      }
      let data = {
        ids
      }
      console.log(data)
      removeCustomer(data).then(res=>{
        this.$message.success(res.message)
        this.getData()
      })

    }
  }
}
</script>

