<!-- 出库操作 -->
<template>
  <div>
    <custom-back-header
      :leftArrow="true"
      @goback="goback"
      title="出库操作"
    ></custom-back-header>


      <div class="buttons_fu">
          <van-button type="info" size="small" @click = "goPageTo('finishedCode')">产成品出库</van-button>
          <van-button type="info" size="small" @click = "goPageTo('materialsCode')">材料出库</van-button>
      </div>


      <div v-if="mode === 'materialsCode' ">
          <van-cell-group>
              <router-link :to="{path:'/workordernum',query:{num:'/outStorage'}}">
                  <van-field center v-model="inputData.ManufactureOrderCode" label="工单编号" placeholder="请输入工单编号" right-icon="arrow" :error-message="hint.ManufactureOrderCode" disabled />
              </router-link>
          </van-cell-group>

          <van-cell-group><van-field v-model="inputData.saleOrderCode" label="订单编号" placeholder="请输入工单编号" maxlength="255" disabled /></van-cell-group>
          <van-cell-group><van-field v-model="inputData.iddepartment" label="生产车间" placeholder="请输入工单编号" maxlength="255" disabled /></van-cell-group>
          <van-cell-group><van-field v-model="inputData.count" label="数量" placeholder="请输入数量" :error-message="hint.count" maxlength="30" /></van-cell-group>
          <van-cell-group><van-field v-model="inputData.batch" label="批次" placeholder="请输入批次" :error-message="hint.batch" maxlength="30" /></van-cell-group>
          <!--<w-field label="数量" placeholder="请输入数量" YZ_rule="isNumber" errorMessage="数量由1-30位的数字组成" :vModel="inputData.count" maxlength="30" v-on:w-field_c1="input_count($event)"></w-field>-->
          <!--<w-field label="批次" placeholder="请输入批次" YZ_rule="isGeneral" errorMessage="批次由1-30位的数字或字母组成" :vModel="inputData.batch" maxlength="30" v-on:w-field_c1="input_batch($event)"></w-field>-->

          <div class="buttons_fu"><van-button  type="info" size="small" @click = "materials_button()" >确认出库</van-button></div>
          <!--<button type="submit" form="form1">提交</button>-->
      </div>

      <div v-if="mode === 'finishedCode'">
          <van-panel :title="inputData.inventoryName" :desc="inputData.receiveVoucherCode">
              <div>
                  <van-cell-group><van-field v-model="inputData.custormName" label="客户" placeholder="等待获取" maxlength="30" disabled /></van-cell-group>
                  <van-cell-group><van-field v-model="inputData.count" label="商品数量" placeholder="请输入小于原值的商品数量" :error-message="hint.count" maxlength="30" /></van-cell-group>
                  <van-cell-group><van-field v-model="inputData.unitName" label="单位" placeholder="等待获取" maxlength="30" disabled /></van-cell-group>
              </div>
              <div class="buttons_fu"><van-button  type="info" size="small" @click = "finished_button()" >确认出库</van-button></div>
          </van-panel>
      </div>

      <!--<form style="display: none" id="form1" onsubmit="return materialsGoTo()" :action="URL" method="get">-->
          <!--1<input type="text" :value="inputData.ManufactureOrderCode">-->
          <!--2<input type="text" :value="inputData.saleOrderCode">-->
          <!--3<input type="text" :value="inputData.iddepartment">-->
          <!--4<input type="text" :value="inputData.count">-->
          <!--5<input type="text" :value="inputData.batch">-->
      <!--</form>-->
  </div>
</template>

<script>
import api from "@/api/api";
import { mapState } from "vuex";
import customBackHeader from "@/components/header/customBackHeader.vue";
import basicHeader from "@/components/header/basicHeader.vue";
import wField from "../../../components/field.vue";
import {isGeneral} from '../../../util/util.js';
import {isNumber} from '../../../util/util.js';
import {isEmpty} from '../../../util/util.js';


