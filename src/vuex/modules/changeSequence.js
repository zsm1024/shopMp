

const state = {
  status:"",//详情页面需要附带的数据 表示是修改按键还是编辑按键...
  inputData:[],
  saveCode:false,
};
//获取数据函数
const getters = {
  // getIndex(state) {
  //   return state.index
  // },
  // getListData(state) {
  //   return state.inputData
  // }
};
//修改数据函数
const mutations = {
  //保存index
  ["CHANGE_INDEX"](state,index) {
    state.index = index
  },
  //保存data数据
  ["CHANGE_DATA"](state,data) {
    state.inputData = data;
  },
  //保存转序code选项的选中状态
  ["CHANGE_SAVECODE"](state,data) {
    state.saveCode = data;
  },

};
export default {
  state,
  getters,
  mutations
}
