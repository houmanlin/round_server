<template>
  <el-form ref="form" :model="codeData" label-width="100px" class="view_container">
    <el-form-item label="CODE DIV">
      <el-input v-model="codeData.codeDiv" :disabled="id > 0"></el-input>
    </el-form-item>
    <el-form-item label="CODE CD">
      <el-input v-model="codeData.codeId" :disabled="id > 0"></el-input>
    </el-form-item>
    <el-form-item label="CODE 名称">
      <el-input v-model="codeData.codeText"></el-input>
    </el-form-item>
    <el-form-item label="顺序">
      <el-input v-model="codeData.sortOrder"></el-input>
    </el-form-item>
    <el-form-item label="是否使用">
      <el-switch v-model="codeData.enable">
      </el-switch>
    </el-form-item>
    <el-form-item class="create_user">
      <el-button type="primary" @click="onSubmit">{{ this.id > 0 ? '修改' : '立即创建' }}</el-button>
      <el-button @click="$router.back()">返回</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {addDictionary, dictionaryInfo, updateDictionary} from "@/api/dictionary";

export default {
  name: "add_dictionary",
  data(){
    return{
      id: 0,
      codeData:{
        codeDiv       : "",
        codeId        : "",
        codeText      : "",
        sortOrder     : "",
        create_user   : "",
        edit_user     : "",
        edit_time     : "",
        enable:       true,
      }
    }
  },
  created() {

    if(this.$route.query.id){
      this.id = this.$route.query.id
      this.getDataInfo()
      this.$route.meta.title = "修改字典"
    }else{
      this.$route.meta.title = "添加字典"
    }
  },
  methods:{
    getDataInfo(){
      let data = {
        id: this.id
      }
      dictionaryInfo(data).then(res=>{
        this.codeData.codeDiv    = res.data.codeDiv
        this.codeData.codeId     = res.data.codeId
        this.codeData.codeText   = res.data.codeText
        this.codeData.enable     = res.data.enable ? true : false
        this.codeData.id         = res.data.id
        this.codeData.sortOrder  = res.data.sortOrder

      })
    },
    /**
     * 创建提交
     */
    onSubmit(e){
      let data = {
        codeDiv       : this.codeData.codeDiv.toString(),
        codeId        : this.codeData.codeId.toString(),
        codeText      : this.codeData.codeText.toString(),
        sortOrder     : parseInt(this.codeData.sortOrder),
        enable        : this.codeData.enable ? 1 : 0
      }

      if(this.id > 0){
        data.id = this.id
        updateDictionary(data).then(res=>{

          this.$message.success(res.message);
          this.$router.back();
        })
      }else{
        addDictionary(data).then(res=>{
          this.$message.success(res.message);
          this.$router.back();
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
.readonly_dom{
  background: #cccccc;
}
</style>
