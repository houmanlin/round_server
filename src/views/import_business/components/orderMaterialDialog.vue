<template>
  <el-dialog
      :visible.sync="dialogVisible"
      width="60%"
      >
        <div class="order_flow">

          <div class="order_flow_content">
            <el-timeline>
              <el-timeline-item v-for="(item, index) in order_flow" :timestamp="item.title" :key="index" placement="top">
                <el-card>
                  <el-row>
                    <el-col v-for="(item, indexs) in item.about_info" :key="indexs" :span="10">
                     {{ indexs }}: {{ item }}
                    </el-col>
                    <el-col :span="24" class="down_group">
                      <el-button size="small" type="primary" v-for="(items, index) in item.download" :key="index">{{ items.title }}(附件)</el-button>
                    </el-col>
                  </el-row>
                  <div>{{ item.title == '转关异常' ? '异常原因' : '备注' }}: {{item.marks}}</div>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
    <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
import {getMainOrder} from "@/api/import_bussiness";

export default {
  props: [ "orderInfo" ],
  name: "list",
  data(){
    return{
      dialogVisible:false,
      order_flow:[
        {
          title:"入库查验",
          about_info:{},
          download: [
            {title: "下载入库照片", url: ""},
          ],
          marks:""
        },    //0
        {
          title:"提交报关",
          about_info:{
            "报关服务商": "",
            "报关单号":"",
          },
          download: [
            {title: "下载最终版报关材料", url: ""},
          ],
          marks:""
        },    //1
        {
          title:"查验",
          about_info:{
          },
          download: [
            {title: "下载查验单据扫描(附件)", url: ""},
          ],
          marks:""
        },       //2
        {
          title:"退单",
          about_info: [],
          download: [
            {title: "下载退单材料", url: ""},
          ],
          marks:""
        },       //3
        {
          title:"退单完成",
          about_info: [],
          download: [
            {title: "下载退单完毕单据", url: ""},
          ],
          marks:""
        },    //4
        {
          title:"退库",
          about_info: [],
          download: [
            {title: "下载退库单", url: ""},
            {title: "下载装车照片", url: ""},
          ],
          marks:""
        },       //5
        {
          title:"放行",
          about_info: [],
          download: [
            {title: "下载放行单据", url: ""},
          ],
          marks:""
        },       //6
        {
          title:"境内送货",
          about_info:{
            "预计到达时间": "",
            "车牌号": "",
            "车辆型号": "",
            "送货费": ""
          },
          download: [
            {title: "车辆照片(附件)", url: ""},
            {title: "其它才材料(附件)", url: ""},
          ],
          marks:""
        },    //7
        {
          title:"货物送达",
          about_info:[],
          download: [
            {title: "车辆照片(附件)", url: ""},
            {title: "货物照片(附件)", url: ""},
            {title: "现成照片(附件)", url: ""},
          ],
          marks:""
        },    //8
        {
          title:"提交提货车辆信息",
          about_info:{
            "车辆型号":"",
            "车牌号":"",
            "预计到达时间": "",
          },
          download: [
            {title: "车辆照片(附件)", url: ""},
            {title: "其它才材料(附件)", url: ""},
          ],
          marks:""
        },  //9
        {
          title:"提货交接",
          about_info:{
            "提货交接": "",
            "预计到达时间": "",
            "车辆型号": "",
            "车牌照": "",
          },
          download: [
            {title: "下载转关单据", url: ""},
          ],
          marks:""
        },      //10
        {
          title:"提交转关",
          about_info:{
            "车辆型号":"",
            "车牌号":"",
            "预计到达时间": "",
            "转关单号": "",
          },
          download: [
            {title: "下载转关单据", url: ""},
          ],
          marks:""
        },       //11
        {
          title:"转关",
          download: [
            {title: "附件(附件)", url: ""},
          ],
          marks:""
        },          //12
        {
          title:"转关异常",
          download: [
            {title: "附件(附件)", url: ""},
          ],
          marks:""
        },      //13
        {
          title:"转关完毕",
          download: [
            {title: "附件(附件)", url: ""},
          ],
          marks:""
        },      //14
      ]
    }
  },
  updated() {
    this.getData()
  },
  methods:{
    getData(){
      let data = {
        mainNo: this.orderInfo.mainNo
      }
      getMainOrder(data).then(res=>{
        this.order_flow[5].marks = res.data.cancelStocksRemark
        this.order_flow[3].marks = res.data.chargebackRemark
        this.order_flow[4].marks = res.data.chargebackedRemark
        this.order_flow[2].marks = res.data.commitCheckRemark
        // 转关完毕
        this.order_flow[14].marks = res.data.customsTransitCompleteRemark

        // 转关异常
        this.order_flow[13].marks = res.data.exceptionCause

        // 转关
        this.order_flow[12]["about_info"]["转关单号"] = res.data.customsTransitNo
        this.order_flow[12].marks = res.data.customsTransitRemark
        // 提货交接
        this.order_flow[10].marks = res.data.pickUpGoodsConnectRemark
        // 提货车辆信息
        this.order_flow[9]["about_info"]["预计到达时间"] = res.data.pickUpCarETA
        this.order_flow[9]["about_info"]["车牌号"] = res.data.pickUpCarLPN
        this.order_flow[9]["about_info"]["车辆型号"] = res.data.pickUpCarModelCar
        this.order_flow[9].marks = res.data.pickUpCarRemark
        // 货物送达
        this.order_flow[8].marks = res.data.goodsDeliveredRemark
        // 境内送货
        this.order_flow[7]["about_info"]["送货费"] = res.data.deliveryExpense
        this.order_flow[7]["about_info"]["预计到达时间"] = res.data.incountryETA
        this.order_flow[7]["about_info"]["车牌号"] = res.data.incountryLPN
        this.order_flow[7]["about_info"]["车辆型号"] = res.data.incountryModelCar
        this.order_flow[7].marks = res.data.incountryRemark
        this.order_flow[7].marks = res.data.incountryRemark



        // 提交转关
        this.order_flow[11]["about_info"]["预计到达时间"] = res.data.commitCustomsTransitETA
        this.order_flow[11]["about_info"]["车牌号"] = res.data.commitCustomsTransitLPN
        this.order_flow[11]["about_info"]["车辆型号"] = res.data.commitCustomsTransitModelCar
        this.order_flow[11].marks = res.data.commitCustomsTransitRemark
        // 放行
        this.order_flow[6].marks = res.data.commitCustomsTransitRemark
        this.order_flow[6].marks = res.data.commitCustomsTransitRemark

        //提交报关
        this.order_flow[1]["about_info"]["报关单号"] = res.data.commitCustomsTransitRemark
        this.order_flow[1]["about_info"]["报关服务商"] = res.data.customsServiceProvider
        // this.order_flow[1].marks = res.data.commitCustomsRemark
        this.order_flow[1].marks = res.data.incomingCheckRemark
      })
    }
  }
}
</script>

<style scoped>
  .order_flow{
    width: 100%;
    height: 400px;
    overflow-y: auto;

  }

  .order_flow_content{
    width: 90%;
    margin: 0 auto;
  }
  .down_group{
    margin: 15px 0;
  }
</style>
