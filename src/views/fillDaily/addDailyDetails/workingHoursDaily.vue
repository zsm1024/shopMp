<!-- 工时记录 -->
<template>
  <div>
    <custom-back-header
      :leftArrow="true"
      @goback="goback"
      title="工时记录"
      rightText="下一步"
      @clickEvent="goPageTo"
    ></custom-back-header>
    <van-cell-group>
      <van-field
        v-model="workHoursData.preparationTime"
        type="number"
        label="准备时间"
        placeholder="请输入"
      >
        <div slot="button">分钟</div>
      </van-field>
      <van-field
        v-model="workHoursData.productionTime"
        type="number"
        label="生产时间"
        placeholder="请输入"
      >
        <div slot="button">分钟</div>
      </van-field>
      <van-field
        v-model="workHoursData.maintenanceTime"
        type="number"
        label="保养时间"
        placeholder="请输入"
      >
        <div slot="button">分钟</div>
      </van-field>
      <van-field v-model="workHoursData.failureTime" type="number" label="故障时间" placeholder="请输入">
        <div slot="button">分钟</div>
      </van-field>
      <van-field v-model="workHoursData.waitingTime" type="number" label="待料时间" placeholder="请输入">
        <div slot="button">分钟</div>
      </van-field>
      <van-field v-model="workHoursData.otherTime" type="number" label="其他时间" placeholder="请输入">
        <div slot="button">分钟</div>
      </van-field>
    </van-cell-group>
  </div>
</template>

<script>
import customBackHeader from "@/components/header/customBackHeader.vue";

export default {
  data() {
    return {
      workHoursData: {
        preparationTime: "准备时间",
        productionTime: "生产时间",
        maintenanceTime: "保养时间",
        failureTime: "故障时间",
        waitingTime: "待料时间",
        otherTime: "其他时间"
      }
    };
  },
  computed: {},

  methods: {
    goback() {
      this.$router.push("/outputInfoDaily");
    },
    goPageTo() {
      this.$store.commit("SET_WORKING_HOURS", this.workHoursData);
      this.$router.push("/mouldDaily");
    }
  },
  components: {
    customBackHeader
  }
};
</script>
<style  scoped>
</style>