<template>
  <div>
    <el-row type="flex" align="middle" class="search_container">
      <el-form :inline="true" :model="flight" label-position="left" label-width="80px" >
        <el-form-item label="主单号" class="form more_select">
          <el-input
              class="form_textarea"
              type="textarea"
              maxlength="1000000"
              v-model="mast_order_number"
              placeholder="可批量输入，通过换行符（回车）区分多条数据"
          />
        </el-form-item>
        <el-form-item label="分单号" class="form more_select">
          <el-input
              class="form_textarea"
              type="textarea"
              maxlength="1000000"
              v-model="house_order_number"
              placeholder="可批量输入，通过换行符（回车）区分多条数据"
          />
        </el-form-item>
        <el-form-item label="航班号" class="form more_select">
          <el-input
              class="form_textarea"
              type="textarea"
              maxlength="1000000"
              v-model="flight_number"
              placeholder="可批量输入，通过换行符（回车）区分多条数据"
          />
        </el-form-item>

      </el-form>


    </el-row>
    <el-row type="flex" align="middle" class="search_container">
      <!--  操作时间选择  -->
        <el-form :inline="true" :model="flight" label-position="left" label-width="80px" >
          <el-form-item label="状态" class="form">
          <el-select filterable v-model="operator_type" placeholder="请选择状态">
            <el-option
                v-for="item in operator_type_list"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="一级客户" class="form">
            <el-select filterable v-model="client_name" placeholder="请选择一级客户">
              <el-option

                  label="杨哥"
                  value="0">
              </el-option>
              <el-option

                  label="吕哥"
                  value="1">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="二级客户" class="form">
            <el-select filterable v-model="client_name" placeholder="请选择二级客户">
              <el-option

                  label="杨哥"
                  value="0">
              </el-option>
              <el-option

                  label="吕哥"
                  value="1">
              </el-option>
            </el-select>
            <el-button type="primary" class="search_button">查询</el-button>
          </el-form-item>

        </el-form>
    </el-row>
    <el-row type="flex" align="middle" class="search_container">

      <!--  操作时间选择  -->
        <el-form :inline="true" label-position="left" :model="flight" label-width="80px" >

          <el-form-item label="航班时间" class="form">
            <el-date-picker
                v-model="flight_time"
                type="date"
                range-separator="至"
                start-placeholder="起始时间"
                end-placeholder="结束时间"
                placeholder="航班时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="报关时间" class="form">
            <el-date-picker
                v-model="flight_time"
                type="date"
                range-separator="至"
                start-placeholder="起始时间"
                end-placeholder="结束时间"
                placeholder="报关时间">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="离境港口" class="form last_form">
            <el-input v-model="exit_haven" placeholder="请输入离境港口"/>
          </el-form-item>

        </el-form>
    </el-row>
  </div>
</template>

<script>
import {ORDER_TYPE_GROUP} from "@/config/selectData";

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
    width: 390px;
    margin-bottom: -5px;
  }
  .last_form{
    padding-top: 5px;
  }

  .more_select{
    padding-right: 120px;
  }
  .search_button{
    margin-left: 35px
  }

</style>
