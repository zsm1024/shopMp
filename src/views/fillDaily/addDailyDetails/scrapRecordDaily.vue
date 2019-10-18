<!-- 废品记录 -->
<template>
  <div>
    <custom-back-header
      :leftArrow="true"
      @goback="goback"
      title="废品记录"
      rightText="下一步"
      @clickEvent="goPageTo"
    ></custom-back-header>
    <van-cell-group>
      <van-field v-model="scrapRecordData.waste" type="number" label="当班废品" placeholder="请输入">
        <div slot="button">kg</div>
      </van-field>
      <van-field
        v-model="scrapRecordData.materialsWastes"
        type="number"
        label="原材料废品"
        placeholder="请输入"
      >
        <div slot="button">kg</div>
      </van-field>
      <van-field
        v-model="scrapRecordData.printingWaste"
        type="number"
        label="印刷废品"
        placeholder="请输入"
      >
        <div slot="button">kg</div>
      </van-field>
      <van-field
        v-model="scrapRecordData.compoundWaste"
        type="number"
        label="复合废品"
        placeholder="请输入"
      >
        <div slot="button">kg</div>
      </van-field>
      <van-field
        v-model="scrapRecordData.slicingWaste"
        type="number"
        label="分切废品"
        placeholder="请输入"
      >
        <div slot="button">kg</div>
      </van-field>
      <van-field
        v-model="scrapRecordData.bagMakingWastes"
        type="number"
        label="制袋废品"
        placeholder="请输入"
      >
        <div slot="button">kg</div>
      </van-field>
    </van-cell-group>
    <van-cell-group v-if="processName == '制袋'">
      <van-field
        v-model="scrapRecordData.otherWastes"
        type="number"
        label="其它"
        placeholder="请输入"
      >
        <div slot="button">kg</div>
      </van-field>
      <van-field
        v-model="scrapRecordData.otherWastesReason"
        type="text"
        label="其它原因"
        placeholder="请输入"
      >
      </van-field>
      <van-field
        v-model="scrapRecordData.bagMakingWastesReason"
        type="text"
        label="制袋废品原因"
        placeholder="请输入"
      >
      </van-field>
    </van-cell-group>
    <van-cell-group v-if="processName == '印刷'">
      <van-field
        v-model="scrapRecordData.rawMembraneWaste"
        type="number"
        label="原膜废品"
        placeholder="请输入"
      >
        <div slot="button">kg</div>
      </van-field>
      <van-field
        v-model="scrapRecordData.samplingWaste"
        type="number"
        label="打样废品"
        placeholder="请输入"
      >
      <div slot="button">kg</div>
      </van-field>
    </van-cell-group>
  </div>
</template>

<script>

import customBackHeader from "@/components/header/customBackHeader.vue";
export default {
  data() {
    return {
      processName: "",
      scrapRecordData: {
        waste: "当班废品",
        materialsWastes: "原材料废品",
        printingWaste: "印刷废品",
        compoundWaste: "复合废品",
        slicingWaste: "分切废品",
        bagMakingWastes: "制袋废品",
        otherWastes: "",
        otherWastesReason: "",
        bagMakingWastesReason: "",
        rawMembraneWaste: "", //原膜废品
        samplingWaste: ""  //当班废品

      }
    };
  },
  computed: {},
  created() {
    this.processName = this.$store.state.fillDaily.submitDaily.processName
    // console.log(this.$store.state.fillDaily.submitDaily.processName)
  },
  methods: {
    goback() {
      this.$router.push("/recordHandoverDaily");
    },
    goPageTo() {
      this.$store.commit("SET_SCRAP_RECORD", this.scrapRecordData);
      this.$router.push("/otherInfo");
    }
  },
  components: {
    customBackHeader
  }
};
</script>
<style  scoped>
</style>