<template>
  <el-form ref="form" :model="userData" label-width="80px" class="view_container">
    <el-form-item label="用户名">
      <el-input v-model="userData.username" placeholder="请输入用户名称"></el-input>
    </el-form-item>

    <el-form-item label="真实姓名">
      <el-input v-model="userData.realName" placeholder="请输入真实姓名"></el-input>
    </el-form-item>
    <el-form-item label="职位">
      <el-input v-model="userData.position" placeholder="请输入职位名称"></el-input>
    </el-form-item>
    <el-form-item label="是否可用">
      <el-switch v-model="userData.isEnable">
      </el-switch>
    </el-form-item>
    <el-form-item class="create_user">
      <el-button type="primary" @click="onSubmit">{{ userData.id > 0 ? '修改' : '立即创建' }}</el-button>
      <el-button @click="$router.back()">返回</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {getInfoById, registerUser, updateInfo} from "@/api/user";

export default {
  name: "add",
  data(){
    return{

      userData:{
        id           : 0,
        realName     : "",
        username     : "",
        position     : "",
        password     : "qwerty",
        isEnable     : true,
      }
    }
  },
  created() {
    if(this.$route.query.id){
      this.userData.id = this.$route.query.id
      this.getUserInfo()
      this.$route.meta.title = "修改用户"
    }else{
      this.$route.meta.title = "添加用户"
    }
  },
  methods:{
    getUserInfo(){
      let data = {
        id: this.userData.id
      }
      getInfoById(data).then(res=>{
        this.userData.isEnable = res.data.isEnable ? true : false
        this.userData.position = res.data.position
        this.userData.realName = res.data.realName
        this.userData.username = res.data.username
      })
    },
    /**
     * 创建提交
     */
    onSubmit(e){
      this.userData.isEnable = this.userData.isEnable ? 1 : 0;
      if (this.userData.id > 0){
        updateInfo(this.userData).then(res=>{
          this.$message.success(res.message)
          this.$router.back()
        })
      }else{
        registerUser(this.userData).then(res=>{
          this.$message.success(res.message)
          this.$router.back()
        })
      }


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
