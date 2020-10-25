<template>
  <el-dialog
      :visible.sync="dialogVisible"
      width="35%"
      :before-close="handleClose">
    <el-form ref="form" :model="clearanceData" label-width="100px">

      <el-form-item label="备注">
        <el-input
            type="textarea"
            placeholder="请输入备注"
            v-model="clearanceData.mark"
            maxlength="30"
            show-word-limit
            />
      </el-form-item>
      <el-form-item label="退单文件(附件)">
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
  props: ["mainNo"],
  name: "clearance_goods",
  data(){
    return{
      dialogVisible: false,
      clearanceData:{
        service_shop: "",
        clearance_order:"",
        file:[],
        mark:"",
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
    handleClose(){
      this.dialogVisible = false
    },
    submitForm(){
      let data = new FormData()


      console.log(this.clearanceData.file)


      data.append("mainNo", this.mainNo)
      data.append("nodeType", 9)
      data.append("commitChargebackRemark", this.clearanceData.mark)

      let file_name = ""

      this.clearanceData.file.forEach((file, index) => {
        data.append("file", file, file.name)
        file_name += this.clearanceData.file.length != index + 1 ? `${file.name},` : `${file.name}`
      })

      data.append("ordinaryFileNames", file_name)

      uploadForm(data).then(()=>{
        this.dialogVisible = false

        this.clearanceData.service_shop = "";
        this.clearanceData.clearance_order = "";
        this.clearanceData.file = [];
        this.clearanceData.mark = [];
        this.$refs.upload.clearFiles()

        this.$emit('onUploadSuccess')
      })
    }
  }
}
</script>

<style scoped>

</style>
