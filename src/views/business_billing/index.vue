<template>
  <div class="view_container">
    <!---------------   搜索  ----------------->
    <search />

    <!-----------  用户的增删改查按钮  ---------->
    <operatorGroup @onReset="resetPass" @onAdd="addUser"/>


    <!------------- 数据表格  --------------->
    <components_table :table-header="table_header"/>

    <el-pagination
        class="pagination"
        :pagerCount="21"
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
import {BUSINESS_BILLING_TABLE} from "@/config/tableData";
import {getClearanceGoods} from "@/api/clearance_goods";
import {getPages} from "@/utils/utils";
export default {
  components:{ search, components_table, operatorGroup, reset_pass_dialog },
  data() {
    return {
      table_header      : BUSINESS_BILLING_TABLE,      //表格表头信息
      dialog_status     : false,                       //提示面板状态
      page_config       : {},                          //分页配置
    }
  },

  created() {
    this.page_config = getPages()
    this.getData()
  },
  methods: {
    getData(){
      let data = {
        limit   : this.page_config.limit,
        page    : this.page_config.current,

      }
      getClearanceGoods(data).then(res=>{
        this.page_config = getPages(res.data)
        debugger
      })
    },
    /**
     * 重置密码
     */
    resetPass(){

      this.$refs["dialog"].dialog_form_visible = !this.$refs["dialog"].dialog_form_visible
    },
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
      this.$router.push({path:"add_user"})
    },
    checkPage(){

    }
  }
}
</script>

