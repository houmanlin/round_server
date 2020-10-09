<template>
  <el-form ref="form" :model="codeData" label-width="100px" class="view_container">
    <el-form-item label="CODE DIV">
      <el-input v-model="codeData.CODE_DIV" :readonly="id > 0"></el-input>
    </el-form-item>
    <el-form-item label="CODE CD">
      <el-input v-model="codeData.CODE_CD" :readonly="id > 0"></el-input>
    </el-form-item>
    <el-form-item label="CODE 名称">
      <el-input v-model="codeData.CODE_name"></el-input>
    </el-form-item>
    <el-form-item label="顺序">
      <el-input v-model="codeData.tagmeme_num"></el-input>
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
        CODE_DIV      : "",
        CODE_CD       : "",
        CODE_name     : "",
        tagmeme_num   : "",
        create_user   : "",
        edit_user     : "",
        edit_time     : "",
        is_use:       true,
      }
    }
  },
  created() {

    if(this.$route.query.id){
      this.id = this.$route.query.id
      this.$route.meta.title = "修改字典"
    }else{
      this.$route.meta.title = "添加字典"
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
