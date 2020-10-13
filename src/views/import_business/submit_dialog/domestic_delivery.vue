<template>
  <el-dialog
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
    <el-form ref="form" :model="clearanceData" label-width="120px" class="form_list">

      <el-form-item label="备注">
        <el-input
            type="textarea"
            placeholder="请输入备注"
            v-model="clearanceData.mark"
            maxlength="30"
            show-word-limit
        />
      </el-form-item>
      <el-form-item label="车辆照片(附件)">
        <el-upload
            :on-progress="handlePreview"
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </el-form-item>
      <el-form-item label="货物照片(附件)">
        <el-upload
            :on-progress="handlePreview1"
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </el-form-item>
      <el-form-item label="现场照片(附件)">
        <el-upload
            :on-progress="handlePreview2"
            class="upload-demo"
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
        license_plate_number:"",
        delivery_expense:"",
        delivery_time: "",
        file1:[],
        file2:[],
        file3:[]
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
   handlePreview2(event, file, fileList){

      this.clearanceData.file3 = fileList
    },
    submitForm(){
      let data = new FormData()



      data.append("mainNo", this.mainNo)
      data.append("goodsDeliveredRemark", this.clearanceData.mark)
      data.append("nodeType", 10)
      this.clearanceData.file1.forEach(file => {
        data.append("file", file.raw, "vehiclePictureFileNames")
      })
      this.clearanceData.file2.forEach(file => {
        data.append("file", file.raw, "goodsPictureFileNames")
      })
      this.clearanceData.file3.forEach(file => {
        data.append("file", file.raw, "scenePictureFileNames")
      })

      uploadForm(data).then(res=>{
        this.clearanceData.dialogVisible = false
        this.clearanceData.mark= "";
        this.clearanceData.license_plate_number="";
        this.clearanceData.delivery_expense="";
        this.clearanceData.delivery_time= "";
        this.clearanceData.file1=[];
        this.clearanceData.file2=[];
        this.clearanceData.file3=[]
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
  .form_list{
    width: 100%;
    height: 300px;
    overflow-y: auto;
  }
</style>
