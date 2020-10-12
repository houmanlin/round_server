<template>
  <div class="view_container">
    <!---------------   搜索  ----------------->
    <search @onSelectData="getSelectData"/>

    <!-----------  用户的增删改查按钮  ---------->
    <operatorGroup @onAdd="addUser" @onEdit="editDictionary" @onRemove="removeDictionary"/>


    <!------------- 数据表格  --------------->
    <components_table :table-header="table_header" :table-data="table_data" @onSelectData="getTableData"/>
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
import search from "./components/searchComponent";
import operatorGroup from "./components/operatorButtonGroup";
import components_table from "@/components/Table/tableComponents";
import reset_pass_dialog from "@/views/user_manage/components/resetPassDialog";
import {DICTIONARY_TABLE} from "@/config/tableData";
import {deleteDictionary, getDictionary} from "@/api/dictionary";
import {getPages} from "@/utils/utils";
export default {
  components:{ search, components_table, operatorGroup, reset_pass_dialog },
  data() {
    return {
      table_header        : DICTIONARY_TABLE,      //表格表头信息
      table_data          : [],
      page_config         : {},
      field_value         : {},
      selected_data       : []
    }
  },


  created() {
    this.page_config = getPages()
    this.getData();
  },

  methods: {
    getData(){
      let data = {
        limit       : this.page_config.limit,
        page        : this.page_config.current,
        codeDiv     : this.field_value.codeDiv,
        codeText    : this.field_value.codeText,
        enable      : this.field_value.enable,
      }

      getDictionary(data).then(res=>{
        let { records } = res.data
        this.page_config = getPages(res.data)
        for (const index in records) {
          let is_enable = records[index]["enable"] ? '启用' : '禁用';
          this.$set(res.data.records[index], "enable_text", is_enable)
        }
        this.table_data = res.data.records
      })
    },
    /***
     * 提交重置
     */
    submitReset(){

    },
    /**
     *  获取表格选中数据
     */
    getTableData(data){
      this.selected_data = data
    },
    /**
     * 添加用户
     */
    addUser(){
      this.$router.push({path:"add_dictionary"})
    },
    editDictionary: function () {
      if(this.selected_data.length > 1){
        this.$message.info("只能修改一条数据")
        return
      }
      this.$router.push({path: "add_dictionary", query:{id: this.selected_data[0].id}})
    },
    checkPage(data){
      this.page_config.current = data
      this.getData()
    },
    removeDictionary(){
      if(this.selected_data.length > 1){
        this.$message.info("只能修改一条数据")
        return
      }
      let data = {
        ids: this.selected_data[0].id.toString()
      }
      deleteDictionary(data).then(res=>{
        this.getData()
        this.$message.success(res.message)
      })
    },
    getSelectData(data){
      this.field_value = data
      this.getData()
    }
  }
}
</script>

