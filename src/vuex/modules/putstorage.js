import Util from '../../api/api'
import * as types from '../types'
const state = {
    edit_inventory: null,  //编辑索引
    putStorages: {  //提交给后台入库信息
        amount: 0,
        recordbList: [
          // {
          //   ManufactureOrderCode: "MO-2019-04-0001",  //产品编号
          //   quantity: "234",  //数量
          //   idinventory: "1", //产品名称id
          //   idunit: "1" //单位id
          // },
          // {
          //   ManufactureOrderCode: "MO-2019-04-0001",  //工单编号
          //   workcodeId: "2",
          //   productname: '产品名称',  //产品名称
          //   quantity: 2,  //数量
          //   unit: '元',  //单位
          // }
        ]
      },
      showputStorages: { //显示入库信息
        amount: 0,
        recordbList: [
          // {
          //   ManufactureOrderCode: "MO-2019-04-0001",  //工单编号
          //   workcodeId: "2",
          //   productname: '产品名称',  //产品名称
          //   quantity: 1,  //数量
          //   unit: '元',  //单位
          // },
          // {
          //   ManufactureOrderCode: "MO-2019-04-0001",  //工单编号
          //   workcodeId: "2",
          //   productname: '产品名称',  //产品名称
          //   quantity: 2,  //数量
          //   unit: '元',  //单位
          // }
        ]
      }
}
const getters = {
    putStorages(state) {
      return state.putStorages
    },
    showputStorages(state) {
      return state.showputStorages
    },
    edit_inventory(state) {
        return state.edit_inventory
    }
}

const mutations = {
    [types.EDIT_INVENTORY_INDEX](state, index) {
        state.edit_inventory = index
    },
    [types.ADD_INVENTORY](state, data) {
        state.showputStorages.recordbList.push(data.datadisplay)
        state.putStorages.recordbList.push(data.recordbList)
        setamount() 
    },
    [types.SET_INVENTORY](state, data) {
        // console.log(data)
        var index = data.edit_inventory //编辑索引
        state.showputStorages.recordbList[index] = data.datadisplay
        state.putStorages.recordbList[index] = data.recordbList
        setamount() 
    },
    [types.CLEAR_INVENTORY](state, data) {
      state.edit_inventory = null
      state.putStorages = {
        amount: 0,
        recordbList: []
      }
      state.showputStorages = {
        amount: 0,
        recordbList: []
      }
    },
    
}

function setamount() {
  var sum = 0
  state.showputStorages.recordbList.forEach(item => {
    sum += parseInt(item.quantity)
  })
  state.showputStorages.amount = sum
  state.putStorages.amount = sum
}
export default {
    state,
    getters,
    mutations,
}
