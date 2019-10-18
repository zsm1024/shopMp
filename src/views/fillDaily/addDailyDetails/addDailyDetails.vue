<!-- 每日日报，已废弃 -->
<template>
  <div class="Fu">
    <custom-back-header
      :leftArrow="true"
      @goback="goback"
      title="填写日报详情"
      rightText="下一步"
      @clickEvent="goPageTo"
    ></custom-back-header>
    <article class="inputs">
      <van-row>
        <van-field-select-picker
          label="填报类型"
          placeholder="请选择填报类型"
          v-model="dailyType"
          :columns="fillDailyTypes"
          @input="getchangedailyType"
        />
      </van-row>
      <van-row>
        <van-field-select-picker
          label="班组类型"
          placeholder="请选择班组类型"
          v-model="infomations.squadType"
          :columns="worktypes"
          @input="getchangeworktype"
        />
      </van-row>
      <van-cell-group>
        <van-cell
          title="工单编号"
          v-model="infomations.workcode"
          size="large"
          is-link
          @click="openWorkordernum"
        />
      </van-cell-group>
      <!-- <van-cell-group>
        <van-field
          label="生产日期"
          v-model="infomations.worktime"
          readonly
          is-link
          @click="pickerTimeFn()"
        />
      </van-cell-group> -->
      <van-cell-group>
        <van-field
          label="请选择时间"
          v-model="infomations.worktime"
          readonly
          is-link
          @click="time.show = !time.show"
        />
      </van-cell-group>
      <van-cell-group>
        <van-field v-model="infomations.leaderc" label="交班班长" placeholder="请输入交班班长"/>
      </van-cell-group>
      <van-cell-group>
        <van-field v-model="infomations.leadern" label="接班班长" placeholder="请输入接班班长"/>
      </van-cell-group>
      <van-cell-group>
        <van-field v-model="infomations.machinenum" label="副手" placeholder="请输入副手"/>
      </van-cell-group>
      <van-cell-group>
        <van-field
          v-model="infomations.checker"
          label="当班质检员"
          placeholder="请输入当班质检员"
        />
      </van-cell-group>
      <van-cell-group>
        <van-field v-model="infomations.director" label="车间主任" placeholder="请输入车间主任"/>
      </van-cell-group>
      <van-cell-group>
        <van-field v-model="infomations.ordernum" label="排序" placeholder="请输入排序"/>
      </van-cell-group>
      <van-cell-group>
        <van-field
          v-model="infomations.remark"
          label="备注"
          type="textarea"
          placeholder="请输入备注"
          rows="1"
          autosize
        />
      </van-cell-group>
      <!-- <van-popup v-model="picker_time.show" position="bottom">
        <van-datetime-picker
          v-model="picker_time.data"
          type="date"
          @cancel="pickerTime_onCancel"
          @confirm="pickerTime_confirm"
        />
      </van-popup> -->


      <van-popup v-model="time.show" position="bottom">
        <van-datetime-picker 
        v-model="time.currentDate" 
        type="date" 
        show-toolbar
        title="请选择时间"
        @confirm = "changetime"
        @cancel ="time.show = !time.show"
        :formatter="formatter"
        />
      </van-popup>

      <!-- <vant-field-date 
        label="请选择时间"
        v-model='infomations.worktime'
        @input="changedate"
      /> -->
    </article>
  </div>
</template>

<script>
import api from "@/api/api";
import { mapGetters } from "vuex";
import basicHeader from "@/components/header/basicHeader.vue";
import customBackHeader from "@/components/header/customBackHeader.vue";

import VanFieldSelectPicker from "@/components/VanFieldSelectPicker/VanFieldSelectPicker";
// import VantFieldDate from "@/components/VantFieldDate/VantFieldDate"

import { forEach } from "async";
  var padDate = (value) => {
    return value < 10 ? '0'+value : value;
  }
