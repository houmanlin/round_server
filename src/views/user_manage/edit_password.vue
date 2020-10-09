<template>
  <el-form ref="form" :model="userData" label-width="80px" class="view_container">

    <el-form-item label="旧密码">
      <el-input v-model="userData.old_password" placeholder="请输入旧密码"></el-input>
    </el-form-item>
    <el-form-item label="新密码">
      <el-input v-model="userData.new_password" placeholder="请输入新密码"></el-input>
    </el-form-item>
    <el-form-item label="确认密码">
      <el-input v-model="userData.sure_password" placeholder="请输入确认密码"></el-input>
    </el-form-item>
    <el-form-item class="create_user">
      <el-button type="warning" @click="onSubmit">修改</el-button>
      <el-button @click="$router.back()">返回</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "add",
  data(){
    return{
      userData:{
        old_password    : "",
        new_password    : "",
        sure_password   : "",
      }
    }
  },
  methods:{
    /**
     * 创建提交
     */
    onSubmit(e){
      debugger
    }
  }
}
</script>

<style scoped>
.view_container{
  width: 60%;
  margin-top: 40px;
}
.create_user{
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 20px auto;
}
</style>
