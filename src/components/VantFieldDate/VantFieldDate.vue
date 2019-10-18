<!--TODO: 组件不能正常显示日期  -->

<template>
  <div class="van-hairline--bottom">
    <van-field
          v-bind="$attrs"
          v-model="dateValue"
          readonly
          is-link
          @click="show = !show"
        />
      <van-popup v-model="show" position="bottom">
        <van-datetime-picker 
        v-model="dateValue"
        type="date"
        show-toolbar
        :title="$attrs.label"
        @confirm = "changetime"
        @cancel ="show = !show"
        :formatter="formatter"
        />
      </van-popup>
  </div>
</template>

<script>
  var padDate = (value) => {
    return value < 10 ? '0'+value : value;
  }
import { forEach } from 'async';
export default {
  name: 'VantFieldDate',
  model: {
    prop: "dateValue"
  },
  data () {
    return {
      value: '2019-05-23',
      time: {
        currentDate: new Date(),
      },
      result: this.dateValue,
      show: false,
      dateValue: [Number, Date]
    };
  },
  computed: {},
  watch:{
    dateValue: function(newVal) {
      // console.log(newVal)
      this.dateValue = newVal;
    },
    result(newVal) {
      console.log(newVal)
    }
  },
  methods: {
    formatter:function(type, value) {
        if (type === 'year') {
          return value +"年";
        } else if (type === 'month') {
          return value +"月"
        }else if (type === 'day') {
          return value + "日"
        }
        return value;
    },
    changetime(value){
      var year = value.getFullYear();
      var month = padDate(value.getMonth()+ 1) ;
      var strDate = padDate(value.getDate());
      var time =  year + "-" + month + "-" + strDate;
      console.log(time)
      this.show = !this.show;
      this.$emit("input", time);
    },
  },
  components: {}

}

</script>
<style  scoped>
</style>