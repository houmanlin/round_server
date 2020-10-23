<template>
  <el-dialog
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose">
    <el-form ref="form" :model="clearanceData" label-width="120px">
      <el-form-item label="分单号">
        <el-input
            placeholder="请输入分单号"
            v-model="clearanceData.dialog_submenuNo"
        />
      </el-form-item>
      <el-form-item label="分单件数">
        <el-input
            placeholder="请输入分单件数"
            v-model="clearanceData.dialog_submenuNumPackage"
        />
      </el-form-item>
      <el-form-item label="分单毛重">
        <el-input
            placeholder="请输入分单毛重"
            v-model="clearanceData.dialog_roughWeight"
        />
      </el-form-item>
      <el-form-item label="品名数量">
        <el-input
            placeholder="请输入品名数量"
            v-model="clearanceData.dialog_pinming_shu"
        />
      </el-form-item>
      <el-form-item label="报关代理">
        <el-input
            placeholder="请输入报关代理"
            v-model="clearanceData.dialog_baoguan_daili"
        />
      </el-form-item>
      <el-form-item label="生产销售单位">
        <el-input
            placeholder="请输入报关代理"
            v-model="clearanceData.dialog_sale_monad"
        />
      </el-form-item>
      <el-form-item label="监管方式">
        <el-select
            v-model="clearanceData.dialog_jianguan_type"
            placeholder="请选择监管方式">
          <el-option label="9610" value="9610"></el-option>
          <el-option label="9710" value="9710"></el-option>
          <el-option label="9810" value="9810"></el-option>
          <el-option label="0110" value="0110"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="clearanceData.dialog_yewu_type == '转关'? '境内监管中转' : '境内送货'" v-if="clearanceData.dialog_yewu_type == '转关'">
        <el-select filterable  v-model="clearanceData.dialog_is_jingnei" placeholder="请选择境内送货">
          <el-option label="是" :value="1"></el-option>
          <el-option label="否" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="费用" v-if="clearanceData.dialog_is_jingnei">
        <el-input
            placeholder="请输入分单毛重"
            v-model="clearanceData.dialog_feiyong"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitForm">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>

export default {
  props:["editData"],
  name: "houseInfoDialog",
  data(){
    return{
      dialogVisible: false,
      clearanceData:{
        yewu_type:"",
        dialog_submenuNo: '',
        dialog_submenuNumPackage: "",
        dialog_roughWeight:"",
        dialog_pinming_shu:"",
        dialog_baoguan_daili:"",
        dialog_sale_monad:"",
        dialog_jianguan_type:[],
        dialog_feiyong: 0,
        dialog_is_jingnei: ""
      }
    }
  },
  watch:{
    dialogVisible(newValue, oldValue){

      this.clearanceData.data_index               = this.editData.data_index
      this.clearanceData.dialog_submenuNo         = this.editData.submenuNo
      this.clearanceData.dialog_submenuNumPackage = this.editData.submenuNumPackage
      this.clearanceData.dialog_roughWeight       = this.editData.roughWeight
      this.clearanceData.dialog_pinming_shu       = this.editData.pinming_shu
      this.clearanceData.dialog_baoguan_daili     = this.editData.baoguan_daili
      this.clearanceData.dialog_sale_monad        = this.editData.sale_monad
      this.clearanceData.dialog_jianguan_type     = this.editData.jianguan_type
      this.clearanceData.dialog_yewu_type         = this.editData.yewu_type
    }
  },
  methods:{

    submitForm(){
      let emitData = {}
      emitData['data_index']         =  this.clearanceData.data_index
      emitData['submenuNo']          =  this.clearanceData.dialog_submenuNo
      emitData['submenuNumPackage']  =  this.clearanceData.dialog_submenuNumPackage
      emitData['roughWeight']        =  this.clearanceData.dialog_roughWeight
      emitData['pinming_shu']        =  this.clearanceData.dialog_pinming_shu
      emitData['baoguan_daili']      =  this.clearanceData.dialog_baoguan_daili
      emitData['sale_monad']         =  this.clearanceData.dialog_sale_monad
      emitData['jianguan_type']      =  this.clearanceData.dialog_jianguan_type
      this.$emit("onEditHouseNo", emitData)
    },
    handleClose(){
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped>

</style>
