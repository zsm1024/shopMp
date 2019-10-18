//store.js
import Vue from 'vue'
import Vuex from 'vuex'

// 头部分类

import state from './state'
import actions from './actions'
import mutations from './mutations'

import detail from './modules/detail'
import category from './modules/category'
import login from './modules/login'
import putstorage from './modules/putstorage'
import fillDaily from './modules/fillDaily'
import changeSequence from './modules/changeSequence.js' /*转库模块数据*/
import audit from './modules/audit.js' /*审批模块数据*/
import outStorage from './modules/outStorage.js' /*出库模块数据*/
Vue.use(Vuex);

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules: {
    detail,
    category,
    login,
    putstorage,
    changeSequence,
    audit,
    fillDaily,
    outStorage,
  }
})
