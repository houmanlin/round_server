<template>
  <el-table
      :data="tableData"
      border
      @cell-dblclick="double_click"
      height="400"
      style="width: 100%">

    <template v-for="(item, index) in tableHeader" >
      <el-table-column align="center" fixed="left" v-if="index==0" type="expand">
        <template slot-scope="props">
          <el-table
              :data="tableData"
              border
              :height="500"
              style="width: 100%">

            <template v-for="(items, indexs) in house_bill_header" >
              <el-table-column
                  v-if="indexs == 0"
                  type="selection"
                  width="55">
              </el-table-column>
              <el-table-column
                  v-if="indexs == 0"
                  fixed="left"
                  label="编号"
                  type="index"

                  width="50">
              </el-table-column>


              <el-table-column
                  :key="indexs"
                  v-if="items.label != '操作'"
                  :prop="item.prop"
                  show-overflow-tooltip
                  width="300"

                  :label="items.label"/>

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
          label="编号"
          type="index"
          @click="checkOrderInfo(item)"
          width="50">
      </el-table-column>
      <el-table-column align="center"
          :key="index"
          v-if="item.label != '操作' && !item.hase_status"
          :prop="item.prop"
          show-overflow-tooltip
          min-width="200"
          @click="checkOrderInfo(item)"
          :label="item.label"/>
      <el-table-column align="center"
          :key="index"
          v-else-if="item.label != '操作' && item.hase_status"
          :prop="item.prop"
          show-overflow-tooltip
          min-width="200"
          @click="checkOrderInfo(item)"
          :label="item.label">
        <template slot-scope="scope">
            <div>
<!--                {{ scope.row[item.prop] }}-->
                <i class="el-icon-check" v-if="scope.row[item.prop]"/>
                <i class="el-icon-close" v-else/>
            </div>
        </template>
      </el-table-column>
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
            <el-button v-if="operator_item != '上传' && operator_item != '上传文件'" v-for="(operator_item, indexs) in item.prop" :key="indexs" @click="checkOrderInfo(scope.row, operator_item)" type="text" size="small">{{operator_item}}</el-button>

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
      tableDatas: [{
        id: '12987122',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987123',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987125',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      },{
        id: '12987125',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      },{
        id: '12987125',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      },{
        id: '12987125',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      },{
        id: '12987125',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987126',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }]
    }
  },
  methods:{
    checkOrderInfo(row, key){
      this.$emit("onTableOperator", {table_data:row, operator_key:key})
    },
    double_click(row, column, cell, event){

      if (!column.label || column.label == "操作"){
        return
      }
      this.$emit("onOperator", arguments)
    }
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
</style>
