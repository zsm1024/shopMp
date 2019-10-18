<template lang="html">
  <!-- 在首页父组件发送http请求,后将数据通过props传递给子组件,可减少请求次数,减少服务器压力 -->
  <div class="index">
    <basic-header  title="工序流转" @clickEvent="send"></basic-header>
    <!-- <v-header/> -->
      <mt-button
    type="primary"
    @click="openScan">
    跳到新页面
  </mt-button>
<van-button type="default">默认按钮</van-button>
<van-button type="primary">主要按钮</van-button>
<van-button type="info">信息按钮</van-button>
<van-cell-group>
  <van-cell title="单元格" value="内容" />
  <van-cell title="单元格" value="内容" label="描述信息" />
</van-cell-group>
    <!-- <v-swiper :swiperData="datas.swiper"/>
    <v-service/>
    <v-section1 :list="datas.section1.list" :banner='datas.section1.banner'/>
    <v-section2 :list="datas.section2.list" :banner='datas.section2.banner'/>
    <v-section3/>
    <v-section4 :list="datas.section4.list" :banner='datas.section4.banner'/>
    <v-baseline/> -->
    <!-- <v-footer/> -->
  </div>
</template>

<script>
import basicHeader from '@/components/header/basicHeader.vue'
// import Header from '@/components/index/header.vue'
import Swiper from '@/components/index/swiper.vue'
import Service from '@/components/index/service.vue'
import Section1 from '@/components/index/section1.vue'
import Section2 from '@/components/index/section2.vue'
import Section3 from '@/components/index/section3.vue'
import Section4 from '@/components/index/section4.vue'
import Baseline from '@/common/_baseline.vue'
import Footer from '@/common/_footer.vue'
import index from '@/http/mock.js' //模拟数据
export default {
  components: {
    'basic-header': basicHeader,
    'v-swiper': Swiper,
    'v-service': Service,
    'v-section1': Section1,
    'v-section2': Section2,
    'v-section3': Section3,
    'v-section4': Section4,
    'v-baseline': Baseline,
    'v-footer': Footer
  },
  data() {
    return {
      datas: {
        section1:{},
        section2:{},
        section3:{},
        section4:{},
        swiper:[]
      },
      loading: true
    }
  },
  methods: {
    send() {
      console.log('发送执行方法')
    },
    openScan() {
      this.$router.push({ path: "/newpage"});

    }
  },
  beforeCreate() {
    // this.$api({
    //   method: 'post',
    //   url: '/index'
    // }).then((response) => {
    //   this.datas = response.data;
    // }).catch(function(error) {
    //   alert(error)
    // })
  }
}
</script>



<style lang="less" scoped>
.index {
    width: 100%;
    padding-bottom: 14vw;
    background-color: #F8FCFF;
}
</style>
