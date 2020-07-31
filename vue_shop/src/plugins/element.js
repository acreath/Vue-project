import Vue from 'vue'
import { Button, Form, FormItem, Input, Message,Header, Container, Aside, Main } from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Header)
Vue.use(Container)
Vue.use(Main)
Vue.use(Aside)

//弹框组件需要全局挂载
Vue.prototype.$message = Message