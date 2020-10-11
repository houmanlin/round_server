<template>
  <div class="view_container">
    <!---------------   搜索  ----------------->
    <search/>

    <!-----------  用户的增删改查按钮  ---------->
    <operatorGroup @onAddData="addUser" @onEditData="editUser" @onRemoveData="removeUser"/>


    <!------------- 数据表格  --------------->
    <components_table :table-header="table_header" :table-data="table_data" @onOperator="tableOperator" @onSelectData="getSelectData"/>

    <el-pagination
        class="pagination"
        :pagerCount="21"
        :current-page.sync="page_config.current"
        layout="prev, pager, next"
        :total="page_config.total"
        @current-change="checkPage"
    >
    </el-pagination>

    <!----------------  重置密码提示面板 ------------>
    <reset_pass_dialog ref="dialog" @onResetPassword="submitReset"/>
    <remove_user_dialog ref="remove_user_dialog" @onRemoveUser="removeUserDialog"/>
  </div>
</template>

<script>
import search from "@/views/user_manage/components/searchComponent";
import operatorGroup from "@/views/user_manage/components/operatorButtonGroup";
import components_table from "@/components/Table/tableComponents";
import reset_pass_dialog from "@/views/user_manage/components/resetPassDialog";
import remove_user_dialog from "@/views/user_manage/components/delUserDialog";
import {USER_MANAGE_TABLE} from "@/config/tableData";
import {getUserList, removeUserPass, resetUserPass, userCheckEnable} from "@/api/user";
import {getPages} from "@/utils/utils";
export default {
  components:{ search, components_table, operatorGroup, reset_pass_dialog, remove_user_dialog },
  data() {
    return {
      table_data      : [],                     // 表格数据
      table_header    : USER_MANAGE_TABLE,      // 表格表头信息
      dialog_status   : false,                  // 提示面板状态
      page_config     : {},                     // 分页配置
      getSelectList   : [],                     // 获取表格多选
      ids_str         : "",                     // 多个ID拼接结果
    }
  },
  created() {
    this.page_config = getPages();
    this.getData();
  },

  methods: {
    /**
     *  获取数据
     */
    getData(){
      let data = {
        limit:this.page_config.limit,
        page:this.page_config.current,
      }
      getUserList(data).then(res=>{
        this.page_config = getPages(res.data);
        let data_list = res.data.records;
        for (const user_data in data_list) {
          let enable_text = data_list[user_data].isEnable ? '启用' : '禁用';
          this.$set(res.data.records[user_data], 'enable_text', enable_text);
        }
        this.table_data = res.data.records;
      })
    },
    /**
     * 重置密码
     */
    resetPass(){

      this.$refs["dialog"].dialog_form_visible = !this.$refs["dialog"].dialog_form_visible
    },
    /**
     *  点击成功后
     */
    submitReset(){
      this.$message({
        message: '成功重置密码',
        type: 'success'
      });
    },
    /***
     * 提交重置
     */
    // submitReset(){
    //   debugger
    // },
    /**
     * 添加用户
     */
    addUser(){
      this.$router.push({path:"add_user"})
    },
    /**
     * 修改用户信息
     */
    editUser(){
      this.$router.push({path:"add_user", query:{id:1}})
    },
    /**
     * 切换分页
     */
    checkPage(e){
      this.page_config.page = e
    },
    /**
     * 表格操作
     * @param row               被操作的数据
     * @param operator_key      操作按钮
     */
    tableOperator(row){
      let {table_data, operator_key} = row

      if (operator_key == "重置密码"){
        let reset_data = {
          id: table_data.id
        }
        resetUserPass(reset_data).then(res=>{
          this.$message.success(res.message)
          this.getData();
        })

        return
      }


      let data = {
        ids:table_data.id.toString()  ,
        isEnable: operator_key == '启用' ? 1 : 0
      }
      userCheckEnable(data).then(res=>{
        this.$message.success(res.message)
        this.getData()
      })
    },
    /**
     * 删除用户
     */
    removeUser(){
      this.$refs["remove_user_dialog"].dialog_form_visible = !this.$refs["remove_user_dialog"].dialog_form_visible

    },
    /**
     * 表格多选
     */
    getSelectData(data){
      this.getSelectList = data
      this.ids_str = ""
      for (const dataKey in data) {
        this.ids_str += parseInt(dataKey) + 1 == data.length ? `${data[dataKey].id}` : `${data[dataKey].id},`
      }
    },
    removeUserDialog(){

      let data = {
        ids: this.ids_str.toString()
      }
      removeUserPass(data).then(res=>{
        this.$message.success(res.message)
      })
    }
  }
}
</script>

