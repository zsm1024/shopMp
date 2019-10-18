import api from "@/api/api";
import * as types from '../types'
import router from "@/router/index"
import {
    Toast
} from 'vant';
// import { threadId } from "worker_threads";
const state = {
    editDailyIndex: null,
    dailyDatas: [], //填报数据
    parameterTypes: [{
            "createTime": "2019-05-17 10:27:37",
            "createby": "1",
            "currentPage": "0",
            "id": "1129211842817388545",
            "isTable": 1,
            "isavailable": 1,
            "isdel": 0,
            "name": "产出",
            "ordernum": 2,
            "pageSize": "10",
            "pagewidth": 1,
            "propertysname": "产出",
            "propertystype": 1,
            "remark": "",
            "titleList": "",
            "type": "",
            "updateBy": "",
            "updateTime": "",
            "valList": "",
            "attribute": [{
                    "createTime": "2019-05-17 10:59:23",
                    "createby": "1",
                    "currentPage": "0",
                    "id": "1129219836984651778",
                    "isavailable": 1,
                    "isdel": 0,
                    "isreadonly": 0,
                    "name": "",
                    "ordernum": 1,
                    "pageSize": "10",
                    "propertyname": "重量",
                    "propertysid": "1129211842817388545",
                    "propertytype": 1,
                    "remark": "",
                    "type": "",
                    "unit": "1",
                    "unitName": "公斤",
                    "updateBy": "",
                    "updateTime": "",
                    "value": "",
                    "valueId": ""
                },
                {
                    "createTime": "2019-05-17 10:59:36",
                    "createby": "1",
                    "currentPage": "0",
                    "id": "1129219892185886722",
                    "isavailable": 1,
                    "isdel": 0,
                    "isreadonly": 0,
                    "name": "",
                    "ordernum": 2,
                    "pageSize": "10",
                    "propertyname": "底膜编号",
                    "propertysid": "1129211842817388545",
                    "propertytype": 1,
                    "remark": "",
                    "type": "",
                    "unit": "1",
                    "unitName": "公斤",
                    "updateBy": "",
                    "updateTime": "",
                    "value": "",
                    "valueId": ""
                }
            ],
        },
        {
            "createTime": "2019-05-17 10:27:57",
            "createby": "1",
            "currentPage": "0",
            "id": "1129211927487803393",
            "isTable": 1,
            "isavailable": 1,
            "isdel": 0,
            "name": "工时记录",
            "ordernum": 3,
            "pageSize": "10",
            "pagewidth": 1,
            "propertysname": "工时记录",
            "propertystype": 1,
            "remark": "",
            "titleList": "",
            "type": "",
            "updateBy": "",
            "updateTime": "",
            "valList": "",
            "attribute": [{
                    "createTime": "2019-05-17 10:59:49",
                    "createby": "1",
                    "currentPage": "0",
                    "id": "1129219947282264065",
                    "isavailable": 1,
                    "isdel": 0,
                    "isreadonly": 0,
                    "name": "",
                    "ordernum": 1,
                    "pageSize": "10",
                    "propertyname": "日工",
                    "propertysid": "1129211927487803393",
                    "propertytype": 1,
                    "remark": "",
                    "type": "",
                    "unit": "1",
                    "unitName": "公斤",
                    "updateBy": "",
                    "updateTime": "",
                    "value": "",
                    "valueId": ""
                },
                {
                    "createTime": "2019-05-17 10:59:58",
                    "createby": "1",
                    "currentPage": "0",
                    "id": "1129219982141124609",
                    "isavailable": 1,
                    "isdel": 0,
                    "isreadonly": 0,
                    "name": "",
                    "ordernum": 2,
                    "pageSize": "10",
                    "propertyname": "时间",
                    "propertysid": "1129211927487803393",
                    "propertytype": 1,
                    "remark": "",
                    "type": "",
                    "unit": "1",
                    "unitName": "公斤",
                    "updateBy": "",
                    "updateTime": "",
                    "value": "",
                    "valueId": ""
                }
            ],

        }
    ], //填报类型
    cacheFilldailydata: null, //缓存填报数据
    displayInfomations: {}, //显示的填报数据
    submitDaily: {
        "processId": "1128564553849430018",
        "workCode": "MO-2019-06-0006",
        "saleOrder": "SO-2019-06-0005",
        "custormId": "3",
        "customername": "测试B",
        "productId": "1",
        "productSpecifications": "",
        "productStructure": "", //产品结构
        "materialSpecifications": "", //材料规格
        "team": "1",
        "dateOfManufacture": "2019-06-12",
        "machineNumber": "", //机台号只能是数字
        "workshopTemperature": "车间温度",
        "workshopHumidity": "车间湿度",
        "vashiftLeaderlue": "",
        "glueType": "", //胶水型号
        "supplier": "", //供应厂家
        "firstDeputy": "第一副手：",
        "secondDeputy": "第二副手：",
        "onDutyInspection": "当班质检：",
        "successionMonitor": "接班机长：",
        "workshopDirector": "车间主任：",
        "preparationTime": "", //准备时间只能是数字
        "productionTime": "", //生产时间只能是数字
        "maintenanceTime": "", //保养时间只能是数字
        "failureTime": "", //故障时间只能是数字
        "waitingTime": "", //待料时间只能是数字
        "otherTime": "", //其它时间只能是数字
        "pressureRelievingStick": "卸压辊:",
        "pressingRod": "装压辊:",
        "netSticks": "装网辊:",
        "unloadingRod": "卸网辊:",
        "toolChange": "换刀:",
        "machineSpeed": "机速:",
        "waste": "", //当班废品：只能是数字
        "materialsWastes": "", //原材料废品
        "printingWaste": "", //印刷废品
        "compoundWaste": "复合废品：",
        "slicingWaste": "分切废品：",
        "bagMakingWastes": "制袋废品：",
        "investment": [{
            "materiel": "2",
            "volumeNumber": "投入卷号",
            "num": "23423",
            "idunit": "1"
        }],
        "produce": [{
            "materiel": "3",
            "volumeNumber": "产出卷号",
            "num": "324",
            "idunit": "1"
        }],
        "remark": "备注",
        "oneLength": "",
        "twoLength": "",
        "threeLength": "",
        "unloadingPlate": "卸版:",
        "mountingBoard": "装版:",
        "spotColour": "调专色:",
        "printing": "2",
        "rawMembraneWaste": "原膜废品：",
        "samplingWaste": "打样废品",
        "printingWasteReason": "",
        "compoundWasteReason": "",
        "slicingWasteReason": "",
        "wasteReason": "",
        "packingSpecification": "",
        "packingQuantity": "",
        "packer": "",
        "bagMakingProcess": "",
        "bagMakingWastesReason": "",
        "glueType": "",
        "supplier": "",
        "otherWastes": "",
        "otherWastesReason": "",
        "shiftLeader": "交班机长："
    },
    submitBlisterProcessSheet: {
        "processName":"吸塑",
        "processId":"1138397068260118529",
        "workCode":"MO-2019-06-0006",
        "saleOrder":"SO-2019-06-0005",
        "customername":"测试B",
        "custormId":"3",
        "productName":"存货1",
        "productId":"1",
        "textureOfMaterial":"材质",
        "sheetSpecification":"片材规格",
        "productSpecifications":"成品规格",
        "num":20,
        "mouldCode":"模具编号",
        "toolDieCode":"刀模编号",
        "mouldNum":"模具个数",
        "quantityOfMaterial_used":"用料数量",
        "deliveryTime":"2019-06-14 00:00:00",
        "quantityOfFeeding":"提料数量",
        "quantityOfMaterialUsedAxis":"用料数量",
        "quantityOfFeedingAxis":"提料数量 ",
        "equipmentNumber":"设备编号",
        "suctionPlateNumber":"应吸板数",
        "wasteToBeDischarged":"应出废料",
        "actualizeWaste":"实出废料",
        "numberOfSuctionPlates":"实吸板数",
        "blisterInspectionResults":"检验结果",
        "blisterExaminationClerk":"吸塑检验员",
        "blankingOperator":"操作工",
        "blendingOperator":"操作工",
        "blendingStartTime":"2019-06-14 12:00:00",
        "blendingEndTime":"2019-07-30 00:00:00",
        "quantityPayable":"应出数量",
        "blankingWaste":"冲裁废料",
        "blankingBlanking":"冲裁边料",
        "totalFinishedProduc":"",
        "blankingInspectionResults":"检验结果",
        "blankingExaminationCler":"",
        "blankingStarttime":"2019-06-26 12:00:00",
        "blankingEndtime":"2019-07-29 00:00:00",
        "blendingRemark":"吸塑备注",
        "blankingRemark":"冲裁备注",
        "blisterbs":[
          {
            "detectionTime":"吸塑检测时间",
            "heatingTime":"吸塑加热时间",
            "boilingTemperature":"吸塑上炉",
            "lowerFurnaceTemperature":"吸塑下炉"
          }],
        "blankings":[
          {
            "detectionTime":"冲裁检测时间",
            "truncationDepth":"冲裁截断",
            "truncationHeight":"冲裁高度"
          }],
        "totalFinishedProduct":"成品总量",
        "blankingExaminationClerk":"检验员"
      }
}
const getters = {
    dailyDatas(state) {
        return state.dailyDatas
    },
    editDailyIndex(state) {
        return state.editDailyIndex
    },
    parameterTypes(state) {
        return state.parameterTypes
    },
    cacheFilldailydata(state) {
        return state.cacheFilldailydata
    }
}
const actions = {
    getdailyPageList({
        commit
    }) {
        var params = {
            dailytypeid: ""
        }
        api.dailygetPageList(params).then(
            res => {
                if (res.code == 200) {
                    commit('GET_DAILY_DATAS', res.data.records)
                }
            }
        );
    },
    getParameterByTypeId({
        commit
    }, data) {
        api.getParameterByTypeId(data).then(
            res => {
                // console.log(res)
                if (!res.error) {
                    commit('GET_PARAMETER_TYPE', res.data)
                }
            }
        );
    },
    submitFillDaily({
        state
    }) {
        api.reportsaveOrUpdate(state.submitDaily).then(
            res => {
                // console.log(res)
                if (res.code == 200) {
                    Toast.success(res.msg);
                    router.replace('/fillDaily')
                }
            }
        )
    },
    submitBlisterProcessSheet({
        state
    }) {
        api.blistersaveOrUpdate(state.submitBlisterProcessSheet).then(
            res => {
                // console.log(res)
                if(res.code == 200) {
                    Toast.success('提交'+res.msg)
                }
                router.replace('/fillDaily')
            }
        )

    }
}

