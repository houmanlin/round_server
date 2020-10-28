<template>
  <el-dialog
      :visible.sync="dialogVisible"
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
      <el-form-item label="查验通知书附件(附件)">
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
        file:[]
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
    submitForm(){
      let data = new FormData()



      data.append("mainNo", this.mainNo)
      data.append("submenuNo", this.submenuNo?this.submenuNo:'')
      data.append("commitCheckRemark", this.clearanceData.mark)
      data.append("nodeType", 2)
      this.clearanceData.file.forEach(file => {
        data.append("file", file, file.name)
      })

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
