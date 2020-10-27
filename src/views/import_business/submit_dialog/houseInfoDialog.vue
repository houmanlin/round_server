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
      <el-form-item label="转关单号" v-if="clearanceData.dialog_yewu_type == '3'">
        <el-input
            placeholder="请输入转关单号"
            v-model="clearanceData.dialog_zhuanguan_order"
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
            placeholder="请输入生产销售单位"
            v-model="clearanceData.dialog_sale_monad"
        />
      </el-form-item>
      <el-form-item :label="clearanceData.dialog_yewu_type == '1' ? '始发港' : '目的港'">
        <el-input
            :placeholder="clearanceData.dialog_yewu_type == '1' ? '请输入始发港' : '请输入目的港'"
            v-model="clearanceData.dialog_destination"
        />
      </el-form-item>
      <el-form-item label="报关类型">
        <el-select
            :disabled="clearanceData.dialog_mainTypeSelected == '1'"
            v-model="clearanceData.dialog_baoguan_type"
            placeholder="请选择报关类型">
          <el-option label="贸易" :value="1"></el-option>
          <el-option label="代理" :value="2"></el-option>
          <el-option label="自理" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="监管方式">
        <el-select
            v-model="clearanceData.dialog_jianguan_type"
            placeholder="请选择监管方式">
          <el-option label="9610" :value="1"></el-option>
          <el-option label="9710" :value="2"></el-option>
          <el-option label="9810" :value="3"></el-option>
          <el-option label="0110" :value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="clearanceData.dialog_yewu_type == '3'? '境内监管中转' : '境内送货'" v-if="clearanceData.dialog_yewu_type == '3' || clearanceData.dialog_yewu_type == '1'">
        <el-select filteyrable  v-model="clearanceData.dialog_is_jingnei" placeholder="请选择境内送货">
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
      oldSubmenuNo : "",
      clearanceData:{
        static_old_submenuNo          : "",
        yewu_type                     : "",
        old_submenuNo                 : "",
        dialog_submenuNo              : '',
        dialog_submenuNumPackage      : "",
        dialog_roughWeight            : "",
        dialog_pinming_shu            : "",
        dialog_baoguan_daili          : "",
        dialog_sale_monad             : "",
        dialog_jianguan_type          : "",
        dialog_feiyong                : 0,
        dialog_is_jingnei             : "",
        dialog_zhuanguan_order        : "",
        dialog_destination            : "",
        dialog_mainTypeSelected       : "",
        dialog_baoguan_type           : "",
      }
    }
  },
  watch:{
    dialogVisible(newValue, oldValue){
      this.clearanceData.id                       = this.editData.id;
      this.clearanceData.data_index               = this.editData.data_index;
      this.clearanceData.dialog_submenuNo         = this.editData.submenuNo;
      this.clearanceData.dialog_submenuNumPackage = this.editData.submenuNumPackage;
      this.clearanceData.dialog_roughWeight       = this.editData.roughWeight;
      this.clearanceData.dialog_pinming_shu       = this.editData.pinming_shu;
      this.clearanceData.dialog_baoguan_daili     = this.editData.baoguan_daili;
      this.clearanceData.dialog_sale_monad        = this.editData.sale_monad;
      this.clearanceData.dialog_jianguan_type     = this.editData.jianguan_type;
      this.clearanceData.dialog_yewu_type         = this.editData.yewu_type;
      this.clearanceData.dialog_zhuanguan_order   = this.editData.zhuanguan_order;
      this.clearanceData.dialog_destination       = this.editData.destination;
      this.clearanceData.dialog_baoguan_type      = this.editData.baoguan_type;
      this.clearanceData.dialog_feiyong           = this.editData.feiyong;
      this.clearanceData.static_old_submenuNo     = this.editData.static_old_submenuNo;
    }
  },
  methods:{

    submitForm(){
      let emitData = {};
      emitData['data_index']                =  this.clearanceData.data_index;
      emitData['data_index']                =  this.clearanceData.data_index;
      emitData['submenuNo']                 =  this.clearanceData.dialog_submenuNo;
      emitData['submenuNumPackage']         =  this.clearanceData.dialog_submenuNumPackage;
      emitData['roughWeight']               =  this.clearanceData.dialog_roughWeight;
      emitData['pinming_shu']               =  this.clearanceData.dialog_pinming_shu;
      emitData['baoguan_daili']             =  this.clearanceData.dialog_baoguan_daili;
      emitData['sale_monad']                =  this.clearanceData.dialog_sale_monad;
      emitData['jianguan_type']             =  this.clearanceData.dialog_jianguan_type;
      emitData['zhuanguan_order']           =  this.clearanceData.dialog_zhuanguan_order;
      emitData['destination']               =  this.clearanceData.dialog_destination;
      emitData['oldSubmenuNo']              =  this.oldSubmenuNo;
      emitData['feiyong']                   =  this.clearanceData.dialog_feiyong;
      emitData['baoguan_type']              =  this.clearanceData.dialog_baoguan_type;
      emitData['static_old_submenuNo']      =  this.clearanceData.static_old_submenuNo;
      emitData['id']                        =  this.clearanceData.id;
      this.$emit("onEditHouseNo", emitData);
    },
    handleClose(){
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped>

</style>
