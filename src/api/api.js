import http from '@/util/http'
export default {
    // 登录
    login: params => {
        return http.post("/login", params)
    },
    //获取工单编号
    selectOrderDropDownPageList: params => {
        return http.post("/workorder/selectOrderDropDownPageList", params)
    },
    //获取产品名称
    getManufactureOrdersListById: params => {
        return http.get("/workorder/getManufactureOrdersListById/" + params)
    },
    //获取单位
    selectUnit: params => {
        return http.post("/picking/selectUnit", params)
    },
    // 出入库
    warehousing: params => {
        return http.post("/warehousing/warehousing", params)
    },
    //转序申请
    turnorderadd: params => {
        return http.post("/turnorder/saveOrUpdate", params)
    },
    //获取日报信息
    dailygetPageList: params => {
        return http.post("/daily/getPageList", params)
    },
    //获取填报类型
    dailygetgetList: params => {
        return http.post("/dailyType/getList", params)
    },
    //获取选择填报类型数据
    getParameterByTypeId: params => {
        return http.post("/dailyType/getParameterByTypeId", params)
    },
    //提交日报
    reportsaveOrUpdate: params => {
        return http.post("/report/saveOrUpdate", params)
    },
    saveOrUpdate: params => {
        return http.post("/processProperty/saveOrUpdate", params)
    },
    //获取二维码
    getsacndata: params => {
        return http.get("/warehousing/getRecordbById/" + params)
    },
    confirmcodeinfo: params => {
        return http.get("/warehousing/outOfStock/" + params)
    },
    //获取产品工序
    productProcessgetList: params => {
        return http.post("/productProcess/getList", params)
    },
    //吸塑日报表
    blistersaveOrUpdate: params => {
        return http.post("/blister/saveOrUpdate", params)
    },
    //物料选择,根据产品名称和原工序获取产出物料的信息列表
    getByProductProcess: params => {
        return http.get("/turnorder/getByProductProcess", params)
    },





  //转序操作
  //以下为整理的wz会用到的转序页面ajax，用不到的保持原样
  //转序列表页面获取数据列表
  turngetPageList: params => {return http.post("/turnorder/getPageList", params)},
  //新增信息接口
  turnordersaveOrUpdate: params => {return http.post("/turnorder/saveOrUpdate", params)},
  //获取参与人信息
  workorderselectPerson: params => {return http.post("/workorder/selectPerson", params)},

  //根据产品名称获取原工序
  productProcess: params => {return http.post("/productProcess/getList", params)},
//根据产品名称和原工序获取产出物料的信息列表
  getByProductProcesszx: (url,params) => {return http.get(url, params)},
  //获取单位（其他地方已定义）（传空值即可）
// selectUnit: params => {return http.post("/picking/selectUnit", params)},
  //获取工序选项（其他地方已定义）（传空值即可）
//getListProcess: params => {return http.post("/working/getList", params)},

  //审批操作
    turnCheck: params => {return http.post("/turnorder/check", params)},

  //转序模块模具数据请求
  mouldGetByProductProcess: (url,params) => {return http.get(url, params)},



turnorderupdate: params => {
        return http.post("/turnorder/update", params)
    },
    turnorderdelete: params => {
        return http.get("/turnorder/del/" + params)
    },
    getPageListByTProcess: params => {
        return http.post("/turnorder/getPageListByTProcess", params)
    },

  //wz出库模块 材料出库的get请求
  getRecordbPurchasingById: (url,params) => {return http.get(url, params)},
  //wz出库模块 产品出库的get请求
  getRecordbById: (url,params) => {return http.get(url, params)},
  //wz出库模块 材料出库选择完毕后，确认的get请求
  materialOutOfStock: (url,params) => {return http.get(url, params)},
  //wz出库模块 为了避免和张勇的接口冲突 重新定义一下
  wz_confirmcodeinfo: (url,params) => {return http.get(url, params)},







    //模具管理
    mouldgetPageList: params => {
        return http.post("/mould/getPageList", params)
    },
    mouldadd: params => {
        return http.post("/mould/add", params)
    },
    mouldupdate: params => {
        return http.post("/mould/update", params)
    },
    moulddel: params => {
        return http.get("/mould/del/" + params)
    },
    mouldbatchDel: params => {
        return http.post("/mould/batchDel", params)
    },
    //模具工序属性配置
    processgetPageList: params => {
        return http.post("/product/process/mould/getPageList", params)
    },
    processgetPageListadd: params => {
        return http.post("/product/process/mould/add", params)
    },
    processgetgetPageList: params => {
        return http.post("/product/process/mould/getPageList", params)
    },
    mouldgetList: params => {
        return http.post("/mould/getList", params)
    },
    mouldgetList: params => {
        return http.post("/mould/getList", params)
    },

    selectQrCode: params => {
        return http.post("/warehousing/selectQrCode", params)
    },

    //日报
    dailyType: params => {
        return http.post("/dailyType/saveOrUpdate", params)
    },
    getDaily: params => {
        return http.post("/dailyType/getDaily", params)
    },
    GroupdailyType: params => {
        return http.post("/dailyGroup/saveOrUpdate", params)
    },
    TypeGroupdailyType: params => {
        return http.post("/dailyTypeGroup/saveOrUpdate", params)
    },
    dailyAttribute: params => {
        return http.post("/dailyAttribute/saveOrUpdate", params)
    },

    //二维码
    checkQrCode: params => {
        return http.get("/warehousing/checkQrCode/" + params)
    },

}
