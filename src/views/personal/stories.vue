
    <template>
  <section class="workers">
    <custom-back-header :leftArrow="true" @goback="goback" title="门店管理"></custom-back-header>
    <div class="workerTable">
      <van-button color="#7232dd" @click="showAdd" size="small" style="margin:0.1rem">新增门店</van-button>
       <el-table :data="data">
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="shopownerName" label="店长"></el-table-column>
        <el-table-column prop="addressee" label="收件人"></el-table-column>
        <el-table-column prop="phoneNum" label="电话"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
         <el-table-column prop="province" label="地址"></el-table-column>
         <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <van-button @click.native.prevent="deletes(scope.row)" type="danger" size="mini">移除</van-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <van-row type="flex">
        <van-col span="6">名称</van-col>
        <van-col span="6">店长</van-col>
        <van-col span="6">收件人</van-col>
        <van-col span="6">电话</van-col>
        <van-col span="6">地址</van-col>
        <van-col span="6">省份</van-col>
        <van-col span="6">操作</van-col>
      </van-row>-->
    </div>
     <!--<div class="tableDetial">
      <van-row type="flex" v-for="(item,index) in data" :key="index">
        <van-col span="6">{{item.name}}</van-col>
        <van-col span="6">{{item.shopownerName}}</van-col>
        <van-col span="6">{{item.addressee}}</van-col>
        <van-col span="6">{{item.phoneNum}}</van-col>
        <van-col span="6">{{item.address}}</van-col>
        <van-col span="6">{{item.province}}</van-col>
        <van-col span="6">
          <span @click="deletes(item)" style="color:red">删除</span>
        </van-col>
      </van-row>
    </div> -->
    <van-popup v-model="show" style="width:80%;top:30%">
      <van-cell-group>
        <van-field
          required
          clearable
          v-model="addForm.name"
          label="名称"
          placeholder="名称"
          autosize
        />
        <van-field
          required
          clearable
          v-model="addForm.shopowner"
          label="店长"
          placeholder="店长名称"
         
          @click="chooseName"
        />
        
        <!-- <van-dropdown-menu>
            <van-dropdown-item v-model="value1" :options="option1" />
        </van-dropdown-menu> -->
        <van-field
          required
          clearable
          v-model="addForm.addressee"
          label="收件人"
          placeholder="收件人"
          />
        <van-field required clearable v-model="addForm.province" label="省份" placeholder="省份" />
        <van-field
          required
          clearable
          v-model="addForm.phone"
          label="手机号"
          placeholder="请输入手机号"
        />
        <van-field
          required
          clearable
          v-model="addForm.address"
          label="地址"
          placeholder="收货地址"
          autosize
        />
        <van-field
          v-model="remark"
          label="备注"
          type="textarea"
          placeholder="备注"
          rows="1"
          autosize
        />
      </van-cell-group>
      <p style="text-align:center;padding:.1rem 0">
        <van-button color="#7232dd" @click="showPopup(addForm)" size="small">确认</van-button>
        <van-button color="grey" @click="cancle" size="small">取消</van-button>
      </p>
    </van-popup>
    <van-dialog
  v-model="shows"
  title="店长查询"
  show-cancel-button
  @confirm="confirms"
>
  <van-radio-group v-model="radio" @change="groupChange" style="padding:.1rem"> 
  <van-radio v-for="(item,index) in options" :key="index" :name="item">{{item.account}}</van-radio>
</van-radio-group>
</van-dialog>
  </section>
</template>

    <script>
import api from "../../api/goods";
import customBackHeader from "@/components/header/customBackHeader.vue";
export default {
  components: {
    customBackHeader
  },
  data() {
    return {
      data: [],
      value1: 0,
       radio: '1',
      show: false,
      shows:false,
      options:[],
      NameId:"",
    //   option1: [
    //     { text: '全部商品', value: 0 },
    //     { text: '新款商品', value: 1 },
    //     { text: '活动商品', value: 2 }
    //   ],
      addForm: {
        name: "",
        shopowner: "",
        addressee: "",
        phone: "",
        address: "",
        province: "",
       
      },
       remark: ""
    };
  },
  methods: {
      groupChange(val){
          this.NameId=val.id
        this.addForm.shopowner=val.name
      },
      chooseName(){
          this.shows=true
      },
    getdata() {
      let req = {
        currentPage: 1,
        pageSize: 1000
      };
      api.storiesLists(req).then(
        res => {
          this.loading = false;
          if (!res.error) {
            this.data = res.data.records ? res.data.records : [];
          } else {
            this.$message.error(res.msg);
          }
        },
        err => {
          this.loading = false;
          this.$message.error(err.msg);
        }
      );
    },

    goback() {
      this.$router.push("/mine");
    },
    deletes(item) {
      let id = item.id;
      api.storiesdelete(id).then(res => {
        if (!res.error) {
          this.$notify({
            message: "删除成功",
            type: "success"
          });
          this.getdata();
        }
      });
    },
    showAdd() {
      this.show = true;
    },
    showPopup(item) {
      let para = item;
      para.shopowner=this.NameId
      api.save(para).then(res => {
        if (!res.error) {
          this.$notify({
            message: "添加成功",
            type: "success"
          });
          this.getdata();
          this.show = false;
          this.addForm = {};
        }else{
            console.log(res)
        }
      });
    },
    cancle() {
        this.NameId=""
      this.show = false;
      this.addForm = {};
    },
     confirms(){
    //  this.radio
  },
  },
 
  mounted() {
    this.getdata();
    this.checkShopownerList()
  }
};
</script>
    <style lang="less" scope>
.workers {
  .workerTable {
    background: #fff;
    margin-top: 0.05rem;
    .van-col--6 {
      text-align: center;
      min-height: 0.3rem;
    //   line-height: 0.4rem;
      font-weight: bold;
      border-bottom: 1px solid #f0f0f0;
    }
  }
  .tableDetial {
    background: #fff;
    .van-col--6 {
      text-align: center;
      min-height: 0.3rem;
    //   line-height: 0.4rem;
      border-bottom: 1px solid #f0f0f0;
      span {
        color: #1d4dd3;
      }
    }
  }
}
</style>