export default {
  data() {
    return {
      code:this.$store.state.outStorage.code, //材料出库 时扫码得到的数值
      mode:this.$store.state.outStorage.mode, //材料出库 时扫码得到的数值
      inputData:{
        id:"",
        ManufactureOrderCode:"",// 工单编号 ，
        saleOrderCode:"",// 订单编号 ，
        iddepartment:"",// 生产车间
        count:"",  //数量
        batch:"",//批次

        inventoryName:"",
        receiveVoucherCode:"",
        custormName:"",
        unitName:""
      },
      YZ:{
        count:false,  //数量
        ManufactureOrderCode:false,
        batch:false,//批次
      },
      hint:{
        ManufactureOrderCode:"",//强调
        count:"",
        batch:""
      },
      status:{
        initCount:"",  //初始化时保存请求下来的数值
      },
    };
  },
//  computed: {
//    ...mapState(["scanData"])
//  },
//  watch: {
//    scanData(val) {
//      // console.log(val)
//    }
//  },
//  this.$store.commit('OUT_mode',"finishedCode");//代表由哪个入口进入的vuex数据
//this.$store.commit('OUT_materialsCode',"");//代表二维码ID值的vuex数据
//// console.log('1')
//this.$router.push("/barcodeScan");
//},
//goPageTo2(string){
//  this.inputData = false;
//  this.$store.commit('OUT_mode',"materialsCode");//赋值wz的代表由哪个入口进入的vuex数据
  created(){
    let state_mode = this.$store.state.outStorage.mode;
    let state_code = this.$store.state.outStorage.code;


      if(state_mode === "finishedCode"){
        if(state_code){
          this.inputData.id = state_code;
          //服务器压力↑用户体验↑  //请求数据
          const url ="/warehousing/getRecordbById/" + state_code;
          api.getRecordbById( url,{}).then(res => {
            if (res.data) {
              console.log(JSON.stringify(res));
              this.inputData.inventoryName = res.data.inventoryName;
              this.inputData.receiveVoucherCode = res.data.receiveVoucherCode;
              this.inputData.custormName = res.data.custormName;
              this.inputData.unitName = res.data.unitName;
              this.inputData.count = res.data.quantity;  //数量
              this.status.initCount = res.data.quantity; //等于inputData.count应该也行 这里不会绑定数据更新
            }
            else {alert("暂无数据");}
          });
        }
        else{this.$toast("二维码已失效")}
      }
      if(state_mode === "materialsCode"){
        if(state_code){
          this.inputData.id = state_code;
          //根据URL获取工单编号和对应ID
          if(this.$route.query.workcode) {
            this.inputData.ManufactureOrderCode = this.$route.query.workcode;
            this.inputData.saleOrderCode = this.$route.query.orderid;//
            this.inputData.iddepartment = this.$route.query.iddepartment;//车间
          }
          //服务器压力↑用户体验↑  //请求产出数据们
          const url ="/warehousing/getRecordbPurchasingById/" + state_code;
          api.getRecordbPurchasingById( url,{}).then(res => {
            if (res.data) {
              console.log(JSON.stringify(res));
              this.inputData.count = res.data.quantity;  //数量
              this.status.initCount = res.data.quantity; //等于inputData.count应该也行 这里不会绑定数据更新
            }
            else {alert("暂无数据");}
          });
        }
        else{this.$toast("二维码已失效")}
      }
  },
  methods: {
    //组件封装版快捷验证  (废弃 原因：直接提交时父组件数据未更新)
//    input_count(data){this.inputData.count = data.value;this.YZ.count = data.YZ;console.log(this.YZ.count);},
 //   input_batch(data){console.log(data);this.inputData.batch = data.value;this.YZ.batch = data.YZ;console.log(this.YZ.batch);},

    materials_button(){
      //验证数据 直接验证
      if(this.inputData.ManufactureOrderCode){this.YZ.ManufactureOrderCode = true;this.hint.ManufactureOrderCode = ""}
      else{this.YZ.ManufactureOrderCode = false;this.hint.ManufactureOrderCode = "不能为空"}
      //验证数据  封装验证
      this.YZ.count = isNumber(this.inputData.count);
      if(this.YZ.count && (this.inputData.count <= this.status.initCount) ){this.hint.count = ""} else{this.hint.count = "由1-30位的数字组成且不能大于原数值"}
      //验证数据  封装验证
      this.YZ.batch = isGeneral(this.inputData.batch);
      if(this.YZ.batch){this.hint.batch = ""} else{this.hint.batch = "批次由1-30位的数字或字母组成"}

      //验证通过的话
      if(this.YZ.ManufactureOrderCode && this.YZ.count && this.YZ.batch  && (this.inputData.count <= this.status.initCount) ){
        console.log("数据正在发送");
        const url ="/warehousing/materialOutOfStock" +
          "?id=" + this.inputData.id +
          "&ManufactureOrderCode=" + this.inputData.ManufactureOrderCode +
          "&saleOrderCode=" + this.inputData.saleOrderCode +
          "&iddepartment=" + this.inputData.iddepartment +
          "&count=" + this.inputData.count +
          "&batch=" + this.inputData.batch;

        api.getRecordbPurchasingById( url,{}).then(res => {
          if (res) {
            console.log("请求发送成功");
            this.$store.commit('OUT_mode',"");//重置wz的代表由哪个入口进入的vuex数据
            this.$store.commit('OUT_code',"");//重置wz的代表二维码ID值的vuex数据
            this.$router.push('/home')
          }
          else {console.log("暂无数据");}
        });
     //   alert("数据验证已通过");
      }
      else{
     //   alert("数据验证未通过");
      }
    },


    finished_button() {

      this.YZ.count = isNumber(this.inputData.count);

      if(this.YZ.count   && (this.inputData.count <= this.status.initCount) ){this.hint.count = ""} else{this.hint.count = "由1-30位的数字组成且不能大于原数值"}

      if(this.YZ.count  && (this.inputData.count <= this.status.initCount) ){
        const url ="/warehousing/outOfStock" +
          "?id=" + this.inputData.id +
          "&count=" + this.inputData.count;

        api.wz_confirmcodeinfo( url,{}).then(res => {
          if(res) {
            console.log("产成品出库信息提交成功");
            this.$store.commit('OUT_mode',"");//重置wz的代表由哪个入口进入的vuex数据
            this.$store.commit('OUT_code',"");//重置wz的代表二维码ID值的vuex数据
            this.$router.push('/home')
          }
        });
      }
    },

    goPageTo(string) {
      this.YZ = {};
      this.hint = {};
      this.inputData = false;
      this.$store.commit('OUT_mode',string);//代表由哪个入口进入的vuex数据
      this.$store.commit('OUT_code',"");//代表二维码ID值的vuex数据
      // console.log('1')
      this.$router.push("/barcodeScan");
    },

    goback() {
      this.$router.push("/home");
    },


  },
  mounted() {
//    console.log(JSON.stringify(this.scanData));
//
//    if(this.scanData.quantity){
//      this.ZY.initCount = this.scanData.quantity
//    }

    // alert(this.scanData)

  },
  components: {
    basicHeader,
    customBackHeader,
    wField
  }
};
</script>
<style lang="less"  scoped>
    .van-hairline--top-bottom::after{border-width: 0;}

    .buttons_fu{margin:10px;padding:10px; display: flex;justify-content:space-around;}

.out-btn {
  display: flex;
  justify-content: flex-end;
}
.custorm {
  padding-left: 10px;
}
.prodect-desc {
  padding-left: 10px;
}
</style>