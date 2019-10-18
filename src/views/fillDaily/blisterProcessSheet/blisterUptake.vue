<!-- 吸塑 -->
<template>
  <div>
    <custom-back-header
      :leftArrow="true"
      @goback="goback"
      title="吸塑"
      rightText="下一步"
      @clickEvent="goPageTo"
    ></custom-back-header>
    <van-cell-group>
      <van-field
        v-model="blisterUptake.quantityOfFeeding"
        type="number"
        label="提料数量"
        placeholder="请输入提料数量"
      >
        <div slot="button">kg</div>
      </van-field>
      <van-field
        v-model="blisterUptake.quantityOfFeedingAxis"
        type="number"
        label="提料数量"
        placeholder="请输入提料数量"
      >
        <div slot="button">轴</div>
      </van-field>
      <van-field
        v-model="blisterUptake.equipmentNumber"
        label="设备编号"
        type="number"
        placeholder="请输入设备编号"
      />
      <van-field
        v-model="blisterUptake.suctionPlateNumber"
        label="应吸板数"
        type="text"
        placeholder="请输入应吸板数"
      />
      <van-field
        v-model="blisterUptake.wasteToBeDischarged"
        label="应出废料"
        type="text"
        placeholder="请输入应出废料"
      />
      <van-field
        v-model="blisterUptake.actualizeWaste"
        label="实出废料"
        type="text"
        placeholder="请输入实出废料"
      />
      <van-field
        v-model="blisterUptake.numberOfSuctionPlates"
        label="实吸板数"
        type="text"
        placeholder="请输入实吸板数"
      />
      <van-field
        v-model="blisterUptake.blisterInspectionResults"
        label="检验结果"
        type="text"
        placeholder="请输入检验结果"
      />
      <van-field
        v-model="blisterUptake.blisterExaminationClerk"
        label="检验员"
        type="text"
        placeholder="请输入检验员"
      />
      <vant-field-date label="吸塑开始时间" v-model="blisterUptake.blendingStartTime" type="datetime"/>
      <vant-field-date label="吸塑结束时间" v-model="blisterUptake.blendingEndTime" type="datetime"/>
    </van-cell-group>

    <van-cell-group v-for="(pvcData, pvcindex) in blisterUptake.blisterbs" :key="pvcindex">
      <van-field v-model="pvcData.detectionTime" type="text" label="检测时间" placeholder="请输入检测时间"/>
      <van-field v-model="pvcData.heatingTime" type="text" label="加热时间" placeholder="请输入加热时间"/>
      <van-field v-model="pvcData.boilingTemperature" type="text" label="上炉加热" placeholder="请输入上炉加热"/>
      <van-field v-model="pvcData.lowerFurnaceTemperature" type="text" label="下炉加热" placeholder="请输入下炉加热"/>
      <van-field>
        <div slot="button">
          <van-button type="danger" size="small" @click="deletedata(pvcindex)">删除</van-button>
        </div>
      </van-field>
    </van-cell-group>
    <div class="add-warpper">
      <van-button class="add-btn" @click="addInvestment">添加吸塑表单</van-button>
    </div>
    <van-cell-group>
      <van-field
        v-model="blisterUptake.blendingRemark"
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
      blisterUptake: {
        quantityOfFeeding: "", //提料数量 kg
        quantityOfFeedingAxis: "", //提料数量 轴
        equipmentNumber: "", //设备编号
        suctionPlateNumber: "", //应吸板数
        wasteToBeDischarged: "", //应出废料
        actualizeWaste: "", //实出废料
        numberOfSuctionPlates: "", //实吸板数
        blisterInspectionResults: "", //检验结果
        blisterExaminationClerk: "", //检验员
        blendingStartTime: null, //吸塑开始时间
        blendingEndTime: null, //吸塑结束时间
        blisterbs: [
          {
            detectionTime: "", //检测时间
            heatingTime: "", //加热时间
            boilingTemperature: "", //上炉加热
            lowerFurnaceTemperature: "" //下炉加热
          }
        ],
        blendingRemark: "" //吸塑备注
      }
    };
  },
  computed: {},

  methods: {
    deletedata(index) {
      this.blisterUptake.blisterbs.splice(index, 1);
    },
    addInvestment() {
      this.blisterUptake.blisterbs.push({
            detectionTime: "", 
            heatingTime: "", 
            boilingTemperature: "",
            lowerFurnaceTemperature: ""
          });
    },
    goback() {
      this.$router.push("/blisterProcessHeader");
    },
    goPageTo() {
      // console.log(this.blisterUptake)
      this.$store.commit("ADD_BLISTER_UPTAKE", this.blisterUptake);
      this.$router.push("/blanking");
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
  justify-content: flex-end
}
</style>