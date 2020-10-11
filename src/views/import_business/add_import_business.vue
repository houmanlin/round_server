<template>
  <div class="view_container">
    <div class="aviation_title">航空主单录入</div>
    <el-form :inline="true" :model="mast_info" size="medium" label-width="80px" label-position="left" class="demo-form-inline">

      <el-form-item label="一级客户">
        <el-select v-model="mast_info.client_name" filterable placeholder="请输入字段名">
          <el-option label="杨哥" value="1"></el-option>
          <el-option label="吕哥" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级客户">
        <el-select v-model="mast_info.client_name" filterable placeholder="请输入字段名">
          <el-option label="杨哥" value="1"></el-option>
          <el-option label="吕哥" value="2"></el-option>
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
                placeholder="选择航班日期">
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

        <div class="house_bill_content" v-for="(item, index) in mast_info.house_bill">
          <!-- 分单号-->
          <div class="form_item">
            <span>分单号</span>
            <el-input v-model="item.host_bill_order" placeholder="请输入主单号"></el-input>
          </div>
          <!-- 分单件数-->
          <div class="form_item">
            <span>分单件数</span>
            <el-input v-model="item.house_bill_number" placeholder="请输入分单件数"></el-input>
          </div>
          <!-- 分单毛重-->
          <div class="form_item">
            <span>分单毛重</span>
            <el-input v-model="item.house_bill_weight" placeholder="请输入分单毛重"></el-input>
          </div>
          <!-- 分单体积-->
          <div class="form_item">
            <span>分单体积</span>
            <el-input v-model="mast_info.house_bill_volume" placeholder="请输入分单体积"></el-input>
          </div>
          <!-- 分单计费量-->
          <div class="form_item">
            <span>分计费量</span>
            <el-input v-model="mast_info.house_bill_expense" placeholder="请输入主单号"></el-input>
          </div>
          <!-- 收件人-->
          <div class="form_item">
            <span>收件人</span>
            <el-input v-model="mast_info.receiver" placeholder="请输入收件人"></el-input>
          </div>
          <div class="form_item">
            <span>贸易类型</span>
            <el-select filterable multiple v-model="mast_info.trade_type" placeholder="请选择贸易方式">
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
            <el-button type="primary" icon="el-icon-plus" circle @click="dataAdd"  v-if="parseInt(index)+1 == mast_info.house_bill.length"></el-button>
            <el-button icon="el-icon-minus" circle  @click="dataRemove(index)" v-if="parseInt(index)+1 != mast_info.house_bill.length"></el-button>
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
              <el-input v-model="mast_info.mast_order_number" placeholder="请输入货值"></el-input>
            </el-form-item>
            <el-form-item label="商品数量">
              <el-input v-model="mast_info.flight_number" placeholder="请输入商品数量"></el-input>
            </el-form-item>
            <el-form-item label="通关单号">
              <el-input v-model="mast_info.destination" placeholder="请输入通关单号"></el-input>
            </el-form-item>

            <el-form-item label="贸易单号">
              <el-input v-model="mast_info.mast_number" placeholder="请输入贸易单号"></el-input>
            </el-form-item>
            <el-form-item label="合同编号">
              <el-input v-model="mast_info.mast_weight" placeholder="请输入合同编号"></el-input>
            </el-form-item>
            <el-form-item label="生成销售单位">
              <el-input v-model="mast_info.sale_monad" placeholder="请输入生成销售单位"></el-input>
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
      <el-button type="primary">保存</el-button>
      <el-button class="reset_button">重置</el-button>
    </div>


  </div>
</template>

<script>
import { TRADE_TYPE_GROUP } from '@/config/selectData'
export default {
  name: "add_import_business",
  data(){
    return{
      trade_type_list         : TRADE_TYPE_GROUP,
      mast_info:{
        client_name           : "",       //客户类型
        mast_type             : "",       //主单类型
        clearance_port        : "",       //报关口岸
        exit_port             : "",       //离境口岸
        mast_order_number     : "",       //主单号
        flight_number         : "",       //航班号
        destination           : "",       //目的港口
        flight_time           : "",       //航班时间
        mast_number           : "",       //主单数量
        mast_weight           : "",       //主单重量
        mast_volume           : "",       //主单体积
        mast_expense          : "",       //主单费用
        trade_type            : "",       //贸易方式
        sale_monad            : "",       //销售单位
        company_agency        : "",       //公司代理
        marks                 : "",       //备注
        house_bill            : [
          {host_bill_order: '', house_bill_number: "", house_bill_weight:"", house_bill_volume: "", house_bill_expense: "", receiver: ""},

        ],                                //分单信息
        addresser_info         : "",      //发件人信息
        receiver_info          : "",      //收件人信息
      }
    }
  },
  methods:{
    dataRemove(index){
      this.$delete(this.mast_info.house_bill, index)
    },
    dataAdd(){
      this.mast_info.house_bill.push(
          {host_bill_order: '', house_bill_number: "", house_bill_weight:"", house_bill_volume: "", house_bill_expense: "", receiver: ""}
      )
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
    width: 70%;
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
