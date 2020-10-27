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
            :http-request="handlePreview"
            :on-remove="removeData"
            class="upload-demo"
            ref="upload2"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </el-form-item>
      <el-form-item label="货物照片(附件)">
        <el-upload
            :http-request="handlePreview1"
            :on-remove="removeData1"
            ref="upload1"
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
            :http-request="handlePreview2"
            :on-remove="removeData"
            class="upload-demo"
            ref="upload"
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
  props: ["mainNo","submenuNo"],
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
    removeData2(file , fileList){
      for (let item in this.clearanceData.file3){
        if(this.clearanceData.file3[item].uid == file.uid){

          delete this.clearanceData.file3[item]
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
   handlePreview2(file){

      this.clearanceData.file3.push(file.file)
    },
    submitForm(){
      let data = new FormData()



      data.append("mainNo", this.mainNo)
      data.append("submenuNo", this.submenuNo)
      data.append("goodsDeliveredRemark", this.clearanceData.mark)
      data.append("nodeType", 10)
      let vehiclePictureFileNames = ""
      this.clearanceData.file1.forEach((file, index) => {
        data.append("file", file, file.name)
        vehiclePictureFileNames += this.clearanceData.file1.length == index + 1 ? `${file.name}` : `${file.name},`

      })
      let goodsPictureFileNames = ""
      this.clearanceData.file2.forEach((file, index) => {
        data.append("file", file, file.name)
        goodsPictureFileNames += this.clearanceData.file2.length == index + 1 ? `${file.name}` : `${file.name},`

      })

      let scenePictureFileNames = ""
      this.clearanceData.file3.forEach((file, index) => {
        data.append("file", file, file.name)
        scenePictureFileNames += this.clearanceData.file3.length == index + 1 ? `${file.name}` : `${file.name},`

      })
      data.append("vehiclePictureFileNames", vehiclePictureFileNames)
      data.append("goodsPictureFileNames", goodsPictureFileNames)
      data.append("scenePictureFileNames", scenePictureFileNames)


      uploadForm(data).then(res=>{
        this.dialogVisible = false
        this.clearanceData.mark= "";
        this.clearanceData.license_plate_number="";
        this.clearanceData.delivery_expense="";
        this.clearanceData.delivery_time= "";
        this.clearanceData.file1=[];
        this.clearanceData.file2=[];
        this.clearanceData.file3=[];
        this.$refs.upload.clearFiles()
        this.$refs.upload1.clearFiles()
        this.$refs.upload2.clearFiles()

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
