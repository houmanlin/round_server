<template>
  <el-dialog
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">

      <div class="container">

        <el-table :data="dataList" style="height:300px">
          <el-table-column property="nodeTypeValue" label="时间" style="width:100%"></el-table-column>
        </el-table>
        <el-pagination
          class="pagination"
          :pagerCount="21"
          :current-page="page_config.current"
          layout="prev, pager, next"
          :total="page_config.total"
          @current-change="checkPage"
          >
      </el-pagination>
      </div>
  </el-dialog>

</template>

<script>
import {getPages} from "@/utils/utils";
import {getBusNodeMulti} from "@/api/import_bussiness";
export default {

  // props: ["dataList"],
  // props: ["mainNo","submenuNo","nodeOperationType"],
  props: ["orderInfo"],
  name: "nodeListDialog",
  
  data(){
    return{
      dataList:[],
      dialogVisible: false,
      page_config: {}
    }
  },
  methods:{
    handleClose(){
      this.dialogVisible = false
    },
    checkPage(e){
      this.page_config.current = e
      this.getData()
    },
    getData(){
      let data = {
        limit                   : this.page_config.limit,
        page                    : this.page_config.current,
        mainNo                  : this.orderInfo.mainNo,
        submenuNo               : this.orderInfo.submenuNo?this.orderInfo.submenuNo:'',
        nodeOperationType       : this.orderInfo.nodeOperationType
      }
      getBusNodeMulti(data).then(res=>{
        this.page_config = getPages(res.data)
        this.dataList = res.data.records
      })
    }
  },
  created() {
    this.page_config = getPages()
  },
  mounted() {},
  watch:{
    orderInfo(val){
      if(val && val.mainNo && this.dialogVisible){
        this.getData()
      }
    }
  }
}
</script>

<style scoped>

.container{
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 400px;
  align-items: flex-end
}

</style>
