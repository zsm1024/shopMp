<!-- 已废弃 -->
<template>
  <div>
      <custom-back-header
      :leftArrow="true"
      @goback="goback"
      title="填写日报子表信息"
      rightText="下一步"
      @clickEvent="goPageTo()"
    ></custom-back-header>
    <dailysublist
    v-for="(parameter,index) in parameterTypes"
    :key="index"
    :subData = parameter
    ></dailysublist>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import customBackHeader from "@/components/header/customBackHeader.vue";
import dailysublist from "@/views/commonpage/dailysublist/dailysublist"
export default {
  data () {
    return {
    };
  },
  computed: {
    ...mapGetters(["parameterTypes"])
  },
  mounted() {
    // console.log(this.parameterTypes)
  },
  methods: {
    goback() {
      this.$router.push("/addDailyDetails");
    },
  },
  components: {
    customBackHeader,
    dailysublist
  }

}

</script>
<style  scoped>
</style>