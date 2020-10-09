<template>
  <el-dialog title="重置密码" :visible.sync="dialog_form_visible">
    <el-form :model="reset_pass">
      <el-form-item label="新密码" label-width="100px">
        <el-input v-model="reset_pass.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" label-width="100px">
        <el-input v-model="reset_pass.password" autocomplete="off"></el-input>
      </el-form-item>

    </el-form>
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
      this.$emit("onResetPassword", this.reset_pass)
    }
  }
}
</script>

<style scoped>

</style>
