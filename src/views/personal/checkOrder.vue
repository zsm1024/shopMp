<!-- 首页 -->
<template>
<section>
  <div class="mine">
    <!-- <basic-header title="个人中心"></basic-header> -->
    <div class="MyOrder">
      <div class="titles">
        <h4>我的订单</h4>
        <span class="checkAll" @click="checkAllList">查看全部》</span>
      </div>
      <div>
        <van-tabbar class="tabbars" v-model="active" @change="changes">
          <van-tabbar-item></van-tabbar-item>
          <van-tabbar-item name="noPay" icon="clock">待付款</van-tabbar-item>
          <van-tabbar-item name="home" icon="checked">已付款</van-tabbar-item>
          <van-tabbar-item></van-tabbar-item>
        </van-tabbar>
      </div>
    </div>
    <div class="DataList">
        <van-panel title="订单编号:" desc="201909201211545413454" status="【未付款】">
        <div class="ListDetial">
          <p class="FlexP">
            <label><span class="SpanName">货物总价：</span><span  class="SpanName">￥568.00</span></label>
            <label>
              <span>运&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;费：</span><span  class="SpanName">￥568.00</span>
            </label>          
            </p>
          <p class="FlexP">
            <label>
              <span class="SpanName">实付合计：</span><span class="RealPay SpanName">￥568.00</span>
            </label>
            <label>
              <span>缺&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;货：</span><span  class="SpanName">0</span>
            </label>
            </p>
          <p><span class="SpanName">退款合计：</span><span  class="SpanName">￥0.00</span></p>
        </div>
        <div slot="footer" class="OrderFooter">
          <van-button size="small" type="primary" @click="checkDetial">查看</van-button>
          <van-button size="small" type="primary">打款</van-button>
           <van-button size="small" type="warning" @click="EditList">修改</van-button>
          <van-button size="small" type="danger">删除</van-button>
        </div>
      </van-panel>
      <van-panel title="订单编号:" desc="201909201211545413454" status="【未付款】">
        <div class="ListDetial">
          <p class="FlexP">
            <label><span class="SpanName">货物总价：</span><span  class="SpanName">￥568.00</span></label>
            <label>
              <span>运&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;费：</span><span  class="SpanName">￥568.00</span>
            </label>          
            </p>
          <p class="FlexP">
            <label>
              <span class="SpanName">实付合计：</span><span class="RealPay SpanName">￥568.00</span>
            </label>
            <label>
              <span>缺&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;货：</span><span  class="SpanName">0</span>
            </label>
            </p>
          <p><span class="SpanName">退款合计：</span><span  class="SpanName">￥0.00</span></p>
        </div>
        <div slot="footer" class="OrderFooter">
          <van-button size="small" type="primary" @click="checkDetial">查看</van-button>
          <van-button size="small" type="warning"  @click="EditList">修改</van-button>
          <van-button size="small" type="danger">删除</van-button>
        </div>
      </van-panel>   
    </div>
    <div style="height:0.6rem"></div>
  </div>
  </section>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import VanFieldSelectPicker from "@/components/VanFieldSelectPicker/VanFieldSelectPicker";
import basicHeader from "@/components/header/basicHeader.vue";
import { forEach } from "async";
export default {
  components: {
    basicHeader,
    VanFieldSelectPicker
  },
  data() {
    return {
      active: 1,
      value1: "",
      selectData: [
        {
          text: "name1",
          id: "1",
          name: "公斤"
        },
        {
          text: "name2",
          id: "2",
          name: "长度"
        }
      ]
    };
  },
  computed: {},
  mounted() {},
  methods: {
    changes() {
      console.log(this.active);
    },
    checkList() {
      this.$router.push({ path: "/checkList" });
    },
    checkAllList() {
      this.$router.push({ path: "/myList" });
    },
    checkDetial() {
      this.$router.push({ path: "/checkDetial", query: { id: "123" } });
    },
    EditList() {
      this.$router.push({ path: "/editList", query: { id: "123" } });
    },
    checkWorker() {
      this.$router.push({ path: "/worker" });
    },
    changeAddress(){
      this.$router.push({ path: "/addressEdit" });
    }
  }
};
</script>
<style lang="less"  scoped>
.profile {
  background: #fafafa;
}
.profile-info {
  display: flex;
  align-items: flex-end;
  padding: 20px 15px;
  background: #fff;
  .info-avtor {
    width: 50px;
    height: 50px;
    margin-right: 20px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .info-name {
    color: #000;
  }
}
.van-cell-group {
  margin-top: 10px;
}
.loginOut-warpper {
  margin-top: 10px;
  background: #fff;
  .van-button {
    width: 80%;
  }
}
.headerBg {
  height: 1.6rem;
  background: #930909;
  .header {
    height: 1.5rem;
    width: 90%;
    margin: 0 auto;
    background: #fff;
    border-radius: 10px;
    position: absolute;
    top: 0.5rem;
    left: 5%;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    box-shadow: 0px 0px 10px #dbd7d7;
    .Icon {
      font-size: 0.18rem;
      height: 0.3rem;
      width: 0.3rem;
      border-radius: 0.15rem;
      display: inline-block;
      color: #fff;
      text-align: center;
      line-height: 0.3rem;
      margin: 0 0.2rem;
    }
    .money {
      margin-left: 0.5rem;
    }
    .pre {
      background: #c42828;
    }
    .members {
      background: #c07416;
    }
    .van-row {
      margin-left: 0.2rem;
      .iconImg {
        height: 0.6rem;
        width: 0.6rem;
        border-radius: 0.3rem;
        display: inline-block;
        margin: 0.3rem;
        border: 2px solid #fcf6f6;
        position: absolute;
        top: -53px;
        left: -13px;
        text-align: center;
      }
      .cartList {
        text-align: right;
        margin-right: 0.1rem;
      }
      .userName {
        font-weight: bold;
        font-size: 0.16rem;
      }
      .van-icon {
        margin-top: 0.05rem;
      }
    }
  }
}
.MyOrder {
  background: #fff;
  div {
    height: 0.4rem;
    border-bottom: 1px solid #f0f0f0;
    width: 90%;
    margin: 0 auto;
    line-height: 0.4rem;
    display: flex;
    align-items: center;
    
    .van-icon {
      font-size: 18px !important;
      margin-right: .1rem;
      color: #c42828;
    }
  }
  .titles {
    display: flex;
    justify-content: space-between;
    padding: 0.1rem;
    border-bottom: 1px solid #000;
  }
  .checkAll {
    color: #a49f9f;
  }
}
.tabbars {
  position: unset;
}
.DataList {
  padding: 0 0.05rem;
  .van-cell__title {
    display: flex !important;
    span {
      width: 0.6rem !important;
    }
  }
  .van-panel__header {
    border-radius: 8px 8px 0 0 !important;
    background: #f7f3f3;
  }
  .van-panel {
    border-radius: 8px;
  }
}
.ListDetial {
  padding: 0.1rem;
  .RealPay {
    color: red;
  }
}
.OrderFooter {
  text-align: center;
}
</style>
