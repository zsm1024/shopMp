<template>
  <section class="EditList">
    <custom-back-header :leftArrow="true" @goback="goback" title="修改订单"></custom-back-header>
    <div class="headerTitle">
      <div class="headermain">
        <p>
          <span>货物总价：</span>
          <span>568.00元</span>
        </p>
        <p>
          <span>货行总价：</span>
          <span>2</span>
          <span style="margin-left:0.4rem">数量总量：</span>
          <span>6.0</span>
        </p>
      </div>
    </div>
    <div class="EditLists">
      <p>
        <van-icon name="wap-home" style="color:#000" />无锡仓
      </p>
      <div>
        <van-checkbox-group v-model="result">
          <van-checkbox v-for="(item,index) in list" :key="index" :name="item">
            <van-card
              price="158.0元/箱"
              title="韩国海泰棉花糖三种包装颜色混装15g*20杯/箱"
              thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
            >
            <div slot="tags" class="lists">
          <span class="spanB">已降16</span>
        </div>
              <div slot="footer" class="cardFooter">
                <span><van-icon name="delete" />删除</span>
                <van-stepper v-model="value" integer class="step" />
              </div>
            </van-card>
          </van-checkbox>
        </van-checkbox-group>
      </div>
    </div>
    <div class="subChageList">
      <van-submit-bar :price="3050" label="合计(不含税)：" button-text="提交订单" @submit="onSubmit">
        <van-checkbox v-model="checked">全选</van-checkbox>
      </van-submit-bar>
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
      value: "",
      checked: "ture",
      list: ["a", "b", "c"],
      result: ["a", "b"]
    };
  },
  methods: {
    goback() {
      this.$router.push("/mine");
    },
    onSubmit() {}
  }
};
</script>
<style lang="less" scoped>
.headerTitle {
  background: #fff;
  padding: 0.1rem 0;
  .headermain {
    border: 1px solid #999;
    border-radius: 4px;
    width: 95%;
    margin: 0 auto;
    padding: 0.1rem 0
  }
}
.EditLists {
  background: #fff;
  margin-top: 0.1rem;
  .van-icon-wap-home {
    margin-right: 0.1rem;
    font-size: 0.2rem;
  }
  .van-checkbox {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .van-checkbox__icon {
      margin-left: 0.2rem !important;
    }
  }
  .van-card {
    background: #fff !important;
    border-bottom: 1px solid #f0f0f0;
    padding: 0.1rem 0;
  }
  .van-card__title {
    color: #4ea449;
  }
  .van-card__thumb {
    height: 55px !important;
    width: 55px !important;
  }
  .van-card__content {
    min-height: unset !important;
  }
  .cardFooter{display: flex;text-align: right;justify-content: flex-end;
    align-items: center}
  .cardFooter>span{margin: 0 0.2rem;color: #5a68b9}
}
.EditLists > p {
  border-bottom: 1px solid #f0f0f0;
  padding: 0.1rem;
  display: flex;
}
</style>