import http from '@/util/http'
export default {
    //获取店铺信息   
    storiesLists: params => {
        return http.get("/store/page/list", params)
    },
    //店铺信息删除
    storiesdelete: params => {
        return http.get("/store/delete/" + params)
    },
    //新增门店
    save: params => {
        return http.post("/store/save",params)
    },
    resetPassword: ids => {
        return http.post("/sys/user/reset/password",ids)
    },
        //新增店长
        saveShopowner: params => {
            return http.post("/sys/user/saveShopowner",params)
                // .post("/sys/role/save", params)
        },
//获取店长
checkShopowners: params => {
    return http.get("/sys/user/checkShopowners",params)
},
deleteShopowner: params => {
    return http.get("/sys/user/deleteShopowner/" + params)
},
    goodsList: params => {
        return http.get("/goods/list", params)
    },
    //添加购物车
    goodsadd: (params, amount) => {
        return http.get("/shoppingCart/add/" + params + "/" + amount)
    },
    //获取购物车数据
    selectShoppingCart: params => {
        return http.get("/shoppingCart/selectShoppingCart", params)
    },
    //修改购物车数量
    updateDetailCount: (params, amount) => {
        return http.get("/shoppingCart/updateDetailCount/" + params + "/" + amount)
    },
    //删除购物车

    deleteDetail: (params) => {
        return http.get("/shoppingCart/deleteDetail/" + params)
    },
    //查询门店
    chooseStore: params => {
        return http.get("/order/chooseStore", params)
    },
    //计算快递费用
    expressFee: (province, weight) => {
        return http.get("/order/expressFee/" + province + "/" + weight)
    },
    //订单确认提交
    submitOrder: params => {
        return http.post("/order/submitOrder", params)
    },
    //店长查看自己门店的订单
    checkOrderList: params => {
        return http.get("/order/checkOrderList", params)
    },
    //查看消费明细
    checkBillList: params => {
        return http.get("/bill/checkBillList", params)
    },
    //查看充值记录
    checkBillList: params => {
        return http.get("/bill/checkBillList", params)
    },
    //查看充值记录
    checkRecord: params => {
        return http.get("/preDepositRecord/checkRecord", params)
    },
    //充值
    deposit: params => {
        return http.get("/preDeposit/deposit/" + params)
    },

}