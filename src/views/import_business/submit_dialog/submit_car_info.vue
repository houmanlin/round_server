<template>
  <el-dialog
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
    <el-form ref="form" :model="clearanceData" label-width="120px" class="form_list">
      <el-form-item label="车辆型号">
        <el-input v-model="clearanceData.car_type" placeholder="请输入车辆类型"></el-input>
      </el-form-item>
      <el-form-item label="车牌号">
        <el-input v-model="clearanceData.license_plate_number" placeholder="请输入车牌号"/>
      </el-form-item>
      <el-form-item label="预计到达时间">
        <el-date-picker
            v-model="clearanceData.delivery_time"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm"
            placeholder="选择日期时间">
        </el-date-picker>
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
      <el-form-item label="车辆照片(附件)">
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
      <el-form-item label="其它才材料(附件)">
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
        car_type: "",
        license_plate_number:"",
        delivery_expense:"",
        delivery_time: "",
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
      data.append("pickUpCarModelCar", this.clearanceData.car_type)
      data.append("pickUpCarLPN", this.clearanceData.license_plate_number)
      data.append("pickUpCarETA", this.clearanceData.delivery_time)
      data.append("pickUpCarRemark", this.clearanceData.mark)
      data.append("nodeType", 8)
      this.clearanceData.file1.forEach(file => {
        data.append("file", file.raw, "vehiclePictureFileNames")
      })
      this.clearanceData.file2.forEach(file => {
        data.append("file", file.raw, "ordinaryFileNames")
      })

      uploadForm(data).then(res=>{
        this.dialogVisible = false
        this.clearanceData.car_type= "";
        this.clearanceData.license_plate_number="";
        this.clearanceData.delivery_expense="";
        this.clearanceData.delivery_time= "";
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
  .form_list{
    width: 100%;
    height: 300px;
    overflow-y: auto;
  }
</style>
