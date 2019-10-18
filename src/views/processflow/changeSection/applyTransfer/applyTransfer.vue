
<template>
  <div class="Fu">

    <basic-header :leftArrow=true  title="填写转库信息"></basic-header><!-- rightText='提交' @clickEvent="goPageTo()" -->

      <div v-if="status.index ==='tianjia'" class="buttons">
          <van-button type="info" size="small" @click="goPageTo(0)">入库</van-button><!-- loading = "true" loading-type="spinner" loading-text="加载中..."-->
          <van-button type="warning" size="small"  @click="goPageTo(1)">转序</van-button><!-- loading = "true" loading-type="spinner" loading-text="加载中..."-->
      </div>
      <div v-else-if=" status.index === 0 || typeof status.index === 'number'" class="buttons">
          <van-button v-if="status.button_tou === 0" type="info" size="small" @click="goPageTo(0)">入库</van-button>
          <van-button v-if="status.button_tou === 1" type="warning" size="small"  @click="goPageTo(1)">转序</van-button>
      </div>

    <article class="inputs">
        <van-cell-group>
            <router-link :to="{path:'/workordernum',query:{num:'/applyTransfer'}}">
                <van-field center v-model="inputData.workcode" label="工单编号" placeholder="请输入工单编号" right-icon="arrow" :error-message="hint.workcode" disabled @click = "workcodeFn()" />
            </router-link>
        </van-cell-group>
        <van-row>
            <van-field-select-picker label="产品名称" placeholder="请选择产品名称" v-model="inputData.productName" :error-message="hint.productName" :columns= columns_productName @input= "clickinput_productName"/>
        </van-row>
        <van-row>
            <van-field-select-picker label="原工序" placeholder="请选择原工序" v-model="inputData.sprocessName" :error-message="hint.sprocessName" :columns= columnsData2 @input= "clickinput2"/>
        </van-row>
        <van-cell-group><van-field v-model="inputData.unitName" label="产品单位" disabled/></van-cell-group>
        <van-cell-group><van-field v-model="inputData.ordernum" label="计划量" disabled/></van-cell-group>

        <van-cell-group><van-field v-model="inputData.completionQuantity" label="完成量" placeholder="请输入完成量" :error-message="hint.completionQuantity" maxlength="30" /></van-cell-group>

        <!--<w-field-->
                <!--label = "完成量" placeholder = "请输入完成量" YZ_rule="isNumber"  errorMessage="完成量由1-30位的数字组成" :vModel="inputData.completionQuantity" maxlength="30"-->
                <!--v-on:w-field_c1="input_completionQuantity($event)">-->
        <!--</w-field>-->
        <van-cell-group>
            <van-field v-model="inputData.waste" label="不合格数量" placeholder="输入不合格数量" :error-message="hint.waste" />
        </van-cell-group>
        <van-cell-group>
            <van-field v-model="inputData.machineNumber" label="机台号" placeholder="请输入机台号" :error-message="hint.machineNumber" maxlength="30" />
        </van-cell-group>
        <!--<w-field-->
                <!--label = "机台号" placeholder = "请输入机台号" YZ_rule="isGeneral" errorMessage="机台号由1-30位的数字、大小写字母组成"-->
                <!--:vModel="inputData.machineNumber" maxlength="30" v-on:w-field_c1="input_machineNumber($event)">-->
        <!--</w-field>-->
        <van-cell-group v-if="status.index !=='tianjia' && inputData.remark !==''">
            <van-field v-model="inputData.remark" label="审批备注" type="textarea" rows="1" autosize clearable disabled />
        </van-cell-group>

        <h3 style="text-align: center;padding: 10px;">参与人</h3>
        <div class="addNR" v-for="(v, index) in inputData.turnOrderUsers">
            <h4>第 {{index + 1}} 个参与人</h4>
            <div class="addNR_chlids">
                <van-cell-group @click = "participantFn(index)">
                    <van-field v-model="v.userName" label="姓名" placeholder="输入姓名" :error-message="hint.turnOrderUsers[index].userName" disabled />
                </van-cell-group>
                <van-cell-group>
                    <van-field v-model="v.userCode" label="编号" placeholder="输入编号" :error-message="hint.turnOrderUsers[index].userCode" disabled/>
                </van-cell-group>
                <van-cell-group>
                    <van-field v-model="v.participationRate" label="参与率(%)" placeholder="输入参与率" :error-message="hint.turnOrderUsers[index].participationRate" />
                </van-cell-group>
            </div>
            <van-button type="danger" size="small" @click="deleteButton1(index)">删除</van-button><!-- loading = "true" loading-type="spinner" loading-text="加载中..."-->
        </div>
        <div class="buttons">
            <van-button type="info" size="small" @click="addButton1()">新增</van-button>
            <!-- loading = "true" loading-type="spinner" loading-text="加载中..."-->
        </div>


        <h3 style="text-align: center;padding: 10px;">模具</h3>
        <div class="addNR" v-for="(v, index) in inputData.turnOrderMoulds">
            <h4>第 {{index + 1}} 个模具</h4>
            <div class="addNR_chlids">
                <van-cell-group @click = "turnOrderMoulds_clickFn(index)">
                    <van-field v-model="v.mouldName" label="模具名称" placeholder="模具名称" :error-message="turnOrderMoulds.hint[index].mouldName" disabled />
                </van-cell-group>
                <van-cell-group>
                    <van-field v-model="v.mouldCode" label="模具编号" placeholder="模具编号" :error-message="turnOrderMoulds.hint[index].num" disabled />
                </van-cell-group>
                <van-cell-group>
                    <van-field v-model="v.num" label="数量" placeholder="输入数量" :error-message="turnOrderMoulds.hint[index].num" />
                </van-cell-group>
                <van-cell-group>
                    <van-field type="textarea" v-model="v.remark" label="备注" placeholder="输入备注" maxlength="300" />
                </van-cell-group>
            </div>
            <van-button type="danger" size="small" @click="turnOrderMoulds_delete(index)">删除</van-button><!-- loading = "true" loading-type="spinner" loading-text="加载中..."-->
        </div>
        <div class="buttons"><van-button type="info" size="small" @click="turnOrderMoulds_add()">新增</van-button></div>

        <h3 style="text-align: center;padding: 10px;">投入与产出</h3>
        <div class="addNR" v-for="(v, index) in inputData.turnOrderbs">
          <h4>第 {{index + 1}} 个子信息</h4>
          <div class="addNR_chlids">

              <van-cell-group @click = "turnOrderbs_NameFn(0,index)">
                  <van-field v-model="v.produceName" label="投入名称" placeholder="输入投入名称" :error-message="hint.turnOrderbs[index].produceName" disabled />
              </van-cell-group>
              <van-cell-group>
                  <van-field v-model="v.iNum1" label="投入数量A" placeholder="输入投入数量" :error-message="hint.turnOrderbs[index].iNum1" />
              </van-cell-group>
              <van-cell-group @click="unitsPickerFn('putInto1',index)">
                  <van-field v-model="v.iUnitName1" label="投入单位A" disabled  right-icon="arrow-down" :error-message="hint.turnOrderbs[index].iUnitName1" />
              </van-cell-group>
              <van-cell-group>
                  <van-field v-model="v.iNum2" label="投入数量B" placeholder="输入投入数量" :error-message="hint.turnOrderbs[index].iNum2" />
              </van-cell-group>
              <van-cell-group @click="unitsPickerFn('putInto2',index)">
                  <van-field v-model="v.iUnitName2" label="投入单位B" disabled  right-icon="arrow-down" :error-message="hint.turnOrderbs[index].iUnitName2" />
              </van-cell-group>

              <van-cell-group @click = "turnOrderbs_NameFn(1,index)">
                  <van-field v-model="v.investmentName" label="产出名称" placeholder="输入产出名称"  :error-message="hint.turnOrderbs[index].investmentName"  disabled  />
              </van-cell-group>

              <van-cell-group><van-field v-model="v.pNum1" label="产出数量A" placeholder="输入产出数量" :error-message="hint.turnOrderbs[index].pNum1" /></van-cell-group>
              <van-cell-group @click="unitsPickerFn('putOut1',index)">
                  <van-field v-model="v.pUnitName1" label="产出单位A" disabled right-icon="arrow-down" :error-message="hint.turnOrderbs[index].pUnitName1" />
              </van-cell-group>

              <van-cell-group><van-field v-model="v.pNum2" label="产出数量B" placeholder="输入产出数量" :error-message="hint.turnOrderbs[index].pNum2" /></van-cell-group>
              <van-cell-group @click="unitsPickerFn('putOut2',index)">
                  <van-field v-model="v.pUnitName2" label="产出单位B" disabled right-icon="arrow-down" :error-message="hint.turnOrderbs[index].pUnitName2" />
              </van-cell-group>
              <van-cell-group><van-field type="textarea" v-model="v.remark" label="备注" placeholder="请输入备注" maxlength="300" /></van-cell-group>
          </div>
          <van-button type="danger" size="small" @click="deleteNR(index)">删除</van-button><!-- loading = "true" loading-type="spinner" loading-text="加载中..."-->
      </div>


        <div class="buttons"><van-button type="info" size="small" @click="addNR()">新增</van-button></div>

    </article>
      <van-popup v-model="unitsPicker.show" position="bottom">
          <van-picker show-toolbar :columns="columns.unitsValues" get-container="getContainer()" @cancel="onCancel" @confirm="onConfirm"/>
      </van-popup>

      <van-popup v-model="show.outputNameList" position="right" class="m-outputNameList">
          <article>
              <div class="m-outputNameList_zhuTi" v-for="(v, index) in columns.into_or_output">
                  <p><strong>物料名称</strong><span>{{v.materielName}}</span></p>
                  <p v-if="v.plannedVolume"><strong>计划量</strong><span>{{v.plannedVolume}}</span></p>
                  <p><strong>单位</strong><span>{{v.unitName}}</span></p>
                  <p><strong>工时</strong><span>{{v.workingHours}}</span></p>
                  <p><strong>操作</strong><span><van-button type="info" size="small" @click="outputNameList_buttonFn(v)">确认</van-button></span></p>
              </div>
          </article>
      </van-popup>

      <van-popup v-model="show.participant" position="right" class="m-outputNameList">
          <article>
              <div class="m-outputNameList_zhuTi" v-for="(v, index) in columns.participantList">
                  <p><strong>姓名</strong><span>{{v.userName}}</span></p>
                  <p><strong>编码</strong><span>{{v.userCode}}</span></p>
                  <p><strong>参与率</strong><span>{{v.participationRate}}</span></p>
                  <p><span><van-button type="info" size="small" @click="participant_child_makeFn(v)">确认</van-button></span></p>
              </div>
          </article>
      </van-popup>

      <van-popup v-model="turnOrderMoulds.show" position="right" class="m-outputNameList">
          <article>
              <div class="m-outputNameList_zhuTi" v-for="(v, index) in turnOrderMoulds.columns">
                  <p><strong>模具名称</strong><span>v.mouldName</span></p>
                  <p><strong>模具编号</strong><span>v.mouldCode</span></p>
                  <p><strong>模具数量</strong><span>v.num</span></p>
                  <p><strong>模具备注</strong><span>v.remark</span></p>
                  <p><span><van-button type="info" size="small" @click="turnOrderMoulds_makeFn(v)">确认</van-button></span></p>
              </div>
          </article>
      </van-popup>
  </div>


