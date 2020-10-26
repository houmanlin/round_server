<template>
  <div class="search_container">

    <!--  功能  -->
    <el-button class="operator_button dark_green" type="primary" @click="operatorUser('add')" v-if="name =='张雪' || name =='贾彬' || name =='苏纪闽' || name =='admin' ">新增</el-button>
    <!--  功能  -->
    <el-button class="operator_button" type="warning" @click="operatorUser('clearanceGoods')">提交报关</el-button>

    <!--  功能  -->
    <el-button class="operator_button" type="primary" @click="operatorUser('inspect')">提交查验</el-button>

    <!--  功能  -->
<!--    <el-button class="operator_button" type="danger" @click="operatorUser('returnSale')">退单</el-button>-->

    <!--  功能  -->
<!--    <el-button class="operator_button" type="danger" @click="operatorUser('returnSaleSucc')">退单完成</el-button>-->

    <!--  功能  -->
<!--    <el-button class="operator_button" type="danger" @click="operatorUser('returnWorkhouse')">退库</el-button>-->

    <!--  功能  -->
    <el-button class="operator_button" type="success" @click="operatorUser('greenLight')">提交放行</el-button>
    <el-button class="operator_button" type="success" @click="operatorUser('greenLightReturnWorkhouse')">放行出库</el-button>
<!--    <el-button class="operator_button button_yellow" type="primary" @click="operatorUser('domesticDeliveryGoods')">境内送货</el-button>-->
<!--    <el-button class="operator_button button_yellow" type="primary" @click="operatorUser('domesticDelivery')">货物送达</el-button>-->
<!--    <el-button class="operator_button" type="warning" @click="operatorUser('submitCarInfo')">提交提货车辆信息</el-button>-->
    <el-button class="operator_button" type="warning" @click="operatorUser('submitCustomsTransit')">提交转关</el-button>
    <el-button class="operator_button" type="warning" @click="operatorUser('customsTransitOperator')">转关操作</el-button>
    <el-button class="operator_button" type="warning" @click="operatorUser('submitReturnSale')">提交退单</el-button>
    <el-button class="operator_button" type="warning" @click="operatorUser('mainNoRemove')" v-if="name =='张雪' || name =='贾彬' || name =='苏纪闽' || name =='admin' ">主单删除</el-button>
    <el-button class="operator_button" type="warning" @click="operatorUser('houseNoRemove')" v-if="name =='张雪' || name =='贾彬' || name =='苏纪闽' || name =='admin' ">分单删除</el-button>
  </div>
</template>

<script>
export default {
  name: "operatorButtonGroup",
  data(){
    return{
      name:""
    }
  },
  created() {
   this.name = localStorage.getItem("promise_name")
  },

  methods:{
    /**
     * 操作按钮
     * @param operator  操作关键字
     */
    operatorUser(operator){
      this.$emit('onOperator', operator)
    }
  }
}
</script>

<style scoped>
  .search_container{
    display: flex;
    justify-content: flex-start;
  }
  .operator_button{
    margin-right: 15px;
    margin-bottom: 15px;
  }
  .button_yellow{
    background: #ffc307;
    border-color: #ffc307;
  }
  .dark_green{
    background: darkgreen;
    border-color: darkgreen;
  }
</style>
