<template>
  <div class="#container">

      <el-form ref="form" :model="account" label-width="100px" label-position="left" class="subform">


        <!--    头像    -->
        <el-form-item label="头像">
          <div class="upload_content">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/">
              <el-avatar size="large" :src="require('../../assets/img/img_header.png')" fit="fill" />
            </el-upload>
            <span class="up_load_text">建议正方形图片，大小不超过2M。支持格式jpg、jpeg、gif、png</span>
          </div>
        </el-form-item>

        <!--    姓名    -->
        <el-form-item label="姓名">
          <el-input v-model="account.account_name"></el-input>
        </el-form-item>
        <!--    性别    -->
        <el-form-item label="性别">
          <div class="flex__start">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
          </div>
        </el-form-item>
      </el-form>

  </div>
</template>

<script>
import {VenueOption} from "../../config/account/config";

export default {
  name: "add_account",
  data(){
    return{
      account:{
        account_header_img        : "",     // 用户头像
        account_name              : "",     // 用户真实姓名
        account_sex               : "",     // 用户性别
        account_phone             : "",     // 用户手机号
        account_belong_venus      : [],     // 用户手机号
        account_identity_id       : "",     // 身份ID
        account_sort              : "",     // 排序
        account_autograph         : "",     // 用户签名
        account_introduce         : "",     // 用户简介
        account_allow_login       : false,  // 用户是否登录
      },
      venusList                   : VenueOption,     // 场馆列表
    }
  },
  created() {
    console.log(this.$route)
  }
}
</script>

<style scoped>
  .subform{
    width: 70%;
    padding-left: 20px;
  }
  .clearfix{
    text-align: left;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .upload_content{
    display: flex;
    align-items: center;
  }
  .upload-demo{
    height: 40px;
  }
  .up_load_text{
    line-height: normal;
    font-size: 12px;
    margin-left: 10px;
  }


  .avatar-uploader {
    width: 60px;
    height: 60px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .photos{
    font-size: 11px!important;
    margin: 0;
    text-align: left;
    padding: 10px 0;
    color: #acacac;
  }

</style>
