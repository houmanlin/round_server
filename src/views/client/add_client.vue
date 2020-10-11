<template>
  <el-form ref="form" :model="codeData" label-width="80px" class="view_container">
    <el-form-item label="用户名">
      <el-input v-model="codeData.username"></el-input>
    </el-form-item>

    <el-form-item label="是否使用">
      <el-switch v-model="codeData.isEnable">
      </el-switch>
    </el-form-item>
    <el-form-item class="create_user">
      <el-button type="primary" @click="onSubmit">{{ id > 0 ? '修改' : '立即创建' }}</el-button>
      <el-button @click="$router.back()">返回</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {saveCustomer, updateCustomerInfo} from "@/api/customer";

export default {
  name: "add_dictionary",
  data(){
    return{
      id: 0,
      codeData:{
        username        : "",
        isEnable        : true,
      }
    }
  },
  created() {
    if(this.$route.query.id){
      let {id, username, isEnable} = this.$route.query
      this.id = id
      this.codeData.username = username;
      this.codeData.isEnable = isEnable;
      this.$route.meta.title = "修改客户"
    }else{
      this.$route.meta.title = "添加客户"
    }
  },
  methods:{
    /**
     * 创建提交
     */
    onSubmit(e){
      this.codeData.isEnable = this.codeData.isEnable ? 1 : 0;
      if (this.id > 0){
        this.codeData.id = this.id
        updateCustomerInfo(this.codeData).then(res=>{
          this.$message.success(res.message)
          this.$router.back()
        })
      }else{
        saveCustomer(this.codeData).then(res=>{
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
