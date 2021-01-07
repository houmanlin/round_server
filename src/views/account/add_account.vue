<template>
  <div class="#container">
    <el-card class="container">

      <div slot="header">
        <span>基础信息</span>
      </div>
      <el-form ref="form" :rules="rules" :model="account" label-width="100px" label-position="left" class="subform">


        <!--    头像    -->
        <el-form-item label="头像">
          <div class="upload_content">
            <el-avatar size="large" :src="require('../../assets/img/img_header.png')" fit="fill" />
          </div>
        </el-form-item>

        <!--    姓名    -->
        <el-form-item label="姓名" prop="account_name">
          <el-input v-model="account.account_name" placeholder="请输入姓名" ></el-input>
        </el-form-item>
        <!--    性别    -->
        <el-form-item label="性别" prop="account_sex">
          <div class="flex__start">
            <el-radio-group v-model="account.account_sex" >
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
            </el-radio-group>
          </div>
        </el-form-item>
        <el-form-item label="手机" prop="account_phone">
          <el-input v-model="account.account_phone" placeholder="请输入手机号" ></el-input>
        </el-form-item>
        <el-form-item label="所属场馆" prop="account_belong_venus">
          <div class="flex__start">
            <el-select v-model="account.account_belong_venus" placeholder="请所属场馆" style="width: 100%" >
              <el-option
                  v-for="(item, index) in venusList"
                  :key="index"
                  :label="item.venue_name"
                  :value="item.id">
              </el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="身份" prop="account_identity_id">
          <div class="flex__start">
            <el-select v-model="account.account_identity_id" placeholder="请所属场馆" style="width: 100%" >
              <el-option
                  v-for="(item, index) in venusList"
                  :key="index"
                  :label="item.venue_name"
                  :value="item.id">
              </el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="account.account_sort" ></el-input>
        </el-form-item>
        <el-form-item label="签名">
          <el-input v-model="account.account_autograph"
                    :rows="4"
                    type="textarea"
                    placeholder="请输入签名" />
        </el-form-item>
        <el-form-item label="是否展示">
          <el-switch
              class="flex__start"
              v-model="account.account_is_show"
              active-color="#13ce66"
              inactive-color="#cccccc" >
          </el-switch>
        </el-form-item>
        <el-form-item label="简介">
          <el-input v-model="account.account_introduce"
                    :rows="4"
                    type="textarea"
                    placeholder="请输入简介" />
        </el-form-item>
        <el-form-item label="相册">
          <div>
            <div class="flex__start">
              <div>
              </div>
              <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"

              >
                <i class="el-icon-plus avatar-uploader-icon"/>
              </el-upload>
            </div>
            <div class="up_load_text photos">建议正方形图片，最多上传8张，大小不超过2M。支持格式jpg、jpeg、gif、png</div>
          </div>
        </el-form-item>

      </el-form>
    </el-card>
    <el-card class="container">

      <div slot="header">
        <span>账号信息</span>
      </div>
      <el-form ref="form" :rules="rules" :model="account" label-width="100px" label-position="left" class="subform">
        <el-form-item label="状态">
          <el-switch
              class="flex__start"
              v-model="account.status"
              active-color="#13ce66"
              inactive-color="#cccccc"
          >
          </el-switch>
        </el-form-item>

        <el-form-item label="是否允许登录">
          <el-switch
              class="flex__start"
              v-model="account.account_allow_login"
              active-color="#13ce66"
              inactive-color="#cccccc"

          >
          </el-switch>
        </el-form-item>
        <el-form-item label="用户名" v-if="account.account_allow_login">
          <el-input

              placeholder="请输入用户名"
              v-model="account.user_name" >
          </el-input>
        </el-form-item>
        <el-form-item label="密码" v-if="account.account_allow_login" >
          <el-input
              v-model="account.password"
              placeholder="请输入密码"
              />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">{{ this.id ? '立即修改' : '立即创建' }}</el-button>
          <el-button @click="$router.back()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {ROLES} from "@/config/account/config";
import {AddAccount, EditAccount, GetAccountInfo} from "@/api/account";
import {SelectVenue} from "@/api/venue";

export default {
  name: "add_account",
  data(){
    return{
      id                          : 0,      // ID
      account:{
        account_header_img        : "",     // 用户头像
        account_name              : "",     // 用户真实姓名
        account_sex               : 1,      // 用户性别
        account_phone             : "",     // 用户手机号
        status                    : 0,      // 账号状态
        account_belong_venus      : [],     // 用户手机号
        account_identity_id       : "",     // 身份ID
        account_sort              : "",     // 排序
        account_autograph         : "",     // 用户签名
        account_introduce         : "",     // 用户简介
        account_allow_login       : 0,      // 用户是否登录
        user_name                 : "",     // 用户名
        password                  : "",     // 密码
        account_is_show           : 0,      // 是否展示
      },
      venusList                   : [],     // 场馆列表
      rules                       : ROLES
    }
  },
  created() {


    this.getVenueList()
  },
  mounted() {
    if (this.$route.query.id) {
      this.getAccountInfo();

    }

  },
  methods:{
    getVenueList(){
      SelectVenue().then(res=>{
        this.venusList = res.data
      })
    },
    getAccountInfo(){
      let params = {
        account_id:this.$route.query.id
      }
      GetAccountInfo(params).then(res=>{
        this.id                             = res.data.id;                                    // 用户ID
        this.account.account_header_img     = res.data.account_header_img;                    // 头像
        this.account.account_name           = res.data.account_name;                          // 名称
        this.account.account_sex            = res.data.account_sex;                           // 性别
        this.account.account_phone          = res.data.account_phone;                         // 电话
        this.account.account_belong_venus   = parseInt(res.data.account_belong_venus);        // 所属场馆
        this.account.account_identity_id    = res.data.account_identity_id;                   // 身份权限
        this.account.account_sort           = res.data.account_sort;                          // 排序
        this.account.account_autograph      = res.data.account_autograph;                     // 签名
        this.account.account_introduce      = res.data.account_introduce;                     // 简介
        this.account.account_is_show        = res.data.account_is_show ? true : false;        // 是否展示
        this.account.account_allow_login    = res.data.account_allow_login ? true : false;    // 是否登录
        this.account.status                 = res.data.status ? true : false;                 // 是否登录
        this.account.user_name              = res.data.account_user_name;                     // 登录账号
        this.account.password               = res.data.account_password;                      // 登录密码

      })
    },
    submitForm(){
      this.account.account_allow_login  = this.account.account_allow_login ? 1 : 0
      this.account.account_is_show      = this.account.account_is_show ? 1 : 0
      this.account.status               = this.account.status ? 1 : 2
      if (this.id){
        this.account.id = this.id;
        EditAccount(this.account).then(res=>{
          this.$message.success("修改成功")
          this.$router.back()
        })
      }else{
        AddAccount(this.account).then((res)=>{
          this.$message.success("添加成功")
          this.$router.back()
        })
      }

    }
  }
}
</script>

<style scoped>
  .subform{
    width: 70%;
    padding-left: 20px;
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
  .container{
    width: 96%;
    margin: 20px auto;
  }

</style>
