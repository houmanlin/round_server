<template>
  <div class="view_container">
    <div class="aviation_title">航空主单录入</div>
    <el-form :inline="true" :model="mast_info" size="medium" label-width="80px" label-position="left" class="demo-form-inline">

      <el-form-item label="一级客户">
        <el-select v-model="mast_info.customerIdOne" filterable placeholder="请输入字段名">
          <el-option
              v-for="item in client_list"
              :key="item.id"
              :label="item.username"
              :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级客户">
        <el-select v-model="mast_info.customerIdTwo" filterable placeholder="请输入字段名">
          <el-option
              v-for="item in client_list"
              :key="item.id"
              :label="item.username"
              :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>


      <el-form-item label="报关口岸">

        <el-input v-model="mast_info.clearance_port" placeholder="请输入报关口岸"></el-input>
      </el-form-item>
      <el-form-item label="离境口岸">
        <el-input v-model="mast_info.exit_port" placeholder="请输入离境口岸"></el-input>
      </el-form-item>

      <el-form-item label="主单类型">
        <el-select filterable v-model="mast_info.mast_type" multiple placeholder="请选择主单类型">
          <el-option label="通关代理" value="1"></el-option>
          <el-option label="贸易代理" value="2"></el-option>
        </el-select>
      </el-form-item>
    </el-form>

<!--    基础信息-->
    <div class="basics_info_entering">
      <div class="basics_info_entering_title">
        基础信息录入
      </div>
      <div class="basics_info_entering_form">
        <el-form :inline="true" :model="mast_info" label-width="100px" label-position="left" class="demo-form-inline">
          <el-form-item label="主单号">
            <el-input v-model="mast_info.mast_order_number" placeholder="请输入主单号"></el-input>
          </el-form-item>
          <el-form-item label="航班号">
            <el-input v-model="mast_info.flight_number" placeholder="请输入航班号"></el-input>
          </el-form-item>
          <el-form-item label="目的地">
            <el-input v-model="mast_info.destination" placeholder="请输入目的地"></el-input>
          </el-form-item>
          <el-form-item label="航班日期">
            <el-date-picker
                v-model="mast_info.flight_time"
                type="datetime"
                placeholder="选择航班日期"
                value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="主单件数">
            <el-input v-model="mast_info.mast_number" placeholder="请输入主单件数"></el-input>
          </el-form-item>
          <el-form-item label="主单毛量">
            <el-input v-model="mast_info.mast_weight" placeholder="请输入主单毛量"></el-input>
          </el-form-item>
          <el-form-item label="主单体积">
            <el-input v-model="mast_info.mast_volume" placeholder="请输入主单体积"></el-input>
          </el-form-item>
          <el-form-item label="主单计费量">
            <el-input v-model="mast_info.mast_expense" placeholder="请输入主单计费量"></el-input>
          </el-form-item>

        </el-form>
      </div>
    </div>


<!--    分单信息-->
    <div class="basics_info_entering">
      <div class="basics_info_entering_title">
        分单信息录入
      </div>
      <div class="basics_info_entering_form">

        <div class="house_bill_content" v-for="(item, index) in mast_info.busSubmenuSaveDTOS">
          <!-- 分单号-->
          <div class="form_item">
            <span>分单号</span>
            <el-input v-model="item.submenuNo" placeholder="请输入主单号"></el-input>
          </div>
          <!-- 分单件数-->
          <div class="form_item">
            <span>分单件数</span>
            <el-input v-model="item.submenuNumPackage" placeholder="请输入分单件数"></el-input>
          </div>
          <!-- 分单毛重-->
          <div class="form_item">
            <span>分单毛重</span>
            <el-input v-model="item.roughWeight" placeholder="请输入分单毛重"></el-input>
          </div>
          <!-- 分单体积-->
          <div class="form_item">
            <span>分单体积</span>
            <el-input v-model="item.volume" placeholder="请输入分单体积"></el-input>
          </div>
          <!-- 分单计费量-->
          <div class="form_item">
            <span>分计费量</span>
            <el-input v-model="item.chargedWeight" placeholder="请输入主单号"></el-input>
          </div>
          <!-- 收件人-->
          <div class="form_item">
            <span>收件人</span>
            <el-input v-model="item.addressee" placeholder="请输入收件人"></el-input>
          </div>
          <div class="form_item">
            <span>贸易类型</span>
            <el-select filterable multiple v-model="item.tradeType" placeholder="请选择贸易方式">
              <el-option
                  v-for="item in trade_type_list"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </div>
          <!-- 操作-->
          <div class="form_item last_form_item">
            <el-button type="primary" icon="el-icon-plus" circle @click="dataAdd"  v-if="parseInt(index)+1 == mast_info.busSubmenuSaveDTOS.length"></el-button>
            <el-button icon="el-icon-minus" circle  @click="dataRemove(index)" v-if="parseInt(index)+1 != mast_info.busSubmenuSaveDTOS.length"></el-button>
          </div>
        </div>
    </div>
    </div>


