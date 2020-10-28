<template>
  <el-table
      :data="tableData"
      border
      height="400"
      @selection-change="handleSelectionChange"
      style="width: 100%"
      @row-click="double_click"
      >

    <template v-for="(item, index) in tableHeader" >
      <el-table-column align="center" fixed="left" v-if="index==0" type="expand" >
        <template slot-scope="props">
          <el-table
              :data="props.row['busSubmenuListVOS']"
              :height="500"
              @cell-click="double_click"
              @selection-change="handleSelectionChange2"
             >

            <template v-for="(items, indexs) in tableHeader" >

             <el-table-column
                  v-if="indexs == 0"
                  type="selection"
                  align="center"
                  width="103">
              </el-table-column>
              <el-table-column
                  v-if="indexs == 0"
                  fixed="left"
                  label="序号"
                  align="center"
                  type="index"
                  width="50"> 
              </el-table-column>

              <el-table-column
                  :key="indexs"
                  align="center"
                  v-if="items.label != '操作' && items.label != '主单号/分单号'"
                  :fixed="item.label == '状态' || item.label == '业务类型' || item.label == '一级客户' ||  item.label == '二级客户' || item.label == '主单号/分单号' ? 'left' : false "
                  show-overflow-tooltip
                  :min-width="items.label == '状态' || items.label == '业务类型' || items.label == '一级客户' ||  items.label == '二级客户' || items.label == '主单号/分单号' ? '131' : '200'"
                  :label="items.label">
                  <template v-if="items.label == '放行出库'">
                    <el-button @click.native.stop="checkNodeDetaiList(props.row['busSubmenuListVOS'][scope.$index],3)" type="text">{{ props.row[items.prop] }}</el-button>
                  </template>
                  <template v-else-if="items.label == '查验操作'">
                    <el-button @click.native.stop="checkNodeDetaiList(props.row['busSubmenuListVOS'][scope.$index],1)" type="text">{{ props.row[items.prop] }}</el-button>
                  </template>
                  <template v-else>
                    {{ props.row[items.prop] }}
                  </template>
              </el-table-column>

              <el-table-column align="center"
                               v-else-if="items.label == '主单号/分单号'"
                               :prop="items.prop"
                               fixed="left"
                               show-overflow-tooltip
                               min-width="200"
                               :label="items.label">
                <template slot-scope="scope">
                  <el-button @click="checkOrderInfoSubmenu(props.row['busSubmenuListVOS'][scope.$index])" type="text">{{scope.row.mainNo}}</el-button>
                </template>
              </el-table-column>

              <el-table-column
                  align="center"
                  :key="indexs"
                  v-else-if="items.label == '操作'"
                  fixed="right"
                  label="操作"
                  width="180">
                <template slot-scope="scope">
                  <template v-if="items.label == '操作'">

                    <el-upload
                        class="upload-demo"
                        ref="upload"
                        v-for="(operator_item, idx) in items.prop"
                        :key="idx"
                        v-if="operator_item == '上传' || operator_item == '上传文件'"
                        :data="getPostDataSub(props.row['busSubmenuListVOS'][scope.$index],0)"
                        multiple
                        :action="uploadSingle"
                        :file-list="fileList"
                        :on-success="handleResultSuccess"
                        :on-error="handleResultError"
                        :show-file-list="false"
                    >
                      <el-button  type="text"
                                  size="small"
                                  >{{operator_item}}</el-button>
                    </el-upload>
                    <el-button 
                        v-if="operator_item != '上传' && operator_item != '上传文件'" 
                        v-for="(operator_item, indexs) in items.prop" 
                        :key="indexs" 
                        @click="checkOrderInfoSub(props.row['busSubmenuListVOS'][scope.$index], operator_item)" 
                        type="text" 
                        size="small">
                        {{operator_item}}
                    </el-button>
                  </template>
                </template>
              </el-table-column>

            </template>

          </el-table>
        </template>
      </el-table-column>


      <el-table-column align="center"
          v-if="index == 0"
          fixed="left"
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column
          v-if="index == 0"
          fixed="left"
          label="序号"
          type="index"
          @click="checkOrderInfo(item)"
          width="50">
      </el-table-column>
      <el-table-column align="center"
                       :key="index"
                       v-if="item.label == '主单号/分单号'"
                       :prop="item.prop"
                       fixed="left"
                       show-overflow-tooltip
                       min-width="200"
                       @click="checkOrderInfo(item)"
                       :label="item.label">
        <template slot-scope="scope">
          <el-button type="text">{{scope.row.mainNo}}</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center"
          :key="index"
          v-if="item.label != '操作' && item.label != '主单号/分单号' && !item.hase_status"
          :prop="item.prop"
          show-overflow-tooltip
          :fixed="item.label == '序号' || item.label == '状态' || item.label == '业务类型' || item.label == '一级客户' ||  item.label == '二级客户' || item.label == '主单号/分单号' ? 'left' : false "
          :min-width="item.label == '序号' || item.label == '状态' || item.label == '业务类型' || item.label == '一级客户' ||  item.label == '二级客户' || item.label == '主单号/分单号' ? 130 : 200"
          :label="item.label"/>

      <el-table-column align="center"
          :key="index"
          v-else-if="item.label != '操作' && item.hase_status"
          :prop="item.prop"
          show-overflow-tooltip
          min-width="200"
          
          :label="item.label">
        <template slot-scope="scope">
            <template v-if="item.label == '放行出库'">
              <el-button @click.native.stop="checkNodeDetaiList(scope.row,3)" type="text">{{ scope.row[item.prop] }}</el-button>
            </template>
            <template v-else-if="item.label == '查验操作'">
              <el-button @click.native.stop="checkNodeDetaiList(scope.row,1)" type="text">{{ scope.row[item.prop] }}</el-button>
            </template>
            <template v-else>
              {{ scope.row[item.prop] }}
            </template>
        </template>
      </el-table-column>

      <el-table-column
          align="center"
          :key="index"
          v-else-if="item.label == '操作'"
          fixed="right"
          label="操作"
          width="180">
        <template slot-scope="scope">
          <template v-if="item.label == '操作' && scope.row.mainType === 1">

            <el-upload
                class="upload-demo"
                ref="upload"
                v-for="(operator_item, indexs) in item.prop"
                :key="indexs"
                v-if="operator_item == '上传' || operator_item == '上传文件'"
                :data="getPostData(scope.row,0)"
                multiple
                :action="uploadSingle"
                :file-list="fileList"
                :on-success="handleResultSuccess"
                :on-error="handleResultError"
                :show-file-list="false"
                :disabled="scope.row.mainType !== 1"
            >
              <el-button  type="text"
                          size="small"
                          :disabled="scope.row.mainType !== 1"
                          >{{operator_item}}</el-button>
            </el-upload>
            <el-button 
            :disabled="scope.row.mainType !== 1"
            v-if="operator_item != '上传' && operator_item != '上传文件'" v-for="(operator_item, indexs) in item.prop" :key="indexs" @click="checkOrderInfo(scope.row, operator_item)" type="text" size="small">{{operator_item}}</el-button>

          </template>

        </template>
      </el-table-column>
    </template>
  </el-table>
