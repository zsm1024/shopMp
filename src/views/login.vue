<!-- 首页 -->
<template>
  <div class="mainDiv">
    <basic-header :leftArrow="true" title="登录页"></basic-header>
    <div class="g-main">
      <p style="width:100%;text-align:center;color:#fff;font-weight:blod;font-size:0.2rem;margin-bottom:.2rem">系统登录 </p>
      <van-cell-group class="CellGroup">
        <van-field
          :left-icon="icon.username"
          v-model="inputData.username"
          clearable
          :error-message="hint.username.content"
          placeholder="请输入账号"
          maxlength="20"
        />
      </van-cell-group>
      <van-cell-group class="CellGroup">
        <van-field
          :left-icon="icon.passWord"
          @click-left-icon="passWordIconFn"
          v-model="inputData.password"
          :type="icon.passWord_type"
          clearable
          :error-message="hint.password.content"
          placeholder="请输入密码"
          minlength="6"
          maxlength="25"
        />
      </van-cell-group>
      <van-button
        class="login_botton"
        tapmode
        type="info"
        size="large"
        @click="login"
        :disabled="status.disabled"
        loading-type="spinner"
      >登录</van-button>
    </div>
  </div>
</template>

<script>
import * as util from "../util/util";
import basicHeader from "@/components/header/basicHeader.vue";
import api from "../api/api";
export default {
  data() {
    return {
      //表单数据
      inputData: {
        username: "admin",
        password: "123456"
      },
      //错误提示部分初始化
      hint: {
        username: {
          content: ""
        },
        password: {
          content: ""
        }
      },
      status: {
        username: false, //账号是否验证通过
        passWord: false, //密码是否验证通过
        login: false, //登录按钮是否允许点击
        loginBotton: false, //登录按钮是否可用
        disabled: false
      },
      skips: {
        passwordforget: "passwordforget"
      },
      icon: {
        username: "contact", //用户图标
        passWord: "closed-eye", //密码图标
        passWord_type: "password" //密码类型
      },
      loginLoading: false
    };
  },
  computed: {},
  created() {


  },
  methods: {
    //密码的显示隐藏函数
    passWordIconFn() {
      this.icon.passWord === "eye-o"
        ? (this.icon.passWord = "closed-eye")
        : (this.icon.passWord = "eye-o");
      this.icon.passWord_type === "text"
        ? (this.icon.passWord_type = "password")
        : (this.icon.passWord_type = "text");
    },
    //账号格式验证函数
    username() {
      //   this.inputData.loginName = util.removeAllSpace(this.inputData.loginName);  //验证空字符串
      //   console.log(this.inputData.loginName)
      this.status.username = util.isLoginName(this.inputData.username); //验证账号格式
      //如果通过验证，则删掉错误提示 否则，显示错误提示
      this.status.username
        ? (this.hint.username.content = "")
        : (this.hint.username.content =
            "*账号以字母开头,后面跟任意数字或者大、小写字母,共计3-20位的长度");
    },

    //密码格式验证函数
    passWord() {
      //   this.inputData.password = util.removeAllSpace(this.inputData.password); //去除空格
      //   console.log(this.inputData.password)
      this.status.passWord = util.isPassWord(this.inputData.password); //去除空格后的密码验证
      // 如果通过验证，则删掉错误提示 否则，显示错误提示
      this.status.passWord
        ? (this.hint.password.content = "")
        : (this.hint.password.content =
            "*密码由6-25位的大小写字母或数字组成");
    },
    login() {
        // this.$router.push('/home')
     this.username();
     this.passWord();
     if (this.status.username && this.status.passWord) {
       // console.log(this.inputData);
       this.loginLoading = true;
       //数据抽取赋值

       api.login(this.inputData).then(
         res => {
              console.log(res.data);
             localStorage.setItem('userInfo', JSON.stringify(res.data))
             this.$store.commit('SET_USERINFO', res.data)
            this.$router.push('/home')
         },
         err => {
           this.$toast(res.msg);
           this.loginLoading = false;
         }
       );
     }
    }
  },
  mounted() {},
  components: {
    basicHeader
  }
};
</script>
<style  scoped>
.CellGroup{width: 90%;margin:0.2rem auto;}
 .CellGroup .van-cell{border-radius: .08rem;}
.mainDiv{background: url("../../static/img/index.png") no-repeat center;background-size: contain;height: 100%;}
.g-main {
  margin: 0 5%;
  margin-top: 30%;
  padding: .2rem 0;
  background-color: rgba(160, 160, 160, 0.5)
}
.g-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 30px;
}
.g-footer > span {
  display: inline-block;
  padding: 0 10px;
  color: rgba(160, 160, 160, 1);
}

.login_botton {
  margin-top: 50px;
}
.van-field__control {
  padding: 0 10px;
}
</style>
