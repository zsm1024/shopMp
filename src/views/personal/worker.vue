
<template>
  <section class="workers">
    <custom-back-header :leftArrow="true" @goback="goback" title="订单详情"></custom-back-header>
    <div class="workerTable">
      <van-button color="#7232dd" @click="showPopup" size="small">新增员工</van-button>
      <van-row type="flex">
        <van-col span="6">姓名</van-col>
        <van-col span="6">电话</van-col>
        <van-col span="6">操作</van-col>
      </van-row>
    </div>
    <div class="tableDetial">
      <van-row type="flex" v-for="(item,index) in data" :key="index">
        <van-col span="6">{{item.name}}</van-col>
        <van-col span="6">{{item.phone}}</van-col>
        <van-col span="6">{{item.time}}</van-col>
        <van-col span="6">
          <span @click="check(item)">查看</span>
          <span @click="give(item)">授权</span>
        </van-col>
      </van-row>
    </div>
<van-popup v-model="show" style="width:80%;top:30%">
  <van-cell-group>
  <van-field
   required
    clearable
    v-model="username"
    label="名称"
    placeholder="名称"
    error
  />
  <van-field
   required
    clearable
    v-model="phone"
    label="手机号"
    placeholder="请输入手机号"
    error
  />
</van-cell-group>
<p style="text-align:center;padding:.1rem 0">
<van-button color="#7232dd" @click="showPopup" size="small">确认</van-button>
<van-button color="red" @click="showPopup" size="small">删除</van-button>
</p>
</van-popup>
  </section>
</template>

<script>
import customBackHeader from "@/components/header/customBackHeader.vue";
export default {
  components: {
    customBackHeader
  },
  data() {
    return {
      data: [
        { name: "张三", phone: "13436634613", time: "2012-10-02", id: "002" },
        { name: "张三", phone: "13436634613", time: "2012-10-02", id: "002" },
        { name: "张三", phone: "13436634613", time: "2012-10-02", id: "002" }
      ],
      show: false,username:"",phone:""
    };
  },
  methods: {
    goback() {
      this.$router.push("/mine");
    },
    check(item) {
        console.log(item)
    },
    give(item) {
        console.log(item)  
    },
     showPopup() {
      this.show = true;
    }
  }
};
</script>

<style lang="less" scope>
.workers {
  .workerTable {
    background: #fff;
    margin-top: 0.05rem;
    .van-col--6 {
      text-align: center;
      height: 0.4rem;
      line-height: 0.4rem;
      font-weight: bold;
       border-bottom:1px solid #f0f0f0;
    }
  }
  .tableDetial{
     background: #fff;
     .van-col--6 {
      text-align: center;
      height: 0.4rem;
      line-height: 0.4rem;
      border-bottom:1px solid #f0f0f0;
      span{color: #1d4dd3}
    }

  }
}
</style>