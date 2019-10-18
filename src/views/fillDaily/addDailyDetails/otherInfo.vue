<!-- 其他信息 -->
<template>
  <div>
    <custom-back-header
      :leftArrow="true"
      @goback="goback"
      title="其他信息"
      rightText="提交"
      @clickEvent="goPageTo"
    ></custom-back-header>
<van-cell-group>
  <van-field
    v-model="otherInfo.remark"
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

export default {
  data() {
    return {
        otherInfo: {
            remark: ''
        }
    };
  },
  computed: {},

  methods: {
    goback() {
      this.$router.push("/scrapRecordDaily");
    },
    goPageTo() {
        this.$store.commit('SET_OTHER_INFO', this.otherInfo)
        this.$store.dispatch('submitFillDaily')
        // this.$router.push("/mouldDaily");
    }
  },
  components: {
      customBackHeader
  }
};
</script>
<style  scoped>
</style>