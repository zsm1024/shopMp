<template>
  <section>
    <custom-back-header :leftArrow="true" @goback="goback" title="密码修改"></custom-back-header>
    <van-cell-group>
      <van-field required clearable v-model="ruleForm.oldPwd" label="旧密码" placeholder="请输入旧密码" />
      <van-field required clearable v-model="ruleForm.newPwd" label="新密码" placeholder="请输入新密码" />
      <van-field
        required
        clearable
        v-model="ruleForm.password_confirm"
        label="确认密码"
        placeholder="确认新密码"
      />
    </van-cell-group>
    <div class="btnList">
      <van-button class="btns" type="info" size="normal" @click="confirm(ruleForm)">确认修改</van-button>
      <van-button class="btns" type="warning" size="normal" @click="cancle">取消</van-button>
    </div>

    <!-- <Form ref="formInline" :model="formInline" :rules="ruleInline" >
      <FormItem prop="user">
        <Input type="text" v-model="formInline.user" placeholder="Username">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input type="password" v-model="formInline.password" placeholder="Password">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
      </FormItem>
    </Form>-->
  </section>
</template>
<script>
import customBackHeader from "@/components/header/customBackHeader.vue";
import { Notify } from 'vant';
export default {
  components: {
    customBackHeader
  },
  data() {
    return {
      ruleForm: {
        oldPwd: "",
        newPwd: "",
        password_confirm: ""
      }
    };
  },
  methods: {
    goback() {
      this.$router.push("/mine");
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    confirm() {
      if (!this.ruleForm.oldPwd=="" && !this.ruleForm.newPwd=="" && !this.ruleForm.password_confirm=="") {
        if (this.ruleForm.newPwd != this.ruleForm.password_confirm) {
            Notify({ type: 'danger', message: '新密码与确认密码不一致' });
        } else if (this.ruleForm.newPwd == this.ruleForm.oldPwd) {
             Notify({ type: 'danger', message: '新密码不能与旧密码一样' });
        } else {
          api.changPwd(para).then(res => {
            if (!res.error) {
                Notify({ type: 'success', message: '操作成功' });
              this.ruleForm={};
            //   this.$notify({
            //     message: "操作成功",
            //     type: "success"
            //   });
            } else {
                Notify({ type: 'danger', message: '操作失败' });
            }
          });
        }
      } else {
          Notify({ type: 'danger', message: '请将信息填写完整' });
      }
    },
    cancle(){
        this.ruleForm={};
        this.$router.push("/mine")
    }
  }
};
</script>
<style scoped>
.btnList {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #fff;
}
.btns {
  width: 1rem;
  margin: 0.2rem 0;
}
</style>