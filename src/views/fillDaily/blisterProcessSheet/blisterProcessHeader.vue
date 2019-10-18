<!-- 吸塑生产流程头部 -->
<template>
  <div>
    <custom-back-header
      :leftArrow="true"
      @goback="goback"
      title="吸塑流程单"
      rightText="下一步"
      @clickEvent="goPageTo"
    ></custom-back-header>
    <van-cell-group>
      <van-field
        label="工单编号"
        v-model="processHeader.workcode"
        readonly
        is-link
        required
        placeholder="请选择工单编号"
        @click="openWorkordernum"
        :error-message="errorMsg.workcode"
      />
      <van-field v-model="processHeader.batchNum" label="批号" type="number" placeholder="请输入批号"/>
      <vant-field-date label="填报日期" v-model="processHeader.dateOfManufacture" required type="date"/>
      
      <van-field
        v-model="processHeader.saleOrder"
        label="订单编号"
        type="text"
        placeholder="无"
        readonly
      />
      <van-field
        v-model="processHeader.customername"
        label="客户姓名"
        type="text"
        placeholder="无"
        readonly
      />
      <van-field
        v-model="processHeader.productName"
        label="产品名称"
        type="text"
        placeholder="无"
        readonly
      />
      <van-field v-model="processHeader.num" label="订单数量" type="number" placeholder="请输入订单数量" readonly/>
      
      <van-field
        v-model="processHeader.textureOfMaterial"
        label="材质"
        type="text"
        placeholder="请输入材质"
      />
      <van-field
        v-model="processHeader.sheetSpecification"
        label="片材规格"
        type="text"
        placeholder="请输入片材规格"
      />
      <van-field
        v-model="processHeader.productSpecifications"
        label="成品规格"
        type="text"
        placeholder="请输入成品规格"
      />
      <van-field
        v-model="processHeader.mouldCode"
        label="模具编号"
        type="mouldCode"
        placeholder="请输入模具编号"
      />
      <van-field v-model="processHeader.mouldNum" label="模具个数" type="number" placeholder="请输入模具个数"/>
      <van-field
        v-model="processHeader.toolDieCode"
        label="刀模编号"
        type="toolDieCode"
        placeholder="请输入刀模编号"
      />
      <van-field
        v-model="processHeader.quantityOfMaterial_used"
        type="number"
        label="用料数量"
        placeholder="请输入用料数量"
      >
        <div slot="button">kg</div>
      </van-field>
      <van-field
        v-model="processHeader.quantityOfMaterialUsedAxis"
        type="number"
        label="用料数量"
        placeholder="请输入用料数量"
      >
        <div slot="button">轴</div>
      </van-field>
      <vant-field-date label="交货时间" v-model="processHeader.deliveryTime" type="date"/>
    </van-cell-group>
  </div>
</template>

<script>
import api from "@/api/api";
import { mapState } from "vuex";
import validator from "@/util/validator.js";
import customBackHeader from "@/components/header/customBackHeader.vue";
import VantFieldDate from "@/components/VantFieldDate/VantFieldDatepicker";
export default {
  data() {
    return {
      processHeader: {
        processName: "吸塑",
        processId: "",
        workcode: "", //工单编号
        batchNum: "", //批号
        dateOfManufacture: null, //填报日期

        saleOrder: "", //订单编号
        custormId: "", //客户id
        customername: "", //客户姓名
        productId: "", //产品id
        productName: "", //产品名称
        productSpecifications: "", //产品规格

        textureOfMaterial: "", //材质
        sheetSpecification: "", //片材规格
        productSpecifications: "", //成品规格
        num: "", //订单数量
        mouldCode: "", //模具编号
        toolDieCode: "", //刀模编号
        mouldNum: "", //模具个数
        quantityOfMaterial_used: "", //用料数量 kg
        quantityOfMaterialUsedAxis: "", //用料数量 轴
        deliveryTime: null //交货时间
      },
      errorMsg: {
        workcode: "",
        teamName: "",
        dateOfManufacture: "",
        productName: "",
        machineNumber: ""
      },
      rules: {
        // processName: [{ required: true, message: "请选择产品工序" }],
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
  },
  created() {
    this.processHeader.processId = this.$route.query.processId

    this.processHeader.workcode = this.projectInfo.workcode; //获取工单编号
    if (this.projectInfo.productid) {
      this.productProcessgetList(this.projectInfo.productid);
    }
    this.processHeader.saleOrder = this.projectInfo.orderid; //订单编号
    this.processHeader.custormId = this.projectInfo.idcustorm; //客户id
    this.processHeader.customername = this.projectInfo.customername; //客户姓名
    this.processHeader.productId = this.projectInfo.productid; //产品id
    this.processHeader.productName = this.projectInfo.productname; //产品名称
    this.processHeader.productSpecifications = this.projectInfo.productsize; //产品规格
    this.processHeader.num = this.projectInfo.ordernum; //订单数量

    this.validator = validator(this.rules, this.processHeader);
    // this.processHeader.workcode = this.projectInfo.workcode; //获取工单编号
  },
  methods: {
     openWorkordernum() {
      // this.infomations.dailyType = this.dailyType;
      // this.$store.commit("CACHE_FILL_DAILY_DATA", this.infomations);
      this.$router.push({
        path: "/workordernum",
        query: { num: this.$route.path }
      });
    },
    goback() {
      this.$router.push("/fillDaily");
    },
    goPageTo() {
      this.validate((errors, fields) => {
        if (errors) return;
        this.$store.commit("ADD_BLISTER_PROCESS", this.processHeader);
        this.$router.push("/blisterUptake");
      });
    },
    productProcessgetList(productid) {  //产品工序接口
      api.productProcessgetList({ productid: productid }).then(res => {
        // console.log(res);
        // this.productProcess = res.data;
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
  },
  components: {
    customBackHeader,
    VantFieldDate
  }
};
</script>
<style  scoped>
</style>