<template>
  <div class="view_container">
    <div class="aviation_title">主单信息录入</div>
    <el-form :inline="true" :model="mast_info" size="medium" label-width="100px" label-position="left" class="demo-form-inline">

      <el-form-item label="一级客户">
        <el-select v-model="mast_info.customerIdOne" filterable placeholder="请输入一级客户名">
          <el-option
              v-for="item in client_list"
              :key="item.id"
              :label="item.username"
              :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级客户">
        <el-select v-model="mast_info.customerIdTwo" filterable placeholder="请输入二级客户">
          <el-option
              v-for="item in client_list"
              :key="item.id"
              :label="item.username"
              :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="主单号">
        <el-input v-model="mast_info.mast_order_number" placeholder="请输入主单号"></el-input>
      </el-form-item>
      <el-form-item label="航班号">
        <el-input v-model="mast_info.flight_number" placeholder="请输入航班号"></el-input>
      </el-form-item>

      <el-form-item label="航班日期">
        <el-date-picker
            v-model="mast_info.flight_time"
            type="datetime"
            placeholder="选择航班日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            format="yyyy-MM-dd HH:mm:ss">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="报关口岸">

        <el-input v-model="mast_info.clearance_port" placeholder="请输入报关口岸"></el-input>
      </el-form-item>


      <el-form-item label="主单件数">
        <el-input v-model="mast_info.mast_number" placeholder="请输入主单件数"></el-input>
      </el-form-item>
      <el-form-item label="主单毛重">
        <el-input v-model="mast_info.mast_weight" placeholder="请输入主单毛重"></el-input>
      </el-form-item>

      <el-form-item label="主单计费重">
        <el-input v-model="mast_info.mast_expense" placeholder="请输入主单计费重"></el-input>
      </el-form-item>

      <el-form-item label="通关口岸">
        <el-input v-model="mast_info.exit_port" placeholder="请输入通关口岸"></el-input>
      </el-form-item>
      <el-form-item label="转关单号" v-if="mast_info.yewu_type == '3'">
        <el-input v-model="mast_info.zhuanguan_number" placeholder="请输入通关口岸"></el-input>
      </el-form-item>

      <el-form-item label="业务类型">
        <el-select filterable  v-model="mast_info.yewu_type" placeholder="请选择业务类型">
          <el-option label="统一版进口" :value="1"></el-option>
          <el-option label="统一版出口" :value="2"></el-option>
          <el-option label="转关" :value="3"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="主单类型">
        <el-select filterable v-model="mainTypeSelected" placeholder="请选择主单类型">
          <el-option label="直单" :value="0"></el-option>
          <el-option label="一主多分" :value="1"></el-option>

        </el-select>
      </el-form-item>

    </el-form>

