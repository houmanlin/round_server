<template>
  <div>
    <el-row type="flex" align="middle" class="search_container">
      <el-form :inline="true" :model="flight" label-position="left" label-width="80px" >
        <el-form-item label="主单号" class="form more_select">
          <el-input

              style="width: 200px"
              class="form_textarea"
              type="textarea"
              maxlength="1000000"
              v-model="mainNo"
              placeholder="可批量输入，通过换行符（回车）区分多条数据"
          />
        </el-form-item>
        <el-form-item label="分单号" class="form more_select">
          <el-input
              class="form_textarea"
              type="textarea"
              maxlength="1000000"
              v-model="submenuNo"
              placeholder="可批量输入，通过换行符（回车）区分多条数据"
          />
        </el-form-item>
        <el-form-item label="航班号" class="form more_select hangban">
          <el-input
              class="form_textarea"
              type="textarea"
              maxlength="1000000"
              v-model="flightNo"
              placeholder="可批量输入，通过换行符（回车）区分多条数据"
          />
          <el-button type="primary" class="search_button" @click="exportFile">导出</el-button>
        </el-form-item>

      </el-form>


    </el-row>
    <el-row type="flex" align="middle" class="search_container">
      <!--  操作时间选择  -->
        <el-form :inline="true" :model="flight" label-position="left" label-width="80px" >
          <el-form-item label="状态" class="form">
          <el-select filterable v-model="status" placeholder="请选择状态"
                     style="width: 230px">
            <el-option
                v-for="item in operator_type_list"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="一级客户" class="form">
            <el-select filterable v-model="customerIdOne" placeholder="请选择一级客户">
              <el-option
                  v-for="item in client_list"
                  :key="item.id"
                  :label="item.username"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="二级客户" class="form">
            <el-select filterable v-model="customerIdTwo" placeholder="请选择二级客户">
              <el-option
                  v-for="item in client_list"
                  :key="item.id"
                  :label="item.username"
                  :value="item.id">
              </el-option>
            </el-select>
            <el-button type="primary" class="search_button" @click="getFieldData">查询</el-button>
          </el-form-item>

        </el-form>
    </el-row>
    <el-row type="flex" align="middle" class="search_container">

      <!--  操作时间选择  -->
        <el-form :inline="true" label-position="left" :model="flight" label-width="80px" >

          <el-form-item label="航班时间" class="form">
            <el-date-picker
                style="width: 250px"
                v-model="flightDateStart"
                type="daterange"
                range-separator="至"
                start-placeholder="起始时间"
                end-placeholder="结束时间"
                placeholder="航班时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="报关时间" class="form">
            <el-date-picker
                v-model="declarationDate"
                type="date"
                range-separator="至"
                placeholder="报关时间">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="离境港口" class="form last_form">
            <el-input v-model="exitPort" placeholder="请输入离境港口" style="width: 195px"/>
            <el-button type="primary" class="search_button" @click="resetData">重置</el-button>
          </el-form-item>

        </el-form>
    </el-row>
  </div>
</template>

<script>
import {ORDER_TYPE_GROUP} from "@/config/selectData";
import {getOneClient} from "@/api/customer";

export default {
  name: "searchComponents",
  data(){
    return{
      mainNo                     : "",                   // 主单号
      submenuNo                  : "",                   // 分单号
      flightNo                   : "",                   // 航班号
      customerIdOne              : "",                   // 一级客户
      customerIdTwo              : "",                   // 二级客户
      exitPort                   : "",                   // 离境港口
      declarationDate            : "",                   // 离境港口
      flightDateStart            : "",                   // 报关时间
      flightDateEnd              : "",                   // 报关时间
      status                     : "",                   // 操作类型
      flight                     : {},
      operator_type_list         : ORDER_TYPE_GROUP,     // 操作类型列表
      client_list                : []
    }
  },
  created() {
    this.getClientData()
  },
  methods:{
    getFieldData(){
      let flightDate = this.flightDateStart
      let date = new Date(flightDate[0]);
      let date1 = new Date(flightDate[1]);
      if (this.flightDateStart){
        this.flightDateStart = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
        this.flightDateEnd = `${date1.getFullYear()}-${date1.getMonth()+1}-${date1.getDate()}`
      }else{
        this.flightDateStart = ""
        this.flightDateEnd = ""
      }

      let declara = this.declarationDate
      let date2 = new Date(declara);

      if (this.declarationDate){
        this.declarationDate = `${date2.getFullYear()}-${date2.getMonth()+1}-${date2.getDate()}`
      }else{
        this.declarationDate = ""
      }
      this.$emit("onGetFieldData", {
        mainNo:this.mainNo,                   // 主单号
        submenuNo:this.submenuNo,                   // 分单号
        flightNo:this.flightNo,                   // 航班号
        customerIdOne:this.customerIdOne,                   // 一级客户
        customerIdTwo:this.customerIdTwo,                   // 二级客户
        exitPort:this.exitPort,                   // 离境港口
        declarationDate:this.declarationDate,                   // 离境港口
        flightDateStart:this.flightDateStart,                   // 报关时间
        flightDateEnd:this.flightDateEnd,                   // 报关时间
        status:this.status,                   // 操作类型
      })
    },
    getClientData(){
      getOneClient().then(res=>{
        this.client_list = res.data
      })
    },
    exportFile(){
      this.$emit("exportFiles")
    },
    resetData(){
      this.mainNo                     = "";                   // 主单号
      this.submenuNo                  = "";                   // 分单号
      this.flightNo                   = "";                   // 航班号
      this.customerIdOne              = "";                   // 一级客户
      this.customerIdTwo              = "";                   // 二级客户
      this.exitPort                   = "";                   // 离境港口
      this.declarationDate            = "";                   // 离境港口
      this.flightDateStart            = "";                   // 报关时间
      this.flightDateEnd              = "";                   // 报关时间
      this.status                     = "";                   // 操作类型
      this.$emit("onGetFieldData", {
        mainNo:this.mainNo,                   // 主单号
        submenuNo:this.submenuNo,                   // 分单号
        flightNo:this.flightNo,                   // 航班号
        customerIdOne:this.customerIdOne,                   // 一级客户
        customerIdTwo:this.customerIdTwo,                   // 二级客户
        exitPort:this.exitPort,                   // 离境港口
        declarationDate:this.declarationDate,                   // 离境港口
        flightDateStart:this.flightDateStart,                   // 报关时间
        flightDateEnd:this.flightDateEnd,                   // 报关时间
        status:this.status,                   // 操作类型
      })
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
    width: 400px;
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
  .hangban{
    position: relative;
  }
  .hangban .search_button{
    position: absolute;
    right: -110px;
  }

</style>
