<template>
  <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      top="3vh"
      width="60%"
      >
        <div class="order_flow">

          <div class="order_flow_content">
            <el-timeline>
              <el-timeline-item v-for="(item, index) in order_flow" :timestamp="item.title" :key="index" placement="top">
                <el-card>
                  <el-row>
                    <el-col v-for="(item, indexs) in item.about_info" :key="indexs" :span="6">
                     {{ indexs }}: {{ item }}
                    </el-col>
                    <el-col :span="12" class="down_group">
                      操作时间: 2020年10月22日
                    </el-col>
                    <el-col :span="12" class="down_group">{{ item.title == '转关异常' ? '异常原因' : '备注' }}: {{item.marks}}</el-col>
                    <el-col :span="24" class="down_group">
                      <el-button  @click="DownLoad(items.url['fileType'], items.url['nodeType'])" size="small" type="primary" v-for="(items, index) in item.download" :key="index">{{ items.title }}</el-button>
                    </el-col>

                  </el-row>
                   </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
    <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="closeDialog">确 定</el-button>
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
      dialogVisible:true,
      mainNo: "",
      order_flow:[
        {
          title:"提交报关",
          about_info:{

          },
          download: [
            {title: "下载附件(0)", url: this.getDownLoadUrl(0, 1)},
          ],
          marks:"",
          operater_time:""
        },    //1
        {
          title:"提交查验",
          about_info:{
          },
          download: [
            {title: "下载查验通知书(附件)(0)", url: this.getDownLoadUrl(0, 3)},
          ],
          marks:"",
          operater_time:""
        },       //2
        {
          title:"查验操作",
          about_info: [],
          download: [
            {title: "下载现场查验图片(0)", url: this.getDownLoadUrl(0, 4)},
          ],
          marks:"",
          operater_time:""
        },       //3
        {
          title:"提交放行",
          about_info: {},
          download: [
            {title: "下载放行通知单附件(0)", url: this.getDownLoadUrl(0, 5)},
          ],
          marks:"",
          operater_time:""
        },    //4
        {
          title:"放行出库",
          about_info: {},
          download: [
            {title: "下载放行通知单附件(0)", url: this.getDownLoadUrl(2, 6)},
            {title: "下载报关单附件(0)", url: this.getDownLoadUrl(1, 6)},
            {title: "下载出库单附件(0)", url: this.getDownLoadUrl(1, 6)},
          ],
          marks:"",
          operater_time:""
        },       //5
        {
          title:"提交转关",
          about_info: {
            "转关单号": "",
            "车辆型号": "",
            "车牌号": "",
          },
          download: [
            {title: "下载主单复印件(0)", url: this.getDownLoadUrl(0, 7)},
            {title: "下载转关单据附件(0)", url: this.getDownLoadUrl(0, 7)},
          ],
          marks:"",
          operater_time:""
        },       //6
        {
          title:"提货操作",
          about_info:{
            "姓名": "",
            "身份证号": "",
            "地址": "",

          },
          download: [
            {title: "驾驶证复印件(附件)(0)", url: this.getDownLoadUrl(3, 11)},
            {title: "行驶证照片(附件)(0)", url: this.getDownLoadUrl(0, 11)},
            {title: "车辆照片(附件)(0)", url: this.getDownLoadUrl(0, 11)},
          ],
          marks:"",
          operater_time:""
        },    //7
        {
          title:"提交退单",
          about_info:{},
          download: [
            {title: "退单文件(附件)(0)", url: this.getDownLoadUrl(3, 10)},
          ],
          marks:"",
          operater_time:""
        },    //8
        {
          title:"退库完成",
          about_info:{
          },
          download: [
            {title: "现场出库照片(附件)(0)", url: this.getDownLoadUrl(3, 8)},
          ],
          marks:"",
          operater_time:""
        },  //9
      ]
    }
  },
  mounted() {
    this.getData()
  },
  methods:{
    getData(){
      this.mainNo = this.orderInfo.mainNo
      let data = {
        mainNo: this.orderInfo.mainNo
      }
      getMainOrder(data).then(res=>{
        // 入库查验
        this.order_flow[0].marks = res.data.incomingCheckRemark;


        //提交报关
        this.order_flow[1].marks = res.data.commitCustomsRemark;


        //提交查验
        this.order_flow[2].marks = res.data.commitCheckRemark;

        // 退单
        this.order_flow[3].marks = res.data.chargebackRemark

        // 退单完成
        this.order_flow[4].marks = res.data.chargebackedRemark

        // 退库
        this.order_flow[5].marks = res.data.cancelStocksRemark

        // 放行
        this.order_flow[6].marks = res.data.commitPermitRemark


        // 境内送货
        this.order_flow[7].marks = res.data.incountryRemark

        // 货物送达
        this.order_flow[8].marks = res.data.goodsDeliveredRemark

        // 提货车辆信息
        this.order_flow[9]["about_info"]["预计到达时间"] = res.data.pickUpCarETA
        this.order_flow[9]["about_info"]["车牌号"] = res.data.pickUpCarLPN
        this.order_flow[9]["about_info"]["车辆型号"] = res.data.pickUpCarModelCar
        this.order_flow[9].marks = res.data.pickUpCarRemark

        // 提货交接
        this.order_flow[10].marks = res.data.pickUpGoodsConnectRemark

        // 提交转关
        this.order_flow[11]["about_info"]["预计到达时间"] = res.data.commitCustomsTransitETA
        this.order_flow[11]["about_info"]["车牌号"] = res.data.commitCustomsTransitLPN
        this.order_flow[11]["about_info"]["车辆型号"] = res.data.commitCustomsTransitModelCar
        this.order_flow[11]["about_info"]["转关单号"] = res.data.customsTransitNo
        this.order_flow[11].marks = res.data.commitCustomsTransitRemark

        // 转关
        this.order_flow[12].marks = res.data.customsTransitRemark

        // 转关异常
        this.order_flow[13].marks = res.data.exceptionCause

        // 转关完毕
        this.order_flow[14].marks = res.data.customsTransitCompleteRemark











        // 放行
        this.order_flow[6].marks = res.data.commitCustomsTransitRemark
        this.order_flow[6].marks = res.data.commitCustomsTransitRemark



      })
    },
    getDownLoadUrl(fileType, nodeType){
      return {fileType, nodeType}
    },
    DownLoad(fileType, nodeType){

      window.open(`${process.env.VUE_APP_URL}/busUploadFile/downloadFile?fileType=${fileType}&mainNo=${this.mainNo}&nodeType=${nodeType}`)
    },
    closeDialog(){
      this.$emit("onCloseDialog")
    },
    handleClose(){
      this.dialogVisible = true
      this.$emit("onCloseDialog")
    }
  }
}
</script>

<style scoped>
  .order_flow{
    width: 100%;
    height: 650px;
    overflow-y: auto;

  }

  .order_flow_content{
    width: 90%;
    margin: 0 auto;
  }
  .down_group{
    margin: 0;
  }
  /deep/ .el-card__body{
    padding-top: 5px;
    padding-bottom: 5px
  }
</style>
