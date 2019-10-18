<!-- 冲裁 -->
<template>
  <div>
    <custom-back-header
      :leftArrow="true"
      @goback="goback"
      title="冲裁"
      rightText="提交"
      @clickEvent="goPageTo"
    ></custom-back-header>
    <van-cell-group>
      <van-field v-model="blanking.quantityPayable" label="应出数量" type="text" placeholder="请输入应出数量"/>
      <van-field v-model="blanking.blankingWaste" label="冲裁废料" type="text" placeholder="请输入冲裁废料"/>
      <van-field
        v-model="blanking.blankingBlanking"
        label="冲裁边料"
        type="text"
        placeholder="请输入冲裁边料"
      />
      <van-field
        v-model="blanking.totalFinishedProduct"
        label="成品总量"
        type="text"
        placeholder="请输入成品总量"
      />
      <van-field
        v-model="blanking.blankingInspectionResults"
        label="检验结果"
        type="text"
        placeholder="请输入检验结果"
      />
      <van-field
        v-model="blanking.blankingExaminationClerk"
        label="检验员"
        type="text"
        placeholder="请输入检验员"
      />
      <van-field v-model="blanking.blankingOperator" label="冲裁操作工" type="text" placeholder="请输入冲裁操作工"/>
      <vant-field-date label="冲裁开始时间" v-model="blanking.blankingStarttime" type="datetime"/>
      <vant-field-date label="冲裁结束时间" v-model="blanking.blankingEndtime" type="datetime"/>
    </van-cell-group>

    <van-cell-group v-for="(blanData, blanindex) in blanking.blankings" :key="blanindex">
      <van-field v-model="blanData.detectionTime" type="text" label="检测时间" placeholder="请输入检测时间"/>
      <van-field v-model="blanData.truncationDepth" type="text" label="截断深度" placeholder="请输入截断深度"/>
      <van-field v-model="blanData.truncationHeight" type="text" label="截断高度" placeholder="请输入截断高度"/>
      <van-field>
        <div slot="button">
          <van-button type="danger" size="small" @click="deletedata(blanindex)">删除</van-button>
        </div>
      </van-field>
    </van-cell-group>
    <div class="add-warpper">
      <van-button class="add-btn" @click="addInvestment">添加吸塑表单</van-button>
    </div>
    <van-cell-group>
      <van-field
        v-model="blanking.blankingRemark"
        label="备注"
        type="textarea"
        placeholder="请输入备注"
        rows="2"
        autosize
      />
    </van-cell-group>
  </div>
</template>

<script>
import customBackHeader from "@/components/header/customBackHeader.vue";
import VantFieldDate from "@/components/VantFieldDate/VantFieldDatepicker";
export default {
  data() {
    return {
      blanking: {
        quantityPayable: "", //应出数量
        blankingWaste: "", //冲裁废料
        blankingBlanking: "", //冲裁边料
        totalFinishedProduct: "", //成品总量
        blankingInspectionResults: "", //检验结果
        blankingExaminationClerk: "", //检验员
        blankingOperator: "", //冲裁操作工
        blankingStarttime: "",
        blankingEndtime: "",
        blankings: [
          {
            detectionTime: "", //冲裁检测时间
            truncationDepth: "", //冲裁截断深度
            truncationHeight: "" //冲裁截断高度
          }
        ],
        blankingRemark: "" //冲裁备注
      }
    };
  },
  computed: {},

  methods: {
    deletedata(index) {
      this.blanking.blankings.splice(index, 1);
    },
    addInvestment() {
      this.blanking.blankings.push({
        detectionTime: "",
        truncationDepth: "",
        truncationHeight: ""
      });
    },
    goback() {
      this.$router.push("/blisterProcessHeader");
    },
    goPageTo() {
      // console.log(this.blanking)
      this.$store.commit("ADD_BLANKING_DATA", this.blanking);
      this.$store.dispatch("submitBlisterProcessSheet");
      // this.$router.push("/mouldDaily");
    }
  },
  components: {
    customBackHeader,
    VantFieldDate
  }
};
</script>
<style lang="less"  scoped>
.add-warpper {
  display: flex;
  justify-content: flex-end;
}
</style>