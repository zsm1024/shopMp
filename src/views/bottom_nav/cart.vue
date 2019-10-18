<template>
  <section class="EditList">
    <custom-back-header :leftArrow="true" @goback="goback" title="购物车"></custom-back-header>
    <div class="headerTitle">
      <div class="headermain">
        <p class="headCat">
          <label>
            <span>【货物总价】：</span>
            <span>{{cartList.totalPrice}}元</span>
          </label>
          <label>
            <span>【货物总重】：</span>
            <span>{{totalWeight}}kg</span>
          </label>
        </p>
        <p class="headCat">
          <label>
            <span>【类型总数】：</span>
            <span>{{cartList.categoryCount}}</span>
          </label>
          <label>
            <span>【数量总量】：</span>
            <span>{{cartList.goodsCount}}</span>
          </label>
        </p>
      </div>
    </div>

    <div class="EditLists">
      <!-- <p>
       
      </p>-->
      <div v-for="(items,$index) in cartList.cartDetailList" :key="$index">
        <p style="border-bottom:1px solid #f0f0f0">
          <van-icon name="wap-home" style="color:#000" />
          {{items.wareHose}}
        </p>
        <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
          <!-- <label> -->
          <Checkbox :label="items.id" style="margin-left:.2rem">单号：{{items.id}}</Checkbox>
          <div
            style="display:flex;justify-content: space-around;align-items:center;padding-bottom:.2rem"
          >
            <div>
              <img style="width:1rem" :src="items.fileList[0].filePath" />
            </div>
            <div style="margin-left:.2rem">
              <p>{{items.goodsName}}</p>
              <p>
                单价：
                <span>{{items.price}}</span>
              </p>
              <p>
                总价：
                <span>{{items.price*items.amount}}元</span>
              </p>
              <div style="display:flex;;justify-content: space-around;align-items:center">
                <van-stepper
                  v-model="items.amount"
                  integer
                  class="step"
                  @change="changeval(items,items.amount)"
                />
                <span style="color:red;margin-left:.2rem">
                  <van-icon name="delete" @click="deleteCart(items.id)" />删除
                </span>
              </div>
            </div>
          </div>

          <!-- <van-card
              :price="(items.price*items.amount)+'元'"
              :title="items.goodsName"
              :thumb="items.fileList[0].filePath"
            >
              <div slot="tags">
              </div>
              <div slot="footer" class="cardFooter">
                <span>
                  <van-icon name="delete" />删除
                </span>
                <van-stepper v-model="items.amount" integer class="step" />
              </div>
          </van-card>-->
          <!-- <van-checkbox :name="items.id"></van-checkbox> -->
          <!-- </label> -->
        </CheckboxGroup>
      </div>
    </div>
    <div class="subChageList">
      <van-submit-bar
        :price="cartList.totalPrice*100"
        label="合计(不含税)："
        button-text="下单结算"
        :disabled="disabled"
        @submit="onSubmit"
      >
        <Checkbox
          :indeterminate="indeterminate"
          :value="checkAll"
          @click.prevent.native="handleCheckAll"
        >全选</Checkbox>
      </van-submit-bar>
      <van-action-sheet v-model="show" title="确认订单" @close="closeDia">
        <div class="carts">
          <div class="cartInfo">
            <p>
              <span>
                [货物总价]:
                <span>{{cartList.totalPrice}}</span>
              </span>
            </p>
            <p>
              <span>
                [总&nbsp;&nbsp;重&nbsp;&nbsp;量]:{{totalWeight}}Kg
                <span></span>
              </span>
            </p>
            <p>
              <span>
                [类型总数]:
                <span>{{cartList.categoryCount}}</span>
              </span>
            </p>
            <p>
              <span>
                [货物总数]:
                <span>{{cartList.goodsCount}}</span>
              </span>
            </p>
          </div>
          <div>
            <div>
              <p>
                [选择门店]:
                <Select
                  v-model="StroyName"
                  style="width:200px;margin-left:0.1rem"
                  @on-change="storeChange"
                >
                  <Option
                    v-for="(item,index) in storeList"
                    :value="item.id+'-'+index"
                    :key="index"
                  >{{ item.name }}</Option>
                </Select>
              </p>
            </div>

            <h4>收获信息：</h4>
            <div>
              <span>
                <van-icon name="location-o" />
              </span>
              {{address}}
            </div>
            <!-- <van-address-list
              v-model="chosenAddressId"
              :list="list"
              @add="submits"
              add-button-text="确认提交"
            />-->
          </div>
          <div>
            <h4>订单备注</h4>
            <van-field
              style="border:1px solid #f0f0f0;width:90%;margin:0 auto"
              v-model="orderRemarks"
              type="textarea"
              placeholder="请输入备注"
              rows="1"
              autosize
            />
          </div>
          <div>
            <div style="display:flex;align-items:center">
              <h4>物流信息:</h4>
              <Select
                class="selectInfo"
                v-model="postType"
                style="width:200px"
                @on-change="typeChange"
              >
                <Option value="自提" key="1">自提</Option>
                <Option value="专线" key="2">专线</Option>
                <Option value="快递" key="3">快递</Option>
              </Select>
            </div>
            <p v-if="isshow" class="moveMon">预计运费：{{expressFee}}元</p>
          </div>
        </div>
        <van-button type="primary" size="large" @click="submits">确认提交</van-button>
      </van-action-sheet>
    </div>
  </section>
