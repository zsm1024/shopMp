<!-- 每日日报 -->
<template>
  <div class="Fu">

    <basic-header :leftArrow=true  title="编辑日报详情" rightText='保存' @clickEvent="goPageTo()" ></basic-header>

    <article class="inputs">
      <!--<van-cell-group><van-cell title="填报类型" :value="inputData.dailyType" size="large" @click="pickerFn(pickerDataSet.dailyType, 'dailyType')" /></van-cell-group>-->
      <!--<van-cell-group><van-cell title="班组类型" :value="inputData.squadType" size="large" @click="pickerFn( pickerDataSet.squadType, 'squadType')" /></van-cell-group>-->
      <van-row><van-field-select-picker label="填报类型" placeholder="请选择" v-model="inputData.dailyType" :columns= columnsData @input= "clickinput"/></van-row>
      <van-row><van-field-select-picker label="班组类型" placeholder="请选择" v-model="inputData.squadType" :columns= columnsData2 @input= "clickinput2"/></van-row>
      <van-cell-group><van-cell title="工单编号" size="large" is-link arrow-direction="down" /></van-cell-group>
      <van-cell-group><van-field label="生产日期" v-model="inputData.productionDate" readonly is-link @click="pickerTimeFn()"/></van-cell-group>
      <!--<van-cell-group><van-cell title="生产日期" :value="inputData.productionDate" size="large" @click="pickerTimeFn()" /></van-cell-group>-->

      <van-cell-group><van-field v-model="inputData.a2" label="交班班长" placeholder="请输入交班班长" error-message="" /></van-cell-group>
      <van-cell-group><van-field v-model="inputData.a3" label="副手" placeholder="请输入副手" error-message="" /></van-cell-group>
      <van-cell-group><van-field v-model="inputData.a3" label="当班质检员" placeholder="请输入当班质检员" error-message="" /></van-cell-group>
      <van-cell-group><van-field v-model="inputData.a3" label="车间主任" placeholder="请输入车间主任" error-message="" /></van-cell-group>
      <van-cell-group><van-field v-model="inputData.a3" label="排序" placeholder="请输入排序" error-message="" /></van-cell-group>
      <van-cell-group><van-field v-model="inputData.a4" label="备注" type="textarea" placeholder="请输入备注" rows="1" autosize error-message="" /></van-cell-group>

      <van-popup v-model="picker_time.show" position="bottom">
        <van-datetime-picker
          v-model="picker_time.data"
          type="date"
          @cancel="pickerTime_onCancel"
          @confirm="pickerTime_confirm"
        />
      </van-popup>

    </article>
  </div>

</template>

<script>
import { mapGetters } from "vuex";
  import basicHeader from '@/components/header/basicHeader.vue';
  import VanFieldSelectPicker from "@/components/VanFieldSelectPicker/VanFieldSelectPicker";
  import { forEach } from 'async';
  export default {
    data () {
      return {
        selectData:[
          {
            id: "1",
            name: "公斤"
          },
          {
            id: "2",
            name: "长度"
          }
        ],
        selectData2:[
          {
            id: "1",
            name: "公斤2"
          },
          {
            id: "2",
            name: "长度2"
          },
          {
            id: "3",
            name: "333"
          }
        ],
        inputData:{
          a1:"",
          a2:"",
          a3:"",
          a4:"",
          dailyType:"请选择填报类型",
          squadType:"请选择班组类型",
          productionDate:"请选择生产日期"
        },
        //时间
        picker_time:{
          data:new Date(),
          show:false
        },

      };
    },
    computed: {
      ...mapGetters(['dailyDatas', 'editDailyIndex']),
      columnsData() {
        // console.log(this.selectData)
        var select = [];
        this.selectData.forEach(element => {
          select.push(element.name)
        });
        return select
      },
      columnsData2() {
        // console.log(this.selectData)
        var select = [];
        this.selectData2.forEach(element => {
          select.push(element.name)
        });
        return select
      },
    },
    created() {

    },
    methods: {
      clickinput(newVal, index) {
        console.log(newVal+index)
        console.log(this.selectData[index].id)
      },
      clickinput2(newVal, index) {
        console.log(newVal+index)
        console.log(this.selectData2[index].id)
      },

//      //选择器部分半封装式触发函数
//      pickerFn:function (data, target) {
//        this.pickerData = data;//数值改变
//        this.pickerTarget = target;//选择器目标改变
//        this.show.choose_show = true
//       },
//      onCancel(){this.show.choose_show = false},
//      onConfirm(value, index){
//        console.log(`当前值：${value}, 当前索引：${index}`);
//
//        //根据是谁触发的选择器来分别赋值
//        let this_pickerTarget = this.pickerTarget;
//        if( this_pickerTarget === "dailyType" ){this.inputData.dailyType = value;}
//        else if( this_pickerTarget === "squadType"){this.inputData.squadType = value;}
//        this.show.choose_show = false;
//      },






      //导航栏事件触发
      goPageTo() {
        console.log("导航栏事件触发");
        //this.$router.push('/applyTransfer')
      },
      //删除函数
      deleteFn(){
        console.log("删除事件触发")
      },
      //确认函数触发
      goOnFn(num){
        console.log("确认事件触发");
        this.$router.push('/addDailyDetails')
      },
      getContainer() {return document.getElementsByClassName("Fu")[0]},







      //选择器时间部分的确定函数
      pickerTime_confirm(value){
        let data = (value+"").split(" ");
        //月份此时是英文，看情况决定是否转换为数字
        let time = {year:data[3], month:data[1], day:data[2]};
        //转换月份
        time.month = this.monthEvolveFn(time.month);
        console.log(time.year+"-"+time.month+"-"+time.day);
        this.inputData.productionDate = (time.year+"-"+time.month+"-"+time.day);
        this.picker_time.show = false
      },
      //选择器时间部分触发函数
      pickerTimeFn:function () {this.picker_time.show = true},
      //选择器时间部分的取消函数
      pickerTime_onCancel(){this.picker_time.show = false},


      //附加函数部分
      //月份转换
      monthEvolveFn(NR){
        const dates = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];//时间缩写
        for(let i = 0;i<dates.length;i++){
          if(NR === dates[i]) {
            if (i < 9) {return ("0" +( i + 1))}
            else {return ("" + (i + 1))}
          }
        }
      }
    },
    mounted() {

    },
    components: {
      basicHeader,
      VanFieldSelectPicker
    }

  }
</script>
<style  scoped>
</style>
