<template>
  <div class="table_container">
    <el-form ref="form" :model="selectData" inline label-width="30px">

      <!--  场馆选择  -->
      <el-form-item>
        <el-select v-model="selectData.venue" multiple collapse-tags placeholder="请选择场馆">
          <el-option
            v-for="(item, index) in venueOption"
            :key="index"
            :label="item.venue_name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>


      <!--  身份选择  -->
      <el-form-item>
        <el-select v-model="selectData.identity" multiple collapse-tags placeholder="请选择身份">
          <el-option
            v-for="(item, index) in venueOption"
            :key="index"
            :label="item.venue_name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>



      <!--  状态选择  -->
      <el-form-item>
        <el-select v-model="selectData.status" placeholder="请选择状态">
          <el-option label="正常" value="1"/>
          <el-option label="删除" value="2"/>
        </el-select>
      </el-form-item>



      <!--  姓名电话  -->
      <el-form-item>
        <el-input v-model="selectData.works_key" placeholder="按电话,姓名搜索"></el-input>
      </el-form-item>

      <!--  状态选择  -->
      <el-form-item>
        <el-button type="primary" @click="searchData">查询</el-button>
        <el-button @click="resetData">重置</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import {SelectVenue} from "@/api/venue";

export default {
  name: "select_operator_group",
  data(){
    return{
      selectData:{
        venue             : [],       // 选择场馆
        identity          : "",       // 身份
        status            : "",       // 状态
        works_key         : "",       // 输入查询
      },
      venueOption         : []
    }
  },
  created() {

    this.getData();

  },
  methods:{
    getData(){
      this.getVenues();
    },
    getVenues(){
      SelectVenue().then(res=>{
        this.venueOption = res.data
      });
    },
    // 查询数据
    searchData(){
      this.$emit("onReloadData", this.selectData)
    },

    // 重置数据和表单
    resetData(){
      this.selectData.venue     =    [];       // 选择场馆
      this.selectData.identity  =    "";       // 身份
      this.selectData.status    =    "";       // 状态
      this.selectData.works_key =    "";       // 输入查询
      this.$emit("onReloadData", this.selectData)
    },

  }
}
</script>

<style scoped>
  .table_container{
    width: 100%;
    display: flex;
    justify-content: flex-start;
  }
</style>
