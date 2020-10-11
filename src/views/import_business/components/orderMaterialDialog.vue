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

                    <el-col :span="24" class="down_group">
                      <el-button size="small" type="primary" v-for="(items, index) in item.download" :key="index">{{ items.title }}(附件)</el-button>
                    </el-col>
                  </el-row>
                  <div>备注:{{item.marks}}</div>
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
export default {
  name: "list",
  data(){
    return{
      dialogVisible:false,
      order_flow:[
        {
          title:"入库查验",
          download: [
            {title: "下载入库照片", url: ""},
          ],
          marks:"王小虎 提交于 2018/4/12 20:46"
        },
        {
          title:"提交报关",

          download: [
            {title: "下载最终版报关材料", url: ""},
          ],
          marks:"王小虎 提交于 2018/4/12 20:46"
        },
        {
          title:"查验",

          download: [
            {title: "下载入库照片", url: ""},
          ],
          marks:"王小虎 提交于 2018/4/12 20:46"
        },
        {
          title:"退单",

          download: [
            {title: "下载退单材料", url: ""},
          ],
          marks:"王小虎 提交于 2018/4/12 20:46"
        },
        {
          title:"退单完成",

          download: [
            {title: "下载退单完毕单据", url: ""},
          ],
          marks:"王小虎 提交于 2018/4/12 20:46"
        },
        {
          title:"退库",

          download: [
            {title: "下载退库单", url: ""},
            {title: "下载装车照片", url: ""},
          ],
          marks:"王小虎 提交于 2018/4/12 20:46"
        },
        {
          title:"放行",
          download: [
            {title: "下载放行单据", url: ""},
          ],
          marks:"王小虎 提交于 2018/4/12 20:46"
        },
        {
          title:"境内送货",
          download: [
            {title: "车辆照片(附件)", url: ""},
            {title: "其它才材料(附件)", url: ""},
          ],
          marks:"王小虎 提交于 2018/4/12 20:46"
        },
        {
          title:"货物送达",
          download: [
            {title: "车辆照片(附件)", url: ""},
            {title: "货物照片(附件)", url: ""},
            {title: "现成照片(附件)", url: ""},
          ],
          marks:"王小虎 提交于 2018/4/12 20:46"
        },
        {
          title:"提交提货车辆信息",

          download: [
            {title: "车辆照片(附件)", url: ""},
            {title: "其它才材料(附件)", url: ""},
          ],
          marks:"王小虎 提交于 2018/4/12 20:46"
        },
        {
          title:"提货交接",

          download: [
            {title: "车辆照片(附件)", url: ""},
            {title: "其它才材料(附件)", url: ""},
          ],
          marks:"王小虎 提交于 2018/4/12 20:46"
        },
        {
          title:"提货转关",
          download: [
            {title: "车辆照片(附件)", url: ""},
            {title: "其它才材料(附件)", url: ""},
          ],
          marks:"王小虎 提交于 2018/4/12 20:46"
        },
        {
          title:"转关",
          download: [
            {title: "附件(附件)", url: ""},
          ],
          marks:"王小虎 提交于 2018/4/12 20:46"
        },
        {
          title:"转关异常",
          download: [
            {title: "附件(附件)", url: ""},
          ],
          marks:"王小虎 提交于 2018/4/12 20:46"
        },
        {
          title:"转关完毕",
          download: [
            {title: "附件(附件)", url: ""},
          ],
          marks:"王小虎 提交于 2018/4/12 20:46"
        },
      ]
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
