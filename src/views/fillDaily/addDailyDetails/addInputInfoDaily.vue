<!-- 投入信息 -->
<template>
  <div>
    <custom-back-header
      :leftArrow="true"
      @goback="goback"
      title="投入信息"
      rightText="下一步"
      @clickEvent="goPageTo"
    ></custom-back-header>
    <van-radio-group
      v-model="inputInfos.bagMakingProcess"
      v-if="processName == '制袋'"
      class="radio-warpper"
    >
      <van-radio name="1">拆边插底</van-radio>
      <van-radio name="2">筒料插边</van-radio>
      <van-radio name="3">冷切热切</van-radio>
      <van-radio name="4">冲切</van-radio>
      <van-radio name="5">装箱</van-radio>
    </van-radio-group>
    <div>
      <van-button class="add-btn" @click="addInvestment">添加</van-button>
    </div>
    
    <div class="investment-warpper">
      <van-cell-group v-for="(investment, index) in inputInfos.investment" :key="index" class="investment-box">
        <!-- <div>{{index}}</div> -->
        <materialSelection flag="0" label="投入名称" v-model="investment.materiel"></materialSelection>
        <van-field v-model="investment.volumeNumber" type="text" label="卷号" placeholder="请输入卷号"/>
        <van-field v-model="investment.num" type="number" label="数量" placeholder="请输入数量"/>
        <selectUnit v-model="investment.idunit"></selectUnit>
        <van-field>
          <div slot="button">
            <van-button type="danger" size="small" @click="deletedata(index)">删除</van-button>
          </div>
        </van-field>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import customBackHeader from "@/components/header/customBackHeader.vue";
import selectUnit from "@/views/commonpage/selectUnit/selectUnit";
import materialSelection from "@/views/commonpage/materialSelection/materialSelection"
export default {
  data() {
    return {
      processName: "", //产品工序
      inputInfos: {
        bagMakingProcess: "", //制袋选择
        investment: [
          // {
          //   materiel: "", //投入名称
          //   volumeNumber: "", //投入卷号
          //   num: "", //投入数量
          //   idunit: "" //单位
          // },
          // {
          //   materiel: "",
          //   volumeNumber: "",
          //   num: "",
          //   idunit: ""
          // }
        ]
      }
    };
  },
  watch: {
    // bagMakingProcess(val) {
    //   console.log(val)
    // }
  },
  computed: {},
  created() {
    this.processName = this.$store.state.fillDaily.submitDaily.processName;
    this.inputInfos.investment = this.$store.state.fillDaily.submitDaily.investment
  },
  methods: {
    deletedata(index) {
      this.inputInfos.investment.splice(index, 1)
    },
    addInvestment() {
      this.inputInfos.investment.push(
        { materiel: "", volumeNumber: "", num: "", idunit: ""}
      );
    },
    goback() {
      this.$router.push("/addHeaderDaily");
    },
    goPageTo() {
      console.log(this.inputInfos)
      this.$store.commit('ADD_INPUT_INFO', this.inputInfos)
      this.$router.push("/outputInfoDaily");
    }
  },
  components: {
    customBackHeader,
    selectUnit,
    materialSelection
  }
};
</script>
<style lang="less" scoped>
.radio-warpper {
  display: flex;
  flex-wrap: wrap;
  padding: 0 10px;
  .van-radio {
    width: 30%;
    margin: 10px 0;
  }
}
.investment-warpper {
  padding: 0 10px;
}
.investment-box {
  margin: 10px 0;
  border: 1px solid #eee;
}
.add-btn {
  position: fixed;
  z-index: 1;
  right: 10px;
  top: 86px;
}
</style>