</template>
<script>
  import basicHeader from '@/components/header/basicHeader.vue';
  import VanFieldSelectPicker from "@/components/VanFieldSelectPicker/VanFieldSelectPicker";
  import { forEach } from 'async';
  import api from "../../../../api/api.js";
  import {isGeneral} from '../../../../util/util.js';
  import {isNumber} from '../../../../util/util.js';
  import {isEmpty} from '../../../../util/util.js';
  import wField from "../../../../components/field.vue";
  //常量s
  const CONST = {
    productName:"请先选择工单编号",
    sprocessName:"请先选择产品名称",
  };

  export default {
    data () {
      return {
        unitsPicker:{
          show:false,
          pickerTarget:"",//单位部分的选择器的触发单位 —— 当前是哪一部分触发了选择器
          units_status:"",//putInto代表是投入部分触发了，putOut代表是产出部分触发了
        },
        columns:{
          productName:[{id: "0", name: CONST.productName}],
          sprocessName:[{id: "0", name: CONST.sprocessName}],
          into_or_output:[],//下面两个赋值给这个，弹出层用
          intoList: [
//            {
//              idUnit: "",
//              materiel: "",
//              materielName: "等待获取",
//              plannedVolume: "等待获取",
//              specification:"等待获取",
//              unitName: "等待获取",
//              waste: "等待获取",
//              workingHours: "等待获取",
//            }
          ],
          outputList: [
//            {
//              idUnit: "",
//              materiel: "",
//              materielName: "等待获取",
//              plannedVolume: "等待获取",
//              specification:"等待获取",
//              unitName: "等待获取",
//              waste: "等待获取",
//              workingHours: "等待获取",
//            }
          ],
          participantList:[],
        },
        inputData:[],
        //架构没弄好，加个pageData做补丁
//        pageData:{
//          machineNumber:""
//
//        },
        status:{
          button_tou:"",//决定显示哪个按钮
          index:this.$store.state.changeSequence.index,//从第几条信息进来的
          turnOrderbs_index:"",//第几条的投入投出被点击了
          turnOrderUsers_index:"",
          into_or_output:""//投入还是投出
        },

        YZ:{
          workcode:false,
          productName:false,
          sprocessName:false,
          machineNumber:false,
          completionQuantity:false,
          turnOrderbs:[],////储存所有子信息里的所有小信息是否通过  （优化点）
          turnOrderbs_all:false,//储存所有子信息是否通过
          turnOrderUsers:[],
          turnOrderUsers_all:false,
          waste:false

        },
        //差不多和YZ一样
        hint:{
          workcode:"",
          productName:"",
          sprocessName:"",
          machineNumber:"",
          completionQuantity:"",
          turnOrderbs:[],
          turnOrderUsers:[],
          waste:"",
        },

        //分模块存储

        //模具部分
        turnOrderMoulds:{
          status_index:"",//第几条的被点击了
          hint:[],
          YZ:[],
          YZ_all:false,
          columns:[],
          show:false,
        },

        show:{
          outputNameList:false,
          participant:false,
        }
      };
    },
    created(){
      //根据点击进来时的状态对inputData进行赋值
      const temporary_A = "" + this.$store.state.changeSequence.index;
      if(temporary_A){
        const index = this.$store.state.changeSequence.index;
        const store_Data = this.$store.state.changeSequence.inputData;
        if(typeof index === "number"){
          this.inputData = store_Data;//保存的脏值赋给input Data

          //显示入库按钮还是转序按钮
          if(store_Data.flag === 0){this.status.button_tou = 0;}
          else if(store_Data.flag === 1){this.status.button_tou = 1;}

          //投入产出数据初始化相关
          if(store_Data.turnOrderbs.length > 0){
            for(let i = 0;i<store_Data.turnOrderbs.length;i++){
              this.hint.turnOrderbs.push(
                {
                  produceName:"",
                  investmentName:"",
                  iNum1:"", iUnitName1:"",iNum2:"",iUnitName2:"",
                  pNum1:"", pUnitName1:"", pNum2:"", pUnitName2:""}
              );
              this.YZ.turnOrderbs.push(
                {
                  produceName:false,
                  investmentName:false,
                  iNum1:false,iUnitName1:false,
                  iNum2:false,iUnitName2:false,
                  pNum1:false,pUnitName1:false,
                  pNum2:false,pUnitName2:false,

                }
              );
            }
          }else{console.log("没有子信息")}


          //参与人数据初始化相关
          if(store_Data.turnOrderUsers.length > 0){
            for(let i = 0;i<store_Data.turnOrderUsers.length;i++){
              this.hint.turnOrderUsers.push(
                {id:"", userName:"", userCode:"", participationRate:"",}
              );
              this.YZ.turnOrderUsers.push(
                {id:false, userName:false, userCode:false, participationRate:false,}
              );
            }
          }else{console.log("没有参与人")}

          //模具据初始化相关
          if(store_Data.turnOrderMoulds.length > 0){
            for(let i = 0;i<store_Data.turnOrderMoulds.length;i++){
              this.hint.turnOrderMoulds.push(
                {
                  mouldId:"",//模具ID
                  num:"",//数量
                  remark:"", //备注
                  mouldName:"",//模具名称
                  mouldCode:"",//模具编号
                }
              );
              this.YZ.turnOrderMoulds.push(
                {
                  mouldId:"",//模具ID
                  num:"",//数量
                  remark:"", //备注
                  mouldName:"",//模具名称
                  mouldCode:"",//模具编号
                }
              );
            }
          }else{console.log("没有模具")}
        }
        else{
          this.inputData = {
            workcode:"",//请输入工单编号
            productName:"",//请选择产品名称
            productid:"",
            sprocessName:"",//请选择原工序
            sprocessid:"",
            unitName:"",//产品单位
            ordernum:"",//计划量
            completionQuantity:"",//完成量
            waste:"",//不合格数量
            machineNumber:"",//请输入机台号
            remark:"",//审批备注
            turnOrderbs:[],
            turnOrderUsers:[],
            turnOrderMoulds:[],
          };
        }
        console.log(this.inputData);
      }
      //else{} 优化点



      //根据URL获取工单编号和对应ID
      if(this.$route.query.workcode) {
        console.log(this.$route.query.workcode);
        this.inputData.workcode = this.$route.query.workcode;
        this.inputData.workcodeId = this.$route.query.workcodeId;
        this.inputData.ordernum = this.$route.query.ordernum;
        this.inputData.unitName = this.$route.query.unitName;//产品单位
        this.inputData.unit = this.$route.query.unit;// 产品单位ID
      }
      //根据空值获取单位
      api.selectUnit({}).then(res => {
        if (res.data) {
          this.columns.units = res.data;
          this.getUnitsValuesFn();
        } else {console.log("子信息单位获取失败");}
      });
      //根据工单编号ID获取产品信息
      if(this.inputData.workcodeId){
        let data = this.inputData.workcodeId;
        api.getManufactureOrdersListById(data).then(res => {
          console.log(res);
          if (res.data) {
            let temporary_A = [];
            for(let i = 0;i<res.data.length;i++){
              temporary_A.push({
                id:res.data[i].productid,
                name:res.data[i].productname
              });
            }
            this.columns.productName = temporary_A;
          } else {console.log("产品选项值获取失败");}
        });
      }
    },
    beforeMount(){},
    computed: {
      columns_productName() {let select = [];this.columns.productName.forEach(element => {select.push(element.name);});return select},
      columnsData2() {var select = [];this.columns.sprocessName.forEach(element => {select.push(element.name)});return select},
    },

    methods: {
      input_machineNumber(data){
        console.log(data);
        this.inputData.machineNumber = data.value;
        this.YZ.machineNumber = data.YZ;
      },
//      input_completionQuantity(data){
//        console.log(data);
//        this.inputData.completionQuantity = data.value;
//        this.YZ.completionQuantity = data.YZ;
//      },

      participant_child_makeFn(v){
        const index = this.status.turnOrderUsers_index;//第几条
        this.inputData.turnOrderUsers[index].id = v.id;
        this.inputData.turnOrderUsers[index].userName = v.userName;
        this.inputData.turnOrderUsers[index].userCode = v.userCode;
        this.inputData.turnOrderUsers[index].participationRate = v.participationRate;

        this.show.participant = false;//关闭
      },

      turnOrderMoulds_makeFn(v){
        console.log(v);
        const index = this.turnOrderMoulds.status_index;//第几条
        this.inputData.turnOrderMoulds[index].mouldId = v.mouldId;
        this.inputData.turnOrderMoulds[index].num = v.num;
        this.inputData.turnOrderMoulds[index].remark = v.remark;
        this.inputData.turnOrderMoulds[index].mouldName = v.mouldName;
        this.inputData.turnOrderMoulds[index].mouldCode = v.mouldCode;

        this.turnOrderMoulds.show = false;//关闭
      },



      //子信息的选择弹窗里的确认按键
      outputNameList_buttonFn(v){
        console.log(v);
        const index = this.status.turnOrderbs_index;//第几条

        if(this.status.into_or_output==="into1"){/*投入相关赋值*/
          this.inputData.turnOrderbs[index].produceId = v.materiel;
          this.inputData.turnOrderbs[index].produceName = v.materielName;
          this.inputData.turnOrderbs[index].iUnit1 = v.idUnit;
          this.inputData.turnOrderbs[index].iUnitName1 = v.unitName;
        }
        if(this.status.into_or_output==="into2"){/*投入相关赋值*/
          this.inputData.turnOrderbs[index].produceId = v.materiel;
          this.inputData.turnOrderbs[index].produceName = v.materielName;
          this.inputData.turnOrderbs[index].iUnit2 = v.idUnit;
          this.inputData.turnOrderbs[index].iUnitName2 = v.unitName;
        }
        if(this.status.into_or_output==="output1"){/*产出相关赋值*/
          this.inputData.turnOrderbs[index].investmentId = v.materiel;
          this.inputData.turnOrderbs[index].investmentName = v.materielName;
          this.inputData.turnOrderbs[index].pUnit1 = v.idUnit;
          this.inputData.turnOrderbs[index].pUnitName1 = v.unitName;
        }
        if(this.status.into_or_output==="output2"){/*产出相关赋值*/
          this.inputData.turnOrderbs[index].investmentId = v.materiel;
          this.inputData.turnOrderbs[index].investmentName = v.materielName;
          this.inputData.turnOrderbs[index].pUnit2 = v.idUnit;
          this.inputData.turnOrderbs[index].pUnitName2 = v.unitName;
        }
        this.show.outputNameList = false;//关闭
      },

      participantFn(child_index){
        //index 代表第几个子信息被点击了
        this.status.turnOrderUsers_index = child_index;
        this.show.participant = true;
          api.workorderselectPerson({}).then(res => {
            console.log(res);
            if (res.data.records.length > 0) {
              let temporary_A = [];
                for(let i = 0;i<res.data.records.length;i++){
                  temporary_A.push({
                    id:res.data.records[i].id,
                    userName:res.data.records[i].name,
                    userCode:res.data.records[i].code,
                  });
                }
                this.columns.participantList = temporary_A;
                console.log("this.columns.participantList↓");
                console.log(this.columns.participantList);
              }
            else {console.log("暂无数据");this.$toast("暂无数据")}
          });
      },

      turnOrderMoulds_clickFn(child_index){
        //index 代表第几个子信息被点击了
        this.turnOrderMoulds.status_index = child_index;
        this.turnOrderMoulds.show = true;

        const url ="/product/process/mould/getByProductProcess" + "?product=" + this.inputData.productid + "&process=" + this.inputData.sprocessid;
        console.log(url);
        api.mouldGetByProductProcess(url,{}).then(res => {
          console.log(url);
          console.log("请求下来的turnOrderMoulds数据",res);
          if (res.data.length > 0) {
            let temporary_A = [];
            for(let i = 0;i<res.data.length;i++){
              temporary_A.push({
                  mouldId : res.data[i].mouldId,
                  num : v.num,
                  remark : v.remark,
                  mouldName : v.mouldName,
                  mouldCode : v.mouldCode
              });
            }
            this.turnOrderMoulds.columns = temporary_A;
            console.log("this.turnOrderMoulds.columns↓");
            console.log(this.turnOrderMoulds.columns);
          }
          else {console.log("暂无数据");this.$toast("暂无数据")}
        });
      },


      //子信息的
      turnOrderbs_NameFn(data1, child_index){
        //index 代表第几个子信息被点击了
        this.status.turnOrderbs_index = child_index;

        //data1:0代表是投入1    1代表是投出
        if(this.inputData.sprocessid && this.inputData.productid){
          this.show.outputNameList = true;
          //服务器压力↑用户体验↑  //请求产出数据们
          const url ="/turnorder/getByProductProcess" + "?productid=" + this.inputData.productid + "&sprocessid=" + this.inputData.sprocessid + "&flag=" + data1;
          api.getByProductProcesszx( url,{}).then(res => {
            console.log("A",res);
            if (res.data.length > 0) {
              let temporary_A = [];

              if(data1 === 0){/* 投入*/
                for(let i = 0;i<res.data.length;i++){
                  temporary_A.push({
                    idUnit:res.data[i].idUnit,//单位的ID
                    unitName:res.data[i].unitName,//单位名称
                    materiel:res.data[i].materiel,//此条信息的ID
                    materielName:res.data[i].materielName,//此条信息的名称
                    specification:res.data[i].specification,//规格
//                    plannedVolume:res.data[i].plannedVolume,//计划量
                    workingHours:res.data[i].workingHours//工时
                  });
                }
//                this.columns.intoList = temporary_A;
                this.columns.into_or_output = temporary_A;
                this.status.into_or_output = "into";
                console.log("this.columns.intoList↓");
                console.log(this.columns.intoList);
              }
              if(data1 === 1){/* 产出*/
                let temporary_A = [];
                for(let i = 0;i<res.data.length;i++){
                  temporary_A.push({
                    idUnit:res.data[i].idUnit,//单位的ID
                    materiel:res.data[i].materiel,//此条信息的ID
                    materielName:res.data[i].materielName,//此条信息的名称
                    specification:res.data[i].specification,//规格
                    plannedVolume:res.data[i].plannedVolume,//计划量
                    unitName:res.data[i].unitName,//单位名称
                    workingHours:res.data[i].workingHours//工时
                  });
                }
//                this.columns.outputList = temporary_A;
                this.columns.into_or_output = temporary_A;
                this.status.into_or_output = "output";
                console.log("this.columns.outputList↓");
                console.log(this.columns.outputList);
              }
            }
            else {console.log("暂无数据");this.$toast("暂无数据")}
          });
        }
        else{this.$toast("请先填写产品名称和原工序")}
      },


      //工单选择相关
      workcodeFn(){
        let data = this.sendDataFn();
        this.$store.commit('CHANGE_SAVECODE',true);
        this.$store.commit('CHANGE_DATA',data);//嗯? 有点意思 竟然是这种逻辑

        // this.$store.commit('CHANGE_INDEX',this.status.index);
      },

        //获取子信息的单位需要的汉字集合值
      getUnitsValuesFn(){
        let units_A = [];
        for(let i = 0;i<this.columns.units.length;i++){
          units_A[i] = this.columns.units[i].name;
        }
        this.columns.unitsValues = units_A;
      },


      //单位的选择器部分
      unitsPickerFn:function (status,index) {
        this.unitsPicker.pickerTarget = index;//选择器目标改变  单位模块的第几部分的选择器
        this.unitsPicker.units_status = status;//选择器目标改变  单位模块的第几部分的具体哪个选择器
        this.unitsPicker.show = true;
       },
      //取消
      onCancel(){this.unitsPicker.show = false},
      //确定
      onConfirm(value, index){
        const picker_index = this.unitsPicker.pickerTarget;//决定了是第几条子信息
        console.log(`当前值：${value}, 当前索引：${index}`);
        const temporary_A = this.unitsPicker.units_status;
          if(temporary_A === "putInto1"){
            this.inputData.turnOrderbs[picker_index].iUnitName1 = value;//赋值value
            this.inputData.turnOrderbs[picker_index].iUnit1 = this.columns.units[index].id;//inputData的对应id值 = 源数据的id值
          }

        if(temporary_A === "putInto2"){
          this.inputData.turnOrderbs[picker_index].iUnitName2 = value;//赋值value
          this.inputData.turnOrderbs[picker_index].iUnit2 = this.columns.units[index].id;//inputData的对应id值 = 源数据的id值
        }
        if(temporary_A === "putOut1"){
          this.inputData.turnOrderbs[picker_index].pUnitName1 = value;//赋值value
          this.inputData.turnOrderbs[picker_index].pUnit1 = this.columns.units[index].id;//inputData的对应id值 = 源数据的id值
        }
        if(temporary_A === "putOut2"){
          this.inputData.turnOrderbs[picker_index].pUnitName2 = value;//赋值value
          this.inputData.turnOrderbs[picker_index].pUnit2 = this.columns.units[index].id;//inputData的对应id值 = 源数据的id值
        }
        this.unitsPicker.show = false;
      },
      //控制选择器显示位置
      getContainer() {return document.getElementsByClassName("Fu")[0]},



      //总信息的产品名称部分的选择事件
      clickinput_productName(newVal, index)  {
        this.inputData.productid = this.columns.productName[index].id;
        //根据产品名称获取原工序选项
        if(this.inputData.productid){
          const data = {
            productid:this.inputData.productid
          };
          api.productProcess(data).then(res => {
            console.log(res);
            if (res.data) {
              let temporary_A = [];
              for(let i = 0;i<res.data.length;i++){
                temporary_A.push({
                  id:res.data[i].processId,
                  name:res.data[i].processName
                });
              }
              this.columns.sprocessName = temporary_A;
            } else {console.log("工序可选项获取失败");}
          });
        }
      },

      //总信息的原工序部分的选择事件
      clickinput2(newVal, index) {
        this.inputData.sprocessid = this.columns.sprocessName[index].id;
      },

      //添加按钮1（参与人部分）
      addButton1(){
        this.inputData.turnOrderUsers.push(
          {id:"", userName:"", userCode:"", participationRate:"",}
        );
        this.YZ.turnOrderUsers.push(
          {id:false, userName:false, userCode:false, participationRate:false,}
        );
        this.hint.turnOrderUsers.push(
          {id:"", userName:"", userCode:"", participationRate:"",}
        );
      },
      //删除按钮1（参与人部分）
      deleteButton1(index){
        this.inputData.turnOrderUsers.splice(index,1);
        this.YZ.turnOrderUsers.splice(index,1);
        this.hint.turnOrderUsers.splice(index,1);
      },

      //模具模块的新增与删除
      turnOrderMoulds_add(){
        this.inputData.turnOrderMoulds.push(
          {
            mouldId:"",//模具ID
            num:"",//数量
            remark:"", //备注
            mouldName:"",//模具名称
            mouldCode:"",//模具编号
          }
        );
        this.turnOrderMoulds.YZ.push(
          {
            mouldId:false,//模具ID
            num:false,//数量
            remark:false, //备注
            mouldName:false,//模具名称
            mouldCode:false,//模具编号
          }
        );
        this.turnOrderMoulds.hint.push(
          {
            mouldId:"",//模具ID
            num:"",//数量
            remark:"", //备注
            mouldName:"",//模具名称
            mouldCode:"",//模具编号
          }
        );
      },
      turnOrderMoulds_delete(index){
        this.inputData.turnOrderMoulds.splice(index,1);
        this.turnOrderMoulds.YZ.splice(index,1);
        this.turnOrderMoulds.hint.splice(index,1);
      },


      //添加按钮
      addNR(){
        this.inputData.turnOrderbs.push(
          {
            produceName:"",
            iNum1:"", iUnitName1:"", iUnit1:"",
            iNum2:"", iUnitName2:"", iUnit2:"",
            investmentName:"",
            pNum1:"", pUnitName1:"", pUnit1:"",
            pNum2:"", pUnitName2:"", pUnit2:"",
          }
        );
        this.YZ.turnOrderbs.push(
          {
            produceName:false,
            iNum1:false, iUnitName1:false, iUnit1:false,
            iNum2:false, iUnitName2:false, iUnit2:false,
            investmentName:false,
            pNum1:false, pUnitName1:false, pUnit1:false,
            pNum2:false, pUnitName2:false, pUnit2:false,
          }
        );
        this.hint.turnOrderbs.push(
          {
            produceName:"",
            iNum1:"", iUnitName1:"", iUnit1:"",
            iNum2:"", iUnitName2:"", iUnit2:"",
            investmentName:"",
            pNum1:"", pUnitName1:"", pUnit1:"",
            pNum2:"", pUnitName2:"", pUnit2:"",
          }
        );
      },
      //删除按钮
      deleteNR(index){
        this.inputData.turnOrderbs.splice(index,1);
        this.YZ.turnOrderbs.splice(index,1);
        this.hint.turnOrderbs.splice(index,1);
      },


      //数据处理函数
      sendDataProcessing (flag){
        const NR = this.inputData;
        let data = {
          workcode:NR.workcode,      //工单编号
          productid:NR.productid,    /*产品名称*/
          sprocessid:NR.sprocessid,/*原工序*/
          unit:NR.unit,//产品单位
          ordernum:NR.ordernum,//计划量
          completionQuantity:NR.completionQuantity,//完成量
          waste:NR.waste,//不合格量
          machineNumber:NR.machineNumber,    //机台号
          flag : flag,//入库是0  转序是1
        };

        //参与人处理
        let temporary_participant = [];
        for(let i = 0;i<NR.turnOrderUsers.length;i++){
          let temporary_A = {};
          temporary_A.userId =  NR.turnOrderUsers[i].id;
          temporary_A.userName =  NR.turnOrderUsers[i].userName;
          temporary_A.userCode =  NR.turnOrderUsers[i].userCode;
          temporary_A.participationRate = NR.turnOrderUsers[i].participationRate;
          temporary_participant.push(temporary_A);
        }
        data.turnOrderUsers = temporary_participant;


        //模具处理
        let temporary_turnOrderMoulds = [];
        for(let i = 0;i<NR.turnOrderMoulds.length;i++){
          let temporary_A = {};
          temporary_A.mouldId =  NR.turnOrderMoulds[i].mouldId;
          temporary_A.num =  NR.turnOrderMoulds[i].num;
          temporary_A.mouldName =  NR.turnOrderMoulds[i].mouldName;
          temporary_A.mouldCode =  NR.turnOrderMoulds[i].mouldCode;
          temporary_A.remark =  NR.turnOrderMoulds[i].remark;

          temporary_turnOrderMoulds.push(temporary_A);
        }
        data.turnOrderMoulds = temporary_turnOrderMoulds;


        //子信息处理
        let temporary_A = [];
        for(let i = 0;i<NR.turnOrderbs.length;i++){
          let temporary_B = {};
          temporary_B.produceName =     NR.turnOrderbs[i].produceName;
          temporary_B.produceId =       NR.turnOrderbs[i].produceId;
          temporary_B.iNum1 =             NR.turnOrderbs[i].iNum1;
          temporary_B.iUnit1 =            NR.turnOrderbs[i].iUnit1;
          temporary_B.iNum2 =             NR.turnOrderbs[i].iNum2;
          temporary_B.iUnit2 =            NR.turnOrderbs[i].iUnit2;
          temporary_B.investmentName =  NR.turnOrderbs[i].investmentName;
          temporary_B.investmentId =    NR.turnOrderbs[i].investmentId;
          temporary_B.pNum1 =             NR.turnOrderbs[i].pNum1;
          temporary_B.pUnit1 =            NR.turnOrderbs[i].pUnit1;
          temporary_B.pNum2 =             NR.turnOrderbs[i].pNum2;
          temporary_B.pUnit2 =            NR.turnOrderbs[i].pUnit2;
          temporary_A.push(temporary_B);
        }
        data.turnOrderbs = temporary_A;

        //如果是编辑信息的状态则把ID加进去
        if(typeof this.status.index === "number" || this.status.index === 0){
          data.id = this.inputData.id;
        }
        console.log(JSON.stringify(data));
        return data;
      },

      goPageTo(flag) {
        /*验证*///健壮性
        //主信息
        this.YZ.workcode = isEmpty(this.inputData.workcode);
        this.YZ.productName = isEmpty(this.inputData.productid);
        this.YZ.sprocessName = isEmpty(this.inputData.sprocessid);
        this.YZ.machineNumber = isEmpty(this.inputData.machineNumber);
        this.YZ.waste = isNumber(this.inputData.waste);
        this.YZ.completionQuantity = isNumber(this.inputData.completionQuantity);
        const temporary_B = this.YZ;
        if (!temporary_B.workcode)     {this.hint.workcode = "输入错误"}      else {this.hint.workcode = ""}
        if (!temporary_B.productName)  {this.hint.productName = "输入错误"}  else {this.hint.productName = ""}
        if (!temporary_B.sprocessName) {this.hint.sprocessName = "输入错误"} else {this.hint.sprocessName = ""}
        if (!temporary_B.machineNumber){this.hint.machineNumber = "输入错误"}else {this.hint.machineNumber = ""}
        if (!temporary_B.waste){this.hint.waste = "只能为数字"}else {this.hint.waste = ""}
        if (!temporary_B.completionQuantity){this.hint.completionQuantity = "只能为数字"}else {this.hint.completionQuantity = ""}

        //参与人数据验证
        if(this.inputData.turnOrderUsers.length >= 1){
          let temporary_participant = true;
          for(let i = 0;i<this.YZ.turnOrderUsers.length;i++) {
            const data = this.inputData.turnOrderUsers[i];
            this.YZ.turnOrderUsers[i].userName = isEmpty(data.userName);
            this.YZ.turnOrderUsers[i].userCode = isEmpty(data.userCode);
            this.YZ.turnOrderUsers[i].participationRate = isEmpty(data.participationRate);
            const temporary_A = this.YZ.turnOrderUsers[i];
            if (!temporary_A.userName)            {this.hint.turnOrderUsers[i].userName = "姓名输入错误"}                 else {this.hint.turnOrderUsers[i].userName= ""}
            if (!temporary_A.userCode)           {this.hint.turnOrderUsers[i].userCode = "编号输入错误"}            else {this.hint.turnOrderUsers[i].userCode = ""}
            if (!temporary_A.participationRate) {this.hint.turnOrderUsers[i].participationRate = "参与率为数字"}       else {this.hint.turnOrderUsers[i].participationRate = ""}

            if(temporary_A.userName && temporary_A.userCode && temporary_A.participationRate){
              console.log("第" + (i + 1) + "条参与人数据通过验证");
            }
            else{temporary_participant = false;}
          }
          this.YZ.turnOrderUsers_all = temporary_participant;
        }
        else{
          this.$toast('参与人至少需要有一个');
        }
        console.log("this.inputData.turnOrderUsers.length",this.inputData.turnOrderUsers.length);


        //模具数据验证
        if(this.inputData.turnOrderMoulds.length >= 1){
          let temporary_turnOrderMoulds = true;

          for(let i = 0;i<this.turnOrderMoulds.YZ.length;i++) {
            const data = this.inputData.turnOrderMoulds[i];
            this.turnOrderMoulds.YZ[i].num = isNumber(data.num);
            this.turnOrderMoulds.YZ[i].mouldCode = isNumber(data.mouldCode);
            this.turnOrderMoulds.YZ[i].remark = isEmpty(data.remark);

            const temporary_A = this.turnOrderMoulds.YZ[i];
            if (!temporary_A.num)            {this.turnOrderMoulds.hint[i].num = "数量输入错误"}                 else {this.turnOrderMoulds.hint[i].num= ""}
            if (!temporary_A.mouldCode)     {this.turnOrderMoulds.hint[i].mouldCode = "模具编号错误"}            else {this.turnOrderMoulds.hint[i].mouldCode = ""}
            if (!temporary_A.remark)        {this.turnOrderMoulds.hint[i].remark = "备注不能为空"}       else {this.turnOrderMoulds.hint[i].remark = ""}

            if(temporary_A.num && temporary_A.mouldCode && temporary_A.remark){
              console.log("第" + (i + 1) + "条模具数据通过验证");
            }
            else{temporary_turnOrderMoulds = false;}
          }
          this.turnOrderMoulds.YZ_all = temporary_turnOrderMoulds;
        }
        else{
          this.$toast('模具至少需要有一个');
        }
        console.log("this.inputData.turnOrderMoulds.length",this.inputData.turnOrderMoulds.length);



        //子信息错误提示——提示所有错误版

        if(this.inputData.turnOrderbs.length >= 1){
          let temporary_child_status = true;//初始赋值true感觉不太美观，应该有更优雅的方法
          for(let i = 0;i<this.YZ.turnOrderbs.length;i++) {
            const data = this.inputData.turnOrderbs[i];
            this.YZ.turnOrderbs[i].produceName = isEmpty(data.produceName);
            this.YZ.turnOrderbs[i].iNum1 = isEmpty(data.iNum1);
            this.YZ.turnOrderbs[i].iUnit1 = isEmpty(data.iUnit1);
            this.YZ.turnOrderbs[i].iNum2 = isEmpty(data.iNum2);
            this.YZ.turnOrderbs[i].iUnit2 = isEmpty(data.iUnit2);
            this.YZ.turnOrderbs[i].investmentName = isEmpty(data.investmentName);
            this.YZ.turnOrderbs[i].pNum1 = isEmpty(data.pNum1);
            this.YZ.turnOrderbs[i].pUnit1 = isEmpty(data.pUnit1);
            this.YZ.turnOrderbs[i].pNum2 = isEmpty(data.pNum2);
            this.YZ.turnOrderbs[i].pUnit2 = isEmpty(data.pUnit2);

            const temporary_A = this.YZ.turnOrderbs[i];
            if (!temporary_A.produceName)     {this.hint.turnOrderbs[i].produceName = "投入名称输入错误"}         else {this.hint.turnOrderbs[i].produceName = ""}
            if (!temporary_A.iNum1)            {this.hint.turnOrderbs[i].iNum1 = "投入A数量输入错误"}                 else {this.hint.turnOrderbs[i].iNum1 = ""}
            if (!temporary_A.iUnit1)           {this.hint.turnOrderbs[i].iUnitName1 = "投入A单位输入错误"}            else {this.hint.turnOrderbs[i].iUnitName1 = ""}
            if (!temporary_A.iNum2)            {this.hint.turnOrderbs[i].iNum2 = "投入B数量输入错误"}                 else {this.hint.turnOrderbs[i].iNum2 = ""}
            if (!temporary_A.iUnit2)           {this.hint.turnOrderbs[i].iUnitName2 = "投入B单位输入错误"}            else {this.hint.turnOrderbs[i].iUnitName2 = ""}
            if (!temporary_A.investmentName) {this.hint.turnOrderbs[i].investmentName = "产出名称输入错误"}       else {this.hint.turnOrderbs[i].investmentName = ""}
            if (!temporary_A.pNum1)            {this.hint.turnOrderbs[i].pNum1 = "产出A数量输入错误"}                  else {this.hint.turnOrderbs[i].pNum1 = ""}
            if (!temporary_A.pUnit1)           {this.hint.turnOrderbs[i].pUnitName1 = "产出A单位输入错误"}            else {this.hint.turnOrderbs[i].pUnitName1 = ""}
            if (!temporary_A.pNum2)            {this.hint.turnOrderbs[i].pNum2 = "产出B数量输入错误"}                  else {this.hint.turnOrderbs[i].pNum2 = ""}
            if (!temporary_A.pUnit2)           {this.hint.turnOrderbs[i].pUnitName2 = "产出B单位输入错误"}            else {this.hint.turnOrderbs[i].pUnitName2 = ""}

            console.log(this.YZ.turnOrderbs[i]);
            console.log(this.inputData.turnOrderbs[i]);
            if(temporary_A.produceName &&
              temporary_A.iNum1 && temporary_A.iUnit1 && temporary_A.iNum2 && temporary_A.iUnit2 &&
              temporary_A.investmentName &&
              temporary_A.pNum1 && temporary_A.pUnit1 && temporary_A.pNum2 && temporary_A.pUnit2 )
            {
              console.log("第" + (i + 1) + "条数据通过验证");
            }
            else{temporary_child_status = false;}
          }
          this.YZ.turnOrderbs_all = temporary_child_status;
        }
        else{
          this.$toast('投入产出部分至少需要一项');
        }
        console.log("this.inputData.turnOrderbs.length",this.inputData.turnOrderbs.length);


        const this_YZ = this.YZ;

        console.log(this_YZ.turnOrderUsers_all , this_YZ.turnOrderbs_all , this.turnOrderMoulds.YZ_all,   this_YZ.workcode , this_YZ.productName ,
          this_YZ.sprocessName , this_YZ.machineNumber , this_YZ.completionQuantity , this_YZ.waste);

        if(this_YZ.turnOrderUsers_all && this_YZ.turnOrderbs_all && this.turnOrderMoulds.YZ_all && this_YZ.workcode && this_YZ.productName &&
          this_YZ.sprocessName && this_YZ.machineNumber && this_YZ.completionQuantity && this_YZ.waste)
        {

          //发送ajax
          const data = this.sendDataProcessing(flag);
          console.log("提交时的数据↓");
          console.log(data);
          api.turnordersaveOrUpdate(data).then(
            res => {console.log(res);this.$router.push('/changeSection')},
            err => {console.log("a",err);this.$toast(err.msg)}
          );
          //将来可能有需要分情况的处理
          if(this.status.index === "tianjia"){}
          else if(typeof this.status.index === "number" || this.status.index === 0){}
          else{console.log("出大大问题了！无法获取状态值(并不大，刷新后会这样，回头这里加个获取状态值)");}
        }
      },

    },
    mounted() {},
    components: {
      basicHeader,
      VanFieldSelectPicker,
      wField
    }
  }
</script>
<style  scoped>
    .Fu{margin-bottom: 70px;min-width: 320px;}
    .m-outputNameList{height: 100%;width:80%;}
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


    .buttons{display: flex;justify-content: flex-end;padding:6px;}
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
