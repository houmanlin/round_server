<template>
  <el-dialog
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose">
    <el-form label-position="left" ref="form" :inline="true" :model="clearanceData" label-width="100px" class="order_info_list">
      <el-form-item label="主单号:">
        <div class="form_value">12434635323</div>
      </el-form-item>
      <el-form-item label="客户名称:">
        <div class="form_value">杨哥</div>
      </el-form-item>
      <el-form-item label="主单类型:">
        <div class="form_value">通关类型</div>
      </el-form-item>
      <el-form-item label="报关口岸:">
        <div class="form_value">报关口岸</div>
      </el-form-item>
      <el-form-item label="离境口岸:">
        <div class="form_value">离境口岸</div>
      </el-form-item>
      <el-form-item label="航班号:">
        <div class="form_value">航班号</div>
      </el-form-item>
      <el-form-item label="航班号:">
        <div class="form_value">航班号</div>
      </el-form-item>
      <el-form-item label="航班日期:">
        <div class="form_value">航班日期</div>
      </el-form-item>
      <el-form-item label="主单件数:">
        <div class="form_value">主单件数</div>
      </el-form-item>
      <el-form-item label="主单毛量:">
        <div class="form_value">主单毛量</div>
      </el-form-item>
      <el-form-item label="毛单体积:">
        <div class="form_value">毛单体积</div>
      </el-form-item>
      <el-form-item label="主单计费量:">
        <div class="form_value">主单计费量</div>
      </el-form-item>
      <el-form-item label="贸易方式:">
        <div class="form_value">贸易方式</div>
      </el-form-item>
      <el-form-item label="货值:">
        <div class="form_value">货值</div>
      </el-form-item>
      <el-form-item label="商品数量:">
        <div class="form_value">商品数量</div>
      </el-form-item>
      <el-form-item label="商品数量:">
        <div class="form_value">通关单号</div>
      </el-form-item>
      <el-form-item label="贸易单号:">
        <div class="form_value">贸易单号</div>
      </el-form-item>
      <el-form-item label="合同编码:">
        <div class="form_value">合同编码</div>
      </el-form-item>
      <el-form-item label="发件人:">
        <div class="form_value">发件人</div>
      </el-form-item>
      <el-form-item label="收件人:">
        <div class="form_value">收件人</div>
      </el-form-item>
    </el-form>


    <div class="order_flow">
      <div class="order_flow_title">流程</div>
      <el-collapse v-model="activeNames" @change="handleChange" class="order_flow_content">
        <el-collapse-item title="提交报关" name="1">
          <div>
            <el-image
                style="width: 100px; height: 100px"
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                fit="fill"></el-image>
          </div>
          <div>备注:在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
        </el-collapse-item>
      </el-collapse>
    </div>


    <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
export default {
  props:["orderInfo"],
  name: "clearance_goods",
  data(){
    return{
      dialogVisible: false,
      activeNames:"1",
      clearanceData:{
        service_shop: "",
        clearance_order:""
      }
    }
  },
  methods:{
    handleClose(){

    }
  }
}
</script>

<style scoped>
  .order_info_list{
    height: 130px;
    overflow-y: auto;
  }
  .form_value{
    width: 150px;
  }
  .order_flow{
    width: 100%;
    height: 300px;
    overflow-y: auto;
    border:1px solid #b8b8b8;
    border-radius: 10px;
  }
  .order_flow_title{
    background: #cccccc;
    padding: 10px 0;
    text-indent: 10px;
  }
  .order_flow_content{
    width: 90%;
    margin: 0 auto;
  }
</style>
