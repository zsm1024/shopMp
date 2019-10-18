// import Util from '../../util/common'
import * as types from '../types'
const state = {
  token:0,
  userInfo: {}
}
const getters = {
  userInfo(state) {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    // console.log(userInfo)
    if(userInfo == null) {
      userInfo = {}
    }
    return userInfo
  }
}
const mutations = {
  [types.SET_USERINFO] (state, data) {
    state.userInfo = data
    // console.log(data)
  },
  [types.CHANGE_TOKEN] (state,res) {
    state.token = res
  }
}


export default {
  state,
  mutations,
  getters
}
