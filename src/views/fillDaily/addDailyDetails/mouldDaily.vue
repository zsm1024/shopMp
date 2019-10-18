<!-- 模具 -->
<template>
  <div>
    <custom-back-header
      :leftArrow="true"
      @goback="goback"
      title="模具"
      rightText="下一步"
      @clickEvent="goPageTo"
    ></custom-back-header>
    <van-radio-group v-model="mouldsData.printing" v-if="processName == '印刷'" class="radio-warpper">
      <van-radio name="1">新开印</van-radio>
      <van-radio name="2">旧开印</van-radio>
      <van-radio name="3">未开印</van-radio>
      <van-radio name="4">已校版</van-radio>
    </van-radio-group>
    <van-cell-group>
      <van-field
        v-model="mouldsData.pressureRelievingStick"
        type="number"
        label="卸压棍"
        placeholder="请输入"
      >
        <div slot="button">根</div>
      </van-field>
      <van-field v-model="mouldsData.pressingRod" type="number" label="装压辊" placeholder="请输入">
        <div slot="button">根</div>
      </van-field>
      <van-field v-model="mouldsData.netSticks" type="number" label="装网辊" placeholder="请输入">
        <div slot="button">根</div>
      </van-field>
      <van-field v-model="mouldsData.unloadingRod" type="number" label="卸网棍" placeholder="请输入">
        <div slot="button">根</div>
      </van-field>
      <van-field v-model="mouldsData.toolChange" type="number" label="换刀" placeholder="请输入">
        <div slot="button">把</div>
      </van-field>
      <van-field v-model="mouldsData.machineSpeed" type="number" label="机速" placeholder="请输入">
        <div slot="button">m/分钟</div>
      </van-field>
    </van-cell-group>

     <van-cell-group v-if="processName == '印刷'">
      <van-field
        v-model="mouldsData.mountingBoard"
        type="number"
        label="装版"
        placeholder="请输入"
      >
        <div slot="button">根</div>
      </van-field>
      <van-field
        v-model="mouldsData.unloadingPlate"
        type="number"
        label="卸版"
        placeholder="请输入"
      >
        <div slot="button">根</div>
      </van-field>
      <van-field
        v-model="mouldsData.spotColour"
        type="text"
        label="调专色"
        placeholder="请输入"
      >
      <div slot="button">色</div>
      </van-field>
    </van-cell-group>
  </div>
</template>

<script>
import customBackHeader from "@/components/header/customBackHeader.vue";
export default {
  data() {
    return {
      processName: "", //产品工序
      mouldsData: {
        pressureRelievingStick: "卸压棍",
        pressingRod: "装压辊",
        netSticks: "装网辊",
        unloadingRod: "卸网棍",
        toolChange: "换刀",
        machineSpeed: "机速",
        printing: "",
        mountingBoard: "",
        unloadingPlate: "",
        spotColour: "",
      }
    };
  },
  computed: {},
  created() {
    this.processName = this.$store.state.fillDaily.submitDaily.processName;
  },
  methods: {
    goback() {
      this.$router.push("/workingHoursDaily");
    },
    goPageTo() {
      this.$store.commit("SET_MOULD_DATA", this.mouldsData);
      this.$router.push("/recordHandoverDaily");
    }
  },
  components: {
    customBackHeader
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
</style>