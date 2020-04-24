// 引入Vue
import Vue from 'vue'
// 引入App组件
import App from './App.vue'
// 定义一个事件总线对象
Vue.prototype.$bus = new Vue()
Vue.config.productionTip = false
// 实例化Vue
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
