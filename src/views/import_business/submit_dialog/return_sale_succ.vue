<template>
  <el-dialog
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose">
    <el-form ref="form" :model="clearanceData" label-width="60px">
      <el-form-item label="备注">
        <el-input
            type="textarea"
            placeholder="请输入备注"
            v-model="clearanceData.mark"
            maxlength="30"
            show-word-limit
        />
      </el-form-item>
      <el-form-item label="上传退单完毕单据(附件)">
        <el-upload
            class="upload-demo"
            :on-progress="handlePreview"
            drag
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
  props:["mainNo"],
  name: "clearance_goods",
  data(){
    return{
      dialogVisible: false,
      clearanceData:{
        mark: "",
        file:[]
      }
    }
  },
  methods:{
   handlePreview(event, file, fileList){

      this.clearanceData.file1 = fileList
    },
    submitForm(){
      let data = new FormData()



      data.append("mainNo", this.mainNo)
      data.append("chargebackedRemark", this.clearanceData.mark)
      data.append("nodeType", 5)
      this.clearanceData.file.forEach(file => {
        data.append("file", file.raw, "chargebackedRemark")
      })

      uploadForm(data).then(res=>{
        this.dialogVisible = false
        this.clearanceData.mark= "";
        this.clearanceData.file=[]

        this.$emit("onUploadSuccess")
      })
    },
    handleClose(){
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped>

</style>
