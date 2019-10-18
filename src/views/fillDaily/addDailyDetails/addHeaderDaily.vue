<!-- 添加日报头 -->
<template>
  <div>
    <custom-back-header
      :leftArrow="true"
      @goback="goback"
      title="添加日报头"
      rightText="下一步"
      @clickEvent="goPageTo"
    ></custom-back-header>
    <!-- <van-button @click="gotopush">吊机</van-button> -->
    <article>
      <van-cell-group>
        <!-- <van-cell
          title="工单编号"
          v-model="infomations.workcode"
          size="large"
          is-link
          required
          placeholder="请选择工单编号"
          @click="openWorkordernum"
          error
        />-->
        <van-field
          label="工单编号"
          v-model="infomations.workcode"
          readonly
          is-link
          required
          placeholder="请选择工单编号"
          @click="openWorkordernum"
          :error-message="errorMsg.workcode"
        />
        <van-row>
          <van-field-select-picker
            label="产品工序"
            placeholder="请选择"
            v-model="infomations.processName"
            :columns="productProcessSelect"
            required
            @input="getchangedailyType"
            :error-message="errorMsg.processName"
          />
        </van-row>
        <van-row>
          <van-field-select-picker
            label="班组类型"
            placeholder="请选择班组类型"
            v-model="infomations.teamName"
            :columns="teams"
            required
            @input="getchangeteam"
            :error-message="errorMsg.teamName"
          />
        </van-row>
        <van-field
          label="生产日期"
          v-model="infomations.dateOfManufacture"
          readonly
          is-link
          required
          @click="time.show = !time.show"
          :error-message="errorMsg.dateOfManufacture"
        />

        <van-field
          v-model="infomations.machineNumber"
          type="number"
          label="机台号"
          placeholder="请输入"
          :error-message="errorMsg.machineNumber"
          required
        />
        <van-field
          v-model="infomations.workshopTemperature"
          type="number"
          label="车间温度"
          placeholder="请输入"
        >
          <div slot="button">℃</div>
        </van-field>
        <van-field
          v-model="infomations.workshopHumidity"
          type="number"
          label="车间湿度"
          placeholder="请输入"
        >
          <div slot="button">%</div>
        </van-field>
        <van-field
          v-model="infomations.saleOrder"
          type="text"
          label="订单编号"
          placeholder="无信息"
          readonly
        />
        <van-field
          v-model="infomations.customername"
          type="text"
          label="客户姓名"
          placeholder="无信息"
          readonly
        />
        <van-field
          v-model="infomations.productName"
          type="text"
          label="产品名称"
          placeholder="无信息"
          readonly
        />
        <van-field
          v-model="infomations.productSpecifications"
          type="text"
          label="产品规格"
          placeholder="无信息"
          readonly
        />
        <van-field
          v-model="infomations.productStructure"
          type="text"
          label="产品结构"
          placeholder="请输入"
        />
        <van-field
          v-model="infomations.materialSpecifications"
          type="text"
          label="材料规格"
          placeholder="请输入"
        />
      </van-cell-group>
      <van-cell-group v-if="infomations.processName == '复合'">
        <van-field v-model="infomations.glueType" type="text" label="胶水型号" placeholder="请输入"/>
        <van-field v-model="infomations.supplier" type="text" label="供应厂家" placeholder="请输入"/>
        <van-field v-model="infomations.oneLength" type="text" label="一层总长度" placeholder="请输入"/>
        <van-field v-model="infomations.twoLength" type="text" label="二层总长度" placeholder="请输入"/>
        <van-field v-model="infomations.threeLength" type="text" label="三层总长度" placeholder="请输入"/>
      </van-cell-group>

      <van-popup v-model="time.show" position="bottom">
        <van-datetime-picker
          v-model="time.currentDate"
          type="date"
          show-toolbar
          title="请选择时间"
          @confirm="changetime"
          @cancel="time.show = !time.show"
          :formatter="formatter"
        />
      </van-popup>
    </article>
  </div>
</template>

<script>
import api from "@/api/api";
import { mapState } from "vuex";
import validator from "@/util/validator.js";

