<template>
  <el-dialog title="重置密码" :visible.sync="dialog_form_visible">
    <span>是否删除当前用户</span>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialog_form_visible = false">取 消</el-button>
      <el-button type="primary" @click="removeUser">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "resetPassDialog",
  data(){
    return{
      reset_pass:{
        pass:"",
        password:"",
      },
      dialog_form_visible:false
    }
  },
  methods:{
    /***
     * 传输给父级组件
     */
    removeUser(){
      this.dialog_form_visible = false
      this.$emit("onRemoveUser")
    }
  }
}
</script>

<style scoped>

</style>
