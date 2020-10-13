<template>
  <el-dialog
      :visible.sync="dialogVisible"
      width="35%"
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
      <el-form-item label="装车照片(附件)">
        <el-upload
            class="upload-demo"
            ref="upload1"
            drag
            :on-progress="handlePreview1"
            action="https://jsonplaceholder.typicode.com/posts/"
            >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </el-form-item>
      <el-form-item label="退款单(附件)">
        <el-upload
            class="upload-demo"
            ref="upload"
            drag
            :on-progress="handlePreview"
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
        file1:[],
        file2:[]
      }
    }
  },
  methods:{
   handlePreview(event, file, fileList){

      this.clearanceData.file1 = fileList
    },
   handlePreview1(event, file, fileList){

      this.clearanceData.file2 = fileList
    },
    submitForm(){
      let data = new FormData()



      data.append("mainNo", this.mainNo)
      data.append("cancelStocksRemark", this.clearanceData.mark)
      data.append("nodeType", 6)
      this.clearanceData.file1.forEach(file => {
        data.append("file", file.raw, "refundOrderFileNames")
      })

      this.clearanceData.file2.forEach(file => {
        data.append("file", file.raw, "truckLoadingPictureFileNames")
      })

      uploadForm(data).then(res=>{
        this.dialogVisible = false
        this.clearanceData.mark= "";
        this.clearanceData.file1=[];
        this.clearanceData.file2=[]

        this.$refs.upload.clearFiles();
        this.$refs.upload1.clearFiles();
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
