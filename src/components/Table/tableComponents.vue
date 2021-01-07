<template>
  <div>
    <el-table
        :data="tableDataModel"
        border
        :min-height="500"
        stripe
        style="width: 100%">

      <template v-for="(item, index) in tableHeader" >
        <el-table-column align="center"
            fixed="left"
            v-if="index === 0"
            label="序号"
            type="index"
            width="50">
        </el-table-column>
        <el-table-column
            align="center"
            :key="index"
            v-if="item.title !== '操作'"
            :prop="item.field"
            show-overflow-tooltip

            :label="item.title"/>
        <el-table-column
            align="center"
            v-if="item.title === '操作'"
            fixed="right"
            :key="index"
            prop="item.field"
            show-overflow-tooltip
            min-width="100"
            :label="item.title">
          <template slot-scope="scope">
            <el-button v-for="(icon, iconIndex) in item.field" :key="iconIndex" :class="'icon_item el-icon-' + icon" @click="handleClick(scope.row, icon)" type="text"/>
          </template>
        </el-table-column>
      </template>

    </el-table>
    <el-pagination
        v-if="pageConfig.page_total"
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 30, 40]"
        class="pagination"
        :page-size="pageConfig.limit"
        :current-page="pageConfig.current_page"
        :page-count="pageConfig.page_total"
        :total="pageConfig.total_num"
        :pager-count="5"
        @size-change="handleSizeChange"
        @current-change="handleChange"
       >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: ["tableHeaderModel", "tableDataModel", "pageConfigModel", "edit"],
  name:"tableComponents",
  data() {
    return {
      pageConfig: this.pageConfigModel,
      tableData:this.tableDataModel,
      tableHeader:this.tableHeaderModel,
    }
  },
  methods: {
    handleChange(data){
      this.pageConfig.current = data
      this.$emit("onPageHandle", this.pageConfig)
    },
    handleSizeChange(data){
      this.pageConfig.limit = data
      this.$emit("onPageHandle", this.pageConfig)
    },
    handleClick(data, operatorKey){
      this.$emit("onOperatorHandle", {data, operatorKey})
    }

  },


}
</script>

<style scoped>
  .upload-demo{
    display: inline-block;
    margin-right: 10px;
  }
  .pagination{
    float: right;
    margin-top: 10px;
  }
  .icon_item{
    font-size: 16px;
    margin:0 5px;
    padding: 0 5px;
  }

</style>
