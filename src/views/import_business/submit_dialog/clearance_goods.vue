<template>
  <el-dialog
      :visible.sync="dialogVisible"
      width="35%"
      :before-close="handleClose">
    <el-form ref="form" :model="clearanceData" label-width="100px">
      <el-form-item label="报关服务商">
        <el-input v-model="clearanceData.service_shop" placeholder="请输入报关服务商"></el-input>
      </el-form-item>
      <el-form-item label="报关单号">
        <el-input v-model="clearanceData.clearance_order" placeholder="请输入报关单号"/>
      </el-form-item>
      <el-form-item label="备注">
        <el-input
            type="textarea"
            placeholder="请输入备注"
            v-model="clearanceData.mark"
            maxlength="30"
            show-word-limit
            />
      </el-form-item>
      <el-form-item label="上传最终版报关材料(附件)">
        <el-upload
            class="upload-demo"
            drag
            :on-change="handlePreview"
            action="https://jsonplaceholder.typicode.com/posts/"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitForm">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
import {uploadForm} from "@/api/submit_form";

export default {
  props: ["mainNo"],
  name: "clearance_goods",
  data(){
    return{
      dialogVisible: false,
      clearanceData:{
        service_shop: "",
        clearance_order:"",
        file:[]
      }
    }
  },
  methods:{
    handlePreview(file){

      this.clearanceData.file[0] = file.raw
    },
    handleClose(){
      this.dialogVisible = false
    },
    submitForm(){
      let data = new FormData()



      data.append("mainNo", this.mainNo)
      data.append("customsServiceProvider", this.clearanceData.service_shop)
      data.append("customsNo", this.clearanceData.clearance_order)
      data.append("nodeType", 2)
      this.clearanceData.file.forEach(file => {
        data.append("file", file, file.name)
      })

      uploadForm(data).then(res=>{
        this.dialogVisible = false
        this.$emit("onUploadSuccess")
      })
    }
  }
}
</script>

<style scoped>

</style>
