// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Cube from 'cube-ui'
import Vuex from 'vuex'
import store from './vuex/store'
import './style/common/iconfont/iconfont' //引入字体图标库
import './config/rem'
import './config/base'

import Utils from './config/utils'
import * as _ from './config/tool'
import api from './config/api'
import mui from 'vue-awesome-mui'
import 'vue-awesome-mui/mui/dist/css/mui.css'
Vue.use(mui)
Vue.use(Vuex)
Vue.use(Cube)

Vue.config.productionTip = false;
Vue.prototype.mui = mui
// import fastclick from 'fastclick' // 改变click
// fastclick.attach(document.body)

window._ = _ //引入组件
window.api = api //引入组件
window.Utils = Utils //引入组件
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
