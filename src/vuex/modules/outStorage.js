

const state = {
  mode:"",//表示是哪种入库方式
  code:"",//二维码扫码后得到的数值
};
//修改数据函数
const mutations = {
  //保存index
  //保存data数据
  ["OUT_mode"](state,data) {
    state.mode = data;
  },
  //
  ["OUT_code"](state,data) {
    state.code = data;
  },
};
export default {
  state,
  mutations
}
