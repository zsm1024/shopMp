import * as types from './types'

const mutations = {

    [types.SET_SCAN_DATA] (state,data) {
      state.scanData = data
      // console.log(data)
    },
    [types.CLEAR_SCANDATA] (state) {
      state.scanData = null
    },
    [types.SET_WORK_CODE] (state, data) {
      state.workcode = data
    },
    // [types.ADD_INVENTORY] (state, data) {
    //   console.log(data)
    //   state.showputStorages.recordbList.push(data.datadisplay)
    //   state.putStorages.recordbList.push(data.recordbList)
    // },
    [types.GET_PROJECT_INFO] (state, data) {
      state.projectInfo = data
    }
  }

export default mutations
