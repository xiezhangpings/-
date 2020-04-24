import Vue from 'vue'
import App from './App.vue'
// 设置浏览器的控制台中的提示信息是否显示
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
