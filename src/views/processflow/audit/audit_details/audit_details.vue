
<template>
  <div class="Fu">

    <basic-header :leftArrow=true  title="审批"></basic-header><!-- rightText='提交' @clickEvent="goPageTo()" -->
    <article class="inputs">
        <van-cell-group><van-field v-model="inputData.workcode" label="工单编号" placeholder="请输入工单编号" disabled /></van-cell-group>
        <van-cell-group><van-field v-model="inputData.productName" label="产品名称" placeholder="请输入工单编号" disabled/></van-cell-group>
        <van-cell-group><van-field v-model="inputData.sprocessName" label="原工序" placeholder="请输入原工序" disabled/></van-cell-group>
        <van-cell-group><van-field v-model="inputData.machineNumber" label="机台号" placeholder="请输入机台号" disabled /></van-cell-group>

        <h3 style="text-align: center;padding: 10px;">参与人</h3>
        <div class="addNR" v-for="(v, index) in inputData.turnOrderUsers">
            <h4>第 {{index + 1}} 个参与人</h4>
            <div class="addNR_chlids">
                <van-cell-group>
                    <van-field v-model="v.userName" label="姓名" placeholder="输入姓名"  disabled />
                </van-cell-group>
                <van-cell-group>
                    <van-field v-model="v.userCode" label="编号" placeholder="输入编号"  disabled/>
                </van-cell-group>
                <van-cell-group>
                    <van-field v-model="v.participationRate" label="参与率(%)" placeholder="输入参与率" disabled/>
                </van-cell-group>
            </div>
        </div>
        <div class="buttons">
        </div>
        <h3 style="text-align: center;padding: 10px;">投入与产出</h3>
        <div class="addNR" v-for="(v, index) in inputData.turnOrderbs">
          <h4>第 {{index + 1}} 个子信息</h4>
          <div class="addNR_chlids">
              <van-cell-group>
                  <van-field v-model="v.produceName" label="投入名称" placeholder="输入投入名称"  disabled />
              </van-cell-group>
              <van-cell-group>
                  <van-field v-model="v.iNum" label="投入数量" placeholder="输入投入数量" disabled/>
              </van-cell-group>
              <van-cell-group>
                  <van-field v-model="v.iUnitName" label="投入单位" disabled/>
              </van-cell-group>
              <van-cell-group>
                  <van-field v-model="v.investmentName" label="产出名称" placeholder="输入产出名称"  disabled  />
              </van-cell-group>
              <van-cell-group>
                  <van-field v-model="v.pNum" label="产出数量" placeholder="输入产出数量"  disabled/>
              </van-cell-group>
              <van-cell-group>
                  <van-field v-model="v.iPnitName" label="产出单位" disabled />
              </van-cell-group>
              <van-cell-group>
                  <van-field v-model="v.waste" label="不合格数量" placeholder="输入不合格数量" disabled />
              </van-cell-group>
          </div>
      </div>

        <van-cell-group>
            <van-field v-model="inputData.remark" label="审批备注" type="textarea" placeholder="请输入留言" rows="1" autosize clearable />
        </van-cell-group>
        <div class="buttons">
            <van-button type="info" size="small" @click="goPageTo(1)">审批通过</van-button><!-- loading = "true" loading-type="spinner" loading-text="加载中..."-->
            <van-button type="warning" size="small" @click="goPageTo(2)">拒绝</van-button><!-- loading = "true" loading-type="spinner" loading-text="加载中..."-->
        </div>
    </article>
  </div>


</template>
<script>
  import basicHeader from '@/components/header/basicHeader.vue';
  import VanFieldSelectPicker from "@/components/VanFieldSelectPicker/VanFieldSelectPicker";
  import { forEach } from 'async';
  import api from "../../../../api/api.js";
  //常量s
  const CONST = {
    productName:"请先选择工单编号",
    sprocessName:"请先选择产品名称",
  };

  export default {
    data () {
      return {
        inputData:this.$store.state.audit.inputData,//保存的脏值赋给input Data
      };
    },
    created() {},
    beforeMount(){},
    computed: {},
    methods: {
//      AAA(data){
//        console.log("1:");
//        console.log(data)
//      },
//      BBB(data){
//        console.log("2:");
//        console.log(data)
//      },


      goPageTo(flag) {
        const data = {
          status:flag,
          id:this.inputData.id,
          remark: this.inputData.remark,
        };
        console.log("A");
          api.turnCheck(data).then(
            res => {
              console.log(res);
              console.log("B");
              this.$router.push('/audit');
              //this.$router.push('/changeSection')
            },
            err => { console.log("C");console.log(err);}
          );
        }
      },
    mounted() {},
    components: {
      basicHeader,
      VanFieldSelectPicker,
    }
  }
</script>
<style  scoped>
    .Fu{margin-bottom: 70px;min-width: 320px;}
    .m-outputNameList{height: 100%;width: 96%;}
    .m-outputNameList h3{text-align: center;padding: 20px 10px;}
    .m-outputNameList .class_red{background-color: rgba(153, 204, 255, 1); color: white;}
    .m-outputNameList_zhuTi{display: flex;justify-content:flex-start;align-items:center;flex-wrap:wrap;background-color:rgba(100,100,100,.1);margin: 10px;}

    .m-outputNameList_zhuTi> p{display: flex;align-items:center;}
    .m-outputNameList_zhuTi> p > strong{font-weight: 700;text-align:center; min-width: 70px;}
    .m-outputNameList_zhuTi> p > span{
        text-align: center;min-width:50px;
        color: #333333;font-size: 14px;
        padding:4px 10px;margin: 4px;border-radius: 6px;
    }

    .m-outputNameList_zhuTi> p{padding: 10px 4px}
    .tag_childsFu span{ background-color: transparent;color: #333333;border: solid 1px #d6d6d6;}


    .buttons{display: flex;justify-content:space-around;padding:16px;}
    .buttons button{margin: 0 10px;}
    .addNR{
        padding: 10px;
        margin: 20px;
        box-shadow: 2px 2px 6px 0 #666;
    }
    .addNR h4{padding: 10px 0;text-align: center;}
    /*.van-cell--large .van-cell__title{font-size: 14px;max-width: 90px;}*/
    /*.van-cell__value{text-align: left;font-size: 14px;}*/
    .addNR_chlids{}
    .addNR_chlids .van-cell-group{}
    .addNR_chlids .van-cell-group .van-field{}
    .addNR_chlids .van-hairline--top-bottom::after{border-width: 0;}



    /*@media screen and (min-width :360px){*/
        /*.addNR{padding: 10px 6px;}*/
    /*}*/

</style>
