<template>
  <div class="#container">
    <el-card class="container">

      <div slot="header">
        <span>场馆信息</span>

      </div>
      <el-form ref="form" :rules="rules" :model="venus" label-width="100px" label-position="left" class="subform">



        <!--    姓名    -->
        <el-form-item label="场馆名称" prop="venus_name">
          <el-input v-model="venus.venue_name" placeholder="请输入场馆名称"></el-input>
        </el-form-item>

        <el-form-item label="电话" prop="venus_phone">
          <el-input v-model="venus.venue_phone" placeholder="请输入电话"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="venus_phone">


          <!--   ————————————————  省市区  ————————————————   -->
          <el-form :inline="true" :model="venus" class="demo-form-inline">
            <el-form-item>
              <el-select v-model="venus.venue_province" placeholder="请选择省" @change="changeAddress('cityList')">
                <el-option
                    v-for="(item, index) in areaOptions.provinceList"
                    :key="index"
                    :label="item.area_name"
                    :value="item.area_id"
                />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="venus.venue_city" placeholder="请选择市" @change="changeAddress('areaList')">
                <el-option
                    v-for="(item, index) in areaOptions.cityList"
                    :key="index"
                    :label="item.area_name"
                    :value="item.area_id"
                />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="venus.venue_area" placeholder="请选择区">
                <el-option
                    v-for="(item, index) in areaOptions.areaList"
                    :key="index"
                    :label="item.area_name"
                    :value="item.area_id"
                />
              </el-select>
            </el-form-item>
          </el-form>




          <!--   ————————————————  地址 地图  ————————————————   -->
          <el-form :model="venus" class="demo-form-inline">
            <el-form-item>
              <div class="area_container">
                <el-input v-model="venus.venue_address" placeholder="请输入场馆详细地址" class="area_input"></el-input>
                <el-button type="primary" @click="validAddress" class="area_button">调整定位</el-button>
              </div>
            </el-form-item>
          </el-form>
        </el-form-item>

        <el-form-item label="排序" prop="venus_sort">
          <el-input v-model="venus.venue_sort" placeholder="请输入排序" />
        </el-form-item>

        <el-form-item label="状态" prop="venus_sort">
          <el-switch v-model="venus.venue_status"/>
        </el-form-item>


        <el-form-item label="相册">
          <div>
            <div class="flex__start">
              <div>
              </div>
              <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false">
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
        <span>场地信息</span>
        <el-button style="float: right; padding: 3px 9px" type="text" @click="addVenues">
          <i class="el-icon-plus"/>
        </el-button>
      </div>
      <template v-for="(item, index) in venus.venue_field_list">
        <el-form ref="form" :inline="true" :rules="rules" :model="item"  :key="index" label-width="80px" label-position="left">
          <!--    姓名    -->
          <el-form-item label="名称" prop="account_name">
            <el-input v-model="item.venue_field_name"></el-input>
          </el-form-item>

          <el-form-item label="容纳人数" prop="account_phone">
            <el-input v-model="item.venue_capacity" placeholder="请输入电话"></el-input>
          </el-form-item>

          <el-form-item label="排序">
            <el-checkbox-group
                v-model="item.venue_support"
            >
              <el-checkbox :label=1>团体课</el-checkbox>
              <el-checkbox :label=2>私教课</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-button type="text" @click="delItem(index)">删除</el-button>
          </el-form-item>

        </el-form>
      </template>
    </el-card>
    <div class="submit_container">
      <el-button type="primary" @click="submitForm()">{{ $route.query.id ? '立即修改' : '立即创建' }}</el-button>
      <el-button @click="$router.back()">重置</el-button>
    </div>
  </div>
</template>

<script>
import {ROLES} from "@/config/venus/config";
import {AddAccount} from "@/api/account";
import {getAreaList} from "@/api/tools";
import {AddVenue, EditVenue, VenueInfo} from "@/api/venue";

