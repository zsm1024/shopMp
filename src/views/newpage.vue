<!--  -->
<template>
  <div>
            <mt-button
    type="primary"
    @click="openScan">
    扫码
  </mt-button>
              <mt-button
    type="primary"
    @click="getsanData">
    查看二维码数据
  </mt-button>
  <div>二维码数据：{{scanData}}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
    };
  },
  computed: {
      ...mapState(['scanData'])
  },
  methods: {
      getsanData() {
          console.log(this.scanData)
      },
      openScan() {
      this.$router.push({ path: "/barcode_scan"});
    }
  },
  components: {}

}

</script>
<style  scoped>
</style>