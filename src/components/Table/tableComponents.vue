<template>
  <el-table
      :data="tableData"
      border
      style="width: 100%">

    <template v-for="(item, index) in tableHeader" >
      <el-table-column
          v-if="index == 0"
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column
          v-if="index == 0"
          fixed="left"
          label="编号"
          type="index"
          @click="checkOrderInfo(item)"
          width="50">
      </el-table-column>


      <el-table-column
          :key="index"
          v-if="item.label != '操作'"
          :prop="item.prop"
          show-overflow-tooltip
          width="300"
          @click="checkOrderInfo(item)"
          :label="item.label"/>
      <el-table-column
          :key="index"
          v-else
          fixed="right"
          label="操作"
          width="150">
        <template slot-scope="scope">
          <el-button v-if="item.label == '操作'" v-for="(operator_item, indexs) in item.prop" :key="indexs" @click="handleClick(scope.row, operator_item)" type="text" size="small">{{operator_item}}</el-button>
        </template>
      </el-table-column>
    </template>

  </el-table>
</template>

<script>
export default {
  props: ["tableHeader"],
  name:"table",
  methods: {
    handleClick(row, operator_key) {
      this.$emit("onOperator", {
        table_data: row,
        operator_key
      })
    },
    checkOrderInfo(row){
      debugger
      this.$emit("onCheck", row)
    }
  },

  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333
      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }]
    }
  },
}
</script>