export default {
  data() {
    return {
      dailyType: '', //填报类型
      // infomations: {
      //   dailytypeid: "1129211713972563970", //填报类型id
      //   machinenum: "副手",
      //   worktime: "2019-05-23", //色恒产日期
      //   workcode: "MO-2019-04-0001", //工单编号
      //   worktype: "0", //班组类型
      //   leaderc: "交班班长",
      //   leadern: "接班班长",
      //   checker: "当班质检",
      //   director: " 车间主任",
      //   ordernum: "排序",
      //   remark: " 备注"
      // },
      infomations: {
        dailyType: '',  //填报类型
        dailytypeid: "", //填报类型id
        machinenum: "",
        worktime: "", //生产日期
        workcode: "", //工单编号
        worktype: "", //班组类型
        leaderc: "",
        leadern: "",
        checker: "",
        director: "",
        ordernum: "",
        remark: ""
      },
      fillDailyTypeDatas: [
        {
          createTime: "2019-05-15 17:53:43",
          createby: "1",
          currentPage: "0",
          dailytype: "复合日报表",
          group: "",
          id: "1128599332812726273",
          isavailable: 1,
          isdel: 0,
          name: "复合日报表",
          ordernum: 1,
          pageSize: "10",
          remark: "",
          type: "",
          updateBy: "",
          updateTime: "2019-05-15 17:53:43"
        }
      ],
      worktypeData: [
        {
          id: "0",
          name: "白班"
        },
        {
          id: "1",
          name: "夜班"
        }
      ],
      inputData: {
        a1: "",
        a2: "",
        a3: "",
        a4: "",
        dailyType: "请选择填报类型",
        squadType: "请选择班组类型",
        productionDate: "请选择生产日期"
      },
      //时间
      // picker_time: {
      //   data: new Date(),
      //   show: false
      // },
      time: {
        currentDate: new Date(),
        show: false
      }
    };
  },
  watch: {
    dailyType(newVal) {
      console.log(newVal)
      // this.getParameterByTypeId({id:this.infomations.dailytypeid})

      this.$store.dispatch('getParameterByTypeId', {id:this.infomations.dailytypeid})
    }
  },
  computed: {
    ...mapGetters(["dailyDatas", "editDailyIndex", "parameterTypes", "cacheFilldailydata"]),
    fillDailyTypes() {
      // console.log(this.selectData)
      var select = [];
      this.fillDailyTypeDatas.forEach(element => {
        select.push(element.name);
      });
      return select;
    },
    worktypes() {
      // console.log(this.selectData)
      var select = [];
      this.worktypeData.forEach(element => {
        select.push(element.name);
      });
      return select;
    }
  },
  created() {
    // console.log(this.cacheFilldailydata)
    if(this.cacheFilldailydata) {
      this.infomations = this.cacheFilldailydata
      this.dailyType = this.infomations.dailyType
    } else {
      
    }
    this.infomations.workcode = this.$route.query.workcode; //获取工单编号
    this.workcodeId = this.$route.query.workcodeId;
    
  },
  methods: {
    formatter:function(type, value) {
        if (type === 'year') {
          return value +"年";
        } else if (type === 'month') {
          return value +"月"
        }else if (type === 'day') {
          return value + "日"
        }
        return value;
      },
    openpickertime() {
      this.time.show = !this.time.show;
    },
    changetime(value){
      var year = value.getFullYear();
      var month = padDate(value.getMonth()+ 1) ;
      var strDate = padDate(value.getDate());
      var time =  year + "-" + month + "-" + strDate;
      this.time.show = !this.time.show;
      this.infomations.worktime = time
    },
    openWorkordernum() {
      this.infomations.dailyType = this.dailyType
      this.$store.commit('CACHE_FILL_DAILY_DATA', this.infomations)
      this.$router.push({
        path: "/workordernum",
        query: { num: this.$route.path }
      });
    },
    getchangedailyType(newVal, index) {
      // console.log(newVal + index);
      // console.log(this.fillDailyTypeDatas[index].id);
      this.infomations.dailytypeid = this.fillDailyTypeDatas[index].id;
    },
    getchangeworktype(newVal, index) {
      // console.log(newVal + index);
      // console.log(this.worktypeData[index].id);
      this.infomations.worktype = this.worktypeData[index].id;
    },
    //导航栏事件触发
    goPageTo() {
      // console.log("导航栏事件触发");
      // console.log(this.parameterTypes)
      if(this.parameterTypes.length == 0) {
        this.$toast('请先选择填报类型')
      }else {
        // console.log(this.parameterTypes)
        this.$router.push('/addDailySublist')
      }
      //this.$router.push('/applyTransfer')
    },
    //删除函数
    deleteFn() {
      console.log("删除事件触发");
    },
    //确认函数触发
    goOnFn(num) {
      console.log("确认事件触发");
      this.$router.push("/addDailyDetails");
    },
    /*
    //选择器时间部分的确定函数
    pickerTime_confirm(value) {
      let data = (value + "").split(" ");
      //月份此时是英文，看情况决定是否转换为数字
      let time = { year: data[3], month: data[1], day: data[2] };
      //转换月份
      time.month = this.monthEvolveFn(time.month);
      console.log(time.year + "-" + time.month + "-" + time.day);
      this.infomations.worktime = time.year + "-" + time.month + "-" + time.day;
      this.picker_time.show = false;
    },
    //选择器时间部分触发函数
    pickerTimeFn: function() {
      this.picker_time.show = true;
    },
    //选择器时间部分的取消函数
    pickerTime_onCancel() {
      this.picker_time.show = false;
    },
    //附加函数部分
    //月份转换
    monthEvolveFn(NR) {
      const dates = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ]; //时间缩写
      for (let i = 0; i < dates.length; i++) {
        if (NR === dates[i]) {
          if (i < 9) {
            return "0" + (i + 1);
          } else {
            return "" + (i + 1);
          }
        }
      }
    },
  */ goback() {
      this.$router.push("/fillDaily");
    },
    dailygetgetList() {
      //获取填报类型
      api.dailygetgetList({}).then(
        res => {
          // console.log(res.data);
          this.fillDailyTypeDatas = res.data;
        },
        err => {
          this.$toast(err.msg);
        }
      );
    }
  },
  mounted() {
    this.dailygetgetList();
  },
  components: {
    basicHeader,
    VanFieldSelectPicker,
    customBackHeader
    // VantFieldDate
  }
};
</script>
<style  scoped>
</style>
