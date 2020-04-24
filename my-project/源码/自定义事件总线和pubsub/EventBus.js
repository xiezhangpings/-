(function (window) {
  // 定义事件总线对象
  const EventBus = {}
  let listenersContainer = {}
  EventBus.on = function (eventName, listener) {
    // 根据事件名字通过容器对象查找该事件对应的数据数组
    let listeners = listenersContainer[eventName]
    // 判断该数组是否存在
    if (!listeners) {
      // 如果该数组不存在,第一次调用on方法绑定事件,传入回调
      listeners = []
      listenersContainer[eventName] = listeners
    }
    // 把回调函数添加到对应的数组中
    listeners.push(listener)
  }
  EventBus.emit = function (eventName, data) {
    // 根据事件名字在大的容器对象中找对应的回调函数数组
    let listeners = listenersContainer[eventName]
    // 判断存储回调函数的数组是否存在
    if (listeners && listeners.length > 0) {
      listeners.forEach(listener => {
        listener(data)
      })
    }
  }
  // 解绑事件
  EventBus.off = function (eventName) {
    //判断有没有传值
    if (typeof eventName === 'undefined') {
      listenersContainer = {}
    } else {
      // 根据事件名字取消
      delete listenersContainer[eventName]
    }
  }
  window.EventBus = EventBus
})(window)


// (function (window) {
//   // 定义事件总线对象
//   const EventBus = {}
//   let listenersContainer = {}
//   EventBus.on = function (eventName, listener) {
//     // 根据事件名字通过容器对象查找该事件对应的数据数组
//     let listeners = listenersContainer[eventName]
//     // 判断该数组是否存在
//     if (!listeners) {
//       // 如果该数组不存在,第一次调用on方法绑定事件,传入回调
//       listeners = []
//       listenersContainer[eventName] = listeners
//     }
//     // 把回调函数添加到对应的数组中
//     listeners.push(listener)
//   }
//   EventBus.emit = function (eventName, data) {
//     // 根据事件名字在大的容器对象中找对应的回调函数数组
//     let listeners = listenersContainer[eventName]
//     // 判断存储回调函数的数组是否存在
//     if (listeners && listeners.length > 0) {
//       listeners.forEach(listener => {
//         listener(data)
//       })
//     }
//   }
//   // 解绑事件
//   EventBus.off = function (eventName) {
//     //判断有没有传值
//     if (typeof eventName === 'undefined') {
//       listenersContainer = {}
//     } else {
//       // 根据事件名字取消
//       delete listenersContainer[eventName]
//     }
//   }
//   window.EventBus = EventBus
// })(window)(function (window) {
//   // 定义事件总线对象
//   const EventBus = {}
//   let listenersContainer = {}
//   EventBus.on = function (eventName, listener) {
//     // 根据事件名字通过容器对象查找该事件对应的数据数组
//     let listeners = listenersContainer[eventName]
//     // 判断该数组是否存在
//     if (!listeners) {
//       // 如果该数组不存在,第一次调用on方法绑定事件,传入回调
//       listeners = []
//       listenersContainer[eventName] = listeners
//     }
//     // 把回调函数添加到对应的数组中
//     listeners.push(listener)
//   }
//   EventBus.emit = function (eventName, data) {
//     // 根据事件名字在大的容器对象中找对应的回调函数数组
//     let listeners = listenersContainer[eventName]
//     // 判断存储回调函数的数组是否存在
//     if (listeners && listeners.length > 0) {
//       listeners.forEach(listener => {
//         listener(data)
//       })
//     }
//   }
//   // 解绑事件
//   EventBus.off = function (eventName) {
//     //判断有没有传值
//     if (typeof eventName === 'undefined') {
//       listenersContainer = {}
//     } else {
//       // 根据事件名字取消
//       delete listenersContainer[eventName]
//     }
//   }
//   window.EventBus = EventBus
// })(window)
