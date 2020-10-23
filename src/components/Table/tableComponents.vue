<template>
  <el-table
      :data="tableData"
      border
      :height="500"
      @selection-change="handleSelectionChange"
      style="width: 100%">

    <template v-for="(item, index) in tableHeader" >
      <el-table-column
          v-if="index == 0"
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column align="center"
          v-if="index == 0"
          fixed="left"
          label="序号"
          type="index"
          @click="checkOrderInfo(item)"
          width="50">
      </el-table-column>


      <el-table-column
          align="center"
          :key="index"
          v-if="item.label != '操作'"
          :prop="item.prop"
          show-overflow-tooltip
          min-width="180"
          @click="checkOrderInfo(item)"
          :label="item.label"/>
      <el-table-column
          align="center"
          :key="index"
          v-else
          fixed="right"
          label="操作"
          width="150">
        <template slot-scope="scope">
          <template v-if="item.label == '操作'">
            <el-upload
                class="upload-demo"
                ref="upload"
                v-for="(operator_item, indexs) in item.prop"
                :key="indexs"
                v-if="operator_item == '上传' || operator_item == '上传文件'"
                :data="getPostData(scope.row,0)"
                multiple
                :action="upload_url"
                :file-list="fileList"
                :on-success="handleResultSuccess"
                :on-error="handleResultError"
                :show-file-list="false"

            >
              <el-button  type="text"
                          size="small">{{operator_item}}</el-button>
            </el-upload>
            <el-button v-if="operator_item != '上传' && operator_item != '上传文件'" v-for="(operator_item, indexs) in item.prop" :key="indexs" @click="handleClick(scope.row, operator_item)" type="text" size="small">{{operator_item}}</el-button>

          </template>

        </template>
      </el-table-column>
    </template>

  </el-table>
</template>

<script>
export default {
  props: ["tableHeader", "tableData", "upload_url"],
  name:"table",

  methods: {
    handleClick(row, operator_key) {
      this.$emit("onOperator", {
        table_data: row,
        operator_key
      })
    },
    checkOrderInfo(row){
      this.$emit("onCheck", row)
    },
    handleSelectionChange(data){
      this.$emit("onSelectData", data)
    },
    getPostData(row,nodetype){
      let that = this;

      let uploadJson={
        mainNo:row.mainNo,
        nodeType:nodetype,
      }
      return uploadJson
    },
    uploadRequest(scope){
      this.$emit("onUploadMethod", scope)
    },
    handleResultSuccess(response, file, fileList){
      if(response.code == 99999){
        this.$message.error('上传失败！');
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
  },

  data() {
    return {
      fileList: []
    }
  },
}
</script>

<style scoped>
  .upload-demo{
    display: inline-block;
    margin-right: 10px;
  }


</style>
