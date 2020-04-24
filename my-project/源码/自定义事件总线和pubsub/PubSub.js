(function (window) {
  // 定义对象
  const PubSub = {}
  // 定义容器对象
  let subscribersContainer = {}
  // 定义一个id识标，对象回调函数标识
  let id = 0
  // 消息订阅
  PubSub.subscribe = function (msg, subscriber) {
    // 对应消息名字获取对应的回调函数容器对象
    let subscribers = subscribersContainer[msg]
    if (!subscribers) {
      subscribers = {}
      subscribersContainer[msg] = subscribers
    }
    // 创建token标识
    const token = 'id_' + ++id
    // 根据token和回调函数以键值对的方式存储到  回调函数容器对象中
    subscribers[token] = subscriber
    return token
  }
  // 异步发布消息
  PubSub.publish = function (msg, data) {
    // 根据消息名字去大的容器对象中查找 当前消息对应的回调函数容器对象
    let subscribers = subscribersContainer[msg]
    setTimeout(() => {
      // 判断小容器对象是否存在
      if (subscribers) {
        // 对象转数组
        Object.values(subscribers).forEach(subscriber => {
          subscriber(data)
        })
      }
    }, 1000);
  }
  // 同步发布消息
  PubSub.publishSync = function (msg, data) {
    // 根据消息名字去大的容器对象中查找 当前消息对应的回调函数容器对象
    let subscribers = subscribersContainer[msg]
    // 判断小容器对象是否存在
    if (subscribers) {
      // 对象转数组
      Object.values(subscribers).forEach(subscriber => {
        subscriber(data)
      })
    }
  }

  // 取消消息订阅
  PubSub.unsubscribe = function (token) {
    // token---标识,token有可能是标识,有可能是消息名字,还有可能什么也没传
    // 没有传入任何的token
    if (typeof token === 'undefined') {
      subscribersContainer = {}
    } else if (token.indexOf('id_') !== -1) {
      const subscribers = Object.values(subscribersContainer).find(subscribers => subscribers[token])
      subscribers && delete subscribers[token]
    } else {
      delete subscribersContainer[token]
    }
  }
  // 暴露
  window.PubSub = PubSub
})(window)


// (function (window) {
//   // 定义对象
//   const PubSub = {}
//   // 定义容器对象
//   let subscribersContainer = {}
//   // 定义一个id识标，对象回调函数标识
//   let id = 0
//   // 消息订阅
//   PubSub.subscribe = function (msg, subscriber) {
//     // 对应消息名字获取对应的回调函数容器对象
//     let subscribers = subscribersContainer[msg]
//     if (!subscribers) {
//       subscribers = {}
//       subscribersContainer[msg] = subscribers
//     }
//     // 创建token标识
//     const token = 'id_' + ++id
//     // 根据token和回调函数以键值对的方式存储到  回调函数容器对象中
//     subscribers[token] = subscriber
//     return token
//   }
//   // 异步发布消息
//   PubSub.publish = function (msg, data) {
//     // 根据消息名字去大的容器对象中查找 当前消息对应的回调函数容器对象
//     let subscribers = subscribersContainer[msg]
//     setTimeout(() => {
//       // 判断小容器对象是否存在
//       if (subscribers) {
//         // 对象转数组
//         Object.values(subscribers).forEach(subscriber => {
//           subscriber(data)
//         })
//       }
//     }, 1000);
//   }
//   // 同步发布消息
//   PubSub.publishSync = function (msg, data) {
//     // 根据消息名字去大的容器对象中查找 当前消息对应的回调函数容器对象
//     let subscribers = subscribersContainer[msg]
//     // 判断小容器对象是否存在
//     if (subscribers) {
//       // 对象转数组
//       Object.values(subscribers).forEach(subscriber => {
//         subscriber(data)
//       })
//     }
//   }

//   // 取消消息订阅
//   PubSub.unsubscribe = function (token) {
//     // token---标识,token有可能是标识,有可能是消息名字,还有可能什么也没传
//     // 没有传入任何的token
//     if (typeof token === 'undefined') {
//       subscribersContainer = {}
//     } else if (token.indexOf('id_') !== -1) {
//       const subscribers = Object.values(subscribersContainer).find(subscribers => subscribers[token])
//       subscribers && delete subscribers[token]
//     } else {
//       delete subscribersContainer[token]
//     }
//   }
//   // 暴露
//   window.PubSub = PubSub
// })(window)
// (function (window) {
//   // 定义对象
//   const PubSub = {}
//   // 定义容器对象
//   let subscribersContainer = {}
//   // 定义一个id识标，对象回调函数标识
//   let id = 0
//   // 消息订阅
//   PubSub.subscribe = function (msg, subscriber) {
//     // 对应消息名字获取对应的回调函数容器对象
//     let subscribers = subscribersContainer[msg]
//     if (!subscribers) {
//       subscribers = {}
//       subscribersContainer[msg] = subscribers
//     }
//     // 创建token标识
//     const token = 'id_' + ++id
//     // 根据token和回调函数以键值对的方式存储到  回调函数容器对象中
//     subscribers[token] = subscriber
//     return token
//   }
//   // 异步发布消息
//   PubSub.publish = function (msg, data) {
//     // 根据消息名字去大的容器对象中查找 当前消息对应的回调函数容器对象
//     let subscribers = subscribersContainer[msg]
//     setTimeout(() => {
//       // 判断小容器对象是否存在
//       if (subscribers) {
//         // 对象转数组
//         Object.values(subscribers).forEach(subscriber => {
//           subscriber(data)
//         })
//       }
//     }, 1000);
//   }
//   // 同步发布消息
//   PubSub.publishSync = function (msg, data) {
//     // 根据消息名字去大的容器对象中查找 当前消息对应的回调函数容器对象
//     let subscribers = subscribersContainer[msg]
//     // 判断小容器对象是否存在
//     if (subscribers) {
//       // 对象转数组
//       Object.values(subscribers).forEach(subscriber => {
//         subscriber(data)
//       })
//     }
//   }

//   // 取消消息订阅
//   PubSub.unsubscribe = function (token) {
//     // token---标识,token有可能是标识,有可能是消息名字,还有可能什么也没传
//     // 没有传入任何的token
//     if (typeof token === 'undefined') {
//       subscribersContainer = {}
//     } else if (token.indexOf('id_') !== -1) {
//       const subscribers = Object.values(subscribersContainer).find(subscribers => subscribers[token])
//       subscribers && delete subscribers[token]
//     } else {
//       delete subscribersContainer[token]
//     }
//   }
//   // 暴露
//   window.PubSub = PubSub
// })(window)