<!--    辅助信息-->
    <div class="basics_info_entering">
      <div class="basics_info_entering_title">
        辅助信息录入
      </div>
      <div class="basics_info_entering_form">
        <div class="basics_info_entering_form">
          <el-form :inline="true" label-position="left" label-width="100px" :model="mast_info" class="demo-form-inline">
            <el-form-item label="货值">
              <el-input v-model="mast_info.goodsValue" placeholder="请输入货值"></el-input>
            </el-form-item>
            <el-form-item label="商品数量">
              <el-input v-model="mast_info.descriptionNum" placeholder="请输入商品数量"></el-input>
            </el-form-item>
            <el-form-item label="通关单号">
              <el-input v-model="mast_info.customsNo" placeholder="请输入通关单号"></el-input>
            </el-form-item>

            <el-form-item label="贸易单号">
              <el-input v-model="mast_info.tradeNo" placeholder="请输入贸易单号"></el-input>
            </el-form-item>
            <el-form-item label="合同编号">
              <el-input v-model="mast_info.contractCoding" placeholder="请输入合同编号"></el-input>
            </el-form-item>
            <el-form-item label="生产销售单位">
              <el-input v-model="mast_info.sale_monad" placeholder="请输入生产销售单位"></el-input>
            </el-form-item>
            <el-form-item label="报关销售代理">
              <el-input v-model="mast_info.company_agency" placeholder="请输入报关销售代理"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="mast_info.marks" placeholder="请输入备注"></el-input>
            </el-form-item>
          </el-form>

        </div>

        <div class="basics_info_entering_form">
          <el-row>
            <el-col :span="10">
              <el-col :span="4" class="person_left">
                发件人
              </el-col>
              <el-col :span="20">
                <el-input
                  label="发件人"
                  type="textarea"
                  placeholder="请输入发件人信息"
                  v-model="mast_info.addresser_info"
                  maxlength="1000"
                  class="text_area_info"
                />
              </el-col>



            </el-col>
            <el-col :span="10" :offset="2">
              <el-col :span="4" class="person_left">
                收件人
              </el-col>
              <el-col :span="20">

                <el-input
                    label="收件人"
                    type="textarea"
                    placeholder="请输入收件人信息"
                    v-model="mast_info.receiver_info"
                    maxlength="1000"
                    class="text_area_info"
                />
              </el-col>


            </el-col>
          </el-row>
        </div>


      </div>
    </div>



    <div class="operator_button">
      <el-button type="primary" @click="addData">保存</el-button>
      <el-button class="reset_button" @click="resetData">重置</el-button>
    </div>


  </div>
</template>

