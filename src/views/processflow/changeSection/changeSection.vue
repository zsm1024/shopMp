
<template>
  <div class="Fu">

    <basic-header :leftArrow=true  title="转序操作" ></basic-header><!--rightText='申请' @clickEvent="goPageTo()" -->

    <div class="button_Fu button_pageA"><van-button type="primary" @click="goOnFn('tianjia')">添加申请</van-button></div>

    <article class="list">
        <!--<div class="m-filtrate" @click = "filtrateFn()">筛选</div>-->
        <div>
            <van-button ref = "filtrate_WTG"  type="info" size="small" @click = "filtrateFn(2)">未通过</van-button>
            <van-button ref = "filtrate_SPZ"  type="info" size="small" @click = "filtrateFn(0)">审批中</van-button>
            <van-button ref = "filtrate_YTG"  type="info" size="small" @click = "filtrateFn(1)">已通过</van-button>
            <van-button ref = "filtrate_all"  type="info" size="small" @click = "filtrateFn('all')">全部</van-button>
        </div>
        <div class="m-goTop"><a href="#">返回顶部</a></div>
      <!--<div class="show_all">展开全部</div>-->
      <div class="chunk" v-for="(v, index) in listData" :key ="index" >
        <section class="chunk_Tou">
          <h4>第 {{index+1}} 条</h4>
          <div class="button_Fu">
              <van-button v-if="v.status == '0'" style="opacity: 1" type="warning" size="small" disabled>审批中</van-button>
              <van-button v-else-if="v.status == '1'" type="default" size="small" disabled>已通过</van-button>
              <van-button v-else-if="v.status == '2'" round type="info" size="small" @click="goOnFn(index)">编辑</van-button>
          </div>
        </section>
        <section class="inputs">
          <van-cell-group><van-field v-model="v.workcode" label="工单编号" placeholder="等待获取工单编号" disabled error-message="" /></van-cell-group>
          <van-cell-group><van-field v-model="v.productName" label="产品名称" placeholder="等待获取产品名称" disabled error-message="" /></van-cell-group>
          <van-cell-group><van-field v-model="v.sprocessName" label="原工序" placeholder="等待获取原工序" disabled error-message="" /></van-cell-group>
          <van-cell-group><van-field v-model="v.tprocessName" label="目标工序" placeholder="等待获取目标工序" disabled error-message="" /></van-cell-group>
          <van-cell-group v-if="v.remark!==''">
              <van-field v-model="v.remark" label="审批备注" type="textarea" rows="1" autosize clearable disabled/>
          </van-cell-group>
          <!--<van-cell-group><van-field v-model="v.a4" label="单位" placeholder="请输入单位" disabled error-message="" /></van-cell-group>-->
            <div class="chunk_vices" v-if="v.turnOrderUsers.length > 0">
                <section class="inputs_childs" v-for="(n, index) in v.turnOrderUsers" :key ="index">
                    <van-cell-group><van-field v-model="n.userName" label="参与者姓名" label-class=""  placeholder="等待获取" disabled error-message="" /></van-cell-group>
                    <van-cell-group><van-field v-model="n.userCode" label="参与者编号" label-class=""  placeholder="等待获取" disabled error-message="" /></van-cell-group>
                    <van-cell-group><van-field v-model="n.participationRate" label="参与率" label-class=""  placeholder="等待获取" disabled error-message="" /></van-cell-group>
                </section>
            </div>

            <div class="chunk_vices" v-if="v.turnOrderMoulds.length > 0">
                <section class="inputs_childs" v-for="(n, index) in v.turnOrderMoulds" :key ="index">
                    <van-cell-group><van-field v-model="n.mouldName" label="模具名称" label-class=""  placeholder="等待获取" disabled error-message="" /></van-cell-group>
                    <van-cell-group><van-field v-model="n.mouldCode" label="模具编号" label-class=""  placeholder="等待获取" disabled error-message="" /></van-cell-group>
                    <van-cell-group><van-field v-model="n.mouldCode" label="模具数量" label-class=""  placeholder="等待获取" disabled error-message="" /></van-cell-group>
                    <van-cell-group><van-field v-model="n.remark" label="模具备注" label-class=""  placeholder="等待获取" disabled error-message="" /></van-cell-group>
                </section>
            </div>

          <div class="chunk_vices" v-if="v.turnOrderbs.length > 0">
            <section class="inputs_childs" v-for="(n, index) in v.turnOrderbs" :key ="index">
                <van-cell-group><van-field v-model="n.produceName" label="投入物料名称" label-class=""  placeholder="等待获取名称" disabled error-message="" /></van-cell-group>
                <van-cell-group><van-field v-model="n.iNum1" label="投入A数量" label-class=""  placeholder="等待获取数量" disabled error-message="" /></van-cell-group>
                <van-cell-group><van-field v-model="n.iUnitName1" label="投入A单位" label-class=""  placeholder="等待获取单位" disabled error-message="" /></van-cell-group>
                <van-cell-group><van-field v-model="n.iNum2" label="投入B数量" label-class=""  placeholder="等待获取数量" disabled error-message="" /></van-cell-group>
                <van-cell-group><van-field v-model="n.iUnitName2" label="投入B单位" label-class=""  placeholder="等待获取单位" disabled error-message="" /></van-cell-group>

                <van-cell-group><van-field v-model="n.investmentName" label="产出物料名称" label-class=""  placeholder="等待获取名称" disabled error-message="" /></van-cell-group>
                <van-cell-group><van-field v-model="n.pNum1" label="产出A数量" label-class=""  placeholder="等待获取数量" disabled error-message="" /></van-cell-group>
                <van-cell-group><van-field v-model="n.iPnitName1" label="产出A单位" label-class=""  placeholder="等待获取单位" disabled error-message="" /></van-cell-group>
                <van-cell-group><van-field v-model="n.pNum2" label="产出B数量" label-class=""  placeholder="等待获取数量" disabled error-message="" /></van-cell-group>
                <van-cell-group><van-field v-model="n.iPnitName2" label="产出B单位" label-class=""  placeholder="等待获取单位" disabled error-message="" /></van-cell-group>
                <van-cell-group><van-field v-model="n.waste" label="不合格数量" label-class=""  placeholder="等待获取不合格数" disabled error-message="" /></van-cell-group>
            </section>
          </div>
          <!--<van-collapse v-model="activeNames"><van-collapse-item title="标题1" name="1"></van-collapse-item></van-collapse>-->
        </section>
      </div>

    </article>

    <article class="inputs">

    </article>



  </div>
