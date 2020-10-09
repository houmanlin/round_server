<template>
  <el-form ref="form" :model="userData" label-width="80px" class="view_container">
    <el-form-item label="用户名">
      <el-input v-model="userData.user_name" placeholder="请输入用户名称"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="userData.password" placeholder="请输入用户名称"></el-input>
    </el-form-item>
    <el-form-item label="真实姓名">
      <el-input v-model="userData.real_name" placeholder="请输入真实姓名"></el-input>
    </el-form-item>
    <el-form-item label="职位">
      <el-input v-model="userData.job_name" placeholder="请输入职位名称"></el-input>
    </el-form-item>
    <el-form-item label="是否可用">
      <el-switch v-model="userData.is_use">
      </el-switch>
    </el-form-item>
    <el-form-item class="create_user">
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
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
        user_name: "",
        real_name: "",
        job_name:  "",
        password:  "",
        is_use:    true,
      }
    }
  },
  created() {
    if(this.$route.query.id){

      this.$route.meta.title = "修改用户"
    }else{
      this.$route.meta.title = "添加用户"
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
