
<template>
  <section class="workers">
    <custom-back-header :leftArrow="true" @goback="goback" title="店长管理"></custom-back-header>
    <div class="workerTable">
      <van-button color="#7232dd" @click="showPopup" size="small">新增店长</van-button>
      <el-table :data="data">
        <el-table-column prop="account" label="账号"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click.native.prevent="check(scope.row)" type="text" size="small">移除</el-button>
            <el-button
              @click.native.prevent="handleResetPassword(scope.row)"
              type="text"
              size="small"
            >密码重置</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <van-row type="flex">
        <van-col span="6">账号</van-col>
        <van-col span="6">姓名</van-col>
        <van-col span="6">电话</van-col>
        <van-col span="6">邮箱</van-col>
        <van-col span="6">操作</van-col>
      </van-row>
    </div>
    <div class="tableDetial">
      <van-row type="flex" v-for="(item,index) in data" :key="index">
        <van-col span="6">{{item.account}}</van-col>
        <van-col span="6">{{item.name}}</van-col>
        <van-col span="6">{{item.phone}}</van-col>
        <van-col span="6">{{item.email}}</van-col>
        <van-col span="8">
          <span @click="check(item)" style="color:red;display:inline-block;line-height:40px">删除</span>
          <span @click="handleResetPassword(item.id)" style="color:#7232dd;display:inline-block;line-height:40px">密码重置</span>
        </van-col>
      </van-row>-->
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
          this.checkShopownerList()
        }
      });
      console.log(item);
    },
    give(item) {
      console.log(item);
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