(function (window) {

  const MyPlugin = {}

  MyPlugin.install = function (Vue) {
    Vue.myGlobalMethod = function () {
      console.log('全局方法')
    }
    Vue.directive('my-directive', function (el, binding) {
      el.innerHTML = 'my-directive' + '=' + binding.value
    })
    Vue.prototype.$myMethod = function () {
      console.log('实例方法')
    }
  }
  window.MyPlugin = MyPlugin
})(window)