</template>

<script>
  import basicHeader from '@/components/header/basicHeader.vue'
//  import { mapState, mapGetters } from "vuex";
  import api from "../../../api/api.js";
  export default {
    data () {
      return {
        listData:[],
        LISTDATA:[],

        status:{
          //筛选条件按钮点击状态，no为未点击，yes为已点击
          button_WTG:"no",
          button_SPZ:"no",
          button_YTG:"no",
        }
      };
    },

    computed:{},

    created(){
      //删除爆粗的值
        this.$store.commit('CHANGE_SAVECODE',false);
        this.$store.commit('CHANGE_DATA',"");
        //请求数据
        const turngetPageList_data = {CurrentPage:1, PageSize:2000};
        api.turngetPageList(turngetPageList_data).then(res => {
            if (res.data) {
                console.log("数据信息↓");
                console.log(res);
                this.listData = res.data.records;
                this.LISTDATA = res.data.records;
                this.filtrateFn(2);
                console.log(this.listData);
              console.log(this.LISTDATA);
            } else {console.log("获取失败");}
        });
      },

      beforeCreate(){},
      beforeMount(){},
    methods: {
        //标签选项函数
      filtrateFn(status){
        if(status === 0){//审批中
          if(this.status.button_SPZ === "no"){
            this.temporaryFn(status);
            this.status.button_SPZ = "yes";
            this.status.button_YTG = "no";
            this.status.button_WTG = "no";
            //可优化 怎么优化？

            this.$refs.filtrate_SPZ.style.color = "red";
            this.$refs.filtrate_YTG.style.color = "";
            this.$refs.filtrate_WTG.style.color = "";
          }
          else{
            this.listData = this.LISTDATA;  this.status.button_SPZ = "no";
            this.$refs.filtrate_SPZ.style.color = "";
          }
        }
        if(status === 1){//已通过
          if(this.status.button_YTG === "no"){
            this.temporaryFn(status);
            this.status.button_YTG = "yes";
            this.status.button_SPZ = "no";
            this.status.button_WTG = "no";
            //可优化 怎么优化？
            this.$refs.filtrate_SPZ.style.color = "";
            this.$refs.filtrate_YTG.style.color = "red";
            this.$refs.filtrate_WTG.style.color = "";
          }
          else{
            this.listData = this.LISTDATA;  this.status.button_YTG = "no";
            this.$refs.filtrate_YTG.style.color = "";
          }
        }
        if(status === 2){//未通过
          if(this.status.button_WTG === "no"){
            this.temporaryFn(status);
            this.status.button_WTG = "yes";
            this.status.button_SPZ = "no";
            this.status.button_YTG = "no";
            //可优化 怎么优化？
            this.$refs.filtrate_SPZ.style.color = "";
            this.$refs.filtrate_YTG.style.color = "";
            this.$refs.filtrate_WTG.style.color = "red";
          }
          else{
            this.listData = this.LISTDATA;
            this.status.button_WTG = "no";
            this.$refs.filtrate_WTG.style.color = "";
          }
        }
        if(status === "all"){
            this.listData = this.LISTDATA;
            this.status.button_WTG = "no";
            this.status.button_SPZ = "no";
            this.status.button_YTG = "no";
          //可优化 怎么优化？
          this.$refs.filtrate_SPZ.style.color = "";
          this.$refs.filtrate_YTG.style.color = "";
          this.$refs.filtrate_WTG.style.color = "";
        }
      },

      temporaryFn(status) {
        if(this.listData !== this.LISTDATA){this.listData = this.LISTDATA;}
        let temporary_A = [];
        for(let i = 0;i<this.listData.length;i++){
          if (this.listData[i].status === status){
            temporary_A.push(this.listData[i])
          }
        }
        this.listData = temporary_A;/*有个数组自身的方式 不过数据部分应该不适合用*/
      },

//      goPageTo() {
//        //this.$router.push('/applyTransfer')
//      },
      goOnFn(num){
        this.$store.commit('CHANGE_INDEX',num);
        if(typeof num === "number"){
          this.$store.commit('CHANGE_DATA',this.listData[num]);
        }
        else{}
        //tianjia  为添加申请
        //数字类型的index下标 则为点击目标（从零开始）

        //路由传输数据
     //   this.$router.push({path: '/applyTransfer', query: { index: num }});
        this.$router.push('/applyTransfer')
      }
    },
    mounted() {

    },
    components: {
      basicHeader
    }

  }