const mutations = {
    [types.GET_DAILY_DATAS](state, data) {
        state.dailyDatas = data
    },
    [types.EDIT_DAILY_INDEX](state, index) {
        state.editDailyIndex = index
    },
    [types.EDIT_DAILY_DATAS](state, index) {
        console.log(index)
        console.log(state.dailyDatas[index])
    },
    [types.GET_PARAMETER_TYPE](state, data) {
        state.parameterTypes = data
    },
    //缓存填报数据
    [types.CACHE_FILL_DAILY_DATA](state, data) {
        state.cacheFilldailydata = data
    },
    [types.SET_DAILY_HEADER](state, data) {
        state.submitDaily.custormId = data.custormId
        state.submitDaily.machineNumber = data.machineNumber
        state.submitDaily.materialSpecifications = data.materialSpecifications
        state.submitDaily.productId = data.productId
        state.submitDaily.productSpecifications = data.productSpecifications
        state.submitDaily.productStructure = data.productStructure
        state.submitDaily.saleOrder = data.saleOrder
        state.submitDaily.squadType = data.squadType
        state.submitDaily.workCode = data.workcode
        state.submitDaily.workshopHumidity = data.workshopHumidity
        state.submitDaily.workshopTemperature = data.workshopTemperature
        state.submitDaily.worktime = data.worktime
        state.submitDaily.processName = data.processName
        state.submitDaily.processId = data.processId

        state.submitDaily.materialSpecifications = data.materialSpecifications
        state.submitDaily.supplier = data.supplier
        state.submitDaily.oneLength = data.oneLength
        state.submitDaily.twoLength = data.twoLength
        state.submitDaily.threeLength = data.threeLength
    },
    [types.ADD_INPUT_INFO](state, data) {
        state.submitDaily.bagMakingProcess = data.bagMakingProcess
        state.submitDaily.investment = data.investment
    },
    [types.ADD_OUTPUT_INFO](state, data) {
        state.submitDaily.produce = data
    },
    [types.SET_WORKING_HOURS](state, data) {
        // console.log(data)
        state.submitDaily.preparationTime = data.preparationTime
        state.submitDaily.productionTime = data.productionTime
        state.submitDaily.maintenanceTime = data.maintenanceTime
        state.submitDaily.failureTime = data.failureTime
        state.submitDaily.waitingTime = data.waitingTime
        state.submitDaily.otherTime = data.otherTime
    },
    [types.SET_MOULD_DATA](state, data) {
        state.submitDaily.pressureRelievingStick = data.pressureRelievingStick
        state.submitDaily.pressingRod = data.pressingRod
        state.submitDaily.netSticks = data.netSticks
        state.submitDaily.unloadingRod = data.unloadingRod
        state.submitDaily.toolChange = data.toolChange
        state.submitDaily.machineSpeed = data.machineSpeed

        state.submitDaily.printing = data.printing
        state.submitDaily.mountingBoard = data.mountingBoard
        state.submitDaily.unloadingPlate = data.unloadingPlate
        state.submitDaily.spotColour = data.spotColour

    },
    [types.SET_RECORD_HANDOVER](state, data) {
        state.submitDaily.shiftLeader = data.shiftLeader
        state.submitDaily.firstDeputy = data.firstDeputy
        state.submitDaily.secondDeputy = data.secondDeputy
        state.submitDaily.onDutyInspection = data.onDutyInspection
        state.submitDaily.successionMonitor = data.successionMonitor
        state.submitDaily.workshopDirector = data.workshopDirector
    },
    [types.SET_SCRAP_RECORD](state, data) {
        state.submitDaily.waste = data.waste
        state.submitDaily.materialsWastes = data.materialsWastes
        state.submitDaily.printingWaste = data.printingWaste
        state.submitDaily.compoundWaste = data.compoundWaste
        state.submitDaily.slicingWaste = data.slicingWaste
        state.submitDaily.bagMakingWastes = data.bagMakingWastes

        state.submitDaily.otherWastes = data.otherWastes
        state.submitDaily.otherWastesReason = data.otherWastesReason
        state.submitDaily.bagMakingWastesReason = data.bagMakingWastesReason
        state.submitDaily.rawMembraneWaste = data.rawMembraneWaste
        state.submitDaily.samplingWaste = data.samplingWaste

    },
    [types.SET_OTHER_INFO](state, data) {
        state.submitDaily.remark = data.remark
    },
    [types.ADD_BLISTER_PROCESS](state, data) {
        state.submitBlisterProcessSheet.saleOrder = data.saleOrder
        state.submitBlisterProcessSheet.processId = data.processId
        state.submitBlisterProcessSheet.workCode = data.workcode
        state.submitBlisterProcessSheet.custormId = data.custormId
        state.submitBlisterProcessSheet.productId = data.productId
        state.submitBlisterProcessSheet.batchNum = data.batchNum
        state.submitBlisterProcessSheet.dateOfManufacture = data.dateOfManufacture
        state.submitBlisterProcessSheet.customername = data.customername
        state.submitBlisterProcessSheet.productName = data.productName
        state.submitBlisterProcessSheet.textureOfMaterial = data.textureOfMaterial
        state.submitBlisterProcessSheet.sheetSpecification = data.sheetSpecification
        state.submitBlisterProcessSheet.productSpecifications = data.productSpecifications
        state.submitBlisterProcessSheet.num = data.num
        state.submitBlisterProcessSheet.mouldCode = data.mouldCode
        state.submitBlisterProcessSheet.toolDieCode = data.toolDieCode
        state.submitBlisterProcessSheet.mouldNum = data.mouldNum
        state.submitBlisterProcessSheet.quantityOfMaterial_used = data.quantityOfMaterial_used
        state.submitBlisterProcessSheet.quantityOfMaterialUsedAxis = data.quantityOfMaterialUsedAxis
        state.submitBlisterProcessSheet.deliveryTime = data.deliveryTime
    },
    [types.ADD_BLISTER_UPTAKE](state, data) {
        state.submitBlisterProcessSheet.quantityOfFeeding = data.quantityOfFeeding
        state.submitBlisterProcessSheet.quantityOfFeedingAxis = data.quantityOfFeedingAxis
        state.submitBlisterProcessSheet.equipmentNumber = data.equipmentNumber
        state.submitBlisterProcessSheet.suctionPlateNumber = data.suctionPlateNumber
        state.submitBlisterProcessSheet.wasteToBeDischarged = data.wasteToBeDischarged
        state.submitBlisterProcessSheet.actualizeWaste = data.actualizeWaste
        state.submitBlisterProcessSheet.numberOfSuctionPlates = data.numberOfSuctionPlates
        state.submitBlisterProcessSheet.blisterInspectionResults = data.blisterInspectionResults
        state.submitBlisterProcessSheet.blisterExaminationClerk = data.blisterExaminationClerk
        state.submitBlisterProcessSheet.blendingStartTime = data.blendingStartTime
        state.submitBlisterProcessSheet.blendingEndTime = data.blendingEndTime
        state.submitBlisterProcessSheet.blendingRemark = data.blendingRemark
        state.submitBlisterProcessSheet.blisterbs = data.blisterbs
    },
    [types.ADD_BLANKING_DATA](state, data) {
        state.submitBlisterProcessSheet.quantityPayable = data.quantityPayable
        state.submitBlisterProcessSheet.blankingWaste = data.blankingWaste
        state.submitBlisterProcessSheet.blankingBlanking = data.blankingBlanking
        state.submitBlisterProcessSheet.totalFinishedProduct = data.totalFinishedProduct
        state.submitBlisterProcessSheet.blankingInspectionResults = data.blankingInspectionResults
        state.submitBlisterProcessSheet.blankingExaminationClerk = data.blankingExaminationClerk
        state.submitBlisterProcessSheet.blankingOperator = data.blankingOperator
        state.submitBlisterProcessSheet.blankingStarttime = data.blankingStarttime
        state.submitBlisterProcessSheet.blankingEndtime = data.blankingEndtime
        state.submitBlisterProcessSheet.blankingRemark = data.blankingRemark
        state.submitBlisterProcessSheet.blankings = data.blankings
    }
}


export default {
    state,
    actions,
    mutations,
    getters
}
