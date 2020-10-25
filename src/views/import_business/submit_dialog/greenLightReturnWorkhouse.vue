<template>
  <el-dialog
      :visible.sync="dialogVisible"
      top="0"
      width="40%"
      :before-close="handleClose">
    <el-form ref="form" :model="clearanceData" label-width="120px">
      <el-form-item label="备注">
        <el-input
            type="textarea"
            placeholder="请输入备注"
            v-model="clearanceData.mark"
            maxlength="30"
            show-word-limit
        />
      </el-form-item>
      <el-form-item label="放行通知单（附件）">
        <el-upload
            class="upload-demo"
            ref="upload"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            :http-request="handlePreview"
            :on-remove="removeData"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </el-form-item>
      <el-form-item label="报关单（附件）">
        <el-upload
            class="upload-demo"
            ref="upload"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            :http-request="handlePreview1"
            :on-remove="removeData1"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </el-form-item>
      <el-form-item label="出库单（附件）">
        <el-upload
            class="upload-demo"
            ref="upload"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            :http-request="handlePreview2"
            :on-remove="removeData2"
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
        mark: "",
        file:[],
        file1:[],
        file2:[],
      }
    }
  },
  methods:{
    removeData(file , fileList){
      for (let item in this.clearanceData.file){
        if(this.clearanceData.file[item].uid == file.uid){

          delete this.clearanceData.file[item]
          return
        }
      }
    },
   handlePreview(file){

      this.clearanceData.file.push(file.file)
    },
    removeData1(file , fileList){
      for (let item in this.clearanceData.file1){
        if(this.clearanceData.file1[item].uid == file.uid){

          delete this.clearanceData.file1[item]
          return
        }
      }
    },
   handlePreview1(file){

      this.clearanceData.file1.push(file.file)
    },
    removeData2(file , fileList){
      for (let item in this.clearanceData.file2){
        if(this.clearanceData.file2[item].uid == file.uid){

          delete this.clearanceData.file2[item]
          return
        }
      }
    },
   handlePreview2(file){

      this.clearanceData.file2.push(file.file)
    },
    submitForm(){
      let data = new FormData()
      let filename = ""
      let filename1 = ""
      let filename2 = ""


      data.append("mainNo", this.mainNo)
      data.append("commitPermitRemark", this.clearanceData.mark)
      data.append("nodeType", 5)
      this.clearanceData.file.forEach((file,index) => {

        data.append("file", file, file.name)
        filename += this.clearanceData.file.length != index + 1 ? `${file.name},` : `${file.name}`
      })
      this.clearanceData.file1.forEach((file,index) => {

        data.append("file", file, file.name)
        filename1 += this.clearanceData.file1.length != index + 1 ? `${file.name},` : `${file.name}`
      })
      this.clearanceData.file2.forEach((file,index) => {

        data.append("file", file, file.name)
        filename2 += this.clearanceData.file2.length != index + 1 ? `${file.name},` : `${file.name}`
      })
      data.append("dischargedNoticeFileNames", filename)
      data.append("customsDeclarationFileNames", filename1)
      data.append("outboundDeliveryOrderFileNames", filename2)
      uploadForm(data).then(res=>{
        this.dialogVisible = false

        this.clearanceData.mark= "";
        this.clearanceData.file=[]
        this.$refs.upload.clearFiles();


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
