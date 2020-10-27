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
            :http-request="handlePreview1"
            :on-remove="removeData1"
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
            :http-request="handlePreview"
            :on-remove="removeData"
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
  props: ["mainNo","submenuNo"],
  
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
    removeData(file , fileList){
      for (let item in this.clearanceData.file1){
        if(this.clearanceData.file1[item].uid == file.uid){

          delete this.clearanceData.file1[item]
          return
        }
      }
    },
    removeData1(file , fileList){
      for (let item in this.clearanceData.file2){
        if(this.clearanceData.file2[item].uid == file.uid){

          delete this.clearanceData.file2[item]
          return
        }
      }
    },
   handlePreview(file){

      this.clearanceData.file1.push(file.file)
    },
   handlePreview1(file){

      this.clearanceData.file2.push(file.file)
    },
    submitForm(){
      let data = new FormData()



      data.append("mainNo", this.mainNo)
      data.append("submenuNo", this.submenuNo)
      data.append("cancelStocksRemark", this.clearanceData.mark)
      data.append("nodeType", 6)
      let refundOrderFileNames = ""
      this.clearanceData.file1.forEach((file,index) => {
        data.append("file", file, file.name)
        refundOrderFileNames += this.clearanceData.file1.length != index + 1 ? `${file.name},` : `${file.name}`

      })
      let truckLoadingPictureFileNames = "";
      this.clearanceData.file2.forEach((file,index) => {

        data.append("file", file, file.name)
        truckLoadingPictureFileNames += this.clearanceData.file2.length != index + 1 ? `${file.name},` : `${file.name}`

      })
      data.append("truckLoadingPictureFileNames", truckLoadingPictureFileNames)
      data.append("refundOrderFileNames", refundOrderFileNames)

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
