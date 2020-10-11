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
          label="编号"
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
              action="https://jsonplaceholder.typicode.com/posts/"
              v-for="(operator_item, indexs) in item.prop"
              :key="indexs"
              @click="handleClick(scope.row, operator_item)"
              v-if="operator_item == '上传' || operator_item == '上传文件'"
              :auto-upload="false">
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
  props: ["tableHeader", "tableData"],
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
    }
  },

  data() {
    return {
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
