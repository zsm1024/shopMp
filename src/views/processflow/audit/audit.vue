
<template>
  <div class="Fu">

    <basic-header :leftArrow=true  title="审批操作" ></basic-header><!--rightText='申请' @clickEvent="goPageTo()" -->
    <article class="list">
        <!--<div class="m-filtrate" @click = "filtrateFn()">筛选</div>-->
        <div class="m-goTop"><a href="#">返回顶部</a></div>
      <!--<div class="show_all">展开全部</div>-->
      <div class="chunk" v-for="(v, index) in listData" :key ="index" >
          <section class="chunk_Tou">
            <h4>第 {{index+1}} 条</h4>
            <div class="button_Fu">
                <van-button type="info" size="small" @click = goOnFn(index)>查看详情</van-button>
            </div>
          </section>
          <section class="inputs">
              <van-cell-group><van-field v-model="v.workcode" label="工单编号" placeholder="等待获取工单编号" disabled error-message="" /></van-cell-group>
              <van-cell-group><van-field v-model="v.productName" label="产品名称" placeholder="等待获取产品名称" disabled error-message="" /></van-cell-group>
              <van-cell-group><van-field v-model="v.sprocessName" label="原工序" placeholder="等待获取原工序" disabled error-message="" /></van-cell-group>
              <van-cell-group><van-field v-model="v.tprocessName" label="目标工序" placeholder="等待获取目标工序" disabled error-message="" /></van-cell-group>
          </section>
          <div class="chunk_vices">
              <section class="inputs_childs" v-for="(n, index) in v.turnOrderUsers" :key ="index">
                  <van-cell-group><van-field v-model="n.userName" label="参与者姓名" label-class=""  placeholder="等待获取" disabled error-message="" /></van-cell-group>
                  <van-cell-group><van-field v-model="n.userCode" label="参与者编号" label-class=""  placeholder="等待获取" disabled error-message="" /></van-cell-group>
                  <van-cell-group><van-field v-model="n.participationRate" label="参与率" label-class=""  placeholder="等待获取" disabled error-message="" /></van-cell-group>
              </section>
          </div>
          <!--<div class="chunk_vices" v-if="v.turnOrderbs.length > 0">-->
              <!--<section class="inputs_childs" v-for="(n, index) in v.turnOrderbs" :key ="index">-->
                  <!--<van-cell-group><van-field v-model="n.produceName" label="投入物料名称" label-class=""  placeholder="等待获取名称" disabled error-message="" /></van-cell-group>-->
                  <!--<van-cell-group><van-field v-model="n.iNum" label="投入物料数量" label-class=""  placeholder="等待获取数量" disabled error-message="" /></van-cell-group>-->
                  <!--<van-cell-group><van-field v-model="n.iUnitName" label="投入物料单位" label-class=""  placeholder="等待获取单位" disabled error-message="" /></van-cell-group>-->
                  <!--<van-cell-group><van-field v-model="n.investmentName" label="产出物料名称" label-class=""  placeholder="等待获取名称" disabled error-message="" /></van-cell-group>-->
                  <!--<van-cell-group><van-field v-model="n.pNum" label="产出物料数量" label-class=""  placeholder="等待获取数量" disabled error-message="" /></van-cell-group>-->
                  <!--<van-cell-group><van-field v-model="n.iPnitName" label="产出物料单位" label-class=""  placeholder="等待获取单位" disabled error-message="" /></van-cell-group>-->
                  <!--<van-cell-group><van-field v-model="n.waste" label="不合格数量" label-class=""  placeholder="等待获取不合格数" disabled error-message="" /></van-cell-group>-->
              <!--</section>-->
          <!--</div>-->
      </div>
    </article>
  </div>
</template>

<script>
  import basicHeader from '@/components/header/basicHeader.vue'
  import api from "../../../api/api.js";
  export default {
    data () {
      return {
        listData:[],
        status:{}
      };
    },

    computed:{},
    created(){
        this.$store.commit('CHANGE_DATA',"");
        //请求数据
        const turngetPageList_data = {CurrentPage:1, PageSize:2000};
        api.turngetPageList(turngetPageList_data).then(res => {
            if (res.data) {
                console.log("数据信息↓");
                console.log(res);
                this.listData = res.data.records;
                this.filtrateFn(0);//只保留status为0——审批中的数据
                console.log(this.listData);
            } else {console.log("获取失败");}
        });
      },

      beforeCreate(){},
      beforeMount(){},
    methods: {
      filtrateFn(status){
        if(status === 0){//审批中
          let temporary_A = [];
          for(let i = 0;i<this.listData.length;i++){
            if (this.listData[i].status === status){
              temporary_A.push(this.listData[i])
            }
          }
          this.listData = temporary_A;/*有个改变数组自身的方式 不过数据部分应该不适合用*/
        }
      },


      goOnFn(num){
     //   this.$store.commit('CHANGE_INDEX',num);
        console.log(typeof num === "number");
        console.log(num);
        this.$store.commit('AUDIT_DATA',this.listData[num]);

        //tianjia  为添加申请
        //数字类型的index下标 则为点击目标（从零开始）

        //路由传输数据
     //   this.$router.push({path: '/applyTransfer', query: { index: num }});
        this.$router.push('/audit_details');
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
