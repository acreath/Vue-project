import Vue from 'vue'
import { Button, Form, FormItem, Input, Message,Header, Container, Aside, Main
, Menu, Submenu, MenuItemGroup, MenuItem, Breadcrumb, BreadcrumbItem, Card, Row, Col,
Table } from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Header)
Vue.use(Container)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)


//弹框组件需要全局挂载
Vue.prototype.$message = Message