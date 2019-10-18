

const state = {
  userInfo: {
    // id: '1',
    // name: 'zhang',
    // avatar: 'https://wx.qlogo.cn/mmopen/vi_32/WgSOjJRaQq8FbBHGAr5gLHdaVia7SrnOwRZ9TL8lcDicXuMgqSR8rVgebFa9uIRiaLzYrPdtIia3jqjzkHVVOS38sw/132'
  },  //用户信息
  scanData: null,
  // {
  //   "amount": "5",
  //   "custormName": "客户名字",
  //   "id": "145",
  //   "idinventory": "2",  //产品id
  //   "idunit": "1",  //单位id
  //   "inventoryName": "产品名称",  //产品名称
  //   "price": "1",
  //   "quantity": "5",  //数量
  //   "receiveVoucherCode": "MC-2019-05-0002",  //入库单号
  //   "unitName": "公斤",  //单位
  // },  //二维码信息
  workcode: null, //添加入库工单编号
  projectInfo: {}, //生产编号对应的信息
  fetchLoading: false,     //全局加载状态的Loading

}

export default state