export default {
  name: "add_account",
  data(){
    return{
      id                          : "",     // 场地ID
      venus:{
        venus_name                : "",     // 用户真实姓名
        venus_phone               : "",     // 用户手机号
        venue_sort                : "",     // 排序
        venue_status              : "",     // 排序
        venue_province            : "",     // 省
        venue_city                : "",     // 市
        venue_area                : "",     // 区域
        venue_address             : "",     // 详细地址
        venue_images              : "",
        venue_field_list          : [
          {id:0,venue_field_name: "", venue_capacity:0, venue_support:[]}
        ],
      },
      rules                       : ROLES,

      areaOptions                 : {
        provinceList              : [],
        areaList                  : [],
        cityList                  : [],
      },

    }
  },

  created() {
      this.getArea(0,0,"provinceList")

      if (this.$route.query.id){
        this.getVenueInfo()
      }
  },
  methods:{

    getVenueInfo(){
      let data = {
        id:this.$route.query.id
      }
      VenueInfo(data).then(res=>{

        this.id = this.$route.query.id;
        res.data.venue_province = parseInt(res.data.venue_province);
        res.data.venue_city = parseInt(res.data.venue_city);
        res.data.venue_area = parseInt(res.data.venue_area);
        res.data.venue_status = res.data.venue_status == 2 ? 0 : 1;

        if (res.data.venue_field_list.length < 1) {

          res.data.venue_field_list.push({id: 0, venue_field_name: "", venue_capacity: 1, venue_support: []})
        }
        for (const resKey in res.data.venue_field_list) {
          res.data.venue_field_list[resKey].venue_support =
              res.data.venue_field_list[resKey].venue_support == 3 ? [1,2] : [res.data.venue_field_list[resKey].venue_support]
        }





        this.venus = res.data;

        this.getArea( this.venus.venue_province, 2, "cityList");
        this.getArea( this.venus.venue_city, 3, "areaList");
      })
    },


    /**
     * 获取省市区
     * @param area_id     区域ID
     * @param area_level  区域等级
     * @param option_key  当前级别
     */
    getArea(area_id, area_level, option_key){
      let data = {
        area_id,
        area_level
      }
      getAreaList(data).then(res=>{
        this.$set(this.areaOptions, option_key, res.data)
      })
    },
    /***
     *  切换地址
     *  @Params  nextOptionsKey     下一个选项关键字
     */
    changeAddress(nextOptionsKey){
      let areaLevel;
      let areaId;
      if (nextOptionsKey === 'cityList'){
        areaLevel = 2;
        areaId = this.venus.venue_province;
      }
      else{
        areaLevel = 3;
        areaId = this.venus.venue_city;
      }
      this.getArea(areaId, areaLevel,nextOptionsKey)
    },

    /***
     *  删除场地
     *  @Param venus_filed_list_index     删除场地的索引
     */
    delItem(venus_filed_list_index){
      this.$delete(this.venus.venue_field_list, venus_filed_list_index)
    },

    /***
     * 提交数据
     */
    submitForm(){
      let venusFiledList = [];
      let venusFiled = this.venus.venue_field_list;
      for (let i in venusFiled){

        venusFiled[i].venue_capacity = parseInt(venusFiled[i].venue_capacity);

        venusFiled[i].venue_support = venusFiled[i].venue_support.length <= 1 ? parseInt(venusFiled[i].venue_support[0]) : 3

        if(venusFiled[i].venue_support == ""){

          this.$message.warning("用途未选择")
          return
        }
        venusFiledList.push(venusFiled[i])

      }
      let params = {
        venue_name                : this.venus.venue_name,                  // 场馆名称
        venue_phone               : this.venus.venue_phone,                 // 场馆电话
        venue_province            : this.venus.venue_province,              // 场馆省
        venue_city                : this.venus.venue_city,                  // 场馆市
        venue_area                : this.venus.venue_area,                  // 场馆区
        venue_address             : this.venus.venue_address,               // 场馆地区
        venue_sort                : this.venus.venue_sort,                  // 场馆权重
        venue_status              : this.venus.venue_status ? '1' : '2',    // 场馆权重
        venue_images              : this.venus.venue_images,                // 场馆图片
        venue_field_list          : JSON.stringify(venusFiledList),         // 场地信息
      }


      if (!this.$route.query.id){

        AddVenue(params).then(res=>{
          this.$message.success("添加成功")
          this.$router.push("/venue_list")
        })
      }else{
        params.venue_id = this.$route.query.id
        EditVenue(params).then(res=>{
          this.$message.success("修改成功")
          this.$router.push("/venue_list")
        })
      }


    },
    validAddress(){

    },
    /**
     * 添加场地
     *
     */
    addVenues(){
      this.venus.venue_field_list.push({id: 0, venue_field_name: "", venue_capacity: 1, venue_support: []})
    }
  }
}
</script>

<style scoped>
.subform{
  width: 70%;
  padding-left: 20px;
}

.area_container{
  display: flex;
  align-items: center;
}
.area_input{
  width: 450px;
}
.area_button{
  margin-left: 10px;
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

.submit_container{
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
