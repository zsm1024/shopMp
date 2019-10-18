import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
//按需加载,当渲染其他页面时才加载其组件,并缓存,减少首屏加载时间
// const Index = resolve => require(['@/views/Index.vue'], resolve)
// const Category = resolve => require(['@/views/Category.vue'], resolve)
// const CategoryMain = resolve => require(['@/components/category/main.vue'], resolve)
// const Car = resolve => require(['@/views/Car.vue'],resolve)
// const User = resolve => require(['@/views/User.vue'], resolve)
// const Detail = resolve => require(['@/views/Detail.vue'], resolve)
// const Search = resolve => require(['@/views/Search.vue'], resolve)
// const Pay = resolve => require(['@/components/car/pay/pay.vue'], resolve)
const barcodeScan = resolve => require(['@/views/barcodeScan.vue'], resolve)
    // const newpage = resolve => require(['@/views/newpage.vue'], resolve)
const Login = resolve => require(['@/views/login.vue'], resolve)
const home = resolve => require(['@/views/bottom_nav/home.vue'], resolve)
const cart = resolve => require(['@/views/bottom_nav/cart.vue'], resolve)
const mine = resolve => require(['@/views/bottom_nav/mine.vue'], resolve)
const checkList = resolve => require(['@/views/personal/CheckList.vue'], resolve)
const myList = resolve => require(['@/views/personal/myList.vue'], resolve)
const checkDetial = resolve => require(['@/views/personal/checkDetial.vue'], resolve)
const editList = resolve => require(['@/views/personal/editList.vue'], resolve)
const worker = resolve => require(['@/views/personal/worker.vue'], resolve)
const addressEdit = resolve => require(['@/views/personal/addressEdit.vue'], resolve)
const checkOrder = resolve => require(['@/views/personal/checkOrder.vue'], resolve)
const stories = resolve => require(['@/views/personal/stories.vue'], resolve)
const shoper = resolve => require(['@/views/personal/shoper.vue'], resolve)
const password = resolve => require(['@/views/personal/password.vue'], resolve)
export default new Router({
    routes: [{
            path: '/',
            redirect: '/home',
            component: home,
        },
        {
            path: '/home',
            name: '首页',
            component: home, // 返回路由组件的函数, 只有执行此函数才会加载路由组件, 这个函数在请求对应的路由路径时才会执行
            meta: {
                showFooter: true
            }
        },
        {
            path: '/cart',
            name: '购物车',
            component: cart, // 返回路由组件的函数, 只有执行此函数才会加载路由组件, 这个函数在请求对应的路由路径时才会执行
            meta: {
                showFooter: true
            }
        },
        {
            path: '/mine',
            name: '我的',
            component: mine,
            meta: {
                showFooter: true
            }

        },
        {
            path: '/checkList',
            name: '我的',
            component: checkList,
            meta: {
                showFooter: false
            }
        },
        {
            path: '/myList',
            name: '我的',
            component: myList,
            meta: {
                showFooter: false
            }
        },
        {
            path: '/checkDetial',
            name: '订单详情',
            component: checkDetial,
            meta: {
                showFooter: false
            }
        },
        {
            path: '/editList',
            name: '订单修改',
            component: editList,
            meta: {
                showFooter: false
            }
        },
        {
            path: '/worker',
            name: '员工管理',
            component: worker,
            meta: {
                showFooter: false
            }
        },
        {
            path: '/addressEdit',
            name: '地址编辑',
            component: addressEdit,
            meta: {
                showFooter: false
            }
        },
        {
            path: '/checkOrder',
            name: '查看订单',
            component: checkOrder,
            meta: {
                showFooter: true
            }
        },
        {
            path: '/password',
            name: '修改密码',
            component:password,
            meta: {
                showFooter: false
            }
        },
        {
            path: '/stories',
            name: '门店管理',
            component: stories,
            meta: {
                showFooter: false
            }
        },
        {
            path: '/shoper',
            name: '店长管理',
            component: shoper,
            meta: {
                showFooter: false
            }
        },
        {
            path: '/login',
            name: '登录页',
            component: Login
        },

        //  {
        //   path: '/changeSection',
        //   name: '转序操作',
        //   component: changeSection
        // },{
        //   path: '/applyTransfer',
        //   name: '申请转序',
        //   component: applyTransfer
        // },
        // {
        //   path: '/audit',
        //   name: '审批操作',
        //   component: audit
        // },{
        //   path: '/audit_details',
        //   name: '审批详情',
        //   component: audit_details
        // },
        // {
        //   path: '/putStorage',
        //   name: '入库操作',
        //   component: putStorage
        // },
        // {
        //   path: '/addInventory',
        //   name: '填写入库单',
        //   component: addInventory
        // },
        // {
        //   path: '/outStorage',
        //   name: '出库操作',
        //   component: outStorage
        // },
        // {
        //   path: '/fillDaily',
        //   name: '每日日报',
        //   component: fillDaily
        // },{
        //   path: '/perSet',
        //   name: '个人设置',
        //   component: perSet
        // },
        // {
        //   path: '/addDailyDetails',
        //   name: '填写日报详情',
        //   component:addDailyDetails
        // },{
        //   path: '/addDailySublist',
        //   name: '填写日报子表信息',
        //   component:addDailySublist
        // },{
        //   path: '/addHeaderDaily',
        //   name: '添加日报头',
        //   component:addHeaderDaily
        // },{
        //   path: '/addInputInfoDaily',
        //   name: '添加投入',
        //   component:addInputInfoDaily
        // },{
        //   path: '/outputInfoDaily',
        //   name: '添加投出',
        //   component:outputInfoDaily
        // },{
        //   path: '/workingHoursDaily',
        //   name: '工时记录',
        //   component:workingHoursDaily
        // },{
        //   path: '/mouldDaily',
        //   name: '模具',
        //   component:mouldDaily
        // },{
        //   path: '/recordHandoverDaily',
        //   name: '交接记录',
        //   component:recordHandoverDaily
        // },{
        //   path: '/scrapRecordDaily',
        //   name: '废品记录',
        //   component:scrapRecordDaily
        // },{
        //   path: '/otherInfo',
        //   name: '其他信息',
        //   component:otherInfo
        // },{
        //   path: '/blisterProcessHeader',
        //   name: '吸塑流程单头部',
        //   component:blisterProcessHeader
        // },{
        //   path: '/blisterUptake',
        //   name: '吸塑表单',
        //   component:blisterUptake
        // },{
        //   path: '/blanking',
        //   name: '冲裁表单',
        //   component:blanking
        // },

        // {
        //   path: '/demo',
        //   name: 'demo',
        //   component:demo
        // },

        // {
        //   path: '/editDailyDetails',
        //   name: '编辑日报详情',
        //   component:editDailyDetails
        // },
        // {
        //   path: '/workordernum',
        //   name: '工单编号',
        //   component:workordernum
        // },

        // {
        //     path: '/barcodeScan',
        //     name: '扫描二维码',
        //     component: barcodeScan
        //   },
        //  {
        //   path: '/category',
        //   name: '分类页',
        //   redirect: '/category/all',
        //   component: Category,
        //   children: [{
        //     path: '/category/:tab',
        //     component:CategoryMain
        //   }]
        // },{
        //   path: '/car',
        //   name: '购物车页',
        //   component: Car
        // }, {
        //   path: '/car/pay',
        //   name: '支付页',
        //   component: Pay
        // },
        // {
        //   path: '/user',
        //   name: '用户页',
        //   component: User,
        //   meta: {
        //        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录才能进入的
        //    },
        // }, {
        //   path: '/detail',
        //   name: '详情页',
        //   component: Detail
        // }, {
        //   path: '/search',
        //   name: '搜索页',
        //   component: Search
        // },
    ]
})