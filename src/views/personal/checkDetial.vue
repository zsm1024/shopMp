<template >
  <section class="listDetial">
    <custom-back-header :leftArrow="true" @goback="goback" title="订单详情"></custom-back-header>
    <div class="MianInfo">
      <van-cell title="订单编号" :value="forms.orderCode" size="large" />
      <van-cell title="下单时间" :value="forms.createTime" size="large" />
      <van-cell title="电话" :value="forms.phoneNum" size="large" />
      <van-cell title="收货地址" :value="forms.addressee" size="large" />
      <van-cell title="发货方式" :value="forms.transport" size="large" />
      <van-cell title="包含总类" :value="forms.categoryAmount" size="large" />
      <van-cell title="总重量" :value="forms.totalWeight" size="large" />
      <van-cell title="货物总价" :value="forms.goodsTotalPrice" size="large" />
      <van-cell title="运费" :value="forms.freight" size="large" />
      <van-cell title="实付合计" :value="forms.realPay" size="large" />
      <van-cell title="缺货" :value="forms.stockout" size="large" />
      <van-cell title="退款合计" :value="forms. refund" size="large" />
      <van-cell title="服务费" :value="forms.serviceFee" size="large" />
      <van-cell title="备注" :value="forms.remark" size="large" />
    </div>
    <div>
      <van-card v-for="(item,index) in forms.orderDetailList"  :key="index"
        :num="item.amount"
        :price="item.price"
        :title="item.goodsName"
        :thumb="item.fileInfoList[0].filePath"
      >
        <div slot="tags" class="lists">
           <label><span class="spanB">购买数量：</span><span class="spanLabel">{{item.amount}}</span></label>
          <label><span class="spanB">缺货数量：</span><span class="spanLabel">{{item.stockout}}</span></label>
        </div>
        <div slot="tags" class="lists">
          <span class="spanB">发货仓库:</span><span>{{item.wareHose}}</span>
        </div>
      </van-card>
         <!-- <van-card
        num="2"
        price="158.0元/箱"
        title="韩国海泰棉花糖三种包装颜色混装15g*20杯/箱"
        thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
      >
        <div slot="tags" class="lists">
           <label><span class="spanB">购买数量：</span><span class="spanLabel">2</span></label>
          <label><span class="spanB">缺货数量：</span><span class="spanLabel">2</span></label>
        </div>
        <div slot="tags" class="lists">
          <span class="spanB">发货仓库:</span><span>无锡仓库</span>
        </div>
      </van-card> -->
    </div>
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
      value: "1",
      forms:{}
    };
  },
  methods: {
    goback() {
      this.$router.push("/mine");
    }
  },
  mounted() {
    this.forms=this.$route.query.id
    console.log(this.$route.query.id);
  }
};
</script>
<style lang="less" scoped>
.van-cell {
  padding: 5px 10px;
  line-height: 15px;
}
.cardFooter {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.listDetial {
  padding: 5px;
  .van-card {
    background: #fff;
    margin-top: 0.1rem;
  }
  // .spanLabel {
  //   margin-left: 0.2rem;
  // }
  .lists{
    label{margin-right: 0.4rem}
    padding: 0.05rem 0;
    .spanB{font-weight: bold}
  }
}
</style>