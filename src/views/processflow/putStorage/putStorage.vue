<!-- 入库操作 -->
<template>
  <div class="Fu">
    <custom-back-header
      :leftArrow="true"
      @goback="goback"
      title="入库操作"
      rightText="提交"
      @clickEvent="goPageTo()"
    ></custom-back-header>
    <!-- <baselayout></baselayout> -->
    <van-row type="flex" justify="space-between" class="storage-title">
      <van-col span="12">总数量：{{showputStorages.amount}}</van-col>
      <van-col span="12" class="btn">
        <van-button type="primary" @click="goOnFn()">添加入库</van-button>
      </van-col>
    </van-row>
    <!-- <div class="button_Fu button_pageA">
      <van-button type="primary" @click="goOnFn()">添加入库</van-button>
    </div> -->
    <article class="lists" v-if="showputStorages">
      <div class="chunk"  v-for="(storage,index) in showputStorages.recordbList" :key="index">
        <section class="chunk_Tou">
          <h4>第 {{index+1}} 条</h4>
          <div class="button_Fu">
            <van-button type="default" size="small" @click="editWare(index)">编辑</van-button>
          </div>
        </section>
        <section class="inputs">
          <van-cell-group>
            <van-field
              v-model="storage.ManufactureOrderCode"
              label="工单编号"
              readonly
            />
          </van-cell-group>
          <van-cell-group>
            <van-field v-model="storage.productname" label="产品名称"  readonly/>
          </van-cell-group>
          <van-cell-group>
            <van-field v-model="storage.quantity" label="数量"  readonly/>
          </van-cell-group>
          <van-cell-group>
            <van-field v-model="storage.unit" label="单位"  readonly/>
          </van-cell-group>
        </section>
      </div>
    </article>

    <article class="inputs"></article>
  </div>
</template>

<script>
import api from "@/api/api";
import { mapState, mapGetters } from "vuex";
import customBackHeader from "@/components/header/customBackHeader.vue";
export default {
  data() {
    return {
      readonly: true
    };
  },
  computed: {
    // ...mapState(['showputStorages'])
    ...mapGetters(["showputStorages","putStorages"])
  },
  mounted() {
    // console.log(this.showputStorages)
  },
  methods: {
    goPageTo() {
      //this.$router.push('/applyTransfer')
      api.warehousing(this.putStorages).then(
        res => {
          console.log(res)
          if(res.code == 200) {
            this.$toast(res.msg);
        //    this.$store.commit('CLEAR_INVENTORY')
            // this.$router.push('/applyTransfer')
          }
        },
        err => {
          this.$toast(err.msg);
        }
      );
      // var params ={"sprocessid":"1117981065354096642","tprocessid":"1128564553849430018","workcode":"MO-2019-04-0001","productid":"1","turnOrderbs":[{"investmentName":"物料三","produceName":"物料二","iUnit":"1","pUnit":"1","iNum":"23","pNum":"12"}]}
      // api.turnorderadd(params).then(
      //   res => {
      //     console.log(res)
      //   },
      //   err => {
      //     // this.$toast(err.msg);
      //     console.log(err)
          
      //   }
      // );
      
    },
    goOnFn() {
      //添加入库
      this.$router.push("/addInventory");
      this.$store.commit("EDIT_INVENTORY_INDEX", null);
    },
    editWare(editindex) {
      //编辑入库信息
      this.$router.push({
        path: "/addInventory"
      });
      this.$store.commit("EDIT_INVENTORY_INDEX", editindex);
    },
    goback() {
      this.$store.commit('CLEAR_INVENTORY')
      this.$router.push("/home");

    }
  },
  
  components: {
    customBackHeader
  }
};
</script>
<style lang="less"  scoped>
.storage-title {
  align-items: center;
  padding: 0 20px;
  margin-top: 10px;
  .btn {
    text-align: right;
  }
}

.chunk {
  padding: 10px;
  margin: 10px;
  border: solid 1px rgba(230, 230, 230, 1);
  box-shadow: 2px 2px 6px 0 #666;
  background-color: white;
  border-radius: 10px;
}

.chunk_Tou {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chunk_Tou h4 {
  font-family: 楷体;
  font-weight: 400;
  text-align: left;
  font-size: 16px;
}
.chunk_Tou .button_pageA {
  background-color: #4323de;
  opacity: 0.6;
}

.button_Fu {
  margin: 0;
  padding: 10px;
  display: flex;
  justify-content: flex-end;
}

.van-field__control {
  text-align: right;
}
</style>
