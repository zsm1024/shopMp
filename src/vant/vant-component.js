import Vue from 'vue'

import {
    Button, Cell, CellGroup, NavBar, Tabbar, TabbarItem, Notify, Toast, Icon, Dialog 
} from 'vant';
Vue.use(Button, Cell, CellGroup, NavBar, Tabbar, TabbarItem, Notify, Toast, Icon, Dialog 
)

Notify.setDefaultOptions({
    background: "#018fff"
})