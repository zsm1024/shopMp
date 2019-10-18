<!-- 产出信息 -->
<template>
  <div>
    <custom-back-header
      :leftArrow="true"
      @goback="goback"
      title="产出信息"
      rightText="下一步"
      @clickEvent="goPageTo"
    ></custom-back-header>
     <div>
      <van-button class="add-btn" @click="addInvestment">添加</van-button>
    </div>
     <div class="investment-warpper">
      <van-cell-group v-for="(pro, index) in produce" :key="index" class="investment-box">
        <!-- <div>{{index}}</div> -->
        <materialSelection flag="1" label="产出名称" v-model="pro.materiel"></materialSelection>
        <van-field v-model="pro.volumeNumber" type="text" label="卷号" placeholder="请输入卷号"/>
        <van-field v-model="pro.num" type="number" label="数量" placeholder="请输入数量"/>
        <selectUnit v-model="pro.idunit"></selectUnit>
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
      produce:[]
    };
  },
  computed: {},
  created() {
    this.produce = this.$store.state.fillDaily.submitDaily.produce
  },
  methods: {
    deletedata(index) {
      this.produce.splice(index, 1)
    },
    addInvestment() {
      this.produce.push(
        { materiel: "", volumeNumber: "", num: "", idunit: ""}
      );
    },
    goback() {
      this.$router.push("/addInputInfoDaily");
    },
    goPageTo() {
      this.$store.commit('ADD_OUTPUT_INFO', this.produce)
      this.$router.push("/workingHoursDaily");
    }
  },
  components: {
    customBackHeader,
    selectUnit,
    materialSelection
  }
};
</script>
<style  scoped>
</style>