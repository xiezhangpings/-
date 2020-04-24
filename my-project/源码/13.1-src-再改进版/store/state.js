//引入Vue
import Vue from 'vue'
//引入vuex
import Vuex from 'vuex'
import {INCREMENT,DECREMENT} from './mutation-type.js'
Vue.use(Vuex)
//定义状态
const state = {
  count: 0
}
//直接修改状态的方法
const mutations = {
  //加的方法
  [INCREMENT] (state) {
    state.count++
  },
  //减的方法
  [DECREMENT] (state) {
    state.count--
  }
}
//间接操作状态的方法对象
const actions = {
  //加的方法
  increment (context) {
    context.commit(INCREMENT)
  },
  //减的方法
  decrement ({ commit }) {
    commit(DECREMENT)
  },
  //奇数加的方法
  incrementOrOdd ({ commit, state }) {
    if (state.count % 2 !== 0) {
      commit(INCREMENT)
    }
  },
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit(INCREMENT)
    }, 1000);
  },
}
//计算属性
const getters = {
  evenOrOdd (state) {
    return state.count % 2 === 0 ? '偶数' : '奇数'
  }
}
//实例化vuex暴露出去
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
