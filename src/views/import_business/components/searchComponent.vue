<template>
  <div>
    <el-row type="flex" align="middle" class="search_container">


      <!--  名称查询输入框  -->
      <el-col :span="5">
        <el-input
            type="textarea"
            maxlength="1000000"
            v-model="mast_order_number"
            placeholder="请输入主单号"
        />
      </el-col>

      <!--  名称查询输入框  -->
      <el-col :span="5" class="search_input" >
        <el-input
            type="textarea"
            maxlength="1000000"
            v-model="house_order_number"
            placeholder="请输入分单号"
        />
      </el-col>

      <!--  名称查询输入框  -->
      <el-col :span="5" class="search_input" >
        <el-input
            placeholder="请输入航班号"
            type="textarea"
            maxlength="1000000"
            v-model="house_order_number"
        />
      </el-col>

      <!--  名称查询输入框  -->
      <el-col :span="5" class="search_input" ><el-input v-model="exit_haven" placeholder="请输入离境港口"></el-input></el-col>
      <!--  名称查询输入框  -->
      <el-col :span="5" class="search_input" />

    </el-row>
    <el-row type="flex" align="middle" class="search_container">
      <!--  操作时间选择  -->
      <el-col :span="9">
        <el-form :model="flight" label-width="80px" >
          <el-form-item label="航班时间" class="form">
            <el-date-picker
                v-model="flight_time"
                type="datetimerange"
                range-separator="至"
                start-placeholder="起始时间"
                end-placeholder="结束时间"
                placeholder="操作时间">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </el-col>


      <!--  操作类型  -->
      <el-col :span="4" :offset="1">
        <el-select filterable v-model="operator_type" placeholder="请选择状态">
          <el-option
              v-for="item in operator_type_list"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <!--  操作类型  -->
      <el-col :span="4" :offset="1">
        <el-select filterable v-model="client_name" placeholder="请选择客户">
          <el-option
              v-for="item in operator_type_list"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-col>

      <!--  查询按钮  -->
      <el-col :span="6" :offset="1">
        <el-button type="primary">查询</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {ORDER_TYPE_GROUP} from "@/config/orderType";

export default {
  name: "searchComponents",
  data(){
    return{
      mast_order_number          : "",                   // 主单号
      house_order_number         : "",                   // 分单号
      flight_number              : "",                   // 航班号
      exit_haven                 : "",                   // 离境港口
      flight_time                : "",                   // 航班时间
      operator_type              : "",                   // 操作类型
      client_name                : "",                   // 客户名称
      flight                     : {},
      operator_type_list         : ORDER_TYPE_GROUP,     // 操作类型列表
    }
  }
}
</script>

<style scoped>
  .search_container{
    margin: 20px 0;
  }
  .search_input{
    margin-left: 20px;
  }
  .form{
    margin-bottom: -5px;
  }
</style>
