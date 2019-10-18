<template>
  <div class="van-hairline--bottom">
    <van-field
      v-model="result"
      v-bind="$attrs"
      readonly
      is-link
      @click="show = !show"
    />
    <van-popup  v-model="show" position="bottom">
      <van-picker
        :columns="columns"
        show-toolbar
        :title="$attrs.label"
        @cancel="show = !show"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import { forEach } from 'async';
export default {
  model: {
    prop: "selectValue"
  },
  props: {
    columns: {
      type: Array
    },
    selectValue: {
      type: String
    }
  },
  data() {
    return {
      show: false,
      result: this.selectValue,
      index: Number
    };
  },
  methods: {
    onConfirm(value, index) {
      this.result = value;
      this.show = !this.show;
      this.index = index
    }
  },
  watch: {
    selectValue: function(newVal) {
      // console.log(newVal)
      this.result = newVal;
    },
    result(newVal) {
      this.$emit("input", newVal, this.index);
    }
  }
};
</script>

<style lang="less" scoped>
.van-field__control {
  text-align: right !important;
}
</style>