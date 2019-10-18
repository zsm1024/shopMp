<!-- 首页 -->
<template>
  <section id="homes">
    <div>
      <van-tabs @click="onClick">
        <van-tab title="已采购">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <div class="proList" v-for="(item,$index) in list" :key="$index">
              <van-row type="flex" gutter="20" justify="space-around">
                <van-col span="4">
                  <img v-if="item" :src="item.fileInfoEntityList[0].filePath" class="ProImg" alt />
                </van-col>
                <van-col span="16">
                  <h6 class="decs">{{item.name}}</h6>
                  <van-col
                    class="types"
                    type="flex"
                    gutter="10"
                    justify="space-between"
                    style="width:100%"
                  >
                    <van-col span="14">
                      <p>
                        <span>价格:</span>{{item.price}}元/{{item.unit}}
                      </p>
                    </van-col>
                    <van-col span="10">
                      <span>规格：</span>{{item.specification}}
                    </van-col>
                  </van-col>
                  <van-col
                    class="types"
                    type="flex"
                    gutter="10"
                    justify="space-between"
                    style="width:100%"
                  >
                    <van-col span="14">
                      <p>
                        <span>保质期:</span>{{item.expiryDate}}
                      </p>
                    </van-col>
                    <van-col span="10">
                      <span>仓库：</span>{{item.wareHose}}
                    </van-col>
                  </van-col>
                  <van-col type="flex" gutter="10" justify="space-between" style="width:100%">
                    <van-col span="14">
                      <p>
                        <span>已加购:</span>80元/箱
                      </p>
                    </van-col>
                  </van-col>
                  <van-col
                    class="types"
                    type="flex"
                    gutter="10"
                    justify="space-between"
                    style="width:100%"
                  >
                    <van-col span="14">
                      <p>
                        <template slot-scope="scope">
                          <van-stepper v-model="scope.row.value" />
                        </template>                       
                      </p>
                    </van-col>
                    <van-col span="8">下单</van-col>
                  </van-col>
                </van-col>
              </van-row>
              <div class="checkCom">
                <span>同品牌</span>
                <span>同种类</span>
              </div>
            </div>         
          </van-list>
        </van-tab>
        <van-tab title="未采购">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <div class="proList" v-for="(item,$index) in list" :key="$index">
              <van-row type="flex" gutter="20" justify="space-around">
                <van-col span="4">
                  <img v-if="item" :src="item.fileInfoEntityList[0].filePath" class="ProImg" alt />
                </van-col>
                <van-col span="16">
                  <h6 class="decs">{{item.name}}</h6>
                  <van-col
                    class="types"
                    type="flex"
                    gutter="10"
                    justify="space-between"
                    style="width:100%"
                  >
                    <van-col span="14">
                      <p>
                        <span>价格:</span>{{item.price}}元/{{item.unit}}
                      </p>
                    </van-col>
                    <van-col span="10">
                      <span>规格：</span>{{item.specification}}
                    </van-col>
                  </van-col>
                  <van-col
                    class="types"
                    type="flex"
                    gutter="10"
                    justify="space-between"
                    style="width:100%"
                  >
                    <van-col span="14">
                      <p>
                        <span>保质期:</span>{{item.expiryDate}}
                      </p>
                    </van-col>
                    <van-col span="10">
                      <span>仓库：</span>{{item.wareHose}}
                    </van-col>
                  </van-col>
                  <van-col type="flex" gutter="10" justify="space-between" style="width:100%">
                    <van-col span="14">
                      <p>
                        <span>已加购:</span>80元/箱
                      </p>
                    </van-col>
                  </van-col>
                  <van-col
                    class="types"
                    type="flex"
                    gutter="10"
                    justify="space-between"
                    style="width:100%"
                  >
                    <!-- <van-col span="14">
                      <p>
                        <template slot-scope="scope">
                            <van-stepper v-model="scope.row.value" />
                        </template>                      
                      </p>
                    </van-col> -->
                    <van-col span="24"><van-button @click="makeMore(item)" size="mini" color="linear-gradient(to right, #4bb0ff, #6149f6)">下多单</van-button><van-button @click="makeOrder(item)" size="mini" color="linear-gradient(to right, #4bb0ff, #6149f6)">下一单</van-button></van-col>
                  </van-col>
                </van-col>
              </van-row>
              <div class="checkCom">
                <span>同品牌</span>
                <span>同种类</span>
              </div>
            </div>         
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
    <div></div>
    <van-popup v-model="show" closeable
  close-icon="close"
  position="bottom"
  :style="{ height: '20%' }"> 
  <p class="nums">数量：<van-stepper v-model="value" /><van-button style="margin-left:.2rem" type="primary" size="small" @click="addCart">添加到购物车</van-button></p>  
  </van-popup>
  </section>