<!--    基础信息-->
    <div class="basics_info_entering">
      <div class="basics_info_entering_title">
        直单信息录入
      </div>
      <div class="basics_info_entering_form">
        <el-form :inline="true" :model="mast_info" label-width="96px" label-position="left" class="demo-form-inline">
          <el-form-item label="品名数量">
            <el-input :disabled="mainTypeSelected == '1'" v-model="mast_info.descriptionNum" placeholder="请输入品名数量"></el-input>
          </el-form-item>
          <el-form-item label="报关代理">
            <el-input :disabled="mainTypeSelected == '1'" v-model="mast_info.company_agency" placeholder="请输入报关代理"></el-input>
          </el-form-item>
          <el-form-item label="生产销售单位">
            <el-input :disabled="mainTypeSelected == '1'" v-model="mast_info.sale_monad" placeholder="请输入生产销售单位"></el-input>
          </el-form-item>
          <el-form-item label="报关类型">
            <el-select
                :disabled="mainTypeSelected == '1'"
                v-model="mast_info.baoguan_type"
                placeholder="请选择报关类型">
              <el-option label="贸易" :value="1"></el-option>
              <el-option label="代理" :value="2"></el-option>
              <el-option label="自理" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="监管方式">
            <el-select
                :disabled="mainTypeSelected == '1'"
                v-model="mast_info.jianguan_type"
                placeholder="请选择监管方式">
              <el-option label="9610" :value="1"></el-option>
              <el-option label="9710" :value="2"></el-option>
              <el-option label="9810" :value="3"></el-option>
              <el-option label="0110" :value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="转关单号">
            <el-input v-model="mast_info.zhuanguan_order" placeholder="请输入转关单号" :disabled="mast_info.yewu_type != '转关'"></el-input>
          </el-form-item>
          <el-form-item :label="mast_info.yewu_type == '1' ? '始发港' : '目的港'">
            <el-input :disabled="mainTypeSelected == '1'" v-model="mast_info.destination" :placeholder="mast_info.yewu_type == '1' ? '请输入始发港' : '请输入目的港'"></el-input>
          </el-form-item>
          <el-form-item :label="mast_info.yewu_type == '3'? '境内监管中转' : '境内送货'" v-if="(mast_info.yewu_type == '3' || mast_info.yewu_type == '2') && mainTypeSelected == '1'">
            <el-select filterable  v-model="mast_info.is_jingnei" :placeholder="'请选择' + mast_info.yewu_type == '3'? '境内监管中转' : '境内送货'">
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="0"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="费用" v-if="mast_info.is_jingnei">
            <el-input v-model="mast_info.feiyong" placeholder="请输入费用"></el-input>
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
          <div class="form_item" @click="dataEdit(index)">
            <span>分单号</span>
            <el-input readonly v-model="item.submenuNo" placeholder="请输入分单号" :disabled="mainTypeSelected == '0' || mainTypeSelected == ''"></el-input>
          </div>
          <!-- 分单件数-->
          <div class="form_item" @click="dataEdit(index)">
            <span>分单件数</span>
            <el-input readonly :disabled="mainTypeSelected == '0' || mainTypeSelected == ''" v-model="item.submenuNumPackage" placeholder="请输入分单件数"></el-input>
          </div>

          <div class="form_item" @click="dataEdit(index)">
            <span>分单毛重</span>
            <el-input readonly :disabled="mainTypeSelected == '0' || mainTypeSelected == ''" v-model="item.roughWeight" placeholder="请输入分单毛重"></el-input>
          </div>
          <!-- 品名数量-->
          <div class="form_item" @click="dataEdit(index)">
            <span>品名数量</span>
            <el-input readonly :disabled="mainTypeSelected == '0' || mainTypeSelected == ''" v-model="item.pinming_shu" placeholder="请输入品名数量"></el-input>
          </div>



          <!-- 操作-->
          <div class="form_item last_form_item">

            <el-button size="small" type="primary" icon="el-icon-plus" circle @click="dataAdd"  v-if="parseInt(index)+1 == mast_info.busSubmenuSaveDTOS.length"></el-button>
            <el-button size="small" icon="el-icon-minus" circle  @click="dataRemove(index)" v-if="parseInt(index)+1 != mast_info.busSubmenuSaveDTOS.length"></el-button>
            <el-button size="small" icon="el-icon-edit" circle  @click="dataEdit(index)"></el-button>
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
            <el-form-item label="币种">
              <el-select
                  allow-create
                  default-first-option
                  filterable
                  v-model="mast_info.currency"
                  placeholder="请选择货币">
                <el-option label="人民币" value="人民币"></el-option>
                <el-option label="美金" value="美金"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="货值">

              <el-input v-model="mast_info.goodsValue" placeholder="请输入货值"></el-input>
            </el-form-item>


<!--            <el-form-item label="通关单号">-->
<!--              <el-input v-model="mast_info.customsNo" placeholder="请输入通关单号"></el-input>-->
<!--            </el-form-item>-->

