<!--  -->
<template>
  <div>
    <van-tabbar v-model="active" active-color="#e51d1d" >
      <van-tabbar-item replace name="wap-home" to="/home" icon="wap-home">首页</van-tabbar-item>
      <van-tabbar-item replace name="cart" to="/cart" icon="shopping-cart">购物车</van-tabbar-item>
      <van-tabbar-item replace name="friends" to="/mine" icon="manager">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'FooterGuide',
  data() {
    return {
      active:"wap-home"
    };
  },
  watch: {
      $route(to,from){
      let path = to.path;
      if (path == "/home") {
          this.active ="wap-home";
        } else if (path == "/cart") {
          this.active = "cart";
        } else if (path == "/mine") {
          this.active ="friends";
        }
        }
  },
  computed: {
    activeindex() {

    }
  },

  methods: {},
  mounted() {
    //TODO: 监听路由路径，修改相对应的底部的菜单项
    let path = this.$route.path;
    // console.log(this.$route)
    // if (path == "/home") {
    //     this.active = 0;
    //   } else if (path == "/cart") {
    //     this.active = 1;
    //   } else if (path == "/mine") {
    //     this.active = 2;
    //   }
  }
};
</script>
<style  scoped>


</style>