</template>
<script>
import { ActionSheet, Dialog } from "vant";
import customBackHeader from "@/components/header/customBackHeader.vue";
import api from "../../api/goods";
export default {
  inject: ["reload"],
  components: {
    customBackHeader
  },
  data() {
    return {
      indeterminate: true,
      checkAll: true,
      checkAllGroup: [],
      disabled: true,
      show: false,
      isshow: false,
      value: "",
      shoppingCartId: "",
      checked: "ture",
      StroyName: "",
      storeList: [],
      province: "",
      expressFee: 0,
      totalWeight: 0,
      // items: "下单结算",
      // num: "5)",
      chosenAddressId: "1",
      orderRemarks: "",
      postType: "",
      postName: "",
      PostNameList: [],
      address: "",
      cartList: {
        totalPrice: 0
      },
      cartIds: [],
      allData: []
      // list: [
      //   {
      //     id: "1",
      //     name: "张三",
      //     tel: "13000000000",
      //     address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室"
      //   }
      // ]
    };
  },
  methods: {
    //获取购物车信息
    getCartData() {
      this.cartIds = [];
      this.totalWeight = 0;
      api.selectShoppingCart({}).then(res => {
        this.cartList = res.data;
        this.shoppingCartId = res.data.id;
        if (this.cartList.cartDetailList.length > 0) {
          this.cartList.cartDetailList.forEach(el => {
            this.cartIds.push(el.id);
            this.totalWeight += el.amount * el.weight;
          });
          console.log(this.cartList);
          // this.totalWeight=(parseFloat( this.cartList.cartDetailList.amount)*parseFloat(this.cartList.cartDetailList.weight) )
          this.disabled = false;
        }
      });
    },
    checkAllGroupChange(data) {
      // this.checkAllGroup.forEach(el => {
      //   this.cartList.totalPrice+=(el.amount*el.price)
      //   console.log(el.amount)
      // });
      console.log(this.checkAllGroup);
      if (data.length === this.cartIds.length) {
        this.indeterminate = false;
        this.checkAll = true;
      } else if (data.length > 0) {
        this.indeterminate = true;
        this.checkAll = false;
      } else {
        this.indeterminate = false;
        this.checkAll = false;
      }
    },
    changeval(item, amount) {
      api.updateDetailCount(item.id, amount).then(res => {
        if (!res.data.error) {
          this.getCartData();
        }
      });
    },
    handleCheckAll() {
      if (this.indeterminate) {
        this.checkAll = true;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;
      if (this.checkAll) {
        this.checkAllGroup = this.cartIds;
        console.log(this.checkAllGroup);
      } else {
        this.checkAllGroup = [];
      }
    },
    goback() {
      this.$router.push("/mine");
    },
    onSubmit() {
      console.log();
      if (this.checkAllGroup.length > 0) {
        this.show = true;
      } else {
        Dialog.alert({
          message: "请至少选择一个商品"
        }).then(() => {
          // on close
        });
        // Toast.fail("请至少选择一个商品")
      }
    },
    // onEdit(item, index) {
    //   this.$router.push("/addressEdit");
    //   // Toast('编辑地址:' + index);
    // },
    //删除购物车
    deleteCart(item) {
      console.log("123");
      let para = item;
      api.deleteDetail(item).then(res => {
        if (!res.data.error) {
          this.$notify({
            message: "删除成功",
            type: "success"
          });
          this.getCartData();
        }
      });
    },
    //获取门店
    getStore() {
      api.chooseStore({}).then(res => {
        if (!res.error) {
          this.storeList = res.data;
        }
      });
    },
    storeChange(val) {
      let index = val.split("-").pop();
      this.address = "";
      this.province = "";
      this.address =
        this.storeList[index].shopownerName +
        "-" +
        this.storeList[index].phoneNum +
        ";" +
        this.storeList[index].address;
      this.province = this.storeList[index].province;
    },
    //物流change
    typeChange(val) {
      if (val == "快递") {
        this.isshow = true;
        this.expressFee = 0;
        // this.province
        api.expressFee("河北省", "12").then(res => {
          if (!res.error) {
            this.expressFee = res.data.expressFee;
          }
        });
      } else {
        this.isshow = false;
        this.expressFee = 0;
      }
      // this.PostNameList.push({ name: "快递1" }, { name: "快递2" });
    },
    closeDia() {
      console.log("1123");
    },
    submits() {
      let para = {
        totalPrice: this.cartList.totalPrice,
        totalWeight: this.totalWeight,
        categoryAmount: this.cartList.categoryCount,
        storeId: this.StroyName.split("-").shift(),
        orderRemark: this.orderRemarks,
        transport: this.postType,
        transportFee: this.expressFee,
        shoppingCartId: this.shoppingCartId,
        detailIds: this.checkAllGroup
      };
      console.log(para);
      api.submitOrder(para).then(res => {
        if (!res.data.error) {
          this.$notify({
            message: "下单成功",
            type: "success"
          });
          this.reload();
        }
      });
    }
  },

  mounted() {
    this.getCartData();
    this.getStore();
    this.items += this.num;
  }
};
</script>
<style lang="less" scoped>
.headerTitle {
  background: #fff;
  padding: 0.1rem 0;
  .headermain {
    border: 1px solid #999;
    border-radius: 4px;
    width: 95%;
    margin: 0 auto;
    padding: 0.1rem 0;
  }
}
.EditLists {
  background: #fff;
  margin-top: 0.1rem;
  .van-icon-wap-home {
    margin-right: 0.1rem;
    font-size: 0.2rem;
  }
  .van-checkbox {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .van-checkbox__icon {
      margin-left: 0.2rem !important;
    }
  }
  .van-card {
    background: #fff !important;
    border-bottom: 1px solid #f0f0f0;
    padding: 0.1rem 0;
  }
  .van-card__title {
    color: #4ea449;
  }
  .van-card__thumb {
    height: 55px !important;
    width: 55px !important;
  }
  .van-card__content {
    min-height: unset !important;
  }
  .cardFooter {
    display: flex;
    text-align: right;
    justify-content: flex-end;
    align-items: center;
  }
  .cardFooter > span {
    margin: 0 0.2rem;
    color: #5a68b9;
  }
}
.EditLists > p {
  border-bottom: 1px solid #f0f0f0;
  padding: 0.1rem;
  display: flex;
}
.subChageList {
  .carts {
    width: 96%;
    margin: 0 auto;
    margin-bottom: 50px;
  }
  .van-address-list {
    padding-bottom: unset;
  }
  .van-field__control {
    border: 1px solid #f0f0f0 !important;
  }
  .selectInfo {
    width: 45%;
    height: 0.2rem;
    border: 1px solid #f0f0f0;
    border-radius: 4px;
    margin: 0.1rem 0;
  }
  .moveMon {
    color: #000;
    font-weight: blod;
    padding: 0.1rem;
  }
}
.van-submit-bar {
  bottom: 0.5rem;
}
.headCat {
  display: flex;
  justify-content: space-around;
  label {
    display: inline-block;
    width: 50%;
  }
}
</style>