<!--            <el-form-item label="贸易单号">-->
<!--              <el-input v-model="mast_info.tradeNo" placeholder="请输入贸易单号"></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="合同编号">-->
<!--              <el-input v-model="mast_info.contractCoding" placeholder="请输入合同编号"></el-input>-->
<!--            </el-form-item>-->

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


    <houseInfoDialog @onEditHouseNo="editHouseNo" ref="houseInfoDialog" :editData="edit_data"/>

  </div>
</template>

<script>
import { TRADE_TYPE_GROUP } from '@/config/selectData'
import houseInfoDialog from "@/views/import_business/submit_dialog/houseInfoDialog";
import {getOneClient} from "@/api/customer";
import {addOrder, editOrder, getMainOrderInfo} from "@/api/import_bussiness";
export default {
  name: "add_import_business",
  components:{
    houseInfoDialog
  },
  data(){
    return{
      mainTypeList:[
        {"id":"1","text":"直单"},
        {"id":"2","text":"一主多分"},

      ],
      mainTypeSelected:"",
      tradeTypeList:[
        {"id":"1","text":"0110 通关代理"},
        {"id":"2","text":"9610 通关代理"},
        {"id":"3","text":"9710 通关代理"},
        {"id":"4","text":"9810 通关代理"},
        {"id":"5","text":"0110 贸易代理"},
        {"id":"6","text":"9610 贸易代理"},
        {"id":"7","text":"9710 贸易代理"},
        {"id":"8","text":"9810 贸易代理"}
      ],


      trade_type_list         : TRADE_TYPE_GROUP,
      client_list             : [],
      mast_info:{
        zhuanguan_number      : "",
        yewu_type             : "",
        id                    : 0 ,       //订单ID
        customerIdOne         : "",       //客户类型（一级客户）
        customerIdTwo         : "",       //客户类型（二级客户）
        mast_type             : "1,2",       //主单类型
        clearance_port        : "",       //报关口岸
        exit_port             : "",       //离境口岸
        customsNo             : "",       //通关单号
        mast_order_number     : "",       //主单号
        baoguan_type          : "",       //报关类型
        flight_number         : "",       //航班号
        destination           : "",       //目的港口
        flight_time           : "",       //航班时间
        descriptionNum        : "",
        feiyong               : "",
        mast_number           : "",       //主单数量
        tradeNo               : "",       //主单数量
        is_jingnei            : 0,
        currency              : "",
        zhuanguan_order       : "",
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

          {
            submenuNo: '',
            submenuNumPackage: "",
            feiyong: "" ,
            pinming_shu:"",
            baoguan_daili:"",
            sale_monad:"",
            jianguan_type:"",
            is_jingnei:"",
            baoguan_type: "",
            destination: "",
            roughWeight:"",
            chargedWeight: "",
            addressee: "",
          },

        ],                                //分单信息

        addresser_info         : "",      //发件人信息
        receiver_info          : "",      //收件人信息,

      },
      edit_data              : {},      //修改信息
    }
  },
  created() {

    this.getClientData()

    this.mast_info.id = this.$route.query.id ? this.$route.query.id : 0


    if (this.mast_info.id > 0){
      let that = this
      setTimeout(function (){
        that.getOrderInfo()
      })
      this.$route.meta.title = "修改订单"
    }else{
      this.$route.meta.title = "进出口业务"
    }
  },
  methods:{
    getOrderInfo(){
      let data = {
        id: this.mast_info.id
      }
      getMainOrderInfo(data).then(res=>{
        // 发件人
        this.$set(this.mast_info, "receiver_info", res.data.addressee)
        // 收件人
        this.$set(this.mast_info, "addresser_info", res.data.addresser)
        // res.data.customerNoOne = res.data.customerNoOne ?  res.data.customerNoOne : ""
        // res.data.customerIdTwo = res.data.customerIdTwo ?  res.data.customerIdTwo : ""
        // 一级客户
        this.$set(this.mast_info, "customerIdOne", res.data.customerIdOne)
        // TODO 一级客户
        this.$set(this.mast_info, "zhuanguan_number", res.data.zhuanguan_number)
        // 二级客户
        this.$set(this.mast_info, "customerIdTwo", res.data.customerIdTwo);
        console.log(res.data.customerIdTwo,"res.data.customerIdTwo")
        // 报关口岸
        this.$set(this.mast_info, "clearance_port", res.data.customsPort)
        // 离岸口岸
        this.$set(this.mast_info, "exit_port", res.data.exitPort)
        // 主单类型
        // res.data.mainType = res.data.mainType ?  res.data.mainType : ""
        // this.$set(this.mast_info, "mast_type", res.data.mainType.split(","))
        this.mainTypeSelected = res.data.mainType ?  res.data.mainType.split(",") : []
        // 主单号
        this.$set(this.mast_info, "mast_order_number", res.data.mainNo)
        // 航班号
        this.$set(this.mast_info, "flight_number", res.data.flightNo)
        // 目的地
        this.$set(this.mast_info, "destination", res.data.destination)
        // 航班时间
        this.$set(this.mast_info, "flight_time", res.data.flightDate)
        // 主单件
        this.$set(this.mast_info, "mast_number", res.data.mainNumPackage)
        // 主单毛重
        this.$set(this.mast_info, "mast_weight", res.data.mainRoughWeight)
        // 主单体积
        this.$set(this.mast_info, "mast_volume", res.data.mainVolume)
        // 主单计费量
        this.$set(this.mast_info, "chargedWeight", res.data.mainChargedWeight)
        // 辅助信息货值
        res.data.goodsValue = res.data.goodsValue ?  res.data.goodsValue : ""
        this.$set(this.mast_info, "goodsValue", res.data.goodsValue)
        // 辅助信息币种
        res.data.currency = res.data.currency ?  res.data.currency : ""
        this.$set(this.mast_info, "currency", res.data.currency)
        // 辅助信息品名
        this.$set(this.mast_info, "descriptionNum", res.data.descriptionNum)
        // 辅助信息通关单号
        this.$set(this.mast_info, "customsNo", res.data.customsNo)
        // 辅助信息贸易单号
        this.$set(this.mast_info, "tradeNo", res.data.tradeNo)
        // TODO 报关类型
        this.$set(this.mast_info, "baoguan_type", res.data.tradeNo)
        // TODO 监管类型
        this.$set(this.mast_info, "jianguan_type", res.data.tradeNo)
        // TODO 业务类型
        this.$set(this.mast_info, "yewu_type", res.data.yewu_type)
        // TODO 境内送货
        this.$set(this.mast_info, "is_jingnei", res.data.is_jingnei)
        this.$set(this.mast_info, "feiyong", res.data.is_jingnei)
        // 辅助信息合同编号
        this.$set(this.mast_info, "contractCoding", res.data.contractCoding)
        // 辅助信息生产销售单位
        this.$set(this.mast_info, "sale_monad", res.data.productionSaleUnit)
        // 辅助信息报关销售代理
        this.$set(this.mast_info, "company_agency", res.data.customsBrokerAgent)
        // 辅助信息备注
        this.$set(this.mast_info, "marks", res.data.remark)

        // 分单信息

        for (const argumentsKey in res.data.busSubmenus) {

          let busSubmenusItem = res.data.busSubmenus[argumentsKey]
          let tradeType = busSubmenusItem.tradeType ? busSubmenusItem.tradeType : "";

          let busSubmenu_item = {
            submenuNo: busSubmenusItem.submenuNo,
            pinming_shu:busSubmenusItem.pinming_shu,
            zhuanguan_order:busSubmenusItem.zhuanguan_order,
            baoguan_daili:busSubmenusItem.baoguan_daili,
            sale_monad:busSubmenusItem.sale_monad,
            baoguan_type:busSubmenusItem.baoguan_type,
            destination:busSubmenusItem.destination,
            is_jingnei:busSubmenusItem.is_jingnei,
            jianguan_type:busSubmenusItem.jianguan_type,
            submenuNumPackage: busSubmenusItem.submenuNumPackage,
            feiyong: busSubmenusItem.feiyong,
            roughWeight:busSubmenusItem.roughWeight,
            volume: busSubmenusItem.volume,
            id: busSubmenusItem.id ? busSubmenusItem.id : 0,
            chargedWeight: busSubmenusItem.chargedWeight,
            addressee: busSubmenusItem.addressee,
            // tradeType: tradeType.split(",")
          }

          this.$set(this.mast_info["busSubmenuSaveDTOS"], argumentsKey, busSubmenu_item)
        }

      })
    },
    dataRemove(index){
      if(this.mainTypeSelected == '' || this.mainTypeSelected == '0'){
        return
      }
      this.$delete(this.mast_info.busSubmenuSaveDTOS, index)
    },
    dataAdd(){
      if(this.mainTypeSelected == '' || this.mainTypeSelected == '0'){
        return
      }
      this.mast_info.busSubmenuSaveDTOS.push(
          {
            submenuNo: '',
            zhuanguan_order: '',
            submenuNumPackage: "",feiyong: "", pinming_shu:"",baoguan_daili:"", baoguan_type:"" , sale_monad:"" ,destination:"",is_jingnei:"",jianguan_type:"",roughWeight:"", volume: "", chargedWeight: "", addressee: "", tradeType:[]},
      )
    },
    /***
     * 分单信息修改及添加
     * @param index  修改的索引
     */
    dataEdit(index){
      if(this.mainTypeSelected == '' || this.mainTypeSelected == '0'){
        return
      }
      let dataList = this.mast_info.busSubmenuSaveDTOS[index]
      this.$set(dataList, "data_index", index)
      this.$set(dataList, "yewu_type", this.mast_info.yewu_type)
      this.$set(dataList, "mainTypeSelected", this.mast_info.mainTypeSelected)
      this.edit_data = dataList
      this.$refs["houseInfoDialog"]["dialogVisible"] = true
    },

    /***
     * 修改后
     * @param houseNoInfo
     */
    editHouseNo(houseNoInfo){
      this.edit_data = {}
      let index = houseNoInfo['data_index']
      this.$delete(houseNoInfo, 'data_index')
      this.$delete(houseNoInfo, 'yewu_type')
      this.$set(this.mast_info.busSubmenuSaveDTOS, index, houseNoInfo)
      this.$refs["houseInfoDialog"]["dialogVisible"] = false
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
      this.mast_info.zhuanguan_number = ""
      this.mast_info.feiyong = ""
      this.mast_info.is_jingnei = ""
      this.mast_info.yewu_type = ""
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
      this.mast_info.baoguan_type = ""
      this.mast_info.jianguan_type = ""
      this.mast_info.mast_order_number = ""
      this.mast_info.mast_number = ""
      this.mast_info.mast_weight = ""
      this.mast_info.mast_type = ""
      this.mast_info.mast_volume = ""
      this.mast_info.marks = ""
      this.mast_info.tradeNo = ""
      this.mast_info.sale_monad = ""
      this.mast_info.busSubmenuSaveDTOS = [
          {
            submenuNo: '',
            submenuNumPackage: "", feiyong: "" , pinming_shu:"",baoguan_daili:"",sale_monad:"",jianguan_type:"",is_jingnei:"",baoguan_type: "",destination: "", roughWeight:"", volume: "", chargedWeight: "", addressee: "", tradeType:[]},
      ]
      this.mainTypeSelected = []
    },
    addData(){

      let origin_data = this.mast_info
      let arrays = new Array()
      for (let trace_type in origin_data.busSubmenuSaveDTOS) {
        let dtos = {
          id:origin_data.busSubmenuSaveDTOS[trace_type].id ? origin_data.busSubmenuSaveDTOS[trace_type].id : 0,
          submenuNo: origin_data.busSubmenuSaveDTOS[trace_type].submenuNo,
          submenuNumPackage: origin_data.busSubmenuSaveDTOS[trace_type].submenuNumPackage,
          jianguan_type: origin_data.busSubmenuSaveDTOS[trace_type].jianguan_type,
          feiyong: origin_data.busSubmenuSaveDTOS[trace_type].feiyong,
          sale_monad: origin_data.busSubmenuSaveDTOS[trace_type].sale_monad,
          pinming_shu: origin_data.busSubmenuSaveDTOS[trace_type].pinming_shu,
          baoguan_daili: origin_data.busSubmenuSaveDTOS[trace_type].baoguan_daili,
          baoguan_type: origin_data.busSubmenuSaveDTOS[trace_type].baoguan_type,
          roughWeight: origin_data.busSubmenuSaveDTOS[trace_type].roughWeight,
          volume: origin_data.busSubmenuSaveDTOS[trace_type].volume,
          chargedWeight: origin_data.busSubmenuSaveDTOS[trace_type].chargedWeight,
          addressee: origin_data.busSubmenuSaveDTOS[trace_type].addressee,
          tradeType: origin_data.busSubmenuSaveDTOS[trace_type].tradeType,
          zhuanguan_order: origin_data.busSubmenuSaveDTOS[trace_type].zhuanguan_order
        }
        // console.log(origin_data.busSubmenuSaveDTOS[trace_type].tradeType);
        //   console.log(origin_data.busSubmenuSaveDTOS[trace_type].tradeType.join(","))
        arrays.push(dtos)
        console.log(dtos)
      }

      console.log(arrays)
      this.$set(origin_data, "busSubmenuSaveDTOS", arrays)


      if (this.mast_info.flight_time){
        //let date = new Date(this.mast_info.flight_time)
        //this.mast_info.flight_time = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
      } else{
        this.mast_info.flight_time = ""
      }
      // TODO    1213o99
      let data = {
        addressee                       : this.mast_info.addresser_info,            // 发件人
        addressor                       : this.mast_info.receiver_info,             // 收件人
        busSubmenuSaveDTOS              : [],                                       // 分单信息
        businessType                    : this.mast_info.yewu_type,                 // 业务类型 1.统一版进口 2.统一版出口 3.转关
        clearancePort                   : this.mast_info.exit_port,                 // 通关口岸
        currency                        : this.mast_info.currency,                  // 币种
        customerIdOne                   : this.mast_info.customerIdOne,             // 一级客户
        customerIdTwo                   : this.mast_info.customerIdTwo,             // 二级客户
        customsBroker                   : this.mast_info.company_agency,            // 报关代理
        customsDeclareType              : this.mast_info.baoguan_type,              // 报关类型 1.贸易代理 2.报关代理 3.企业自理
        departurePort                   : this.mast_info.destination,               // 始发港
        destinationPort                 : this.mast_info.destination,               // 目的港
        domesticDelivery                : this.mast_info.is_jingnei,                // 是否境内送货
        domesticSuperviseTransit        : this.mast_info.is_jingnei,                // 是否境内监管中转
        expense                         : this.mast_info.feiyong,                   // 费用
        flightDate                      : this.mast_info.flight_time,               // 航班时间
        flightNo                        : this.mast_info.flight_number,             // 航班号
        goodsValue                      : this.mast_info.goodsValue,                // 货值
        mainChargedWeight               : this.mast_info.mast_expense,              // 主单计费重
        mainNo                          : this.mast_info.mast_order_number,         // 主单号
        mainNumPackage                  : parseInt(this.mast_info.mast_number),     // 主单件数
        mainType                        : parseInt(this.mainTypeSelected),          // 主单类型 1.直单 2.一主多分
        nameNum                         : parseInt(this.mast_info.descriptionNum),  // 品名数量
        portEntry                       : this.mast_info.clearance_port,            // 报关口岸
        productionSaleUnit              : this.mast_info.sale_monad,                // 生产销售单位
        remark                          : this.mast_info.remark,                    // 备注
        supervisionMethod               : this.mast_info.jianguan_type,             // 监管方式
        transitNo                       : this.mast_info.zhuanguan_order ,          // 转关单号
        mainRoughtWeight                : this.mast_info.mast_weight,               // 主单毛重
      }

      // true:  始发港  false:  目的港
      // if (this.mast_info.yewu_type == '1'){
      //   delete data.departurePort
      // }else{
      //   delete data.destinationPort
      // }
      // true:  境内送货  false:  境内监管中转
     // if (this.mast_info.yewu_type != '3'){
     //    delete data.domesticDelivery
     //
     //  }else{
     //    delete data.domesticSuperviseTransit
     //  }

      if(this.mast_info.busSubmenuSaveDTOS.length > 0){
        for (let item of this.mast_info.busSubmenuSaveDTOS) {
          console.log(item)

          let dto = {
            id                           : item.id,
            mainNo                       : this.mast_info.mast_order_number,           // 主单号
            submenuNo                    : item.submenuNo,                             // 分单号
            nameNum                      : parseInt(item.pinming_shu),                 // 品名数量
            productionSaleUnit           : item.sale_monad,                            // 销售单位
            supervisionMethod            : parseInt(item.jianguan_type),               // 监管方式
            submenuNumPackage            : parseInt(item.submenuNumPackage),           // 分单件数
            feiyong                      : item.feiyong,                               // 费用
            pinming_shu                  : item.pinming_shu,                           // 品名数量
            subRoughWeight               : item.roughWeight,                           // 毛重
            expense                      : item.feiyong,                               // 费用
            domesticDelivery             : item.is_jingnei,                            //
            domesticSuperviseTransit     : item.is_jingnei,                            //
            departurePort                : item.destination,                           // 始发港
            destinationPort              : item.destination,                           // 目的港
            customsDeclareType           : parseInt(item.baoguan_type),      // 报关类型
            customsBroker                : item.baoguan_daili,                         // 报关代理
            transitNo                    : item.transitNo                              // 转关单号
          }
          if(!item.id){
            delete dto.id
          }
          // true:  始发港  false:  目的港
          // if (this.mast_info.yewu_type == '1'){
          //   delete dto.departurePort
          // }else{
          //   delete dto.destinationPort
          // }

          // true:  境内送货  false:  境内监管中转
          // if (this.mast_info.yewu_type != '3'){
          //   delete dto.domesticDelivery
          //
          // }else{
          //   delete dto.domesticSuperviseTransit
          // }

          data.busSubmenuSaveDTOS.push(dto)
        }
      }
      if (this.mainTypeSelected == '0'){
         data.busSubmenuSaveDTOS = []
      }

      // if(this.mainTypeSelected && this.mainTypeSelected.length > 0){
      //   data.mainType = this.mainTypeSelected.join(',')
      // }

      if(this.mast_info.id > 0){

        for (const originDataKey in data.busSubmenuSaveDTOS) {
          let submenuNumPackage = data.busSubmenuSaveDTOS[originDataKey].submenuNumPackage
          data.busSubmenuSaveDTOS[originDataKey].submenuNumPackage = parseInt(submenuNumPackage)
        }

        data.descriptionNum = parseInt(data.descriptionNum)
        data.id = parseInt(data.id)


        data.id = this.mast_info.id


        editOrder(data).then(res=>{
          this.$message.success("成功");
          this.$router.back()
        }).catch(err=>{
          this.mast_info = origin_data
        })
      }else{
        addOrder(data).then(res=>{
          this.$message.success("成功");
          // this.$router.back()
        })
      }



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
    width: 97%;
    height: auto;
    margin:20px auto;
  }
  .house_bill_content{
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 15px;
    position: relative;
  }
  .house_bill_content>.form_item{
    width: calc(90% / 4);
    display: flex;
    justify-items: center;
    align-items: center;
    margin-right: 10px;
    margin-bottom: 20px;
    position: relative;
    z-index: 5;
  }
  .form_item>span{
    width: 50%;
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
    width: 10%!important;
    justify-content: flex-end;
    display: flex;
    position: absolute!important;
    top: 5px;
    right: 0;
    z-index: 4!important;
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