import customBackHeader from "@/components/header/customBackHeader.vue";
import VanFieldSelectPicker from "@/components/VanFieldSelectPicker/VanFieldSelectPicker";
var padDate = value => {
  return value < 10 ? "0" + value : value;
};
export default {
  data() {
    return {
      dailyType: "", //填报类型
      processName: "",
      infomations: {
        processName: "", //产品工序
        dateOfManufacture: "", //生产日期
        workcode: "", //工单编号
        team: "", //班组类型id
        teamName: "", //班组类型
        machineNumber: "", //机台号
        workshopTemperature: "", //车间温度
        workshopHumidity: "", //车间湿度
        saleOrder: "", //订单编号
        custormId: "", //客户id
        customername: "", //客户姓名
        productId: "", //产品id
        productName: "", //产品名称
        productSpecifications: "", //产品规格
        productStructure: "", //产品结构
        materialSpecifications: "", //材料结构
        glueType: "", //胶水型号
        supplier: "", //供应厂家
        oneLength: "", //一层总长度
        twoLength: "", //二层总长度
        threeLength: "" //三层总长度
      },
      productProcess: [
        // {
        //   createTime: "2019-06-10 21:49:18",
        //   createby: "admin",
        //   currentPage: "0",
        //   id: "1138080703495004162",
        //   mouldCode: "",
        //   orderNum: 1,
        //   pageSize: "10",
        //   processCode: "GX-2019-06-0001",
        //   processId: "1137975371707944962",
        //   processName: "制袋",
        //   productId: "1",
        //   productProcessbs: "",
        //   turnOrders: "",
        //   turnOrdersInvestment: "",
        //   turnOrdersProduce: "",
        //   updateBy: "",
        //   updateTime: "2019-06-10 21:49:18",
        //   workingprocedures: ""
        // }
      ],
      teamData: [
        {
          id: "0",
          name: "白班"
        },
        {
          id: "1",
          name: "夜班"
        }
      ],
      time: {
        currentDate: new Date(),
        show: false
      },
      errorMsg: {
        workcode: "",
        teamName: "",
        dateOfManufacture: "",
        productName: "",
        machineNumber: ""
      },
      rules: {
        processName: [{ required: true, message: "请选择产品工序" }],
        workcode: [{ required: true, message: "请选择工单编号" }],
        teamName: [{ required: true, message: "请选择班组类型" }],
        productName: [{ required: true, message: "请选择产品名称" }],
        dateOfManufacture: [{ required: true, message: "请选择生产日期" }],
        machineNumber: [{ required: true, message: "请输机台号" }]
      }
    };
  },
  computed: {
    ...mapState(["projectInfo"]),
    productProcessSelect() {
      // console.log(this.selectData)
      var select = [];
      this.productProcess.forEach(element => {
        select.push(element.processName);
      });
      return select;
    },
    teams() {
      // console.log(this.selectData)
      var select = [];
      this.teamData.forEach(element => {
        select.push(element.name);
      });
      return select;
    }
  },
  created() {
    this.validator = validator(this.rules, this.infomations);
    // console.log(this.projectInfo)
    this.infomations.workcode = this.projectInfo.workcode; //获取工单编号
    if (this.projectInfo.productid) {
      this.productProcessgetList(this.projectInfo.productid);
    }
    this.infomations.saleOrder = this.projectInfo.orderid; //订单编号
    this.infomations.custormId = this.projectInfo.idcustorm; //客户id
    this.infomations.customername = this.projectInfo.customername; //客户姓名
    this.infomations.productId = this.projectInfo.productid; //产品id
    this.infomations.productName = this.projectInfo.productname; //产品名称
    this.infomations.productSpecifications = this.projectInfo.productsize; //产品规格
  },
  methods: {
    openWorkordernum() {
      this.infomations.dailyType = this.dailyType;
      this.$store.commit("CACHE_FILL_DAILY_DATA", this.infomations);
      this.$router.push({
        path: "/workordernum",
        query: { num: this.$route.path }
      });
    },
    getchangeteam(newVal, index) {
      // console.log(newVal + index);
      // console.log(this.teamData[index].id);
      this.infomations.team = this.teamData[index].id;
      // this.infomations.teamName = this.teamData[index].teamName;
    },
    getchangedailyType(newVal, index) {
      console.log(newVal);
      if (newVal == "吸塑") {
        this.$router.push({
          path: "/blisterProcessHeader",
          query: {
            // workcode: this.infomations.workcode,
            processId: this.productProcess[index].processId
          }
        });
      }
      // console.log(newVal + index);
      // console.log(this.fillDailyTypeDatas[index].id);
      // this.infomations.productId = this.productProcess[index].productId;
      this.infomations.processId = this.productProcess[index].processId;
    },
    formatter: function(type, value) {
      if (type === "year") {
        return value + "年";
      } else if (type === "month") {
        return value + "月";
      } else if (type === "day") {
        return value + "日";
      }
      return value;
    },
    changetime(value) {
      var year = value.getFullYear();
      var month = padDate(value.getMonth() + 1);
      var strDate = padDate(value.getDate());
      var time = year + "-" + month + "-" + strDate;
      this.time.show = !this.time.show;
      this.infomations.dateOfManufacture = time;
    },
    goback() {
      this.$router.push("/fillDaily");
    },
    goPageTo() {
      this.validate((errors, fields) => {
        if (errors) return;
        this.$store.commit("SET_DAILY_HEADER", this.infomations);
        this.$router.push("/addInputInfoDaily");
      });
      // console.log(this.infomations)
    },
    productProcessgetList(productid) {
      api.productProcessgetList({ productid: productid }).then(res => {
        // console.log(res);
        this.productProcess = res.data;
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
    },
    gotopush() {
      this.validate((errors, fields) => {});
      // this.$router.push('/demo')
    }
  },
  mounted() {},
  components: {
    customBackHeader,
    VanFieldSelectPicker
  }
};
</script>
<style  scoped>
</style>