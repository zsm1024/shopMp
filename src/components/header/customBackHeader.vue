<!-- 通用基础导航 -->
<template>
  <div>
    <div class="custombackheader">
      <van-nav-bar
        :title="title"
        :right-text="rightText"
        :left-arrow="leftArrow"
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    </div>
    <div class="base-layout"></div>
  </div>
</template>

<script>
import baselayout from "@/components/layout/baselayout.vue";
/**
 * @Boolean leftArrow  是否显示左侧返回按钮
 * @String rightText  右侧按钮文字，有则有点击事件，否则无
 */
export default {
  props: {
    title: String,
    leftArrow: Boolean,
    rightText: String
  },
  data() {
    return {};
  },
  methods: {
    onClickLeft() {
      //返回上一层
      this.$emit("goback");
    },
    onClickRight() {
      // 右侧执行事件
      this.$emit("clickEvent");
    }
  },
  components: {
    baselayout
  }
};
</script>
<style  scoped>
.custombackheader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}
.base-layout {
  padding-bottom: 46px;
}
</style>