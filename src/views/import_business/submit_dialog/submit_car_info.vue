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
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </el-form-item>
      <el-form-item label="其它才材料(附件)">
        <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
export default {
  name: "clearance_goods",
  data(){
    return{
      dialogVisible: false,
      clearanceData:{
        car_type: "",
        license_plate_number:"",
        delivery_expense:"",
        delivery_time: ""
      }
    }
  },
  methods:{
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