</script>
<style  scoped>
    .Fu{margin-bottom: 70px;}
    .list{}
    .chunk{padding: 10px;margin: 10px; border: solid 1px rgba(230,230,230,1);box-shadow: 2px 2px 6px 0 #666;background-color: white;border-radius: 10px}

    .chunk_Tou{  display: flex;justify-content: space-between;align-items: center}

    .chunk_Tou h4{font-family: 楷体;font-weight:400;text-align:left;font-size:16px;}
    .chunk_vices{  display: flex;justify-content: center;margin: 10px auto;flex-wrap: wrap}
    .chunk_vices .inputs_childs{padding:2px;border: solid 1px #f2f3f5;box-shadow: 1px 1px 4px 0 #707274;margin: 4px;border-radius:4px;min-width:80%;}
    .chunk_vices .van-hairline--top-bottom::after{border-width: 0;}
    /*.van-cell .van-cell__title{padding: 10px;width: 200px;flex: inherit;} //控制table大小 无法生效 推测跟执行顺序有关*/
    .van-cell .van-cell__title{font-size:14px}
    .A{padding: 10px}

    @media screen and (max-width :550px){
        .chunk_vices .van-cell{padding:6px;}
        .chunk_vices .inputs_childs{padding:2px;box-shadow: 2px 2px 6px 0 #707274;margin: 4px;}
    }
    /*@media screen and (max-width :500px){*/
      /*.chunk_vices .van-cell{padding:6px;}*/
    /*}*/
    /*@media screen and (max-width :420px){*/
      /*.chunk{padding:10px 4px;margin:10px  4px;}*/
      /*.chunk_vices .van-cell{padding:2px;}*/
    /*}*/

    /*@media screen and (max-width :380px){*/
    /*}*/

    @media screen and (max-width :360px){
      .chunk{padding: 10px; margin:10px;}
      .chunk_vices{justify-content: center;}
      .chunk_vices .van-cell{padding:10px 15px;}
    }

    .button_Fu{margin:0;padding:10px; display: flex;justify-content: flex-end;}
    .button_Fu span{}
    .show_all{position: fixed;top:58px;left:0;padding: 10px;background-color: #4caf50;opacity: .4;
        border-radius: 10px;color: white;z-index: 2;font-size: 14px;
    }
    /*返回顶部...*/
    .m-goTop{
        position: fixed;bottom:58px;right:10px;padding: 10px;background-color: #4caf50;opacity: .8;
        border-radius: 10px;color: white;z-index: 2;font-size: 14px;
    }
    .m-goTop > a{color: white;}

    /*筛选*/
    .m-filtrate{
        position: fixed;top:58px;left:10px;padding: 10px;opacity: .8;
        border-radius: 10px;color: white;z-index: 2;font-size: 14px;min-width:60px;text-align: center;
        background-color: #4caf50;
        background: -webkit-linear-gradient(left,#1F2D3D, #86fcd2); /* Safari 5.1 - 6.0 */
        /*background: -o-linear-gradient(right,#1F2D3D,#F9FAFC); !* Opera 11.1 - 12.0 *!*/
        /*background: -moz-linear-gradient(right,#1F2D3D,#F9FAFC); !* Firefox 3.6 - 15 *!*/
        background: linear-gradient(45deg,#1F2D3D,#86fcd2); /* 标准的语法（必须放在最后）*/
    }
    .m-filtrate > a{color: white;}


</style>
