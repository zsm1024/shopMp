<template>
  <div style="background:#000;">
    <!-- <header>
      <span class="icon-go" @click="goback"></span>
      <h1>扫码页</h1>
    </header> -->
    <custom-back-header
      :leftArrow="true"
      @goback="goback"
      title="扫码页"
    ></custom-back-header>
    <!-- <button @click="submitdata">提交突变</button> -->
    <div id="code">
      <div
        style="width:100%;height:90.5vh; background-color: #fff; margin:auto; text-align: center"
        class=""
      ></div>
      <p class="tip" style="text-align: center">...载入中...</p>
    </div>
    <!-- <p>将二维码放入框内，即可自动扫描</p> -->
    <!-- <div class="sweep" @click="sweep">开始扫码</div> -->
  </div>
</template>

<script type='text/ecmascript-6'>
import customBackHeader from "@/components/header/customBackHeader.vue";
let barcode = null;
export default {
  data() {
    return {
    };
  },
  created(){
  //  this.$store.commit('OUT_materialsCode',"23753");
//    this.$router.go(-1);
  },
  methods: {
    plusReady() {
      const self = this;
      // 获取窗口
      self.scan = new plus.barcode.Barcode("code");
      self.scan.onmarked = self.onmarked;
    },
    sweep() {
      const self = this;
      self.scan.start();
    },
    onmarked(type, result) {
      const self = this;
      var text = "未知: ";

      switch (type) {
        case plus.barcode.QR:
          type = "QR";
          break;
        case plus.barcode.EAN13:
          type = "EAN13";
          break;
        case plus.barcode.EAN8:
          type = "EAN8";
          break;
        default:
          type = "其他" + type;
          break;
      }

      result = result.replace(/\n/g, "");
      // this.sweep()
      if (result) {

        self.scan.cancel();
        self.scan.close();

        //定义相关vuex操作
        this.$store.commit('OUT_code',result);
        console.log("this.$store.state.outStorage.code",this.$store.state.outStorage.code);
        self.$router.go(-1);
      //  this.$router.push("/outStorage");

      }
      // this.$router.push({ path: "/pickUpInfo", query: { result: result } });
      // if (result.indexOf("http://") == 0 || result.indexOf("https://") == 0) {
      //   plus.nativeUI.confirm(
      //     result,
      //     function(i) {
      //       if (i.index == 0) {
      //         self.back(); //返回上个页面
      //         plus.runtime.openURL(result);
      //       } else {
      //         self.back(); //返回上个页面
      //       }
      //     },
      //     "",
      //     ["打开", "取消"]
      //   );
      // } else {
      // self.back(); //返回上个页面
      //   plus.nativeUI.alert(result);
      // }
    },
    goback() {
      // console.log('返回上一页');
      this.scan.close();
      // this.back(); //返回上个页面
      this.$router.go(-1);
    }
  },
  mounted() {
    const self = this;
    if (window.plus) {
      self.plusReady();
    } else {
      document.addEventListener("plusready", self.plusReady, false);
    }
    document.addEventListener(
      "DOMContentLoaded",
      function() {
       // alert("DOMLoaded");
        self.domready = true;
        self.plusReady();
      },
      false
    );
    this.sweep();
  },
  components: {
    customBackHeader
  }
};
</script>
<style lang="less" scoped>
header {
  background-color: #f8fcff;
  text-align: center;
  position: relative;
  height: 12vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4vw;
  h1 {
    letter-spacing: 0.2vw;
    font-weight: 600;
    margin-right: 36vw;
  }
  span,
  a {
    display: inline-block;
    transform: rotate(-180deg);
    &::before {
      color: #333;
    }
  }
}
.icon-go {
  width: 10px;
  height: 10px;
  border-top: 2px solid #000;
  border-left: 2px solid #000;
  transform: rotate(-45deg);
}
</style>
