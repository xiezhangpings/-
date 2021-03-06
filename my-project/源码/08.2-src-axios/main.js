// 引入Vue
import Vue from 'vue'
// 引入App组件
import App from './App.vue'
Vue.config.productionTip = false
// 实例化Vue
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
