import Vue from 'vue'
import App from './App.vue'
// 设置浏览器的控制台中的提示信息是否显示
Vue.config.productionTip = false
// 定义事件总线
Vue.prototype.$bus = new Vue()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
