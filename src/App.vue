<template>
  <div id="app">
    <router-view />
    <v-loading v-show="fetchLoading" v-if="isRouterAlive"></v-loading>
      <!-- TODO: 底部菜单组件是否要显示 -->
    <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>
</template>

<script>
import FooterGuide from '@/components/FooterGuide/FooterGuide.vue'
import Loading from '@/common/_loading'
export default {
  provide(){
return{
  reload:this.reload
}
  },
  components:{
    'v-loading':Loading,
    FooterGuide
  },
  data(){
    return{
      isRouterAlive:true
    }
  },
  computed:{
    fetchLoading(){
      return this.$store.state.fetchLoading
    }
  },
  created() {
  
  },
  methods:{
reload(){
  this.isRouterAlive = false;
  this.$nextTick(function(){
    this.isRouterAliv=true
  })
}
  },
  mounted() {

  }
}


</script>

<style lang="less">
html,body,#app{
  width: 100%;
  height: 100%;
  -webkit-tap-highlight-color:rgba(0,0,0,0)
}
html {
  height: 100%;
  font-size: calc(100vw/3.75)
}
body,
dd,
dl,
dt,
fieldset,
form,
h1,
h2,
h3,
h4,
h5,
h6,
html,
img,
legend,
li,
ol,
p,
ul {
    margin: 0;
    padding: 0;
    -moz-user-select:none;-webkit-user-select:none;
    -webkit-tap-highlight-color:transparent;
}

button,
fieldset,
img,
input {
    border: none;
    padding: 0;
    margin: 0;
    outline-style: none;
}

ul,li {
  background-color: #ffffff;
}
ol,
ul {
    list-style: none;
}

input {
    padding-top: 0;
    padding-bottom: 0;
    font-family: "SimSun", "宋体";
}

input,
select {
    vertical-align: middle;
}

input,
select,
textarea {
    font-size: 12px;
    margin: 0;
}
textarea {
    resize: none;
}

/*防止拖动*/
img {
    border: 0;
    vertical-align: middle;
}

/*  去掉图片低测默认的3像素空白缝隙*/
table {
    border-collapse: collapse;
}
//去斜体
i {
  font-style:normal
}
body {
    font-family: PingFangSC-Light,helvetica,'Heiti SC';
    color: #000;
    background: #f0f0f0;
    font-size: 0.14rem
}

a {
    color:#000;
    text-decoration: none;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    text-decoration: none;
    font-weight: normal;
    font-size: 100%;
    font-family: PingFangSC-Light,helvetica,'Heiti SC';
}

.ac {
    text-align: center;
}

@import '../static/css/index.less';
</style>
