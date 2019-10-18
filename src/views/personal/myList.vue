<template>
  <section class="checkList">
    <custom-back-header :leftArrow="true" @goback="goback" title="我的订单"></custom-back-header>
    <van-tabs v-model="activeName" @click="TabClick">
      <van-tab title="全部" name="a">
        <div class="DataList" v-for="(item,index) in datas" :key="index">
          <van-panel title="订单编号:" :desc="item.orderCode" :status="item.statue">
            <div class="ListDetial">
              <p class="FlexP">
                <label>
                  <span class="SpanName">货物总价：</span>
                  <span class="SpanName">￥{{item.goodsTotalPrice}}</span>
                </label>
                <label>
                  <span class="SpanName">运&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;费：</span>
                  <span class="SpanName">￥{{item.freight}}</span>
                </label>
              </p>
              <p class="FlexP">
                <label>
                  <span class="SpanName">实付合计：</span>
                  <span class="RealPay SpanName">￥{{item.realPay}}</span>
                </label>
                <label>
                  <span class="SpanName">缺货数量：</span>
                  <span class="SpanName">{{item.stockout}}</span>
                </label>
              </p>
              <p class="FlexP">
                <label>
                  <span class="SpanName">退款合计：</span>
                  <span class="SpanName">￥{{item.refund}}</span>
                </label>
                <label>
                  <span class="SpanName">重量合计：</span>
                  <span class="SpanName">{{item.totalWeight}}kg</span>
                </label>
              </p>
            </div>
            <div slot="footer" class="OrderFooter">
              <van-button size="small" @click="checkDetial(item)" type="info">查看详情</van-button>
              <!-- <van-button size="small" type="primary">修改</van-button>
              <van-button size="small" type="danger">删除</van-button> -->
            </div>
          </van-panel>
        </div>
      </van-tab>
      <van-tab v-if="level==0" title="审核通过" name="pass" style="position:relative;">
        <div slot="title"> 审核通过</div>
         <div class="DataList" v-for="(item,index) in datas" :key="index">
          <van-panel title="订单编号:" :desc="item.orderCode" :status="item.statue">
            <div class="ListDetial">
              <p class="FlexP">
                <label>
                  <span class="SpanName">货物总价：</span>
                  <span class="SpanName">￥{{item.goodsTotalPrice}}</span>
                </label>
                <label>
                  <span class="SpanName">运&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;费：</span>
                  <span class="SpanName">￥{{item.freight}}</span>
                </label>
              </p>
              <p class="FlexP">
                <label>
                  <span class="SpanName">实付合计：</span>
                  <span class="RealPay SpanName">￥{{item.realPay}}</span>
                </label>
                <label>
                  <span class="SpanName">缺货数量：</span>
                  <span class="SpanName">{{item.stockout}}</span>
                </label>
              </p>
              <p class="FlexP">
                <label>
                  <span class="SpanName">退款合计：</span>
                  <span class="SpanName">￥{{item.refund}}</span>
                </label>
                <label>
                  <span class="SpanName">重量合计：</span>
                  <span class="SpanName">{{item.totalWeight}}kg</span>
                </label>
              </p>
            </div>
            <div slot="footer" class="OrderFooter">
              <van-button size="small" @click="checkDetial(item)" type="info">查看详情</van-button>
              <!-- <van-button size="small" type="primary">修改</van-button>
              <van-button size="small" type="danger">删除</van-button> -->
            </div>
          </van-panel>
        </div>
      </van-tab>
      <van-tab v-if="!level==0" title="未通过" name="b" style="position:relative;"></van-tab>
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
      level:"",
      list: [],
      loading: false,
      finished: false,
      activeName: "a",
      activeNames: ["0"],
      datas: []
    };
  },
  methods: {
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500);
    },
    goback() {
      this.$router.push("/mine");
    },
    TabClick(name, title) {
      console.log(name, title);
    },
    checkDetial(item) {
      this.$router.push({ path: "/checkDetial", query: { id: item } });
      console.log(item);
    },
    getDataList() {
      api.checkOrderList({}).then(res => {
        if (!res.data.error) {
          this.datas = res.data;
        }
        console.log(res);
      });
    }
  },
  mounted() {
    this.level=JSON.parse(localStorage.getItem("userInfo")).level
    this.getDataList();
  }
};
</script>
<style lang="less" scoped>
.floatSpan {
  float: right;
}
.listDetial {
  color: #000;
  border-bottom: 1px solid #ebedf0;
  padding: 0.05rem 0;
  p {
    display: flex;
    justify-content: space-between;
  }
  .listTime {
    color: #999;
  }
}
.NoNum {
  width: 0.2rem;
  height: 0.2rem;
  border-radius: 0.1rem;
  background: red;
  color: #fff;
  display: inline-block;
  text-align: center;
  line-height: 0.2rem;
  position: absolute;
  top: 5px;
  right: 20px;
}
.DataList {
  margin-top: 0.1rem;
  .van-panel__header {
    border-radius: 8px 8px 0 0 !important;
    background: #fff;
  }
}
</style>