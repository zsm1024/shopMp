/* Detail + Car*/

//Detail父组件中 当前页面商品的数据

export const SET_DATAS = 'SET_DATAS'

//chose组件选择的颜色
export const CHANGE_COL_SELECTED = 'CHANGE_COL_SELECTED'

//chose组件选择的尺寸

export const CHANGE_SIZE_SELECTED = 'CHANGE_SIZE_SELECTED'

//footer组件中保存添加的商品的数据

export const ADD_PRODUCT = 'ADD_PRODUCT'

//footer组件中保存购物车数量的数据

export const CHANGE_COUNT = 'CHANGE_COUNT'

//提交订单后重新设置购物车商品列表,把打钩并提交的商品去掉,即保留unSelectedList
export const RESET_CARLIST = 'RESET_CARLIST'

//提交订单后重新设置购物车商品数量
export const RESET_COUNT = 'RESET_COUNT'


// 购物车里打钩的商品

export const SET_SELECTEDLIST = 'SET_SELECTEDLIST'

//购物车里没打钩的商品

export const SET_UNSELECTEDLIST = 'SET_UNSELECTEDLIST'



//全局loading状态

export const SET_LOADING = 'SET_LOADING'

//设置用户信息
export const SET_USERINFO = 'SET_USERINFO'
// 改变token(权限)
export const CHANGE_TOKEN = 'CHANGE_TOKEN'

// 分类页的aside index
export const CHANGE_TABINDEX = 'CHANGE_TABINDEX'
//设置二维码信息
export const SET_SCAN_DATA = 'SET_SCAN_DATA'
//清空二维码信息
export const CLEAR_SCANDATA = 'CLEAR_SCANDATA'
//设置生产编号
export const SET_WORK_CODE = 'SET_WORK_CODE' 
//获取生产标号对应的信息
export const GET_PROJECT_INFO = 'GET_PROJECT_INFO'
//添加入库信息
export const ADD_INVENTORY = 'ADD_INVENTORY'
//设置入库编辑索引
export const EDIT_INVENTORY_INDEX = 'EDIT_INVENTORY_INDEX'
//编辑入库信息
export const SET_INVENTORY = 'SET_INVENTORY'
//清空编辑入库信息
export const CLEAR_INVENTORY = 'CLEAR_INVENTORY'
//获取日报信息
export const GET_DAILY_DATAS = 'GET_DAILY_DATAS'
//设置编辑日报索引
export const EDIT_DAILY_INDEX = 'EDIT_DAILY_INDEX'
//编辑日报信息
export const EDIT_DAILY_DATAS = 'EDIT_DAILY_DATAS'
//通过填报类型，获取填报内容类型
export const GET_PARAMETER_TYPE = 'GET_PARAMETER_TYPE'
//缓存填报数据
export const CACHE_FILL_DAILY_DATA = 'CACHE_FILL_DAILY_DATA'
//添加日报头部
export const SET_DAILY_HEADER = 'SET_DAILY_HEADER'
//添加投入信息
export const ADD_INPUT_INFO = 'ADD_INPUT_INFO'
//添加产出信息
export const ADD_OUTPUT_INFO = 'ADD_OUTPUT_INFO'
//添加工时记录
export const SET_WORKING_HOURS = 'SET_WORKING_HOURS'
//添加模具
export const SET_MOULD_DATA = 'SET_MOULD_DATA'
//添加交班记录
export const SET_RECORD_HANDOVER = 'SET_RECORD_HANDOVER'
//添加废品记录
export const SET_SCRAP_RECORD = 'SET_SCRAP_RECORD'
//添加其他信息
export const SET_OTHER_INFO = 'SET_OTHER_INFO'
//添加吸塑流程单头部
export const ADD_BLISTER_PROCESS = 'ADD_BLISTER_PROCESS'
//添加吸塑数据
export const ADD_BLISTER_UPTAKE = 'ADD_BLISTER_UPTAKE'
//添加冲裁数据
export const ADD_BLANKING_DATA = 'ADD_BLANKING_DATA'




