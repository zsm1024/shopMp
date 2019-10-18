<template>
  <section class="checkList">
      <custom-back-header
      :leftArrow="true"
      @goback="goback"
      title="账单"
    ></custom-back-header>
    <van-tabs v-model="activeName">
      <van-tab title="消费明细" name="a">
         <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
              <div class="listDetial" v-for="(item,index) in list" :key="index" >
                <p><span>订单编号：{{item.orderCode}}</span></p>     
                <p><span class="listTime">消费金额：￥{{item.surplusAmount}}</span><span >剩余金额：￥{{item.surplusAmount}}</span></p>
              </div>
        <!-- <van-collapse  v-model="activeNames"> -->
          <!-- <van-collapse-item name="1"> -->
            <!-- <div slot="title">
              {{item.createTime}}
              <span class="floatSpan">消费金额：￥{{item.consumptionAmount}}</span>
            </div>
           
              <div class="listDetial">
                <p><span>订单编号：{{item.orderCode}}</span><span>金额：￥{{item.surplusAmount}}</span></p>
                <span class="listTime">{{item.updateTime}}</span>
              </div>  -->     
          <!-- </van-collapse-item> -->
        <!-- </van-collapse> -->
        </van-list>
      </van-tab>
      <van-tab title="充值记录" name="b">
        <van-list v-model="loadings" :finished="finisheds" finished-text="没有更多了" @load="onLoads">
              <!-- <van-collapse v-model="active">
          <van-collapse-item name="1">
            <div slot="title">
              2019年9月
              <span class="floatSpan">总支出：￥53000</span>
            </div> -->
            
              <div class="listDetial" v-for="(item,index) in lists" :key="index">
                <p><span>姓名：{{item.bossName}}</span><span>金额：￥{{item.prepaidAmount}}</span></p>
                <span class="listTime">{{item.prepaidTime}}</span>
              </div>           
          <!-- </van-collapse-item>
        </van-collapse> -->
        </van-list>
      </van-tab>
    </van-tabs>
  </section>
</template>
<script>
import customBackHeader from "@/components/header/customBackHeader.vue";
import api from "../../api/goods";
export default {
  components: {
    customBackHeader
  },
  data() {
    return {
      list: [],
      lists: [],
      length:0,
      lengths:0,
      loading: false,
      loadings: false,
      finished: false,
      finisheds: false,
      activeName: "a",
      activeNames: ["0"],
      active:["0"],
      checkLists:[]
    };
  },
  methods: {
    //查看消费明细
    getPayDetial(){
      api.checkBillList({}).then(res =>{
        if(!res.data.error){
          this.length=res.data.length
          this.list=res.data
        }
      })
    },
    //查看充值记录
      getPayInDetial(){
      api.checkBillList({}).then(res =>{
        if(!res.data.error){
          this.length=res.data.length
          this.list=res.data
        }
      })
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        // for (let i = 0; i < 10; i++) {
        //   this.list.push(this.list.length + 1);
        // }
        // // 加载状态结束
        // this.loading = false;
        // // 数据全部加载完成
        // if (this.list.length >= 40) {
        //   this.finished = true;
        // }
         this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= this.length) {
          this.finished = true;
        }
      }, 500);
    },
       onLoads() {
      // 异步更新数据
      setTimeout(() => {
        // for (let i = 0; i < 10; i++) {
        //   this.list.push(this.list.length + 1);
        // }
        // // 加载状态结束
        // this.loading = false;
        // // 数据全部加载完成
        // if (this.list.length >= 40) {
        //   this.finished = true;
        // }
         this.loadings = false;

        // 数据全部加载完成
        if (this.lists.length >= this.lengths) {
          this.finisheds = true;
        }
      }, 500);
    },
    //获取s充值记录
    getRecords(){
api.checkRecord({}).then(res =>{
  if(!res.error){
    this.lengths=res.data.length
    this.lists=res.data
  }
})
    },
     goback() {
      this.$router.push("/mine");
    },
  },
  mounted() {
    this.getPayDetial();
    this.getRecords()
  }
};
</script>
<style lang="less" scoped>
.floatSpan{float:right}
.listDetial{
   color: #000;
   border-bottom:1px solid #ebedf0;
   padding: 0.1rem 0.2rem;
   background: #fff;
  P{display: flex;justify-content: space-between;margin-top: .1rem};
  .listTime{color: #999}
 }
</style>