</template>

<script>
import basicHeader from "@/components/header/basicHeader.vue";
import api from "../../api/goods";
export default {
  data() {
    return {
      active: 0,
      value: 1,
      list: [],
      loading: false,
      finished: false,
      length:0,
show:false,
      type:1,//1:已采购；0：未采购
ProId:0
      
    };
  },
  computed: {},

  methods: {
    onClick(name, title) {

      this.$toast(title);
      if(title=="已采购"){
         this.getDataList(1)
      }else{ this.getDataList(0)}
    },
    //获取已采购列表
    getDataList(item) {
      let para ={
        type:item
      }
      api.goodsList(para).then(res =>{
        if(!res.error){
          this.list=res.data;
          this.length=res.data.length
        }
        
        console.log(res)
      })
    },
      onLoad() {
      // 异步更新数据
      setTimeout(() => {
        // console.log(this.list.length)
        //  if(this.list.length<=3){
        //    this.finished = true;
        //  }else{

        //  }
        // for (let i = 0; i < 10; i++) {
        //   this.list.push(this.list.length + 1);
        // }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= this.length) {
          this.finished = true;
        }
      }, 500);
    },
    // login() {
    //   this.$notify("提示文案");
    //   var ruleForm = {
    //     username: "admin",
    //     password: "123456"
    //   };
    //   api.login(ruleForm).then(
    //     res => {
    //       console.log(res.data);
    //     },
    //     err => {
    //       this.loading = false;
    //       this.$message.error(err.msg);
    //     }
    //   );
    // },  
    makeMore(item){
      this.show = true;
      this.value=1
      this.ProId=item.id
    },
    makeOrder(item){
      api.goodsadd(item.id,1).then(res =>{
  if(!res.data.error){
          this.$notify({
           message:'添加成功',
           type:"success"
           })
          this.show = false;
        }else{
          this.$notify({
           message:res.data.msg,
           type:"danger"
           })
        }
      })

    },
    addCart(){
      api.goodsadd(this.ProId,this.value).then(res =>{
        if(!res.data.error){
          this.$notify({
           message:'添加成功',
           type:"success"
           })
          this.show = false;
        }else{
          this.$notify({
           message:res.data.msg,
           type:"danger"
           })
        }
})
    }
  },
  mounted() {
    this.getDataList(1)
  },
  components: {}
    // basicHeader,
    // Grid
};
</script>
<style  lang="less"  scoped>
#homes {
  height: 100%;
  overflow: auto;
  .proList {
    background: #fff;
    margin: 0.1rem 0;
    padding: 0.05rem 0;
  }
  .decs {
    color: #24bfb1 !important;
  }
  .checkCom {
    display: flex;
    justify-content: space-around;
    text-align: center;
    span {
      color: #e51c23;
    }
  }
}
.ProImg {
  display: inline-block;
  width: 0.95rem;
  height: 0.95rem;
}
.types {
  margin: 0.1rem;
}
.nums{display: flex;align-items: center;margin:.5rem .1rem 0}
</style>