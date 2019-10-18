<!-- 添加入库信息 -->
<template>
  <div class="Fu">
    <custom-back-header
      :leftArrow="true"
      @goback="goback"
      title="添加入库信息"
      rightText="保存"
      @clickEvent="inventorySave()"
    ></custom-back-header>

    <article class="inputs">
      <van-cell-group>
        <van-cell title="工单编号" size="large" is-link @click="openWorkordernum">
          <!-- <router-link :to="{path:'/workordernum',query:{num:'/addInventory'}}"> -->
          <span class="custom-text">{{ManufactureOrderCode|| '请选择工单编号'}}</span>
          <!-- </router-link> -->
        </van-cell>
      </van-cell-group>
      <van-row>
        <van-field-select-picker
          label="产品名称"
          placeholder="请选择产品名称"
          v-model="productname"
          :columns="projectSelect"
          @input="changeIdinventory"
        />
      </van-row>
      <van-cell-group>
        <van-field type="number" v-model="quantity" label="数量" placeholder="请输入数量" error-message/>
      </van-cell-group>
      <van-row>
        <van-field-select-picker
          label="单位"
          placeholder="请选择单位"
          v-model="unit"
          :columns="unitSelect"
          @input="changeIdunit"
        />
      </van-row>
    </article>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import api from "@/api/api";
import customBackHeader from "@/components/header/customBackHeader.vue";
import VanFieldSelectPicker from "@/components/VanFieldSelectPicker/VanFieldSelectPicker";

export default {
  data() {
    return {
      editindex: null, //编辑功能的key
      //显示的数据
      productname: "", //产品名称
      unit: "",
      //保存提交的数据
      ManufactureOrderCode: null, //工单编号
      idinventory: null, //
      quantity: null, //数量
      idunit: null,
      projectSelectData: [
        // {
        //   id: "1117981065354096642",
        //   productname: "复合"
        // },
        // {
        //   id: "1130318934567628802",
        //   productname: "分切"
        // },
        // {
        //   id: "1130318983070560258",
        //   productname: "制袋"
        // },
        // {
        //   id: "1128564553849430018",
        //   productname: "印刷"
        // },
        // {
        //   id: "1130318864107515905",
        //   productname: "吹膜"
        // }
      ],
      units: [
        // { id: "1", name: "公斤2" },
        // { id: "2", name: "长度2" },
        // { id: "3", name: "333" }
      ],
      workcodeId: ''
    };
  },
  watch: {

  },
  computed: {
    ...mapGetters(["showputStorages", "putStorages", "edit_inventory"]),
    unitSelect() {
      var select = [];
      this.units.forEach(element => {
        select.push(element.name);
      });
      return select;
    },
    projectSelect() {
      var select = [];
      if (this.projectSelectData.length == 0) {
        select = ["请先选择工单编号"];
      } else {
        this.projectSelectData.forEach(element => {
          select.push(element.productname);
        });
      }
      return select;
    }
  },

  created() {
    if (this.edit_inventory != null) {
      var index = this.edit_inventory;
      console.log(this.showputStorages.recordbList[index])
      this.editindex = index;
      var showputStorages = this.showputStorages.recordbList[index];
      this.ManufactureOrderCode = showputStorages.ManufactureOrderCode;
      this.workcodeId = showputStorages.workcodeId;
      this.productname = showputStorages.productname;
      this.quantity = showputStorages.quantity;
      this.unit = showputStorages.unit;
      var putStorages = this.putStorages.recordbList[index];
      console.log(putStorages.idinventory)
      console.log(putStorages.idunit)
      this.idinventory = putStorages.idinventory;
      this.idunit = putStorages.idunit;
      this.getproductname(this.workcodeId);
    }
    if (this.$route.query.workcode) {
      this.ManufactureOrderCode = this.$route.query.workcode; //获取工单编号
      this.workcodeId = this.$route.query.workcodeId;
      this.getproductname(this.workcodeId);
    }
    // console.log(this.ManufactureOrderCode)
  },
  methods: {
    openWorkordernum() {
      this.productname = "";
      this.$router.push({
          path: "/workordernum",
          query: { num: this.$route.path }
        });
    },
    changeIdinventory(newVal, index) {
      this.idinventory = this.projectSelectData[index].id;
    },
    changeIdunit(newVal, index) {
      
      this.idunit = this.units[index].id;
      console.log(this.idunit)
    },
    inventorySave(key) {
      //保存

      console.log(this.idinventory)
      console.log(this.idunit)
      var datadisplay = {
        ManufactureOrderCode: this.ManufactureOrderCode, //工单编号
        productname: this.productname, //产品名称
        quantity: this.quantity, //数量
        unit: this.unit, //单位
        workcodeId: this.workcodeId
      };
      var recordbList = {
        ManufactureOrderCode: this.ManufactureOrderCode, //工单编号
        idinventory: this.idinventory, 
        quantity: this.quantity, //数量
        idunit: this.idunit
      };
      var edit_inventory = this.edit_inventory;
      if (edit_inventory != null) {
        this.$store.commit("SET_INVENTORY", {
          datadisplay,
          recordbList,
          edit_inventory
        });
      } else {
        this.$store.commit("ADD_INVENTORY", { datadisplay, recordbList });
      }

        this.$router.push("/putStorage");

    },
    goback() {
      this.$router.push("/putStorage");
    },
    getuntils() {
      api.selectUnit({}).then(
        res => {
          this.units = res.data;
        }
      );
    },
    getproductname(id) {
      api.getManufactureOrdersListById(id).then(
        res => {
          // console.log(res.data);
          this.projectSelectData = res.data;
        }
      );
    }
  },
  mounted() {
    this.getuntils();
  },
  components: {
    customBackHeader,
    VanFieldSelectPicker
  }
};
</script>
<style  scoped>
.Fu {
  background-color: rgba(240, 237, 237, 1);
}
.button_Fu {
  margin: 0 0 0 0;
  padding: 10px;
  display: flex;
  justify-content: flex-end;
  background-color: white;
}
.button_Fu button {
}
.button_pageA {
  margin: 0 0 10px 0;
}
.van-field__control {
  text-align: right;
}
/*.inputs{border-top: solid 1px #666;}*/
</style>
