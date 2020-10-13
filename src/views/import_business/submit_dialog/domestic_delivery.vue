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
            :on-change="handlePreview"
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
            :on-change="handlePreview1"
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
            :on-change="handlePreview2"
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
        file:[]
      }
    }
  },
  methods:{
    handlePreview(file){

      this.clearanceData.file[0] = file.raw
    },
    handlePreview1(file){

      this.clearanceData.file[1] = file.raw
    },
    handlePreview2(file){

      this.clearanceData.file[2] = file.raw
    },
    submitForm(){
      let data = new FormData()



      data.append("mainNo", this.mainNo)
      data.append("goodsDeliveredRemark", this.clearanceData.mark)
      data.append("nodeType", 10)
      this.clearanceData.file.forEach(file => {
        data.append("file", file, file.name)
      })

      uploadForm(data).then(res=>{
        this.dialogVisible = false
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
