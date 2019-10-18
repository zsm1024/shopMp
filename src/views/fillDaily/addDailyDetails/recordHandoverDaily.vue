<!-- 交接记录 -->
<template>
  <div>
    <custom-back-header
      :leftArrow="true"
      @goback="goback"
      title="交接记录"
      rightText="下一步"
      @clickEvent="goPageTo"
    ></custom-back-header>

    <van-cell-group>
      <van-field
        v-model="recordHandoverData.shiftLeader"
        type="text"
        label="交班机长"
        placeholder="请输入"
        required
        :error-message="errorMsg.shiftLeader"
      ></van-field>
      <van-field
        v-model="recordHandoverData.firstDeputy"
        type="text"
        label="第一副手"
        placeholder="请输入"
        required
        :error-message="errorMsg.firstDeputy"
      ></van-field>
      <van-field
        v-model="recordHandoverData.secondDeputy"
        type="text"
        label="第二副手"
        placeholder="请输入"
        required
        :error-message="errorMsg.secondDeputy"
      ></van-field>
      <van-field
        v-model="recordHandoverData.onDutyInspection"
        type="text"
        label="当班质检"
        placeholder="请输入"
        required
        :error-message="errorMsg.onDutyInspection"
      ></van-field>
      <van-field
        v-model="recordHandoverData.successionMonitor"
        type="text"
        label="接班机长"
        placeholder="请输入"
        required
        :error-message="errorMsg.successionMonitor"
      ></van-field>
      <van-field
        v-model="recordHandoverData.workshopDirector"
        type="text"
        label="车间主任"
        placeholder="请输入"
        required
        :error-message="errorMsg.workshopDirector"
      ></van-field>
    </van-cell-group>
  </div>
</template>

<script>
import customBackHeader from "@/components/header/customBackHeader.vue";
import validator from "@/util/validator.js";
export default {
  data() {
    return {
      recordHandoverData: {
        shiftLeader: "",
        firstDeputy: "",
        secondDeputy: "",
        onDutyInspection: "",
        successionMonitor: "",
        workshopDirector: ""
      },
      errorMsg: {
        shiftLeader: "",
        firstDeputy: "",
        secondDeputy: "",
        onDutyInspection: "",
        successionMonitor: "",
        workshopDirector: ""
      },
      rules: {
        shiftLeader: [{ required: true, message: "不能为空" }],
        firstDeputy: [{ required: true, message: "不能为空" }],
        secondDeputy: [{ required: true, message: "不能为空" }],
        onDutyInspection: [{ required: true, message: "不能为空" }],
        successionMonitor: [{ required: true, message: "不能为空" }],
        workshopDirector: [{ required: true, message: "不能为空" }]
      }
    };
  },
  computed: {},
  created() {
    this.validator = validator(this.rules, this.recordHandoverData);
  },
  methods: {
    goback() {
      this.$router.push("/mouldDaily");
    },
    goPageTo() {
      this.validate((errors, fields) => {
        if (errors) return;
        this.$store.commit('SET_RECORD_HANDOVER', this.recordHandoverData)
        this.$router.push("/scrapRecordDaily");
      });
    },
    /**
     * 清除验证提示
     * @param attrs
     */
    resetField(attrs) {
      attrs = !attrs
        ? Object.keys(this.errorMsg)
        : Array.isArray(attrs)
        ? attrs
        : [attrs];
      attrs.forEach(attr => {
        this.errorMsg[attr] = "";
      });
    },
    /**
     * 验证方法
     * @param callback
     * @param data
     */
    validate(callback, data) {
      this.validator.validate((errors, fields) => {
        this.resetField();
        if (errors) {
          fields.forEach(item => {
            this.errorMsg[item.field] = item.message;
          });
        }
        callback && callback(errors, fields);
      }, data);
    }
  },
  components: {
    customBackHeader
  }
};
</script>
<style  scoped>
</style>