<script>
import { TRADE_TYPE_GROUP } from '@/config/selectData'
import {getOneClient} from "@/api/customer";
import { addOrder} from "@/api/import_bussiness";
export default {
  name: "add_import_business",
  data(){
    return{
      trade_type_list         : TRADE_TYPE_GROUP,
      client_list             : [],
      mast_info:{
        customerIdOne         : "",       //客户类型（一级客户）
        customerIdTwo         : "",       //客户类型（二级客户）
        mast_type             : "",       //主单类型
        clearance_port        : "",       //报关口岸
        exit_port             : "",       //离境口岸
        customsNo             : "",       //通关单号
        mast_order_number     : "",       //主单号
        flight_number         : "",       //航班号
        destination           : "",       //目的港口
        flight_time           : "",       //航班时间
        descriptionNum        : "",
        mast_number           : "",       //主单数量
        tradeNo           : "",       //主单数量
        mast_weight           : "",       //主单重量
        mast_volume           : "",       //主单体积
        contractCoding           : "",       //主单体积
        mast_expense          : "",       //主单费用
        trade_type            : "",       //贸易方式
        sale_monad            : "",       //销售单位
        goodsValue            : "",
        company_agency        : "",       //公司代理
        marks                 : "",       //备注
        busSubmenuSaveDTOS    : [
          {submenuNo: '', submenuNumPackage: "", roughWeight:"", volume: "", chargedWeight: "", addressee: "", tradeType:""},
        ],                                //分单信息
        addresser_info         : "",      //发件人信息
        receiver_info          : "",      //收件人信息,

      }
    }
  },
  created() {
    this.getClientData()
  },
  methods:{
    dataRemove(index){
      this.$delete(this.mast_info.busSubmenuSaveDTOS, index)
    },
    dataAdd(){
      this.mast_info.busSubmenuSaveDTOS.push(
          {submenuNo: '', submenuNumPackage: "", roughWeight:"", volume: "", chargedWeight: "", addressee: "", tradeType:""},
      )
    },
    getClientData(){
      getOneClient().then(res=>{
        this.client_list = res.data
      })
    },
    resetData(){
      this.mast_info.addresser_info = ""
      this.mast_info.receiver_info = ""
      this.mast_info.contractCoding = ""
      this.mast_info.customerIdOne = ""
      this.mast_info.customerIdTwo = ""
      this.mast_info.company_agency = ""
      this.mast_info.customsNo = ""
      this.mast_info.clearance_port = ""
      this.mast_info.descriptionNum = ""
      this.mast_info.destination = ""
      this.mast_info.exit_port = ""
      this.mast_info.flight_time = ""
      this.mast_info.flight_number = ""
      this.mast_info.goodsValue = ""
      this.mast_info.mast_expense = ""
      this.mast_info.mast_order_number = ""
      this.mast_info.mast_number = ""
      this.mast_info.mast_weight = ""
      this.mast_info.mast_type = ""
      this.mast_info.mast_volume = ""
      this.mast_info.marks = ""
      this.mast_info.tradeNo = ""
      this.mast_info.sale_monad = ""
      this.mast_info.busSubmenuSaveDTOS = [
          {submenuNo: '', submenuNumPackage: "", roughWeight:"", volume: "", chargedWeight: "", addressee: "", tradeType:""},
      ]
    },
    addData(){
      if (this.mast_info.flight_time){
        //let date = new Date(this.mast_info.flight_time)
        //this.mast_info.flight_time = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
      } else{
        this.mast_info.flight_time = ""
      }

      let data = {
        addressee: this.mast_info.addresser_info,
        addresser: this.mast_info.receiver_info,
        busSubmenuSaveDTOS: this.mast_info.busSubmenuSaveDTOS,
        contractCoding:this.mast_info.contractCoding,
        customerIdOne: this.mast_info.customerIdOne,
        customerIdTwo: this.mast_info.customerIdTwo,
        customsBrokerAgent:this.mast_info.company_agency,
        customsNo:this.mast_info.customsNo,
        customsPort:this.mast_info.clearance_port,
        descriptionNum:this.mast_info.descriptionNum,
        destination:this.mast_info.destination,
        exitPort:this.mast_info.exit_port,
        flightDate:this.mast_info.flight_time,
        flightNo:this.mast_info.flight_number,
        goodsValue:this.mast_info.goodsValue,
        mainChargedWeight:this.mast_info.mast_expense,
        mainNo:this.mast_info.mast_order_number,
        mainNumPackage:this.mast_info.mast_number,
        mainRoughWeight:this.mast_info.mast_weight,
        mainType:this.mast_info.mast_type,
        mainVolume:this.mast_info.mast_volume,
        remark:this.mast_info.marks,
        tradeNo:this.mast_info.tradeNo,
        productionSaleUnit:this.mast_info.sale_monad,
      }

      if(data.flightDate != ""){
        let tempDate = data.flightDate.split()
      }

      if(data.busSubmenuSaveDTOS.length > 0){
          for(let dtoItem of data.busSubmenuSaveDTOS){
              if(dtoItem.tradeType.length > 0){
                dtoItem.tradeType = dtoItem.tradeType.join(',')
              } else {
                dtoItem.tradeType = ""
              }
          }
      }

      if(data.mainType.length > 0){
          data.mainType = data.mainType.join(',')
      } else {
        data.mainType = ""
      }

      addOrder(data).then(res=>{
          this.$message.success("成功");
          this.$router.back()
      })
    }
  }
}
</script>

<style scoped>
  .aviation_title{
    padding: 20px 0;
  }
  .basics_info_entering{
    width: 100%;
    height: auto;
    margin-top: 10px;
    border-radius: 10px;
    border: 1px solid #cccccc;
    overflow: hidden;
  }
  .basics_info_entering_title{
    width: 100%;
    padding: 15px 10px 15px;
    border-bottom: 1px solid #cccccc;
    background: #cccccc;
  }

  .basics_info_entering_form{
    width: 95%;
    height: auto;
    margin:20px auto;
  }
  .house_bill_content{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
  }
  .house_bill_content>.form_item{
    width: calc(95% / 7);
    display: flex;
    justify-items: center;
    align-items: center;
    margin-right: 10px;
  }
  .form_item>span{
    width: 80%;
    font-size: 14px;
    vertical-align: middle;
    float: left;
    color: #606266;
    line-height: 40px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-weight: bolder;
  }
  .last_form_item{
    width: 5%!important;
  }
  .person_left{


    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;

    font-weight: bolder;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .operator_button{
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 20px 0;
  }
</style>