</template>


<script>
export default {
  props:["tableHeader", "house_bill_header", "tableData"],
  data() {
    return {
      uploadSingle:`${process.env.VUE_APP_URL}/busUploadFile/uploadFileInfo`,
      postData:{},
      fileList: []
    }
  },
  methods:{
    checkNodeDetaiList(row, key){
      this.$emit("onNodeDetailOperator", {table_data:row, operator_key:key})
    },
    checkOrderInfoSubmenu(row, key){
      this.$emit("onTableOperator", {table_data:row, operator_key:key})
    },
    
    checkOrderInfoSub(row,key){
      this.$emit("onTableOperator", {table_data:row, operator_key:key})
    },
    checkOrderInfo(row, key){
      this.$emit("onTableOperator", {table_data:row, operator_key:key})
    },
    double_click(row, column, cell, event){

      if (!column.label || column.label == "操作"){
        return
      }
      this.$emit("onOperator", arguments)
    },
    load(row, treeNode, resolve){
      setTimeout(()=>{
        console.log(row)
      })
    },
    handleSelectionChange(data){
      this.$emit("onGetSelectData", data)
    },
    handleSelectionChange2(data){
      this.$emit("onGetSelectMenuData", data)
    },
    getPostDataSub(row,nodetype){
      let that = this;

      let uploadJson={
        mainNo:row.mainNo,
        submenuNo:row.submenuNo?row.submenuNo:'',
        nodeType:nodetype,
      }
      console.log("uploadJson",uploadJson);
      return uploadJson
    },
    getPostData(row,nodetype){
      let that = this;

      let uploadJson={
        mainNo:row.mainNo,
        nodeType:nodetype,
      }
      console.log("uploadJson",uploadJson);
      return uploadJson
    },
    uploadRequest(scope){
      this.$emit("onUploadMethod", scope)
    },
    handleResultSuccess(response, file, fileList){
      if(response.code == 99999){
        this.$message.error('上传失败！');
        debugger
      }else{
        this.$message({
          message: '上传成功！',
          type: 'success'
        });

      }
      // console.log('fileList',fileList);
      //   if (response) {
      //     console.log('response',response);
      //   } else {
      //     this.$confirm(`上传成功！`);
      //   }
    },
    handleResultError(response, file, fileList){
      this.$message.error('上传失败！');
      // console.log('fileList',fileList);
      // console.log('response',response);
    },
  }

}
</script>

<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.upload-demo{
  display: inline-block;
  margin-right: 10px;
}


/deep/ .el-table td, .el-table th {
  text-align: center;
}

/deep/ .el-table__expanded-cell{
  padding: 0;
}
/deep/.el-table__fixed {
  height:auto !important;
  bottom:17px;
  position: absolute;
  top: 0;
  left: 0;

}

/deep/.el-icon-arrow-right:before {
  content: "\e6d9";
  color:red;
}
/deep/.el-table__expand-icon--expanded .el-icon-arrow-right:before {
  content:"\e6d8";
  color:red;
}

/deep/.el-table__expand-icon--expanded{
  -webkit-transform:rotate(0deg);
  transform:rotate(0deg);
}

</style>
