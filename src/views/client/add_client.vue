<template>
  <el-form ref="form" :model="codeData" label-width="80px" class="view_container">
    <el-form-item label="用户名">
      <el-input v-model="codeData.CODE_DIV"></el-input>
    </el-form-item>

    <el-form-item label="是否使用">
      <el-switch v-model="codeData.is_use">
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
  name: "add_dictionary",
  data(){
    return{
      id: 0,
      codeData:{
        CODE_DIV:     "",
        CODE_CD:      "",
        CODE_name:    "",
        tagmeme_num:  "",
        is_use:       true,
      }
    }
  },
  created() {
    if(this.$route.query.id){
      this.id = this.$route.query.id
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
