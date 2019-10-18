<!-- 每日日报 -->
<template>
  <div>
    <custom-back-header
      :leftArrow="true"
      @goback="goback"
      title="日报填写"
      rightText="添加"
      @clickEvent="addDaily()"
    ></custom-back-header>
    <article class="lists">

      <div class="chunk" v-for="(dailyData,index) in dailyDatas" :key = index>
        <h4>第 {{index+1}} 条</h4>
        <section class="inputs">
          <van-cell-group><van-field v-model="dailyData.dailyTypeName" label="日报名称"   /></van-cell-group>
          <van-cell-group><van-field v-model="dailyData.dailytypeid" label="日报类型ID"  /></van-cell-group>
          <van-cell-group><van-field v-model="dailyData.workcode" label="工单编号"   /></van-cell-group>
          <van-cell-group><van-field v-model="dailyData.remark" label="备注" type="textarea"  rows="1" autosize  /></van-cell-group>
        </section>
        <section class="buttons">
          <van-button type="default" size="small" @click="deleteDaily(index)">删除</van-button><!-- loading = "true" loading-type="spinner" loading-text="加载中..."-->
          <van-button type="default" size="small" @click="editDaily(index)">编辑</van-button>
        </section>
      </div>
    </article>
  </div>
</template>

<script>
import api from "@/api/api";
import { mapGetters } from "vuex";
import customBackHeader from "@/components/header/customBackHeader.vue";
import basicHeader from '@/components/header/basicHeader.vue'
export default {
  data () {
    return {
      // dailyDatas:[
      // ]
    };
  },
  computed: {
    ...mapGetters(['dailyDatas'])
  },

  methods: {
    //添加
    addDaily() {
      // console.log("导航栏添加事件触发")
      this.$router.push('/addHeaderDaily')
    },
    //删除
    deleteDaily(key){
      console.log("删除事件触发")
    },
    //编辑
    editDaily(key){
      this.$store.commit('EDIT_DAILY_INDEX', key)
      this.$router.push('/editDailyDetails')
    },
    goback() {
      this.$router.push("/onceMenu");
    },
  },
  created() {
    this.$store.dispatch('getdailyPageList')
  },
  mounted() {
  },
  components: {
    basicHeader,
    customBackHeader
  }

}

</script>
<style  scoped>
  .lists{}
  .chunk{padding: 10px;margin: 10px; border: solid 1px rgba(230,230,230,1);box-shadow: 2px 2px 6px 0 #666;background-color: white;border-radius: 10px}


  .chunk h4{font-family: 楷体;font-weight:400;text-align:left;font-size:16px;padding: 10px;}
  .buttons{display: flex;justify-content: space-around;padding:6px;}
</style>
