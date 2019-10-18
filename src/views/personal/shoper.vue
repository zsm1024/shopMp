
<template>
  <section class="workers">
    <custom-back-header :leftArrow="true" @goback="goback" title="店长管理"></custom-back-header>
    <div class="workerTable">
      <van-button color="#7232dd" @click="showPopup" size="small" style="margin:0.1rem">新增店长</van-button>
      <el-table :data="data">
        <el-table-column prop="account" label="账号"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <van-button v-if="scope.row.authStatus==0"  type="info" @click.native.prevent="give(scope.row)"  size="mini">授权</van-button>
            <van-button v-if="scope.row.authStatus==1"  type="primary" @click.native.prevent="cancleSCope(scope.row)"  size="mini">取消授权</van-button>
            <van-button  @click.native.prevent="check(scope.row)" type="danger" size="mini"> 移除</van-button>
            <van-button   @click.native.prevent="handleResetPassword(scope.row)" type="warning" size="mini"> 密码重置</van-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <van-popup v-model="show" style="width:80%;top:30%">
      <van-cell-group>
        <van-field required clearable v-model="addforms.account" label="账号" placeholder="名称" />
        <van-field required clearable v-model="addforms.name" label="姓名" placeholder="请输入手机号" />
        <van-field required clearable v-model="addforms.phone" label="电话" placeholder="名称" />
        <van-field required clearable v-model="addforms.email" label="邮箱" placeholder="名称" />
      </van-cell-group>
      <p style="text-align:center;padding:.1rem 0">
        <van-button color="#7232dd" @click="showPopups(addforms)" size="small">确认</van-button>
        <van-button color="red" @click="cancle" size="small">取消</van-button>
      </p>
    </van-popup>
  </section>
</template>

<script>
import api from "../../api/goods";
import customBackHeader from "@/components/header/customBackHeader.vue";
import { Dialog } from "vant";
export default {
  components: {
    customBackHeader
  },
  data() {
    return {
      data: [],
      show: false,
      addforms: {
        account: "",
        name: "",
        phone: "",
        email: ""
      }
    };
  },
  methods: {
    cancle() {
      this.show = false;
      this.addforms = {};
    },
    goback() {
      this.$router.push("/mine");
    },
    check(item) {
      let id = item.id;
      api.deleteShopowner(id).then(res => {
        if (!res.data.error) {
          this.$notify({
            message: "删除成功！",
            type: "success"
          });
          this.checkShopownerList();
        }
      });
    },
    give(item) {
      let authStatus = 1;
      let userId = item.id;
      api.Auth(userId, authStatus).then(res => {});
    },
    cancleSCope(item) {
       let authStatus = 0;
      let userId = item.id;
      api.Auth(userId, authStatus).then(res => {});
    },
    showPopup() {
      this.show = true;
    },
    showPopups(item) {
      let para = this.addforms;
      api.saveShopowner(para).then(res => {
        if (!res.data.error) {
          this.show = false;
          this.checkShopownerList();
        } else {
          this.$message.error(res.data.msg);
        }
        err => {
          this.$message.error(err.data.msg);
          this.show = false;
        };
      });
    },
    //查询店长列表
    checkShopownerList() {
      let para = {};
      api.checkShopowners(para).then(res => {
        this.data = res.data;
      });
    },
    handleResetPassword(id) {
      let ids = [id];
      Dialog.confirm({
        title: "提示",
        message: "是否确认将密码重置为：123456？"
      })
        .then(() => {
          api.resetPassword(ids).then(
            res => {
              if (res.data.error === false) {
                this.$message.success(res.data.msg);
                this.reload();
              } else {
                this.$message.error(res.data.msg);
              }
            },
            err => {
              this.$message.error(err.data.msg);
            }
          );
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    }
  },
  mounted() {
    this.checkShopownerList();
  }
};
</script>

<style lang="less" scope>
.workers {
  .workerTable {
    background: #fff;
    margin-top: 0.05rem;
    .van-col--6 {
      text-align: center;
      min-height: 0.4rem;
      line-height: 0.4rem;
      font-weight: bold;
      border-bottom: 1px solid #f0f0f0;
    }
  }
  .tableDetial {
    background: #fff;
    .van-col--6 {
      text-align: center;
      min-height: 0.4rem;
      line-height: 0.4rem;
      border-bottom: 1px solid #f0f0f0;
      span {
        color: #1d4dd3;
      }
    }
  }
}
</style>