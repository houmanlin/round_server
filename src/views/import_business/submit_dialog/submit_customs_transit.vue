<template>
  <el-dialog
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
    <el-form ref="form" :model="clearanceData" label-width="120px" class="form_list">

      <el-form-item label="主单复印件">
        <el-upload
            class="upload-demo"
            ref="upload"
            drag
            :on-remove="removeData1"
            action="https://jsonplaceholder.typicode.com/posts/"
            :http-request="handlePreview1"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </el-form-item>
      <el-form-item label="转关单号">
        <el-input v-model="clearanceData.zhaunguan_danhao" placeholder="请输入转关单号"/>
      </el-form-item>
      <el-form-item label="车辆型号">
        <el-input v-model="clearanceData.car_type" placeholder="请输入车辆类型"></el-input>
      </el-form-item>
      <el-form-item label="车牌号">
        <el-input v-model="clearanceData.license_plate_number" placeholder="请输入车牌号"/>
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
      <el-form-item label="转关单据(附件)">
        <el-upload
            class="upload-demo"
            ref="upload"
            drag
            :on-remove="removeData"
            action="https://jsonplaceholder.typicode.com/posts/"
            :http-request="handlePreview"
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
        car_type: "",
        license_plate_number:"",
        delivery_expense:"",
        zhaunguan_danhao:"",
        delivery_time: "",
        mark:"",
        file:[],
        file1:[],
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
    submitForm(){
      let data = new FormData()



      data.append("mainNo", this.mainNo)
      data.append("submenuNo", this.submenuNo?this.submenuNo:'')
      data.append("commitCustomsTransitNo", this.clearanceData.zhaunguan_danhao)
      data.append("commitCustomsTransitModelCar", this.clearanceData.car_type)
      data.append("commitCustomsTransitLPN", this.clearanceData.license_plate_number)
      data.append("commitCustomsTransitRemark", this.clearanceData.mark)
      data.append("nodeType", 6)
      let file_name = ""
      let file_name1 = ""
      this.clearanceData.file.forEach((file,index) => {
        data.append("file", file, file.name)
        file_name += this.clearanceData.file1.length != index + 1 ? `${file.name},` : `${file.name}`
      })

      this.clearanceData.file1.forEach((file, index) => {
        data.append("file", file, file.name)
        file_name1 += this.clearanceData.file1.length != index + 1 ? `${file.name},` : `${file.name}`
      })

      data.append("mainCopiesFileNames", file_name)
      data.append("customsTransitDocFileNames", file_name1)


      uploadForm(data).then(res=>{
        this.dialogVisible = false
        this.clearanceData.car_type= "";
        this.clearanceData.license_plate_number="";
        this.clearanceData.delivery_expense="";
        this.clearanceData.delivery_time = "";
        this.clearanceData.mark = "";
        this.clearanceData.zhaunguan_danhao = "";
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
.form_list{
  width: 100%;
  height: 300px;
  overflow-y: auto;
}
</style>
