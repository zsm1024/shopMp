<!-- 通用基础导航 -->
<template>
  <div>
      <van-nav-bar
        :title= title
        :right-text= rightText
        :left-arrow = leftArrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
  </div>
</template>

<script>
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
  data () {
    return {
    };
  },
  methods: {
      onClickLeft() {
        //返回上一层
        this.$router.go(-1);
      },
      onClickRight() {
        // 右侧执行事件
         this.$emit('clickEvent')
      }
  },
}

</script>
<style  scoped>
</style>