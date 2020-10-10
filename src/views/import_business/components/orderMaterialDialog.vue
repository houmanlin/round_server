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
                  <el-button type="text">下载</el-button>
                  <el-input v-model="item.marks"></el-input>
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
        {title:"提交报关", download_url: "http://www.baidu.com", marks:"王小虎 提交于 2018/4/12 20:46"},
        {title:"查验", download_url: "http://www.baidu.com", marks:"王小虎 提交于 2018/4/12 20:46"},
        {title:"退单", download_url: "http://www.baidu.com", marks:"王小虎 提交于 2018/4/12 20:46"},

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
</style>
