<template>
  <el-dialog title="重置密码" :visible.sync="dialog_form_visible">
    <span>是否重置当前密码</span>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialog_form_visible = false">取 消</el-button>
      <el-button type="primary" @click="resetPassword">确 定</el-button>
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
    resetPassword(){
      this.dialog_form_visible = false
      this.$emit("onResetPassword")
    }
  }
}
</script>

<style scoped>

</style>
