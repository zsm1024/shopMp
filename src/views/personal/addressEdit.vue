<template>
  <section>
      <van-address-edit
  :area-list="areaList"
  show-postal
  :show-delete="false"
  :show-set-default="false"
  show-search-result
  @save="onSave"
/>
  </section>
</template>

<script>
import areaList from"../../assets/area"
export default {
  data() {
    return {
      areaList,
      searchResult: []
    }
  },

  methods: {
    onSave(content) {
      // Toast('save');
      console.log(content)
      this.$router.push({"path":"/cart"})
    },
    onDelete() {
      Toast('delete');
    },
    onChangeDetail(val) {
    //   if (val) {
    //   } else {
    //     this.searchResult = [];
    //   }
    }
  }
}
</script>

<style>

</style>