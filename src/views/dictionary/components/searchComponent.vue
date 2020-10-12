<template>
  <el-row type="flex" align="middle" class="search_container">


    <!--  名称查询输入框  -->
    <el-form :inline="true" :model="searchData" label-position="left" label-width="100px" >
      <el-form-item label="CODE DIV" class="form more_select">
        <el-input
            class="form_textarea"
            v-model="searchData.codeDiv"
            placeholder="请输入CODE DIV"
        />
      </el-form-item>
      <el-form-item label="CODE_TEXT" class="form more_select">
        <el-input
            class="form_textarea"
            v-model="searchData.codeText"
            placeholder="请输入CODE DIV"
        />
      </el-form-item>
      <el-form-item label="是否使用" class="form more_select">
        <el-select filterable v-model="searchData.isEnable" placeholder="请选择是否使用">
          <el-option
            label="禁用"
            :value="0"
          />
          <el-option
            label="使用"
            :value="1"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="" class="form more_select">
        <el-button type="primary" @click="selectData">查询</el-button>
      </el-form-item>

      <el-form-item label="" class="form more_select">
        <el-button type="primary" @click="resetData">重置</el-button>
      </el-form-item>

    </el-form>




  </el-row>
</template>

<script>

export default {
  name: "searchComponents",
  data(){
    return{
      searchData:{
        codeDiv: "",
        codeText: "",
        enable: "1"
      },
      field_list: [{
        value: '0',
        label: 'CODE DIV'
      }, {
        value: '1',
        label: 'CODE CD'
      }, {
        value: '2',
        label: 'CODE 名称'
      }, {
        value: '3',
        label: '顺序'
      }],
      field_value: ''
    }
  },
  methods:{
    selectData(){
      this.$emit("onSelectData", this.searchData)
    },
    resetData(){
      for (const index in this.searchData) {
        this.searchData[index] = ""
      }
      this.$emit("onSelectData", this.searchData)
    }
  }
}
</script>

<style scoped>
  .search_container{
    margin: 20px 0;
  }
</style>
